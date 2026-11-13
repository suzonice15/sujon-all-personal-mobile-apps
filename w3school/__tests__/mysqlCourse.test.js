/**
 * Tests for the MySQL course.
 */

import mysql from '../src/courses/mysql';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['sql', 'bash', 'text'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of mysql.chapters) {
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

describe('MySQL course structure', () => {
  test('has the metadata the app needs', () => {
    expect(mysql.id).toBe('mysql');
    expect(mysql.title).toBe('MySQL');
    expect(mysql.short).toBe('MySQL');
    expect(mysql.tagline).toBeTruthy();
    expect(mysql.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(mysql.chapters.length).toBeGreaterThanOrEqual(10);
    expect(mysql.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of mysql.chapters) {
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
    for (const chapter of mysql.chapters) {
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
    const chapterIds = new Set(mysql.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(mysql.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of mysql.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('MySQL samples', () => {
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
      if (!/(SELECT|CREATE|INSERT|UPDATE|DELETE|ALTER|GRANT|BEGIN|EXPLAIN|SHOW)/i.test(block.code)) {
        failures.push(`${block.chapterId}/${block.lessonId}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
