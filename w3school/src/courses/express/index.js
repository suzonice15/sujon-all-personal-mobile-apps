// Express.js course. The Node.js web framework: routing, middleware,
// REST APIs, validation, auth, databases and deployment.
//
// Server samples are read-only because the Try-it preview runs in a browser.

import gettingStarted from './getting-started';
import expressBasics from './express-basics';
import middleware from './middleware';
import restApi from './rest-api';
import validationErrors from './validation-errors';
import auth from './auth';
import database from './database';
import deployment from './deployment';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  expressBasics,
  middleware,
  restApi,
  validationErrors,
  auth,
  database,
  deployment,
  projectsInterview,
];

export default {
  id: 'express',
  title: 'Express.js',
  short: 'Express',
  tagline: 'Build REST APIs with the most popular Node framework',
  color: '#68A063',
  icon: 'api',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
