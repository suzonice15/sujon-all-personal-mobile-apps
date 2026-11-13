import {
  COURSES,
  getCourse,
  getAllLessons,
  findLesson,
  getChapter,
  getQuizQuestions,
  getInterviewQuestions,
  countLessons,
} from '../src/courses';
import { LEARNING_PATHS } from '../src/courses/learningPaths';

test('every course id is unique', () => {
  const ids = COURSES.map(c => c.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('lesson ids are globally unique (progress keys)', () => {
  const seen = new Map();
  const dupes = [];
  for (const course of COURSES) {
    for (const lesson of getAllLessons(course)) {
      if (seen.has(lesson.id)) dupes.push(`${lesson.id} in ${seen.get(lesson.id)} and ${course.id}`);
      seen.set(lesson.id, course.id);
    }
  }
  expect(dupes).toEqual([]);
});

test('every screen selector resolves for every course', () => {
  const problems = [];
  for (const course of COURSES) {
    const lessons = getAllLessons(course);
    expect(lessons.length).toBe(countLessons(course));
    lessons.forEach((lesson, index) => {
      const found = findLesson(course, lesson.id);
      if (!found) problems.push(`${course.id}: findLesson failed for ${lesson.id}`);
      if (found && index > 0 && found.prev?.id !== lessons[index - 1].id) {
        problems.push(`${course.id}: prev mismatch for ${lesson.id}`);
      }
      if (found && index < lessons.length - 1 && found.next?.id !== lessons[index + 1].id) {
        problems.push(`${course.id}: next mismatch for ${lesson.id}`);
      }
    });
    for (const chapter of course.chapters) {
      if (!getChapter(course, chapter.id)) problems.push(`${course.id}: chapter missing ${chapter.id}`);
      const quiz = getQuizQuestions(course, chapter.id);
      if (quiz.length < 3) problems.push(`${course.id}/${chapter.id}: only ${quiz.length} quiz`);
      const qa = getInterviewQuestions(course, chapter.id);
      if (!qa.length) problems.push(`${course.id}/${chapter.id}: no interview questions`);
    }
    if (getQuizQuestions(course).length !== course.quiz.length) {
      problems.push(`${course.id}: quiz lookup mismatch`);
    }
  }
  expect(problems).toEqual([]);
});

test('every learning path step resolves', () => {
  const problems = [];
  for (const path of LEARNING_PATHS) {
    if (path.steps.length < 3) problems.push(`${path.id}: fewer than 3 steps`);
    for (const id of path.steps) {
      if (!getCourse(id)) problems.push(`${path.id}: unknown course ${id}`);
    }
  }
  expect(problems).toEqual([]);
});

test('quiz answers and options survive shuffling assumptions', () => {
  const problems = [];
  for (const course of COURSES) {
    for (const q of course.quiz) {
      if (new Set(q.options).size !== 4) problems.push(`${course.id}: duplicate options in "${q.q}"`);
      if (!q.options[q.answer]) problems.push(`${course.id}: bad answer index for "${q.q}"`);
    }
  }
  expect(problems).toEqual([]);
});

test('every lesson block is renderable', () => {
  const ALLOWED = ['text', 'heading', 'list', 'code', 'note'];
  const LANGS = [
    'html', 'css', 'js', 'jsx', 'ts', 'tsx', 'vue', 'php', 'python', 'sql',
    'java', 'c', 'cpp', 'bash', 'dockerfile', 'yaml', 'json', 'rn', 'mongosh',
    'csharp', 'dart', 'go', 'kotlin', 'rust', 'swift', 'lua', 'git', 'text',
  ];
  const problems = [];
  for (const course of COURSES) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        for (const block of lesson.blocks) {
          if (!ALLOWED.includes(block.type)) {
            problems.push(`${course.id}/${lesson.id}: type ${block.type}`);
            continue;
          }
          if (block.type === 'list') {
            if (!Array.isArray(block.items) || block.items.length === 0) {
              problems.push(`${course.id}/${lesson.id}: empty list`);
            }
            continue;
          }
          if (typeof block.value !== 'string' || !block.value.trim()) {
            problems.push(`${course.id}/${lesson.id}: empty ${block.type}`);
          }
          if (block.type === 'code' && !LANGS.includes(block.lang)) {
            problems.push(`${course.id}/${lesson.id}: lang ${block.lang}`);
          }
        }
      }
    }
  }
  expect(problems).toEqual([]);
});
