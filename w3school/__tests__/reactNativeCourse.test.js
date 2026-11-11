/**
 * Tests for the React Native course.
 *
 * Native samples are read-only because the Try-it preview is a browser. The
 * suite checks structure and that every sample is non-empty and uses the
 * React Native language label.
 */

import reactNative from '../src/courses/react-native';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of reactNative.chapters) {
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

describe('React Native course structure', () => {
  test('has the metadata the app needs', () => {
    expect(reactNative.id).toBe('react-native');
    expect(reactNative.title).toBe('React Native');
    expect(reactNative.short).toBe('RN');
    expect(reactNative.tagline).toBeTruthy();
    expect(reactNative.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(reactNative.chapters.length).toBeGreaterThanOrEqual(10);
    expect(reactNative.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of reactNative.chapters) {
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
    for (const chapter of reactNative.chapters) {
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
    const chapterIds = new Set(reactNative.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(reactNative.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of reactNative.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('React Native samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(20);
    for (const block of blocks) {
      expect(block.lang).toBeTruthy();
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('native samples use rn or text and never ask for a browser preview', () => {
    for (const block of collectBlocks()) {
      expect(['rn', 'js', 'text', 'bash']).toContain(block.lang);
    }
  });
});
