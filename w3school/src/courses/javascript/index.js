// JavaScript course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.
// Pure-JS examples use lang: 'js' so Try it shows a console with their output.

import gettingStarted from './getting-started';
import dataTypes from './data-types';
import controlFlow from './control-flow';
import functions from './functions';
import arrays from './arrays';
import objects from './objects';
import dom from './dom';
import async from './async';
import classesModules from './classes-modules';
import browserApis from './browser-apis';
import advanced from './advanced';
import languageFeatures from './language-features';
import functional from './functional';
import asyncAdvanced from './async-advanced';
import performanceSecurity from './performance-security';
import patterns from './patterns';
import testing from './testing';
import tooling from './tooling';
import interview from './interview';
import projects from './projects';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dataTypes,
  controlFlow,
  functions,
  arrays,
  objects,
  dom,
  async,
  classesModules,
  tooling,
  browserApis,
  advanced,
  languageFeatures,
  functional,
  asyncAdvanced,
  performanceSecurity,
  patterns,
  testing,
  projects,
  interview,
];

export default {
  id: 'javascript',
  title: 'JavaScript',
  short: 'JS',
  tagline: 'Make web pages interactive',
  color: '#A16207',
  icon: 'bolt',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
