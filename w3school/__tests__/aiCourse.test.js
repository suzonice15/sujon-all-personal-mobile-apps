/**
 * Tests for the AI for Developers course.
 *
 * Code samples are read-only. The suite checks structure and the language
 * labels used by prompts, JSON and API examples.
 */

import ai from '../src/courses/ai';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['js', 'python', 'text', 'json', 'bash'];

function collectLessons() {
  const lessons = [];
  for (const chapter of ai.chapters) {
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

describe('AI course structure', () => {
  test('has the metadata the app needs', () => {
    expect(ai.id).toBe('ai');
    expect(ai.title).toBe('AI for Developers');
    expect(ai.short).toBe('AI');
    expect(ai.tagline).toBeTruthy();
    expect(ai.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(ai.chapters.length).toBeGreaterThanOrEqual(10);
    expect(ai.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of ai.chapters) {
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
    for (const chapter of ai.chapters) {
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
    const chapterIds = new Set(ai.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(ai.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of ai.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });

  test('samples are non-empty and use supported languages', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(15);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });
});
