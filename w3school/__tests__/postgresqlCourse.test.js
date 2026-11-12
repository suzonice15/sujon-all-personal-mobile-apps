/**
 * Tests for the PostgreSQL course.
 *
 * SQL samples use lang: 'sql' and can run in the Try-it editor (sql.js).
 * PostgreSQL-specific syntax may not all be supported by sql.js, so the suite
 * checks structure, brace balance is not needed, and that samples are non-empty.
 */

import postgresql from '../src/courses/postgresql';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['sql', 'bash', 'text'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of postgresql.chapters) {
    for (const lesson of chapter.lessons) {
      for (const block of lesson.blocks) {
        if (block.type === 'code') {
          blocks.push({ chapterId: chapter.id, lessonId: lesson.id, lang: block.lang, code: block.value });
        }
      }
    }
  }
  return blocks;
}

describe('PostgreSQL course structure', () => {
  test('has the metadata the app needs', () => {
    expect(postgresql.id).toBe('postgresql');
    expect(postgresql.title).toBe('PostgreSQL');
    expect(postgresql.short).toBe('Postgres');
    expect(postgresql.tagline).toBeTruthy();
    expect(postgresql.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(postgresql.chapters.length).toBeGreaterThanOrEqual(10);
    expect(postgresql.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of postgresql.chapters) {
      expect(chapterIds.has(chapter.id)).toBe(false);
      chapterIds.add(chapter.id);
      expect(chapter.lessons.length).toBeGreaterThan(0);
      for (const lesson of chapter.lessons) {
        expect(lessonIds.has(lesson.id)).toBe(false);
        lessonIds.add(lesson.id);
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
    }
  });

  test('every quiz question is valid', () => {
    const seen = new Set();
    for (const chapter of postgresql.chapters) {
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
    const chapterIds = new Set(postgresql.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(postgresql.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of postgresql.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('PostgreSQL samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(25);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('SQL samples look like SQL', () => {
    const failures = [];
    for (const block of collectBlocks()) {
      if (block.lang !== 'sql') continue;
      if (!/(SELECT|CREATE|INSERT|UPDATE|DELETE|ALTER|GRANT|BEGIN|EXPLAIN|WITH)/i.test(block.code)) {
        failures.push(`${block.chapterId}/${block.lessonId}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
