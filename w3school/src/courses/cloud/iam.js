// Cloud chapter: IAM.

export default {
  id: 'iam',
  title: 'IAM',
  description: 'Users, roles, policies and least privilege',
  icon: 'lock',
  lessons: [
    {
      id: 'cloud-iam-basics',
      title: 'Users, roles and policies',
      blocks: [
        { type: 'text', value: 'IAM controls who can do what. A user is a person or app identity. A role is an identity assumed temporarily by a service. A policy lists allowed or denied actions on resources.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `# Policy idea
Effect: Allow
Action:
  - s3:GetObject
Resource: arn:aws:s3:::codenest-public/*

# Avoid
Action: "*"
Resource: "*"` },
        { type: 'note', value: 'Wildcard permissions are the most common cloud security mistake. Start with nothing and add only what the workload needs.' },
      ],
    },
    {
      id: 'cloud-iam-roles',
      title: 'Roles and short-lived credentials',
      blocks: [
        { type: 'text', value: 'A workload should assume a role instead of using a long-lived access key. The platform issues short-lived credentials automatically.' },
        { type: 'list', items: [
          'EC2 instance profile / ECS task role',
          'GCP service account attached to the resource',
          'Azure managed identity',
          'CI uses OIDC federation instead of a stored key',
        ] },
        { type: 'note', value: 'A key in a repository is a credential leak. Prefer roles, workload identity and short-lived tokens.' },
      ],
    },
    {
      id: 'cloud-iam-humans',
      title: 'Human access',
      blocks: [
        { type: 'text', value: 'People need MFA, separate admin accounts and least privilege too. Production access should be audited and time-bound.' },
        { type: 'list', items: [
          'MFA for every human account',
          'Separate production and development accounts',
          'Break-glass admin with alerting',
          'Review unused permissions quarterly',
          'Log and alert on sensitive actions',
        ] },
        { type: 'note', value: 'The goal is not zero access; it is the minimum access for the shortest time with a record of what happened.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'iam',
      q: 'What does a role provide?',
      options: ['A permanent password', 'Temporary credentials for a workload', 'A database', 'A DNS record'],
      answer: 1,
      explain: 'Roles issue short-lived credentials.',
    },
    {
      chapterId: 'iam',
      q: 'What is least privilege?',
      options: ['Admin for all', 'Only the actions needed', 'One shared key', 'No logging'],
      answer: 1,
      explain: 'Start with nothing and add only what is required.',
    },
    {
      chapterId: 'iam',
      q: 'Why avoid long-lived access keys?',
      options: ['They are slow', 'They are a leak risk and hard to rotate', 'They cost more', 'They break DNS'],
      answer: 1,
      explain: 'Prefer roles and short-lived credentials.',
    },
  ],
};
