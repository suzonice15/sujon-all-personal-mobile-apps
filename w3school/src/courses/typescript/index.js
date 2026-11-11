// TypeScript course. Every chapter (lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below.
//
// Try-it compiles the snippet with Babel's TypeScript preset and then runs the
// resulting JavaScript, so students can edit typed code and see the output.

import gettingStarted from './getting-started';
import basicTypes from './basic-types';
import functions from './functions';
import objectsInterfaces from './objects-interfaces';
import unionsNarrowing from './unions-narrowing';
import generics from './generics';
import classesOop from './classes-oop';
import utilityTypes from './utility-types';
import modulesConfig from './modules-config';
import tsWithReact from './ts-with-react';
import testingTooling from './testing-tooling';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  basicTypes,
  functions,
  objectsInterfaces,
  unionsNarrowing,
  generics,
  classesOop,
  utilityTypes,
  modulesConfig,
  tsWithReact,
  testingTooling,
  projectsInterview,
];

export default {
  id: 'typescript',
  title: 'TypeScript',
  short: 'TS',
  tagline: 'JavaScript with types that catch bugs before they ship',
  color: '#3178C6',
  icon: 'code',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
