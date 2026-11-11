// Networks chapter: TLS and HTTPS.

export default {
  id: 'tls',
  title: 'TLS & HTTPS',
  description: 'Certificates, handshakes and secure connections',
  icon: 'lock',
  lessons: [
    {
      id: 'net-https',
      title: 'What HTTPS adds',
      blocks: [
        { type: 'text', value: 'HTTPS is HTTP inside TLS. TLS provides encryption, integrity and authentication: nobody can read or change the traffic, and the client knows it is talking to the real server.' },
        { type: 'list', items: [
          'Confidentiality - traffic is encrypted',
          'Integrity - tampering is detected',
          'Authentication - the certificate proves the domain',
          'Forward secrecy - past sessions stay safe if a key leaks',
        ] },
        { type: 'note', value: 'HTTPS does not hide the destination IP or the domain in some network setups. It protects the content, not the fact that a connection exists.' },
      ],
    },
    {
      id: 'net-tls-handshake',
      title: 'The TLS handshake',
      blocks: [
        { type: 'text', value: 'The client and server agree on a protocol version and cipher suite, verify the certificate, and derive session keys. TLS 1.3 reduces this to one round trip.' },
        { type: 'code', lang: 'text', tryIt: false, value: `client -> server: ClientHello (versions, ciphers, SNI)
server -> client: ServerHello, Certificate, Finished
client -> server: key share, Finished
-> encrypted HTTP` },
        { type: 'note', value: 'SNI carries the requested hostname in plaintext in many setups, which is why some networks can see which site you visit even over HTTPS.' },
      ],
    },
    {
      id: 'net-certificates',
      title: 'Certificates',
      blocks: [
        { type: 'text', value: 'A certificate binds a domain to a public key and is signed by a certificate authority. The client trusts a set of root CAs and verifies the chain.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `openssl s_client -connect example.com:443 -servername example.com
curl -vI https://example.com` },
        { type: 'note', value: 'An expired certificate, a wrong domain or an incomplete chain causes a browser warning. Let\'s Encrypt certificates are free and renew automatically.' },
      ],
    },
    {
      id: 'net-tls-practices',
      title: 'Practical rules',
      blocks: [
        { type: 'list', items: [
          'Redirect HTTP to HTTPS',
          'Use HSTS after you are sure HTTPS works',
          'Never disable certificate verification in production',
          'Keep certificates and keys out of the repository',
          'Monitor expiry dates',
          'Use TLS 1.2 or newer',
        ] },
        { type: 'note', value: 'A mobile app that ignores certificate errors is vulnerable to a man-in-the-middle attack on any public Wi-Fi.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'tls',
      q: 'What does HTTPS add to HTTP?',
      options: ['Compression', 'TLS encryption and authentication', 'Caching', 'Routing'],
      answer: 1,
      explain: 'TLS provides confidentiality, integrity and server authentication.',
    },
    {
      chapterId: 'tls',
      q: 'What does a certificate prove?',
      options: ['The server is fast', 'The domain is bound to a public key', 'The database is secure', 'The client is logged in'],
      answer: 1,
      explain: 'A trusted CA signs the binding between domain and key.',
    },
    {
      chapterId: 'tls',
      q: 'What should you never do in production?',
      options: ['Use TLS 1.3', 'Disable certificate verification', 'Redirect HTTP to HTTPS', 'Monitor expiry'],
      answer: 1,
      explain: 'Disabling verification allows man-in-the-middle attacks.',
    },
    {
      chapterId: 'tls',
      q: 'What does HSTS do?',
      options: ['Encrypts DNS', 'Tells the browser to always use HTTPS', 'Compresses responses', 'Caches images'],
      answer: 1,
      explain: 'It prevents downgrade to plain HTTP for the domain.',
    },
  ],
};
