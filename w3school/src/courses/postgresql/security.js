// PostgreSQL chapter: Security.

export default {
  id: 'security',
  title: 'Security',
  description: 'Roles, row-level security and encryption',
  icon: 'lock',
  lessons: [
    {
      id: 'pg-roles',
      title: 'Roles and privileges',
      blocks: [
        { type: 'text', value: 'PostgreSQL uses roles for both users and groups. Grant privileges on schemas, tables and columns. Follow least privilege: give each role only what it needs.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE ROLE app_readonly LOGIN PASSWORD 'secret';
GRANT CONNECT ON DATABASE courses TO app_readonly;
GRANT USAGE ON SCHEMA public TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;

CREATE ROLE app_writer LOGIN PASSWORD 'secret';
GRANT INSERT, UPDATE, DELETE ON courses TO app_writer;` },
        { type: 'note', value: 'Revoke PUBLIC privileges on the public schema in production, so new roles do not get access by default.' },
      ],
    },
    {
      id: 'pg-rls',
      title: 'Row-level security',
      blocks: [
        { type: 'text', value: 'Row-level security (RLS) filters rows per user at the database level. Even if the application has a bug, a user cannot see another user\'s rows.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY own_enrollments ON enrollments
    USING (user_id = current_setting('app.user_id')::int);

-- Set the user id for the session
SET app.user_id = '42';

SELECT * FROM enrollments;   -- only rows where user_id = 42` },
        { type: 'note', value: 'RLS is a safety net, not a replacement for application checks. Both should agree, and the database rule is the one that cannot be bypassed.' },
      ],
    },
    {
      id: 'pg-encryption',
      title: 'Encryption and auditing',
      blocks: [
        { type: 'text', value: 'Encrypt data at rest with disk or volume encryption. Use pgcrypto for column-level encryption of sensitive values. Log connections and queries for auditing, and rotate credentials regularly.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (email, ssn)
VALUES ('a@example.com', pgp_sym_encrypt('123-45-6789', 'key'));

SELECT email, pgp_sym_decrypt(ssn, 'key') AS ssn FROM users;` },
        { type: 'list', items: [
          'Encrypt disks and backups',
          'Use column encryption only where needed; it complicates queries',
          'Log connections and DDL changes',
          'Rotate passwords and API keys on a schedule',
          'Restrict network access with pg_hba.conf',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'What is a role in PostgreSQL?',
      options: ['A table', 'A user or group with privileges', 'An index', 'A backup'],
      answer: 1,
      explain: 'Roles represent users and groups.',
    },
    {
      chapterId: 'security',
      q: 'What does row-level security do?',
      options: ['Encrypts the table', 'Filters rows per user at the database level', 'Speeds up queries', 'Creates users'],
      answer: 1,
      explain: 'RLS enforces per-row access rules.',
    },
    {
      chapterId: 'security',
      q: 'Why use pgcrypto?',
      options: ['For indexing', 'For column-level encryption of sensitive values', 'For backups', 'For replication'],
      answer: 1,
      explain: 'It encrypts individual columns.',
    },
    {
      chapterId: 'security',
      q: 'What does least privilege mean?',
      options: ['Admin for everyone', 'Give each role only the access it needs', 'No access at all', 'Public access'],
      answer: 1,
      explain: 'Grant the minimum required permissions.',
    },
  ],
};
