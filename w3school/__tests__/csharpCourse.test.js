/**
 * Tests for the C# language course.
 *
 * No .NET SDK is installed here, so the suite checks structure, brace balance
 * and that every sample is recognisably C# code.
 */

import csharp from '../src/courses/csharp';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of csharp.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code') {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, lang: block.lang, code: block.value });
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

describe('C# course structure', () => {
  test('has the metadata the app needs', () => {
    expect(csharp.id).toBe('csharp');
    expect(csharp.title).toBe('C#');
    expect(csharp.short).toBe('C#');
    expect(csharp.tagline).toBeTruthy();
    expect(csharp.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(csharp.chapters.length).toBeGreaterThanOrEqual(10);
    expect(csharp.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of csharp.chapters) {
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
    for (const chapter of csharp.chapters) {
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
    const chapterIds = new Set(csharp.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(csharp.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of csharp.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('C# samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(25);
    for (const block of blocks) {
      expect(['csharp', 'bash', 'text']).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('every C# sample has balanced braces', () => {
    const failures = collectBlocks()
      .filter(block => block.lang === 'csharp' && braceBalance(block.code) !== 0)
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });

  test('every C# sample looks like C#', () => {
    const failures = [];
    for (const block of collectBlocks()) {
      if (block.lang !== 'csharp') continue;
      if (!/(using\s|class\s|record\s|interface\s|var\s|public\s|static\s|new\s|Console\.)/.test(block.code)) {
        failures.push(`${block.chapterId}/${block.lessonId}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
