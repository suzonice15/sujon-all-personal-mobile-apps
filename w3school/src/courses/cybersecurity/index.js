// Cybersecurity course. Practical, defensive and ethical: every offensive
// technique is taught with authorization and scope in mind.

import gettingStarted from './getting-started';
import webSecurity from './web-security';
import auth from './auth';
import cryptography from './cryptography';
import networkSecurity from './network-security';
import secureCoding from './secure-coding';
import mobileSecurity from './mobile-security';
import cloudSecurity from './cloud-security';
import pentesting from './pentesting';
import incidentResponse from './incident-response';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  webSecurity,
  auth,
  cryptography,
  networkSecurity,
  secureCoding,
  mobileSecurity,
  cloudSecurity,
  pentesting,
  incidentResponse,
  projectsInterview,
];

export default {
  id: 'cybersecurity',
  title: 'Cybersecurity',
  short: 'Security',
  tagline: 'Think like an attacker, build like a defender',
  color: '#DC2626',
  icon: 'security',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
