// Angular course. Components, templates, services, routing, forms, HTTP
// and signals. Angular uses TypeScript and HTML templates.
//
// Samples use lang: 'ts' and 'html'.

import gettingStarted from './getting-started';
import componentsTemplates from './components-templates';
import directivesPipes from './directives-pipes';
import servicesDi from './services-di';
import routing from './routing';
import forms from './forms';
import httpObservables from './http-observables';
import stateSignals from './state-signals';
import testingBuild from './testing-build';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  componentsTemplates,
  directivesPipes,
  servicesDi,
  routing,
  forms,
  httpObservables,
  stateSignals,
  testingBuild,
  projectsInterview,
];

export default {
  id: 'angular',
  title: 'Angular',
  short: 'Angular',
  tagline: 'Build large, structured web apps with TypeScript',
  color: '#DD0031',
  icon: 'change-history',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
