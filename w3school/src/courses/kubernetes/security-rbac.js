// Kubernetes chapter: Security & RBAC.

export default {
  id: 'security-rbac',
  title: 'Security & RBAC',
  description: 'Roles, policies, secrets and admission',
  icon: 'security',
  lessons: [
    {
      id: 'k8s-rbac',
      title: 'RBAC',
      blocks: [
        { type: 'text', value: 'RBAC decides who can do what. A Role grants verbs on resources inside a namespace. A RoleBinding attaches it to a user or service account. ClusterRole and ClusterRoleBinding apply cluster-wide.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: api\n  name: pod-reader\nrules:\n  - apiGroups: [""]\n    resources: ["pods", "pods/log"]\n    verbs: ["get", "list", "watch"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  namespace: api\n  name: read-pods\nsubjects:\n  - kind: ServiceAccount\n    name: api\n    namespace: api\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io` },
        { type: 'note', value: 'Never bind a workload to cluster-admin. Give it the verbs it actually uses.' },
      ],
    },
    {
      id: 'k8s-policies',
      title: 'Pod security and network policy',
      blocks: [
        { type: 'text', value: 'A NetworkPolicy limits which pods can talk to each other. A restricted Pod Security standard blocks root, privileged mode and host access.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-allow-web\n  namespace: api\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes: ["Ingress"]\n  ingress:\n    - from:\n        - podSelector:\n            matchLabels:\n              app: web\n      ports:\n        - port: 3000\n          protocol: TCP` },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl label namespace api \\\n  pod-security.kubernetes.io/enforce=restricted\n\nkubectl auth can-i delete pods --as system:serviceaccount:api:api` },
        { type: 'note', value: 'A NetworkPolicy only works if the CNI plugin supports it. Check before assuming traffic is blocked.' },
      ],
    },
    {
      id: 'k8s-secrets-supply-chain',
      title: 'Secrets and supply chain',
      blocks: [
        { type: 'text', value: 'Kubernetes Secrets are base64, not encryption. Enable encryption at rest, restrict get on secrets, and prefer an external secret store. Deploy signed images and verify them at admission.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: v1\nkind: Pod\nmetadata:\n  name: api\nspec:\n  serviceAccountName: api\n  automountServiceAccountToken: false\n  containers:\n    - name: api\n      image: ghcr.io/acme/api@sha256:9f2c...\n      securityContext:\n        runAsNonRoot: true\n        allowPrivilegeEscalation: false\n        readOnlyRootFilesystem: true\n        capabilities:\n          drop: ["ALL"]` },
        { type: 'list', items: [
          'Enable secret encryption at rest',
          'Use an external secret manager',
          'Disable the default service account token',
          'Run non-root with a read-only filesystem',
          'Verify image signatures before deploy',
        ] },
        { type: 'note', value: 'Anyone who can create a pod in a namespace can often read its secrets. Namespace access is security access.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security-rbac',
      q: 'What does a Role grant?',
      options: ['Cluster-wide access', 'Verbs on resources in a namespace', 'Storage', 'DNS'],
      answer: 1,
      explain: 'A Role is namespaced.',
    },
    {
      chapterId: 'security-rbac',
      q: 'What does a NetworkPolicy control?',
      options: ['CPU limits', 'Pod-to-pod traffic', 'Image tags', 'Ingress DNS'],
      answer: 1,
      explain: 'It filters network traffic.',
    },
    {
      chapterId: 'security-rbac',
      q: 'Are Kubernetes Secrets encrypted by default?',
      options: ['Yes', 'No, they are base64 unless encryption at rest is enabled', 'Only in the cloud', 'Only with RBAC'],
      answer: 1,
      explain: 'Base64 is encoding, not encryption.',
    },
    {
      chapterId: 'security-rbac',
      q: 'Why disable automountServiceAccountToken?',
      options: ['To save memory', 'So the pod cannot call the API by default', 'To speed up start', 'To enable RBAC'],
      answer: 1,
      explain: 'It removes a default credential.',
    },
  ],
};
