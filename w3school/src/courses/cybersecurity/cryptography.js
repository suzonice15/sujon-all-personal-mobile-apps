// Security chapter: Cryptography.

export default {
  id: 'cryptography',
  title: 'Cryptography',
  description: 'Hashing, encryption, TLS and randomness',
  icon: 'enhanced-encryption',
  lessons: [
    {
      id: 'sec-hashing',
      title: 'Hashing',
      blocks: [
        { type: 'text', value: 'A hash is one-way. The same input always gives the same output, and you cannot reverse it. Use SHA-256 for integrity; use bcrypt or Argon2 for passwords.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sha256sum file.iso
# compare with the published checksum

# Password hashing is different:
# bcrypt / argon2 are slow and salted on purpose` },
        { type: 'list', items: [
          'Hashing is not encryption',
          'A salt makes identical passwords hash differently',
          'A fast hash is wrong for passwords',
          'HMAC adds a secret key for authenticity',
          'Compare hashes in constant time for secrets',
        ] },
        { type: 'note', value: 'Never invent your own crypto. Use a maintained library and the recommended defaults.' },
      ],
    },
    {
      id: 'sec-encryption',
      title: 'Encryption',
      blocks: [
        { type: 'text', value: 'Symmetric encryption uses one key for both directions. Asymmetric encryption uses a public key to encrypt and a private key to decrypt or sign. TLS combines both.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Symmetric: AES-256-GCM
Asymmetric: RSA or ECDSA / Ed25519
Key exchange: ECDHE
Transport: TLS 1.3` },
        { type: 'list', items: [
          'Use authenticated encryption such as AES-GCM',
          'Never reuse a nonce with the same key',
          'Store keys in a KMS or secret manager',
          'Rotate keys and plan for re-encryption',
          'Encryption at rest does not protect a compromised app',
        ] },
        { type: 'note', value: 'Encryption is only as strong as key management. A key in the source code defeats the encryption.' },
      ],
    },
    {
      id: 'sec-tls',
      title: 'TLS',
      blocks: [
        { type: 'text', value: 'TLS provides confidentiality, integrity and authentication. The client verifies the server certificate chain and hostname. TLS 1.2 is the minimum; prefer 1.3.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `openssl s_client -connect example.com:443 -servername example.com
curl -vI https://example.com

# Check certificate expiry
echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -dates` },
        { type: 'note', value: 'Disabling certificate verification to "make it work" opens the door to a man-in-the-middle attack.' },
      ],
    },
    {
      id: 'sec-random',
      title: 'Randomness',
      blocks: [
        { type: 'text', value: 'Security tokens, salts and ids must use a cryptographically secure random generator. Math.random is predictable and must never be used for secrets.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Node.js
import { randomBytes } from 'node:crypto';
const token = randomBytes(32).toString('hex');

// Browser
const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);` },
        { type: 'note', value: 'A predictable token lets an attacker guess a password reset link or a session id. Use the platform crypto API, not a custom random function.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'cryptography',
      q: 'Which hash is appropriate for passwords?',
      options: ['MD5', 'SHA-256 alone', 'bcrypt or Argon2', 'CRC32'],
      answer: 2,
      explain: 'Passwords need slow, salted hashing.',
    },
    {
      chapterId: 'cryptography',
      q: 'What does a salt do?',
      options: ['Encrypts data', 'Makes identical passwords hash differently', 'Speeds hashing', 'Stores the key'],
      answer: 1,
      explain: 'A unique salt per password defeats precomputed tables.',
    },
    {
      chapterId: 'cryptography',
      q: 'What does TLS verify?',
      options: ['The database', 'The server certificate and hostname', 'The password strength', 'The firewall'],
      answer: 1,
      explain: 'It authenticates the server identity.',
    },
    {
      chapterId: 'cryptography',
      q: 'Why not use Math.random for tokens?',
      options: ['It is slow', 'It is predictable', 'It is not available', 'It uses too much memory'],
      answer: 1,
      explain: 'Use a cryptographically secure generator.',
    },
  ],
};
