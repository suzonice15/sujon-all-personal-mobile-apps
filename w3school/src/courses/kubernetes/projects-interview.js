// Kubernetes chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Deploy a complete web app with manifests',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'k8s-project-app',
      title: 'Project: deploy a web app',
      blocks: [
        { type: 'text', value: 'Deploy an API and a database. You need a Deployment, a Service, an Ingress, a ConfigMap, a Secret and a PVC. That is the core of a real Kubernetes workload.' },
        { type: 'code', lang: 'text', tryIt: false, value: `k8s/
  deployment.yaml   api replicas, probes, resources
  service.yaml      ClusterIP for api
  ingress.yaml      HTTPS host -> api
  configmap.yaml    non-secret config
  secret.yaml       database URL (external in prod)
  pvc.yaml          database data
  statefulset.yaml  database` },
        { type: 'list', items: [
          'Readiness and liveness probes',
          'Resource requests and limits',
          'Non-root container',
          'Secrets from an external manager',
          'A rollback plan',
        ] },
        { type: 'note', value: 'A managed database is usually better than running one in the cluster. If you do run it, test restore and failover.' },
      ],
    },
    {
      id: 'k8s-project-checks',
      title: 'Production checks',
      blocks: [
        { type: 'list', items: [
          'No latest tag; pin the image digest',
          'Requests and limits set',
          'Probes configured',
          'PodDisruptionBudget for critical services',
          'NetworkPolicy where supported',
          'RBAC least privilege',
          'Logs and metrics shipped',
          'Backups and restore tested',
        ] },
        { type: 'text', value: 'Kubernetes gives you the tools; the configuration decides whether the workload is reliable. Review manifests like application code.' },
      ],
    },
    {
      id: 'k8s-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Pod versus Deployment?',
          'What does a Service do?',
          'ClusterIP, NodePort and LoadBalancer?',
          'Readiness versus liveness probe?',
          'Requests versus limits?',
          'How does a rolling update work?',
          'ConfigMap versus Secret?',
          'When use a StatefulSet?',
          'How do you debug CrashLoopBackOff?',
          'Why is Kubernetes not always the answer?',
        ] },
        { type: 'text', value: 'Strong answers name the resource, the controller and the failure mode. "A Service selects ready pods by label; empty endpoints mean a selector or readiness problem" is a complete answer.' },
        { type: 'note', value: 'Be ready to read a manifest and spot the bug: a selector mismatch, a missing probe, no resource limits, or a secret in the image.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which resource gives pods a stable address?',
      options: ['Deployment', 'Service', 'ConfigMap', 'Secret'],
      answer: 1,
      explain: 'A Service provides a stable name and load balancing.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why pin an image digest?',
      options: ['It is shorter', 'It guarantees the exact image', 'It enables DNS', 'It reduces CPU'],
      answer: 1,
      explain: 'A tag is mutable; a digest is exact.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a production review check?',
      options: ['Only the logo', 'Probes, resources, secrets, RBAC and backups', 'The font', 'The office'],
      answer: 1,
      explain: 'Those are the common failure points.',
    },
  ],
};
