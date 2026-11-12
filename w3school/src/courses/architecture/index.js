// Computer Architecture course. Diagrams and C examples are read-only unless
// marked try-it; the small C snippets illustrate memory and cache behaviour.

import gettingStarted from './getting-started';
import numbers from './numbers';
import cpu from './cpu';
import pipelining from './pipelining';
import memory from './memory';
import storage from './storage';
import io from './io';
import parallelism from './parallelism';
import performance from './performance';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  numbers,
  cpu,
  pipelining,
  memory,
  storage,
  io,
  parallelism,
  performance,
  projectsInterview,
];

export default {
  id: 'architecture',
  title: 'Computer Architecture',
  short: 'Architecture',
  tagline: 'How CPUs, caches and memory make programs fast',
  color: '#475569',
  icon: 'memory',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
