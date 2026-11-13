// Docker chapter: Kubernetes Intro.

export default {
  id: 'kubernetes-intro',
  title: 'Kubernetes Intro',
  description: 'Pods, deployments and services in one lesson set',
  icon: 'grid-on',
  lessons: [
    {
      id: 'devops-k8s-what',
      title: 'Why Kubernetes?',
      blocks: [
        { type: 'text', value: 'Kubernetes schedules containers across machines, restarts failed ones, scales replicas and exposes services. It is an orchestrator, not a replacement for Docker.' },
        { type: 'list', items: [
          'Pod - one or more containers that share a network',
          'Deployment - desired replicas and rollout strategy',
          'Service - a stable network endpoint for pods',
          'ConfigMap / Secret - configuration and secrets',
          'Ingress - HTTP routing into the cluster',
        ] },
        { type: 'note', value: 'Do not start with Kubernetes for a small app. Docker Compose on a VPS is simpler and cheaper until you actually need orchestration.' },
      ],
    },
    {
      id: 'devops-k8s-deployment',
      title: 'A deployment',
      blocks: [
        { type: 'text', value: 'A Deployment declares the desired state. Kubernetes creates pods to match it and replaces them if they fail.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: ghcr.io/owner/api:1.0
          ports:
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /health
              port: 3000` },
        { type: 'note', value: 'A readiness probe keeps traffic away until the pod is ready. A liveness probe restarts a stuck process.' },
      ],
    },
    {
      id: 'devops-k8s-service',
      title: 'A service',
      blocks: [
        { type: 'text', value: 'A Service gives pods a stable DNS name and IP. ClusterIP is internal; LoadBalancer exposes it outside.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP` },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl apply -f deployment.yaml
kubectl get pods
kubectl get services
kubectl logs deploy/api
kubectl rollout status deploy/api` },
      ],
    },
    {
      id: 'devops-k8s-when',
      title: 'When to use it',
      blocks: [
        { type: 'list', items: [
          'Many services that need scheduling and scaling',
          'A team that already runs a cluster',
          'A need for rolling updates and self-healing',
          'Not: a single small app with one server',
        ] },
        { type: 'text', value: 'Kubernetes has a real operational cost. Managed offerings reduce it, but you still need to understand networking, storage and observability.' },
        { type: 'note', value: 'Learn Docker and Compose first. Kubernetes makes much more sense once you understand images, containers, health checks and networking.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'kubernetes-intro',
      q: 'What is a pod?',
      options: ['A machine', 'One or more containers sharing a network', 'A registry', 'A volume'],
      answer: 1,
      explain: 'The pod is the smallest deployable unit.',
    },
    {
      chapterId: 'kubernetes-intro',
      q: 'What does a Deployment manage?',
      options: ['Replicas and rollouts', 'DNS records', 'Dockerfiles', 'Volumes only'],
      answer: 0,
      explain: 'It reconciles the desired replica count and rollout strategy.',
    },
    {
      chapterId: 'kubernetes-intro',
      q: 'What does a readiness probe do?',
      options: ['Restarts the pod', 'Keeps traffic away until the pod is ready', 'Builds the image', 'Scales the cluster'],
      answer: 1,
      explain: 'The Service only sends traffic to ready pods.',
    },
    {
      chapterId: 'kubernetes-intro',
      q: 'When is Kubernetes overkill?',
      options: ['For a large microservice platform', 'For a single small app on one server', 'For a team with a cluster', 'For rolling updates'],
      answer: 1,
      explain: 'Compose on a VPS is simpler until orchestration is actually needed.',
    },
  ],
};
