// Microservices course. Designing, building and operating distributed services.
//
// Architecture samples use lang: 'text', 'yaml' and 'bash'; code uses 'java'/'ts'.

import gettingStarted from './getting-started';
import serviceDesign from './service-design';
import communication from './communication';
import apiGateway from './api-gateway';
import discovery from './discovery';
import dataManagement from './data-management';
import resilience from './resilience';
import observability from './observability';
import deployment from './deployment';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  serviceDesign,
  communication,
  apiGateway,
  discovery,
  dataManagement,
  resilience,
  observability,
  deployment,
  projectsInterview,
];

export default {
  id: 'microservices',
  title: 'Microservices',
  short: 'Microservices',
  tagline: 'Design and operate distributed systems that scale',
  color: '#0F766E',
  icon: 'hub',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
