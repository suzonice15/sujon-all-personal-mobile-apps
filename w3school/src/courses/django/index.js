// Django course. Models, views, templates, forms, admin, DRF and deployment.
// Python samples are read-only because the Try-it preview cannot run Django.

import gettingStarted from './getting-started';
import modelsMigrations from './models-migrations';
import viewsUrls from './views-urls';
import templates from './templates';
import forms from './forms';
import adminAuth from './admin-auth';
import ormPerformance from './orm-performance';
import restDrf from './rest-drf';
import testingDeployment from './testing-deployment';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  modelsMigrations,
  viewsUrls,
  templates,
  forms,
  adminAuth,
  ormPerformance,
  restDrf,
  testingDeployment,
  projectsInterview,
];

export default {
  id: 'django',
  title: 'Django',
  short: 'Django',
  tagline: 'Build production web apps with Python and batteries included',
  color: '#0C4B33',
  icon: 'web',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
