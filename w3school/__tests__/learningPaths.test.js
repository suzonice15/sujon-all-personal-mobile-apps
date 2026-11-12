/**
 * Tests for the learning paths data and progress calculation.
 */

import { COURSES } from '../src/courses';
import { LEARNING_PATHS, getLearningPath, stepStatus, pathProgress } from '../src/courses/learningPaths';
import { countLessons } from '../src/courses';

const courseIds = new Set(COURSES.map(c => c.id));

describe('learning paths data', () => {
  test('there are several paths with unique ids', () => {
    expect(LEARNING_PATHS.length).toBeGreaterThanOrEqual(6);
    const ids = new Set();
    for (const path of LEARNING_PATHS) {
      expect(ids.has(path.id)).toBe(false);
      ids.add(path.id);
      expect(path.title).toBeTruthy();
      expect(path.tagline).toBeTruthy();
      expect(path.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  test('every step is a real course, listed once per path', () => {
    for (const path of LEARNING_PATHS) {
      expect(path.steps.length).toBeGreaterThanOrEqual(3);
      for (const courseId of path.steps) {
        expect(courseIds.has(courseId)).toBe(true);
      }
      expect(new Set(path.steps).size).toBe(path.steps.length);
    }
  });

  test('getLearningPath finds a path by id and returns null otherwise', () => {
    expect(getLearningPath(LEARNING_PATHS[0].id)).toBe(LEARNING_PATHS[0]);
    expect(getLearningPath('nope')).toBeNull();
  });
});

describe('step status', () => {
  test('completed when every lesson is done', () => {
    expect(stepStatus(5, 5, true)).toBe('completed');
  });

  test('started when some lessons are done or the course was opened', () => {
    expect(stepStatus(2, 5, false)).toBe('started');
    expect(stepStatus(0, 5, true)).toBe('started');
  });

  test('todo when nothing has been touched', () => {
    expect(stepStatus(0, 5, false)).toBe('todo');
  });
});

describe('path progress', () => {
  const path = { id: 'test', steps: ['html', 'css'] };
  const htmlTotal = countLessons(COURSES.find(c => c.id === 'html'));
  const cssTotal = countLessons(COURSES.find(c => c.id === 'css'));

  test('is zero with no progress', () => {
    const info = pathProgress(path, {});
    expect(info.totalSteps).toBe(2);
    expect(info.completedSteps).toBe(0);
    expect(info.doneLessons).toBe(0);
    expect(info.pct).toBe(0);
    expect(info.steps.map(s => s.status)).toEqual(['todo', 'todo']);
  });

  test('counts a finished course as a completed step', () => {
    const info = pathProgress(path, {
      html: { completedIds: new Set(Array.from({ length: htmlTotal }, (_, i) => `id-${i}`)), lastOpenedAt: 1 },
    });
    expect(info.completedSteps).toBe(1);
    expect(info.steps[0].status).toBe('completed');
    expect(info.steps[1].status).toBe('todo');
    expect(info.totalLessons).toBe(htmlTotal + cssTotal);
    expect(info.doneLessons).toBe(htmlTotal);
    expect(info.pct).toBeCloseTo(htmlTotal / (htmlTotal + cssTotal));
  });

  test('never counts more lessons than the course has', () => {
    const info = pathProgress(path, {
      html: { completedIds: new Set(Array.from({ length: htmlTotal + 10 }, (_, i) => `x-${i}`)), lastOpenedAt: 1 },
    });
    expect(info.doneLessons).toBeLessThanOrEqual(info.totalLessons);
    expect(info.pct).toBeLessThanOrEqual(1);
  });

  test('every real learning path computes without error', () => {
    for (const p of LEARNING_PATHS) {
      const info = pathProgress(p, {});
      expect(info.steps.every(s => s.course !== null)).toBe(true);
      expect(info.totalLessons).toBeGreaterThan(0);
    }
  });
});
