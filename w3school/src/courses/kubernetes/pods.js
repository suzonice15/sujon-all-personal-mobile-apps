// Kubernetes chapter: Pods.

export default {
  id: 'pods',
  title: 'Pods',
  description: 'The smallest deployable unit',
  icon: 'widgets',
  lessons: [
    {
      id: 'k8s-pod',
      title: 'What is a pod?',
      blocks: [
        { type: 'text', value: 'A pod is one or more containers that share a network and storage. It is the smallest unit Kubernetes schedules. Most apps run one container per pod.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: v1
kind: Pod
metadata:
  name: api
  labels:
    app: api
spec:
  containers:
    - name: api
      image: ghcr.io/owner/api:1.0
      ports:
        - containerPort: 3000` },
        { type: 'note', value: 'Do not create bare pods for real services. A Deployment manages pods and replaces them when they fail.' },
      ],
    },
    {
      id: 'k8s-pod-lifecycle',
      title: 'Pod lifecycle',
      blocks: [
        { type: 'text', value: 'A pod moves through Pending, Running, Succeeded and Failed. Container states are Waiting, Running and Terminated. describe shows events and the reason for a failure.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl get pods -o wide
kubectl describe pod api
kubectl logs api
kubectl logs api -c sidecar
kubectl delete pod api` },
        { type: 'note', value: 'A CrashLoopBackOff usually means the container starts and exits repeatedly. Read the logs before changing the manifest.' },
      ],
    },
    {
      id: 'k8s-labels',
      title: 'Labels and selectors',
      blocks: [
        { type: 'text', value: 'Labels are key-value metadata. Selectors find resources by label. Services, Deployments and network policies all use selectors.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl get pods -l app=api
kubectl get pods -l 'tier in (frontend,backend)'
kubectl label pod api env=prod` },
        { type: 'note', value: 'A selector typo makes a Service point at no pods. If a service has no endpoints, check the labels first.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pods',
      q: 'What is a pod?',
      options: ['A node', 'One or more containers sharing network and storage', 'A cluster', 'A registry'],
      answer: 1,
      explain: 'It is the smallest deployable unit.',
    },
    {
      chapterId: 'pods',
      q: 'What does CrashLoopBackOff mean?',
      options: ['The node is full', 'The container keeps crashing and restarting', 'The image is private', 'The service is down'],
      answer: 1,
      explain: 'Read the logs to find the crash reason.',
    },
    {
      chapterId: 'pods',
      q: 'What do labels do?',
      options: ['Store secrets', 'Identify and select resources', 'Set CPU limits', 'Open ports'],
      answer: 1,
      explain: 'Selectors match resources by label.',
    },
  ],
};
