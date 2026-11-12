// Next.js chapter: Server Actions and Forms.

export default {
  id: 'server-actions',
  title: 'Server Actions & Forms',
  description: 'Write data from forms without a separate API route',
  icon: 'edit-note',
  lessons: [
    {
      id: 'nx-server-action',
      title: 'Your first Server Action',
      blocks: [
        { type: 'text', value: 'A Server Action is an async function marked "use server". It runs on the server, but a form or button can call it directly. You can write to the database without building a separate endpoint.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/courses/actions.ts
'use server';

import { db } from '@/lib/db';

export async function createNote(formData: FormData) {
  const text = String(formData.get('text') ?? '').trim();
  if (!text) return;

  await db.note.create({ data: { text } });
}` },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/courses/NoteForm.tsx
import { createNote } from './actions';

export function NoteForm() {
  return (
    <form action={createNote}>
      <input name="text" required />
      <button type="submit">Save</button>
    </form>
  );
}` },
        { type: 'note', value: 'The form works even before JavaScript loads, because it is a normal HTML form submission. That is progressive enhancement.' },
      ],
    },
    {
      id: 'nx-action-validation',
      title: 'Validating and checking permissions',
      blocks: [
        { type: 'text', value: 'A Server Action is a public endpoint: anyone can call it with any input. Validate every field on the server and check the user is allowed to do the action.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

const schema = z.object({
  courseId: z.coerce.number().int().positive(),
});

export async function enroll(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Please log in first');

  const parsed = schema.safeParse({ courseId: formData.get('courseId') });
  if (!parsed.success) return { error: 'Invalid course' };

  await db.enrollment.create({
    data: { userId: session.user.id, courseId: parsed.data.courseId },
  });
  revalidatePath('/dashboard');
  return { ok: true };
}` },
        { type: 'note', value: 'Never trust a hidden input or a disabled button. The check that matters always runs inside the action on the server.' },
      ],
    },
    {
      id: 'nx-pending-state',
      title: 'Pending state and errors',
      blocks: [
        { type: 'text', value: 'useActionState connects an action to a form and gives you the last result and a pending flag. useFormStatus shows a pending state from inside a child submit button.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `'use client';

import { useActionState } from 'react';
import { enroll } from './actions';

export function EnrollForm({ courseId }: { courseId: number }) {
  const [state, formAction, pending] = useActionState(enroll, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="courseId" value={courseId} />
      <button disabled={pending}>{pending ? 'Enrolling...' : 'Enroll free'}</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}` },
        { type: 'list', items: [
          'Return a result object for expected errors such as validation',
          'Throw only for unexpected errors, which go to error.tsx',
          'Keep action arguments serializable',
          'Use revalidatePath or revalidateTag after a write',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'server-actions',
      q: 'What marks a function as a Server Action?',
      options: ['"use client"', '"use server"', '"use strict"', 'export default'],
      answer: 1,
      explain: '"use server" makes the function callable from forms and buttons.',
    },
    {
      chapterId: 'server-actions',
      q: 'Why must an action validate its input?',
      options: ['Because it is slow', 'Because it is a public endpoint anyone can call', 'Because forms require it', 'It is optional for speed'],
      answer: 1,
      explain: 'Treat all action input as untrusted.',
    },
    {
      chapterId: 'server-actions',
      q: 'What does revalidatePath do after a write?',
      options: ['Deletes the database', 'Refreshes cached data for that route', 'Restarts the server', 'Adds a new route'],
      answer: 1,
      explain: 'It makes the next render show the new data.',
    },
    {
      chapterId: 'server-actions',
      q: 'Which hook gives the pending flag and last result for a form action?',
      options: ['useEffect', 'useActionState', 'useMemo', 'useRef'],
      answer: 1,
      explain: 'useActionState returns the state, the action and a pending flag.',
    },
  ],
};
