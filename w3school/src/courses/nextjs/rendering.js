// Next.js chapter: Rendering Strategies.

export default {
  id: 'rendering',
  title: 'Rendering Strategies',
  description: 'Static, dynamic, revalidated and streamed pages',
  icon: 'view-quilt',
  lessons: [
    {
      id: 'nx-static-dynamic',
      title: 'Static versus dynamic',
      blocks: [
        { type: 'text', value: 'A static route is rendered once at build time and served from a CDN, which is the fastest option. A dynamic route is rendered for each request, which is needed for personal or live data. Next.js chooses automatically based on what the page uses.' },
        { type: 'list', items: [
          'Static: no cookies, no request headers, no uncached fresh data',
          'Dynamic: reads cookies(), headers() or searchParams, or uses no-store fetch',
          'Static pages are cheap to serve and easy to cache',
          'Dynamic pages are always current but cost server time per request',
        ] },
        { type: 'note', value: 'Reading the cookie or the request header anywhere in a page makes that page dynamic. Move personal parts into a small component when you want the rest of the page to stay static.' },
      ],
    },
    {
      id: 'nx-isr',
      title: 'Incremental static regeneration',
      blocks: [
        { type: 'text', value: 'Incremental static regeneration serves a cached page and rebuilds it in the background after a set time. Users get a fast page, and the content is never older than your chosen revalidate window.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// Page-level revalidation: regenerate at most every 5 minutes
export const revalidate = 300;

export default async function CoursesPage() {
  const courses = await getCourses();
  return <CourseGrid courses={courses} />;
}` },
        { type: 'note', value: 'ISR is great for blogs, course catalogs and product pages. For a live stock price or a chat, use dynamic rendering instead.' },
      ],
    },
    {
      id: 'nx-streaming',
      title: 'Streaming with Suspense',
      blocks: [
        { type: 'text', value: 'Streaming sends the page in parts. The shell and fast content arrive first, and a slow section fills in when its data is ready. A loading.tsx file or a Suspense boundary marks where the fallback appears.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `import { Suspense } from 'react';
import { RecommendedCourses } from './RecommendedCourses';

export default function Dashboard() {
  return (
    <main>
      <h1>Your dashboard</h1>
      <Suspense fallback={<p>Loading recommendations...</p>}>
        <RecommendedCourses />
      </Suspense>
    </main>
  );
}` },
        { type: 'list', items: [
          'The heading appears immediately',
          'Only the slow component waits',
          'Several boundaries load independently',
          'Good for pages that mix fast and slow data',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'rendering',
      q: 'Which page is usually the fastest to serve?',
      options: ['A static page from the CDN', 'A dynamic page per request', 'A page with a database call per visit', 'A page with no HTML'],
      answer: 0,
      explain: 'Pre-rendered static pages are cached and served quickly.',
    },
    {
      chapterId: 'rendering',
      q: 'What makes a route dynamic?',
      options: ['Using a CSS file', 'Reading cookies, headers or using no-store fetch', 'Having a layout', 'Using a font'],
      answer: 1,
      explain: 'Request-specific data forces per-request rendering.',
    },
    {
      chapterId: 'rendering',
      q: 'What does ISR do?',
      options: ['Rebuilds only on deploy', 'Serves a cached page and refreshes it in the background', 'Removes caching', 'Runs tests'],
      answer: 1,
      explain: 'Incremental static regeneration refreshes stale pages after a window.',
    },
    {
      chapterId: 'rendering',
      q: 'What does a Suspense boundary do?',
      options: ['Blocks the whole page', 'Shows a fallback while one part loads', 'Deletes errors', 'Caches the database'],
      answer: 1,
      explain: 'Streaming lets fast parts appear before slow ones.',
    },
  ],
};
