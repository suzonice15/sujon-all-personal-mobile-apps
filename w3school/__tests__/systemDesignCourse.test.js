/**
 * Tests for the System Design course.
 *
 * Diagrams and pseudo-code are read-only. The suite checks structure and that
 * every sample is non-empty.
 */

import systemDesign from '../src/courses/system-design';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of systemDesign.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

describe('System Design course structure', () => {
  test('has the metadata the app needs', () => {
    expect(systemDesign.id).toBe('system-design');
    expect(systemDesign.title).toBe('System Design');
    expect(systemDesign.short).toBe('System Design');
    expect(systemDesign.tagline).toBeTruthy();
    expect(systemDesign.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(systemDesign.chapters.length).toBeGreaterThanOrEqual(10);
    expect(systemDesign.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of systemDesign.chapters) {
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
    for (const chapter of systemDesign.chapters) {
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
    const chapterIds = new Set(systemDesign.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(systemDesign.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of systemDesign.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });

  test('samples are non-empty text diagrams', () => {
    const blocks = [];
    for (const { chapter, lesson } of collectLessons()) {
      for (const block of lesson.blocks) {
        if (block.type === 'code') blocks.push({ chapterId: chapter.id, lessonId: lesson.id, lang: block.lang, code: block.value });
      }
    }
    expect(blocks.length).toBeGreaterThanOrEqual(10);
    for (const block of blocks) {
      expect(block.lang).toBe('text');
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });
});
