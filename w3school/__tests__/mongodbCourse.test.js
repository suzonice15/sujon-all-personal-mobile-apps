/**
 * Tests for the MongoDB course.
 *
 * Shell and driver samples are read-only. The suite checks structure and the
 * language labels used by the code blocks.
 */

import mongodb from '../src/courses/mongodb';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of mongodb.chapters) {
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

describe('MongoDB course structure', () => {
  test('has the metadata the app needs', () => {
    expect(mongodb.id).toBe('mongodb');
    expect(mongodb.title).toBe('MongoDB');
    expect(mongodb.short).toBe('MongoDB');
    expect(mongodb.tagline).toBeTruthy();
    expect(mongodb.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(mongodb.chapters.length).toBeGreaterThanOrEqual(10);
    expect(mongodb.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of mongodb.chapters) {
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
    for (const chapter of mongodb.chapters) {
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
    const chapterIds = new Set(mongodb.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(mongodb.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of mongodb.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('MongoDB samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(20);
    for (const block of blocks) {
      expect(['mongosh', 'js', 'text']).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('samples are LF-only', () => {
    const failures = collectBlocks()
      .filter(block => block.code.includes('\r'))
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });
});
