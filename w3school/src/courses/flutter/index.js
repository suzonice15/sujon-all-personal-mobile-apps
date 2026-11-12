// Flutter & Dart course. Samples are read-only; the Try-it preview is a
// browser and cannot run Flutter.

import gettingStarted from './getting-started';
import dartBasics from './dart-basics';
import widgets from './widgets';
import layout from './layout';
import state from './state';
import lists from './lists';
import navigation from './navigation';
import forms from './forms';
import networking from './networking';
import storage from './storage';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dartBasics,
  widgets,
  layout,
  state,
  lists,
  navigation,
  forms,
  networking,
  storage,
  projectsInterview,
];

export default {
  id: 'flutter',
  title: 'Flutter & Dart',
  short: 'Flutter',
  tagline: 'One codebase for beautiful Android and iOS apps',
  color: '#02569B',
  icon: 'phone-android',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
