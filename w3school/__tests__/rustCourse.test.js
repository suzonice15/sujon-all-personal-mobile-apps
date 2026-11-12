/**
 * Tests for the Rust course.
 *
 * No Rust toolchain is installed here, so the suite checks structure, brace
 * balance and that every sample is recognisably Rust code.
 */

import rust from '../src/courses/rust';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['rust', 'bash', 'text'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of rust.chapters) {
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

describe('Rust course structure', () => {
  test('has the metadata the app needs', () => {
    expect(rust.id).toBe('rust');
    expect(rust.title).toBe('Rust');
    expect(rust.short).toBe('Rust');
    expect(rust.tagline).toBeTruthy();
    expect(rust.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(rust.chapters.length).toBeGreaterThanOrEqual(10);
    expect(rust.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of rust.chapters) {
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
    for (const chapter of rust.chapters) {
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
    const chapterIds = new Set(rust.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(rust.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of rust.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Rust samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(25);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('every Rust sample has balanced braces', () => {
    const failures = collectBlocks()
      .filter(block => block.lang === 'rust' && braceBalance(block.code) !== 0)
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });

  test('every Rust sample looks like Rust', () => {
    const failures = [];
    for (const block of collectBlocks()) {
      if (block.lang !== 'rust') continue;
      if (!/(fn\s|let\s|match\s|impl\s|trait\s|enum\s|struct\s|use\s|println!|vec!|macro_rules|extern\s)/.test(block.code)) {
        failures.push(`${block.chapterId}/${block.lessonId}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
