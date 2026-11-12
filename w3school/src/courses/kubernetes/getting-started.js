// Kubernetes chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Why Kubernetes exists, the cluster and kubectl',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'k8s-why',
      title: 'Why Kubernetes?',
      blocks: [
        { type: 'text', value: 'Kubernetes schedules containers across machines, restarts failed ones, scales replicas and gives services a stable network identity. It is an orchestrator, not a replacement for Docker.' },
        { type: 'list', items: [
          'Self-healing: restart failed pods',
          'Scaling: add or remove replicas',
          'Rolling updates and rollback',
          'Service discovery and load balancing',
          'Declarative configuration',
        ] },
        { type: 'note', value: 'Do not start with Kubernetes for a small app. Docker Compose on a VPS is simpler until orchestration is actually needed.' },
      ],
    },
    {
      id: 'k8s-cluster',
      title: 'The cluster',
      blocks: [
        { type: 'text', value: 'A cluster has a control plane and worker nodes. The control plane stores the desired state and schedules pods. Nodes run the containers.' },
        { type: 'list', items: [
          'API server - the front door for every command',
          'etcd - the cluster state store',
          'Scheduler - chooses a node for a pod',
          'Controller manager - reconciles desired and actual state',
          'kubelet - runs pods on a node',
          'kube-proxy - handles service networking',
        ] },
        { type: 'note', value: 'Kubernetes is a reconciliation loop. You declare the desired state; controllers keep changing the actual state toward it.' },
      ],
    },
    {
      id: 'k8s-kubectl',
      title: 'kubectl',
      blocks: [
        { type: 'text', value: 'kubectl talks to the API server. Use apply for declarative changes and get/describe/logs for inspection.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl config get-contexts
kubectl get nodes
kubectl get pods
kubectl apply -f deployment.yaml
kubectl describe pod api-7c9f
kubectl logs deploy/api
kubectl exec -it pod/api-7c9f -- sh` },
        { type: 'note', value: 'Use kubectl apply, not create, for files you keep. apply records the last applied configuration and updates in place.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does Kubernetes do?',
      options: ['Builds images', 'Orchestrates containers across machines', 'Stores data only', 'Compiles code'],
      answer: 1,
      explain: 'It schedules and manages containers.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is etcd?',
      options: ['A container runtime', 'The cluster state store', 'A load balancer', 'A CLI'],
      answer: 1,
      explain: 'It stores the desired and current state.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which command applies a manifest?',
      options: ['kubectl apply -f', 'kubectl get', 'kubectl logs', 'kubectl exec'],
      answer: 0,
      explain: 'apply creates or updates resources from a file.',
    },
  ],
};
