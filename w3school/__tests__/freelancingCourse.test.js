/**
 * Tests for the Freelancing & Client Work course.
 */

import freelancing from '../src/courses/freelancing';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['text', 'bash'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of freelancing.chapters) {
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

describe('Freelancing course structure', () => {
  test('has the metadata the app needs', () => {
    expect(freelancing.id).toBe('freelancing');
    expect(freelancing.title).toBe('Freelancing & Client Work');
    expect(freelancing.short).toBe('Freelance');
    expect(freelancing.tagline).toBeTruthy();
    expect(freelancing.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(freelancing.chapters.length).toBeGreaterThanOrEqual(10);
    expect(freelancing.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of freelancing.chapters) {
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
    for (const chapter of freelancing.chapters) {
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
    const chapterIds = new Set(freelancing.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(freelancing.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of freelancing.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Freelancing samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(3);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });
});
