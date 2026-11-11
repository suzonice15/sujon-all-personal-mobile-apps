// TypeScript chapter: TypeScript with React.

export default {
  id: 'ts-with-react',
  title: 'TypeScript with React',
  description: 'Type props, state, events and children correctly',
  icon: 'widgets',
  lessons: [
    {
      id: 'ts-react-props',
      title: 'Typing props',
      blocks: [
        { type: 'text', value: 'A component is a function. Type its props object and TypeScript checks every usage of the component across the app, including missing and misspelled props.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `type HeaderProps = {
  title: string;
  count?: number;
};

function headerLabel({ title, count = 0 }: HeaderProps): string {
  return title + ' (' + count + ')';
}

console.log(headerLabel({ title: 'Lessons' }));
console.log(headerLabel({ title: 'Lessons', count: 12 }));` },
        { type: 'text', value: 'Give default values with destructuring. That keeps the prop optional for the caller while the component body sees a real value.' },
        { type: 'note', value: 'Do not type props as any to silence an error. The error usually means the parent is passing the wrong shape, and that is exactly the bug types should catch.' },
      ],
    },
    {
      id: 'ts-react-state',
      title: 'Typing state',
      blocks: [
        { type: 'text', value: 'useState<T> declares the state type. If the initial value is null, give the generic explicitly so later updates are still checked.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// A number counter
const [count, setCount] = useState<number>(0);

// Data that starts empty and is filled later
type Course = { id: number; title: string };
const [courses, setCourses] = useState<Course[]>([]);

// A value that may be missing until loading finishes
const [selected, setSelected] = useState<Course | null>(null);` },
        { type: 'text', value: 'State should hold the smallest data that cannot be calculated. Derived values such as totals and filtered lists are calculated during render, not stored.' },
        { type: 'note', value: 'With strictNullChecks, calling selected.title before checking selected is null is a compile error. That forces you to handle the loading state.' },
      ],
    },
    {
      id: 'ts-react-events',
      title: 'Typing events and handlers',
      blocks: [
        { type: 'text', value: 'React provides event types such as ChangeEvent, MouseEvent and FormEvent. Import them from React and annotate the handler parameter.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `import type { ChangeEvent, FormEvent } from 'react';

function SearchBox({ onSearch }: { onSearch: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(text);
  };

  return null;
}` },
        { type: 'text', value: 'You rarely need to annotate an inline handler: when you write onChange={(event) => ...} inside JSX, the event type is inferred from the element.' },
        { type: 'note', value: 'For a handler that is reused, define its type once: type ClickHandler = (id: number) => void. Passing a handler with a different parameter type becomes a compile error.' },
      ],
    },
    {
      id: 'ts-react-children',
      title: 'Children and generic components',
      blocks: [
        { type: 'text', value: 'Children are typed as ReactNode. A wrapper component that accepts children can be reused for any content while staying type-safe.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
};

function Card({ title, children }: CardProps) {
  return null;
}

// A generic list component: item type is chosen at the call site
type ListProps<T> = {
  items: T[];
  render: (item: T) => ReactNode;
};

function List<T>({ items, render }: ListProps<T>) {
  return null;
}` },
        { type: 'text', value: 'Generic components are common for tables, selects and lists. The caller gets autocomplete for the item type and mistakes in render are caught.' },
        { type: 'note', value: 'ReactNode covers strings, numbers, elements, arrays and null. Use it instead of JSX.Element when children may be text or nothing.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'ts-with-react',
      q: 'How do you declare a prop that may be missing?',
      options: ['title: string!', 'title?: string', 'optional title', 'title: string | null only'],
      answer: 1,
      explain: 'The question mark makes the prop optional, so the type includes undefined.',
    },
    {
      chapterId: 'ts-with-react',
      q: 'What type should children use?',
      options: ['string', 'ReactNode', 'any', 'Element[]'],
      answer: 1,
      explain: 'ReactNode covers text, elements, arrays, null and more.',
    },
    {
      chapterId: 'ts-with-react',
      q: 'Why is useState<Course | null>(null) useful?',
      options: [
        'It allows both a course and a loading state',
        'It makes state readonly',
        'It removes the need for props',
        'It runs faster',
      ],
      answer: 0,
      explain: 'The null branch represents "not loaded yet", and the compiler forces a check before use.',
    },
    {
      chapterId: 'ts-with-react',
      q: 'When do you need to annotate an event parameter?',
      options: [
        'Always',
        'When the handler is defined outside JSX without an inferred type',
        'Never',
        'Only for forms',
      ],
      answer: 1,
      explain: 'Inline JSX handlers get the event type from context; standalone handlers need an explicit type.',
    },
  ],
};
