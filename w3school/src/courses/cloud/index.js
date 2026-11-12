// Cloud course (AWS / GCP / Azure). Provider-neutral concepts with concrete
// examples from all three major clouds.

import gettingStarted from './getting-started';
import compute from './compute';
import storage from './storage';
import networking from './networking';
import databases from './databases';
import iam from './iam';
import deployment from './deployment';
import monitoringCost from './monitoring-cost';
import security from './security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  compute,
  storage,
  networking,
  databases,
  iam,
  deployment,
  monitoringCost,
  security,
  projectsInterview,
];

export default {
  id: 'cloud',
  title: 'Cloud (AWS / GCP / Azure)',
  short: 'Cloud',
  tagline: 'Deploy and operate apps on the major cloud platforms',
  color: '#FF9900',
  icon: 'cloud',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
