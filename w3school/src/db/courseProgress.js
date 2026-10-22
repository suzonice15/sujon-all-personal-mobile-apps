import { getDB } from './db';

// Lesson progress for the local courses (src/courses). Kept in its own table
// so it does not depend on the server-synced tables.

let tableReady = null;

const getProgressDB = async () => {
  const db = await getDB();
  if (!tableReady) {
    tableReady = (async () => {
      await db.executeSql(`
        CREATE TABLE IF NOT EXISTS course_progress (
          lesson_id TEXT PRIMARY KEY,
          course_id TEXT NOT NULL,
          completed INTEGER DEFAULT 0,
          opened_at INTEGER DEFAULT 0
        );
      `);
      await db.executeSql(`
        CREATE TABLE IF NOT EXISTS interview_practiced (
          question_key TEXT PRIMARY KEY,
          course_id TEXT NOT NULL
        );
      `);
      await db.executeSql(`
        CREATE TABLE IF NOT EXISTS course_quiz_scores (
          quiz_key TEXT PRIMARY KEY,
          best_score INTEGER DEFAULT 0,
          total INTEGER DEFAULT 0
        );
      `);
    })();
  }
  await tableReady;
  return db;
};

// Upserts are written as INSERT OR IGNORE + UPDATE because older Android
// versions ship SQLite without ON CONFLICT ... DO UPDATE support.
const ensureLessonRow = (db, courseId, lessonId) =>
  db.executeSql(
    'INSERT OR IGNORE INTO course_progress (lesson_id, course_id) VALUES (?, ?)',
    [lessonId, courseId]
  );

export const markLessonOpened = async (courseId, lessonId) => {
  const db = await getProgressDB();
  await ensureLessonRow(db, courseId, lessonId);
  await db.executeSql('UPDATE course_progress SET opened_at = ? WHERE lesson_id = ?', [Date.now(), lessonId]);
};

export const setLessonCompleted = async (courseId, lessonId, completed = true) => {
  const db = await getProgressDB();
  await ensureLessonRow(db, courseId, lessonId);
  await db.executeSql('UPDATE course_progress SET completed = ? WHERE lesson_id = ?', [completed ? 1 : 0, lessonId]);
};

// Returns { completed: Set<lessonId>, lastOpenedId: string | null }
export const getCourseProgress = async (courseId) => {
  const db = await getProgressDB();
  const [res] = await db.executeSql(
    'SELECT lesson_id, completed, opened_at FROM course_progress WHERE course_id = ? ORDER BY opened_at DESC',
    [courseId]
  );
  const completed = new Set();
  let lastOpenedId = null;
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows.item(i);
    if (i === 0 && row.opened_at > 0) lastOpenedId = row.lesson_id;
    if (row.completed) completed.add(row.lesson_id);
  }
  return { completed, lastOpenedId };
};

// Returns { [courseId]: { completedIds: Set<lessonId>, lastOpenedAt, lastOpenedId } } for Home.
export const getAllCourseProgress = async () => {
  const db = await getProgressDB();
  const [res] = await db.executeSql('SELECT course_id, lesson_id, completed, opened_at FROM course_progress');
  const out = {};
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows.item(i);
    const entry = out[row.course_id] || (out[row.course_id] = { completedIds: new Set(), lastOpenedAt: 0, lastOpenedId: null });
    if (row.completed) entry.completedIds.add(row.lesson_id);
    if ((row.opened_at || 0) > entry.lastOpenedAt) {
      entry.lastOpenedAt = row.opened_at;
      entry.lastOpenedId = row.lesson_id;
    }
  }
  return out;
};

// Interview questions the user marked as practiced. Keys come from interviewKey() in src/courses.
export const getPracticedInterviewKeys = async () => {
  const db = await getProgressDB();
  const [res] = await db.executeSql('SELECT question_key FROM interview_practiced');
  const keys = new Set();
  for (let i = 0; i < res.rows.length; i++) keys.add(res.rows.item(i).question_key);
  return keys;
};

export const setInterviewPracticed = async (courseId, key, practiced) => {
  const db = await getProgressDB();
  if (practiced) {
    await db.executeSql('INSERT OR IGNORE INTO interview_practiced (question_key, course_id) VALUES (?, ?)', [key, courseId]);
  } else {
    await db.executeSql('DELETE FROM interview_practiced WHERE question_key = ?', [key]);
  }
};

export const saveQuizScore = async (quizKey, score, total) => {
  const db = await getProgressDB();
  await db.executeSql('INSERT OR IGNORE INTO course_quiz_scores (quiz_key) VALUES (?)', [quizKey]);
  await db.executeSql(
    'UPDATE course_quiz_scores SET best_score = MAX(best_score, ?), total = ? WHERE quiz_key = ?',
    [score, total, quizKey]
  );
};

// Returns { [quizKey]: { best, total } }
export const getQuizScores = async () => {
  const db = await getProgressDB();
  const [res] = await db.executeSql('SELECT quiz_key, best_score, total FROM course_quiz_scores');
  const out = {};
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows.item(i);
    out[row.quiz_key] = { best: row.best_score, total: row.total };
  }
  return out;
};
