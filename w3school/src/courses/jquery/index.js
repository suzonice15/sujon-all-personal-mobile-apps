// jQuery course. Selectors, events, DOM, AJAX and when to use it today.

import gettingStarted from './getting-started';
import selectorsEvents from './selectors-events';
import domManipulation from './dom-manipulation';
import ajax from './ajax';
import effects from './effects';
import pluginsModern from './plugins-modern';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  selectorsEvents,
  domManipulation,
  ajax,
  effects,
  pluginsModern,
  projectsInterview,
];

export default {
  id: 'jquery',
  title: 'jQuery',
  short: 'jQuery',
  tagline: 'DOM, events and AJAX with a small library',
  color: '#0769AD',
  icon: 'javascript',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
