// UI/UX course. Design principles, research, prototyping, accessibility
// and the practical work of shipping a product people can use.

import gettingStarted from './getting-started';
import designPrinciples from './design-principles';
import colorTypography from './color-typography';
import layoutResponsive from './layout-responsive';
import research from './research';
import wireframesPrototypes from './wireframes-prototypes';
import usabilityAccessibility from './usability-accessibility';
import designSystems from './design-systems';
import portfolioFreelance from './portfolio-freelance';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  designPrinciples,
  colorTypography,
  layoutResponsive,
  research,
  wireframesPrototypes,
  usabilityAccessibility,
  designSystems,
  portfolioFreelance,
  projectsInterview,
];

export default {
  id: 'ui-ux',
  title: 'UI/UX Design',
  short: 'UI/UX',
  tagline: 'Design products that are clear, usable and accessible',
  color: '#DB2777',
  icon: 'design-services',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
