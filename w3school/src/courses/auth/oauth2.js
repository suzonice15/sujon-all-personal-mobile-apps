// Auth chapter: OAuth 2.0.

export default {
  id: 'oauth2',
  title: 'OAuth 2.0',
  description: 'Flows, scopes and the authorization code',
  icon: 'share',
  lessons: [
    {
      id: 'auth-oauth-roles',
      title: 'The roles',
      blocks: [
        { type: 'text', value: 'OAuth lets a user grant an app limited access to their data without sharing a password. The resource owner is the user, the client is your app, the authorization server issues tokens, and the resource server holds the data.' },
        { type: 'list', items: [
          'Resource owner: the user',
          'Client: your application',
          'Authorization server: login and consent',
          'Resource server: the API with the data',
          'Access token: the proof of the grant',
        ] },
        { type: 'note', value: 'OAuth is for authorization, not authentication. Use OpenID Connect on top when you need to know who the user is.' },
      ],
    },
    {
      id: 'auth-auth-code',
      title: 'Authorization code flow',
      blocks: [
        { type: 'text', value: 'The browser is redirected to the provider, the user logs in and consents, and the provider redirects back with a short-lived code. Your server exchanges the code plus the client secret for tokens.' },
        { type: 'code', lang: 'text', tryIt: false, value: `1. GET /authorize?client_id=...&redirect_uri=...&scope=...&state=...
2. user logs in and consents
3. GET /callback?code=...&state=...
4. server: POST /token with code + client_secret
5. receive access_token and refresh_token` },
        { type: 'note', value: 'Always verify the state parameter. It prevents CSRF on the callback.' },
      ],
    },
    {
      id: 'auth-pkce-scopes',
      title: 'PKCE and scopes',
      blocks: [
        { type: 'text', value: 'Public clients such as mobile apps cannot keep a secret. PKCE adds a random verifier and a hashed challenge so a stolen code cannot be exchanged. Scopes limit what the token can do.' },
        { type: 'list', items: [
          'Use PKCE for mobile and single-page apps',
          'Request the smallest scope needed',
          'Never put the client secret in a public app',
          'Verify redirect_uri exactly',
          'Use the implicit flow only when nothing else works',
        ] },
        { type: 'note', value: 'A token with read-only scope cannot delete data even if it leaks. Least privilege works for OAuth too.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'oauth2',
      q: 'What does OAuth grant?',
      options: ['A password', 'Limited access to data without sharing a password', 'A database', 'A server'],
      answer: 1,
      explain: 'OAuth delegates limited access.',
    },
    {
      chapterId: 'oauth2',
      q: 'What does the client exchange at the token endpoint?',
      options: ['A password', 'The authorization code and client secret', 'A cookie', 'A database key'],
      answer: 1,
      explain: 'The code is exchanged for tokens.',
    },
    {
      chapterId: 'oauth2',
      q: 'What is the state parameter for?',
      options: ['Pagination', 'Preventing CSRF on the callback', 'Caching', 'Encryption'],
      answer: 1,
      explain: 'State ties the callback to the request.',
    },
    {
      chapterId: 'oauth2',
      q: 'Why use PKCE?',
      options: ['For public clients that cannot keep a secret', 'To make tokens longer', 'To enable CSRF', 'To paginate'],
      answer: 0,
      explain: 'PKCE protects the code exchange.',
    },
  ],
};
