/**
 * Tests for the Computer Architecture course.
 */

import vm from 'node:vm';
import architecture from '../src/courses/architecture';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['text', 'c', 'bash', 'js'];

function collectLessons() {
  const lessons = [];
  for (const chapter of architecture.chapters) {
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
  vm.runInNewContext(code, { console: { log: () => {} } }, { timeout: 2000 });
}

describe('Architecture course structure', () => {
  test('has the metadata the app needs', () => {
    expect(architecture.id).toBe('architecture');
    expect(architecture.title).toBe('Computer Architecture');
    expect(architecture.short).toBe('Architecture');
    expect(architecture.tagline).toBeTruthy();
    expect(architecture.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(architecture.chapters.length).toBeGreaterThanOrEqual(8);
    expect(architecture.quiz.length).toBeGreaterThanOrEqual(30);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of architecture.chapters) {
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
    for (const chapter of architecture.chapters) {
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
    const chapterIds = new Set(architecture.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(architecture.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of architecture.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });

  test('samples use supported languages and JS try-it runs', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(10);
    const failures = [];
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
      if (block.lang === 'js' && block.tryIt) {
        try {
          runJs(block.code);
        } catch (error) {
          failures.push(`${block.chapterId}/${block.lessonId}: ${error.message}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });
});
