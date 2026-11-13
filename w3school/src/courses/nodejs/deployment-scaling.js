// Node.js chapter: Deployment & Scaling.

export default {
  id: 'deployment-scaling',
  title: 'Deployment & Scaling',
  description: 'Signals, clustering, health checks and graceful shutdown',
  icon: 'rocket',
  lessons: [
    {
      id: 'node-process-signals',
      title: 'Processes and signals',
      blocks: [
        { type: 'text', value: 'A container sends SIGTERM before it stops the process. Handle it, stop accepting new work, finish in-flight requests, close the database pool and exit. Otherwise requests are cut off.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const server = app.listen(3000);\n\nasync function shutdown(signal) {\n  console.log('shutting down', signal);\n  server.close(async () => {\n    await pool.end();\n    process.exit(0);\n  });\n  setTimeout(() => process.exit(1), 10_000).unref();\n}\n\nprocess.on('SIGTERM', () => shutdown('SIGTERM'));\nprocess.on('SIGINT', () => shutdown('SIGINT'));` },
        { type: 'note', value: 'A hard timeout protects you from a request that never finishes. Ten seconds is a common limit.' },
      ],
    },
    {
      id: 'node-cluster',
      title: 'Clustering and load',
      blocks: [
        { type: 'text', value: 'Node runs JavaScript on one thread. To use every CPU core, run several processes behind a load balancer, or use the cluster module. A process manager or an orchestrator usually does this better.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// os.cpus().length on an 8-core machine\nconst cores = 8;\nconsole.log('workers to run:', cores);\nconsole.log('requests per worker:', Math.round(1000 / cores));` },
        { type: 'list', items: [
          'One process per core, not per request',
          'Keep processes stateless',
          'Store sessions in Redis, not in memory',
          'Use a readiness probe before sending traffic',
          'Scale horizontally before vertical',
        ] },
        { type: 'note', value: 'Multiple processes cannot share in-memory state. A local cache or counter will disagree between workers.' },
      ],
    },
    {
      id: 'node-observability',
      title: 'Health checks and logs',
      blocks: [
        { type: 'text', value: 'A liveness check says the process is alive. A readiness check says it can serve traffic, including the database. Keep them separate or a slow database will restart a healthy app.' },
        { type: 'code', lang: 'js', tryIt: false, value: `app.get('/health/live', (req, res) => res.json({ ok: true }));\n\napp.get('/health/ready', async (req, res) => {\n  try {\n    await pool.query('SELECT 1');\n    res.json({ ok: true });\n  } catch {\n    res.status(503).json({ ok: false });\n  }\n});` },
        { type: 'list', items: [
          'Log JSON with a request id',
          'Never log tokens or passwords',
          'Track error rate and p95 latency',
          'Set a memory limit and alert on restarts',
          'Correlate logs with the deploy version',
        ] },
        { type: 'note', value: 'A readiness check that runs a heavy query turns a health probe into a load test. Keep it cheap.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment-scaling',
      q: 'What does SIGTERM mean for the app?',
      options: ['Restart now', 'Stop gracefully before exit', 'Ignore it', 'Scale up'],
      answer: 1,
      explain: 'It signals a graceful shutdown.',
    },
    {
      chapterId: 'deployment-scaling',
      q: 'Why run several processes?',
      options: ['To use more CPU cores', 'To share memory', 'To avoid HTTP', 'To cache'],
      answer: 0,
      explain: 'Node uses one thread per process.',
    },
    {
      chapterId: 'deployment-scaling',
      q: 'What does a readiness check prove?',
      options: ['The process started', 'The app can serve traffic', 'The code compiled', 'The disk is empty'],
      answer: 1,
      explain: 'Readiness includes dependencies.',
    },
    {
      chapterId: 'deployment-scaling',
      q: 'Where should sessions live with many workers?',
      options: ['In each process memory', 'In a shared store such as Redis', 'In a global variable', 'In the URL'],
      answer: 1,
      explain: 'Shared state must be external.',
    },
  ],
};
