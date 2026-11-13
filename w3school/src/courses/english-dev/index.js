// English for Developers course. Clear writing and speaking for technical work.

import gettingStarted from './getting-started';
import vocabulary from './vocabulary';
import emails from './emails';
import documentation from './documentation';
import codeReviews from './code-reviews';
import meetings from './meetings';
import interviews from './interviews';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  vocabulary,
  emails,
  documentation,
  codeReviews,
  meetings,
  interviews,
  projectsInterview,
];

export default {
  id: 'english-dev',
  title: 'English for Developers',
  short: 'English',
  tagline: 'Write and speak clearly at work and in interviews',
  color: '#0EA5E9',
  icon: 'translate',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
