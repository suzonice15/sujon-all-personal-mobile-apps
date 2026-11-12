// Cloud chapter: Databases.

export default {
  id: 'databases',
  title: 'Managed Databases',
  description: 'SQL, NoSQL, backups and replicas',
  icon: 'storage',
  lessons: [
    {
      id: 'cloud-managed-db',
      title: 'Managed databases',
      blocks: [
        { type: 'text', value: 'A managed database handles backups, patching, failover and monitoring. You choose the engine and size; the provider keeps it running.' },
        { type: 'list', items: [
          'AWS RDS / Aurora, DynamoDB',
          'GCP Cloud SQL, Firestore / Bigtable',
          'Azure SQL, Cosmos DB',
          'Managed does not mean you can skip indexes or query design',
        ] },
        { type: 'note', value: 'A managed database in a private subnet with a least-privilege user is the baseline. Public access and an admin password is not.' },
      ],
    },
    {
      id: 'cloud-backups-replicas',
      title: 'Backups and replicas',
      blocks: [
        { type: 'text', value: 'A backup is a copy you can restore. A replica is a live copy for reads or failover. They solve different problems.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Backup: point-in-time restore after a mistake
Replica: serve reads, fail over if the primary dies

Test the restore. An untested backup is not a backup.` },
        { type: 'list', items: [
          'Enable automated backups and a retention window',
          'Use a read replica for read-heavy traffic',
          'Test failover in a staging environment',
          'Encrypt backups and restrict access',
          'Document the recovery time and data loss window',
        ] },
      ],
    },
    {
      id: 'cloud-db-choice',
      title: 'Choosing a database',
      blocks: [
        { type: 'list', items: [
          'Relational: transactions, joins, reporting',
          'Document: nested data and flexible schema',
          'Key-value: very fast simple lookups',
          'Wide-column: huge write volume',
          'Search: full-text and relevance',
        ] },
        { type: 'text', value: 'Start with a managed relational database unless the access pattern clearly needs something else. It handles most products for years.' },
        { type: 'note', value: 'Each extra database engine adds operational cost and a new failure mode. Do not use five engines for a small app.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'databases',
      q: 'What does a managed database handle?',
      options: ['Only storage', 'Backups, patching and failover', 'Your indexes', 'Your app code'],
      answer: 1,
      explain: 'The provider runs the engine; you still design queries.',
    },
    {
      chapterId: 'databases',
      q: 'Backup versus replica?',
      options: ['They are the same', 'A backup restores; a replica serves reads or failover', 'A replica is offline', 'A backup is live'],
      answer: 1,
      explain: 'They solve different problems.',
    },
    {
      chapterId: 'databases',
      q: 'What proves a backup is useful?',
      options: ['It exists', 'A successful restore test', 'Its size', 'Its color'],
      answer: 1,
      explain: 'Only a restore proves recoverability.',
    },
  ],
};
