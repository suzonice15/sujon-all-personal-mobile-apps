// Networks chapter: IP Addressing.

export default {
  id: 'ip-addressing',
  title: 'IP Addressing',
  description: 'IPv4, subnets, NAT and IPv6',
  icon: 'tag',
  lessons: [
    {
      id: 'net-ipv4',
      title: 'IPv4 addresses',
      blocks: [
        { type: 'text', value: 'An IPv4 address is 32 bits, written as four octets such as 192.168.1.10. The subnet mask decides which part is the network and which part is the host.' },
        { type: 'code', lang: 'text', tryIt: false, value: `192.168.1.10/24
network: 192.168.1.0
mask:    255.255.255.0
hosts:   192.168.1.1 - 192.168.1.254
broadcast: 192.168.1.255` },
        { type: 'note', value: '/24 means the first 24 bits are the network. The remaining 8 bits allow 254 usable host addresses on a typical LAN.' },
      ],
    },
    {
      id: 'net-private-nat',
      title: 'Private addresses and NAT',
      blocks: [
        { type: 'text', value: 'Private ranges are not routable on the public internet. A router translates them to its public IP with NAT, so many devices share one public address.' },
        { type: 'list', items: [
          '10.0.0.0/8',
          '172.16.0.0/12',
          '192.168.0.0/16',
          '127.0.0.0/8 - loopback',
          '169.254.0.0/16 - link-local',
        ] },
        { type: 'note', value: 'NAT breaks inbound connections unless a port is forwarded. That is why a home server needs a tunnel or a public VPS.' },
      ],
    },
    {
      id: 'net-ipv6',
      title: 'IPv6',
      blocks: [
        { type: 'text', value: 'IPv6 uses 128 bits, written as eight groups of hex such as 2001:0db8::1. It removes the address shortage and simplifies some routing.' },
        { type: 'code', lang: 'text', tryIt: false, value: `2001:0db8:85a3:0000:0000:8a2e:0370:7334
can be shortened to
2001:db8:85a3::8a2e:370:7334` },
        { type: 'note', value: 'Dual-stack hosts support IPv4 and IPv6 at the same time. Most modern phones and networks already do.' },
      ],
    },
    {
      id: 'net-cidr',
      title: 'CIDR',
      blocks: [
        { type: 'text', value: 'CIDR writes a network as address/prefix-length. A smaller prefix means a larger network. /24 has 256 addresses; /25 has 128; /16 has 65,536.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ip addr
ip route
# default via 192.168.1.1 dev wlan0` },
        { type: 'note', value: 'Cloud security groups and firewalls are usually written in CIDR. A rule for 0.0.0.0/0 means every IPv4 address on the internet.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'ip-addressing',
      q: 'How many bits are in an IPv4 address?',
      options: ['16', '32', '64', '128'],
      answer: 1,
      explain: 'IPv4 is 32 bits; IPv6 is 128 bits.',
    },
    {
      chapterId: 'ip-addressing',
      q: 'Which is a private IPv4 range?',
      options: ['8.8.8.0/24', '192.168.0.0/16', '1.1.1.0/24', '2001:db8::/32'],
      answer: 1,
      explain: '192.168/16 is reserved for private networks.',
    },
    {
      chapterId: 'ip-addressing',
      q: 'What does NAT do?',
      options: ['Encrypts traffic', 'Translates private addresses to a public address', 'Resolves names', 'Routes BGP'],
      answer: 1,
      explain: 'NAT lets many private hosts share one public IP.',
    },
    {
      chapterId: 'ip-addressing',
      q: 'What does /24 mean?',
      options: ['24 hosts', '24 network bits', '24 routers', 'Port 24'],
      answer: 1,
      explain: 'The prefix length counts the network bits.',
    },
  ],
};
