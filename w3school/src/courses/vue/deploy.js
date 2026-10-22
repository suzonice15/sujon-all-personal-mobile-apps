// Vue chapter: Build and Deploy. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'deploy',
  title: 'Build and Deploy',
  description: 'Environment variables, production builds, hosting and CI',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'vue-build-env',
      title: 'Environment Variables and Production Builds',
      blocks: [
        { type: 'code', lang: 'text', value: `# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.codenest.app

npm run build     # creates dist/ with minified, hashed files
npm run preview   # test the production build locally` },
        { type: 'code', lang: 'js', value: `const apiUrl = import.meta.env.VITE_API_URL;
if (import.meta.env.DEV) console.log('Running in development');` },
        { type: 'list', items: [
          'Only VITE_ variables reach the browser, and they are public. Keep secrets on the server.',
          'Single-page apps need the host to serve index.html for every route (history fallback).',
          'Remove debug logging and check the bundle size before release.',
        ] },
      ],
    },
    {
      id: 'vue-hosting-ci',
      title: 'Hosting and Continuous Integration',
      blocks: [
        { type: 'text', value: 'Netlify, Vercel, Cloudflare Pages and GitHub Pages host Vue apps for free. Connect your repository; every push builds and deploys, and pull requests get preview links.' },
        { type: 'code', lang: 'text', value: `# netlify.toml: SPA fallback so /courses/vue does not 404
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200` },
        { type: 'code', lang: 'text', value: `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npx vue-tsc --noEmit     # type-check .vue files
      - run: npm run test:unit -- --run
      - run: npm run build` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'deploy', q: 'Which environment variables are exposed to Vue app code by Vite?', options: ['All', 'Only ones prefixed with VITE_', 'None', 'Only NODE_ENV'], answer: 1, explain: 'Read them with import.meta.env.' },
    { chapterId: 'deploy', q: 'Why does a Vue SPA need a redirect rule to index.html?', options: ['For HTTPS', 'So deep links load the app instead of a 404', 'For images', 'For CSS'], answer: 1, explain: 'Vue Router handles the URL after index.html loads.' },
    { chapterId: 'deploy', q: 'Which command type-checks .vue files in CI?', options: ['vue-tsc --noEmit', 'npm run dev', 'tsc --watch', 'vite preview'], answer: 0, explain: 'Plain tsc does not understand .vue files.' },
  ],
};
