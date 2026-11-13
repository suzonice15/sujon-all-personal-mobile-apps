/**
 * Tests for the Express.js course.
 */

import expressCourse from '../src/courses/express';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['js', 'bash', 'text'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of expressCourse.chapters) {
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

describe('Express.js course structure', () => {
  test('has the metadata the app needs', () => {
    expect(expressCourse.id).toBe('express');
    expect(expressCourse.title).toBe('Express.js');
    expect(expressCourse.short).toBe('Express');
    expect(expressCourse.tagline).toBeTruthy();
    expect(expressCourse.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(expressCourse.chapters.length).toBeGreaterThanOrEqual(8);
    expect(expressCourse.quiz.length).toBeGreaterThanOrEqual(30);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of expressCourse.chapters) {
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
    for (const chapter of expressCourse.chapters) {
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
    const chapterIds = new Set(expressCourse.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(expressCourse.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of expressCourse.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Express samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(20);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });
});
