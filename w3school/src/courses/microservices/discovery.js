// Microservices chapter: Discovery & Load Balancing.

export default {
  id: 'discovery',
  title: 'Discovery & Scaling',
  description: 'Service discovery, load balancing and scaling',
  icon: 'lan',
  lessons: [
    {
      id: 'ms-discovery',
      title: 'Service discovery',
      blocks: [
        { type: 'text', value: 'Services move and scale, so their addresses change. Service discovery keeps a registry of healthy instances. A client asks the registry where a service is, or the platform routes by service name.' },
        { type: 'list', items: [
          'Client-side discovery: the client queries the registry',
          'Server-side discovery: a load balancer or mesh does it',
          'DNS-based discovery: a name points at healthy instances',
          'Platform discovery: Kubernetes Services and DNS',
          'Health checks remove unhealthy instances',
        ] },
        { type: 'note', value: 'On Kubernetes, a Service name and DNS replace most manual discovery. Do not hard-code IP addresses.' },
      ],
    },
    {
      id: 'ms-load-balancing',
      title: 'Load balancing',
      blocks: [
        { type: 'text', value: 'A load balancer spreads requests across instances. Common strategies are round robin, least connections and consistent hashing. Health checks decide which instances receive traffic.' },
        { type: 'list', items: [
          'Round robin: simple and even',
          'Least connections: better for uneven request cost',
          'Consistent hashing: keeps a key on the same instance',
          'Sticky sessions: the same client on the same instance',
          'Health checks remove failing instances',
        ] },
        { type: 'note', value: 'Sticky sessions make scaling and failover harder. Prefer stateless services and shared session storage such as Redis.' },
      ],
    },
    {
      id: 'ms-scaling',
      title: 'Scaling services',
      blocks: [
        { type: 'text', value: 'Horizontal scaling adds instances; vertical scaling adds CPU and memory to one. Horizontal is the usual choice for microservices because it also improves availability. Scale on CPU, memory or a custom metric such as queue depth.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Kubernetes horizontal pod autoscaler
kubectl autoscale deployment courses \\
  --min=2 --max=10 --cpu-percent=70

kubectl get hpa` },
        { type: 'note', value: 'Autoscaling does not fix a slow database. Scale the layer that is actually the bottleneck.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'discovery',
      q: 'Why do services need discovery?',
      options: ['To encrypt traffic', 'Because addresses change as services scale and move', 'To cache data', 'To store logs'],
      answer: 1,
      explain: 'Instances come and go, so addresses change.',
    },
    {
      chapterId: 'discovery',
      q: 'What does a health check do in a load balancer?',
      options: ['Encrypts requests', 'Removes unhealthy instances from rotation', 'Caches responses', 'Creates users'],
      answer: 1,
      explain: 'Only healthy instances receive traffic.',
    },
    {
      chapterId: 'discovery',
      q: 'Why prefer stateless services?',
      options: ['They are cheaper', 'They scale and fail over without shared session state', 'They need no database', 'They are faster to write'],
      answer: 1,
      explain: 'Stateless instances are interchangeable.',
    },
    {
      chapterId: 'discovery',
      q: 'What does horizontal scaling add?',
      options: ['CPU to one machine', 'More instances', 'More disk', 'A bigger database'],
      answer: 1,
      explain: 'Horizontal scaling adds instances.',
    },
  ],
};
