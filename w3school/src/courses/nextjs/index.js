// Next.js course. A complete, standalone course on the App Router.
// The React course keeps a short Next.js preview chapter; this course goes deeper.
//
// Samples are read-only because the Try-it preview cannot run a Next.js server.

import gettingStarted from './getting-started';
import routing from './routing';
import serverClient from './server-client';
import dataFetching from './data-fetching';
import serverActions from './server-actions';
import routeHandlers from './route-handlers';
import rendering from './rendering';
import seoMedia from './seo-media';
import authMiddleware from './auth-middleware';
import deployment from './deployment';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  routing,
  serverClient,
  dataFetching,
  serverActions,
  routeHandlers,
  rendering,
  seoMedia,
  authMiddleware,
  deployment,
  projectsInterview,
];

export default {
  id: 'nextjs',
  title: 'Next.js',
  short: 'Next.js',
  tagline: 'Full-stack React with routing, server rendering and deployment',
  color: '#111827',
  icon: 'web',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
