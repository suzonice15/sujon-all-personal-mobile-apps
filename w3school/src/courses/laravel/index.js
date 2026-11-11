// Laravel course.

import gettingStarted from './getting-started';
import installation from './installation';
import projectStructure from './project-structure';
import routing from './routing';
import controllersRequests from './controllers-requests';
import blade from './blade';
import eloquentBasics from './eloquent-basics';
import eloquentRelationships from './eloquent-relationships';
import eloquentAdvanced from './eloquent-advanced';
import queryBuilder from './query-builder';
import migrationsSeeding from './migrations-seeding';
import validation from './validation';
import authentication from './authentication';
import authorization from './authorization';
import serviceContainer from './service-container';
import security from './security';
import api from './api';
import queuesJobs from './queues-jobs';
import eventsListeners from './events-listeners';
import artisanScheduling from './artisan-scheduling';
import cachingPerformance from './caching-performance';
import deployment from './deployment';
import packagesEcosystem from './packages-ecosystem';
import projects from './projects';
import eloquentExpert from './eloquent-expert';
import realtime from './realtime';
import livewireFilament from './livewire-filament';
import architectureExpert from './architecture-expert';
import capstone from './capstone';
import interviewA from './interview-qa-a';
import interviewB from './interview-qa-b';

const chapters = [
  gettingStarted,
  installation,
  projectStructure,
  routing,
  controllersRequests,
  blade,
  eloquentBasics,
  eloquentRelationships,
  eloquentAdvanced,
  queryBuilder,
  migrationsSeeding,
  validation,
  authentication,
  authorization,
  serviceContainer,
  security,
  api,
  queuesJobs,
  eventsListeners,
  artisanScheduling,
  cachingPerformance,
  deployment,
  packagesEcosystem,
  projects,
  eloquentExpert,
  realtime,
  livewireFilament,
  architectureExpert,
  capstone,
];

export default {
  id: 'laravel',
  title: 'Laravel',
  short: 'Laravel',
  tagline: 'Modern PHP framework for web apps and APIs',
  color: '#FF2D20',
  icon: 'storage',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions: { ...interviewA, ...interviewB },
};
