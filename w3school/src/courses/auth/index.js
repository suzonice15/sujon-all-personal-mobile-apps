// Authentication & OAuth course. Passwords, sessions, JWT, OAuth 2.0,
// OIDC, MFA, authorization and common attacks.

import gettingStarted from './getting-started';
import passwords from './passwords';
import sessionsCookies from './sessions-cookies';
import jwt from './jwt';
import oauth2 from './oauth2';
import oidcSocial from './oidc-social';
import mfaPasskeys from './mfa-passkeys';
import authorizationAttacks from './authorization-attacks';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  passwords,
  sessionsCookies,
  jwt,
  oauth2,
  oidcSocial,
  mfaPasskeys,
  authorizationAttacks,
  projectsInterview,
];

export default {
  id: 'auth',
  title: 'Authentication & OAuth',
  short: 'Auth',
  tagline: 'Sessions, tokens, OAuth and secure access control',
  color: '#B91C1C',
  icon: 'lock',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
