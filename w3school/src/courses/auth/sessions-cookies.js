// Auth chapter: Sessions & Cookies.

export default {
  id: 'sessions-cookies',
  title: 'Sessions & Cookies',
  description: 'Session ids, cookie flags and CSRF',
  icon: 'cookie',
  lessons: [
    {
      id: 'auth-session-id',
      title: 'Session ids',
      blocks: [
        { type: 'text', value: 'After login, the server creates a random session id and stores the user id against it. The browser sends the id in a cookie on each request. Never put user data directly in the cookie value.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const sessionId = crypto.randomUUID();
await store.set('sess:' + sessionId, { userId: user.id }, { ttl: 3600 });

res.cookie('sid', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 3600_000,
});` },
        { type: 'note', value: 'Regenerate the session id after login to prevent session fixation.' },
      ],
    },
    {
      id: 'auth-cookie-flags',
      title: 'Cookie flags',
      blocks: [
        { type: 'list', items: [
          'httpOnly: JavaScript cannot read the cookie',
          'secure: sent only over HTTPS',
          'sameSite=lax or strict: limits cross-site sending',
          'maxAge or expires: bounded lifetime',
          'path and domain: scope the cookie',
        ] },
        { type: 'text', value: 'For a logged-in browser session, httpOnly plus secure plus sameSite is the baseline. Add a short lifetime and rotate the id after privilege changes.' },
        { type: 'note', value: 'sameSite=none requires secure and is only for deliberate cross-site use. Avoid it otherwise.' },
      ],
    },
    {
      id: 'auth-csrf',
      title: 'CSRF',
      blocks: [
        { type: 'text', value: 'CSRF tricks a logged-in browser into sending a request the user did not intend. Defend with sameSite cookies plus a per-session CSRF token checked on state-changing requests.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Server: issue a token tied to the session
res.cookie('csrf', csrfToken, { sameSite: 'lax' });

// Client: send it in a header
fetch('/api/courses', {
  method: 'POST',
  headers: { 'X-CSRF-Token': csrfToken },
  body: JSON.stringify(data),
});` },
        { type: 'note', value: 'A CSRF token in a header cannot be read by another site, which is why it works. A token in a GET URL does not.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sessions-cookies',
      q: 'What does httpOnly prevent?',
      options: ['CSRF', 'JavaScript reading the cookie', 'HTTPS', 'Expiry'],
      answer: 1,
      explain: 'Scripts cannot read an httpOnly cookie.',
    },
    {
      chapterId: 'sessions-cookies',
      q: 'What does the secure flag require?',
      options: ['HTTP', 'HTTPS', 'A token', 'MFA'],
      answer: 1,
      explain: 'The cookie is sent only over HTTPS.',
    },
    {
      chapterId: 'sessions-cookies',
      q: 'Why regenerate the session id after login?',
      options: ['To save memory', 'To prevent session fixation', 'To enable CSRF', 'To paginate'],
      answer: 1,
      explain: 'A new id invalidates a pre-set one.',
    },
    {
      chapterId: 'sessions-cookies',
      q: 'What stops CSRF?',
      options: ['httpOnly alone', 'sameSite plus a CSRF token', 'A longer password', 'A bigger cookie'],
      answer: 1,
      explain: 'Both layers protect state-changing requests.',
    },
  ],
};
