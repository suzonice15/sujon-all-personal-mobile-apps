// Operating Systems course. C snippets and shell commands are read-only.

import gettingStarted from './getting-started';
import processes from './processes';
import memory from './memory';
import concurrency from './concurrency';
import filesystems from './filesystems';
import io from './io';
import virtualization from './virtualization';
import security from './security';
import linuxCase from './linux-case';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  processes,
  memory,
  concurrency,
  filesystems,
  io,
  virtualization,
  security,
  linuxCase,
  projectsInterview,
];

export default {
  id: 'os',
  title: 'Operating Systems',
  short: 'OS',
  tagline: 'How the machine manages processes, memory and devices',
  color: '#0F766E',
  icon: 'memory',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
