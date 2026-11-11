// MongoDB chapter: Atlas.

export default {
  id: 'atlas',
  title: 'MongoDB Atlas',
  description: 'Managed clusters, access control and backups',
  icon: 'cloud',
  lessons: [
    {
      id: 'mongo-atlas-cluster',
      title: 'Clusters',
      blocks: [
        { type: 'text', value: 'Atlas is MongoDB\'s managed cloud service. A free tier is enough for learning. A cluster has a region, a tier and a connection string.' },
        { type: 'list', items: [
          'Create a project and a cluster',
          'Choose a region close to your users',
          'Create a database user',
          'Allow only your IP addresses',
          'Copy the connection string into an environment variable',
        ] },
        { type: 'note', value: 'The free tier has limits on connections and storage. It is for development, not a production workload.' },
      ],
    },
    {
      id: 'mongo-atlas-access',
      title: 'Access control',
      blocks: [
        { type: 'text', value: 'Atlas has database users and project users with different roles. Use a least-privilege database user for the app and keep admin access separate.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Database user: app
Role: readWrite on codenest
Network access: 203.0.113.10/32 (server IP only)

Connection:
mongodb+srv://app:<password>@cluster0.xxxxx.mongodb.net/codenest` },
        { type: 'note', value: 'Do not allow 0.0.0.0/0 in production. It exposes the database to the entire internet.' },
      ],
    },
    {
      id: 'mongo-atlas-backup',
      title: 'Backups and monitoring',
      blocks: [
        { type: 'text', value: 'A managed cluster still needs an operational plan. Backups, alerts and a way to inspect slow queries are not optional.' },
        { type: 'list', items: [
          'Enable cloud backups on paid tiers',
          'Test a restore, not just a backup',
          'Watch connections, operations and slow queries',
          'Set alerts for disk, CPU and connection limits',
          'Use the profiler to find slow queries',
        ] },
        { type: 'note', value: 'A backup you have never restored is only a hope. Run a restore drill before you need it.' },
      ],
    },
    {
      id: 'mongo-atlas-security',
      title: 'Security checklist',
      blocks: [
        { type: 'list', items: [
          'Strong unique database password',
          'Least-privilege user for the app',
          'IP allow-list, never 0.0.0.0/0 in production',
          'TLS connection string (mongodb+srv)',
          'Audit log and alerts enabled',
          'Backups and a tested restore',
          'Rotate credentials when someone leaves',
        ] },
        { type: 'note', value: 'The connection string is a secret. Keep it in the platform secret store and out of logs.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'atlas',
      q: 'What is Atlas?',
      options: ['A local shell', 'A managed MongoDB cloud service', 'A CSS framework', 'A Node package'],
      answer: 1,
      explain: 'Atlas hosts and manages MongoDB clusters.',
    },
    {
      chapterId: 'atlas',
      q: 'Which network access rule is safe for production?',
      options: ['0.0.0.0/0', 'Only the server IP', 'Every IP', 'No rule'],
      answer: 1,
      explain: 'Allow only the addresses that need access.',
    },
    {
      chapterId: 'atlas',
      q: 'What should the app database user have?',
      options: ['Full admin', 'readWrite on its database only', 'No password', 'Root'],
      answer: 1,
      explain: 'Least privilege limits the damage of a leaked credential.',
    },
    {
      chapterId: 'atlas',
      q: 'What proves a backup is useful?',
      options: ['It exists', 'A successful restore test', 'Its size', 'Its color'],
      answer: 1,
      explain: 'Only a restore proves the backup can be used.',
    },
  ],
};
