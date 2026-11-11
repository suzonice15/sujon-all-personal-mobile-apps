/**
 * Tests for the Java course.
 *
 * Every Java sample is compiled with the real javac from the local JDK 17 and
 * then executed when it has a main method. Compilation catches syntax and type
 * errors that a structural test cannot see.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import java from '../src/courses/java';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of java.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectJavaBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.lang === 'java') {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, code: block.value, compile: block.compile !== false });
      }
    }
  }
  return blocks;
}

function compileAndRun(code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codenest-java-'));
  try {
    const match = code.match(/public\s+(?:class|interface|enum)\s+(\w+)/);
    const name = match ? match[1] : 'Main';
    const file = path.join(dir, name + '.java');
    fs.writeFileSync(file, code);
    execFileSync('javac', ['-encoding', 'UTF-8', '-d', dir, file], { stdio: 'pipe' });
    if (/static\s+void\s+main\s*\(/.test(code)) {
      execFileSync('java', ['-cp', dir, name], { stdio: 'pipe', timeout: 15000, cwd: dir });
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

describe('Java course structure', () => {
  test('has the metadata the app needs', () => {
    expect(java.id).toBe('java');
    expect(java.title).toBe('Java');
    expect(java.short).toBe('Java');
    expect(java.tagline).toBeTruthy();
    expect(java.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(java.icon).toBeTruthy();
    expect(java.chapters.length).toBeGreaterThanOrEqual(10);
    expect(java.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('every chapter has an id, title and at least one lesson', () => {
    const ids = new Set();
    for (const chapter of java.chapters) {
      expect(chapter.id).toBeTruthy();
      expect(ids.has(chapter.id)).toBe(false);
      ids.add(chapter.id);
      expect(chapter.title).toBeTruthy();
      expect(chapter.description).toBeTruthy();
      expect(chapter.lessons.length).toBeGreaterThan(0);
    }
  });

  test('lesson ids are unique and blocks use known types', () => {
    const lessonIds = new Set();
    for (const { lesson } of collectLessons()) {
      expect(lessonIds.has(lesson.id)).toBe(false);
      lessonIds.add(lesson.id);
      expect(lesson.title).toBeTruthy();
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
  });

  test('every quiz question is valid and points at its chapter', () => {
    const seen = new Set();
    for (const chapter of java.chapters) {
      expect(chapter.quiz.length).toBeGreaterThanOrEqual(3);
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
    const chapterIds = new Set(java.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(java.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      const questions = java.interviewQuestions[chapterId];
      expect(questions.length).toBeGreaterThan(0);
      for (const item of questions) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('Java samples compile and run', () => {
  test('there is a meaningful number of samples', () => {
    expect(collectJavaBlocks().length).toBeGreaterThanOrEqual(30);
  });

  test('every Java sample compiles (and runs when it has a main)', () => {
    const failures = [];
    for (const block of collectJavaBlocks()) {
      if (!block.compile) continue;
      try {
        compileAndRun(block.code);
      } catch (error) {
        const output = [error.stdout, error.stderr].filter(Boolean).map(String).join('\n');
        failures.push(`${block.chapterId}/${block.lessonId}: ${output || error.message}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
