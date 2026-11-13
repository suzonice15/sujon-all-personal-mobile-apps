/**
 * Structure tests for the batch of new courses:
 * Django, Flask, Payments, Auth, English, Interview Prep, Agile.
 */

import django from '../src/courses/django';
import flask from '../src/courses/flask';
import payments from '../src/courses/payments';
import auth from '../src/courses/auth';
import englishDev from '../src/courses/english-dev';
import interviewPrep from '../src/courses/interview-prep';
import agile from '../src/courses/agile';
import pwa from '../src/courses/pwa';
import realtime from '../src/courses/realtime';
import codeigniter from '../src/courses/codeigniter';
import bootstrap from '../src/courses/bootstrap';
import tailwind from '../src/courses/tailwind';
import jquery from '../src/courses/jquery';
import sqlserver from '../src/courses/sqlserver';
import sqlite from '../src/courses/sqlite';
import githubActions from '../src/courses/github-actions';
import cicd from '../src/courses/cicd';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

const COURSES = [
  { course: django, id: 'django', title: 'Django', short: 'Django', minChapters: 10, minQuiz: 40, langs: ['python', 'bash', 'html', 'text'] },
  { course: flask, id: 'flask', title: 'Flask', short: 'Flask', minChapters: 9, minQuiz: 36, langs: ['python', 'bash', 'html', 'text'] },
  { course: payments, id: 'payments', title: 'Payment Integration', short: 'Payments', minChapters: 9, minQuiz: 36, langs: ['js', 'python', 'bash', 'text'] },
  { course: auth, id: 'auth', title: 'Authentication & OAuth', short: 'Auth', minChapters: 9, minQuiz: 36, langs: ['js', 'python', 'bash', 'text'] },
  { course: englishDev, id: 'english-dev', title: 'English for Developers', short: 'English', minChapters: 8, minQuiz: 32, langs: ['text', 'js', 'html'] },
  { course: interviewPrep, id: 'interview-prep', title: 'Interview Preparation', short: 'Interview', minChapters: 8, minQuiz: 32, langs: ['text'] },
  { course: agile, id: 'agile', title: 'Agile & Scrum', short: 'Agile', minChapters: 8, minQuiz: 32, langs: ['text'] },
  { course: pwa, id: 'pwa', title: 'Progressive Web Apps', short: 'PWA', minChapters: 9, minQuiz: 36, langs: ['js', 'json', 'html', 'bash', 'text'] },
  { course: realtime, id: 'realtime', title: 'WebSockets & Realtime', short: 'Realtime', minChapters: 9, minQuiz: 36, langs: ['js', 'bash', 'text', 'yaml'] },
  { course: codeigniter, id: 'codeigniter', title: 'CodeIgniter', short: 'CodeIgniter', minChapters: 8, minQuiz: 32, langs: ['php', 'bash', 'html', 'text'] },
  { course: bootstrap, id: 'bootstrap', title: 'Bootstrap 5', short: 'Bootstrap', minChapters: 8, minQuiz: 32, langs: ['html', 'js', 'css', 'text'] },
  { course: tailwind, id: 'tailwind', title: 'Tailwind CSS', short: 'Tailwind', minChapters: 8, minQuiz: 32, langs: ['bash', 'css', 'html', 'js', 'text'] },
  { course: jquery, id: 'jquery', title: 'jQuery', short: 'jQuery', minChapters: 7, minQuiz: 28, langs: ['js', 'html', 'css', 'text'] },
  { course: sqlserver, id: 'sqlserver', title: 'SQL Server', short: 'SQL Server', minChapters: 7, minQuiz: 28, langs: ['sql', 'bash', 'text'] },
  { course: sqlite, id: 'sqlite', title: 'SQLite', short: 'SQLite', minChapters: 7, minQuiz: 28, langs: ['sql', 'bash', 'js', 'text'] },
  { course: githubActions, id: 'github-actions', title: 'GitHub Actions', short: 'Actions', minChapters: 7, minQuiz: 28, langs: ['yaml', 'text'] },
  { course: cicd, id: 'cicd', title: 'CI/CD', short: 'CI/CD', minChapters: 7, minQuiz: 28, langs: ['yaml', 'bash', 'js', 'text'] },
];

describe.each(COURSES)('$title course', ({ course, id, title, short, minChapters, minQuiz, langs }) => {
  test('has the metadata the app needs', () => {
    expect(course.id).toBe(id);
    expect(course.title).toBe(title);
    expect(course.short).toBe(short);
    expect(course.tagline).toBeTruthy();
    expect(course.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(course.chapters.length).toBeGreaterThanOrEqual(minChapters);
    expect(course.quiz.length).toBeGreaterThanOrEqual(minQuiz);
  });

  test('chapters and lessons are complete and unique', () => {
    const chapterIds = new Set();
    const lessonIds = new Set();
    for (const chapter of course.chapters) {
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
          if (block.type === 'code') {
            expect(langs).toContain(block.lang);
            expect(block.value.trim().length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  test('every quiz question is valid', () => {
    const seen = new Set();
    for (const chapter of course.chapters) {
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
    const chapterIds = new Set(course.chapters.map(ch => ch.id));
    for (const chapterId of Object.keys(course.interviewQuestions)) {
      expect(chapterIds.has(chapterId)).toBe(true);
      for (const item of course.interviewQuestions[chapterId]) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});
