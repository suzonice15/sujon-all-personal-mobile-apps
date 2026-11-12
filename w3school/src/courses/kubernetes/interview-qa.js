// Kubernetes interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Kubernetes?',
      a: 'A container orchestrator that schedules pods across nodes, restarts failures, scales replicas and provides service discovery and rolling updates.',
      level: 'basic',
    },
    {
      q: 'What is the control plane?',
      a: 'The API server, etcd, scheduler and controller manager. It stores the desired state and reconciles the cluster toward it.',
      level: 'intermediate',
    },
    {
      q: 'Why not use Kubernetes for every app?',
      a: 'It has a high operational cost. A small app on Compose or a managed platform is simpler until you need orchestration.',
      level: 'basic',
    },
  ],
  pods: [
    {
      q: 'What is a pod?',
      a: 'One or more containers sharing a network namespace and volumes. It is the smallest unit Kubernetes schedules.',
      level: 'basic',
    },
    {
      q: 'Why not create bare pods?',
      a: 'A bare pod is not replaced when it dies. A Deployment manages a ReplicaSet and keeps the desired count.',
      level: 'intermediate',
    },
    {
      q: 'What does CrashLoopBackOff mean?',
      a: 'The container starts, exits and restarts repeatedly. Read kubectl logs and --previous to find the cause.',
      level: 'intermediate',
    },
  ],
  deployments: [
    {
      q: 'What does a Deployment do?',
      a: 'It declares replicas and a pod template, creates a ReplicaSet and performs rolling updates and rollbacks.',
      level: 'basic',
    },
    {
      q: 'How does a rolling update work?',
      a: 'New pods start, pass readiness, then old pods are removed gradually. maxSurge and maxUnavailable control the pace.',
      level: 'intermediate',
    },
    {
      q: 'How do you roll back?',
      a: 'kubectl rollout undo deploy/name returns to the previous revision. Revision history is configurable.',
      level: 'basic',
    },
  ],
  services: [
    {
      q: 'What is a Service?',
      a: 'A stable DNS name and virtual IP that load-balances traffic across ready pods selected by labels.',
      level: 'basic',
    },
    {
      q: 'ClusterIP versus NodePort versus LoadBalancer?',
      a: 'ClusterIP is internal. NodePort opens a port on every node. LoadBalancer asks the cloud for an external balancer.',
      level: 'intermediate',
    },
    {
      q: 'Why are Service endpoints empty?',
      a: 'No ready pods match the selector, or the pods are not ready. Check labels and readiness probes.',
      level: 'intermediate',
    },
  ],
  ingress: [
    {
      q: 'What is Ingress?',
      a: 'An HTTP routing resource that maps hosts and paths to Services. It requires an ingress controller to work.',
      level: 'basic',
    },
    {
      q: 'Where does the TLS certificate live?',
      a: 'In a Secret referenced by the Ingress. The controller terminates TLS with it.',
      level: 'intermediate',
    },
    {
      q: 'Why is Ingress better than a LoadBalancer per service?',
      a: 'One ingress and one external IP can route many services, reducing cost and configuration.',
      level: 'advanced',
    },
  ],
  'config-secrets': [
    {
      q: 'ConfigMap versus Secret?',
      a: 'Both inject configuration. A Secret is intended for sensitive data and should be protected with RBAC and encryption at rest.',
      level: 'basic',
    },
    {
      q: 'Is a Secret encrypted?',
      a: 'Not by default; it is base64-encoded. Encryption at rest must be enabled, and access restricted with RBAC.',
      level: 'intermediate',
    },
    {
      q: 'Why do pods not see a ConfigMap change?',
      a: 'Environment variables are read at startup. Mounted files update eventually, but the app must reload them. Roll the Deployment to be sure.',
      level: 'advanced',
    },
  ],
  storage: [
    {
      q: 'What is a PV and a PVC?',
      a: 'A PersistentVolume is storage. A PersistentVolumeClaim is a request for storage that a pod mounts.',
      level: 'basic',
    },
    {
      q: 'What is a StorageClass?',
      a: 'It defines how storage is provisioned dynamically, including the disk type and reclaim policy.',
      level: 'intermediate',
    },
    {
      q: 'When use a StatefulSet?',
      a: 'When pods need stable identity and per-pod storage, such as a database or a queue.',
      level: 'intermediate',
    },
  ],
  scaling: [
    {
      q: 'Readiness versus liveness probe?',
      a: 'Readiness controls traffic. Liveness restarts a stuck container. A startup probe gives a slow app time to boot.',
      level: 'basic',
    },
    {
      q: 'Requests versus limits?',
      a: 'Requests reserve capacity for scheduling. Limits cap runtime usage. Memory over the limit causes OOMKilled.',
      level: 'intermediate',
    },
    {
      q: 'What does HPA need?',
      a: 'Resource requests and a metrics server. It adjusts replicas based on CPU, memory or a custom metric.',
      level: 'intermediate',
    },
  ],
  observability: [
    {
      q: 'How do you read logs from a crashed container?',
      a: 'kubectl logs pod --previous shows the previous instance. For production, ship logs to a central system.',
      level: 'basic',
    },
    {
      q: 'What do Kubernetes events show?',
      a: 'Scheduling, image pull and probe failures, with timestamps. They expire, so central logging matters.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug a service returning 503?',
      a: 'Check the ingress, service endpoints, pod readiness and app logs. Work from the outside in.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'What manifests does a small web app need?',
      a: 'A Deployment, a Service, an Ingress, a ConfigMap, a Secret and, for the database, a StatefulSet with a PVC.',
      level: 'intermediate',
    },
    {
      q: 'Why pin an image digest?',
      a: 'A tag can be repointed. A digest guarantees the exact image that was tested.',
      level: 'advanced',
    },
    {
      q: 'What belongs in a production review?',
      a: 'Pinned images, probes, resources, non-root, RBAC, secrets from a manager, network policy, logs, metrics and tested backups.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first step for a Kubernetes beginner?',
      a: 'Deploy a small app locally with kind or minikube, then add probes, config and ingress one piece at a time.',
      level: 'basic',
    },
  ],
};
