// Course content lives in one folder per course: src/courses/<course>/
//   index.js          course info (id, title, short, tagline, color, icon) and chapter order
//   <chapter-id>.js   one chapter: { id, title, description, icon, lessons, quiz }
//
// Lesson blocks:
//   { type: 'text', value }                 paragraph
//   { type: 'heading', value }              small sub-heading inside a lesson
//   { type: 'list', items: [] }             bullet list
//   { type: 'code', lang, value, tryIt }    code sample (lang: html | css | js | jsx | vue | php | text); tryIt opens the live editor
//                                           (js runs as a script with a console panel; jsx renders with React;
//                                           vue mounts a Single File Component; php runs on PHP 8.3 compiled to WebAssembly)
//   { type: 'note', value }                 highlighted tip
//
// Quiz questions: { chapterId, q, options: [4 strings], answer: <index>, explain }.
// Options are shuffled when a quiz starts, so the answer position does not matter.
// Lesson ids are stored with the user's progress: never rename an existing one.

import html from './html';
import css from './css';
import javascript from './javascript';
import react from './react';
import vue from './vue';
import php from './php';

// Every course shown on the Home grid. Only add a course here once its
// content is written: Play rejects apps with empty "coming soon" sections.
// To add one: create its folder (copy the shape of ./html) and list it here.
export const COURSE_GROUPS = [
  { title: 'Web Development', courses: [html, css, javascript] },
  { title: 'Frontend Frameworks', courses: [react, vue] },
  { title: 'Backend Development', courses: [php] },
];

export const COURSES = COURSE_GROUPS.flatMap(g => g.courses);

export const getCourse = (courseId) => COURSES.find(c => c.id === courseId) || null;

export const getAllLessons = (course) =>
  course.chapters.flatMap(ch => ch.lessons.map(l => ({ ...l, chapterId: ch.id })));

export const findLesson = (course, lessonId) => {
  const all = getAllLessons(course);
  const index = all.findIndex(l => l.id === lessonId);
  if (index < 0) return null;
  return { lesson: all[index], prev: all[index - 1] || null, next: all[index + 1] || null };
};

export const getChapter = (course, chapterId) => course.chapters.find(ch => ch.id === chapterId);

export const getQuizQuestions = (course, chapterId = null) =>
  chapterId ? course.quiz.filter(q => q.chapterId === chapterId) : course.quiz;

export const countLessons = (course) => course.chapters.reduce((n, ch) => n + ch.lessons.length, 0);

// Interview questions live in src/courses/<course>/interview-qa.js, grouped by chapter id:
//   { [chapterId]: [{ q, a, level: 'basic' | 'intermediate' | 'advanced', code?, lang? }] }
export const getInterviewQuestions = (course, chapterId) => course.interviewQuestions?.[chapterId] || [];

export const countInterviewQuestions = (course) =>
  course.chapters.reduce((n, ch) => n + getInterviewQuestions(course, ch.id).length, 0);

// Stable key used to store "practiced" state for one question.
export const interviewKey = (course, chapterId, index) => `${course.id}:${chapterId}:${index}`;
