// SQL chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What a database is and how to read data with SQL',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'sql-what-is-database',
      title: 'What is a database?',
      blocks: [
        { type: 'text', value: 'A database is an organised collection of data that a program can read and change quickly. Almost every app you use stores something: users, messages, orders, scores, coins. SQL is the language used to talk to most of those databases.' },
        { type: 'text', value: 'Data lives in tables. A table looks like a spreadsheet: it has columns (the fields) and rows (the records). Here is a students table:' },
        { type: 'list', items: [
          'id - a unique number for each student',
          'name - text',
          'age - a number',
          'city - text',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT * FROM students;` },
        { type: 'note', value: 'The database already contains sample rows. Tap "Try it yourself", change the query and press Run to see the result update.' },
      ],
    },
    {
      id: 'sql-first-query',
      title: 'Your first query',
      blocks: [
        { type: 'text', value: 'SELECT tells the database which columns you want. The star (*) means "every column". FROM tells it which table to read.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, city FROM students;` },
        { type: 'text', value: 'SQL keywords are not case sensitive, but the usual style is to write keywords in UPPER CASE and table or column names in lower case. That makes long queries easier to read.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `select name, age
from students;` },
        { type: 'note', value: 'A query is a question, not a command to change data. SELECT never modifies the table.' },
      ],
    },
    {
      id: 'sql-how-apps-use-it',
      title: 'How apps use SQL',
      blocks: [
        { type: 'text', value: 'A typical app has three layers. The screen shows data, the server decides what is allowed, and the database stores the truth.' },
        { type: 'list', items: [
          'Mobile or web app - sends a request, for example "show my orders".',
          'Server / API - checks who you are and which data you may see.',
          'Database - runs the SQL and returns rows.',
        ] },
        { type: 'text', value: 'Some apps keep a small database on the phone itself. This app does that with SQLite, so lessons, progress and coins work without internet. The server database is still needed to sync between devices.' },
        { type: 'note', value: 'Never build SQL by joining user input into a string. A student typing " OR 1=1 -- into a login box must not be able to change your query. Chapter 12 shows the safe way: parameterized queries.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Which keyword reads data from a table?',
      options: ['SELECT', 'INSERT', 'UPDATE', 'CREATE'],
      answer: 0,
      explain: 'SELECT asks the database for rows. INSERT, UPDATE and CREATE change the database structure or data.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does one row in a table represent?',
      options: ['One column', 'One record', 'One database', 'One query'],
      answer: 1,
      explain: 'A row is one complete record, for example one student with a name, age and city.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which of these is a relational database engine?',
      options: ['SQLite', 'React', 'Node.js', 'Git'],
      answer: 0,
      explain: 'SQLite is a relational database. React is a UI library, Node.js is a runtime and Git is version control.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does SELECT * mean?',
      options: ['Select one row', 'Select every column', 'Select every table', 'Select only the id column'],
      answer: 1,
      explain: 'The star is a wildcard for all columns of the table named in FROM.',
    },
  ],
};
