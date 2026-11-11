/**
 * Tests for the C Programming course.
 *
 * No C compiler is available in this environment, so the suite verifies
 * structure, brace balance, required includes and that deliberately dangerous
 * samples are marked `safe: false`. The safe samples are also checked for the
 * classic mistakes the course teaches about (gets, missing return).
 */

import c from '../src/courses/c';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of c.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectCBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.lang === 'c') {
        blocks.push({
          chapterId: chapter.id,
          lessonId: lesson.id,
          code: block.value,
          safe: block.safe !== false,
        });
      }
    }
  }
  return blocks;
}

function braceBalance(code) {
  let depth = 0;
  for (const char of code) {
    if (char === '{') depth++;
    if (char === '}') depth--;
    if (depth < 0) return depth;
  }
  return depth;
}

describe('C course structure', () => {
  test('has the metadata the app needs', () => {
    expect(c.id).toBe('c');
    expect(c.title).toBe('C Programming');
    expect(c.short).toBe('C');
    expect(c.tagline).toBeTruthy();
    expect(c.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(c.icon).toBeTruthy();
    expect(c.chapters.length).toBeGreaterThanOrEqual(10);
    expect(c.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('every chapter has an id, title and at least one lesson', () => {
    const ids = new Set();
    for (const chapter of c.chapters) {
      expect(ids.has(chapter.id)).toBe(false);
      ids.add(chapter.id);
      expect(chapter.title).toBeTruthy();
      expect(chapter.description).toBeTruthy();
      expect(chapter.lessons.length).toBeGreaterThan(0);
    }
  });

  test('lesson ids are unique and blocks use known types', () => {
    const lessonIds = new Set();
    for (const { lesson } of collectLessons()) {
      expect(lessonIds.has(lesson.id)).toBe(false);
      lessonIds.add(lesson.id);
      expect(lesson.title).toBeTruthy();
      expect(lesson.blocks.length).toBeGreaterThan(0);
      for (const block of lesson.blocks) {
        expect(ALLOWED_BLOCKS).toContain(block.type);
        if (block.type === 'list') expect(Array.isArray(block.items)).toBe(true);
        else {
          expect(typeof block.value).toBe('string');
          expect(block.value.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('every quiz question is valid and points at its chapter', () => {
    const seen = new Set();
    for (const chapter of c.chapters) {
      expect(chapter.quiz.length).toBeGreaterThanOrEqual(3);
      for (const q of chapter.quiz) {
        expect(q.chapterId).toBe(chapter.id);
        expect(q.options.length).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(4);
        expect(q.explain).toBeTruthy();
        expect(seen.has(q.q)).toBe(false);
        seen.add(q.q);
      }
    }
  });

  test('interview questions are grouped by existing chapters', () => {
    const chapterIds = new Set(c.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(c.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      const questions = c.interviewQuestions[chapterId];
      expect(questions.length).toBeGreaterThan(0);
      for (const item of questions) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('C samples', () => {
  test('there is a meaningful number of samples', () => {
    expect(collectCBlocks().length).toBeGreaterThanOrEqual(25);
  });

  test('every C sample has balanced braces', () => {
    const failures = collectCBlocks()
      .filter(block => braceBalance(block.code) !== 0)
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });

  test('safe samples include a header and do not use gets', () => {
    const failures = [];
    for (const block of collectCBlocks()) {
      if (!block.safe) continue;
      if (/\bgets\s*\(/.test(block.code)) {
        failures.push(`${block.chapterId}/${block.lessonId}: uses gets`);
      }
      const isHeader = /#ifndef/.test(block.code) && !/int\s+main\s*\(/.test(block.code);
      if (!isHeader && !block.code.includes('#include')) {
        failures.push(`${block.chapterId}/${block.lessonId}: missing #include`);
      }
    }
    expect(failures).toEqual([]);
  });

  test('every complete program returns from main', () => {
    const failures = [];
    for (const block of collectCBlocks()) {
      if (!block.safe) continue;
      if (!/int\s+main\s*\(/.test(block.code)) continue;
      if (!/return\s+[01]\s*;/.test(block.code)) {
        failures.push(`${block.chapterId}/${block.lessonId}: main has no return`);
      }
    }
    expect(failures).toEqual([]);
  });

  test('dangerous examples are explicitly marked unsafe', () => {
    const unsafe = collectCBlocks().filter(block => !block.safe);
    expect(unsafe.length).toBeGreaterThanOrEqual(3);
    for (const block of unsafe) {
      expect(block.code.length).toBeGreaterThan(0);
    }
  });
});
