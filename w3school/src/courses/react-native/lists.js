// React Native chapter: Lists.

export default {
  id: 'lists',
  title: 'Lists',
  description: 'FlatList, SectionList and list performance',
  icon: 'view-list',
  lessons: [
    {
      id: 'rn-flatlist',
      title: 'FlatList',
      blocks: [
        { type: 'text', value: 'FlatList renders only the visible rows, so it stays fast with hundreds of items. It needs a data array, a renderItem and a stable keyExtractor.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { FlatList, Text, View } from 'react-native';

const courses = [
  { id: 'html', title: 'HTML' },
  { id: 'css', title: 'CSS' },
  { id: 'js', title: 'JavaScript' },
];

export default function CourseList() {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}` },
        { type: 'note', value: 'Never use the array index as the key when items can be inserted or removed. Use a stable id.' },
      ],
    },
    {
      id: 'rn-flatlist-optimization',
      title: 'List performance',
      blocks: [
        { type: 'text', value: 'Memoize the row component, keep renderItem stable and provide item heights when possible. Every unnecessary re-render of every row is expensive.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import React, { useCallback } from 'react';
import { FlatList, Text } from 'react-native';

const Row = React.memo(function Row({ title }) {
  return <Text style={{ padding: 16 }}>{title}</Text>;
});

export default function List({ items }) {
  const renderItem = useCallback(({ item }) => <Row title={item.title} />, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      initialNumToRender={10}
      windowSize={7}
      removeClippedSubviews
    />
  );
}` },
        { type: 'note', value: 'Do not optimise every list. Measure first with the React DevTools profiler and fix the list that actually janks.' },
      ],
    },
    {
      id: 'rn-sectionlist',
      title: 'SectionList',
      blocks: [
        { type: 'text', value: 'SectionList groups rows under headers. It is the right choice for settings, grouped courses or alphabetised contacts.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { SectionList, Text } from 'react-native';

const sections = [
  { title: 'Web', data: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Mobile', data: ['React Native'] },
];

export default function Grouped() {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item}
      renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
      renderItem={({ item }) => <Text style={{ padding: 12 }}>{item}</Text>}
    />
  );
}` },
        { type: 'note', value: 'SectionList uses the same recycling model as FlatList. Keep keys stable and memoize rows.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'lists',
      q: 'Which component should render a long list?',
      options: ['ScrollView', 'FlatList', 'View', 'Modal'],
      answer: 1,
      explain: 'FlatList recycles rows and stays fast.',
    },
    {
      chapterId: 'lists',
      q: 'What does keyExtractor provide?',
      options: ['A style', 'A stable key for each item', 'A network request', 'An animation'],
      answer: 1,
      explain: 'Stable keys let React reuse rows correctly.',
    },
    {
      chapterId: 'lists',
      q: 'Why avoid the array index as a key?',
      options: ['It is slower', 'Items shift when the list changes', 'It breaks TypeScript', 'It duplicates styles'],
      answer: 1,
      explain: 'Index keys can attach the wrong state to the wrong row.',
    },
    {
      chapterId: 'lists',
      q: 'Which component groups rows under headers?',
      options: ['FlatList', 'SectionList', 'ScrollView', 'Pressable'],
      answer: 1,
      explain: 'SectionList renders sections with headers.',
    },
  ],
};
