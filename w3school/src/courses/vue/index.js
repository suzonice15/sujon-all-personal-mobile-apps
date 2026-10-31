// Vue course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.
// Runnable examples use lang: 'vue' and are written as Single File Components;
// Try it loads Vue 3 from a CDN and mounts the component automatically
// (see parseVueSfc in src/components/course/preview.js).

import gettingStarted from './getting-started';
import reactivity from './reactivity';
import directives from './directives';
import components from './components';
import lifecycle from './lifecycle';
import composables from './composables';
import routing from './routing';
import pinia from './pinia';
import formsData from './forms-data';
import stylingAnimation from './styling-animation';
import advancedComponents from './advanced-components';
import componentDeepDive from './component-deep-dive';
import errorsAuthApi from './errors-auth-api';
import a11yI18n from './a11y-i18n';
import typescriptTesting from './typescript-testing';
import performance from './performance';
import internals from './internals';
import optionsApi from './options-api';
import nuxt from './nuxt';
import deploy from './deploy';
import projects from './projects';
import interview from './interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  reactivity,
  directives,
  components,
  lifecycle,
  composables,
  routing,
  pinia,
  formsData,
  stylingAnimation,
  advancedComponents,
  componentDeepDive,
  errorsAuthApi,
  a11yI18n,
  typescriptTesting,
  performance,
  internals,
  optionsApi,
  nuxt,
  deploy,
  projects,
  interview,
];

export default {
  id: 'vue',
  title: 'Vue.js',
  short: 'Vue',
  tagline: 'The approachable, progressive framework',
  color: '#2F855A',
  icon: 'change-history',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
