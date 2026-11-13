// Docker course. Images, containers, Dockerfiles, Compose and networking.
// DevOps topics (CI/CD, deployment, monitoring, Kubernetes) live in ../devops.
//
// Shell, Dockerfile and YAML samples are read-only.

import gettingStarted from './getting-started';
import dockerBasics from './docker-basics';
import dockerfile from './dockerfile';
import imagesVolumes from './images-volumes';
import networking from './networking';
import compose from './compose';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dockerBasics,
  dockerfile,
  imagesVolumes,
  networking,
  compose,
  projectsInterview,
];

export default {
  id: 'docker',
  title: 'Docker',
  short: 'Docker',
  tagline: 'Package and run apps in portable containers',
  color: '#2496ED',
  icon: 'widgets',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
