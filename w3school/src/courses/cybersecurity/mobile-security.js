// Security chapter: Mobile Security.

export default {
  id: 'mobile-security',
  title: 'Mobile Security',
  description: 'Storage, permissions, TLS and tampering',
  icon: 'phone-android',
  lessons: [
    {
      id: 'sec-mobile-storage',
      title: 'Local storage',
      blocks: [
        { type: 'text', value: 'A phone is a shared device and can be lost or rooted. Store tokens in the platform keystore, not in preferences or a plain file.' },
        { type: 'list', items: [
          'Android Keystore / iOS Keychain for tokens',
          'SQLite for non-secret structured data',
          'No secrets in AsyncStorage or SharedPreferences',
          'Encrypt sensitive files at rest',
          'Clear data on logout',
        ] },
        { type: 'note', value: 'A rooted device can read app storage. Keystore protects keys, but a determined attacker with root can still observe the running app.' },
      ],
    },
    {
      id: 'sec-mobile-permissions',
      title: 'Permissions',
      blocks: [
        { type: 'text', value: 'Ask only for permissions the feature needs. A flashlight app does not need contacts. Every extra permission increases risk and store review scrutiny.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Good: request camera when the user taps "Take photo"
Bad:  request camera, contacts, location at first launch` },
        { type: 'list', items: [
          'Request in context with a short explanation',
          'Handle denial gracefully',
          'Do not request permissions you never use',
          'Review manifest permissions before release',
          'Use scoped storage on modern Android',
        ] },
      ],
    },
    {
      id: 'sec-mobile-network',
      title: 'Network and TLS',
      blocks: [
        { type: 'text', value: 'Mobile apps must verify TLS certificates. Never ship an "accept all certificates" trust manager. Pinning can help but needs a rotation plan.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Bad:  X509TrustManager that accepts everything
Good: platform default verification

Pinning: pin the public key, include a backup pin,
and plan for certificate rotation before it expires` },
        { type: 'note', value: 'Pinning without a backup pin can brick the app when the certificate changes. It is a trade-off, not a default.' },
      ],
    },
    {
      id: 'sec-mobile-tamper',
      title: 'Tampering and reverse engineering',
      blocks: [
        { type: 'list', items: [
          'Do not put API keys or business secrets in the app',
          'Assume the client can be modified',
          'Validate and enforce rules on the server',
          'Use Play Integrity / App Attest for risk signals',
          'Obfuscation raises cost, not security',
          'Detect root only as a signal, not a guarantee',
        ] },
        { type: 'text', value: 'The client is untrusted. Anything that matters for money, permissions or fairness must be enforced on the server.' },
        { type: 'note', value: 'A determined attacker can patch the APK. Design so that patching the client does not give free money or admin access.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'mobile-security',
      q: 'Where should a token live on a phone?',
      options: ['SharedPreferences', 'A plain file', 'Keystore / Keychain', 'In the code'],
      answer: 2,
      explain: 'It is the platform secure storage.',
    },
    {
      chapterId: 'mobile-security',
      q: 'When should you request a permission?',
      options: ['At first launch', 'When the feature is used', 'Every screen', 'Never'],
      answer: 1,
      explain: 'Context makes the request understandable.',
    },
    {
      chapterId: 'mobile-security',
      q: 'What is dangerous about a custom trust manager?',
      options: ['It is slow', 'It can accept any certificate and allow MITM', 'It uses memory', 'It breaks the UI'],
      answer: 1,
      explain: 'Never disable certificate verification.',
    },
    {
      chapterId: 'mobile-security',
      q: 'What must be enforced on the server?',
      options: ['UI colors', 'Money, permissions and fairness rules', 'Font size', 'Animations'],
      answer: 1,
      explain: 'The client can be modified.',
    },
  ],
};
