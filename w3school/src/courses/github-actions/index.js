// GitHub Actions course. Workflows, triggers, jobs, secrets, caching and
// reusable automation.

import gettingStarted from './getting-started';
import workflowSyntax from './workflow-syntax';
import triggers from './triggers';
import jobsSteps from './jobs-steps';
import secretsEnv from './secrets-env';
import cachingMatrix from './caching-matrix';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  workflowSyntax,
  triggers,
  jobsSteps,
  secretsEnv,
  cachingMatrix,
  projectsInterview,
];

export default {
  id: 'github-actions',
  title: 'GitHub Actions',
  short: 'Actions',
  tagline: 'Automate build, test and deploy on GitHub',
  color: '#2088FF',
  icon: 'bolt',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
