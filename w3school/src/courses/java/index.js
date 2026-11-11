// Java course. Samples are complete classes so they can be compiled and run by
// the test suite with javac/java. The Try-it preview does not run Java yet, so
// every Java block is read-only in the app.

import gettingStarted from './getting-started';
import variablesTypes from './variables-types';
import operatorsControl from './operators-control';
import methods from './methods';
import arraysStrings from './arrays-strings';
import classesObjects from './classes-objects';
import inheritancePolymorphism from './inheritance-polymorphism';
import interfaces from './interfaces';
import collections from './collections';
import exceptions from './exceptions';
import genericsFiles from './generics-files';
import projectInterview from './project-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  variablesTypes,
  operatorsControl,
  methods,
  arraysStrings,
  classesObjects,
  inheritancePolymorphism,
  interfaces,
  collections,
  exceptions,
  genericsFiles,
  projectInterview,
];

export default {
  id: 'java',
  title: 'Java',
  short: 'Java',
  tagline: 'The language behind Android, enterprise systems and CS courses',
  color: '#B07219',
  icon: 'coffee',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
