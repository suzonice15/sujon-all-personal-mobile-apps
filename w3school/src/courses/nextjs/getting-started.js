// Next.js chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Next.js is, create-next-app and the project structure',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'nx-what-is-nextjs',
      title: 'What is Next.js?',
      blocks: [
        { type: 'text', value: 'Next.js is a full-stack framework built on React. It adds file-based routing, server rendering, data fetching on the server, API endpoints, image and font optimization, and a production build with one command.' },
        { type: 'list', items: [
          'React gives you components and state',
          'Next.js gives you routing, rendering and the server',
          'Pages can be built ahead of time, rendered per request, or both',
          'Server code and browser code live in the same project',
          'Vercel made it, but it runs on any Node.js host or in Docker',
        ] },
        { type: 'note', value: 'Next.js is the right choice when you need SEO, fast first loads, a backend next to the UI, or one codebase for pages and APIs. A small single-page tool may not need it.' },
      ],
    },
    {
      id: 'nx-create-app',
      title: 'Create your first app',
      blocks: [
        { type: 'text', value: 'create-next-app sets up a project with TypeScript, ESLint and the App Router. Start the dev server, then open the address it prints.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npx create-next-app@latest codenest-web
cd codenest-web
npm run dev

# Production build and run
npm run build
npm run start` },
        { type: 'note', value: 'Answer yes to the App Router and TypeScript prompts. The App Router is the modern default and this course uses it throughout.' },
      ],
    },
    {
      id: 'nx-project-structure',
      title: 'Project structure',
      blocks: [
        { type: 'text', value: 'The app folder is the heart of the App Router. Each folder is a URL segment, and special file names describe what the page needs.' },
        { type: 'code', lang: 'text', tryIt: false, value: `codenest-web/
  app/
    layout.tsx        root layout, wraps every page
    page.tsx          the home page at /
    globals.css
    courses/
      page.tsx        /courses
  public/             static files served as-is (/logo.svg)
  next.config.ts      framework configuration
  package.json` },
        { type: 'list', items: [
          'page.tsx makes a route publicly reachable',
          'layout.tsx wraps child pages and keeps its state across navigation',
          'public/ files are served from the root URL',
          'Code outside app/ is only imported, never routed',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does Next.js add on top of React?',
      options: ['A database engine', 'Routing, server rendering and server code', 'A CSS framework only', 'A mobile runtime'],
      answer: 1,
      explain: 'Next.js is a full-stack framework that builds on React.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which command starts the development server?',
      options: ['npm run build', 'npm run dev', 'npm run test', 'npm init'],
      answer: 1,
      explain: 'npm run dev starts a hot-reloading development server.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which file in app/ makes a route publicly reachable?',
      options: ['layout.tsx', 'page.tsx', 'globals.css', 'next.config.ts'],
      answer: 1,
      explain: 'A page file is what makes a folder a route.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is public/ used for?',
      options: ['Server-only secrets', 'Static files served from the root URL', 'Database migrations', 'Unit tests'],
      answer: 1,
      explain: 'Files in public/ are served as-is, such as /logo.svg.',
    },
  ],
};
