// SQL Server course. T-SQL, indexes, transactions and performance.

import gettingStarted from './getting-started';
import dataTypes from './data-types';
import queries from './queries';
import indexes from './indexes';
import transactions from './transactions';
import performance from './performance';
import backupSecurity from './backup-security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dataTypes,
  queries,
  indexes,
  transactions,
  performance,
  backupSecurity,
  projectsInterview,
];

export default {
  id: 'sqlserver',
  title: 'SQL Server',
  short: 'SQL Server',
  tagline: 'T-SQL, indexes and performance on Microsoft SQL Server',
  color: '#CC2927',
  icon: 'storage',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
