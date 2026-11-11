// Node.js chapter: Deployment.

export default {
  id: 'deployment',
  title: 'Deployment',
  description: 'Environment variables, logs, health checks and safety',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'node-env-config',
      title: 'Configuration and secrets',
      blocks: [
        { type: 'text', value: 'Configuration belongs in environment variables, not in code. Secrets must never be committed. The app reads them at startup and fails fast if something required is missing.' },
        { type: 'code', lang: 'js', tryIt: false, value: `function required(name) {
  const value = process.env[name];
  if (!value) throw new Error('Missing environment variable: ' + name);
  return value;
}

export const config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: required('DATABASE_URL'),
  jwtSecret: required('JWT_SECRET'),
  nodeEnv: process.env.NODE_ENV || 'development',
};` },
        { type: 'text', value: 'Use different .env files per environment and keep them out of git. On the server, the platform injects the variables.' },
        { type: 'note', value: 'A missing secret should crash at startup, not halfway through a request. Failing fast is safer than running misconfigured.' },
      ],
    },
    {
      id: 'node-logging-health',
      title: 'Logging and health checks',
      blocks: [
        { type: 'text', value: 'Structured logs (JSON) are searchable. Log the request id, method, path, status and duration. Never log passwords, tokens or full card numbers.' },
        { type: 'code', lang: 'js', tryIt: false, value: `app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    res.status(503).json({ status: 'down' });
  }
});` },
        { type: 'list', items: [
          'Health check: is the process alive and can it reach the database?',
          'Readiness check: is it ready to receive traffic?',
          'Log request id so one request can be traced across services',
          'Use a log library; console.log is fine only for prototypes',
        ] },
      ],
    },
    {
      id: 'node-process-manager',
      title: 'Process managers and containers',
      blocks: [
        { type: 'text', value: 'A production Node process should restart after a crash, run the right number of instances and receive graceful shutdown signals.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# Run with a process manager
pm2 start src/server.js -i max --name codenest-api

# Or with Docker
docker build -t codenest-api .
docker run -p 3000:3000 --env-file .env codenest-api` },
        { type: 'code', lang: 'js', tryIt: false, value: `for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => {
      pool.end().finally(() => process.exit(0));
    });
  });
}` },
        { type: 'note', value: 'Graceful shutdown stops accepting new requests, finishes in-flight work, closes the pool and exits. Without it, deploys can drop requests.' },
      ],
    },
    {
      id: 'node-production-checklist',
      title: 'Production checklist',
      blocks: [
        { type: 'list', items: [
          'NODE_ENV=production and secrets injected by the platform',
          'HTTPS only, with secure cookies',
          'Helmet, CORS allow-list and rate limiting enabled',
          'Body size limits and request timeouts',
          'Database pool size tuned to the server',
          'Health endpoint and structured logs',
          'Error tracking and alerting',
          'Backups and a tested restore plan',
        ] },
        { type: 'text', value: 'Deployment is not finished when the server starts. Monitor errors, response time and database load, then iterate.' },
        { type: 'note', value: 'Test the production build locally with the same environment variables. A dev-only code path is a common cause of deploy surprises.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment',
      q: 'Where should secrets live?',
      options: ['In source code', 'In environment variables', 'In the README', 'In the database schema'],
      answer: 1,
      explain: 'Environment variables keep secrets out of the repository.',
    },
    {
      chapterId: 'deployment',
      q: 'What should a health endpoint check?',
      options: ['Only that the process is running', 'That the app can reach its critical dependencies', 'The CSS build', 'The git branch'],
      answer: 1,
      explain: 'A process can be alive but unable to serve if the database is unreachable.',
    },
    {
      chapterId: 'deployment',
      q: 'Why handle SIGTERM?',
      options: ['To restart faster', 'To shut down gracefully without dropping requests', 'To enable CORS', 'To compile TypeScript'],
      answer: 1,
      explain: 'The platform sends SIGTERM before stopping the process.',
    },
    {
      chapterId: 'deployment',
      q: 'Which is a production safety measure?',
      options: ['Rate limiting', 'Disabling HTTPS', 'Logging passwords', 'Using the default secret'],
      answer: 0,
      explain: 'Rate limiting reduces abuse and brute force.',
    },
  ],
};
