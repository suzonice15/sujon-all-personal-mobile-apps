// React course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.
// Runnable examples use lang: 'jsx'. Try it loads React 18 from a CDN, strips
// import/export lines and renders the App component automatically.

import gettingStarted from './getting-started';
import componentsProps from './components-props';
import stateEvents from './state-events';
import effects from './effects';
import hooks from './hooks';
import contextState from './context-state';
import styling from './styling';
import animation from './animation';
import routing from './routing';
import formsData from './forms-data';
import authApi from './auth-api';
import performance from './performance';
import internals from './internals';
import patterns from './patterns';
import a11yI18n from './a11y-i18n';
import typescriptTesting from './typescript-testing';
import modernReact from './modern-react';
import nextjs from './nextjs';
import deploy from './deploy';
import projects from './projects';
import interview from './interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  componentsProps,
  stateEvents,
  effects,
  hooks,
  contextState,
  styling,
  animation,
  routing,
  formsData,
  authApi,
  performance,
  internals,
  patterns,
  a11yI18n,
  typescriptTesting,
  modernReact,
  nextjs,
  deploy,
  projects,
  interview,
];

export default {
  id: 'react',
  title: 'React',
  short: 'React',
  tagline: 'Build modern interactive web apps',
  color: '#087EA4',
  icon: 'blur-circular',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
