// C Programming course. Samples are read-only in the app because the Try-it
// preview cannot run native code. The test suite checks structure, brace
// balance and that dangerous examples are explicitly marked unsafe.

import gettingStarted from './getting-started';
import variablesTypes from './variables-types';
import operatorsControl from './operators-control';
import functions from './functions';
import arraysStrings from './arrays-strings';
import pointers from './pointers';
import memory from './memory';
import structs from './structs';
import files from './files';
import preprocessor from './preprocessor';
import commonBugs from './common-bugs';
import projectInterview from './project-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  variablesTypes,
  operatorsControl,
  functions,
  arraysStrings,
  pointers,
  memory,
  structs,
  files,
  preprocessor,
  commonBugs,
  projectInterview,
];

export default {
  id: 'c',
  title: 'C Programming',
  short: 'C',
  tagline: 'Understand memory, pointers and how computers really work',
  color: '#5C6BC0',
  icon: 'memory',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
