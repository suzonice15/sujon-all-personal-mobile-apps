// React chapter: Build and Deploy. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'deploy',
  title: 'Build and Deploy',
  description: 'Code quality, production builds, hosting and CI',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'react-code-quality',
      title: 'ESLint, Prettier and Code Quality',
      blocks: [
        { type: 'text', value: 'Teams agree on tools that check and format code automatically, so code reviews focus on logic, not spacing. Vite projects come with ESLint configured.' },
        { type: 'list', items: [
          'ESLint finds bugs: unused variables, missing hook dependencies, rules-of-hooks violations.',
          'Prettier formats code the same way for everyone.',
          'Husky + lint-staged run both before every commit.',
          'TypeScript type checking catches wrong props and data shapes.',
        ] },
        { type: 'code', lang: 'text', value: `npm install -D prettier eslint-config-prettier
npx prettier --write .     # format every file
npm run lint               # check for problems` },
      ],
    },
    {
      id: 'react-build',
      title: 'Production Builds',
      blocks: [
        { type: 'text', value: 'npm run dev is for development: fast reloads, helpful warnings, unminified code. For users you create an optimized production build.' },
        { type: 'code', lang: 'text', value: `npm run build     # outputs static files to dist/
npm run preview   # test the production build locally` },
        { type: 'list', items: [
          'Code is minified and split into chunks, and file names get hashes for caching.',
          'Development warnings and StrictMode double renders are removed.',
          'Check bundle size: a large first bundle is the main cause of slow loads on phones.',
          'Single-page apps need a "rewrite all routes to index.html" rule on the host, or deep links return 404.',
        ] },
        { type: 'note', value: 'Always test the production build before releasing. Some bugs only appear when code is minified or env variables differ.' },
      ],
    },
    {
      id: 'react-hosting-ci',
      title: 'Hosting and Continuous Deployment',
      blocks: [
        { type: 'text', value: 'Vercel and Netlify host React and Next.js apps for free for personal projects. Connect a GitHub repository and every push deploys automatically; every pull request gets its own preview URL.' },
        { type: 'list', items: [
          '1. Push your project to GitHub.',
          '2. Import the repository on vercel.com or netlify.com.',
          '3. Set the build command (npm run build) and environment variables.',
          '4. Every push to main goes live; pull requests get preview links.',
        ] },
        { type: 'heading', value: 'Continuous Integration with GitHub Actions' },
        { type: 'code', lang: 'text', value: `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --run
      - run: npm run build` },
        { type: 'note', value: 'With CI, a pull request cannot be merged if lint, tests or the build fail. This is standard practice in professional teams.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'deploy', q: 'What does Prettier do?', options: ['Finds bugs', 'Formats code consistently', 'Deploys apps', 'Runs tests'], answer: 1, explain: 'ESLint finds problems; Prettier handles formatting.' },
    { chapterId: 'deploy', q: 'Which command creates an optimized production build in a Vite project?', options: ['npm run dev', 'npm start', 'npm run build', 'npm test'], answer: 2, explain: 'The output goes to the dist folder.' },
    { chapterId: 'deploy', q: 'Why does a single-page app need a rewrite rule on the host?', options: ['For HTTPS', 'So deep links like /courses/html serve index.html instead of 404', 'To compress images', 'To enable CSS'], answer: 1, explain: 'The router runs in the browser after index.html loads.' },
    { chapterId: 'deploy', q: 'What is the purpose of CI?', options: ['Designing the UI', 'Automatically running lint, tests and builds on every change', 'Writing documentation', 'Buying servers'], answer: 1, explain: 'Broken code is caught before it is merged.' },
  ],
};
