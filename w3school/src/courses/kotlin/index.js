// Kotlin course. Samples are read-only; the Try-it preview cannot run Kotlin.

import gettingStarted from './getting-started';
import syntaxTypes from './syntax-types';
import controlFlow from './control-flow';
import functionsLambdas from './functions-lambdas';
import classesObjects from './classes-objects';
import inheritanceInterfaces from './inheritance-interfaces';
import collections from './collections';
import coroutines from './coroutines';
import androidIntro from './android-intro';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  syntaxTypes,
  controlFlow,
  functionsLambdas,
  classesObjects,
  inheritanceInterfaces,
  collections,
  coroutines,
  androidIntro,
  projectsInterview,
];

export default {
  id: 'kotlin',
  title: 'Kotlin',
  short: 'Kotlin',
  tagline: 'Concise, safe and the modern language for Android',
  color: '#7F52FF',
  icon: 'phone-android',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
