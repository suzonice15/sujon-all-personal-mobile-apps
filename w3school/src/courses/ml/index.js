// Machine Learning course. A full course from the first idea to a deployed model.
// The Python course keeps a short scikit-learn chapter as a preview; this course goes deeper.
//
// Python samples marked tryIt run in the Try-it editor, which loads numpy, pandas,
// matplotlib and scikit-learn on demand. Plotting samples are read-only.

import gettingStarted from './getting-started';
import numpy from './numpy';
import pandasEda from './pandas-eda';
import linearRegression from './linear-regression';
import classification from './classification';
import evaluation from './evaluation';
import featurePipelines from './feature-pipelines';
import treesEnsembles from './trees-ensembles';
import unsupervised from './unsupervised';
import neuralNetworks from './neural-networks';
import deployEthics from './deploy-ethics';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  numpy,
  pandasEda,
  linearRegression,
  classification,
  evaluation,
  featurePipelines,
  treesEnsembles,
  unsupervised,
  neuralNetworks,
  deployEthics,
  projectsInterview,
];

export default {
  id: 'ml',
  title: 'Machine Learning',
  short: 'ML',
  tagline: 'Learn to build, evaluate and ship models with Python',
  color: '#0EA5E9',
  icon: 'smart-toy',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
