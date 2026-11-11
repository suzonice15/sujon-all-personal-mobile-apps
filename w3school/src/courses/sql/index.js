// SQL & Databases course. Every chapter (lessons and quiz) lives in its own
// file in this folder; to add a chapter, create the file and list it below.
//
// Try-it runs on sql.js (SQLite compiled to WebAssembly) with a small school
// database that is recreated for every run:
//   students(id, name, age, city)
//   courses(id, title, price)
//   enrollments(id, student_id, course_id, score)

import gettingStarted from './getting-started';
import selectingData from './selecting-data';
import sortingLimiting from './sorting-limiting';
import aggregates from './aggregates';
import joins from './joins';
import subqueriesCte from './subqueries-cte';
import changingData from './changing-data';
import tableDesign from './table-design';
import keysRelationships from './keys-relationships';
import indexesPerformance from './indexes-performance';
import transactionsAcid from './transactions-acid';
import sqlInApps from './sql-in-apps';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  selectingData,
  sortingLimiting,
  aggregates,
  joins,
  subqueriesCte,
  changingData,
  tableDesign,
  keysRelationships,
  indexesPerformance,
  transactionsAcid,
  sqlInApps,
  projectsInterview,
];

export default {
  id: 'sql',
  title: 'SQL & Databases',
  short: 'SQL',
  tagline: 'Query and design the data behind every app',
  color: '#F29111',
  icon: 'storage',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
