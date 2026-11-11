// Docker & DevOps course. Shell, Dockerfile and YAML samples are read-only;
// the app does not run a container engine.

import gettingStarted from './getting-started';
import dockerBasics from './docker-basics';
import dockerfile from './dockerfile';
import imagesVolumes from './images-volumes';
import networking from './networking';
import compose from './compose';
import ciCd from './ci-cd';
import deployment from './deployment';
import monitoringLogs from './monitoring-logs';
import security from './security';
import kubernetesIntro from './kubernetes-intro';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dockerBasics,
  dockerfile,
  imagesVolumes,
  networking,
  compose,
  ciCd,
  deployment,
  monitoringLogs,
  security,
  kubernetesIntro,
  projectsInterview,
];

export default {
  id: 'docker',
  title: 'Docker & DevOps',
  short: 'Docker',
  tagline: 'Ship portable containers, pipelines and reliable deployments',
  color: '#2496ED',
  icon: 'widgets',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
