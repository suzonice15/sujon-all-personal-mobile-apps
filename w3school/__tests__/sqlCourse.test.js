/**
 * Tests for the SQL & Databases course.
 *
 * Structural checks make sure every chapter, lesson and quiz question has the
 * shape the app expects. The execution checks run the real course SQL against
 * an in-memory SQLite database (Node's built-in node:sqlite) using the exact
 * seed data the Try-it preview uses, so a broken sample fails the build.
 */

import { DatabaseSync } from 'node:sqlite';
import sql from '../src/courses/sql';
import { toDocument, SQL_SEED } from '../src/components/course/preview';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of sql.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectSqlTryItBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.lang === 'sql' && block.tryIt) {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, code: block.value });
      }
    }
  }
  return blocks;
}

function runSql(code) {
  const db = new DatabaseSync(':memory:');
  db.exec(SQL_SEED);
  db.exec(code);
  db.close();
}

describe('SQL course structure', () => {
  test('has the metadata the app needs', () => {
    expect(sql.id).toBe('sql');
    expect(sql.title).toBe('SQL & Databases');
    expect(sql.short).toBeTruthy();
    expect(sql.tagline).toBeTruthy();
    expect(sql.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(sql.icon).toBeTruthy();
    expect(sql.chapters.length).toBeGreaterThanOrEqual(10);
    expect(sql.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('every chapter has an id, title and at least one lesson', () => {
    const ids = new Set();
    for (const chapter of sql.chapters) {
      expect(chapter.id).toBeTruthy();
      expect(ids.has(chapter.id)).toBe(false);
      ids.add(chapter.id);
      expect(chapter.title).toBeTruthy();
      expect(chapter.description).toBeTruthy();
      expect(Array.isArray(chapter.lessons)).toBe(true);
      expect(chapter.lessons.length).toBeGreaterThan(0);
    }
  });

  test('lesson ids are unique and blocks use known types', () => {
    const lessonIds = new Set();
    for (const { lesson } of collectLessons()) {
      expect(lesson.id).toBeTruthy();
      expect(lessonIds.has(lesson.id)).toBe(false);
      lessonIds.add(lesson.id);
      expect(lesson.title).toBeTruthy();
      expect(Array.isArray(lesson.blocks)).toBe(true);
      expect(lesson.blocks.length).toBeGreaterThan(0);
      for (const block of lesson.blocks) {
        expect(ALLOWED_BLOCKS).toContain(block.type);
        if (block.type === 'list') expect(Array.isArray(block.items)).toBe(true);
        else if (block.type === 'code') {
          expect(block.lang).toBeTruthy();
          expect(typeof block.value).toBe('string');
          expect(block.value.length).toBeGreaterThan(0);
        } else {
          expect(typeof block.value).toBe('string');
          expect(block.value.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('every quiz question is valid and points at its chapter', () => {
    const seen = new Set();
    for (const chapter of sql.chapters) {
      expect(chapter.quiz.length).toBeGreaterThanOrEqual(3);
      for (const q of chapter.quiz) {
        expect(q.chapterId).toBe(chapter.id);
        expect(q.q).toBeTruthy();
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBe(4);
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(4);
        expect(q.explain).toBeTruthy();
        expect(seen.has(q.q)).toBe(false);
        seen.add(q.q);
      }
    }
    expect(sql.quiz.length).toBe(sql.chapters.reduce((n, ch) => n + ch.quiz.length, 0));
  });

  test('interview questions are grouped by existing chapters', () => {
    const chapterIds = new Set(sql.chapters.map(ch => ch.id));
    const grouped = Object.keys(sql.interviewQuestions);
    expect(grouped.length).toBeGreaterThan(0);
    for (const chapterId of grouped) {
      expect(chapterIds.has(chapterId)).toBe(true);
      const questions = sql.interviewQuestions[chapterId];
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
      for (const item of questions) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('SQL lesson samples actually run', () => {
  test('the seed data loads', () => {
    const db = new DatabaseSync(':memory:');
    db.exec(SQL_SEED);
    const students = db.prepare('SELECT COUNT(*) AS n FROM students').get();
    const courses = db.prepare('SELECT COUNT(*) AS n FROM courses').get();
    const enrollments = db.prepare('SELECT COUNT(*) AS n FROM enrollments').get();
    expect(students.n).toBe(6);
    expect(courses.n).toBe(5);
    expect(enrollments.n).toBe(10);
    db.close();
  });

  test('every try-it SQL block runs without an error', () => {
    const blocks = collectSqlTryItBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(20);
    const failures = [];
    for (const block of blocks) {
      try {
        runSql(block.code);
      } catch (error) {
        failures.push(`${block.chapterId}/${block.lessonId}: ${error.message}`);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('SQL Try-it preview', () => {
  test('builds an HTML page that loads sql.js and the seed', () => {
    const html = toDocument('SELECT name FROM students;', 'sql');
    expect(html).toContain('sql.js@1.10.3');
    expect(html).toContain('initSqlJs');
    expect(html).toContain('CREATE TABLE students');
    expect(html).toContain('SELECT name FROM students;');
  });

  test('escapes a closing script tag in the lesson code', () => {
    const html = toDocument("SELECT '</script><b>x</b>';", 'sql');
    expect(html).not.toContain("SELECT '</script><b>x</b>';");
    expect(html).toContain('<\\/script>');
  });

  test('other languages still use their own preview', () => {
    expect(toDocument('<h1>hi</h1>', 'html')).toContain('<h1>hi</h1>');
    expect(toDocument('console.log(1)', 'js')).toContain('console.log(1)');
  });
});
