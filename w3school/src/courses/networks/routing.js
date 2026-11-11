// Networks chapter: Routing.

export default {
  id: 'routing',
  title: 'Routing',
  description: 'Routers, gateways, switches and the default route',
  icon: 'route',
  lessons: [
    {
      id: 'net-router-switch',
      title: 'Routers and switches',
      blocks: [
        { type: 'text', value: 'A switch forwards frames inside a local network using MAC addresses. A router forwards packets between networks using IP addresses and a routing table.' },
        { type: 'list', items: [
          'Switch - layer 2, local, MAC table',
          'Router - layer 3, between networks, routing table',
          'Default gateway - where unknown destinations go',
          'Access point - bridges Wi-Fi to the wired LAN',
        ] },
        { type: 'note', value: 'Your home "router" is usually a router, switch, access point and NAT device in one box.' },
      ],
    },
    {
      id: 'net-routing-table',
      title: 'The routing table',
      blocks: [
        { type: 'text', value: 'A host sends a packet to the most specific matching route. If no route matches, it uses the default gateway. The longest prefix wins.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ip route
# default via 192.168.1.1 dev wlan0
# 192.168.1.0/24 dev wlan0
# 10.8.0.0/24 dev tun0` },
        { type: 'note', value: 'A VPN adds a route through a tunnel interface. That is how it captures traffic for specific networks.' },
      ],
    },
    {
      id: 'net-traceroute',
      title: 'Traceroute',
      blocks: [
        { type: 'text', value: 'Traceroute reveals the routers along a path by increasing the TTL. Each hop that expires sends an ICMP Time Exceeded message.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `traceroute example.com
# or on Windows
tracert example.com` },
        { type: 'note', value: 'A hop that does not respond may simply block ICMP. Stars do not always mean the path is broken.' },
      ],
    },
    {
      id: 'net-bgp',
      title: 'BGP in one minute',
      blocks: [
        { type: 'text', value: 'BGP is the routing protocol between autonomous systems on the internet. It exchanges reachable prefixes and chooses paths by policy, not just by shortest distance.' },
        { type: 'note', value: 'A BGP misconfiguration can take down large parts of the internet. Route filters and prefix limits exist for a reason.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'routing',
      q: 'Which device forwards between networks?',
      options: ['Switch', 'Router', 'Hub', 'Access point'],
      answer: 1,
      explain: 'Routers forward packets by IP between networks.',
    },
    {
      chapterId: 'routing',
      q: 'Where do packets go when no route matches?',
      options: ['To the switch', 'To the default gateway', 'To DNS', 'They are dropped silently'],
      answer: 1,
      explain: 'The default route sends them to the gateway.',
    },
    {
      chapterId: 'routing',
      q: 'What does the longest prefix rule mean?',
      options: ['The shortest route wins', 'The most specific matching route wins', 'The oldest route wins', 'The default route always wins'],
      answer: 1,
      explain: 'A /32 beats a /24, which beats the default route.',
    },
    {
      chapterId: 'routing',
      q: 'What does BGP do?',
      options: ['Assigns local IPs', 'Exchanges routes between autonomous systems', 'Encrypts traffic', 'Resolves names'],
      answer: 1,
      explain: 'BGP is the inter-domain routing protocol of the internet.',
    },
  ],
};
