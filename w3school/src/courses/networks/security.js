// Networks chapter: Network Security.

export default {
  id: 'security',
  title: 'Network Security',
  description: 'Firewalls, VPNs and common attacks',
  icon: 'shield',
  lessons: [
    {
      id: 'net-firewall',
      title: 'Firewalls',
      blocks: [
        { type: 'text', value: 'A firewall allows or blocks traffic by address, port and protocol. A default-deny policy with explicit allows is the safest baseline.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sudo ufw default deny incoming
sudo ufw allow 22/tcp
sudo ufw allow 80,443/tcp
sudo ufw enable
sudo ufw status verbose` },
        { type: 'note', value: 'A cloud security group is a firewall too. Exposing a database port to 0.0.0.0/0 is a common and serious mistake.' },
      ],
    },
    {
      id: 'net-vpn',
      title: 'VPNs',
      blocks: [
        { type: 'text', value: 'A VPN creates an encrypted tunnel between a device and a network. It protects traffic on untrusted Wi-Fi and connects remote users to a private network.' },
        { type: 'list', items: [
          'Site-to-site - connects two networks',
          'Remote access - connects one device',
          'WireGuard - modern, fast, simple',
          'IPsec - common in enterprise and cloud',
          'A VPN is not anonymity; the provider still sees metadata',
        ] },
        { type: 'note', value: 'A VPN shifts trust from the local network to the VPN provider. Choose one you trust and use HTTPS anyway.' },
      ],
    },
    {
      id: 'net-attacks',
      title: 'Common attacks',
      blocks: [
        { type: 'list', items: [
          'MITM - intercept traffic; defeated by TLS verification',
          'DNS spoofing - false answers; defeated by DNSSEC or HTTPS',
          'DDoS - flood a service; mitigated by rate limits and a CDN',
          'Port scanning - find open services; reduce exposure',
          'Credential stuffing - reused passwords; use MFA',
          'Packet sniffing - read unencrypted traffic; encrypt everything',
        ] },
        { type: 'note', value: 'Most attacks exploit a known, unpatched or misconfigured service. Patching and least privilege prevent more than any clever tool.' },
      ],
    },
    {
      id: 'net-security-checklist',
      title: 'Checklist',
      blocks: [
        { type: 'list', items: [
          'Default-deny firewall, only required ports open',
          'HTTPS everywhere, HSTS enabled',
          'MFA for admin accounts',
          'Patch the OS and dependencies',
          'Least privilege for services and users',
          'Log and alert on failed logins',
          'Backups tested, not just created',
          'No secrets in code or images',
        ] },
        { type: 'note', value: 'Security is a set of small defaults, not one product. The checklist is more effective than a single expensive tool.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'What is a safe firewall default?',
      options: ['Allow all', 'Deny incoming by default', 'Deny outgoing by default', 'Disable the firewall'],
      answer: 1,
      explain: 'Default deny with explicit allows reduces exposure.',
    },
    {
      chapterId: 'security',
      q: 'What does a VPN protect?',
      options: ['The application code', 'Traffic between the device and the VPN network', 'The database', 'DNS records'],
      answer: 1,
      explain: 'It encrypts the tunnel, not the endpoints.',
    },
    {
      chapterId: 'security',
      q: 'What defeats a man-in-the-middle attack on HTTPS?',
      options: ['A longer password', 'Certificate verification', 'A faster network', 'A bigger firewall'],
      answer: 1,
      explain: 'TLS authentication proves the server identity.',
    },
    {
      chapterId: 'security',
      q: 'Which is a serious mistake?',
      options: ['Default-deny firewall', 'Exposing a database to 0.0.0.0/0', 'Using MFA', 'Patching'],
      answer: 1,
      explain: 'It exposes the database to the entire internet.',
    },
  ],
};
