// Networks chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Clients, servers, packets and the shape of the internet',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'net-what-is',
      title: 'What is a network?',
      blocks: [
        { type: 'text', value: 'A network connects devices so they can exchange data. The internet is a network of networks: your phone talks to a router, the router to an ISP, and the ISP to other networks until the packet reaches the server.' },
        { type: 'list', items: [
          'LAN - local network, such as your home Wi-Fi',
          'WAN - wide area network, such as the internet',
          'Client - asks for data',
          'Server - provides data',
          'Protocol - an agreed format for communication',
        ] },
        { type: 'note', value: 'Almost every request is client to server. The client sends a request, the server sends a response, and the connection may close or stay open.' },
      ],
    },
    {
      id: 'net-packets',
      title: 'Packets',
      blocks: [
        { type: 'text', value: 'Data is split into packets. Each packet carries a header with addresses and sequence information. Routers forward packets independently, and the receiver reassembles them.' },
        { type: 'code', lang: 'text', tryIt: false, value: `+----------------+----------------+----------------+
| IP header      | TCP/UDP header | application    |
| src/dst        | ports, seq     | HTTP payload   |
+----------------+----------------+----------------+` },
        { type: 'note', value: 'Packets can arrive out of order or not at all. TCP adds ordering and retransmission; UDP does not.' },
      ],
    },
    {
      id: 'net-latency-bandwidth',
      title: 'Latency and bandwidth',
      blocks: [
        { type: 'text', value: 'Bandwidth is how much data can flow per second. Latency is how long one round trip takes. A fast connection with high latency still feels slow for interactive apps.' },
        { type: 'list', items: [
          'Bandwidth - measured in Mbps or Gbps',
          'Latency - measured in milliseconds (RTT)',
          'Packet loss - packets that never arrive',
          'Jitter - variation in latency',
          'Throughput - actual achieved rate',
        ] },
        { type: 'note', value: 'A request may need several round trips: DNS, TCP handshake, TLS handshake, then the HTTP request. That is why the first load is slower.' },
      ],
    },
    {
      id: 'net-request-path',
      title: 'The path of a request',
      blocks: [
        { type: 'text', value: 'Open codenest.app on a phone and roughly this happens: DNS resolves the name, a TCP connection opens, TLS negotiates, HTTP sends the request, the server responds, and the browser or app renders it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `phone -> Wi-Fi router -> ISP -> DNS
      -> CDN / load balancer -> app server -> database
      <- response <- response <- response` },
        { type: 'note', value: 'Every arrow is a candidate for a problem. Knowing the path is the first step in debugging a slow or failing request.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is a LAN?',
      options: ['A wide area network', 'A local network such as home Wi-Fi', 'A protocol', 'A server'],
      answer: 1,
      explain: 'LAN means local area network.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why is data split into packets?',
      options: ['To make it slower', 'So it can be routed and retransmitted independently', 'To encrypt it', 'To avoid DNS'],
      answer: 1,
      explain: 'Packets let the network route around failures and retransmit losses.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is latency?',
      options: ['Data per second', 'Round-trip time', 'Packet size', 'Number of users'],
      answer: 1,
      explain: 'Latency is a measure of delay, usually in milliseconds.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which step comes before HTTP in a fresh HTTPS request?',
      options: ['DNS, TCP and TLS', 'Only HTTP', 'A database query', 'A file upload'],
      answer: 0,
      explain: 'The name must resolve, the connection must open and TLS must negotiate.',
    },
  ],
};
