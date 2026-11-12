// Math for Machine Learning course. The math behind the models: vectors,
// matrices, calculus, probability, statistics and information theory.
//
// Python samples marked tryIt run in the Try-it editor with numpy loaded on demand.

import vectors from './vectors';
import matrices from './matrices';
import eigenPca from './eigen-pca';
import calculus from './calculus';
import optimization from './optimization';
import probability from './probability';
import bayes from './bayes';
import distributions from './distributions';
import statistics from './statistics';
import informationLoss from './information-loss';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  vectors,
  matrices,
  eigenPca,
  calculus,
  optimization,
  probability,
  bayes,
  distributions,
  statistics,
  informationLoss,
  projectsInterview,
];

export default {
  id: 'math-ml',
  title: 'Math for ML',
  short: 'Math',
  tagline: 'The math behind models: vectors, calculus, probability and statistics',
  color: '#7C3AED',
  icon: 'functions',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
