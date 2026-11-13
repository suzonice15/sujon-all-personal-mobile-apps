// Agile & Scrum course. Principles, roles, events, backlog, estimation and
// the metrics that keep a team honest.

import gettingStarted from './getting-started';
import principles from './principles';
import roles from './roles';
import events from './events';
import backlog from './backlog';
import estimation from './estimation';
import sprintsMetrics from './sprints-metrics';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  principles,
  roles,
  events,
  backlog,
  estimation,
  sprintsMetrics,
  projectsInterview,
];

export default {
  id: 'agile',
  title: 'Agile & Scrum',
  short: 'Agile',
  tagline: 'Plan, deliver and improve in short cycles',
  color: '#0D9488',
  icon: 'autorenew',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
