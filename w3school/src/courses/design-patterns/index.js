// Design Patterns course. SOLID principles, the classic GoF patterns,
// anti-patterns and architecture patterns.
//
// Pattern samples use lang: 'java' (the classic teaching language) and 'text'.

import gettingStarted from './getting-started';
import solid from './solid';
import creational from './creational';
import structural from './structural';
import behavioral from './behavioral';
import antiPatterns from './anti-patterns';
import refactoring from './refactoring';
import architecture from './architecture';
import testingPatterns from './testing-patterns';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  solid,
  creational,
  structural,
  behavioral,
  antiPatterns,
  refactoring,
  architecture,
  testingPatterns,
  projectsInterview,
];

export default {
  id: 'design-patterns',
  title: 'Design Patterns',
  short: 'Patterns',
  tagline: 'Write code that is easy to change, test and extend',
  color: '#7C3AED',
  icon: 'grid-view',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
