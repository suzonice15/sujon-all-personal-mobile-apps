// Flask course. Routing, templates, forms, SQLAlchemy, blueprints and APIs.
// Python samples are read-only because the Try-it preview cannot run Flask.

import gettingStarted from './getting-started';
import routesViews from './routes-views';
import templates from './templates';
import forms from './forms';
import database from './database';
import blueprints from './blueprints';
import restApi from './rest-api';
import authTesting from './auth-testing';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  routesViews,
  templates,
  forms,
  database,
  blueprints,
  restApi,
  authTesting,
  projectsInterview,
];

export default {
  id: 'flask',
  title: 'Flask',
  short: 'Flask',
  tagline: 'A small, flexible Python web framework for APIs and sites',
  color: '#000000',
  icon: 'local-florist',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
