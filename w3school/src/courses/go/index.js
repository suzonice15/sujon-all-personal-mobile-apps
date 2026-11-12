// Go course. Samples are read-only; the Try-it preview cannot run Go.

import gettingStarted from './getting-started';
import syntaxTypes from './syntax-types';
import controlFlow from './control-flow';
import functions from './functions';
import structsMethods from './structs-methods';
import interfacesErrors from './interfaces-errors';
import slicesMaps from './slices-maps';
import concurrency from './concurrency';
import packagesTesting from './packages-testing';
import httpApi from './http-api';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  syntaxTypes,
  controlFlow,
  functions,
  structsMethods,
  interfacesErrors,
  slicesMaps,
  concurrency,
  packagesTesting,
  httpApi,
  projectsInterview,
];

export default {
  id: 'go',
  title: 'Go',
  short: 'Go',
  tagline: 'Simple, fast and built for modern backends',
  color: '#00ADD8',
  icon: 'code',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
