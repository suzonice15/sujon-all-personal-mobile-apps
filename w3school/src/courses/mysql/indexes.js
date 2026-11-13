// MySQL chapter: Indexes.

export default {
  id: 'indexes',
  title: 'Indexes',
  description: 'B-tree, full-text, composite and covering indexes',
  icon: 'speed',
  lessons: [
    {
      id: 'mysql-btree',
      title: 'B-tree indexes',
      blocks: [
        { type: 'text', value: 'A B-tree index is the default in InnoDB. It speeds up equality, range and ORDER BY queries. InnoDB stores the primary key in a clustered index, so secondary indexes include the primary key.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_courses_price ON courses(price);

-- Composite index for a common filter + sort
CREATE INDEX idx_courses_level_price ON courses(level, price);

-- Check that the index is used
EXPLAIN SELECT * FROM courses WHERE price BETWEEN 4000 AND 6000;` },
        { type: 'note', value: 'A composite index helps when you filter on the leading columns. (level, price) helps filter by level then price, not price alone.' },
      ],
    },
    {
      id: 'mysql-fulltext',
      title: 'Full-text search',
      blocks: [
        { type: 'text', value: 'MySQL has built-in full-text search with FULLTEXT indexes. It supports natural language and boolean mode queries.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE FULLTEXT INDEX idx_courses_search ON courses(title, description);

SELECT title, MATCH(title, description) AGAINST('postgres database' IN NATURAL LANGUAGE MODE) AS score
FROM courses
WHERE MATCH(title, description) AGAINST('postgres database' IN NATURAL LANGUAGE MODE);` },
        { type: 'note', value: 'Full-text search in MySQL is good for simple cases. For advanced search, use Elasticsearch or a dedicated search engine.' },
      ],
    },
    {
      id: 'mysql-covering',
      title: 'Covering indexes',
      blocks: [
        { type: 'text', value: 'A covering index includes all columns a query needs, so MySQL can answer from the index alone without reading the table. This is called an index-only scan or covering index.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_courses_cover ON courses(level, price, title);

-- MySQL can answer this from the index alone
SELECT title, price FROM courses WHERE level = 'intermediate';` },
        { type: 'list', items: [
          'Covering indexes avoid table lookups',
          'Every index slows writes and uses disk space',
          'Drop indexes that are never used',
          'Use EXPLAIN to check if an index is used',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'indexes',
      q: 'Which index type is the default in InnoDB?',
      options: ['Hash', 'B-tree', 'Full-text', 'Spatial'],
      answer: 1,
      explain: 'B-tree is the default index type.',
    },
    {
      chapterId: 'indexes',
      q: 'What is a clustered index in InnoDB?',
      options: ['A separate index file', 'The primary key stored with the row data', 'A full-text index', 'A hash index'],
      answer: 1,
      explain: 'InnoDB stores rows in primary key order.',
    },
    {
      chapterId: 'indexes',
      q: 'What does a covering index allow?',
      options: ['Faster inserts', 'Answering a query from the index alone', 'Larger tables', 'No backups'],
      answer: 1,
      explain: 'Covering indexes enable index-only scans.',
    },
    {
      chapterId: 'indexes',
      q: 'Which index type supports full-text search?',
      options: ['B-tree', 'Hash', 'FULLTEXT', 'Spatial'],
      answer: 2,
      explain: 'FULLTEXT indexes support text search.',
    },
  ],
};
