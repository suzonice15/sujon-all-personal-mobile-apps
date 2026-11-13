// Tailwind CSS course. Utility-first styling, responsive design, dark mode
// and configuration.

import gettingStarted from './getting-started';
import utilityFirst from './utility-first';
import layoutFlexGrid from './layout-flex-grid';
import responsive from './responsive';
import componentsPatterns from './components-patterns';
import darkMode from './dark-mode';
import configCustomization from './config-customization';
import tailwindV4 from './tailwind-v4';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  utilityFirst,
  layoutFlexGrid,
  responsive,
  componentsPatterns,
  darkMode,
  configCustomization,
  tailwindV4,
  projectsInterview,
];

export default {
  id: 'tailwind',
  title: 'Tailwind CSS',
  short: 'Tailwind',
  tagline: 'Build custom interfaces with utility classes',
  color: '#06B6D4',
  icon: 'palette',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
