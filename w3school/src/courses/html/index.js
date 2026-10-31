// HTML course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.

import gettingStarted from './getting-started';
import text from './text';
import linksMedia from './links-media';
import listsTables from './lists-tables';
import forms from './forms';
import semantic from './semantic';
import advanced from './advanced';
import accessibility from './accessibility';
import seo from './seo';
import projects from './projects';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  text,
  linksMedia,
  listsTables,
  forms,
  semantic,
  advanced,
  accessibility,
  seo,
  projects,
];

export default {
  id: 'html',
  title: 'HTML',
  short: 'HTML',
  tagline: 'The structure of every web page',
  color: '#E44D26',
  icon: 'code',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
