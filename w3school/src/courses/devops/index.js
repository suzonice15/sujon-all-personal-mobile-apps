// DevOps course. CI/CD, deployment, monitoring, security and Kubernetes.
// Containers themselves are covered in ../docker.
//
// Shell, YAML and Dockerfile samples are read-only.

import gettingStarted from './getting-started';
import ciCd from './ci-cd';
import deployment from './deployment';
import monitoringLogs from './monitoring-logs';
import security from './security';
import kubernetesIntro from './kubernetes-intro';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  ciCd,
  deployment,
  monitoringLogs,
  security,
  kubernetesIntro,
  projectsInterview,
];

export default {
  id: 'devops',
  title: 'DevOps',
  short: 'DevOps',
  tagline: 'Ship software reliably with pipelines, monitoring and automation',
  color: '#0F766E',
  icon: 'rocket-launch',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
