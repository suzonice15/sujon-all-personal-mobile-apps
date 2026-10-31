// CSS course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.

import basics from './basics';
import colorsText from './colors-text';
import boxModel from './box-model';
import selectors from './selectors';
import layout from './layout';
import flexbox from './flexbox';
import grid from './grid';
import responsive from './responsive';
import effects from './effects';
import modern from './modern';
import frameworks from './frameworks';
import projects from './projects';
import interviewQuestions from './interview-qa';

const chapters = [
  basics,
  colorsText,
  boxModel,
  selectors,
  layout,
  flexbox,
  grid,
  responsive,
  effects,
  modern,
  frameworks,
  projects,
];

export default {
  id: 'css',
  title: 'CSS',
  short: 'CSS',
  tagline: 'Style and lay out web pages',
  color: '#2965F1',
  icon: 'palette',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
