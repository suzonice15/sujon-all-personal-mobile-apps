// React Native chapter: Styling.

export default {
  id: 'styling',
  title: 'Styling & Layout',
  description: 'Flexbox, StyleSheet, dimensions and theming',
  icon: 'palette',
  lessons: [
    {
      id: 'rn-flexbox',
      title: 'Flexbox',
      blocks: [
        { type: 'text', value: 'React Native uses Flexbox for layout. The default flexDirection is column, unlike the web default of row. flex: 1 fills the available space.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { StyleSheet, Text, View } from 'react-native';

export default function Row() {
  return (
    <View style={styles.row}>
      <View style={styles.box}><Text>A</Text></View>
      <View style={styles.box}><Text>B</Text></View>
      <View style={styles.box}><Text>C</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, padding: 20 },
  box: { flex: 1, height: 80, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center' },
});` },
        { type: 'note', value: 'Use gap for spacing between children. It is supported in modern React Native and removes many margin workarounds.' },
      ],
    },
    {
      id: 'rn-stylesheet',
      title: 'StyleSheet',
      blocks: [
        { type: 'text', value: 'StyleSheet.create validates styles once and gives them stable ids. Arrays combine styles, with later entries overriding earlier ones.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { StyleSheet, Text } from 'react-native';

export default function Title({ dark }) {
  return (
    <Text style={[styles.title, dark && styles.darkTitle]}>
      CodeNest
    </Text>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  darkTitle: { color: '#E2E8F0' },
});` },
        { type: 'note', value: 'Do not create a new style object on every render for a static style. Keep it in StyleSheet.create outside the component.' },
      ],
    },
    {
      id: 'rn-dimensions-platform',
      title: 'Dimensions and platform',
      blocks: [
        { type: 'text', value: 'useWindowDimensions updates when the screen rotates or splits. Platform.select chooses values per operating system.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function Responsive() {
  const { width } = useWindowDimensions();
  const columns = width > 700 ? 2 : 1;

  return (
    <View style={{ padding: 20 }}>
      <Text>Width: {Math.round(width)}</Text>
      <Text>Columns: {columns}</Text>
      <Text>Platform: {Platform.OS}</Text>
    </View>
  );
}` },
        { type: 'note', value: 'Avoid Dimensions.get for responsive layouts. It does not re-render on rotation; useWindowDimensions does.' },
      ],
    },
    {
      id: 'rn-theme',
      title: 'Theming',
      blocks: [
        { type: 'text', value: 'Define color and spacing tokens once and reuse them. A theme object keeps light and dark mode consistent across screens.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `export const lightTheme = {
  bg: '#F4F6FB',
  card: '#FFFFFF',
  text: '#0F172A',
  sub: '#64748B',
  brand: '#0F766E',
};

export const darkTheme = {
  bg: '#0B1120',
  card: '#151E2E',
  text: '#E2E8F0',
  sub: '#94A3B8',
  brand: '#2DD4BF',
};` },
        { type: 'note', value: 'Use the system color scheme as the default and let the user override it. Persist the choice so it survives a restart.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'styling',
      q: 'What is the default flexDirection in React Native?',
      options: ['row', 'column', 'row-reverse', 'wrap'],
      answer: 1,
      explain: 'Unlike the web, the default is column.',
    },
    {
      chapterId: 'styling',
      q: 'What does flex: 1 do?',
      options: ['Fills available space', 'Sets a fixed width', 'Centers text', 'Adds a border'],
      answer: 0,
      explain: 'It makes the element grow to fill the parent.',
    },
    {
      chapterId: 'styling',
      q: 'Why use useWindowDimensions?',
      options: ['It is shorter', 'It updates on rotation and resize', 'It sets the theme', 'It loads images'],
      answer: 1,
      explain: 'It re-renders with the current size instead of a one-time snapshot.',
    },
    {
      chapterId: 'styling',
      q: 'How do you combine two styles?',
      options: ['style={a + b}', 'style={[a, b]}', 'style={a && b}', 'style={{ a, b }}'],
      answer: 1,
      explain: 'An array combines styles; later entries win.',
    },
  ],
};
