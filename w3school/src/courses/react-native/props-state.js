// React Native chapter: Props and State.

export default {
  id: 'props-state',
  title: 'Props & State',
  description: 'Function components, useState and useEffect',
  icon: 'sync',
  lessons: [
    {
      id: 'rn-props',
      title: 'Props',
      blocks: [
        { type: 'text', value: 'Props pass data from a parent to a child. They are read-only inside the child. Destructure them in the parameter list for clarity.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { Text, View } from 'react-native';

function CourseCard({ title, lessons }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
      <Text>{lessons} lessons</Text>
    </View>
  );
}

export default function App() {
  return <CourseCard title="SQL" lessons={48} />;
}` },
        { type: 'note', value: 'If a child needs to change a value, the parent should own the state and pass a callback down.' },
      ],
    },
    {
      id: 'rn-usestate',
      title: 'useState',
      blocks: [
        { type: 'text', value: 'useState adds local state. The setter triggers a re-render. Never mutate the state value directly; create a new value.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24 }}>{count}</Text>
      <Button title="Add" onPress={() => setCount((value) => value + 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />
    </View>
  );
}` },
        { type: 'note', value: 'Use the updater form setCount(value => value + 1) when the next value depends on the previous one.' },
      ],
    },
    {
      id: 'rn-useeffect',
      title: 'useEffect',
      blocks: [
        { type: 'text', value: 'useEffect runs after render. An empty dependency array runs once. A cleanup function runs before the next effect or on unmount.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return <Text>{now.toLocaleTimeString()}</Text>;
}` },
        { type: 'note', value: 'Always clean up timers, subscriptions and listeners. A missing cleanup causes leaks and state updates after unmount.' },
      ],
    },
    {
      id: 'rn-derived-state',
      title: 'Derived state',
      blocks: [
        { type: 'text', value: 'Do not store what you can calculate. A filtered list, a total or a label should be computed during render from existing state.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function Search() {
  const [query, setQuery] = useState('');
  const courses = ['HTML', 'CSS', 'JavaScript', 'React'];

  const results = useMemo(
    () => courses.filter((course) => course.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <View>
      <TextInput value={query} onChangeText={setQuery} placeholder="Search" />
      <Text>{results.length} results</Text>
    </View>
  );
}` },
        { type: 'note', value: 'useMemo is for expensive calculations, not every variable. A simple filter on a small array is fine without it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'props-state',
      q: 'Can a child modify its props?',
      options: ['Yes', 'No, props are read-only', 'Only strings', 'Only with useState'],
      answer: 1,
      explain: 'The parent owns the data and passes it down.',
    },
    {
      chapterId: 'props-state',
      q: 'What does useState return?',
      options: ['A value only', 'A value and a setter', 'A component', 'A style'],
      answer: 1,
      explain: 'It returns the current value and a function to update it.',
    },
    {
      chapterId: 'props-state',
      q: 'When does useEffect with [] run?',
      options: ['Every render', 'Once after the first render', 'Never', 'Only on unmount'],
      answer: 1,
      explain: 'An empty dependency array means it runs once.',
    },
    {
      chapterId: 'props-state',
      q: 'Why clean up a timer in useEffect?',
      options: ['To avoid a leak and updates after unmount', 'To make it faster', 'To reset state', 'To render again'],
      answer: 0,
      explain: 'The cleanup clears the interval when the component goes away.',
    },
  ],
};
