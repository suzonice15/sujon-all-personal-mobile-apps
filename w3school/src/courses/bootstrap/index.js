// Bootstrap 5 course. Grid, components, forms, utilities and customization.

import gettingStarted from './getting-started';
import layoutGrid from './layout-grid';
import components from './components';
import forms from './forms';
import utilities from './utilities';
import jsComponents from './js-components';
import customization from './customization';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  layoutGrid,
  components,
  forms,
  utilities,
  jsComponents,
  customization,
  projectsInterview,
];

export default {
  id: 'bootstrap',
  title: 'Bootstrap 5',
  short: 'Bootstrap',
  tagline: 'Ship responsive layouts with a ready-made CSS framework',
  color: '#7952B3',
  icon: 'view-quilt',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
