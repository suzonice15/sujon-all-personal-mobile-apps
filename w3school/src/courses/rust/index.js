// Rust course. Memory safety without garbage collection.
//
// Samples are read-only because the Try-it preview cannot run Rust.

import gettingStarted from './getting-started';
import ownership from './ownership';
import structsEnums from './structs-enums';
import errorHandling from './error-handling';
import collections from './collections';
import traits from './traits';
import concurrency from './concurrency';
import unsafeMemory from './unsafe-memory';
import cargo from './cargo';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  ownership,
  structsEnums,
  errorHandling,
  collections,
  traits,
  concurrency,
  unsafeMemory,
  cargo,
  projectsInterview,
];

export default {
  id: 'rust',
  title: 'Rust',
  short: 'Rust',
  tagline: 'Memory-safe systems programming without garbage collection',
  color: '#CE422B',
  icon: 'settings',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
