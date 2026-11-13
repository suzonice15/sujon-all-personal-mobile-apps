// SQL Server chapter: Indexes.

export default {
  id: 'indexes',
  title: 'Indexes',
  description: 'Clustered, nonclustered, covering and filtered',
  icon: 'speed',
  lessons: [
    {
      id: 'ss-index-types',
      title: 'Clustered and nonclustered',
      blocks: [
        { type: 'text', value: 'A clustered index defines the physical order of the table and is usually the primary key. A nonclustered index is a separate structure with a pointer back to the row. A table can have many nonclustered indexes.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE NONCLUSTERED INDEX IX_Courses_Published_Title
ON dbo.Courses (Published, Title)
INCLUDE (Price);` },
        { type: 'note', value: 'A narrow, sequential clustered key keeps inserts fast. A wide or random key bloats every nonclustered index.' },
      ],
    },
    {
      id: 'ss-covering',
      title: 'Covering and filtered indexes',
      blocks: [
        { type: 'text', value: 'A covering index includes every column a query needs, so the engine reads only the index. A filtered index covers a subset, such as active rows, and is smaller.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE INDEX IX_ActiveCourses
ON dbo.Courses (Title)
INCLUDE (Price)
WHERE Published = 1;` },
        { type: 'list', items: [
          'Include the selected columns to cover a query',
          'Filter on a common, selective predicate',
          'More indexes slow writes',
          'Drop indexes that are never used',
        ] },
      ],
    },
    {
      id: 'ss-index-usage',
      title: 'Finding unused indexes',
      blocks: [
        { type: 'text', value: 'SQL Server tracks index usage. Query the DMVs to find unused or missing indexes. Treat missing-index suggestions as hints, not commands.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `SELECT
    OBJECT_NAME(i.object_id) AS TableName,
    i.name AS IndexName,
    ISNULL(us.user_seeks, 0) AS Seeks,
    ISNULL(us.user_scans, 0) AS Scans,
    ISNULL(us.user_updates, 0) AS Updates
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats us
    ON us.object_id = i.object_id AND us.index_id = i.index_id
WHERE OBJECTPROPERTY(i.object_id, 'IsUserTable') = 1
ORDER BY Updates DESC;` },
        { type: 'note', value: 'An index with high updates and zero reads is pure cost. Verify with the workload before dropping it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'indexes',
      q: 'What is a clustered index?',
      options: ['A separate structure', 'The physical row order', 'A view', 'A constraint'],
      answer: 1,
      explain: 'It defines the table order.',
    },
    {
      chapterId: 'indexes',
      q: 'What does INCLUDE do?',
      options: ['Adds a filter', 'Adds columns to cover a query', 'Sorts', 'Encrypts'],
      answer: 1,
      explain: 'Included columns avoid a lookup.',
    },
    {
      chapterId: 'indexes',
      q: 'When is a filtered index useful?',
      options: ['For all rows', 'For a small, common subset', 'Never', 'Only on GUIDs'],
      answer: 1,
      explain: 'It indexes a selective subset.',
    },
    {
      chapterId: 'indexes',
      q: 'What is the cost of indexes?',
      options: ['Slower reads', 'Slower writes and more storage', 'No cost', 'Less memory'],
      answer: 1,
      explain: 'Every index slows writes.',
    },
  ],
};
