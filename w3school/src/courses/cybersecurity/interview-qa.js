// Cybersecurity interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the CIA triad?',
      a: 'Confidentiality, integrity and availability. Most security controls protect one or more of these properties.',
      level: 'basic',
    },
    {
      q: 'What is threat modeling?',
      a: 'A structured review of assets, entry points, threats, controls and residual risk, done before code is written.',
      level: 'intermediate',
    },
    {
      q: 'What is an attack surface?',
      a: 'Everything an attacker can reach: endpoints, inputs, dependencies, permissions, cloud resources and people.',
      level: 'basic',
    },
    {
      q: 'When is security testing allowed?',
      a: 'Only on systems you own or have explicit written permission to test, within the agreed scope and time window.',
      level: 'basic',
    },
  ],
  'web-security': [
    {
      q: 'How do you prevent SQL injection?',
      a: 'Use parameterized queries or prepared statements so values are never part of the SQL text. Validation helps but is not sufficient.',
      level: 'basic',
    },
    {
      q: 'How do you prevent XSS?',
      a: 'Encode output for the correct context, prefer textContent over innerHTML, sanitize rich HTML and use a strict Content-Security-Policy.',
      level: 'intermediate',
    },
    {
      q: 'What is CSRF and how do you stop it?',
      a: 'A site makes a logged-in user send an unintended request. Use SameSite cookies, a CSRF token and Origin checks.',
      level: 'intermediate',
    },
    {
      q: 'What is IDOR?',
      a: 'Insecure direct object reference: a user changes an id and reads another user\'s object because the server does not check ownership.',
      level: 'advanced',
    },
  ],
  auth: [
    {
      q: 'How should passwords be stored?',
      a: 'With a slow, salted password hash such as bcrypt, scrypt or Argon2. Never plain text or a fast hash.',
      level: 'basic',
    },
    {
      q: 'Why use MFA?',
      a: 'It blocks most account takeover even when a password is leaked. A second factor makes a stolen password insufficient.',
      level: 'basic',
    },
    {
      q: 'Is a JWT encrypted?',
      a: 'No. It is signed and the payload is readable. Keep secrets out of it and keep access tokens short lived.',
      level: 'intermediate',
    },
    {
      q: 'Authentication versus authorization?',
      a: 'Authentication proves identity. Authorization decides what that identity may do. Both are checked on the server.',
      level: 'basic',
    },
  ],
  cryptography: [
    {
      q: 'Hashing versus encryption?',
      a: 'Hashing is one-way and used for integrity and passwords. Encryption is reversible with a key and used for confidentiality.',
      level: 'basic',
    },
    {
      q: 'What is a salt?',
      a: 'A unique random value added before hashing so identical passwords produce different hashes and precomputed tables fail.',
      level: 'intermediate',
    },
    {
      q: 'What does TLS protect?',
      a: 'Confidentiality, integrity and server authentication for the connection. It does not protect data after it reaches the server.',
      level: 'intermediate',
    },
    {
      q: 'Why is key management critical?',
      a: 'Encryption is only as strong as the key. A key in source code or a public bucket defeats the encryption.',
      level: 'advanced',
    },
  ],
  'network-security': [
    {
      q: 'What is a safe firewall policy?',
      a: 'Default deny, with explicit allow rules for the ports and sources that are actually needed.',
      level: 'basic',
    },
    {
      q: 'How does a MITM attack work?',
      a: 'The attacker sits between client and server, intercepting or altering traffic. TLS certificate verification prevents it.',
      level: 'intermediate',
    },
    {
      q: 'Is a VPN anonymity?',
      a: 'No. It encrypts traffic to the VPN gateway and shifts trust to the provider. It is not anonymity by itself.',
      level: 'intermediate',
    },
    {
      q: 'Why bind an internal service to 127.0.0.1?',
      a: 'It becomes unreachable from the network, so only a local reverse proxy can access it.',
      level: 'advanced',
    },
  ],
  'secure-coding': [
    {
      q: 'Where should validation run?',
      a: 'On the server at the boundary, because the client is untrusted. Client validation is only for user experience.',
      level: 'basic',
    },
    {
      q: 'Why encode output?',
      a: 'The same value is safe in one context and dangerous in another. Encoding prevents it from becoming code in HTML, JS or SQL.',
      level: 'intermediate',
    },
    {
      q: 'What is least privilege?',
      a: 'Giving each user, service and process only the permissions it needs, which limits the impact of a compromise.',
      level: 'basic',
    },
    {
      q: 'What should a 500 response contain?',
      a: 'A safe generic message and a request id. Details and stack traces belong in protected server logs.',
      level: 'intermediate',
    },
  ],
  'mobile-security': [
    {
      q: 'Where should a token live on a phone?',
      a: 'In the Android Keystore or iOS Keychain through secure storage, never in preferences or a plain file.',
      level: 'basic',
    },
    {
      q: 'When request a permission?',
      a: 'When the user needs the feature, with a short explanation, and handle denial gracefully.',
      level: 'basic',
    },
    {
      q: 'Why is a custom trust manager dangerous?',
      a: 'It can accept any certificate, enabling a man-in-the-middle attack on the app traffic.',
      level: 'intermediate',
    },
    {
      q: 'What must the server enforce?',
      a: 'Money, permissions, fairness and ownership rules. The client can be modified or reverse engineered.',
      level: 'advanced',
    },
  ],
  'cloud-security': [
    {
      q: 'What is the shared responsibility model?',
      a: 'The provider secures the physical infrastructure and managed service internals; you secure identities, configuration, data and application code.',
      level: 'basic',
    },
    {
      q: 'What is IAM least privilege?',
      a: 'Each workload or user gets only the actions and resources it needs, with short-lived credentials and no wildcard permissions.',
      level: 'intermediate',
    },
    {
      q: 'How do you protect object storage?',
      a: 'Block public access unless intentional, encrypt, version, restrict policies and audit access.',
      level: 'intermediate',
    },
    {
      q: 'Why are cloud misconfigurations so common?',
      a: 'The defaults and the number of services make it easy to expose something. Infrastructure as code and scanning reduce the risk.',
      level: 'advanced',
    },
  ],
  pentesting: [
    {
      q: 'What is rules of engagement?',
      a: 'Written scope, targets, allowed techniques, time window, contacts and stop procedure. It makes testing authorized and safe.',
      level: 'basic',
    },
    {
      q: 'Passive versus active recon?',
      a: 'Passive uses public information without touching the target. Active sends traffic and must be inside the agreed scope.',
      level: 'intermediate',
    },
    {
      q: 'What makes a good vulnerability report?',
      a: 'A clear title, severity, asset, reproduction steps, impact and a concrete fix, with sensitive data removed.',
      level: 'intermediate',
    },
    {
      q: 'Why do tools not replace a tester?',
      a: 'Tools produce candidates and false positives. A human validates impact, chains findings and explains the business risk.',
      level: 'advanced',
    },
  ],
  'incident-response': [
    {
      q: 'What are the phases of incident response?',
      a: 'Preparation, detection, containment, eradication, recovery and lessons learned.',
      level: 'basic',
    },
    {
      q: 'What comes first during containment?',
      a: 'Stop the bleeding and preserve evidence: revoke credentials, isolate systems and capture logs before deleting anything.',
      level: 'intermediate',
    },
    {
      q: 'Why rebuild instead of cleaning?',
      a: 'A cleaned host may still contain persistence. Rebuilding from a known-good state is safer.',
      level: 'intermediate',
    },
    {
      q: 'What makes a postmortem useful?',
      a: 'A clear timeline, impact, root cause and follow-up actions with owners and dates. It is blameless.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you audit a small app?',
      a: 'Map entry points, then test access control, injection, auth, secrets, dependencies and error handling, and fix the highest-impact issue first.',
      level: 'intermediate',
    },
    {
      q: 'What is the most common serious web bug?',
      a: 'Broken access control, especially missing ownership checks that allow one user to read another user\'s data.',
      level: 'basic',
    },
    {
      q: 'How do you build a portfolio in security?',
      a: 'Do authorized audits of your own projects, write clear findings, fix them and add regression tests. Responsible reports beat a list of tools.',
      level: 'basic',
    },
    {
      q: 'What is the base for every security role?',
      a: 'Networking, operating systems, web fundamentals, programming and clear writing. Tools change; the fundamentals transfer.',
      level: 'advanced',
    },
  ],
};
