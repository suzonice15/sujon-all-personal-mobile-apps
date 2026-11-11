// Node.js & Express course. Server code samples are read-only because the
// Try-it preview runs in a browser, not in Node. Pure JavaScript examples
// (event loop order, middleware chains, validation) still run live.

import gettingStarted from './getting-started';
import modules from './modules';
import npmPackages from './npm-packages';
import fsPath from './fs-path';
import httpServer from './http-server';
import expressBasics from './express-basics';
import middleware from './middleware';
import restApi from './rest-api';
import validationErrors from './validation-errors';
import auth from './auth';
import database from './database';
import deployment from './deployment';
import projectInterview from './project-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  modules,
  npmPackages,
  fsPath,
  httpServer,
  expressBasics,
  middleware,
  restApi,
  validationErrors,
  auth,
  database,
  deployment,
  projectInterview,
];

export default {
  id: 'nodejs',
  title: 'Node.js & Express',
  short: 'Node',
  tagline: 'Build the APIs behind web and mobile apps',
  color: '#339933',
  icon: 'dns',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
