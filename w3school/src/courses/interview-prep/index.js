// Interview Preparation course. Resume, job search, behavioural and technical
// interviews, system design and negotiation.

import gettingStarted from './getting-started';
import resume from './resume';
import jobSearch from './job-search';
import behavioral from './behavioral';
import technical from './technical';
import systemDesign from './system-design';
import negotiation from './negotiation';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  resume,
  jobSearch,
  behavioral,
  technical,
  systemDesign,
  negotiation,
  projectsInterview,
];

export default {
  id: 'interview-prep',
  title: 'Interview Preparation',
  short: 'Interview',
  tagline: 'Get ready to apply, interview and negotiate',
  color: '#7C3AED',
  icon: 'workspace-premium',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
