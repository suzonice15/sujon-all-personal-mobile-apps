// Node.js chapter: Authentication.

export default {
  id: 'auth',
  title: 'Authentication',
  description: 'Passwords, tokens, sessions and authorization',
  icon: 'lock',
  lessons: [
    {
      id: 'node-auth-vs-authorization',
      title: 'Authentication versus authorization',
      blocks: [
        { type: 'text', value: 'Authentication answers "who are you?". Authorization answers "what may you do?". They are separate checks and both are required.' },
        { type: 'list', items: [
          'Authentication: login, token, session',
          'Authorization: roles, ownership, permissions',
          'Always check ownership on the server, not just in the UI',
          'Return 401 for missing identity, 403 for denied access',
        ] },
        { type: 'note', value: 'A hidden button is not security. If the API allows the action, the user can call it directly with curl.' },
      ],
    },
    {
      id: 'node-password-hashing',
      title: 'Password hashing',
      blocks: [
        { type: 'text', value: 'Never store passwords in plain text or with a fast hash such as SHA-256. Use a slow, salted password hash: bcrypt, scrypt or Argon2.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 12);

const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });` },
        { type: 'text', value: 'The salt is stored inside the hash, so every password hashes differently even when two users choose the same password. The cost factor makes brute force expensive.' },
        { type: 'note', value: 'Return the same error for an unknown email and a wrong password. Different messages tell an attacker which emails exist.' },
      ],
    },
    {
      id: 'node-jwt',
      title: 'JSON Web Tokens',
      blocks: [
        { type: 'text', value: 'A JWT has three base64url parts: header, payload and signature. The payload is readable by anyone; it is signed, not encrypted. Never put secrets in it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `header.payload.signature

{
  "sub": "42",
  "role": "student",
  "exp": 1767225600
}

// Verify on every protected request
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: payload.sub, role: payload.role };` },
        { type: 'list', items: [
          'Access token: short lived, sent with requests',
          'Refresh token: long lived, stored securely, used to get a new access token',
          'Never store a token in localStorage on the web if you can use an HttpOnly cookie',
          'On mobile, use the platform secure storage (Keychain / Keystore)',
        ] },
        { type: 'note', value: 'A JWT cannot be revoked easily. Keep access tokens short and keep a refresh-token table so logout and theft response are possible.' },
      ],
    },
    {
      id: 'node-sessions',
      title: 'Sessions and cookies',
      blocks: [
        { type: 'text', value: 'A session is server-side state identified by a cookie. The cookie holds an opaque id, not the user data. The server can revoke a session at any time.' },
        { type: 'code', lang: 'js', tryIt: false, value: `app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));` },
        { type: 'text', value: 'httpOnly stops JavaScript from reading the cookie, secure sends it only over HTTPS, and sameSite reduces cross-site request forgery.' },
        { type: 'note', value: 'JWT or session? Use sessions when you need instant revocation and a single server or shared store. Use JWT for stateless APIs and multiple services, with short lifetimes.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'auth',
      q: 'What is the difference between authentication and authorization?',
      options: ['They are the same', 'Authentication identifies; authorization permits', 'Authorization identifies', 'Neither matters'],
      answer: 1,
      explain: 'Authentication proves identity; authorization decides access.',
    },
    {
      chapterId: 'auth',
      q: 'How should passwords be stored?',
      options: ['Plain text', 'SHA-256 without salt', 'A slow salted hash such as bcrypt', 'Base64'],
      answer: 2,
      explain: 'bcrypt, scrypt and Argon2 are designed to be slow and salted.',
    },
    {
      chapterId: 'auth',
      q: 'Is a JWT payload encrypted?',
      options: ['Yes, always', 'No, it is readable; only the signature is verified', 'Only on mobile', 'Only with HTTPS'],
      answer: 1,
      explain: 'Base64url is encoding, not encryption. Do not put secrets in the payload.',
    },
    {
      chapterId: 'auth',
      q: 'Why use an HttpOnly cookie for a session?',
      options: ['It is faster', 'JavaScript cannot read it, reducing token theft', 'It never expires', 'It encrypts the database'],
      answer: 1,
      explain: 'HttpOnly blocks access from scripts, which limits XSS damage.',
    },
    {
      chapterId: 'auth',
      q: 'Which status code fits a missing or invalid token?',
      options: ['401', '403', '404', '500'],
      answer: 0,
      explain: '401 means the request lacks valid authentication.',
    },
  ],
};
