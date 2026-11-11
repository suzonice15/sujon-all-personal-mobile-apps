/**
 * Tests for the DSA course.
 *
 * Structural checks plus real execution of every try-it JavaScript snippet in
 * a fresh VM context. A snippet that throws, loops forever or uses an
 * unsupported language fails the suite before it reaches a learner.
 */

import vm from 'node:vm';
import dsa from '../src/courses/dsa';
import { toDocument } from '../src/components/course/preview';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of dsa.chapters) {
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
  vm.runInNewContext(code, {
    console: { log: (...args) => logs.push(args) },
  }, { timeout: 2000 });
  return logs;
}

describe('DSA course structure', () => {
  test('has the metadata the app needs', () => {
    expect(dsa.id).toBe('dsa');
    expect(dsa.title).toBe('Data Structures & Algorithms');
    expect(dsa.short).toBe('DSA');
    expect(dsa.tagline).toBeTruthy();
    expect(dsa.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(dsa.icon).toBeTruthy();
    expect(dsa.chapters.length).toBeGreaterThanOrEqual(10);
    expect(dsa.quiz.length).toBeGreaterThanOrEqual(45);
  });

  test('every chapter has an id, title and at least one lesson', () => {
    const ids = new Set();
    for (const chapter of dsa.chapters) {
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
    for (const chapter of dsa.chapters) {
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
    expect(dsa.quiz.length).toBe(dsa.chapters.reduce((n, ch) => n + ch.quiz.length, 0));
  });

  test('interview questions are grouped by existing chapters', () => {
    const chapterIds = new Set(dsa.chapters.map(ch => ch.id));
    const grouped = Object.keys(dsa.interviewQuestions);
    expect(grouped.length).toBeGreaterThan(0);
    for (const chapterId of grouped) {
      expect(chapterIds.has(chapterId)).toBe(true);
      const questions = dsa.interviewQuestions[chapterId];
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

describe('DSA lesson samples', () => {
  test('every try-it block is JavaScript', () => {
    const blocks = collectTryItBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(25);
    for (const block of blocks) {
      expect(block.lang).toBe('js');
    }
  });

  test('every try-it block runs without throwing or hanging', () => {
    const blocks = collectTryItBlocks();
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

  test('every try-it block produces at least one console output', () => {
    const blocks = collectTryItBlocks();
    const silent = [];
    for (const block of blocks) {
      const logs = runJs(block.code);
      if (logs.length === 0) silent.push(`${block.chapterId}/${block.lessonId}`);
    }
    expect(silent).toEqual([]);
  });
});

describe('DSA Try-it preview', () => {
  test('JavaScript preview still builds', () => {
    const html = toDocument('console.log(1);', 'js');
    expect(html).toContain('console.log(1);');
    expect(html).toContain('window.__JS_ONLY__');
  });
});
