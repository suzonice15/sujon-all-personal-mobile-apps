// React chapter: TypeScript and Testing. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'typescript-testing',
  title: 'TypeScript and Testing',
  description: 'Type-safe components, unit, API-mocked and end-to-end tests',
  icon: 'verified',
  lessons: [
    {
      id: 'react-typescript',
      title: 'React with TypeScript',
      blocks: [
        { type: 'text', value: 'Most professional React code is written in TypeScript. Types catch mistakes such as missing props or wrong data shapes before you even run the app, and give your editor excellent autocomplete. Create a project with the react-ts template.' },
        { type: 'code', lang: 'text', value: `npm create vite@latest my-app -- --template react-ts` },
        { type: 'code', lang: 'jsx', value: `// CourseCard.tsx
type Course = {
  id: string;
  title: string;
  lessons: number;
  level?: 'beginner' | 'advanced';   // optional, limited values
};

type CourseCardProps = {
  course: Course;
  onOpen: (id: string) => void;
  children?: React.ReactNode;
};

export function CourseCard({ course, onOpen, children }: CourseCardProps) {
  return (
    <div onClick={() => onOpen(course.id)}>
      <h3>{course.title}</h3>
      <p>{course.lessons} lessons {course.level && '· ' + course.level}</p>
      {children}
    </div>
  );
}

// <CourseCard course={{ id: 'html', title: 'HTML' }} />
// ❌ Error: property 'lessons' is missing, and 'onOpen' is required` },
        { type: 'heading', value: 'Typing hooks and events' },
        { type: 'code', lang: 'jsx', value: `const [user, setUser] = useState<User | null>(null);
const inputRef = useRef<HTMLInputElement>(null);

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setQuery(e.target.value);
}` },
        { type: 'note', value: 'TypeScript will be a full course of its own later. For React you mostly need prop types, union types and a few event types.' },
      ],
    },
    {
      id: 'react-testing-library',
      title: 'Testing with React Testing Library',
      blocks: [
        { type: 'text', value: 'React Testing Library tests components the way users use them: find elements by their visible text or role, interact, and check what appears. Run it with Vitest or Jest.' },
        { type: 'code', lang: 'jsx', value: `// Counter.jsx
export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </>
  );
}` },
        { type: 'code', lang: 'jsx', value: `// Counter.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('increments when the button is clicked', async () => {
  render(<Counter />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /increment/i }));

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});` },
        { type: 'list', items: [
          'Prefer getByRole and getByLabelText: they also prove your UI is accessible.',
          'Use findBy... (async) for things that appear after loading.',
          'Mock network calls (for example with MSW) instead of hitting real servers.',
          'Test behavior, not implementation: do not check state variables directly.',
        ] },
      ],
    },
    {
      id: 'react-ts-generics',
      title: 'Generic Components and Advanced Types',
      blocks: [
        { type: 'text', value: 'A generic component works with any data type while staying type-safe. A reusable List or Select should know the exact shape of its items.' },
        { type: 'code', lang: 'jsx', value: `type ListProps<T> = {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
  emptyText?: string;
};

export function List<T>({ items, getKey, renderItem, emptyText = 'Nothing here' }: ListProps<T>) {
  if (items.length === 0) return <p>{emptyText}</p>;
  return <ul>{items.map(item => <li key={getKey(item)}>{renderItem(item)}</li>)}</ul>;
}

// T is inferred as Course: renderItem gets full autocomplete for course fields
<List items={courses} getKey={c => c.id} renderItem={c => c.title} />` },
        { type: 'heading', value: 'Discriminated unions for component states' },
        { type: 'code', lang: 'jsx', value: `type FetchState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: T };

function render(state: FetchState<User[]>) {
  switch (state.status) {
    case 'loading': return <Spinner />;
    case 'error': return <p>{state.error}</p>;        // TypeScript knows error exists here
    case 'success': return <UserList users={state.data} />;
  }
}` },
        { type: 'note', value: 'Discriminated unions make impossible states impossible: you can never have data and an error at the same time.' },
      ],
    },
    {
      id: 'react-msw-hooks',
      title: 'Mocking APIs with MSW and Testing Hooks',
      blocks: [
        { type: 'text', value: 'Mock Service Worker (MSW) intercepts network requests in tests and returns fake responses. Your components use their real fetch code, so tests stay realistic.' },
        { type: 'code', lang: 'jsx', value: `import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { CourseList } from './CourseList';

const server = setupServer(
  http.get('/api/courses', () => HttpResponse.json([{ id: 1, title: 'React' }])),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('shows courses from the API', async () => {
  render(<CourseList />);
  expect(await screen.findByText('React')).toBeInTheDocument();
});

test('shows an error when the API fails', async () => {
  server.use(http.get('/api/courses', () => new HttpResponse(null, { status: 500 })));
  render(<CourseList />);
  expect(await screen.findByRole('alert')).toHaveTextContent(/could not load/i);
});` },
        { type: 'heading', value: 'Testing a custom hook' },
        { type: 'code', lang: 'jsx', value: `import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(5));
  act(() => result.current.increment());
  expect(result.current.count).toBe(6);
});` },
      ],
    },
    {
      id: 'react-e2e-playwright',
      title: 'End-to-End Testing with Playwright',
      blocks: [
        { type: 'text', value: 'End-to-end (E2E) tests open a real browser, click through the app like a user and check the result. They catch problems that unit tests miss, such as broken routing or a misconfigured API URL.' },
        { type: 'code', lang: 'text', value: `npm init playwright@latest
npx playwright test        # run all E2E tests
npx playwright test --ui   # watch them run step by step` },
        { type: 'code', lang: 'jsx', value: `// e2e/signup.spec.js
import { test, expect } from '@playwright/test';

test('a new student can sign up and see the dashboard', async ({ page }) => {
  await page.goto('/signup');
  await page.getByLabel('Email').fill('new@student.com');
  await page.getByLabel('Password').fill('Codenest2026');
  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
});` },
        { type: 'list', items: [
          'Keep E2E tests few and focused on critical journeys: sign up, log in, checkout.',
          'Most tests should be fast unit and component tests (the testing pyramid).',
          'Run E2E tests in CI against a preview deployment before release.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'typescript-testing', q: 'What is the main benefit of TypeScript in React?', options: ['Faster rendering', 'Catching wrong or missing props before running the app', 'Smaller bundles', 'Automatic styling'], answer: 1, explain: 'Type errors show up in the editor and build.' },
    { chapterId: 'typescript-testing', q: 'What does level?: "beginner" | "advanced" mean?', options: ['Required string', 'Optional, and only one of those two values', 'An array', 'A number'], answer: 1, explain: '? makes it optional; | creates a union of allowed values.' },
    { chapterId: 'typescript-testing', q: 'How should React Testing Library find elements?', options: ['By CSS class names', 'Like a user would: by role, label or text', 'By component state', 'By internal variable names'], answer: 1, explain: 'Tests stay valid when implementation changes.' },
    { chapterId: 'typescript-testing', q: 'What does a generic component like List<T> give you?', options: ['Faster rendering', 'Reuse with any item type while keeping full type safety', 'Automatic styling', 'Server rendering'], answer: 1, explain: 'T is inferred from the items you pass.' },
    { chapterId: 'typescript-testing', q: 'What does MSW do in tests?', options: ['Renders components', 'Intercepts network requests and returns mock responses', 'Formats code', 'Deploys the app'], answer: 1, explain: 'Components keep their real fetch code.' },
    { chapterId: 'typescript-testing', q: 'Which kind of test should be the fewest?', options: ['Unit tests', 'Component tests', 'End-to-end tests', 'Type checks'], answer: 2, explain: 'E2E tests are slow; keep them for critical user journeys.' },
  ],
};
