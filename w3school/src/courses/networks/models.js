// Networks chapter: Models.

export default {
  id: 'models',
  title: 'Network Models',
  description: 'OSI layers, TCP/IP and encapsulation',
  icon: 'layers',
  lessons: [
    {
      id: 'net-osi',
      title: 'The OSI model',
      blocks: [
        { type: 'text', value: 'OSI is a seven-layer reference model. It is useful vocabulary, not a strict implementation. Each layer has a job and talks to the layer above and below.' },
        { type: 'list', items: [
          '7 Application - HTTP, DNS, SMTP',
          '6 Presentation - encoding, encryption, compression',
          '5 Session - connection state',
          '4 Transport - TCP, UDP, ports',
          '3 Network - IP addresses, routing',
          '2 Data link - MAC addresses, switches',
          '1 Physical - cables, radio, signals',
        ] },
        { type: 'note', value: 'In practice the TCP/IP model has four layers: application, transport, internet and link. The OSI model is still used in interviews and documentation.' },
      ],
    },
    {
      id: 'net-tcpip',
      title: 'The TCP/IP model',
      blocks: [
        { type: 'code', lang: 'text', tryIt: false, value: `Application  HTTP, DNS, TLS
Transport    TCP, UDP
Internet     IP, ICMP
Link         Ethernet, Wi-Fi` },
        { type: 'text', value: 'The application layer includes everything the app talks. The transport layer chooses TCP or UDP and adds ports. The internet layer routes packets by IP. The link layer moves frames on the local medium.' },
        { type: 'note', value: 'When troubleshooting, ask which layer is broken: name resolution (app), connection (transport), routing (internet) or Wi-Fi (link).' },
      ],
    },
    {
      id: 'net-encapsulation',
      title: 'Encapsulation',
      blocks: [
        { type: 'text', value: 'Each layer adds its own header. The application data is wrapped in a TCP segment, then an IP packet, then a link frame. The receiver unwraps them in reverse.' },
        { type: 'code', lang: 'text', tryIt: false, value: `HTTP data
  + TCP header (ports, sequence)
    + IP header (source, destination)
      + Ethernet header (MAC addresses)
        -> bits on the wire` },
        { type: 'note', value: 'A packet capture shows the outer headers first. Wireshark lets you expand each layer to see the inner one.' },
      ],
    },
    {
      id: 'net-ports',
      title: 'Ports',
      blocks: [
        { type: 'text', value: 'A port identifies a service on a host. The IP address finds the machine; the port finds the process. Common ports are 80 HTTP, 443 HTTPS, 22 SSH, 53 DNS and 5432 PostgreSQL.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ss -tulpn
# LISTEN 0 128 0.0.0.0:443 0.0.0.0:* users:(("nginx",pid=1234))
# LISTEN 0 128 0.0.0.0:22  0.0.0.0:* users:(("sshd",pid=900))` },
        { type: 'note', value: 'A service bound to 127.0.0.1 is not reachable from the network. A service on 0.0.0.0 listens on every interface.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'models',
      q: 'Which layer handles IP addresses?',
      options: ['Application', 'Transport', 'Network / Internet', 'Link'],
      answer: 2,
      explain: 'The network layer routes by IP address.',
    },
    {
      chapterId: 'models',
      q: 'Which layer uses ports?',
      options: ['Transport', 'Link', 'Physical', 'Session'],
      answer: 0,
      explain: 'TCP and UDP headers contain source and destination ports.',
    },
    {
      chapterId: 'models',
      q: 'What is encapsulation?',
      options: ['Encrypting data', 'Adding a header at each layer', 'Compressing packets', 'Resolving DNS'],
      answer: 1,
      explain: 'Each layer wraps the data with its own header.',
    },
    {
      chapterId: 'models',
      q: 'Which port is HTTPS by default?',
      options: ['80', '443', '22', '53'],
      answer: 1,
      explain: 'HTTPS uses 443; HTTP uses 80.',
    },
  ],
};
