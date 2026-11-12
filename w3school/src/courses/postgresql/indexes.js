// PostgreSQL chapter: Indexes.

export default {
  id: 'indexes',
  title: 'Indexes',
  description: 'B-tree, GIN, GiST, partial and covering indexes',
  icon: 'speed',
  lessons: [
    {
      id: 'pg-btree',
      title: 'B-tree indexes',
      blocks: [
        { type: 'text', value: 'A B-tree index is the default. It speeds up equality, range and ORDER BY queries on one or more columns. Create it when a column appears in WHERE or ORDER BY often.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_courses_price ON courses(price);

-- Composite index for a common filter + sort
CREATE INDEX idx_courses_level_price ON courses(level, price);

-- Check that the index is used
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM courses WHERE price BETWEEN 4000 AND 6000;` },
        { type: 'note', value: 'A composite index helps when you filter on the leading columns. (level, price) helps filter by level then price, not price alone.' },
      ],
    },
    {
      id: 'pg-gin-gist',
      title: 'GIN and GiST',
      blocks: [
        { type: 'text', value: 'GIN indexes handle values that contain multiple elements, such as JSONB objects, arrays and full-text search vectors. GiST is a generalized search tree for ranges, geometry and nearest-neighbour search.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_events_payload ON events USING gin (payload);

SELECT * FROM events
WHERE payload @> '{"action": "login"}';

-- Full-text search
CREATE INDEX idx_courses_search ON courses
USING gin (to_tsvector('english', title));

SELECT * FROM courses
WHERE to_tsvector('english', title) @@ to_tsquery('english', 'postgres');` },
        { type: 'note', value: 'GIN indexes are slower to build and update but very fast to query. Use them for read-heavy workloads with complex containment queries.' },
      ],
    },
    {
      id: 'pg-partial-covering',
      title: 'Partial and covering indexes',
      blocks: [
        { type: 'text', value: 'A partial index covers only rows that match a condition, which saves space and speeds up queries on a subset. A covering index includes extra columns so the query can be answered from the index alone, without touching the table.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Only index published courses
CREATE INDEX idx_published ON courses(price) WHERE published = true;

-- Covering index: the query never touches the table
CREATE INDEX idx_courses_cover ON courses(level) INCLUDE (title, price);

SELECT title, price FROM courses WHERE level = 'intermediate';` },
        { type: 'list', items: [
          'Partial indexes are small and fast for skewed data',
          'Covering indexes enable index-only scans',
          'Every index slows writes and uses disk space',
          'Drop indexes that are never used',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'indexes',
      q: 'Which index type is the default in PostgreSQL?',
      options: ['Hash', 'B-tree', 'GIN', 'GiST'],
      answer: 1,
      explain: 'B-tree is the default index type.',
    },
    {
      chapterId: 'indexes',
      q: 'When is a GIN index the right choice?',
      options: ['Single-column equality', 'JSONB, arrays and full-text search', 'Range queries only', 'Primary keys'],
      answer: 1,
      explain: 'GIN handles values with multiple elements.',
    },
    {
      chapterId: 'indexes',
      q: 'What is a partial index?',
      options: ['An index on half the columns', 'An index that covers only rows matching a condition', 'An incomplete build', 'A slow index'],
      answer: 1,
      explain: 'It indexes a subset of rows.',
    },
    {
      chapterId: 'indexes',
      q: 'What does a covering index allow?',
      options: ['Faster inserts', 'Answering a query from the index alone', 'Larger tables', 'No backups'],
      answer: 1,
      explain: 'Covering indexes enable index-only scans.',
    },
  ],
};
