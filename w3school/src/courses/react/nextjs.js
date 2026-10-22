// React chapter: Next.js Deep Dive. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'nextjs',
  title: 'Next.js Deep Dive',
  description: 'File routing, caching, Server Actions and SEO',
  icon: 'dns',
  lessons: [
    {
      id: 'react-next-routing',
      title: 'App Router: Files, Layouts and Loading States',
      blocks: [
        { type: 'text', value: 'In Next.js, folders inside app/ become URLs. Special file names give each route its page, shared layout, loading UI and error UI, with no router configuration.' },
        { type: 'code', lang: 'text', value: `app/
├── layout.jsx            root layout: <html>, <body>, navbar (shared by all pages)
├── page.jsx              /
├── courses/
│   ├── page.jsx          /courses
│   ├── loading.jsx       shown while the page loads (automatic Suspense)
│   ├── error.jsx         shown if the page throws (automatic error boundary)
│   └── [slug]/
│       └── page.jsx      /courses/html, /courses/css ... (dynamic segment)
└── (auth)/               route group: organizes files, not part of the URL
    └── login/page.jsx    /login` },
        { type: 'code', lang: 'jsx', value: `// app/courses/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();                  // renders app/not-found.jsx

  return (
    <article>
      <h1>{course.title}</h1>
      {course.lessons.map(l => (
        <Link key={l.id} href={'/courses/' + slug + '/' + l.id}>{l.title}</Link>
      ))}
    </article>
  );
}` },
        { type: 'note', value: 'Layouts do not re-render when you navigate between their child pages, so state in a layout (like an open sidebar) is preserved.' },
      ],
    },
    {
      id: 'react-next-data',
      title: 'Data Fetching and Caching',
      blocks: [
        { type: 'text', value: 'Server Components fetch data directly with async/await. You decide how fresh the data must be: built once (static), refreshed every few minutes (revalidated), or fetched on every request (dynamic).' },
        { type: 'code', lang: 'jsx', value: `// Static: fetched at build time, served instantly from a CDN
const res = await fetch('https://api.codenest.app/courses', { cache: 'force-cache' });

// Revalidate: regenerate at most once every 10 minutes
const res2 = await fetch('https://api.codenest.app/courses', { next: { revalidate: 600 } });

// Dynamic: fresh on every request (dashboards, personalized pages)
const res3 = await fetch('https://api.codenest.app/me/progress', { cache: 'no-store' });

// Pre-build every course page at build time
export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map(c => ({ slug: c.slug }));
}` },
        { type: 'list', items: [
          'Fetch in parallel with Promise.all to avoid waterfalls.',
          'Stream slow parts with <Suspense> so the rest of the page appears immediately.',
          'Use revalidatePath or revalidateTag after a mutation to refresh cached pages.',
        ] },
      ],
    },
    {
      id: 'react-server-actions',
      title: 'Server Actions',
      blocks: [
        { type: 'text', value: 'A Server Action is an async function marked "use server" that runs on the server but can be called from a form or a button. You can write to the database without building a separate API route.' },
        { type: 'code', lang: 'jsx', value: `// app/courses/[slug]/actions.js
'use server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function enroll(courseId) {
  const session = await auth();
  if (!session) throw new Error('Please log in');          // always check on the server

  await db.enrollment.create({ data: { userId: session.user.id, courseId } });
  revalidatePath('/dashboard');                             // refresh cached pages
}` },
        { type: 'code', lang: 'jsx', value: `// app/courses/[slug]/EnrollButton.jsx
'use client';
import { useTransition } from 'react';
import { enroll } from './actions';

export function EnrollButton({ courseId }) {
  const [pending, startTransition] = useTransition();
  return (
    <button disabled={pending} onClick={() => startTransition(() => enroll(courseId))}>
      {pending ? 'Enrolling...' : 'Enroll for free'}
    </button>
  );
}` },
        { type: 'note', value: 'A Server Action is a public endpoint. Validate input (for example with Zod) and check permissions inside every action.' },
      ],
    },
    {
      id: 'react-next-seo',
      title: 'Metadata, SEO and Images',
      blocks: [
        { type: 'text', value: 'Because Next.js renders HTML on the server, search engines and link previews see real content. The Metadata API sets title, description and Open Graph tags per page.' },
        { type: 'code', lang: 'jsx', value: `// Static metadata
export const metadata = {
  title: 'CodeNest | Learn to code for free',
  description: 'HTML, CSS, JavaScript and React lessons with live examples.',
};

// Dynamic metadata for each course page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  return {
    title: 'Learn ' + course.title + ' | CodeNest',
    description: course.tagline,
    openGraph: { images: ['/og/' + slug + '.png'] },
  };
}` },
        { type: 'code', lang: 'jsx', value: `import Image from 'next/image';

// Automatically resized, lazy-loaded and served as WebP/AVIF
<Image src="/hero.jpg" alt="Students learning to code" width={1200} height={600} priority />` },
        { type: 'list', items: [
          'next/image: responsive, lazy images with no layout shift.',
          'next/font: self-hosted fonts with no flash of invisible text.',
          'app/sitemap.js and app/robots.js generate sitemap.xml and robots.txt.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'nextjs', q: 'Which file defines the page for the URL /courses in the App Router?', options: ['app/courses.jsx', 'app/courses/page.jsx', 'pages/courses/index.html', 'app/routes.js'], answer: 1, explain: 'Folders are URL segments; page.jsx is the page.' },
    { chapterId: 'nextjs', q: 'What does loading.jsx do?', options: ['Loads CSS', 'Shows a loading UI while the route\'s content loads', 'Preloads images', 'Runs tests'], answer: 1, explain: 'Next.js wraps the page in Suspense with it as the fallback.' },
    { chapterId: 'nextjs', q: 'What does { next: { revalidate: 600 } } on a fetch mean?', options: ['Retry 600 times', 'Cached data may be refreshed at most every 600 seconds', 'Timeout after 600 ms', 'Never cache'], answer: 1, explain: 'This is incremental static regeneration.' },
    { chapterId: 'nextjs', q: 'What must every Server Action do?', options: ['Return JSX', 'Validate input and check permissions on the server', 'Use useState', 'Run in the browser'], answer: 1, explain: 'Actions are callable endpoints; treat their input as untrusted.' },
  ],
};
