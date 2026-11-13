// Auth chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Authentication versus authorization and session versus token',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'authn-authz',
      title: 'Authentication and authorization',
      blocks: [
        { type: 'text', value: 'Authentication proves who the caller is. Authorization decides what that caller may do. Confusing the two causes leaks: a logged-in user is not automatically allowed to read another user’s data.' },
        { type: 'list', items: [
          'Authentication: login, session, token, MFA',
          'Authorization: roles, permissions, ownership',
          '401 means not authenticated',
          '403 means authenticated but not allowed',
          'Every private read and write needs an authorization check',
        ] },
        { type: 'note', value: 'A hidden button is not authorization. The server must check every request.' },
      ],
    },
    {
      id: 'auth-session-token',
      title: 'Sessions versus tokens',
      blocks: [
        { type: 'text', value: 'A session stores login state on the server and sends a session id in a cookie. A token stores signed claims on the client and is checked on each request. Sessions are easy to revoke; tokens scale across services.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Session:
  browser -> cookie (session id)
  server  -> session store

Token:
  browser -> Authorization: Bearer <jwt>
  server  -> verify signature, exp, aud` },
        { type: 'note', value: 'For a browser app, a server session in an httpOnly cookie is simple and safe. For mobile and many services, tokens fit better.' },
      ],
    },
    {
      id: 'auth-threat-model',
      title: 'Know the threats',
      blocks: [
        { type: 'list', items: [
          'Credential stuffing on weak passwords',
          'Session hijacking from a stolen cookie',
          'XSS stealing tokens from localStorage',
          'CSRF sending authenticated requests',
          'Open redirect leaking tokens',
          'Broken object-level authorization',
        ] },
        { type: 'text', value: 'Every choice has a failure mode. httpOnly cookies stop XSS token theft but need CSRF protection. localStorage is simpler but exposed to XSS.' },
        { type: 'note', value: 'Design for the attacker, not the happy path. Ask what a stolen cookie or token can do.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Authentication answers which question?',
      options: ['What may you do?', 'Who are you?', 'How fast?', 'Where from?'],
      answer: 1,
      explain: 'Authentication proves identity.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does 403 mean?',
      options: ['Not logged in', 'Logged in but not allowed', 'Not found', 'Server error'],
      answer: 1,
      explain: '403 is unauthorized access by a known user.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why are sessions easy to revoke?',
      options: ['They are signed', 'The state is on the server', 'They never expire', 'They are encrypted'],
      answer: 1,
      explain: 'Deleting the session record logs the user out.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why is a hidden button not authorization?',
      options: ['It is slower', 'The client can call the API directly', 'It breaks the UI', 'It leaks CSS'],
      answer: 1,
      explain: 'The server must enforce permissions.',
    },
  ],
};
