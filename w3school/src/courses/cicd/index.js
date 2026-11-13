// CI/CD course. Continuous integration, delivery and deployment: pipelines,
// artifacts, quality gates, release strategies and environments.

import gettingStarted from './getting-started';
import pipelineStages from './pipeline-stages';
import artifacts from './artifacts';
import testingGates from './testing-gates';
import deploymentStrategies from './deployment-strategies';
import environmentsSecurity from './environments-security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  pipelineStages,
  artifacts,
  testingGates,
  deploymentStrategies,
  environmentsSecurity,
  projectsInterview,
];

export default {
  id: 'cicd',
  title: 'CI/CD',
  short: 'CI/CD',
  tagline: 'Ship software safely with automated pipelines',
  color: '#22C55E',
  icon: 'autorenew',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
