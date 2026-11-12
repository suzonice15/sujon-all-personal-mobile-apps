// Kubernetes chapter: Config and Secrets.

export default {
  id: 'config-secrets',
  title: 'Config & Secrets',
  description: 'ConfigMaps, Secrets and environment injection',
  icon: 'settings',
  lessons: [
    {
      id: 'k8s-configmap',
      title: 'ConfigMaps',
      blocks: [
        { type: 'text', value: 'A ConfigMap holds non-secret configuration: URLs, feature flags and small config files. Inject it as environment variables or mount it as a file.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  NODE_ENV: production
  API_URL: https://api.example.com` },
        { type: 'code', lang: 'yaml', tryIt: false, value: `envFrom:
  - configMapRef:
      name: api-config` },
        { type: 'note', value: 'A ConfigMap change does not restart pods automatically. Roll the Deployment or use a checksum annotation to trigger it.' },
      ],
    },
    {
      id: 'k8s-secret',
      title: 'Secrets',
      blocks: [
        { type: 'text', value: 'A Secret holds sensitive data. It is base64-encoded, not encrypted, unless encryption at rest is enabled. Use RBAC and avoid committing Secret manifests with real values.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: v1
kind: Secret
metadata:
  name: api-secret
type: Opaque
stringData:
  DATABASE_URL: postgres://app:secret@db:5432/app` },
        { type: 'note', value: 'For production, use an external secret manager with a controller such as External Secrets, or sealed secrets. Do not store real secrets in git.' },
      ],
    },
    {
      id: 'k8s-config-best',
      title: 'Best practices',
      blocks: [
        { type: 'list', items: [
          'Same image, different config per environment',
          'Mount large config as a volume, not many env vars',
          'Never log environment variables',
          'Restrict Secret read access with RBAC',
          'Rotate secrets and restart consumers',
          'Validate required config at startup',
        ] },
        { type: 'text', value: 'A pod that starts without its required config fails later in a confusing way. Check required variables at startup and fail fast.' },
        { type: 'note', value: 'Base64 is encoding, not encryption. Anyone with read access to the Secret can decode it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'config-secrets',
      q: 'What is a ConfigMap for?',
      options: ['Secrets', 'Non-secret configuration', 'Images', 'Volumes'],
      answer: 1,
      explain: 'It holds non-sensitive config.',
    },
    {
      chapterId: 'config-secrets',
      q: 'Is a Kubernetes Secret encrypted?',
      options: ['Always', 'No, base64 is encoding', 'Only in the cloud', 'Only with TLS'],
      answer: 1,
      explain: 'It needs encryption at rest and RBAC.',
    },
    {
      chapterId: 'config-secrets',
      q: 'What happens when a ConfigMap changes?',
      options: ['Pods restart automatically', 'Pods keep the old value until restarted', 'The cluster reboots', 'The image rebuilds'],
      answer: 1,
      explain: 'Roll the Deployment to pick up changes.',
    },
  ],
};
