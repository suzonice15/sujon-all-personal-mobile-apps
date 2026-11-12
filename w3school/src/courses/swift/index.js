// Swift and iOS course. Modern Swift language plus SwiftUI basics.
//
// Samples are read-only because the Try-it preview cannot run Swift.

import gettingStarted from './getting-started';
import syntaxTypes from './syntax-types';
import controlFlow from './control-flow';
import functionsClosures from './functions-closures';
import classesStructs from './classes-structs';
import protocolsExtensions from './protocols-extensions';
import optionalsCollections from './optionals-collections';
import concurrency from './concurrency';
import swiftui from './swiftui';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  syntaxTypes,
  controlFlow,
  functionsClosures,
  classesStructs,
  protocolsExtensions,
  optionalsCollections,
  concurrency,
  swiftui,
  projectsInterview,
];

export default {
  id: 'swift',
  title: 'Swift & iOS',
  short: 'Swift',
  tagline: 'Modern language and the framework for Apple platforms',
  color: '#F05138',
  icon: 'phone-iphone',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
