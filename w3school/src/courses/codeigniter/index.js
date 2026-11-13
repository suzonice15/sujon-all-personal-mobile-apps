// CodeIgniter course. A lightweight PHP framework: MVC, routing, models,
// validation and deployment.

import gettingStarted from './getting-started';
import routingControllers from './routing-controllers';
import modelsDatabase from './models-database';
import viewsTemplates from './views-templates';
import formsValidation from './forms-validation';
import authSecurity from './auth-security';
import testingDeployment from './testing-deployment';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  routingControllers,
  modelsDatabase,
  viewsTemplates,
  formsValidation,
  authSecurity,
  testingDeployment,
  projectsInterview,
];

export default {
  id: 'codeigniter',
  title: 'CodeIgniter',
  short: 'CodeIgniter',
  tagline: 'A small, fast PHP framework for MVC apps',
  color: '#EF4223',
  icon: 'local-fire-department',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
