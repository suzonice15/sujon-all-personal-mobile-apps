// Cloud chapter: Networking.

export default {
  id: 'networking',
  title: 'Networking',
  description: 'VPC, subnets, security groups and DNS',
  icon: 'lan',
  lessons: [
    {
      id: 'cloud-vpc',
      title: 'VPC and subnets',
      blocks: [
        { type: 'text', value: 'A virtual private cloud is your isolated network. Subnets split it by region and availability zone. Public subnets can reach the internet; private subnets cannot.' },
        { type: 'code', lang: 'text', tryIt: false, value: `VPC 10.0.0.0/16
  public 10.0.1.0/24  -> load balancer, NAT
  private 10.0.2.0/24 -> app servers
  private 10.0.3.0/24 -> databases

Flow: internet -> load balancer (public)
      -> app (private) -> database (private)` },
        { type: 'note', value: 'Put databases in private subnets. A public database is reachable by the whole internet unless a firewall stops it.' },
      ],
    },
    {
      id: 'cloud-security-groups',
      title: 'Security groups',
      blocks: [
        { type: 'text', value: 'A security group is a stateful firewall attached to a resource. Allow only the ports and sources that are needed, and reference other security groups instead of IP ranges.' },
        { type: 'code', lang: 'text', tryIt: false, value: `app-sg:
  inbound 443 from lb-sg
  outbound 5432 to db-sg

db-sg:
  inbound 5432 from app-sg
  no inbound from the internet` },
        { type: 'note', value: 'Referencing a security group is safer than a CIDR block. It follows the resource when its IP changes.' },
      ],
    },
    {
      id: 'cloud-dns-lb',
      title: 'DNS and load balancers',
      blocks: [
        { type: 'text', value: 'A load balancer spreads traffic across healthy targets. DNS maps a name to the balancer. Health checks remove unhealthy targets automatically.' },
        { type: 'list', items: [
          'AWS ALB / NLB, Route 53',
          'GCP Cloud Load Balancing, Cloud DNS',
          'Azure Load Balancer / Application Gateway, Azure DNS',
          'Use HTTPS on the balancer and forward to the app',
        ] },
        { type: 'note', value: 'A DNS TTL that is too long slows a failover. A TTL that is too short increases query load. Pick deliberately.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'networking',
      q: 'Where should a database live?',
      options: ['A public subnet', 'A private subnet', 'On the internet', 'In DNS'],
      answer: 1,
      explain: 'Private subnets are not directly reachable.',
    },
    {
      chapterId: 'networking',
      q: 'What is a security group?',
      options: ['A DNS record', 'A stateful firewall for a resource', 'A storage bucket', 'A database'],
      answer: 1,
      explain: 'It controls allowed traffic.',
    },
    {
      chapterId: 'networking',
      q: 'Why reference a security group as a source?',
      options: ['It is shorter', 'It follows the resource when its IP changes', 'It is cheaper', 'It enables DNS'],
      answer: 1,
      explain: 'It avoids hardcoded IP ranges.',
    },
  ],
};
