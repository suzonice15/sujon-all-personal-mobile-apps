// Security chapter: Authentication.

export default {
  id: 'auth',
  title: 'Authentication',
  description: 'Passwords, MFA, sessions and tokens',
  icon: 'lock',
  lessons: [
    {
      id: 'sec-passwords',
      title: 'Passwords',
      blocks: [
        { type: 'text', value: 'Store passwords with a slow, salted hash: bcrypt, scrypt or Argon2. Never plain text, never a fast hash such as SHA-256 alone.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(password, user.passwordHash);

if (!ok) return res.status(401).json({ error: 'Invalid credentials' });` },
        { type: 'list', items: [
          'Enforce a reasonable minimum length',
          'Check breached-password lists',
          'Rate limit login attempts',
          'Return the same error for wrong email and wrong password',
          'Do not log passwords or reset tokens',
        ] },
        { type: 'note', value: 'Password rules that force symbols and rotation often make passwords worse. Length and breach checks matter more.' },
      ],
    },
    {
      id: 'sec-mfa-sessions',
      title: 'MFA and sessions',
      blocks: [
        { type: 'text', value: 'Multi-factor authentication blocks most account takeover. A session should be an opaque id in an HttpOnly, Secure, SameSite cookie, with server-side revocation.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Set-Cookie: session=random-256-bit; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800

Server session store:
  id -> user_id, created_at, last_seen, device, revoked` },
        { type: 'list', items: [
          'Regenerate the session id after login',
          'Expire idle sessions',
          'Allow the user to see and revoke devices',
          'Bind sessions to a device where appropriate',
          'Require re-authentication for sensitive actions',
        ] },
      ],
    },
    {
      id: 'sec-jwt-oauth',
      title: 'JWT and OAuth',
      blocks: [
        { type: 'text', value: 'A JWT is signed, not encrypted. Anyone can read the payload. Keep it short lived, store it securely and do not put secrets in it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `JWT payload (readable):
{ "sub": "42", "role": "student", "exp": 1767225600 }

Rules:
- verify signature and exp on every request
- keep access tokens short
- use refresh tokens with rotation
- never put a password or API key in the payload` },
        { type: 'list', items: [
          'OAuth is for delegated access, not a login protocol by itself',
          'Use PKCE for mobile and single-page apps',
          'Validate the redirect URI exactly',
          'Use the state parameter to prevent CSRF',
          'Prefer an established library over custom token code',
        ] },
        { type: 'note', value: 'JWT is hard to revoke. If you need instant logout, use server-side sessions or keep tokens very short lived.' },
      ],
    },
    {
      id: 'sec-authz',
      title: 'Authorization',
      blocks: [
        { type: 'text', value: 'Authentication identifies; authorization decides. Check roles and ownership on the server for every request. The UI is not a security boundary.' },
        { type: 'list', items: [
          'Deny by default',
          'Check object ownership, not just role',
          'Return 403 for denied access',
          'Log admin actions',
          'Test with two different users',
        ] },
        { type: 'note', value: 'A hidden button is a hint, not a control. Anyone can call the API directly with curl.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'auth',
      q: 'How should passwords be stored?',
      options: ['Plain text', 'A fast hash', 'A slow salted hash', 'Base64'],
      answer: 2,
      explain: 'bcrypt, scrypt and Argon2 are designed for passwords.',
    },
    {
      chapterId: 'auth',
      q: 'What does HttpOnly prevent?',
      options: ['HTTPS', 'JavaScript reading the cookie', 'Caching', 'Compression'],
      answer: 1,
      explain: 'It hides the cookie from scripts.',
    },
    {
      chapterId: 'auth',
      q: 'Is a JWT encrypted?',
      options: ['Yes', 'No, it is signed and readable', 'Only on mobile', 'Only with HTTPS'],
      answer: 1,
      explain: 'Do not put secrets in the payload.',
    },
    {
      chapterId: 'auth',
      q: 'What is the difference between authentication and authorization?',
      options: ['They are the same', 'Authentication identifies; authorization permits', 'Authorization identifies', 'Neither matters'],
      answer: 1,
      explain: 'Identity first, then permission.',
    },
  ],
};
