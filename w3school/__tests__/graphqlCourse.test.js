/**
 * Tests for the GraphQL course.
 */

import graphql from '../src/courses/graphql';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['text', 'js', 'bash'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of graphql.chapters) {
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

describe('GraphQL course structure', () => {
  test('has the metadata the app needs', () => {
    expect(graphql.id).toBe('graphql');
    expect(graphql.title).toBe('GraphQL');
    expect(graphql.short).toBe('GraphQL');
    expect(graphql.tagline).toBeTruthy();
    expect(graphql.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(graphql.chapters.length).toBeGreaterThanOrEqual(10);
    expect(graphql.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of graphql.chapters) {
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
    for (const chapter of graphql.chapters) {
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
    const chapterIds = new Set(graphql.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(graphql.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of graphql.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('GraphQL samples', () => {
  test('there is a meaningful number of samples', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(20);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });

  test('samples look like GraphQL or client code', () => {
    const failures = [];
    for (const block of collectBlocks()) {
      if (block.lang === 'text') continue;
      if (!/(gql|query|mutation|subscription|type |resolver|apollo|useQuery|useMutation|GraphQLError|DataLoader|pubsub)/i.test(block.code)) {
        failures.push(`${block.chapterId}/${block.lessonId}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
