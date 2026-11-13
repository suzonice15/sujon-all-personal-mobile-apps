// Auth chapter: Passwords.

export default {
  id: 'passwords',
  title: 'Passwords',
  description: 'Hashing, salting and safe reset flows',
  icon: 'password',
  lessons: [
    {
      id: 'auth-hashing',
      title: 'Hashing passwords',
      blocks: [
        { type: 'text', value: 'Store passwords as slow, salted hashes. A hash is one-way, so a leaked database does not reveal passwords. Use a purpose-built algorithm such as Argon2, bcrypt or scrypt.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(password, hash);` },
        { type: 'note', value: 'Never use MD5 or SHA-256 alone for passwords. They are fast, which is exactly what an attacker wants.' },
      ],
    },
    {
      id: 'auth-reset',
      title: 'Reset flows',
      blocks: [
        { type: 'text', value: 'A reset flow sends a single-use, expiring token by email. The token is stored hashed, expires quickly and can be used once. Never email the old password or reveal whether an account exists.' },
        { type: 'list', items: [
          'Random, unguessable token',
          'Expires in 15 to 60 minutes',
          'Single use',
          'Store only a hash of the token',
          'Invalidate other sessions after reset',
          'Rate limit reset requests',
        ] },
        { type: 'note', value: 'A reset endpoint that says “email not found” helps an attacker enumerate accounts. Always return the same message.' },
      ],
    },
    {
      id: 'auth-password-policy',
      title: 'Password policy',
      blocks: [
        { type: 'text', value: 'Long passwords beat complex short ones. Enforce a minimum length, check against a breach list, and do not force arbitrary symbol rules that users work around. Offer a password manager friendly form.' },
        { type: 'list', items: [
          'Minimum 8-12 characters',
          'Check against known breached passwords',
          'Allow paste and password managers',
          'Do not block spaces',
          'Rate limit login attempts',
          'Offer MFA',
        ] },
        { type: 'note', value: 'A "1 symbol, 1 number, 1 uppercase" rule produces Passw0rd! and nothing safer.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'passwords',
      q: 'Which algorithm should hash passwords?',
      options: ['MD5', 'SHA-1', 'Argon2 or bcrypt', 'Base64'],
      answer: 2,
      explain: 'Use a slow, salted password hash.',
    },
    {
      chapterId: 'passwords',
      q: 'Why is SHA-256 alone unsafe for passwords?',
      options: ['It is too slow', 'It is too fast, so brute force is cheap', 'It is not standard', 'It cannot hash text'],
      answer: 1,
      explain: 'Fast hashes are easy to brute force.',
    },
    {
      chapterId: 'passwords',
      q: 'How long should a reset token last?',
      options: ['30 days', '15-60 minutes', 'One year', 'Forever'],
      answer: 1,
      explain: 'Short-lived tokens limit risk.',
    },
    {
      chapterId: 'passwords',
      q: 'Why return the same message for reset?',
      options: ['For speed', 'To prevent account enumeration', 'To enable CSRF', 'To paginate'],
      answer: 1,
      explain: 'Different messages reveal accounts.',
    },
  ],
};
