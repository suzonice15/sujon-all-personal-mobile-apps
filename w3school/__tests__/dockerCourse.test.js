/**
 * Tests for the Docker & DevOps course.
 *
 * Container samples are read-only. The suite checks structure and that every
 * Dockerfile starts with FROM and every YAML block is non-empty with a key.
 */

import docker from '../src/courses/docker';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of docker.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectBlocks(lang) {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.lang === lang) {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, code: block.value, fragment: block.fragment === true });
      }
    }
  }
  return blocks;
}

describe('Docker course structure', () => {
  test('has the metadata the app needs', () => {
    expect(docker.id).toBe('docker');
    expect(docker.title).toBe('Docker & DevOps');
    expect(docker.short).toBe('Docker');
    expect(docker.tagline).toBeTruthy();
    expect(docker.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(docker.chapters.length).toBeGreaterThanOrEqual(10);
    expect(docker.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of docker.chapters) {
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
    for (const chapter of docker.chapters) {
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
    const chapterIds = new Set(docker.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(docker.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of docker.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Docker samples', () => {
  test('every Dockerfile starts with FROM', () => {
    const blocks = collectBlocks('dockerfile');
    expect(blocks.length).toBeGreaterThanOrEqual(3);
    const failures = blocks
      .filter(block => !block.fragment && !/^\s*FROM\s+/m.test(block.code))
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });

  test('YAML samples contain key/value structure', () => {
    const blocks = collectBlocks('yaml');
    expect(blocks.length).toBeGreaterThanOrEqual(5);
    const failures = blocks
      .filter(block => !/^\s*[A-Za-z_][\w.-]*\s*:/m.test(block.code))
      .map(block => `${block.chapterId}/${block.lessonId}`);
    expect(failures).toEqual([]);
  });

  test('shell samples are non-empty and LF-only', () => {
    const blocks = collectBlocks('bash');
    expect(blocks.length).toBeGreaterThanOrEqual(10);
    const failures = [];
    for (const block of blocks) {
      if (!block.code.trim()) failures.push(`${block.chapterId}/${block.lessonId}: empty`);
      if (block.code.includes('\r')) failures.push(`${block.chapterId}/${block.lessonId}: CRLF`);
    }
    expect(failures).toEqual([]);
  });
});
