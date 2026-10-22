// Question helpers shared by chapter quizzes and skill tests.

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Shuffles a question's options and remaps `answer`, so the correct option is
// never in a predictable position.
export const shuffleOptions = (q) => {
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map(i => q.options[i]), answer: order.indexOf(q.answer) };
};

export const prepareQuestions = (questions) => shuffle(questions).map(shuffleOptions);

// Picks `count` questions from the selected courses, taking them round-robin
// from each course so a multi-course test is balanced, then shuffles the order.
// selection: [{ course, chapterIds: Set | null }]  (null = every chapter)
export const buildSkillTest = (selection, count) => {
  const pools = selection
    .map(({ course, chapterIds }) => shuffle(
      course.quiz
        .filter(q => !chapterIds || chapterIds.has(q.chapterId))
        .map(q => ({ ...q, courseId: course.id }))
    ))
    .filter(pool => pool.length > 0);

  const picked = [];
  while (picked.length < count && pools.some(p => p.length)) {
    for (const pool of pools) {
      if (picked.length >= count) break;
      if (pool.length) picked.push(pool.pop());
    }
  }
  return shuffle(picked).map(shuffleOptions);
};

export const countAvailable = (selection) =>
  selection.reduce((n, { course, chapterIds }) =>
    n + course.quiz.filter(q => !chapterIds || chapterIds.has(q.chapterId)).length, 0);

export const formatDuration = (sec) => {
  const s = Math.max(0, Math.round(sec));
  const m = Math.floor(s / 60);
  return m ? m + 'm ' + String(s % 60).padStart(2, '0') + 's' : s + 's';
};

export const gradeFor = (percent) => {
  if (percent >= 90) return { label: 'A+', title: 'Outstanding' };
  if (percent >= 80) return { label: 'A', title: 'Excellent' };
  if (percent >= 70) return { label: 'B', title: 'Very good' };
  if (percent >= 60) return { label: 'C', title: 'Good' };
  if (percent >= 40) return { label: 'D', title: 'Needs practice' };
  return { label: 'F', title: 'Keep learning' };
};
