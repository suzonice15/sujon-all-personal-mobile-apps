// Node.js course. The runtime and its core modules.
// Express lives in its own course: ../express.
//
// Server samples are read-only because the Try-it preview runs in a browser.
// Pure JavaScript examples still run live.

import gettingStarted from './getting-started';
import modules from './modules';
import npmPackages from './npm-packages';
import fsPath from './fs-path';
import httpServer from './http-server';
import streamsBuffers from './streams-buffers';
import workersPerformance from './workers-performance';
import testingSecurity from './testing-security';
import databases from './databases';
import deploymentScaling from './deployment-scaling';
import projectInterview from './project-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  modules,
  npmPackages,
  fsPath,
  httpServer,
  streamsBuffers,
  workersPerformance,
  testingSecurity,
  databases,
  deploymentScaling,
  projectInterview,
];

export default {
  id: 'nodejs',
  title: 'Node.js',
  short: 'Node',
  tagline: 'JavaScript on the server: modules, files, HTTP and streams',
  color: '#339933',
  icon: 'dns',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
