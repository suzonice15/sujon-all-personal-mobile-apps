/**
 * Tests for the Kubernetes course.
 */

import kubernetes from '../src/courses/kubernetes';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['yaml', 'bash', 'text'];

function collectLessons() {
  const lessons = [];
  for (const chapter of kubernetes.chapters) {
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

describe('Kubernetes course structure', () => {
  test('has the metadata the app needs', () => {
    expect(kubernetes.id).toBe('kubernetes');
    expect(kubernetes.title).toBe('Kubernetes');
    expect(kubernetes.short).toBe('K8s');
    expect(kubernetes.tagline).toBeTruthy();
    expect(kubernetes.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(kubernetes.chapters.length).toBeGreaterThanOrEqual(8);
    expect(kubernetes.quiz.length).toBeGreaterThanOrEqual(30);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of kubernetes.chapters) {
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
    for (const chapter of kubernetes.chapters) {
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
    const chapterIds = new Set(kubernetes.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(kubernetes.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of kubernetes.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });

  test('samples use supported languages and are non-empty', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(15);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });
});
