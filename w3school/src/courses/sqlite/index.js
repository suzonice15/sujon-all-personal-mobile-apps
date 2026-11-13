// SQLite course. Embedded database, type affinity, queries and mobile use.

import gettingStarted from './getting-started';
import typesAffinity from './types-affinity';
import queries from './queries';
import indexes from './indexes';
import transactions from './transactions';
import embeddedMobile from './embedded-mobile';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  typesAffinity,
  queries,
  indexes,
  transactions,
  embeddedMobile,
  projectsInterview,
];

export default {
  id: 'sqlite',
  title: 'SQLite',
  short: 'SQLite',
  tagline: 'The embedded database inside apps and devices',
  color: '#003B57',
  icon: 'storage',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
