/**
 * Tests for the Node.js & Express course.
 *
 * Server samples are intentionally NOT executed (the Try-it preview is a
 * browser, not Node). Every runnable sample is plain JavaScript and is
 * executed in a VM context with a small timer stub.
 */

import vm from 'node:vm';
import nodejs from '../src/courses/nodejs';
import { toDocument } from '../src/components/course/preview';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of nodejs.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectTryItBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.tryIt) {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, lang: block.lang, code: block.value });
      }
    }
  }
  return blocks;
}

function runJs(code) {
  const logs = [];
  const queue = [];
  vm.runInNewContext(code, {
    console: { log: (...args) => logs.push(args) },
    setTimeout: fn => queue.push(fn),
  }, { timeout: 2000 });
  // Drain timers after the synchronous phase, like the event loop would.
  queue.forEach(fn => fn());
  return logs;
}

describe('Node.js course structure', () => {
  test('has the metadata the app needs', () => {
    expect(nodejs.id).toBe('nodejs');
    expect(nodejs.title).toBe('Node.js & Express');
    expect(nodejs.short).toBe('Node');
    expect(nodejs.tagline).toBeTruthy();
    expect(nodejs.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(nodejs.icon).toBeTruthy();
    expect(nodejs.chapters.length).toBeGreaterThanOrEqual(10);
    expect(nodejs.quiz.length).toBeGreaterThanOrEqual(45);
  });

  test('every chapter has an id, title and at least one lesson', () => {
    const ids = new Set();
    for (const chapter of nodejs.chapters) {
      expect(chapter.id).toBeTruthy();
      expect(ids.has(chapter.id)).toBe(false);
      ids.add(chapter.id);
      expect(chapter.title).toBeTruthy();
      expect(chapter.description).toBeTruthy();
      expect(Array.isArray(chapter.lessons)).toBe(true);
      expect(chapter.lessons.length).toBeGreaterThan(0);
    }
  });

  test('lesson ids are unique and blocks use known types', () => {
    const lessonIds = new Set();
    for (const { lesson } of collectLessons()) {
      expect(lesson.id).toBeTruthy();
      expect(lessonIds.has(lesson.id)).toBe(false);
      lessonIds.add(lesson.id);
      expect(lesson.title).toBeTruthy();
      expect(Array.isArray(lesson.blocks)).toBe(true);
      expect(lesson.blocks.length).toBeGreaterThan(0);
      for (const block of lesson.blocks) {
        expect(ALLOWED_BLOCKS).toContain(block.type);
        if (block.type === 'list') expect(Array.isArray(block.items)).toBe(true);
        else {
          expect(typeof block.value).toBe('string');
          expect(block.value.length).toBeGreaterThan(0);
          if (block.type === 'code') expect(block.lang).toBeTruthy();
        }
      }
    }
  });

  test('every quiz question is valid and points at its chapter', () => {
    const seen = new Set();
    for (const chapter of nodejs.chapters) {
      expect(chapter.quiz.length).toBeGreaterThanOrEqual(3);
      for (const q of chapter.quiz) {
        expect(q.chapterId).toBe(chapter.id);
        expect(q.q).toBeTruthy();
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBe(4);
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(4);
        expect(q.explain).toBeTruthy();
        expect(seen.has(q.q)).toBe(false);
        seen.add(q.q);
      }
    }
    expect(nodejs.quiz.length).toBe(nodejs.chapters.reduce((n, ch) => n + ch.quiz.length, 0));
  });

  test('interview questions are grouped by existing chapters', () => {
    const chapterIds = new Set(nodejs.chapters.map(ch => ch.id));
    const grouped = Object.keys(nodejs.interviewQuestions);
    expect(grouped.length).toBeGreaterThan(0);
    for (const chapterId of grouped) {
      expect(chapterIds.has(chapterId)).toBe(true);
      const questions = nodejs.interviewQuestions[chapterId];
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
      for (const item of questions) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Node.js lesson samples', () => {
  test('every runnable block is JavaScript', () => {
    const blocks = collectTryItBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(3);
    for (const block of blocks) {
      expect(block.lang).toBe('js');
    }
  });

  test('every runnable block executes and prints something', () => {
    const blocks = collectTryItBlocks();
    const failures = [];
    for (const block of blocks) {
      try {
        const logs = runJs(block.code);
        if (logs.length === 0) failures.push(`${block.chapterId}/${block.lessonId}: no output`);
      } catch (error) {
        failures.push(`${block.chapterId}/${block.lessonId}: ${error.message}`);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('Node.js Try-it preview', () => {
  test('JavaScript preview still builds for a runnable sample', () => {
    const html = toDocument('console.log(1);', 'js');
    expect(html).toContain('console.log(1);');
  });
});
