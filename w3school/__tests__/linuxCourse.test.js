/**
 * Tests for the Linux & Bash course.
 *
 * The app has no real shell, so command samples are read-only. The suite
 * checks structure, requires every bash sample to be non-empty and rejects
 * a few destructive patterns that should never ship as a copyable example.
 */

import linux from '../src/courses/linux';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const DANGEROUS = [
  /rm\s+-rf\s+\/(\s|$)/,
  /rm\s+-rf\s+~/,
  /mkfs\./,
  /dd\s+if=.*of=\/dev\//,
  /:\(\)\s*\{\s*:\|:&\s*\};:/,
];

function collectLessons() {
  const lessons = [];
  for (const chapter of linux.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectShellBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.lang === 'bash') {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, code: block.value });
      }
    }
  }
  return blocks;
}

describe('Linux course structure', () => {
  test('has the metadata the app needs', () => {
    expect(linux.id).toBe('linux');
    expect(linux.title).toBe('Linux & Bash');
    expect(linux.short).toBe('Linux');
    expect(linux.tagline).toBeTruthy();
    expect(linux.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(linux.chapters.length).toBeGreaterThanOrEqual(10);
    expect(linux.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of linux.chapters) {
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
    for (const chapter of linux.chapters) {
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
    const chapterIds = new Set(linux.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(linux.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of linux.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Linux shell samples', () => {
  test('there is a meaningful number of samples', () => {
    expect(collectShellBlocks().length).toBeGreaterThanOrEqual(25);
  });

  test('every shell sample is non-empty and LF-only', () => {
    const failures = [];
    for (const block of collectShellBlocks()) {
      if (!block.code.trim()) failures.push(`${block.chapterId}/${block.lessonId}: empty`);
      if (block.code.includes('\r')) failures.push(`${block.chapterId}/${block.lessonId}: CRLF`);
    }
    expect(failures).toEqual([]);
  });

  test('no destructive example is copyable', () => {
    const failures = [];
    for (const block of collectShellBlocks()) {
      for (const pattern of DANGEROUS) {
        if (pattern.test(block.code)) {
          failures.push(`${block.chapterId}/${block.lessonId}: ${pattern}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });
});
