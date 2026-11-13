// MySQL course. The world's most popular open-source relational database.
//
// SQL samples use lang: 'sql' and run in the Try-it editor (sql.js).
// MySQL-specific commands use lang: 'bash' or 'text'.

import gettingStarted from './getting-started';
import dataTypes from './data-types';
import sqlFundamentals from './sql-fundamentals';
import indexes from './indexes';
import innodb from './innodb';
import queryPerformance from './query-performance';
import replication from './replication';
import partitioning from './partitioning';
import security from './security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dataTypes,
  sqlFundamentals,
  indexes,
  innodb,
  queryPerformance,
  replication,
  partitioning,
  security,
  projectsInterview,
];

export default {
  id: 'mysql',
  title: 'MySQL',
  short: 'MySQL',
  tagline: 'The world\'s most popular open-source relational database',
  color: '#4479A1',
  icon: 'storage',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
