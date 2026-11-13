// SQL Server chapter: Performance.

export default {
  id: 'performance',
  title: 'Performance',
  description: 'Execution plans, statistics and parameter sniffing',
  icon: 'speed',
  lessons: [
    {
      id: 'ss-plans',
      title: 'Execution plans',
      blocks: [
        { type: 'text', value: 'The execution plan shows how the engine ran a query: scans, seeks, joins and sorts. Look for table scans on large tables, key lookups and expensive sorts. Compare estimated and actual rows to spot bad statistics.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `SET STATISTICS IO ON;
SET STATISTICS TIME ON;

SELECT c.Title, COUNT(e.Id)
FROM dbo.Courses c
LEFT JOIN dbo.Enrollments e ON e.CourseId = c.Id
GROUP BY c.Title;` },
        { type: 'note', value: 'A plan is a symptom, not the disease. Fix the query, stats or index that caused the bad plan.' },
      ],
    },
    {
      id: 'ss-sniffing',
      title: 'Parameter sniffing',
      blocks: [
        { type: 'text', value: 'SQL Server caches a plan built for the first parameter values it sees. A plan that is good for one value can be terrible for another. Use OPTION (RECOMPILE) for very skewed data, or rewrite the query.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `SELECT * FROM dbo.Orders
WHERE CustomerId = @customerId
OPTION (RECOMPILE);` },
        { type: 'list', items: [
          'Recompile fixes a bad cached plan but costs CPU',
          'Avoid functions on indexed columns',
          'Update statistics on large changing tables',
          'Measure with real parameter values',
        ] },
      ],
    },
    {
      id: 'ss-tuning',
      title: 'Tuning checklist',
      blocks: [
        { type: 'list', items: [
          'Select only the columns you need',
          'Filter on indexed columns',
          'Avoid SELECT * in application queries',
          'Batch large updates',
          'Check waits before changing server settings',
          'Fix the top query by total cost first',
        ] },
        { type: 'text', value: 'Most slow applications have a handful of bad queries, not a slow server. Find the top queries by total elapsed time and fix those.' },
        { type: 'note', value: 'Adding memory hides a bad query for a while. It does not fix the plan.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'performance',
      q: 'What should you look for in a plan?',
      options: ['Colours', 'Scans on large tables and bad row estimates', 'Font size', 'Comments'],
      answer: 1,
      explain: 'Scans and estimates reveal problems.',
    },
    {
      chapterId: 'performance',
      q: 'What is parameter sniffing?',
      options: ['A security bug', 'A cached plan built for one parameter value', 'A type of index', 'A backup'],
      answer: 1,
      explain: 'The plan may suit only one value.',
    },
    {
      chapterId: 'performance',
      q: 'What does OPTION (RECOMPILE) do?',
      options: ['Deletes the cache', 'Builds a plan for the current values', 'Adds an index', 'Encrypts'],
      answer: 1,
      explain: 'It recompiles per execution.',
    },
    {
      chapterId: 'performance',
      q: 'Where should tuning start?',
      options: ['Server memory', 'The top queries by total cost', 'The logo', 'The disk brand'],
      answer: 1,
      explain: 'Fix the biggest queries first.',
    },
  ],
};
