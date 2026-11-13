// Auth chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a full auth system and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'auth-project-system',
      title: 'Project: a complete auth system',
      blocks: [
        { type: 'text', value: 'Build signup, login, logout, password reset, email verification, MFA and Google login. Use hashed passwords, httpOnly sessions for the browser and short-lived tokens for the API. Add tests for the failure paths.' },
        { type: 'code', lang: 'text', tryIt: false, value: `POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-email
POST /auth/mfa/setup
POST /auth/mfa/verify
GET  /auth/google           redirect
GET  /auth/google/callback  exchange code` },
        { type: 'list', items: [
          'Argon2 or bcrypt password hashes',
          'httpOnly, secure, sameSite cookies',
          'CSRF token on state-changing requests',
          'Rate limit login and reset',
          'MFA with recovery codes',
          'Ownership checks on every object',
        ] },
        { type: 'note', value: 'Auth is where bugs become breaches. Test the negative cases as carefully as the happy path.' },
      ],
    },
    {
      id: 'auth-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Authentication versus authorization?',
          'Session versus JWT?',
          'Why hash passwords and how?',
          'What does httpOnly protect?',
          'How does OAuth 2.0 work?',
          'Why use PKCE?',
          'What is IDOR and how do you prevent it?',
          'How do you secure account recovery?',
        ] },
        { type: 'text', value: 'Strong answers name the threat each control stops. "httpOnly stops XSS from reading the session cookie, and sameSite plus a token stops CSRF" is a complete answer.' },
        { type: 'note', value: 'Be ready to draw the OAuth code flow and to explain where the secret key lives.' },
      ],
    },
    {
      id: 'auth-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: authentication and authorization concepts',
          'Week 2: password hashing and reset flows',
          'Week 3: sessions, cookies and CSRF',
          'Week 4: JWT and refresh tokens',
          'Week 5: OAuth 2.0 and PKCE',
          'Week 6: OIDC and social login',
          'Week 7: MFA and passkeys',
          'Week 8: authorization, IDOR and hardening',
        ] },
        { type: 'note', value: 'Build the flows, then try to break them with two accounts and a proxy. That is where the real learning happens.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which cookie flag stops XSS from reading the session?',
      options: ['secure', 'httpOnly', 'maxAge', 'path'],
      answer: 1,
      explain: 'httpOnly hides the cookie from JavaScript.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the safest password storage?',
      options: ['Plain text', 'A slow salted hash such as Argon2', 'Base64', 'MD5'],
      answer: 1,
      explain: 'Use a purpose-built password hash.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why test with two accounts?',
      options: ['For speed', 'To catch IDOR and ownership bugs', 'To enable CSRF', 'To paginate'],
      answer: 1,
      explain: 'Two accounts reveal cross-user access.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes an auth portfolio project strong?',
      options: ['Only login', 'All flows with negative tests and hardening', 'A copied tutorial', 'No rate limiting'],
      answer: 1,
      explain: 'Complete flows and failure tests show skill.',
    },
  ],
};
