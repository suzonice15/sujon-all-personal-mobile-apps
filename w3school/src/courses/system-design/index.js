// System Design course. Diagrams and pseudo-code are read-only.

import gettingStarted from './getting-started';
import requirements from './requirements';
import scalability from './scalability';
import loadBalancing from './load-balancing';
import caching from './caching';
import databases from './databases';
import queues from './queues';
import consistency from './consistency';
import microservices from './microservices';
import caseStudyUrl from './case-study-url';
import caseStudyFeed from './case-study-feed';
import interview from './interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  requirements,
  scalability,
  loadBalancing,
  caching,
  databases,
  queues,
  consistency,
  microservices,
  caseStudyUrl,
  caseStudyFeed,
  interview,
];

export default {
  id: 'system-design',
  title: 'System Design',
  short: 'System Design',
  tagline: 'Design systems that stay fast and reliable at scale',
  color: '#8B5CF6',
  icon: 'hub',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
