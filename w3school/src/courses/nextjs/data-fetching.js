// Next.js chapter: Data Fetching and Caching.

export default {
  id: 'data-fetching',
  title: 'Data Fetching & Caching',
  description: 'fetch on the server, revalidation and parallel requests',
  icon: 'cloud-download',
  lessons: [
    {
      id: 'nx-fetch-server',
      title: 'Fetching data on the server',
      blocks: [
        { type: 'text', value: 'Server Components fetch data directly with async and await. There is no useEffect and no loading state to manage by hand: the page waits for the data on the server, then sends the result.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/courses/page.tsx
type Course = { id: number; title: string };

export default async function CoursesPage() {
  const res = await fetch('https://api.codenest.app/courses');
  if (!res.ok) throw new Error('Could not load courses');
  const courses: Course[] = await res.json();

  return (
    <ul>
      {courses.map(c => <li key={c.id}>{c.title}</li>)}
    </ul>
  );
}` },
        { type: 'note', value: 'Throwing inside a Server Component shows the nearest error.tsx. Show a friendly message there instead of a blank page.' },
      ],
    },
    {
      id: 'nx-caching-revalidate',
      title: 'Caching and revalidation',
      blocks: [
        { type: 'text', value: 'Decide how fresh each piece of data must be. Static data can be cached for a long time. Personal data should not be cached at all. Next.js 15 and later do not cache fetch by default, so caching is an explicit choice.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// Refresh at most every 10 minutes
const courses = await fetch('https://api.codenest.app/courses', {
  next: { revalidate: 600 },
});

// Never cache: fresh on every request
const me = await fetch('https://api.codenest.app/me', {
  cache: 'no-store',
});

// Tag the data so you can refresh it on demand
const lessons = await fetch('https://api.codenest.app/lessons', {
  next: { tags: ['lessons'] },
});` },
        { type: 'list', items: [
          'revalidate: N - refresh in the background after N seconds',
          'no-store - never cache, use for user-specific data',
          'tags - refresh a group with revalidateTag after a change',
          'revalidatePath - refresh one route after a change',
        ] },
        { type: 'note', value: 'Cache rules changed between major versions. Check the docs for your installed version before you rely on a default.' },
      ],
    },
    {
      id: 'nx-parallel-static',
      title: 'Parallel fetching and static params',
      blocks: [
        { type: 'text', value: 'Sequential awaits create a waterfall: each request waits for the previous one. Start independent requests together with Promise.all. For dynamic routes, generateStaticParams builds known pages ahead of time.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// Sequential: total time is the sum of both requests
const course = await getCourse(slug);
const reviews = await getReviews(slug);

// Parallel: total time is the slower of the two
const [course2, reviews2] = await Promise.all([
  getCourse(slug),
  getReviews(slug),
]);

// Pre-build every course page at build time
export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map(c => ({ slug: c.slug }));
}` },
        { type: 'note', value: 'Stream slow parts with Suspense. The rest of the page appears immediately while the slow section loads.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'data-fetching',
      q: 'Where does fetch run in a Server Component?',
      options: ['In the browser only', 'On the server, before the HTML is sent', 'In a Service Worker', 'In the CSS file'],
      answer: 1,
      explain: 'The data is ready before the page reaches the browser.',
    },
    {
      chapterId: 'data-fetching',
      q: 'What does { next: { revalidate: 600 } } mean?',
      options: ['Retry 600 times', 'Refresh the cached data at most every 600 seconds', 'Timeout after 600 ms', 'Never cache'],
      answer: 1,
      explain: 'This is incremental static regeneration.',
    },
    {
      chapterId: 'data-fetching',
      q: 'Why use Promise.all for independent requests?',
      options: ['It caches the results forever', 'It runs them in parallel instead of a waterfall', 'It skips errors', 'It avoids the server'],
      answer: 1,
      explain: 'Total time becomes the slowest request, not the sum.',
    },
    {
      chapterId: 'data-fetching',
      q: 'Which option suits personal data such as a dashboard?',
      options: ['revalidate: 60', 'cache: no-store', 'force-cache forever', 'tags only'],
      answer: 1,
      explain: 'Per-user data should not be shared through a cache.',
    },
  ],
};
