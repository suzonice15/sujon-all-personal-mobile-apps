// Security chapter: Cloud Security.

export default {
  id: 'cloud-security',
  title: 'Cloud Security',
  description: 'IAM, secrets, buckets and shared responsibility',
  icon: 'cloud',
  lessons: [
    {
      id: 'sec-cloud-shared',
      title: 'Shared responsibility',
      blocks: [
        { type: 'text', value: 'The cloud provider secures the physical infrastructure and managed service internals. You secure your configuration, identities, data and application. Most breaches are customer-side misconfiguration.' },
        { type: 'list', items: [
          'Provider: data centers, hardware, hypervisor',
          'You: IAM, network rules, encryption, app code',
          'Managed database: provider patches the engine, you control access',
          'Object storage: provider stores it, you set the policy',
        ] },
        { type: 'note', value: 'A public bucket is not the provider\'s fault. It is a configuration choice, and a common one.' },
      ],
    },
    {
      id: 'sec-cloud-iam',
      title: 'IAM',
      blocks: [
        { type: 'text', value: 'Identity and access management is the most important cloud control. Give each workload its own role, with only the actions it needs. Avoid long-lived access keys.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `# Example policy idea
Effect: Allow
Action:
  - s3:GetObject
Resource: arn:aws:s3:::codenest-public/*

# Do not use:
Action: "*"
Resource: "*"` },
        { type: 'list', items: [
          'Least privilege per service',
          'Use roles and short-lived credentials',
          'MFA for human admin accounts',
          'Separate production and development accounts',
          'Review unused permissions',
        ] },
        { type: 'note', value: 'An access key in a repository is a credential leak. Prefer instance roles or workload identity.' },
      ],
    },
    {
      id: 'sec-cloud-storage',
      title: 'Storage and secrets',
      blocks: [
        { type: 'text', value: 'Object storage is private by default in a good design. Check the bucket policy, the public access block and the encryption settings. Secrets belong in a secret manager, not in environment files committed to git.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# AWS examples
aws s3api get-public-access-block --bucket my-bucket
aws s3 ls s3://my-bucket

# Secrets
aws secretsmanager get-secret-value --secret-id prod/app` },
        { type: 'list', items: [
          'Block public access unless the bucket is intentionally public',
          'Encrypt at rest and in transit',
          'Enable versioning and backups',
          'Restrict secrets to the services that need them',
          'Rotate keys and audit access',
        ] },
      ],
    },
    {
      id: 'sec-cloud-misconfig',
      title: 'Common misconfigurations',
      blocks: [
        { type: 'list', items: [
          'Public storage bucket',
          'Security group open to 0.0.0.0/0 on SSH or the database',
          'Over-permissive IAM role',
          'Unencrypted database or disk',
          'Logging disabled',
          'Default admin password',
          'No backup or no restore test',
        ] },
        { type: 'text', value: 'Cloud security is mostly configuration hygiene. Use infrastructure as code, review it, and scan for known misconfigurations.' },
        { type: 'note', value: 'A misconfiguration can expose data without any code vulnerability. The configuration is part of the application.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'cloud-security',
      q: 'Who secures your IAM policy?',
      options: ['The provider', 'You', 'The database', 'The CDN'],
      answer: 1,
      explain: 'IAM is customer-side configuration.',
    },
    {
      chapterId: 'cloud-security',
      q: 'What does least privilege mean for a cloud workload?',
      options: ['Admin for all', 'Only the actions and resources it needs', 'One shared key', 'No logging'],
      answer: 1,
      explain: 'Each workload gets only what it needs.',
    },
    {
      chapterId: 'cloud-security',
      q: 'What is a common storage mistake?',
      options: ['Encryption', 'A public bucket', 'Versioning', 'Backups'],
      answer: 1,
      explain: 'Public buckets expose data directly.',
    },
    {
      chapterId: 'cloud-security',
      q: 'Where do secrets belong?',
      options: ['In git', 'In a secret manager', 'In the README', 'In the app bundle'],
      answer: 1,
      explain: 'Use short-lived, access-controlled secrets.',
    },
  ],
};
