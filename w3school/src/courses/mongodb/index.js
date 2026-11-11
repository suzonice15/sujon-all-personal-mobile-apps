// MongoDB course. Shell samples use the mongosh highlighter; Node driver
// samples use the JavaScript highlighter. Every sample is read-only.

import gettingStarted from './getting-started';
import documents from './documents';
import crud from './crud';
import queries from './queries';
import updates from './updates';
import indexes from './indexes';
import aggregation from './aggregation';
import schemaDesign from './schema-design';
import nodeDriver from './node-driver';
import atlas from './atlas';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  documents,
  crud,
  queries,
  updates,
  indexes,
  aggregation,
  schemaDesign,
  nodeDriver,
  atlas,
  projectsInterview,
];

export default {
  id: 'mongodb',
  title: 'MongoDB',
  short: 'MongoDB',
  tagline: 'Model flexible documents and query them at scale',
  color: '#47A248',
  icon: 'storage',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
