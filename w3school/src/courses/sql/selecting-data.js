// SQL chapter: Selecting Data.

export default {
  id: 'selecting-data',
  title: 'Selecting Data',
  description: 'Choose columns and filter rows with WHERE',
  icon: 'filter-alt',
  lessons: [
    {
      id: 'sql-select-columns',
      title: 'Choosing columns',
      blocks: [
        { type: 'text', value: 'Reading every column is convenient while exploring, but production queries should ask only for what they need. Less data means less network traffic, less memory and faster screens.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, city
FROM students;` },
        { type: 'text', value: 'You can rename a column in the result with AS. This is called an alias and it makes API responses easier to understand.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name AS student_name, age AS years
FROM students;` },
      ],
    },
    {
      id: 'sql-where',
      title: 'Filtering rows with WHERE',
      blocks: [
        { type: 'text', value: 'WHERE keeps only the rows that match a condition. The comparison operators are =, <>, >, >=, < and <=. In SQL a single = compares values; it is not an assignment.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age
FROM students
WHERE age >= 21;` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, city
FROM students
WHERE city = 'Dhaka';` },
        { type: 'note', value: 'Text values must be wrapped in single quotes. Double quotes are for identifiers (table or column names) in standard SQL, not for strings.' },
      ],
    },
    {
      id: 'sql-and-or-not',
      title: 'AND, OR and NOT',
      blocks: [
        { type: 'text', value: 'Combine conditions with AND (both must be true), OR (at least one must be true) and NOT (reverse a condition). Use parentheses when mixing AND and OR, because AND binds tighter than OR.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age, city
FROM students
WHERE city = 'Dhaka' AND age >= 21;` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, city
FROM students
WHERE city = 'Sylhet' OR city = 'Khulna';` },
        { type: 'text', value: 'This query is a common bug. It means "city is Dhaka, or the age is 20" because AND is evaluated first. Wrap the OR in parentheses if you want both conditions to apply.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age, city
FROM students
WHERE city = 'Dhaka' OR city = 'Sylhet' AND age > 20;` },
      ],
    },
    {
      id: 'sql-null-like-in-between',
      title: 'NULL, LIKE, IN and BETWEEN',
      blocks: [
        { type: 'text', value: 'NULL means "unknown", not zero and not an empty string. You cannot test it with = NULL. Use IS NULL or IS NOT NULL.' },
        { type: 'note', value: 'In this sample every student has a city, so IS NULL returns no rows. That is the correct result, not an error.' },
        { type: 'text', value: 'LIKE searches text patterns: % matches any number of characters and _ matches exactly one. IN checks a list. BETWEEN checks an inclusive range.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name
FROM students
WHERE name LIKE 'A%';` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, city
FROM students
WHERE city IN ('Dhaka', 'Sylhet');` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age
FROM students
WHERE age BETWEEN 20 AND 22;` },
        { type: 'note', value: 'BETWEEN includes both ends. age BETWEEN 20 AND 22 means age >= 20 AND age <= 22.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'selecting-data',
      q: 'Which clause filters rows?',
      options: ['WHERE', 'SELECT', 'FROM', 'ORDER BY'],
      answer: 0,
      explain: 'WHERE runs before sorting and keeps only rows that match the condition.',
    },
    {
      chapterId: 'selecting-data',
      q: 'How do you test for a missing value?',
      options: ['= NULL', 'IS NULL', '== NULL', 'LIKE NULL'],
      answer: 1,
      explain: 'NULL is unknown, so comparisons with = do not match. Use IS NULL or IS NOT NULL.',
    },
    {
      chapterId: 'selecting-data',
      q: 'What does LIKE \'A%\' match?',
      options: ['Exactly the text A', 'Text ending with A', 'Text starting with A', 'Any text containing A'],
      answer: 2,
      explain: 'The % wildcard matches any characters after A, so only values starting with A match.',
    },
    {
      chapterId: 'selecting-data',
      q: 'Which query is safer when combining AND and OR?',
      options: [
        'WHERE a = 1 AND b = 2 OR c = 3',
        'WHERE a = 1 AND (b = 2 OR c = 3)',
        'WHERE a = 1 OR b = 2 AND c = 3',
        'WHERE a = 1, b = 2 OR c = 3',
      ],
      answer: 1,
      explain: 'Parentheses make the intention explicit. Without them AND binds tighter than OR and the result is easy to misread.',
    },
    {
      chapterId: 'selecting-data',
      q: 'What does BETWEEN 10 AND 20 include?',
      options: ['Only 10 and 20', '10 up to but not including 20', '10, 20 and every value between', 'Only values above 20'],
      answer: 2,
      explain: 'BETWEEN is inclusive on both ends: >= 10 AND <= 20.',
    },
  ],
};
