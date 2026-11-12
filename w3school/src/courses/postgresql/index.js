// PostgreSQL deep dive course. From SQL basics to performance tuning,
// replication and production operations.
//
// SQL samples use lang: 'sql' and run in the Try-it editor (sql.js).
// PostgreSQL-specific commands use lang: 'bash' or 'text'.

import gettingStarted from './getting-started';
import sqlFundamentals from './sql-fundamentals';
import dataTypes from './data-types';
import indexes from './indexes';
import queryPerformance from './query-performance';
import transactions from './transactions';
import schemaDesign from './schema-design';
import replication from './replication';
import security from './security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  sqlFundamentals,
  dataTypes,
  indexes,
  queryPerformance,
  transactions,
  schemaDesign,
  replication,
  security,
  projectsInterview,
];

export default {
  id: 'postgresql',
  title: 'PostgreSQL',
  short: 'Postgres',
  tagline: 'Production-grade relational database from basics to tuning',
  color: '#336791',
  icon: 'storage',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
