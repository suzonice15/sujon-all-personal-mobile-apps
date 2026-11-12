/**
 * Tests for the Math for ML course.
 *
 * Structure checks always run. The Try-it Python samples are executed with the
 * local Python interpreter when numpy is installed. Without it, those execution
 * tests are skipped.
 */

import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import mathMl from '../src/courses/math-ml';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];
const ALLOWED_LANGS = ['python', 'bash', 'text'];

function collectBlocks() {
  const blocks = [];
  for (const chapter of mathMl.chapters) {
    for (const lesson of chapter.lessons) {
      for (const block of lesson.blocks) {
        if (block.type === 'code') {
          blocks.push({ chapterId: chapter.id, lessonId: lesson.id, lang: block.lang, code: block.value, tryIt: block.tryIt === true });
        }
      }
    }
  }
  return blocks;
}

function hasNumpy() {
  const probe = spawnSync('python', ['-c', 'import numpy'], { encoding: 'utf8' });
  return probe.status === 0;
}

const runSample = hasNumpy() ? test : test.skip;

describe('Math for ML course structure', () => {
  test('has the metadata the app needs', () => {
    expect(mathMl.id).toBe('math-ml');
    expect(mathMl.title).toBe('Math for ML');
    expect(mathMl.short).toBe('Math');
    expect(mathMl.tagline).toBeTruthy();
    expect(mathMl.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(mathMl.chapters.length).toBeGreaterThanOrEqual(10);
    expect(mathMl.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of mathMl.chapters) {
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
    for (const chapter of mathMl.chapters) {
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
    const chapterIds = new Set(mathMl.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(mathMl.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of mathMl.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });

  test('samples use supported languages and are non-empty', () => {
    const blocks = collectBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(20);
    for (const block of blocks) {
      expect(ALLOWED_LANGS).toContain(block.lang);
      expect(block.code.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('Math for ML Try-it samples run', () => {
  const samples = collectBlocks().filter(block => block.tryIt);

  test('there are runnable samples to check', () => {
    expect(samples.length).toBeGreaterThanOrEqual(15);
  });

  const tmpDir = mkdtempSync(path.join(tmpdir(), 'math-ml-course-'));
  afterAll(() => rmSync(tmpDir, { recursive: true, force: true }));

  for (const sample of samples) {
    runSample(`${sample.chapterId}/${sample.lessonId} runs without error`, () => {
      const file = path.join(tmpDir, `${sample.chapterId}-${sample.lessonId}.py`);
      writeFileSync(file, sample.code, 'utf8');
      const result = spawnSync('python', [file], {
        encoding: 'utf8',
        env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
        timeout: 120000,
      });
      if (result.status !== 0) {
        throw new Error(result.stderr || result.stdout || 'python exited with an error');
      }
      expect(result.stdout.trim().length).toBeGreaterThan(0);
    }, 150000);
  }
});
