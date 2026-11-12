/**
 * Tests for the Cybersecurity course.
 *
 * Samples are read-only. The suite checks structure and that every code block
 * uses a supported language label.
 */

import cybersecurity from '../src/courses/cybersecurity';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['js', 'bash', 'text', 'yaml', 'json'];

function collectLessons() {
  const lessons = [];
  for (const chapter of cybersecurity.chapters) {
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

function braceBalance(code) {
  let depth = 0;
  for (const char of code) {
    if (char === '{') depth++;
    if (char === '}') depth--;
    if (depth < 0) return depth;
  }
  return depth;
}

describe('Cybersecurity course structure', () => {
  test('has the metadata the app needs', () => {
    expect(cybersecurity.id).toBe('cybersecurity');
    expect(cybersecurity.title).toBe('Cybersecurity');
    expect(cybersecurity.short).toBe('Security');
    expect(cybersecurity.tagline).toBeTruthy();
    expect(cybersecurity.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(cybersecurity.chapters.length).toBeGreaterThanOrEqual(10);
    expect(cybersecurity.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of cybersecurity.chapters) {
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
    for (const chapter of cybersecurity.chapters) {
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
    const chapterIds = new Set(cybersecurity.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(cybersecurity.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of cybersecurity.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });

  test('samples use supported languages and balanced JS braces', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(15);
    const failures = [];
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
      if (block.lang === 'js' && braceBalance(block.code) !== 0) {
        failures.push(`${block.chapterId}/${block.lessonId}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
