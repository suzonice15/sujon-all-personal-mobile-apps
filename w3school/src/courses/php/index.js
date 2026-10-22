// PHP course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.
// PHP examples use lang: 'php'; Try it runs them with real PHP 8.3 (php-wasm),
// including PDO with SQLite and mbstring. Code is written with String.raw so
// backslashes like "\n" reach PHP exactly as typed.

import gettingStarted from './getting-started';
import variablesTypes from './variables-types';
import strings from './strings';
import operatorsControl from './operators-control';
import functions from './functions';
import arrays from './arrays';
import formsHttp from './forms-http';
import sessionsCookies from './sessions-cookies';
import files from './files';
import datesRegex from './dates-regex';
import oopBasics from './oop-basics';
import oopAdvanced from './oop-advanced';
import modernPhp from './modern-php';
import errors from './errors';
import namespacesComposer from './namespaces-composer';
import cli from './cli';
import database from './database';
import security from './security';
import restApi from './rest-api';
import integrations from './integrations';
import architecture from './architecture';
import cleanArchitecture from './clean-architecture';
import advanced from './advanced';
import concurrency from './concurrency';
import algorithms from './algorithms';
import testing from './testing';
import performanceDeploy from './performance-deploy';
import frameworks from './frameworks';
import wordpress from './wordpress';
import projects from './projects';
import interview from './interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  variablesTypes,
  strings,
  operatorsControl,
  functions,
  arrays,
  formsHttp,
  sessionsCookies,
  files,
  datesRegex,
  oopBasics,
  oopAdvanced,
  modernPhp,
  errors,
  namespacesComposer,
  cli,
  database,
  security,
  restApi,
  integrations,
  architecture,
  cleanArchitecture,
  advanced,
  concurrency,
  algorithms,
  testing,
  performanceDeploy,
  frameworks,
  wordpress,
  projects,
  interview,
];

export default {
  id: 'php',
  title: 'PHP',
  short: 'PHP',
  tagline: 'Server-side programming for the web',
  color: '#4F5B93',
  icon: 'dns',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
