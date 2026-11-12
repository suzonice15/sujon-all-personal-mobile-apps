// Kubernetes chapter: Scaling.

export default {
  id: 'scaling',
  title: 'Scaling & Probes',
  description: 'Replicas, HPA, resources and health',
  icon: 'trending-up',
  lessons: [
    {
      id: 'k8s-probes',
      title: 'Probes',
      blocks: [
        { type: 'text', value: 'A readiness probe gates traffic. A liveness probe restarts a stuck container. A startup probe gives a slow app time to boot without failing liveness.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10

livenessProbe:
  httpGet:
    path: /live
    port: 3000
  periodSeconds: 20` },
        { type: 'note', value: 'A liveness probe that checks the database can restart every pod during a database outage. Check only what the process controls.' },
      ],
    },
    {
      id: 'k8s-resources',
      title: 'Requests and limits',
      blocks: [
        { type: 'text', value: 'Requests reserve capacity for scheduling. Limits cap usage at runtime. Set both; without requests the scheduler guesses, and without limits one pod can starve others.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi` },
        { type: 'note', value: 'A memory limit that is too low causes OOMKilled. Watch actual usage before tightening it.' },
      ],
    },
    {
      id: 'k8s-hpa',
      title: 'Horizontal Pod Autoscaler',
      blocks: [
        { type: 'text', value: 'HPA adds or removes replicas based on CPU, memory or a custom metric. It needs resource requests and a metrics server.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl autoscale deploy/api \\
  --min=2 --max=10 --cpu-percent=70

kubectl get hpa
kubectl describe hpa api` },
        { type: 'note', value: 'Autoscaling does not fix a slow database. Scale the layer that is actually the bottleneck.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'scaling',
      q: 'What does a readiness probe do?',
      options: ['Restarts the pod', 'Gates traffic until the pod is ready', 'Scales the cluster', 'Builds the image'],
      answer: 1,
      explain: 'Only ready pods receive traffic.',
    },
    {
      chapterId: 'scaling',
      q: 'What do resource requests do?',
      options: ['Cap usage', 'Reserve capacity for scheduling', 'Encrypt traffic', 'Create a volume'],
      answer: 1,
      explain: 'The scheduler uses requests to place pods.',
    },
    {
      chapterId: 'scaling',
      q: 'What does HPA scale on?',
      options: ['CPU, memory or a custom metric', 'Disk color', 'DNS TTL', 'Git branch'],
      answer: 0,
      explain: 'It adjusts replicas from metrics.',
    },
  ],
};
