// React Native course. Samples are read-only because native components cannot
// render in the Try-it browser preview. The code uses React Native's built-in
// components and React Navigation.

import gettingStarted from './getting-started';
import coreComponents from './core-components';
import styling from './styling';
import propsState from './props-state';
import lists from './lists';
import navigation from './navigation';
import forms from './forms';
import networking from './networking';
import storage from './storage';
import nativeFeatures from './native-features';
import performance from './performance';
import animationsPublishing from './animations-publishing';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  coreComponents,
  styling,
  propsState,
  lists,
  navigation,
  forms,
  networking,
  storage,
  nativeFeatures,
  performance,
  animationsPublishing,
  projectsInterview,
];

export default {
  id: 'react-native',
  title: 'React Native',
  short: 'RN',
  tagline: 'Build real Android and iOS apps with React',
  color: '#61DAFB',
  icon: 'phone-android',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
