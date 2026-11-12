/**
 * Tests for the Compiler Design course.
 *
 * Structure plus execution of the small JavaScript samples that are marked
 * try-it. The larger compiler stages are read-only by design.
 */

import vm from 'node:vm';
import compiler from '../src/courses/compiler';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['js', 'text', 'bash', 'c'];

function collectLessons() {
  const lessons = [];
  for (const chapter of compiler.chapters) {
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
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, lang: block.lang, code: block.value, tryIt: block.tryIt === true });
      }
    }
  }
  return blocks;
}

function runJs(code) {
  const logs = [];
  vm.runInNewContext(code, { console: { log: (...args) => logs.push(args) } }, { timeout: 2000 });
  return logs;
}

describe('Compiler course structure', () => {
  test('has the metadata the app needs', () => {
    expect(compiler.id).toBe('compiler');
    expect(compiler.title).toBe('Compiler Design');
    expect(compiler.short).toBe('Compiler');
    expect(compiler.tagline).toBeTruthy();
    expect(compiler.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(compiler.chapters.length).toBeGreaterThanOrEqual(8);
    expect(compiler.quiz.length).toBeGreaterThanOrEqual(30);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of compiler.chapters) {
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
    for (const chapter of compiler.chapters) {
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
    const chapterIds = new Set(compiler.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(compiler.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of compiler.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });

  test('samples use supported languages', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(12);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('every JavaScript try-it sample runs', () => {
    const blocks = collectBlocks().filter(block => block.lang === 'js' && block.tryIt);
    expect(blocks.length).toBeGreaterThanOrEqual(3);
    const failures = [];
    for (const block of blocks) {
      try {
        runJs(block.code);
      } catch (error) {
        failures.push(`${block.chapterId}/${block.lessonId}: ${error.message}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
