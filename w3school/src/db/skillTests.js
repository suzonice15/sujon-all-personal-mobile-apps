import { getDB } from './db';

// Skill test results. One row per test in skill_tests, and one row per question
// in skill_test_answers so a finished test can be reviewed question by question.

let tablesReady = null;

const getSkillDB = async () => {
  const db = await getDB();
  if (!tablesReady) {
    tablesReady = (async () => {
      await db.executeSql(`
        CREATE TABLE IF NOT EXISTS skill_tests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          created_at INTEGER NOT NULL,
          course_ids TEXT NOT NULL,
          total INTEGER NOT NULL,
          correct INTEGER NOT NULL,
          wrong INTEGER NOT NULL,
          skipped INTEGER NOT NULL,
          duration_sec INTEGER NOT NULL,
          time_limit_sec INTEGER DEFAULT 0
        );
      `);
      await db.executeSql(`
        CREATE TABLE IF NOT EXISTS skill_test_answers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          test_id INTEGER NOT NULL,
          position INTEGER NOT NULL,
          course_id TEXT NOT NULL,
          chapter_id TEXT,
          question TEXT NOT NULL,
          options_json TEXT NOT NULL,
          correct_index INTEGER NOT NULL,
          chosen_index INTEGER,
          explain TEXT
        );
      `);
      await db.executeSql('CREATE INDEX IF NOT EXISTS idx_skill_answers_test ON skill_test_answers (test_id)');
    })();
  }
  await tablesReady;
  return db;
};

const rowsOf = (res) => {
  const out = [];
  for (let i = 0; i < res.rows.length; i++) out.push(res.rows.item(i));
  return out;
};

const toSummary = (row) => ({
  id: row.id,
  createdAt: row.created_at,
  courseIds: JSON.parse(row.course_ids),
  total: row.total,
  correct: row.correct,
  wrong: row.wrong,
  skipped: row.skipped,
  durationSec: row.duration_sec,
  timeLimitSec: row.time_limit_sec,
  percent: row.total ? Math.round((row.correct / row.total) * 100) : 0,
});

// answers: [{ courseId, chapterId, q, options, answer, chosen, explain }] in exam order.
// Returns the new test id.
export const saveSkillTest = async ({ courseIds, answers, durationSec, timeLimitSec = 0 }) => {
  const db = await getSkillDB();
  const correct = answers.filter(a => a.chosen === a.answer).length;
  const skipped = answers.filter(a => a.chosen === null || a.chosen === undefined).length;
  const wrong = answers.length - correct - skipped;

  const [res] = await db.executeSql(
    `INSERT INTO skill_tests (created_at, course_ids, total, correct, wrong, skipped, duration_sec, time_limit_sec)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [Date.now(), JSON.stringify(courseIds), answers.length, correct, wrong, skipped, Math.round(durationSec), timeLimitSec]
  );
  const testId = res.insertId;

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];
    await db.executeSql(
      `INSERT INTO skill_test_answers (test_id, position, course_id, chapter_id, question, options_json, correct_index, chosen_index, explain)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [testId, i, a.courseId, a.chapterId ?? null, a.q, JSON.stringify(a.options), a.answer, a.chosen ?? null, a.explain ?? null]
    );
  }
  return testId;
};

export const getSkillTests = async () => {
  const db = await getSkillDB();
  const [res] = await db.executeSql('SELECT * FROM skill_tests ORDER BY created_at DESC');
  return rowsOf(res).map(toSummary);
};

// Returns { ...summary, answers: [...] } or null.
export const getSkillTest = async (id) => {
  const db = await getSkillDB();
  const [testRes] = await db.executeSql('SELECT * FROM skill_tests WHERE id = ?', [id]);
  if (!testRes.rows.length) return null;
  const [ansRes] = await db.executeSql('SELECT * FROM skill_test_answers WHERE test_id = ? ORDER BY position', [id]);
  return {
    ...toSummary(testRes.rows.item(0)),
    answers: rowsOf(ansRes).map(r => ({
      courseId: r.course_id,
      chapterId: r.chapter_id,
      q: r.question,
      options: JSON.parse(r.options_json),
      answer: r.correct_index,
      chosen: r.chosen_index,
      explain: r.explain,
    })),
  };
};

export const deleteSkillTest = async (id) => {
  const db = await getSkillDB();
  await db.executeSql('DELETE FROM skill_test_answers WHERE test_id = ?', [id]);
  await db.executeSql('DELETE FROM skill_tests WHERE id = ?', [id]);
};

// { count, averagePercent, bestPercent, totalQuestions }
export const getSkillTestStats = async () => {
  const db = await getSkillDB();
  const [res] = await db.executeSql(
    `SELECT COUNT(*) AS count,
            COALESCE(SUM(total), 0) AS questions,
            COALESCE(SUM(correct), 0) AS correct,
            COALESCE(MAX(CAST(correct AS REAL) / total), 0) AS best
     FROM skill_tests WHERE total > 0`
  );
  const row = res.rows.item(0);
  return {
    count: row.count,
    totalQuestions: row.questions,
    averagePercent: row.questions ? Math.round((row.correct / row.questions) * 100) : 0,
    bestPercent: Math.round(row.best * 100),
  };
};
