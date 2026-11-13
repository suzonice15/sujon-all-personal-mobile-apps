// MySQL chapter: Security.

export default {
  id: 'security',
  title: 'Security',
  description: 'Users, privileges, roles and SSL',
  icon: 'lock',
  lessons: [
    {
      id: 'mysql-users-privileges',
      title: 'Users and privileges',
      blocks: [
        { type: 'text', value: 'MySQL uses accounts identified by user and host. Grant privileges on databases, tables and columns. Follow least privilege: give each account only what it needs.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE USER 'app_readonly'@'%' IDENTIFIED BY 'secret';
GRANT SELECT ON courses.* TO 'app_readonly'@'%';

CREATE USER 'app_writer'@'%' IDENTIFIED BY 'secret';
GRANT SELECT, INSERT, UPDATE, DELETE ON courses.* TO 'app_writer'@'%';

FLUSH PRIVILEGES;` },
        { type: 'note', value: 'Restrict the host in production. Use localhost or a specific IP instead of %, which allows any host.' },
      ],
    },
    {
      id: 'mysql-roles',
      title: 'Roles',
      blocks: [
        { type: 'text', value: 'MySQL 8 introduced roles. A role is a named set of privileges that you grant to users. Roles make permission management easier and more consistent.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE ROLE 'read_only';
GRANT SELECT ON courses.* TO 'read_only';

CREATE USER 'analyst'@'%' IDENTIFIED BY 'secret';
GRANT 'read_only' TO 'analyst'@'%';
SET DEFAULT ROLE 'read_only' TO 'analyst'@'%';` },
        { type: 'note', value: 'Roles can be granted to other roles, which builds a permission hierarchy.' },
      ],
    },
    {
      id: 'mysql-ssl',
      title: 'SSL and network protection',
      blocks: [
        { type: 'text', value: 'Enable SSL so data in transit is encrypted. Require SSL for remote connections. Bind MySQL to a private IP and firewall port 3306 from the public internet.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# my.cnf
[mysqld]
require_secure_transport = ON
ssl-ca = /etc/mysql/ca.pem
ssl-cert = /etc/mysql/server-cert.pem
ssl-key = /etc/mysql/server-key.pem` },
        { type: 'list', items: [
          'Require SSL for remote connections',
          'Bind to a private IP',
          'Firewall port 3306 from the internet',
          'Rotate passwords regularly',
          'Use a secrets manager for credentials',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'What does % mean in a MySQL user host?',
      options: ['Any host', 'Localhost only', 'No host', 'A wildcard database'],
      answer: 0,
      explain: '% allows connections from any host.',
    },
    {
      chapterId: 'security',
      q: 'What is a role in MySQL 8?',
      options: ['A table', 'A named set of privileges granted to users', 'An index', 'A backup'],
      answer: 1,
      explain: 'Roles group privileges for easier management.',
    },
    {
      chapterId: 'security',
      q: 'Why require SSL for remote connections?',
      options: ['It is faster', 'To encrypt data in transit', 'It is required by SQL', 'It compresses data'],
      answer: 1,
      explain: 'SSL protects data on the network.',
    },
    {
      chapterId: 'security',
      q: 'What does least privilege mean for database users?',
      options: ['Admin for everyone', 'Give each user only the access it needs', 'No access at all', 'Public access'],
      answer: 1,
      explain: 'Grant the minimum required permissions.',
    },
  ],
};
