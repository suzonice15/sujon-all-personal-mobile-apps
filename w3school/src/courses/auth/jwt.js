// Auth chapter: JWT.

export default {
  id: 'jwt',
  title: 'JWT',
  description: 'Claims, signing, expiry and refresh tokens',
  icon: 'vpn-key',
  lessons: [
    {
      id: 'auth-jwt-basics',
      title: 'How a JWT works',
      blocks: [
        { type: 'text', value: 'A JSON Web Token has three base64url parts: header, payload and signature. The server signs the first two. Anyone can read a JWT, so never put secrets in it. The signature proves it was not changed.' },
        { type: 'code', lang: 'text', tryIt: false, value: `header.payload.signature

payload: { "sub": "42", "role": "user", "exp": 1700000000 }` },
        { type: 'note', value: 'A JWT is signed, not encrypted. Base64 decoding reveals the payload to anyone who holds the token.' },
      ],
    },
    {
      id: 'auth-jwt-verify',
      title: 'Verifying a JWT',
      blocks: [
        { type: 'text', value: 'Always verify the signature, the algorithm, the expiry, the issuer and the audience. Reject tokens with none or an unexpected algorithm.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import jwt from 'jsonwebtoken';

const payload = jwt.verify(token, process.env.JWT_SECRET, {
  algorithms: ['HS256'],
  issuer: 'https://api.example.com',
  audience: 'codenest-app',
});` },
        { type: 'list', items: [
          'Pin the allowed algorithms',
          'Check exp and nbf',
          'Check iss and aud',
          'Use a long random secret',
          'Prefer asymmetric keys when many services verify',
        ] },
      ],
    },
    {
      id: 'auth-refresh',
      title: 'Access and refresh tokens',
      blocks: [
        { type: 'text', value: 'Keep access tokens short-lived, such as 15 minutes, and use a refresh token to get a new one. Refresh tokens are stored securely and can be rotated and revoked. This limits the damage of a stolen access token.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Login response
{
  "accessToken": "...",     // 15 minutes
  "refreshToken": "..."     // 30 days, single use, rotated
}

// POST /auth/refresh verifies the refresh token,
// rotates it, and returns a new access token.` },
        { type: 'note', value: 'There is no logout for a stateless access token. Short lifetimes plus a revocable refresh token give you the control you need.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'jwt',
      q: 'Is a JWT encrypted?',
      options: ['Yes', 'No, it is signed and readable', 'Only with HS256', 'Only in HTTPS'],
      answer: 1,
      explain: 'The payload is base64url, not encrypted.',
    },
    {
      chapterId: 'jwt',
      q: 'What must you verify?',
      options: ['Only the signature', 'Signature, algorithm, expiry, issuer and audience', 'Only the payload', 'Only the header'],
      answer: 1,
      explain: 'All claims and the algorithm matter.',
    },
    {
      chapterId: 'jwt',
      q: 'Why keep access tokens short-lived?',
      options: ['To save memory', 'To limit the damage of a stolen token', 'To enable CSRF', 'To paginate'],
      answer: 1,
      explain: 'Short expiry limits exposure.',
    },
    {
      chapterId: 'jwt',
      q: 'What does a refresh token allow?',
      options: ['No expiry', 'Getting a new access token without logging in again', 'Reading the database', 'Skipping auth'],
      answer: 1,
      explain: 'It renews sessions safely.',
    },
  ],
};
