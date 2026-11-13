// SQLite chapter: Types & Affinity.

export default {
  id: 'types-affinity',
  title: 'Types & Affinity',
  description: 'Storage classes, affinity and strict tables',
  icon: 'category',
  lessons: [
    {
      id: 'sq-storage-classes',
      title: 'Storage classes',
      blocks: [
        { type: 'text', value: 'SQLite has five storage classes: NULL, INTEGER, REAL, TEXT and BLOB. A declared type maps to an affinity that decides how values are stored. A column can hold different types unless the table is STRICT.' },
        { type: 'list', items: [
          'INTEGER: whole numbers',
          'REAL: floating point',
          'TEXT: strings',
          'BLOB: raw bytes',
          'NUMERIC: numeric affinity for other declarations',
        ] },
        { type: 'note', value: 'SQLite is dynamically typed by default. Use STRICT tables when you want the database to reject wrong types.' },
      ],
    },
    {
      id: 'sq-affinity',
      title: 'Affinity',
      blocks: [
        { type: 'text', value: 'A column declared VARCHAR gets TEXT affinity; INT gets INTEGER. The affinity converts values on insert, which is why “5” can become 5 in an INTEGER column.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE demo (a INTEGER, b TEXT);

INSERT INTO demo VALUES ('42', 42);
SELECT a, typeof(a), b, typeof(b) FROM demo;` },
        { type: 'note', value: 'Type affinity is convenient and surprising. For data you care about, declare the type you mean and use STRICT.' },
      ],
    },
    {
      id: 'sq-strict',
      title: 'STRICT tables',
      blocks: [
        { type: 'text', value: 'A STRICT table enforces the declared types and rejects other values. It behaves more like a traditional SQL database and prevents silent conversion bugs.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE strict_courses (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    price INTEGER NOT NULL
) STRICT;

INSERT INTO strict_courses (title, price) VALUES ('SQL', 5000);
SELECT * FROM strict_courses;` },
        { type: 'note', value: 'Use STRICT for new tables. Existing tables can be migrated in place with care.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'types-affinity',
      q: 'How many storage classes?',
      options: ['Three', 'Five', 'Ten', 'One'],
      answer: 1,
      explain: 'NULL, INTEGER, REAL, TEXT and BLOB.',
    },
    {
      chapterId: 'types-affinity',
      q: 'What does TEXT affinity do?',
      options: ['Stores only text', 'Converts values to text', 'Rejects numbers', 'Encrypts'],
      answer: 1,
      explain: 'It converts on insert.',
    },
    {
      chapterId: 'types-affinity',
      q: 'What does STRICT do?',
      options: ['Encrypts the table', 'Enforces declared types', 'Adds an index', 'Creates a view'],
      answer: 1,
      explain: 'It rejects wrong types.',
    },
    {
      chapterId: 'types-affinity',
      q: 'Why is dynamic typing surprising?',
      options: ['It is slow', '“5” can become 5 in an INTEGER column', 'It deletes data', 'It needs a server'],
      answer: 1,
      explain: 'Values are converted by affinity.',
    },
  ],
};
