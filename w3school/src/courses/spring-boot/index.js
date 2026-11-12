// Spring Boot course. Builds production-style Java backends: REST APIs,
// dependency injection, JPA data access, validation, security, testing and
// deployment. The Java language itself is taught in ../java.
//
// Samples are read-only because the Try-it preview cannot run Java with Spring.

import gettingStarted from './getting-started';
import restApi from './rest-api';
import dependencyInjection from './dependency-injection';
import configuration from './configuration';
import dataJpa from './data-jpa';
import validationErrors from './validation-errors';
import security from './security';
import testing from './testing';
import production from './production';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  restApi,
  dependencyInjection,
  configuration,
  dataJpa,
  validationErrors,
  security,
  testing,
  production,
  projectsInterview,
];

export default {
  id: 'spring-boot',
  title: 'Spring Boot',
  short: 'Spring',
  tagline: 'Build production-ready Java APIs with Spring Boot',
  color: '#6DB33F',
  icon: 'coffee',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
