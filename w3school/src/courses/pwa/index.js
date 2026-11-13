// PWA course. Manifest, service workers, offline caching, push and install.

import gettingStarted from './getting-started';
import manifest from './manifest';
import serviceWorkers from './service-workers';
import offline from './offline';
import pushNotifications from './push-notifications';
import backgroundSync from './background-sync';
import appShell from './app-shell';
import testingLighthouse from './testing-lighthouse';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  manifest,
  serviceWorkers,
  offline,
  pushNotifications,
  backgroundSync,
  appShell,
  testingLighthouse,
  projectsInterview,
];

export default {
  id: 'pwa',
  title: 'Progressive Web Apps',
  short: 'PWA',
  tagline: 'Installable, offline-capable web apps',
  color: '#5A0FC8',
  icon: 'install-mobile',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
