// Cloud chapter: Security.

export default {
  id: 'security',
  title: 'Cloud Security',
  description: 'Secrets, encryption and public exposure',
  icon: 'shield',
  lessons: [
    {
      id: 'cloud-secrets',
      title: 'Secrets',
      blocks: [
        { type: 'text', value: 'Store secrets in a secret manager, not in environment files committed to git. Grant access to the smallest set of identities and rotate on a schedule.' },
        { type: 'list', items: [
          'AWS Secrets Manager / SSM Parameter Store',
          'GCP Secret Manager',
          'Azure Key Vault',
          'Inject at runtime, never bake into an image',
          'Audit who read a secret',
        ] },
        { type: 'note', value: 'A secret in a container image can be extracted from a layer even if a later layer deletes it.' },
      ],
    },
    {
      id: 'cloud-encryption',
      title: 'Encryption',
      blocks: [
        { type: 'text', value: 'Encrypt data at rest and in transit. Managed services usually enable encryption by default; verify it and understand who holds the keys.' },
        { type: 'list', items: [
          'TLS for every connection',
          'Provider-managed keys are a good default',
          'Customer-managed keys for stricter control',
          'Encrypt backups and snapshots',
          'Key rotation and access policy',
        ] },
        { type: 'note', value: 'Encryption at rest does not protect data while the app is running. Application-level access control still matters.' },
      ],
    },
    {
      id: 'cloud-exposure',
      title: 'Public exposure',
      blocks: [
        { type: 'text', value: 'The most common cloud incident is an accidentally public resource: a bucket, a database, a snapshot or an admin panel. Check the policy, not only the console screen.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `aws s3api get-public-access-block --bucket my-bucket
aws s3api get-bucket-policy --bucket my-bucket

# Scan your own public surface
nmap -Pn -p 22,80,443,5432,3306 your.server.ip` },
        { type: 'list', items: [
          'Block public access by default',
          'Use signed URLs for private objects',
          'Keep databases in private subnets',
          'Restrict admin panels by network and MFA',
          'Scan for exposed ports and public snapshots',
        ] },
        { type: 'note', value: 'Only scan systems you own or are authorized to test. Unauthorized scanning is not allowed.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'Where should secrets live?',
      options: ['In git', 'In a secret manager', 'In the Dockerfile', 'In the app bundle'],
      answer: 1,
      explain: 'Secret managers control and audit access.',
    },
    {
      chapterId: 'security',
      q: 'What is the most common cloud incident?',
      options: ['A CPU spike', 'An accidentally public resource', 'A slow DNS', 'A CSS bug'],
      answer: 1,
      explain: 'Misconfigured public access exposes data.',
    },
    {
      chapterId: 'security',
      q: 'What does encryption at rest protect?',
      options: ['Running memory', 'Stored data', 'The network', 'The UI'],
      answer: 1,
      explain: 'It protects data on disk and backups.',
    },
  ],
};
