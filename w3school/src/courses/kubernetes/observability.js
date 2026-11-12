// Kubernetes chapter: Observability.

export default {
  id: 'observability',
  title: 'Observability',
  description: 'Logs, metrics, events and debugging',
  icon: 'monitor',
  lessons: [
    {
      id: 'k8s-logs',
      title: 'Logs',
      blocks: [
        { type: 'text', value: 'kubectl logs shows a container stdout/stderr. For a crashed container, use --previous. In production, ship logs to a central system instead of reading pods one by one.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl logs deploy/api
kubectl logs deploy/api --tail=100
kubectl logs pod/api-7c9f --previous
kubectl logs -l app=api --all-containers` },
        { type: 'note', value: 'A pod that is replaced loses its logs. Central logging is mandatory for anything you need to debug after the fact.' },
      ],
    },
    {
      id: 'k8s-metrics-events',
      title: 'Metrics and events',
      blocks: [
        { type: 'text', value: 'Events explain scheduling and image problems. Metrics show CPU, memory and request behaviour. Traces connect one request across services.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl get events --sort-by=.lastTimestamp
kubectl top pods
kubectl top nodes
kubectl describe deploy/api` },
        { type: 'note', value: 'Events expire. If an incident happened yesterday, central logs and metrics are the only record.' },
      ],
    },
    {
      id: 'k8s-debug',
      title: 'A debugging flow',
      blocks: [
        { type: 'list', items: [
          'Is the pod Pending? Check resources and scheduling events',
          'Is it CrashLoopBackOff? Read logs and --previous',
          'Is it Running but not ready? Check the readiness probe',
          'Is the Service empty? Check selectors and endpoints',
          'Is Ingress returning 404? Check host, path and controller',
          'Is it slow? Check CPU, memory and database latency',
        ] },
        { type: 'note', value: 'Work from the outside in: DNS, ingress, service, endpoints, pod, container. Each step either clears a layer or points to the broken one.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'observability',
      q: 'Which command shows logs for a crashed container?',
      options: ['kubectl logs --previous', 'kubectl get nodes', 'kubectl apply', 'kubectl scale'],
      answer: 0,
      explain: 'It reads the previous container instance.',
    },
    {
      chapterId: 'observability',
      q: 'What do events explain?',
      options: ['Billing', 'Scheduling and image problems', 'DNS TTL', 'Git history'],
      answer: 1,
      explain: 'Events show why a pod is pending or failing.',
    },
    {
      chapterId: 'observability',
      q: 'What should you check if a Service has no endpoints?',
      options: ['The selector and readiness', 'The logo', 'The DNS TTL', 'The image size'],
      answer: 0,
      explain: 'Labels and readiness determine endpoints.',
    },
  ],
};
