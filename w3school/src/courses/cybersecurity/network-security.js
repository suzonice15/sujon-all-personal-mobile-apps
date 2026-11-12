// Security chapter: Network Security.

export default {
  id: 'network-security',
  title: 'Network Security',
  description: 'Firewalls, VPNs, MITM and exposed services',
  icon: 'wifi',
  lessons: [
    {
      id: 'sec-firewall',
      title: 'Firewalls',
      blocks: [
        { type: 'text', value: 'A firewall allows or blocks traffic by address, port and protocol. Default deny with explicit allows is the safest baseline. Cloud security groups are firewalls too.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sudo ufw default deny incoming
sudo ufw allow 22/tcp
sudo ufw allow 80,443/tcp
sudo ufw enable
sudo ufw status verbose` },
        { type: 'note', value: 'Exposing a database port to 0.0.0.0/0 is a common and serious mistake. Only the proxy and the app should reach the database.' },
      ],
    },
    {
      id: 'sec-mitm',
      title: 'Man-in-the-middle',
      blocks: [
        { type: 'text', value: 'A MITM attacker sits between the client and the server. On public Wi-Fi this is easy without TLS. Certificate verification is what stops it.' },
        { type: 'list', items: [
          'Use HTTPS everywhere',
          'Never disable certificate verification',
          'Do not install random root certificates',
          'Prefer HSTS for web apps',
          'Use certificate pinning only with a rotation plan',
        ] },
        { type: 'note', value: 'A mobile app that ignores certificate errors can be attacked on any shared network, even if the site is HTTPS.' },
      ],
    },
    {
      id: 'sec-vpn-dns',
      title: 'VPNs and DNS',
      blocks: [
        { type: 'text', value: 'A VPN encrypts traffic between the device and the VPN gateway. DNS spoofing returns a false IP for a name; HTTPS with a valid certificate limits the damage.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `dig example.com
dig +short example.com
dig @1.1.1.1 example.com

# Check certificate and chain
openssl s_client -connect example.com:443 -servername example.com` },
        { type: 'note', value: 'A VPN shifts trust to the provider. It is not anonymity by itself. Use HTTPS regardless.' },
      ],
    },
    {
      id: 'sec-exposure',
      title: 'Reducing exposure',
      blocks: [
        { type: 'list', items: [
          'Close ports you do not use',
          'Bind internal services to 127.0.0.1',
          'Put a reverse proxy in front',
          'Use a private network for databases',
          'Disable admin panels on public interfaces',
          'Scan your own public IPs periodically',
        ] },
        { type: 'text', value: 'The best firewall rule is the service that is not running. Remove what you do not need before tuning what is left.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'network-security',
      q: 'What is a safe firewall default?',
      options: ['Allow all', 'Deny incoming by default', 'Deny outgoing by default', 'Disable it'],
      answer: 1,
      explain: 'Explicit allows on top of a deny default.',
    },
    {
      chapterId: 'network-security',
      q: 'What stops a MITM on HTTPS?',
      options: ['A longer password', 'Certificate verification', 'A VPN only', 'A firewall only'],
      answer: 1,
      explain: 'TLS authenticates the server.',
    },
    {
      chapterId: 'network-security',
      q: 'What does binding to 127.0.0.1 do?',
      options: ['Exposes the service', 'Keeps it local to the machine', 'Encrypts it', 'Speeds it up'],
      answer: 1,
      explain: 'It is not reachable from the network.',
    },
    {
      chapterId: 'network-security',
      q: 'Is a VPN anonymity?',
      options: ['Yes, always', 'No, it shifts trust to the provider', 'Only on mobile', 'Only with DNS'],
      answer: 1,
      explain: 'The provider can still see metadata.',
    },
  ],
};
