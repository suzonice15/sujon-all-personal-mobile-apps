// Express chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Express is and your first server',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'express-what-is',
      title: 'What is Express?',
      blocks: [
        { type: 'text', value: 'Express is a small, unopinionated web framework for Node.js. It adds routing, middleware and request helpers on top of the built-in http module. Most Node APIs and many real products use it.' },
        { type: 'list', items: [
          'Minimal and flexible',
          'Routing for methods and paths',
          'Middleware pipeline',
          'Huge ecosystem of middleware',
          'Works with any database or template engine',
        ] },
        { type: 'note', value: 'Express is unopinionated: it does not tell you how to structure a project. That freedom is useful, but you must choose a structure and keep it.' },
      ],
    },
    {
      id: 'express-install',
      title: 'Install and run',
      blocks: [
        { type: 'text', value: 'Create a project, initialise it and install Express. Then write a server file and run it with Node. Use nodemon in development to restart on changes.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `mkdir courses-api && cd courses-api
npm init -y
npm install express
npm install -D nodemon

# in package.json: "type": "module"  (to use import)
npx nodemon server.js` },
        { type: 'note', value: 'Set "type": "module" to use import and export. Otherwise use require and module.exports consistently.' },
      ],
    },
    {
      id: 'express-hello',
      title: 'Your first server',
      blocks: [
        { type: 'text', value: 'An Express app is a function you pass to http. Routes match a method and a path, and the handler sends a response.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => console.log('http://localhost:3000'));` },
        { type: 'note', value: 'res.send handles strings and buffers. res.json sets the content type and serializes for you.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is Express?',
      options: ['A database', 'A web framework for Node.js', 'A frontend library', 'A build tool'],
      answer: 1,
      explain: 'Express adds routing and middleware to Node.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does app.get(path, handler) define?',
      options: ['A database table', 'A route for GET requests', 'A middleware only', 'A port'],
      answer: 1,
      explain: 'It registers a GET route.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which response helper sends JSON?',
      options: ['res.send', 'res.json', 'res.end', 'res.write'],
      answer: 1,
      explain: 'res.json serializes and sets the content type.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use nodemon in development?',
      options: ['To compress files', 'To restart the server on changes', 'To secure routes', 'To deploy'],
      answer: 1,
      explain: 'nodemon restarts on file changes.',
    },
  ],
};
