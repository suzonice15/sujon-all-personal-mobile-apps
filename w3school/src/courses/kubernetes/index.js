// Kubernetes course. Manifests use YAML; commands use the shell highlighter.

import gettingStarted from './getting-started';
import pods from './pods';
import deployments from './deployments';
import services from './services';
import ingress from './ingress';
import configSecrets from './config-secrets';
import storage from './storage';
import scaling from './scaling';
import observability from './observability';
import securityRbac from './security-rbac';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  pods,
  deployments,
  services,
  ingress,
  configSecrets,
  storage,
  scaling,
  observability,
  securityRbac,
  projectsInterview,
];

export default {
  id: 'kubernetes',
  title: 'Kubernetes',
  short: 'K8s',
  tagline: 'Run containers reliably at scale',
  color: '#326CE5',
  icon: 'hub',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
