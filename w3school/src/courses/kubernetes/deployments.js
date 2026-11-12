// Kubernetes chapter: Deployments.

export default {
  id: 'deployments',
  title: 'Deployments',
  description: 'Replicas, rolling updates and rollback',
  icon: 'layers',
  lessons: [
    {
      id: 'k8s-deployment',
      title: 'A Deployment',
      blocks: [
        { type: 'text', value: 'A Deployment declares the desired replicas and pod template. The controller creates a ReplicaSet and replaces failed pods.' },
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
            - containerPort: 3000` },
        { type: 'note', value: 'The selector must match the pod template labels. A mismatch is rejected by the API server.' },
      ],
    },
    {
      id: 'k8s-rollout',
      title: 'Rolling updates and rollback',
      blocks: [
        { type: 'text', value: 'Changing the image triggers a rolling update. Kubernetes starts new pods, waits for readiness, then removes old ones. rollout undo returns to the previous version.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl set image deploy/api api=ghcr.io/owner/api:1.1
kubectl rollout status deploy/api
kubectl rollout history deploy/api
kubectl rollout undo deploy/api

kubectl scale deploy/api --replicas=5` },
        { type: 'note', value: 'A rolling update depends on a correct readiness probe. Without it, traffic reaches a pod before it can serve.' },
      ],
    },
    {
      id: 'k8s-strategy',
      title: 'Strategy and safety',
      blocks: [
        { type: 'list', items: [
          'RollingUpdate - default, gradual replacement',
          'Recreate - stop all old pods first, brief downtime',
          'maxSurge and maxUnavailable control the pace',
          'Set a revisionHistoryLimit to keep rollback versions',
          'Use a PodDisruptionBudget for voluntary disruptions',
        ] },
        { type: 'code', lang: 'yaml', tryIt: false, value: `strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0` },
        { type: 'note', value: 'maxUnavailable: 0 keeps capacity during a deploy, at the cost of needing room for one extra pod.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployments',
      q: 'What does a Deployment manage?',
      options: ['Replicas and rollouts', 'DNS', 'Storage only', 'A node'],
      answer: 0,
      explain: 'It reconciles the desired replica count and updates.',
    },
    {
      chapterId: 'deployments',
      q: 'How do you roll back a deployment?',
      options: ['kubectl delete node', 'kubectl rollout undo', 'kubectl exec', 'kubectl logs'],
      answer: 1,
      explain: 'It returns to the previous revision.',
    },
    {
      chapterId: 'deployments',
      q: 'What does maxUnavailable: 0 do?',
      options: ['Stops all pods', 'Keeps full capacity during a rollout', 'Deletes the deployment', 'Disables scaling'],
      answer: 1,
      explain: 'No old pod is removed until a new one is ready.',
    },
  ],
};
