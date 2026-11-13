// Auth chapter: MFA & Passkeys.

export default {
  id: 'mfa-passkeys',
  title: 'MFA & Passkeys',
  description: 'TOTP, WebAuthn and recovery',
  icon: 'security',
  lessons: [
    {
      id: 'auth-mfa',
      title: 'Multi-factor authentication',
      blocks: [
        { type: 'text', value: 'MFA requires something you know plus something you have or are. TOTP codes from an authenticator app are common and better than SMS, which can be intercepted.' },
        { type: 'list', items: [
          'Something you know: password',
          'Something you have: phone, hardware key',
          'Something you are: biometrics',
          'TOTP is time-based and offline',
          'SMS is weaker but better than nothing',
        ] },
        { type: 'note', value: 'Offer recovery codes and a backup method. A user locked out of MFA is a support incident.' },
      ],
    },
    {
      id: 'auth-webauthn',
      title: 'Passkeys and WebAuthn',
      blocks: [
        { type: 'text', value: 'WebAuthn uses public key cryptography. The device keeps a private key and the server stores the public key. There is no shared secret to phish, which makes passkeys the strongest common option.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Register:
  server -> challenge
  device -> create credential, sign challenge
  server -> store public key + credential id

Login:
  server -> challenge
  device -> sign with private key
  server -> verify with the stored public key` },
        { type: 'note', value: 'Passkeys are phishing resistant because the credential is bound to the site origin. A fake login page cannot use it.' },
      ],
    },
    {
      id: 'auth-recovery',
      title: 'Recovery',
      blocks: [
        { type: 'text', value: 'MFA shifts the risk to account recovery. A weak recovery flow undoes the protection. Use single-use recovery codes, a verified email, and a delay or manual review for sensitive changes.' },
        { type: 'list', items: [
          'Generate recovery codes at setup',
          'Show them once and store hashed',
          'Invalidate codes after use',
          'Alert the user on MFA changes',
          'Require re-authentication for sensitive actions',
        ] },
        { type: 'note', value: 'An attacker who can reset MFA by email has bypassed MFA entirely. Protect the recovery path as strongly as the login.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'mfa-passkeys',
      q: 'What is TOTP?',
      options: ['A password', 'A time-based one-time code', 'A token type', 'A database'],
      answer: 1,
      explain: 'TOTP codes change every 30 seconds.',
    },
    {
      chapterId: 'mfa-passkeys',
      q: 'Why are passkeys phishing resistant?',
      options: ['They are longer', 'The credential is bound to the site origin', 'They use SMS', 'They never expire'],
      answer: 1,
      explain: 'A fake origin cannot use the credential.',
    },
    {
      chapterId: 'mfa-passkeys',
      q: 'What does the server store for WebAuthn?',
      options: ['The private key', 'The public key and credential id', 'The password', 'The PIN'],
      answer: 1,
      explain: 'The private key stays on the device.',
    },
    {
      chapterId: 'mfa-passkeys',
      q: 'Why protect account recovery?',
      options: ['It is optional', 'A weak recovery bypasses MFA', 'It is slow', 'It is not standard'],
      answer: 1,
      explain: 'Recovery is the weakest link.',
    },
  ],
};
