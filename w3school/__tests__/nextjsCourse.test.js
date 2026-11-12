/**
 * Tests for the Next.js course.
 *
 * Next.js cannot run inside the app, so the suite checks structure, brace
 * balance and that the samples use the App Router APIs they describe.
 */

import nextjs from '../src/courses/nextjs';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['tsx', 'ts', 'bash', 'text'];

function collectLessons() {
  const lessons = [];
  for (const chapter of nextjs.chapters) {
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

describe('Next.js course structure', () => {
  test('has the metadata the app needs', () => {
    expect(nextjs.id).toBe('nextjs');
    expect(nextjs.title).toBe('Next.js');
    expect(nextjs.short).toBe('Next.js');
    expect(nextjs.tagline).toBeTruthy();
    expect(nextjs.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(nextjs.chapters.length).toBeGreaterThanOrEqual(10);
    expect(nextjs.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of nextjs.chapters) {
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
    for (const chapter of nextjs.chapters) {
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
    const chapterIds = new Set(nextjs.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(nextjs.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of nextjs.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Next.js samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(25);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('every TypeScript and TSX sample has balanced braces', () => {
    const failures = collectBlocks()
      .filter(block => (block.lang === 'tsx' || block.lang === 'ts') && braceBalance(block.code) !== 0)
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });

  test('pages that receive params await them', () => {
    const failures = [];
    for (const block of collectBlocks()) {
      if (block.code.includes('{ params }') && !block.code.includes('await params')) {
        failures.push(`${block.chapterId}/${block.lessonId}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
