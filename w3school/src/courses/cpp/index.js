// C++ course. Samples are read-only in the app (no native compiler on the
// phone). They are complete C++17 programs so a desktop toolchain can compile
// them; the test suite checks structure and brace balance.

import gettingStarted from './getting-started';
import variablesTypes from './variables-types';
import operatorsControl from './operators-control';
import functions from './functions';
import arraysVectors from './arrays-vectors';
import pointersReferences from './pointers-references';
import classesObjects from './classes-objects';
import inheritancePolymorphism from './inheritance-polymorphism';
import templates from './templates';
import stl from './stl';
import memorySmartPointers from './memory-smart-pointers';
import projectInterview from './project-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  variablesTypes,
  operatorsControl,
  functions,
  arraysVectors,
  pointersReferences,
  classesObjects,
  inheritancePolymorphism,
  templates,
  stl,
  memorySmartPointers,
  projectInterview,
];

export default {
  id: 'cpp',
  title: 'C++',
  short: 'C++',
  tagline: 'C speed with classes, templates and the STL',
  color: '#00599C',
  icon: 'code',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
