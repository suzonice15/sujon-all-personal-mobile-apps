// Redis course. In-memory data store: caching, sessions, rate limiting,
// pub/sub, streams and clustering.
//
// Redis commands use lang: 'bash' (redis-cli). Code samples use the client
// library of the language in context.

import gettingStarted from './getting-started';
import dataStructures from './data-structures';
import caching from './caching';
import pubsub from './pubsub';
import sessionsRateLimiting from './sessions-rate-limiting';
import transactionsLua from './transactions-lua';
import persistenceReplication from './persistence-replication';
import clusterSentinel from './cluster-sentinel';
import security from './security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dataStructures,
  caching,
  pubsub,
  sessionsRateLimiting,
  transactionsLua,
  persistenceReplication,
  clusterSentinel,
  security,
  projectsInterview,
];

export default {
  id: 'redis',
  title: 'Redis',
  short: 'Redis',
  tagline: 'In-memory data store for caching, sessions and messaging',
  color: '#DC382D',
  icon: 'memory',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
