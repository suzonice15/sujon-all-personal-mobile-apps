// React chapter: Modern React and Next.js. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'modern-react',
  title: 'Modern React and Next.js',
  description: 'React 19 features, Server Components and frameworks',
  icon: 'new-releases',
  lessons: [
    {
      id: 'react-19-actions',
      title: 'React 19: Actions and Form Hooks',
      blocks: [
        { type: 'text', value: 'React 19 makes async work in forms much simpler. A form\'s action can be an async function; React tracks the pending state and errors for you.' },
        { type: 'code', lang: 'jsx', value: `import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

async function subscribe(previousState, formData) {
  const email = formData.get('email');
  if (!email.includes('@')) return { error: 'Invalid email' };
  await api.subscribe(email);
  return { success: 'Subscribed!' };
}

function SubmitButton() {
  const { pending } = useFormStatus();          // knows if the parent form is submitting
  return <button disabled={pending}>{pending ? 'Sending...' : 'Subscribe'}</button>;
}

export function Newsletter() {
  const [state, formAction] = useActionState(subscribe, {});
  return (
    <form action={formAction}>
      <input name="email" placeholder="you@example.com" />
      <SubmitButton />
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p>{state.success}</p>}
    </form>
  );
}` },
        { type: 'heading', value: 'useOptimistic' },
        { type: 'code', lang: 'jsx', value: `const [optimisticLikes, addOptimisticLike] = useOptimistic(likes, (current, amount) => current + amount);

async function like() {
  addOptimisticLike(1);          // shown immediately
  await api.like(postId);        // real request; reverts automatically if it fails
}` },
        { type: 'note', value: 'These hooks need React 19. The Try it preview in this app runs React 18, so these examples are for reading.' },
      ],
    },
    {
      id: 'react-use-hook',
      title: 'The use() API and Suspense for Data',
      blocks: [
        { type: 'text', value: 'React 19\'s use() reads the value of a promise or a context. Unlike other hooks, it can be called inside conditions. When it reads a pending promise, the nearest Suspense boundary shows its fallback until the data arrives.' },
        { type: 'code', lang: 'jsx', value: `import { use, Suspense } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);     // suspends until resolved
  return comments.map(c => <p key={c.id}>{c.text}</p>);
}

export function Post({ id }) {
  const commentsPromise = fetchComments(id);  // start fetching early (ideally cached)
  return (
    <article>
      <PostBody id={id} />
      <Suspense fallback={<p>Loading comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </article>
  );
}` },
        { type: 'note', value: 'Promises passed to use() must be cached (created by a framework or a data library), not created fresh on every render.' },
      ],
    },
    {
      id: 'react-server-components',
      title: 'Server Components and Next.js',
      blocks: [
        { type: 'text', value: 'React Server Components run only on the server. They can read a database or files directly and send finished UI to the browser with zero JavaScript for that part. Client Components (marked with "use client") handle interactivity. Next.js is the most popular framework that supports them.' },
        { type: 'code', lang: 'text', value: `npx create-next-app@latest my-site` },
        { type: 'code', lang: 'jsx', value: `// app/courses/page.jsx  →  URL /courses (file-based routing)
// A Server Component by default: runs on the server, can be async.
import { db } from '@/lib/db';
import { EnrollButton } from './EnrollButton';

export default async function CoursesPage() {
  const courses = await db.course.findMany();   // direct database access, no API needed
  return (
    <main>
      {courses.map(c => (
        <div key={c.id}>
          <h2>{c.title}</h2>
          <EnrollButton courseId={c.id} />
        </div>
      ))}
    </main>
  );
}` },
        { type: 'code', lang: 'jsx', value: `// app/courses/EnrollButton.jsx
'use client';                     // interactive: runs in the browser
import { useState } from 'react';

export function EnrollButton({ courseId }) {
  const [enrolled, setEnrolled] = useState(false);
  return <button onClick={() => setEnrolled(true)}>{enrolled ? 'Enrolled ✓' : 'Enroll'}</button>;
}` },
        { type: 'list', items: [
          'Server Components: data fetching, secrets, large libraries that should not reach the browser.',
          'Client Components: state, effects, event handlers, browser APIs.',
          'Benefits: faster first load, better SEO, less JavaScript on phones.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'modern-react', q: 'In React 19, what can a form\'s action prop be?', options: ['Only a URL', 'An async function', 'A CSS class', 'A component'], answer: 1, explain: 'React manages pending state and results for async actions.' },
    { chapterId: 'modern-react', q: 'Which hook shows whether the parent form is submitting?', options: ['useFormStatus', 'useState', 'useSubmit', 'useForm'], answer: 0, explain: 'useFormStatus comes from react-dom.' },
    { chapterId: 'modern-react', q: 'What marks a component as a Client Component in Next.js?', options: ['"use server"', '"use client" at the top of the file', 'A .client.js extension', 'export client'], answer: 1, explain: 'Without it, components in the app folder are Server Components.' },
    { chapterId: 'modern-react', q: 'What can Server Components do that Client Components cannot?', options: ['Use useState', 'Handle clicks', 'Read a database directly and ship no JavaScript for that part', 'Use browser APIs'], answer: 2, explain: 'They run only on the server.' },
  ],
};
