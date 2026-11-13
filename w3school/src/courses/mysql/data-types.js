// MySQL chapter: Data Types.

export default {
  id: 'data-types',
  title: 'Data Types',
  description: 'Integers, strings, decimals, dates and JSON',
  icon: 'category',
  lessons: [
    {
      id: 'mysql-integers',
      title: 'Integer types',
      blocks: [
        { type: 'text', value: 'MySQL has several integer sizes: TINYINT, SMALLINT, MEDIUMINT, INT and BIGINT. Choose the smallest that fits your data to save space and improve cache efficiency.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    small_count SMALLINT NOT NULL,
    medium_count MEDIUMINT NOT NULL,
    big_count BIGINT NOT NULL DEFAULT 0
);

INSERT INTO products (small_count, medium_count) VALUES (10, 1000);
SELECT * FROM products;` },
        { type: 'note', value: 'INT is 4 bytes and holds up to about 2 billion. Use BIGINT for IDs and counts that may exceed that.' },
      ],
    },
    {
      id: 'mysql-strings-decimals',
      title: 'Strings and decimals',
      blocks: [
        { type: 'text', value: 'VARCHAR stores variable-length strings up to a limit. TEXT stores large strings. DECIMAL stores exact decimal numbers, which is essential for money. Never use FLOAT or DOUBLE for currency.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL
);

INSERT INTO prices (name, amount) VALUES ('Course', 5000.00);
SELECT name, amount FROM prices;` },
        { type: 'note', value: 'DECIMAL(10, 2) means 10 total digits with 2 after the decimal point. It is exact, unlike FLOAT.' },
      ],
    },
    {
      id: 'mysql-dates-json',
      title: 'Dates and JSON',
      blocks: [
        { type: 'text', value: 'DATETIME stores a date and time without a zone. TIMESTAMP converts to UTC on storage and back to the session zone on read. JSON columns validate and store JSON, with path queries via -> and ->>.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    occurred_at DATETIME NOT NULL,
    payload JSON NOT NULL
);

INSERT INTO events (occurred_at, payload)
VALUES (NOW(), '{"user": "Ayesha", "action": "login"}');

SELECT payload ->> '$.user' AS user,
       payload ->> '$.action' AS action
FROM events;` },
        { type: 'note', value: 'Use DATETIME for wall-clock times and TIMESTAMP for absolute moments. JSON is validated on insert in MySQL 5.7 and later.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'data-types',
      q: 'Which type should you use for money?',
      options: ['FLOAT', 'DOUBLE', 'DECIMAL', 'INT'],
      answer: 2,
      explain: 'DECIMAL is exact; FLOAT and DOUBLE have rounding errors.',
    },
    {
      chapterId: 'data-types',
      q: 'How many bytes does an INT use?',
      options: ['1', '2', '4', '8'],
      answer: 2,
      explain: 'INT is 4 bytes.',
    },
    {
      chapterId: 'data-types',
      q: 'What does TIMESTAMP do that DATETIME does not?',
      options: ['Stores milliseconds', 'Converts to UTC on storage and back on read', 'Sorts faster', 'Encrypts the value'],
      answer: 1,
      explain: 'TIMESTAMP handles time zones automatically.',
    },
    {
      chapterId: 'data-types',
      q: 'How do you extract a field from a JSON column?',
      options: ['payload.user', 'payload ->> "$.user"', 'JSON_EXTRACT only', 'payload[0]'],
      answer: 1,
      explain: 'The ->> operator extracts a value as text.',
    },
  ],
};
