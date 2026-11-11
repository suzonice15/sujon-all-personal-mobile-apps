// Networks chapter: Network Tools.

export default {
  id: 'tools',
  title: 'Network Tools',
  description: 'ping, dig, curl, ss and packet capture',
  icon: 'build',
  lessons: [
    {
      id: 'net-ping-curl',
      title: 'ping and curl',
      blocks: [
        { type: 'text', value: 'ping checks reachability and round-trip time with ICMP. curl tests an actual HTTP endpoint, which is what users care about.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ping -c 4 example.com
curl -I https://example.com
curl -v https://example.com
curl -o /dev/null -s -w "%{http_code} %{time_total}\\n" https://example.com` },
        { type: 'note', value: 'A blocked ping does not mean the service is down. Test the port and the HTTP endpoint before concluding anything.' },
      ],
    },
    {
      id: 'net-dig-ss',
      title: 'dig and ss',
      blocks: [
        { type: 'text', value: 'dig answers DNS questions. ss shows sockets, listening ports and the owning process. Together they tell you whether the name resolves and whether the service is listening.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `dig +short example.com
dig example.com MX
ss -tulpn
ss -tan | grep 443` },
        { type: 'note', value: 'If dig works but the port is closed, the problem is the service or firewall, not DNS.' },
      ],
    },
    {
      id: 'net-tcpdump',
      title: 'Packet capture',
      blocks: [
        { type: 'text', value: 'tcpdump captures packets on an interface. Wireshark opens a capture and decodes each layer. Capture the smallest useful window and avoid capturing secrets.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sudo tcpdump -i any -n port 443 -c 20
sudo tcpdump -i any -n host 203.0.113.10

# Save for Wireshark
sudo tcpdump -i any -w capture.pcap` },
        { type: 'note', value: 'HTTPS payloads are encrypted, but the handshake, DNS and timing still reveal a lot. Treat captures as sensitive data.' },
      ],
    },
    {
      id: 'net-debug-flow',
      title: 'A debugging flow',
      blocks: [
        { type: 'list', items: [
          'Can you resolve the name? dig',
          'Can you reach the host? ping',
          'Is the port open? ss or nc',
          'Does HTTP respond? curl -v',
          'Is TLS valid? openssl s_client',
          'Is it slow or failing? time each step',
        ] },
        { type: 'text', value: 'Work from the name outward. Each tool either clears a layer or points to the one that is broken.' },
        { type: 'note', value: 'Write down the result of each step. A clear timeline is more useful than a pile of guesses.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'tools',
      q: 'What does ping measure?',
      options: ['Bandwidth', 'Round-trip time', 'DNS TTL', 'Port state'],
      answer: 1,
      explain: 'It sends ICMP echo requests and measures the reply time.',
    },
    {
      chapterId: 'tools',
      q: 'Which command lists listening ports?',
      options: ['ls', 'ss -tulpn', 'dig', 'curl'],
      answer: 1,
      explain: 'ss shows sockets and the processes that own them.',
    },
    {
      chapterId: 'tools',
      q: 'What does curl -I do?',
      options: ['Downloads a file', 'Fetches headers only', 'Sends a POST', 'Pings a host'],
      answer: 1,
      explain: 'It sends a HEAD request and prints the response headers.',
    },
    {
      chapterId: 'tools',
      q: 'Why is a capture sensitive?',
      options: ['It is large', 'It can contain personal data and metadata', 'It is encrypted', 'It is slow'],
      answer: 1,
      explain: 'Even encrypted traffic reveals hosts, timing and sometimes names.',
    },
  ],
};
