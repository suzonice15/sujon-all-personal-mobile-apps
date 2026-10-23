// Python course. Every chapter (its lessons and quiz) lives in its own file in
// this folder; to add a chapter, create the file and list it below in order.
// Python examples use lang: 'python'; Try it runs them with real CPython 3.14 (Pyodide),
// loading imported packages (numpy, pandas, matplotlib, scikit-learn, bs4...) on demand.
// Code is written with String.raw so backslashes like "\n" reach Python exactly as typed.

import gettingStarted from './getting-started';
import variablesTypes from './variables-types';
import strings from './strings';
import operatorsControl from './operators-control';
import listsTuples from './lists-tuples';
import dictsSets from './dicts-sets';
import functions from './functions';
import comprehensions from './comprehensions';
import modulesPackages from './modules-packages';
import files from './files';
import errors from './errors';
import oopBasics from './oop-basics';
import oopAdvanced from './oop-advanced';
import decorators from './decorators';
import typing from './typing';
import stdlib from './stdlib';
import testing from './testing';
import concurrency from './concurrency';
import advanced from './advanced';
import databases from './databases';
import webApis from './web-apis';
import django from './django';
import dataAnalysis from './data-analysis';
import visualization from './visualization';
import machineLearning from './machine-learning';
import automation from './automation';
import algorithms from './algorithms';
import performanceDeploy from './performance-deploy';
import security from './security';
import projects from './projects';
import interview from './interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  variablesTypes,
  strings,
  operatorsControl,
  listsTuples,
  dictsSets,
  functions,
  comprehensions,
  modulesPackages,
  files,
  errors,
  oopBasics,
  oopAdvanced,
  decorators,
  typing,
  stdlib,
  testing,
  concurrency,
  advanced,
  databases,
  webApis,
  django,
  dataAnalysis,
  visualization,
  machineLearning,
  automation,
  algorithms,
  performanceDeploy,
  security,
  projects,
  interview,
];

export default {
  id: 'python',
  title: 'Python',
  short: 'Py',
  tagline: 'From first script to data science and web backends',
  color: '#2563EB',
  icon: 'code',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
