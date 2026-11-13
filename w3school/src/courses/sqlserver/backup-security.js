// SQL Server chapter: Backup & Security.

export default {
  id: 'backup-security',
  title: 'Backup & Security',
  description: 'Restore drills, roles and encryption',
  icon: 'backup',
  lessons: [
    {
      id: 'ss-backup-restore',
      title: 'Backup and restore',
      blocks: [
        { type: 'text', value: 'A backup you have never restored is a hope, not a plan. Take full, differential and log backups, test a restore, and know your recovery point and recovery time targets.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `BACKUP DATABASE CodeNest\nTO DISK = 'D:\\backups\\CodeNest_full.bak'\nWITH COMPRESSION, CHECKSUM, INIT;\n\nBACKUP LOG CodeNest\nTO DISK = 'D:\\backups\\CodeNest_log.trn'\nWITH CHECKSUM;\n\nRESTORE VERIFYONLY\nFROM DISK = 'D:\\backups\\CodeNest_full.bak';` },
        { type: 'list', items: [
          'Full weekly, log every 15 minutes',
          'Copy backups off the server',
          'Test a restore every quarter',
          'Track RPO and RTO explicitly',
          'Encrypt backups at rest',
        ] },
        { type: 'note', value: 'A backup on the same disk as the database is not a backup. It disappears with the server.' },
      ],
    },
    {
      id: 'ss-roles-permissions',
      title: 'Logins, roles and permissions',
      blocks: [
        { type: 'text', value: 'A login authenticates at the server. A user maps to a database. Grant permissions to roles, never to individuals, and keep the application account out of db_owner.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE LOGIN app_user WITH PASSWORD = 'Strong!Passw0rd';\nUSE CodeNest;\nCREATE USER app_user FOR LOGIN app_user;\n\nCREATE ROLE app_reader;\nGRANT SELECT ON SCHEMA::dbo TO app_reader;\n\nCREATE ROLE app_writer;\nGRANT SELECT, INSERT, UPDATE ON SCHEMA::dbo TO app_writer;\n\nALTER ROLE app_reader ADD MEMBER app_user;` },
        { type: 'note', value: 'GRANT EXECUTE on specific procedures is often safer than broad table writes.' },
      ],
    },
    {
      id: 'ss-encryption-audit',
      title: 'Encryption and auditing',
      blocks: [
        { type: 'text', value: 'Use TLS for connections, Always Encrypted or column encryption for sensitive columns, and auditing for privileged actions. Row-level security can restrict which rows a user sees.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `-- Restrict rows by tenant\nCREATE FUNCTION dbo.fn_tenantPredicate(@TenantId INT)\nRETURNS TABLE\nWITH SCHEMABINDING\nAS\nRETURN SELECT 1 AS allowed\nWHERE @TenantId = CAST(SESSION_CONTEXT(N'TenantId') AS INT);\n\nCREATE SECURITY POLICY TenantFilter\nADD FILTER PREDICATE dbo.fn_tenantPredicate(TenantId)\nON dbo.Courses\nWITH (STATE = ON);` },
        { type: 'list', items: [
          'TLS for every connection',
          'Encrypt sensitive columns',
          'Audit failed logins and permission changes',
          'Use row-level security for multi-tenant tables',
          'Never share the sa account',
        ] },
        { type: 'note', value: 'Application-level filtering alone breaks the moment someone runs a query directly. Row-level security enforces it in the engine.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'backup-security',
      q: 'What proves a backup is usable?',
      options: ['It exists', 'A successful restore test', 'It is large', 'It is compressed'],
      answer: 1,
      explain: 'Only a restore proves it.',
    },
    {
      chapterId: 'backup-security',
      q: 'What is a login versus a user?',
      options: ['They are the same', 'Login is server-level, user is database-level', 'User is server-level', 'Login is a role'],
      answer: 1,
      explain: 'A user maps a login into a database.',
    },
    {
      chapterId: 'backup-security',
      q: 'Why grant to roles?',
      options: ['It is shorter', 'Easier to manage and audit', 'It is faster', 'It encrypts'],
      answer: 1,
      explain: 'Roles keep permissions consistent.',
    },
    {
      chapterId: 'backup-security',
      q: 'What does row-level security do?',
      options: ['Encrypts rows', 'Filters which rows a user can see', 'Compresses rows', 'Indexes rows'],
      answer: 1,
      explain: 'It enforces row visibility in the engine.',
    },
  ],
};
