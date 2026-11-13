/**
 * Tests for the Design Patterns course.
 */

import designPatterns from '../src/courses/design-patterns';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['java', 'text'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of designPatterns.chapters) {
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

function braceBalance(code) {
  let depth = 0;
  for (const char of code) {
    if (char === '{') depth++;
    if (char === '}') depth--;
    if (depth < 0) return depth;
  }
  return depth;
}

describe('Design Patterns course structure', () => {
  test('has the metadata the app needs', () => {
    expect(designPatterns.id).toBe('design-patterns');
    expect(designPatterns.title).toBe('Design Patterns');
    expect(designPatterns.short).toBe('Patterns');
    expect(designPatterns.tagline).toBeTruthy();
    expect(designPatterns.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(designPatterns.chapters.length).toBeGreaterThanOrEqual(10);
    expect(designPatterns.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of designPatterns.chapters) {
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
    for (const chapter of designPatterns.chapters) {
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
    const chapterIds = new Set(designPatterns.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(designPatterns.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of designPatterns.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Design Patterns samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(10);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('every Java sample has balanced braces', () => {
    const failures = collectBlocks()
      .filter(block => block.lang === 'java' && braceBalance(block.code) !== 0)
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });
});
