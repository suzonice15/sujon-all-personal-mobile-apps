// Networks chapter: DNS.

export default {
  id: 'dns',
  title: 'DNS',
  description: 'How a name becomes an IP address',
  icon: 'travel-explore',
  lessons: [
    {
      id: 'net-dns-basics',
      title: 'The domain name system',
      blocks: [
        { type: 'text', value: 'DNS translates names such as codenest.app into IP addresses. It is a distributed hierarchy: root servers, top-level domains, authoritative servers and resolvers.' },
        { type: 'code', lang: 'text', tryIt: false, value: `codenest.app.
  . (root)
  -> .app (TLD)
  -> authoritative nameserver
  -> A record: 203.0.113.10` },
        { type: 'note', value: 'The resolver caches answers for the record TTL. A short TTL makes changes fast but increases query load.' },
      ],
    },
    {
      id: 'net-dns-records',
      title: 'Records',
      blocks: [
        { type: 'list', items: [
          'A - IPv4 address',
          'AAAA - IPv6 address',
          'CNAME - alias to another name',
          'MX - mail server',
          'TXT - text, often verification or SPF',
          'NS - authoritative nameserver',
          'SRV - service location',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `dig codenest.app A
dig codenest.app MX
dig codenest.app TXT
nslookup codenest.app` },
        { type: 'note', value: 'A CNAME cannot coexist with other records at the same name in standard DNS. Use it for subdomains, not the apex.' },
      ],
    },
    {
      id: 'net-dns-resolution',
      title: 'Resolution and caching',
      blocks: [
        { type: 'text', value: 'A resolver checks its cache, then asks the root, the TLD and the authoritative server. The answer is cached according to TTL. Your OS, browser and router may each keep a cache.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `dig +trace codenest.app
dig codenest.app +short
dig @1.1.1.1 codenest.app` },
        { type: 'note', value: 'When a deployment changes an IP, DNS may still return the old one until the TTL expires. Plan for that window.' },
      ],
    },
    {
      id: 'net-dns-debug',
      title: 'Debugging DNS',
      blocks: [
        { type: 'text', value: 'Check the record from multiple resolvers, compare with the authoritative answer, and verify the TTL. A wrong record or an expired domain fails before any HTTP happens.' },
        { type: 'list', items: [
          'dig +short - quick answer',
          'dig @8.8.8.8 - query a specific resolver',
          'dig +trace - follow the delegation chain',
          'nslookup - available on Windows too',
          'Check the registrar for expired domains',
        ] },
        { type: 'note', value: 'A DNS failure looks like "site not found" with no server logs. Always rule out DNS before debugging the app.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dns',
      q: 'What does DNS do?',
      options: ['Encrypts traffic', 'Translates names to IP addresses', 'Routes packets', 'Assigns ports'],
      answer: 1,
      explain: 'DNS resolves human names to addresses.',
    },
    {
      chapterId: 'dns',
      q: 'Which record holds an IPv4 address?',
      options: ['AAAA', 'A', 'MX', 'TXT'],
      answer: 1,
      explain: 'A records map names to IPv4 addresses.',
    },
    {
      chapterId: 'dns',
      q: 'What does TTL control?',
      options: ['Encryption strength', 'How long a record is cached', 'The port number', 'Packet size'],
      answer: 1,
      explain: 'A resolver may reuse the answer until the TTL expires.',
    },
    {
      chapterId: 'dns',
      q: 'Which command follows the full delegation chain?',
      options: ['dig +trace', 'ping', 'curl', 'ss'],
      answer: 0,
      explain: 'dig +trace asks each level of the hierarchy.',
    },
  ],
};
