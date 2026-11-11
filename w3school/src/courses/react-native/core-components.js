// React Native chapter: Core Components.

export default {
  id: 'core-components',
  title: 'Core Components',
  description: 'View, Text, Image, Pressable and ScrollView',
  icon: 'widgets',
  lessons: [
    {
      id: 'rn-view-text',
      title: 'View and Text',
      blocks: [
        { type: 'text', value: 'View is the layout container. Text renders text and supports nested Text for inline styling. Every visible string must be inside Text.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { Text, View } from 'react-native';

export default function Profile() {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Ayesha</Text>
      <Text style={{ color: '#64748B' }}>
        Learning <Text style={{ fontWeight: '700' }}>React Native</Text>
      </Text>
    </View>
  );
}` },
        { type: 'note', value: 'View has no text styling of its own. Font size, color and line height belong on Text.' },
      ],
    },
    {
      id: 'rn-image-pressable',
      title: 'Image and Pressable',
      blocks: [
        { type: 'text', value: 'Image loads a local asset or a remote URL. Pressable handles taps with pressed feedback, which is more flexible than the older Touchable components.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { Image, Pressable, Text, View } from 'react-native';

export default function CourseCard({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
      })}
    >
      <Image
        source={{ uri: 'https://example.com/logo.png' }}
        style={{ width: 48, height: 48, borderRadius: 12 }}
      />
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600' }}>SQL</Text>
      <Text style={{ color: '#64748B' }}>13 chapters</Text>
    </Pressable>
  );
}` },
        { type: 'note', value: 'Pressable style can be a function of the pressed state. That is the clean way to give visual feedback without extra state.' },
      ],
    },
    {
      id: 'rn-scrollview',
      title: 'ScrollView and SafeAreaView',
      blocks: [
        { type: 'text', value: 'ScrollView scrolls its content. SafeAreaView keeps content away from notches and system bars. For long lists, use FlatList instead of ScrollView.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Lesson() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <Text key={index} style={{ marginBottom: 12 }}>
            Paragraph {index + 1}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}` },
        { type: 'note', value: 'react-native-safe-area-context is the recommended safe area library. SafeAreaView from react-native is deprecated in newer versions.' },
      ],
    },
    {
      id: 'rn-core-list',
      title: 'Component cheat sheet',
      blocks: [
        { type: 'list', items: [
          'View - layout container',
          'Text - any visible text',
          'Image - local or remote image',
          'Pressable - taps and feedback',
          'ScrollView - small scrollable content',
          'FlatList - long lists with recycling',
          'TextInput - keyboard input',
          'Modal - overlay content',
        ] },
        { type: 'text', value: 'There is no div, span, p or button. The core components are intentionally small; libraries fill the gaps.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'core-components',
      q: 'Which component is the basic layout container?',
      options: ['div', 'View', 'Text', 'Image'],
      answer: 1,
      explain: 'View replaces div in React Native.',
    },
    {
      chapterId: 'core-components',
      q: 'Which component handles taps with pressed feedback?',
      options: ['Pressable', 'View', 'ScrollView', 'TextInput'],
      answer: 0,
      explain: 'Pressable exposes a pressed state for styling.',
    },
    {
      chapterId: 'core-components',
      q: 'When should you prefer FlatList over ScrollView?',
      options: ['For long lists', 'For one screen of content', 'For images only', 'Never'],
      answer: 0,
      explain: 'FlatList recycles rows and stays fast with many items.',
    },
    {
      chapterId: 'core-components',
      q: 'Where do font size and color belong?',
      options: ['View', 'Text', 'Image', 'SafeAreaView'],
      answer: 1,
      explain: 'Text owns text styling.',
    },
  ],
};
