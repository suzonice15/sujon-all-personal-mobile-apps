// Microservices chapter: Deployment.

export default {
  id: 'deployment',
  title: 'Deployment',
  description: 'Containers, orchestration and safe releases',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'ms-containers',
      title: 'Containers',
      blocks: [
        { type: 'text', value: 'Package each service as a container image. The image includes the app and its runtime, so it runs the same everywhere. Keep images small and pin versions for reproducibility.' },
        { type: 'code', lang: 'text', tryIt: false, value: `services:
  courses:
    image: ghcr.io/codenest/courses:1.4.2
    ports: ["8081:8080"]
    env_file: .env
    depends_on: [db]

  db:
    image: postgres:16
    volumes: [pgdata:/var/lib/postgresql/data]` },
        { type: 'note', value: 'Pin the exact version or digest. A floating latest tag means two deploys can run different code.' },
      ],
    },
    {
      id: 'ms-orchestration',
      title: 'Orchestration',
      blocks: [
        { type: 'text', value: 'Kubernetes runs containers, restarts failures, scales replicas and routes traffic. A Deployment manages pods, a Service gives them a stable address and an Ingress exposes HTTP. Health probes decide readiness and restarts.' },
        { type: 'list', items: [
          'Deployment: desired replicas and rollout strategy',
          'Service: stable DNS and load balancing',
          'Ingress: HTTP routing and TLS',
          'Readiness probe: gate traffic until ready',
          'Liveness probe: restart a stuck container',
          'Resource requests and limits',
        ] },
        { type: 'note', value: 'A rolling update depends on a correct readiness probe. Without it, traffic reaches a pod before it can serve.' },
      ],
    },
    {
      id: 'ms-releases',
      title: 'Safe releases',
      blocks: [
        { type: 'text', value: 'Deploy small changes often. Use rolling updates, canaries or blue-green to limit risk. A canary sends a small share of traffic to the new version and watches error rates before widening.' },
        { type: 'list', items: [
          'Rolling update: replace instances gradually',
          'Canary: send 1-5 percent of traffic first',
          'Blue-green: switch traffic to a parallel environment',
          'Feature flags: release code without exposing it',
          'Always have a rollback step',
        ] },
        { type: 'note', value: 'A release is not done when the deploy finishes. It is done when the metrics look normal.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment',
      q: 'Why pin an image version?',
      options: ['It is shorter', 'So two deploys run the same code', 'It saves disk', 'It is required'],
      answer: 1,
      explain: 'A pinned version guarantees the exact code.',
    },
    {
      chapterId: 'deployment',
      q: 'What does a readiness probe do?',
      options: ['Restarts the container', 'Gates traffic until the app can serve', 'Scales replicas', 'Builds the image'],
      answer: 1,
      explain: 'Only ready pods receive traffic.',
    },
    {
      chapterId: 'deployment',
      q: 'What is a canary release?',
      options: ['A full switch', 'Sending a small share of traffic to the new version first', 'A backup', 'A rollback'],
      answer: 1,
      explain: 'A canary limits blast radius.',
    },
    {
      chapterId: 'deployment',
      q: 'Why use feature flags?',
      options: ['To hide code', 'To release code without exposing it to users', 'To speed up builds', 'To cache responses'],
      answer: 1,
      explain: 'Flags separate deploy from release.',
    },
  ],
};
