// SQL interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced', code?, lang? }

export default {
  'getting-started': [
    {
      q: 'What is a relational database?',
      a: 'A database that stores data in tables made of rows and columns, where tables can be linked by keys. Relationships are defined by primary and foreign keys, and SQL is used to query and change the data.',
      level: 'basic',
    },
    {
      q: 'What is the difference between SQL and a database engine?',
      a: 'SQL is the language. A database engine such as SQLite, MySQL, PostgreSQL or SQL Server is the program that stores the data and executes SQL. Different engines support different features and dialects.',
      level: 'basic',
    },
    {
      q: 'What is a primary key?',
      a: 'A column or combination of columns that uniquely identifies a row. It must be unique and not null. Every table should have one.',
      level: 'basic',
    },
    {
      q: 'What does NULL mean?',
      a: 'NULL means unknown or missing. It is not zero and not an empty string. Comparisons with = do not match NULL; use IS NULL and IS NOT NULL.',
      level: 'basic',
    },
  ],
  'selecting-data': [
    {
      q: 'What is the difference between WHERE and HAVING?',
      a: 'WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY. Aggregates such as COUNT(*) can only appear in HAVING, not in WHERE.',
      level: 'intermediate',
    },
    {
      q: 'How does LIKE work?',
      a: 'LIKE matches text patterns: % matches any number of characters and _ matches exactly one. A leading wildcard (LIKE \'%text\') usually prevents an index from being used.',
      level: 'basic',
    },
    {
      q: 'Why can = NULL return no rows?',
      a: 'NULL represents an unknown value. Comparing anything to unknown yields unknown, not true, so the row is not returned. Use IS NULL instead.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between IN and EXISTS?',
      a: 'IN checks whether a value appears in a list or subquery result. EXISTS checks whether a subquery returns at least one row. EXISTS often performs better on large correlated subqueries because it can stop at the first match.',
      level: 'intermediate',
    },
  ],
  'sorting-limiting': [
    {
      q: 'Why is LIMIT without ORDER BY dangerous?',
      a: 'Tables have no guaranteed row order. Without ORDER BY the database may return any rows, so pagination can repeat or skip records and tests can pass by accident.',
      level: 'basic',
    },
    {
      q: 'What is cursor pagination?',
      a: 'Instead of OFFSET, the next page starts after the last seen value: WHERE id > :last_id ORDER BY id LIMIT :size. It uses the index and stays fast on large tables.',
      level: 'intermediate',
    },
    {
      q: 'What does DISTINCT do?',
      a: 'It removes duplicate result rows across every selected column. It is not a fix for a wrong join that produces duplicates.',
      level: 'basic',
    },
  ],
  aggregates: [
    {
      q: 'What is the difference between COUNT(*) and COUNT(column)?',
      a: 'COUNT(*) counts rows. COUNT(column) counts non-NULL values in that column, so rows where the column is NULL are not counted.',
      level: 'intermediate',
    },
    {
      q: 'Why must non-aggregated SELECT columns appear in GROUP BY?',
      a: 'A group can contain many rows. Without grouping the column, the database would have to pick one value arbitrarily. Standard SQL rejects the ambiguity.',
      level: 'intermediate',
    },
    {
      q: 'How do you find groups with more than five rows?',
      a: 'GROUP BY the key, then HAVING COUNT(*) > 5. HAVING runs after grouping, so it can filter on the aggregate.',
      level: 'basic',
    },
    {
      q: 'Does AVG include NULL values?',
      a: 'No. AVG ignores NULLs and divides by the number of non-NULL values. If you need to treat NULL as zero, use AVG(COALESCE(column, 0)).',
      level: 'intermediate',
    },
  ],
  joins: [
    {
      q: 'Explain INNER JOIN vs LEFT JOIN.',
      a: 'INNER JOIN returns only rows with a match on both sides. LEFT JOIN returns every row from the left table, with NULLs for missing right-side columns. LEFT JOIN is used for "parents with no children" queries.',
      level: 'basic',
    },
    {
      q: 'What is a self join used for?',
      a: 'Joining a table to itself with two aliases, for example employees to their managers, or categories to a parent category.',
      level: 'intermediate',
    },
    {
      q: 'What happens if you put a join condition in WHERE instead of ON?',
      a: 'For an inner join the result is the same. For an outer join it turns the join into an inner join and drops unmatched rows, which is a common bug.',
      level: 'advanced',
    },
    {
      q: 'How do you find rows in one table with no match in another?',
      a: 'Use LEFT JOIN and filter WHERE right_table.id IS NULL, or use NOT EXISTS with a correlated subquery.',
      level: 'intermediate',
    },
    {
      q: 'Why can a join return more rows than either table?',
      a: 'If the join condition matches multiple rows on one side, every combination is returned. A many-to-many relationship or a non-unique key multiplies rows.',
      level: 'intermediate',
    },
  ],
  'subqueries-cte': [
    {
      q: 'What is a correlated subquery?',
      a: 'A subquery that references a column from the outer query. It is evaluated for each outer row, so it can be slow on large tables unless an index supports it.',
      level: 'advanced',
    },
    {
      q: 'When would you use a CTE instead of a subquery?',
      a: 'When the query has several steps or the same subquery is used more than once. A CTE names each step and makes the query easier to read and debug.',
      level: 'intermediate',
    },
    {
      q: 'What is a derived table?',
      a: 'A subquery in the FROM clause. It acts like a temporary table for the query and requires an alias in most databases.',
      level: 'basic',
    },
    {
      q: 'Are CTEs always faster?',
      a: 'No. Performance depends on the query plan. Some databases materialise CTEs, others inline them. Measure before rewriting a query for speed.',
      level: 'advanced',
    },
  ],
  'changing-data': [
    {
      q: 'How do you safely update many rows?',
      a: 'Run the same WHERE as a SELECT first and check the rows. Then run the UPDATE inside a transaction, verify the affected count, and COMMIT only if it is correct.',
      level: 'intermediate',
    },
    {
      q: 'What is an UPSERT?',
      a: 'An insert that updates the row if a unique key already exists. It makes sync jobs idempotent: running the same request twice does not create duplicates.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between DELETE and DROP?',
      a: 'DELETE removes rows but keeps the table structure. DROP TABLE removes the table and all its data. TRUNCATE removes all rows quickly on some databases.',
      level: 'basic',
    },
    {
      q: 'Why use placeholders in INSERT and UPDATE?',
      a: 'They prevent SQL injection and handle quoting correctly. Values are sent separately from the SQL text, so they cannot change the statement structure.',
      level: 'basic',
    },
  ],
  'table-design': [
    {
      q: 'What is normalisation and why does it matter?',
      a: 'Organising tables so each fact is stored once. It prevents inconsistencies, saves space and makes updates reliable. 1NF removes repeating groups, 2NF removes partial dependencies, 3NF removes transitive dependencies.',
      level: 'intermediate',
    },
    {
      q: 'When would you denormalise?',
      a: 'For read-heavy reporting or performance, when the cost of joins is too high. Denormalisation must be deliberate, with a plan to keep copied data in sync.',
      level: 'advanced',
    },
    {
      q: 'What is a CHECK constraint?',
      a: 'A rule the database validates on every insert or update, for example price >= 0 or score BETWEEN 0 AND 100. It protects data even if the app has a bug.',
      level: 'basic',
    },
    {
      q: 'Why avoid storing dates as free text?',
      a: 'Text dates are hard to compare and sort correctly, and different formats break queries. Store ISO text (YYYY-MM-DD) or a proper date type, and be explicit about time zones.',
      level: 'intermediate',
    },
  ],
  'keys-relationships': [
    {
      q: 'What is referential integrity?',
      a: 'The guarantee that a foreign key always points to an existing row in the referenced table. It prevents orphan records.',
      level: 'basic',
    },
    {
      q: 'Does a foreign key create an index automatically?',
      a: 'Not in SQLite or PostgreSQL. You usually need to create an index on the foreign key column yourself, otherwise joins and deletes scanning that column are slow.',
      level: 'advanced',
    },
    {
      q: 'How do you model a many-to-many relationship?',
      a: 'With a junction table that has a foreign key to each side and a composite primary key over both. Extra columns describe the relationship, for example score or enrolled_at.',
      level: 'intermediate',
    },
    {
      q: 'What is a composite primary key?',
      a: 'A primary key made of two or more columns. The combination must be unique, while each column alone may repeat.',
      level: 'intermediate',
    },
  ],
  'indexes-performance': [
    {
      q: 'Why does an index speed up reads but slow down writes?',
      a: 'The index is a sorted structure that lets the database find rows without scanning. Every insert, update and delete must also update every index, so writes do more work.',
      level: 'intermediate',
    },
    {
      q: 'What is a composite index and how does column order matter?',
      a: 'An index over several columns. It can serve queries that use the leftmost columns, so (city, age) helps city and city+age, but not age alone.',
      level: 'advanced',
    },
    {
      q: 'What is the N+1 query problem?',
      a: 'Loading a list with one query and then running another query for each row. It multiplies round trips. Fix it with a join, a batched IN query, or a data loader.',
      level: 'intermediate',
    },
    {
      q: 'Why does WHERE UPPER(city) = \'DHAKA\' ignore the index?',
      a: 'The function changes the column value for every row, so the database cannot use the sorted index. Store a normalised column or create an expression index where supported.',
      level: 'advanced',
    },
    {
      q: 'What does EXPLAIN QUERY PLAN show?',
      a: 'How the database will execute the query: scans, searches, index usage, join order and temporary structures. Compare plans before and after adding an index.',
      level: 'intermediate',
    },
  ],
  'transactions-acid': [
    {
      q: 'What are the ACID properties?',
      a: 'Atomicity (all or nothing), Consistency (constraints hold), Isolation (concurrent transactions do not see partial work), Durability (committed data survives a crash).',
      level: 'intermediate',
    },
    {
      q: 'Why keep transactions short?',
      a: 'They hold locks and block other writers. Long transactions increase waiting, reduce throughput and raise the chance of timeouts and deadlocks.',
      level: 'intermediate',
    },
    {
      q: 'What is a deadlock?',
      a: 'Two transactions each hold a lock the other needs, so neither can continue. The database kills one; the app should retry it with a short delay.',
      level: 'advanced',
    },
    {
      q: 'When should a rollback happen?',
      a: 'Whenever any statement in the transaction fails or a business rule is violated. Roll back, report the error, and leave the database unchanged.',
      level: 'basic',
    },
  ],
  'sql-in-apps': [
    {
      q: 'How does SQLite differ from MySQL or PostgreSQL?',
      a: 'SQLite is embedded in the app and stores everything in one file, with no server and one writer at a time. MySQL and PostgreSQL are server databases with users, networking and richer concurrency.',
      level: 'basic',
    },
    {
      q: 'How do you prevent SQL injection?',
      a: 'Use parameterized queries or prepared statements. Never concatenate user input into SQL. Validate input as well, but validation is not a substitute for placeholders.',
      level: 'basic',
    },
    {
      q: 'What is a database migration?',
      a: 'A versioned schema change. Each migration runs once, in order, so every environment reaches the same schema. Never edit a migration that already ran in production.',
      level: 'intermediate',
    },
    {
      q: 'How do you design offline sync?',
      a: 'Store changes locally with a synced flag or an outbox table, push when online, and make the server idempotent with unique ids. Handle conflicts with an explicit rule such as last-write-wins or server-wins.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design the database for a learning app?',
      a: 'Tables for users, courses, lessons, progress, quiz attempts, coins and transactions. Progress references user and lesson with a unique pair. Money-like data lives in an append-only ledger, and sync uses an outbox with idempotent ids.',
      level: 'advanced',
    },
    {
      q: 'How do you find the second highest salary?',
      a: 'SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees); or use ORDER BY salary DESC LIMIT 1 OFFSET 1 with DISTINCT.',
      level: 'intermediate',
    },
    {
      q: 'How do you find duplicate rows?',
      a: 'GROUP BY the column and HAVING COUNT(*) > 1. To see the full rows, join that list back to the table.',
      level: 'intermediate',
    },
    {
      q: 'How do you explain a query to a non-technical person?',
      a: 'Describe the data as tables, the question as filters and groups, and the result as a report. Avoid syntax and focus on what each step does to the rows.',
      level: 'basic',
    },
  ],
};
