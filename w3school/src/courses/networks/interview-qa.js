// Computer Networks interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What happens when you type a URL and press Enter?',
      a: 'The browser resolves the name with DNS, opens a TCP connection, negotiates TLS, sends an HTTP request, receives the response and renders it. Cached DNS, connection reuse and a CDN can skip steps.',
      level: 'basic',
    },
    {
      q: 'What is the difference between bandwidth and latency?',
      a: 'Bandwidth is the amount of data per second. Latency is the delay for one round trip. High bandwidth with high latency still feels slow for interactive apps.',
      level: 'basic',
    },
    {
      q: 'What is a packet?',
      a: 'A small unit of data with headers for addressing and ordering. Packets are routed independently and reassembled by the receiver.',
      level: 'basic',
    },
    {
      q: 'Why does a first request take longer than later ones?',
      a: 'The first request may need DNS, TCP, TLS and a cold server. Later requests reuse connections and caches.',
      level: 'intermediate',
    },
  ],
  models: [
    {
      q: 'What are the layers of the TCP/IP model?',
      a: 'Application, transport, internet and link. The OSI model splits the same ideas into seven layers.',
      level: 'basic',
    },
    {
      q: 'Which layer does a router operate on?',
      a: 'The network layer, using IP addresses and a routing table.',
      level: 'basic',
    },
    {
      q: 'What is encapsulation?',
      a: 'Each layer wraps the data with its own header as it goes down the stack. The receiver unwraps them in reverse.',
      level: 'intermediate',
    },
    {
      q: 'Why do we say HTTP is stateless?',
      a: 'Each request is independent. State is carried by tokens, cookies or server-side sessions, not by the protocol itself.',
      level: 'intermediate',
    },
  ],
  'ip-addressing': [
    {
      q: 'What is a subnet mask?',
      a: 'It decides which bits of an IP address are the network and which are the host. /24 means the first 24 bits are the network.',
      level: 'basic',
    },
    {
      q: 'What is NAT?',
      a: 'Network Address Translation maps private addresses to a public address, letting many devices share one public IP.',
      level: 'basic',
    },
    {
      q: 'What is the difference between IPv4 and IPv6?',
      a: 'IPv4 is 32 bits; IPv6 is 128 bits. IPv6 removes the address shortage and simplifies some routing and header processing.',
      level: 'intermediate',
    },
    {
      q: 'What does 0.0.0.0/0 mean in a firewall rule?',
      a: 'Every IPv4 address on the internet. It is the most permissive source or destination and should be used carefully.',
      level: 'advanced',
    },
  ],
  dns: [
    {
      q: 'How does DNS resolution work?',
      a: 'A resolver checks its cache, then queries the root, the TLD and the authoritative server. The answer is cached for the record TTL.',
      level: 'basic',
    },
    {
      q: 'A versus CNAME?',
      a: 'An A record maps a name to an IPv4 address. A CNAME maps a name to another name, which is then resolved.',
      level: 'basic',
    },
    {
      q: 'Why does a DNS change take time to apply?',
      a: 'Resolvers cache the old answer until the TTL expires. Lower the TTL before a planned migration.',
      level: 'intermediate',
    },
    {
      q: 'What is DNSSEC?',
      a: 'Cryptographic signatures for DNS records so a resolver can verify the answer was not spoofed. It protects integrity, not confidentiality.',
      level: 'advanced',
    },
  ],
  http: [
    {
      q: 'What is the difference between POST and PUT?',
      a: 'POST creates and is not idempotent. PUT replaces a resource at a known URL and is idempotent.',
      level: 'basic',
    },
    {
      q: 'What do the 2xx, 3xx, 4xx and 5xx classes mean?',
      a: '2xx success, 3xx redirect, 4xx client error, 5xx server error.',
      level: 'basic',
    },
    {
      q: 'How does HTTP caching work?',
      a: 'Cache-Control sets freshness. ETag and Last-Modified enable conditional requests, and a matching validator returns 304 without a body.',
      level: 'intermediate',
    },
    {
      q: 'Why are cookies risky?',
      a: 'They are sent automatically and can be stolen or used in cross-site requests. Use HttpOnly, Secure and SameSite, and avoid storing sensitive data in them.',
      level: 'advanced',
    },
  ],
  'tcp-udp': [
    {
      q: 'Why does TCP need a handshake?',
      a: 'To synchronise sequence numbers and confirm both sides can send and receive before data flows.',
      level: 'basic',
    },
    {
      q: 'When is UDP a better choice?',
      a: 'For DNS, live video, games and telemetry where low latency matters more than guaranteed delivery.',
      level: 'intermediate',
    },
    {
      q: 'What is head-of-line blocking?',
      a: 'One lost or delayed segment holds up later data in the same TCP stream. HTTP/3 uses QUIC streams to avoid it.',
      level: 'advanced',
    },
    {
      q: 'What is an ephemeral port?',
      a: 'A short-lived client port chosen by the OS for an outgoing connection. The server side listens on a fixed port.',
      level: 'intermediate',
    },
  ],
  tls: [
    {
      q: 'What does TLS provide?',
      a: 'Confidentiality, integrity and authentication, plus forward secrecy with modern cipher suites.',
      level: 'basic',
    },
    {
      q: 'How does a certificate prove identity?',
      a: 'A trusted CA signs the binding between the domain and a public key. The client verifies the chain and the hostname.',
      level: 'intermediate',
    },
    {
      q: 'What is SNI?',
      a: 'Server Name Indication. The client sends the requested hostname during the handshake so one IP can host many sites.',
      level: 'advanced',
    },
    {
      q: 'Why is disabling certificate verification dangerous?',
      a: 'It accepts any certificate, so a man-in-the-middle on public Wi-Fi can read and modify the traffic.',
      level: 'basic',
    },
  ],
  routing: [
    {
      q: 'What is the default gateway?',
      a: 'The router a host sends packets to when no more specific route matches.',
      level: 'basic',
    },
    {
      q: 'Router versus switch?',
      a: 'A switch forwards frames within a LAN by MAC address. A router forwards packets between networks by IP address.',
      level: 'basic',
    },
    {
      q: 'What does longest prefix match mean?',
      a: 'The most specific route wins. A /32 route beats a /24, which beats the default route.',
      level: 'intermediate',
    },
    {
      q: 'What is BGP?',
      a: 'The routing protocol between autonomous systems that exchanges internet prefixes and applies policy. It is not a local routing protocol.',
      level: 'advanced',
    },
  ],
  tools: [
    {
      q: 'Which command resolves a name?',
      a: 'dig queries DNS directly, for example dig +short example.com. nslookup is a common alternative on Windows.',
      level: 'basic',
    },
    {
      q: 'What does curl -v show?',
      a: 'The request and response headers, the TLS handshake details and connection information. It is the fastest way to debug an HTTP endpoint.',
      level: 'basic',
    },
    {
      q: 'What does tcpdump do?',
      a: 'Captures packets on an interface. Wireshark can decode the capture at every layer.',
      level: 'intermediate',
    },
    {
      q: 'How do you check whether a port is listening?',
      a: 'ss -tulpn (or netstat -tulpn) lists listening sockets and the owning process.',
      level: 'basic',
    },
  ],
  security: [
    {
      q: 'What is a default-deny firewall?',
      a: 'A policy that blocks all traffic unless a rule explicitly allows it. It is the safest baseline.',
      level: 'basic',
    },
    {
      q: 'What is a DDoS attack?',
      a: 'A flood of traffic from many sources that exhausts bandwidth or connections. Rate limits, a CDN and upstream filtering mitigate it.',
      level: 'intermediate',
    },
    {
      q: 'How does a VPN differ from HTTPS?',
      a: 'HTTPS protects one application connection end to end. A VPN encrypts all traffic between the device and the VPN gateway.',
      level: 'intermediate',
    },
    {
      q: 'What is credential stuffing?',
      a: 'Trying leaked username/password pairs on many services. MFA, breach monitoring and rate limits reduce the impact.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you debug a site that will not load?',
      a: 'Check DNS, then reachability, then the port, then TLS and HTTP. Each command clears a layer and narrows the problem.',
      level: 'basic',
    },
    {
      q: 'How do you measure where a request spends its time?',
      a: 'Use curl -w with time_namelookup, time_connect, time_appconnect and time_total. That separates DNS, TCP, TLS and server time.',
      level: 'intermediate',
    },
    {
      q: 'Why isolate a guest Wi-Fi network?',
      a: 'Guests and IoT devices are less trusted. Isolation limits what a compromised device can reach on the internal network.',
      level: 'intermediate',
    },
    {
      q: 'What would you monitor for a public service?',
      a: 'Uptime, latency, error rate, certificate expiry, DNS resolution, port availability, bandwidth and abnormal traffic patterns.',
      level: 'advanced',
    },
  ],
};
