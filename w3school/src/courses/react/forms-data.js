// React chapter: Forms and Data Fetching. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'forms-data',
  title: 'Forms and Data Fetching',
  description: 'Production forms and server data with TanStack Query',
  icon: 'cloud-sync',
  lessons: [
    {
      id: 'react-form-validation',
      title: 'Form Validation Done Right',
      blocks: [
        { type: 'text', value: 'Good forms show errors only after the user has touched a field, explain how to fix them, and disable submitting while a request is running.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

const rules = {
  name: v => (v.trim().length >= 2 ? '' : 'Name must be at least 2 characters'),
  email: v => (/^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$/i.test(v) ? '' : 'Enter a valid email'),
  password: v => (v.length >= 8 ? '' : 'Use at least 8 characters'),
};

export default function App() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');   // idle | sending | done

  const errors = Object.fromEntries(Object.entries(rules).map(([k, rule]) => [k, rule(values[k])]));
  const isValid = Object.values(errors).every(e => !e);

  const change = e => setValues({ ...values, [e.target.name]: e.target.value });
  const blur = e => setTouched({ ...touched, [e.target.name]: true });

  async function submit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!isValid) return;
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1000));   // pretend API call
    setStatus('done');
  }

  if (status === 'done') return <h3>🎉 Account created for {values.name}!</h3>;

  return (
    <form onSubmit={submit} noValidate>
      {['name', 'email', 'password'].map(field => (
        <div key={field} style={{ marginBottom: 10 }}>
          <input name={field} type={field === 'password' ? 'password' : 'text'} placeholder={field}
                 value={values[field]} onChange={change} onBlur={blur}
                 style={{ borderColor: touched[field] && errors[field] ? 'crimson' : '#cbd5e1' }} />
          {touched[field] && errors[field] && <div style={{ color: 'crimson', fontSize: 13 }}>{errors[field]}</div>}
        </div>
      ))}
      <button disabled={status === 'sending'}>{status === 'sending' ? 'Creating...' : 'Create account'}</button>
    </form>
  );
}` },
        { type: 'heading', value: 'In larger apps: React Hook Form + Zod' },
        { type: 'code', lang: 'jsx', value: `import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  age: z.coerce.number().min(18, 'You must be 18+'),
});

function Signup() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(data => api.signup(data))}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register('age')} />
      <button disabled={isSubmitting}>Sign up</button>
    </form>
  );
}` },
      ],
    },
    {
      id: 'react-tanstack-query',
      title: 'Server State with TanStack Query',
      blocks: [
        { type: 'text', value: 'Data from a server is different from UI state: it is shared, can become outdated, and needs loading and error handling. TanStack Query (React Query) handles caching, background refetching, retries and deduplication, replacing most fetch-in-useEffect code.' },
        { type: 'code', lang: 'jsx', value: `import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Courses />
    </QueryClientProvider>
  );
}

function Courses() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['courses'],                       // cache key
    queryFn: () => fetch('/api/courses').then(r => r.json()),
    staleTime: 60_000,                           // fresh for 1 minute
  });

  if (isPending) return <Spinner />;
  if (isError) return <p>Error: {error.message} <button onClick={refetch}>Retry</button></p>;
  return data.map(c => <CourseCard key={c.id} course={c} />);
}` },
        { type: 'list', items: [
          'Two components using the same queryKey share one request and one cache entry.',
          'Include parameters in the key: ["course", id]. A new id fetches and caches separately.',
          'Data refetches automatically when the user returns to the app.',
        ] },
      ],
    },
    {
      id: 'react-mutations',
      title: 'Mutations and Optimistic Updates',
      blocks: [
        { type: 'text', value: 'useMutation sends changes (create, update, delete). After success, invalidate related queries so they refetch. For a snappy feel, update the UI optimistically before the server responds, and roll back if it fails.' },
        { type: 'code', lang: 'jsx', value: `import { useMutation, useQueryClient } from '@tanstack/react-query';

function LikeButton({ post }) {
  const queryClient = useQueryClient();

  const like = useMutation({
    mutationFn: () => fetch('/api/posts/' + post.id + '/like', { method: 'POST' }),

    onMutate: async () => {                                  // optimistic update
      await queryClient.cancelQueries({ queryKey: ['post', post.id] });
      const previous = queryClient.getQueryData(['post', post.id]);
      queryClient.setQueryData(['post', post.id], old => ({ ...old, likes: old.likes + 1 }));
      return { previous };
    },
    onError: (err, vars, context) => {                       // roll back
      queryClient.setQueryData(['post', post.id], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['post', post.id] }),
  });

  return <button onClick={() => like.mutate()} disabled={like.isPending}>❤ {post.likes}</button>;
}` },
        { type: 'note', value: 'Optimistic updates make apps feel instant, which matters a lot on slow mobile networks.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'forms-data', q: 'When should a field\'s error message appear?', options: ['Immediately on page load', 'After the user has touched the field or tried to submit', 'Never', 'Only after a server error'], answer: 1, explain: 'Showing errors before the user types is frustrating.' },
    { chapterId: 'forms-data', q: 'What is a TanStack Query queryKey used for?', options: ['Authentication', 'Identifying and caching the data', 'Styling', 'Routing'], answer: 1, explain: 'Same key = same cached data shared between components.' },
    { chapterId: 'forms-data', q: 'What should you do after a successful mutation?', options: ['Reload the page', 'Invalidate related queries so they refetch', 'Clear localStorage', 'Nothing'], answer: 1, explain: 'invalidateQueries keeps lists in sync with the server.' },
    { chapterId: 'forms-data', q: 'What is an optimistic update?', options: ['Updating the UI before the server confirms, rolling back on error', 'Retrying forever', 'Caching images', 'A type of test'], answer: 0, explain: 'It makes the app feel instant.' },
  ],
};
