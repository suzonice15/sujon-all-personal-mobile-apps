/**
 * Tests for the C++ course.
 *
 * No C++ compiler is installed here, so the suite verifies structure, brace
 * balance, required includes and that every sample is a complete program.
 */

import cpp from '../src/courses/cpp';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of cpp.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectCppBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.lang === 'cpp') {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, code: block.value });
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

describe('C++ course structure', () => {
  test('has the metadata the app needs', () => {
    expect(cpp.id).toBe('cpp');
    expect(cpp.title).toBe('C++');
    expect(cpp.short).toBe('C++');
    expect(cpp.tagline).toBeTruthy();
    expect(cpp.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(cpp.chapters.length).toBeGreaterThanOrEqual(10);
    expect(cpp.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of cpp.chapters) {
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
    for (const chapter of cpp.chapters) {
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
    const chapterIds = new Set(cpp.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(cpp.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of cpp.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('C++ samples', () => {
  test('there is a meaningful number of samples', () => {
    expect(collectCppBlocks().length).toBeGreaterThanOrEqual(20);
  });

  test('every sample has balanced braces', () => {
    const failures = collectCppBlocks()
      .filter(block => braceBalance(block.code) !== 0)
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });

  test('every sample includes a header and a main', () => {
    const failures = [];
    for (const block of collectCppBlocks()) {
      if (!block.code.includes('#include')) failures.push(`${block.chapterId}/${block.lessonId}: no include`);
      if (!/int\s+main\s*\(/.test(block.code)) failures.push(`${block.chapterId}/${block.lessonId}: no main`);
      if (!/return\s+0\s*;/.test(block.code)) failures.push(`${block.chapterId}/${block.lessonId}: no return`);
    }
    expect(failures).toEqual([]);
  });

  test('samples do not use using namespace std', () => {
    const failures = collectCppBlocks()
      .filter(block => /using\s+namespace\s+std/.test(block.code))
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });
});
