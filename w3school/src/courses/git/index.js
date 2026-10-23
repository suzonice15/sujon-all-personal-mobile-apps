// Git & GitHub course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.
// Runnable examples use lang: 'git': a script of git and simple shell commands (echo,
// cat, ls, mkdir, touch, rm, mv) that Try it runs in a real Git playground
// (src/components/course/gitPlayground.js). Commands that need a server or a real
// installation (push, pull, clone, rebase...) use lang: 'text' with real output.

import gettingStarted from './getting-started';
import basics from './basics';
import history from './history';
import branches from './branches';
import merging from './merging';
import undo from './undo';
import ignoreTags from './ignore-tags';
import config from './config';
import remotes from './remotes';
import collaboration from './collaboration';
import rebase from './rebase';
import workflows from './workflows';
import actions from './actions';
import internals from './internals';
import powerTools from './power-tools';
import bestPractices from './best-practices';
import troubleshooting from './troubleshooting';
import projects from './projects';
import challenges from './challenges';
import interview from './interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  basics,
  history,
  branches,
  merging,
  undo,
  ignoreTags,
  config,
  remotes,
  collaboration,
  rebase,
  workflows,
  actions,
  internals,
  powerTools,
  bestPractices,
  troubleshooting,
  projects,
  challenges,
  interview,
];

export default {
  id: 'git',
  title: 'Git & GitHub',
  short: 'Git',
  tagline: 'Version control and teamwork for every developer',
  color: '#C2410C',
  icon: 'call-split',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
