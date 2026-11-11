// React Native chapter: Performance.

export default {
  id: 'performance',
  title: 'Performance',
  description: 'Re-renders, lists, images and startup time',
  icon: 'speed',
  lessons: [
    {
      id: 'rn-rerenders',
      title: 'Re-renders',
      blocks: [
        { type: 'text', value: 'A component re-renders when its state or props change. Memo prevents a child from re-rendering when its props are equal. useCallback keeps a function reference stable.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import React, { useCallback, useState } from 'react';
import { Button, Text } from 'react-native';

const Row = React.memo(function Row({ label, onPress }) {
  return <Button title={label} onPress={onPress} />;
});

export default function App() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((value) => value + 1), []);

  return (
    <>
      <Text>{count}</Text>
      <Row label="Add" onPress={increment} />
    </>
  );
}` },
        { type: 'note', value: 'Memo is not free. Use it on expensive rows and components that receive stable props, not on every component by default.' },
      ],
    },
    {
      id: 'rn-images-startup',
      title: 'Images and startup',
      blocks: [
        { type: 'list', items: [
          'Resize images to the display size; do not ship 4000px photos',
          'Use a caching image library for remote images',
          'Prefer local assets for the splash and first screen',
          'Keep the JS bundle small; lazy-load heavy screens',
          'Enable Hermes for faster startup and lower memory',
          'Measure startup with the platform profiler',
        ] },
        { type: 'code', lang: 'rn', tryIt: false, value: `<Image
  source={{ uri: imageUrl }}
  style={{ width: 96, height: 96 }}
  resizeMode="cover"
/>` },
        { type: 'note', value: 'A large image decoded at full size can use tens of megabytes. Always request or resize to the size the screen actually shows.' },
      ],
    },
    {
      id: 'rn-profiling',
      title: 'Profiling',
      blocks: [
        { type: 'text', value: 'Use the React DevTools profiler for re-renders, the Android profiler for CPU and memory, and Flipper or the Hermes profiler for JS work. Measure before optimising.' },
        { type: 'list', items: [
          'Does it feel slow on a low-end device?',
          'Is the cost JS, layout or images?',
          'Which component re-renders most often?',
          'Is the list recycling rows correctly?',
          'Is a heavy calculation running during render?',
        ] },
        { type: 'note', value: 'Optimising a fast screen is wasted effort. Fix the measured bottleneck, then measure again.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'performance',
      q: 'What does React.memo do?',
      options: ['Caches network data', 'Skips re-render when props are equal', 'Compresses images', 'Enables Hermes'],
      answer: 1,
      explain: 'It shallow-compares props before re-rendering.',
    },
    {
      chapterId: 'performance',
      q: 'Why resize images before display?',
      options: ['To improve quality', 'To reduce memory and decode time', 'To enable caching', 'To change the format'],
      answer: 1,
      explain: 'Decoding a huge image at full size wastes memory.',
    },
    {
      chapterId: 'performance',
      q: 'What should you do before optimising?',
      options: ['Rewrite the screen', 'Measure the actual bottleneck', 'Add memo everywhere', 'Disable Hermes'],
      answer: 1,
      explain: 'Profiling shows where the time actually goes.',
    },
    {
      chapterId: 'performance',
      q: 'Which list setting helps with very long lists?',
      options: ['initialNumToRender and windowSize', 'A bigger ScrollView', 'More images', 'A larger bundle'],
      answer: 0,
      explain: 'They control how much of the list is rendered at once.',
    },
  ],
};
