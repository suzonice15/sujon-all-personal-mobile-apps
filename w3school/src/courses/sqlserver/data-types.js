// SQL Server chapter: Data Types.

export default {
  id: 'data-types',
  title: 'Data Types',
  description: 'Numbers, strings, dates and unique identifiers',
  icon: 'category',
  lessons: [
    {
      id: 'ss-numbers',
      title: 'Numbers',
      blocks: [
        { type: 'text', value: 'Use INT or BIGINT for whole numbers, DECIMAL for exact money and FLOAT only for scientific values. Choose the smallest type that fits, but never sacrifice correctness.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `DECLARE @count INT = 10;
DECLARE @price DECIMAL(10,2) = 5000.00;
DECLARE @ratio FLOAT = 0.15;

SELECT @count, @price, @ratio;` },
        { type: 'note', value: 'Money columns should be DECIMAL, not FLOAT. Binary floating point loses cents.' },
      ],
    },
    {
      id: 'ss-strings-dates',
      title: 'Strings and dates',
      blocks: [
        { type: 'text', value: 'NVARCHAR stores Unicode up to a length; use NVARCHAR(MAX) for large text. DATE, TIME and DATETIME2 store temporal values. Use SYSUTCDATETIME for UTC.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `DECLARE @title NVARCHAR(200) = N'কোর্স';
DECLARE @created DATETIME2 = SYSUTCDATETIME();
DECLARE @day DATE = CAST('2026-01-15' AS DATE);

SELECT @title, @created, @day;` },
        { type: 'list', items: [
          'DATETIME2 is more precise than DATETIME',
          'Store UTC and convert at the edge',
          'N prefix for Unicode literals',
          'Avoid VARCHAR for user text',
        ] },
      ],
    },
    {
      id: 'ss-guid',
      title: 'GUIDs and NULL',
      blocks: [
        { type: 'text', value: 'UNIQUEIDENTIFIER stores a GUID. It is useful for distributed IDs but is wider and less sequential than an INT identity, which fragments indexes. NULL means unknown; use NOT NULL wherever the value is required.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE TABLE dbo.Events (
    Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Note NVARCHAR(500) NULL
);` },
        { type: 'note', value: 'Prefer NEWSEQUENTIALID over NEWID for a clustered key. Random GUIDs fragment the index.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'data-types',
      q: 'Which type is right for money?',
      options: ['FLOAT', 'REAL', 'DECIMAL', 'INT'],
      answer: 2,
      explain: 'DECIMAL is exact.',
    },
    {
      chapterId: 'data-types',
      q: 'Which stores Unicode text?',
      options: ['VARCHAR', 'NVARCHAR', 'CHAR', 'BINARY'],
      answer: 1,
      explain: 'NVARCHAR is Unicode.',
    },
    {
      chapterId: 'data-types',
      q: 'What should you store for timestamps?',
      options: ['Local time', 'UTC', 'A string', 'An integer only'],
      answer: 1,
      explain: 'Store UTC and convert for display.',
    },
    {
      chapterId: 'data-types',
      q: 'Why prefer NEWSEQUENTIALID?',
      options: ['It is shorter', 'Sequential values reduce index fragmentation', 'It is encrypted', 'It is required'],
      answer: 1,
      explain: 'Sequential GUIDs fragment less.',
    },
  ],
};
