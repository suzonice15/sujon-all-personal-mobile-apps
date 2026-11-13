// SQL Server chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What SQL Server is, setup and first queries',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ss-what-is',
      title: 'What is SQL Server?',
      blocks: [
        { type: 'text', value: 'Microsoft SQL Server is a relational database with T-SQL, strong tooling and enterprise features. Azure SQL is the managed cloud version. It is common in .NET shops and Windows environments.' },
        { type: 'list', items: [
          'T-SQL dialect with stored procedures',
          'SQL Server Management Studio and Azure Data Studio',
          'Clustered and nonclustered indexes',
          'Transactions and row versioning',
          'Azure SQL for managed hosting',
        ] },
        { type: 'note', value: 'SQL Server and PostgreSQL both do relational work. The choice is usually about the existing stack and the team, not raw features.' },
      ],
    },
    {
      id: 'ss-setup',
      title: 'Setup',
      blocks: [
        { type: 'text', value: 'Use a local instance, a Docker container or Azure SQL. sqlcmd and Azure Data Studio run queries. Create a database first, then tables inside it.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker run -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD=YourStrong!Pass \\
  -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest

sqlcmd -S localhost -U sa -P 'YourStrong!Pass' -Q "SELECT @@VERSION"` },
        { type: 'note', value: 'Use a strong SA password locally. Never expose port 1433 to the internet.' },
      ],
    },
    {
      id: 'ss-first-table',
      title: 'Your first table',
      blocks: [
        { type: 'text', value: 'Use CREATE TABLE with explicit types and constraints. IDENTITY creates an auto-incrementing key. dbo is the default schema.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE TABLE dbo.Courses (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Title     NVARCHAR(200) NOT NULL,
    Price     INT NOT NULL CONSTRAINT CK_Price CHECK (Price >= 0),
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

INSERT INTO dbo.Courses (Title, Price) VALUES (N'SQL', 5000);
SELECT * FROM dbo.Courses;` },
        { type: 'note', value: 'Use NVARCHAR for Unicode text. VARCHAR can mangle non-Latin characters.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What query language does SQL Server use?',
      options: ['PL/pgSQL', 'T-SQL', 'PL/SQL', 'SQLite SQL'],
      answer: 1,
      explain: 'SQL Server uses T-SQL.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does IDENTITY do?',
      options: ['Encrypts', 'Auto-increments a key', 'Indexes', 'Creates a view'],
      answer: 1,
      explain: 'IDENTITY generates sequential values.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which type stores Unicode text?',
      options: ['VARCHAR', 'NVARCHAR', 'CHAR', 'TEXT'],
      answer: 1,
      explain: 'NVARCHAR is Unicode.',
    },
    {
      chapterId: 'getting-started',
      q: 'Is Azure SQL the same engine?',
      options: ['No', 'Yes, managed SQL Server', 'It is MySQL', 'It is NoSQL'],
      answer: 1,
      explain: 'Azure SQL is managed SQL Server.',
    },
  ],
};
