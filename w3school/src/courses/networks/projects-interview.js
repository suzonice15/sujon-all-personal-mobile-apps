// Networks chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Diagnose a slow site and design a small network',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'net-project-debug',
      title: 'Project: diagnose a slow site',
      blocks: [
        { type: 'text', value: 'A user reports that the app is slow. Work through the layers instead of guessing. Each step either clears a layer or localises the problem.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# 1. Name resolution
dig +short api.example.com

# 2. Reachability and latency
ping -c 4 api.example.com

# 3. Port and TLS
curl -vI https://api.example.com/health

# 4. Timing breakdown
curl -o /dev/null -s -w \\
  "dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} total=%{time_total}\\n" \\
  https://api.example.com/health` },
        { type: 'note', value: 'A slow DNS lookup, a slow TLS handshake and a slow server response have different fixes. Measure each phase separately.' },
      ],
    },
    {
      id: 'net-project-design',
      title: 'Project: design a small network',
      blocks: [
        { type: 'text', value: 'Design a home or small office network: one router, a switch, a Wi-Fi access point, a NAS and a guest network. Decide which services are exposed and how they are protected.' },
        { type: 'list', items: [
          'One subnet for trusted devices',
          'A separate guest SSID with client isolation',
          'Only 80 and 443 forwarded to the internal server',
          'A firewall rule that blocks the database from the guest network',
          'Backups to the NAS on a schedule',
          'A UPS for the router and NAS',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `Internet
  -> ISP router (NAT, firewall)
     -> switch -> NAS, server, access point
     -> guest Wi-Fi (isolated, no LAN access)` },
        { type: 'note', value: 'Draw the diagram before buying hardware. It exposes missing pieces and unnecessary exposure.' },
      ],
    },
    {
      id: 'net-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What happens when you type a URL and press Enter?',
          'TCP versus UDP?',
          'What does a DNS resolver do?',
          'How does HTTPS protect a request?',
          'What is NAT and why is it needed?',
          'What is the difference between a router and a switch?',
          'How do you debug a site that will not load?',
          'What is a subnet mask?',
          'What is a DDoS attack and how do you mitigate it?',
          'Why does HTTP/3 use QUIC?',
        ] },
        { type: 'text', value: 'The classic question is the full path of a URL: DNS, TCP, TLS, HTTP, server, database, response, render. Practise telling it in order and naming where it can fail.' },
        { type: 'note', value: 'Strong answers use the layer vocabulary and a concrete command. "Check DNS with dig +short" is better than "check the network".' },
      ],
    },
    {
      id: 'net-cheat-sheet',
      title: 'Cheat sheet',
      blocks: [
        { type: 'list', items: [
          'dig +short name - resolve a name',
          'ping host - reachability and RTT',
          'curl -vI url - HTTP and TLS details',
          'ss -tulpn - listening ports',
          'traceroute host - path and hops',
          'tcpdump -i any -n - capture packets',
          'openssl s_client - TLS certificate chain',
          'ip route - routing table',
        ] },
        { type: 'text', value: 'Keep this list next to your terminal. Most network debugging is a sequence of these commands in order.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which command measures DNS, connect and TLS time separately?',
      options: ['ping', 'curl -w with time variables', 'ls', 'ss'],
      answer: 1,
      explain: 'curl -w prints timing phases for the request.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why use a separate guest network?',
      options: ['It is faster', 'It isolates guests from internal devices', 'It enables NAT', 'It removes DNS'],
      answer: 1,
      explain: 'Client isolation limits what a compromised guest device can reach.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the first step in diagnosing an unreachable site?',
      options: ['Restart the server', 'Resolve the name with DNS', 'Reinstall the OS', 'Change the password'],
      answer: 1,
      explain: 'Rule out DNS before debugging the connection.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which tool shows listening sockets and their process?',
      options: ['dig', 'ss -tulpn', 'ping', 'traceroute'],
      answer: 1,
      explain: 'ss shows listening sockets and processes.',
    },
  ],
};
