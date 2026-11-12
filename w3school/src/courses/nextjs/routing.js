// Next.js chapter: Routing with the App Router.

export default {
  id: 'routing',
  title: 'App Router',
  description: 'Folders as URLs, layouts, dynamic segments and navigation',
  icon: 'alt-route',
  lessons: [
    {
      id: 'nx-file-routes',
      title: 'File-based routes',
      blocks: [
        { type: 'text', value: 'Folders inside app/ become URL segments. A page.tsx file inside a folder makes that URL render. No router configuration is needed.' },
        { type: 'code', lang: 'text', tryIt: false, value: `app/
  page.tsx                 /
  about/page.tsx           /about
  courses/page.tsx         /courses
  courses/html/page.tsx    /courses/html` },
        { type: 'note', value: 'A folder without a page.tsx is not a route. It can still hold components, helpers and nested routes.' },
      ],
    },
    {
      id: 'nx-layouts-loading',
      title: 'Layouts, loading and error files',
      blocks: [
        { type: 'text', value: 'Special files wrap a route. A layout shares UI across child pages, loading.tsx shows while a page waits for data, and error.tsx catches errors in that segment.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>CodeNest</nav>
        {children}
      </body>
    </html>
  );
}` },
        { type: 'list', items: [
          'layout.tsx - shared UI that keeps state between child pages',
          'loading.tsx - instant fallback while the page streams in',
          'error.tsx - error boundary; must be a Client Component',
          'not-found.tsx - shown when notFound() is called',
        ] },
        { type: 'note', value: 'Layouts do not re-render when you move between their child pages. An open sidebar or a playing video in a layout keeps its state.' },
      ],
    },
    {
      id: 'nx-dynamic-routes',
      title: 'Dynamic routes and navigation',
      blocks: [
        { type: 'text', value: 'A folder name in square brackets is a dynamic segment. Read it from params. In Next.js 15 and later, params is a Promise, so await it. Use Link for client-side navigation.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/courses/[slug]/page.tsx  ->  /courses/html, /courses/css, ...
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  return (
    <article>
      <h1>{course.title}</h1>
      <Link href={\`/courses/\${slug}/start\`}>Start learning</Link>
    </article>
  );
}` },
        { type: 'list', items: [
          '[slug] - one segment, such as /courses/html',
          '[...parts] - catch-all, matches /docs/a/b/c',
          '[[...parts]] - optional catch-all, also matches /docs',
          'Route groups (auth) organize folders without changing the URL',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'routing',
      q: 'Which file makes a folder inside app/ render as a route?',
      options: ['index.tsx', 'page.tsx', 'route.ts', 'main.tsx'],
      answer: 1,
      explain: 'page.tsx is the UI for the route segment.',
    },
    {
      chapterId: 'routing',
      q: 'What does a layout keep between child pages?',
      options: ['Nothing, it resets each time', 'Its state, because it does not re-render on navigation', 'Only the URL', 'The database connection'],
      answer: 1,
      explain: 'Layouts persist across navigation between their children.',
    },
    {
      chapterId: 'routing',
      q: 'In Next.js 15 and later, how do you read dynamic params?',
      options: ['params.slug directly', 'await params first', 'useParams in a server page', 'window.location'],
      answer: 1,
      explain: 'params is a Promise in the App Router and must be awaited.',
    },
    {
      chapterId: 'routing',
      q: 'What does a route group like (auth) do?',
      options: ['Adds /auth to the URL', 'Organizes folders without changing the URL', 'Blocks access', 'Creates an API'],
      answer: 1,
      explain: 'Parentheses group files; they do not appear in the URL.',
    },
  ],
};
