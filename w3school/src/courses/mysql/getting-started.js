// MySQL chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What MySQL is, installation and the mysql client',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'mysql-what-is',
      title: 'What is MySQL?',
      blocks: [
        { type: 'text', value: 'MySQL is the most widely used open-source relational database. It powers a huge share of the web, including WordPress, Drupal and many SaaS products. It is fast, reliable and easy to start with.' },
        { type: 'list', items: [
          'InnoDB storage engine with ACID transactions',
          'Replication for high availability and read scaling',
          'Partitioning for large tables',
          'Full-text search',
          'JSON support since 5.7',
          'Huge ecosystem and hosting support',
        ] },
        { type: 'note', value: 'MySQL and MariaDB are close cousins. MariaDB forked from MySQL and keeps compatibility, but has diverged in features. This course focuses on MySQL.' },
      ],
    },
    {
      id: 'mysql-install-client',
      title: 'Install and connect',
      blocks: [
        { type: 'text', value: 'Install MySQL from the official packages or use Docker. The mysql client connects to the server. Use a connection string or individual flags.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Docker
docker run --name mysql -e MYSQL_ROOT_PASSWORD=secret -p 3306:3306 -d mysql:8

# Connect
mysql -h 127.0.0.1 -u root -p

# Inside the client
SHOW DATABASES;
USE courses;
SHOW TABLES;
DESCRIBE courses;
\\q` },
        { type: 'note', value: 'Use --protocol=tcp to force a TCP connection when localhost resolves to a socket.' },
      ],
    },
    {
      id: 'mysql-first-table',
      title: 'Create your first table',
      blocks: [
        { type: 'text', value: 'MySQL uses AUTO_INCREMENT for surrogate keys. InnoDB is the default storage engine and supports transactions and foreign keys. Always specify ENGINE=InnoDB explicitly in older setups.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO courses (title, price) VALUES ('SQL', 5000), ('MySQL', 6000);

SELECT * FROM courses;` },
        { type: 'note', value: 'InnoDB is the only engine you should use for transactional data. MyISAM is legacy and lacks transactions and foreign keys.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Which storage engine supports transactions in MySQL?',
      options: ['MyISAM', 'InnoDB', 'Memory', 'CSV'],
      answer: 1,
      explain: 'InnoDB supports ACID transactions and foreign keys.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does AUTO_INCREMENT do?',
      options: ['Creates a text column', 'Generates a new integer for each row', 'Indexes the column', 'Encrypts the column'],
      answer: 1,
      explain: 'AUTO_INCREMENT produces a new primary key value.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which command lists tables in the current database?',
      options: ['SHOW DATABASES', 'SHOW TABLES', 'DESCRIBE', '\\q'],
      answer: 1,
      explain: 'SHOW TABLES lists the tables.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why avoid MyISAM for new tables?',
      options: ['It is faster', 'It lacks transactions and foreign keys', 'It uses less memory', 'It is newer'],
      answer: 1,
      explain: 'MyISAM is legacy and not transactional.',
    },
  ],
};
