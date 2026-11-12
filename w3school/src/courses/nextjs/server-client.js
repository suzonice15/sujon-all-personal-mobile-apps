// Next.js chapter: Server and Client Components.

export default {
  id: 'server-client',
  title: 'Server & Client Components',
  description: 'Where code runs and how to draw the boundary',
  icon: 'swap-horiz',
  lessons: [
    {
      id: 'nx-server-components',
      title: 'Server Components by default',
      blocks: [
        { type: 'text', value: 'In the App Router every component is a Server Component unless you opt out. Server Components run only on the server. They can read a database or files, and they send finished HTML to the browser with no JavaScript for that part.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/courses/page.tsx  (Server Component, no directive needed)
import { db } from '@/lib/db';

export default async function CoursesPage() {
  const courses = await db.course.findMany();   // runs on the server only

  return (
    <ul>
      {courses.map(c => <li key={c.id}>{c.title}</li>)}
    </ul>
  );
}` },
        { type: 'note', value: 'Secrets and database credentials stay on the server when you use them in a Server Component. The browser never receives the code that reads them.' },
      ],
    },
    {
      id: 'nx-client-components',
      title: 'Client Components for interactivity',
      blocks: [
        { type: 'text', value: 'Add "use client" at the top of a file to make it a Client Component. Use it for state, effects, event handlers and browser-only APIs.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/courses/LikeButton.tsx
'use client';

import { useState } from 'react';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? 'Liked' : 'Like'}
    </button>
  );
}` },
        { type: 'note', value: 'Put "use client" on the smallest component that needs it, not on the whole page. Keep the rest on the server.' },
      ],
    },
    {
      id: 'nx-boundary',
      title: 'The boundary and composition',
      blocks: [
        { type: 'text', value: 'A Server Component can render a Client Component and pass it serializable props, such as strings, numbers and plain objects. A Client Component cannot import a Server Component, but it can receive one as children.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// Server Component passes data down
export default async function CoursePage() {
  const course = await getCourse('html');
  return <LikeButton courseId={course.id} />;  // courseId is a plain number
}` },
        { type: 'list', items: [
          'Props crossing the boundary must be serializable',
          'Functions cannot be passed from a Server to a Client Component (except Server Actions)',
          'Use children to put server content inside a client wrapper',
          'Keep the client bundle small by moving logic to the server',
        ] },
        { type: 'note', value: 'Most bundle bloat comes from importing a big library into a Client Component by accident. Check what you import from "use client" files.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'server-client',
      q: 'Where does a Server Component run?',
      options: ['Only in the browser', 'Only on the server', 'In a Web Worker', 'In the database'],
      answer: 1,
      explain: 'Server Components run on the server and send rendered output.',
    },
    {
      chapterId: 'server-client',
      q: 'What does "use client" do?',
      options: ['Makes a file a database model', 'Turns a file into a Client Component', 'Blocks the server', 'Enables CSS'],
      answer: 1,
      explain: 'It opts a component into browser-side rendering and state.',
    },
    {
      chapterId: 'server-client',
      q: 'Which of these can you pass from a Server to a Client Component?',
      options: ['A database connection', 'A plain object with strings and numbers', 'An open file handle', 'A function reference'],
      answer: 1,
      explain: 'Props must be serializable to cross the boundary.',
    },
    {
      chapterId: 'server-client',
      q: 'Why put "use client" on the smallest component possible?',
      options: ['It is required on pages', 'It keeps the client JavaScript bundle small', 'It speeds up the database', 'It disables SEO'],
      answer: 1,
      explain: 'Only interactive parts need to ship JavaScript to the browser.',
    },
  ],
};
