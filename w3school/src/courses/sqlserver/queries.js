// SQL Server chapter: Queries.

export default {
  id: 'queries',
  title: 'Queries',
  description: 'SELECT, JOIN, CTEs and window functions',
  icon: 'table-chart',
  lessons: [
    {
      id: 'ss-select-join',
      title: 'SELECT and JOIN',
      blocks: [
        { type: 'text', value: 'T-SQL uses standard SELECT, JOIN and GROUP BY. Alias tables, qualify columns and filter before grouping. Use TOP for a quick preview.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `SELECT TOP (10)
    c.Title,
    COUNT(e.Id) AS Enrollments
FROM dbo.Courses c
LEFT JOIN dbo.Enrollments e ON e.CourseId = c.Id
WHERE c.Published = 1
GROUP BY c.Title
ORDER BY Enrollments DESC;` },
        { type: 'note', value: 'TOP without ORDER BY returns an arbitrary set. Always order when the result matters.' },
      ],
    },
    {
      id: 'ss-cte-window',
      title: 'CTEs and window functions',
      blocks: [
        { type: 'text', value: 'A CTE names a query for readability. Window functions compute per-row values over a partition without collapsing rows. ROW_NUMBER is the common way to pick the latest row per group.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `WITH Ranked AS (
    SELECT
        CourseId,
        Score,
        ROW_NUMBER() OVER (PARTITION BY CourseId ORDER BY Score DESC) AS rn
    FROM dbo.QuizResults
)
SELECT CourseId, Score
FROM Ranked
WHERE rn = 1;` },
        { type: 'note', value: 'Window functions run after WHERE and GROUP BY. Filter the result with a CTE, not another WHERE in the same query.' },
      ],
    },
    {
      id: 'ss-merge',
      title: 'MERGE and upserts',
      blocks: [
        { type: 'text', value: 'MERGE can insert, update or delete in one statement. It is powerful and easy to get wrong; for simple upserts, an explicit IF EXISTS or a unique index with a retry is clearer.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `MERGE dbo.Courses AS target
USING (SELECT 1 AS Id, N'SQL' AS Title) AS source
ON target.Id = source.Id
WHEN MATCHED THEN UPDATE SET Title = source.Title
WHEN NOT MATCHED THEN INSERT (Title) VALUES (source.Title);` },
        { type: 'list', items: [
          'Unique index prevents duplicate inserts',
          'MERGE needs careful concurrency testing',
          'Prefer explicit statements for clarity',
          'Always test with concurrent sessions',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'queries',
      q: 'What does TOP do?',
      options: ['Sorts', 'Limits rows returned', 'Creates a table', 'Joins'],
      answer: 1,
      explain: 'TOP limits the result set.',
    },
    {
      chapterId: 'queries',
      q: 'What does ROW_NUMBER do?',
      options: ['Counts rows', 'Numbers rows in a partition', 'Deletes rows', 'Joins rows'],
      answer: 1,
      explain: 'It numbers rows by the window order.',
    },
    {
      chapterId: 'queries',
      q: 'Where can you filter a window result?',
      options: ['In the same WHERE', 'In an outer query or CTE', 'In ORDER BY', 'In a JOIN'],
      answer: 1,
      explain: 'Wrap it and filter outside.',
    },
    {
      chapterId: 'queries',
      q: 'Why is MERGE risky?',
      options: ['It is slow', 'Concurrency edge cases can cause wrong writes', 'It cannot update', 'It needs a view'],
      answer: 1,
      explain: 'MERGE has subtle concurrency issues.',
    },
  ],
};
