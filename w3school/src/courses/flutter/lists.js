// Flutter chapter: Lists.

export default {
  id: 'lists',
  title: 'Lists',
  description: 'ListView, builder, GridView and keys',
  icon: 'view-list',
  lessons: [
    {
      id: 'flutter-listview',
      title: 'ListView',
      blocks: [
        { type: 'text', value: 'ListView scrolls a list of children. For a small fixed list, ListView with children is fine. For a long or dynamic list, use ListView.builder so only visible rows are built.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `ListView(
  padding: const EdgeInsets.all(16),
  children: const [
    ListTile(title: Text('SQL'), subtitle: Text('13 chapters')),
    ListTile(title: Text('C#'), subtitle: Text('12 chapters')),
  ],
)` },
        { type: 'note', value: 'A ListView inside a Column needs a bounded height. Use Expanded or give the ListView a fixed height.' },
      ],
    },
    {
      id: 'flutter-listview-builder',
      title: 'ListView.builder',
      blocks: [
        { type: 'text', value: 'ListView.builder creates items on demand. It is the correct choice for API results, chat messages and long lists.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `ListView.builder(
  itemCount: courses.length,
  itemBuilder: (context, index) {
    final course = courses[index];
    return ListTile(
      key: ValueKey(course.id),
      title: Text(course.title),
      subtitle: Text('\${course.lessons} lessons'),
      onTap: () => openCourse(course),
    );
  },
)` },
        { type: 'note', value: 'Give each row a stable key when the list can be reordered or filtered. It helps Flutter keep the right state with the right row.' },
      ],
    },
    {
      id: 'flutter-gridview',
      title: 'GridView',
      blocks: [
        { type: 'text', value: 'GridView shows items in a grid. GridView.count uses a fixed column count; GridView.builder builds cells on demand.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `GridView.builder(
  padding: const EdgeInsets.all(16),
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    mainAxisSpacing: 12,
    crossAxisSpacing: 12,
    childAspectRatio: 1.2,
  ),
  itemCount: courses.length,
  itemBuilder: (context, index) => CourseCard(course: courses[index]),
)` },
        { type: 'note', value: 'A childAspectRatio that is too tall causes overflow inside the card. Test with long titles and larger text settings.' },
      ],
    },
    {
      id: 'flutter-list-performance',
      title: 'List performance',
      blocks: [
        { type: 'list', items: [
          'Use builder constructors, not a huge children list',
          'Keep item widgets small and const where possible',
          'Avoid heavy work inside itemBuilder',
          'Use itemExtent when rows have a fixed height',
          'Use a stable key for reorderable lists',
          'Profile with DevTools before optimising',
        ] },
        { type: 'text', value: 'A list that janks is usually doing too much inside itemBuilder or rebuilding the entire list on every state change.' },
        { type: 'note', value: 'Do not put a network request inside itemBuilder. Fetch data once and pass the result down.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'lists',
      q: 'Which widget builds list items on demand?',
      options: ['ListView', 'ListView.builder', 'Column', 'Container'],
      answer: 1,
      explain: 'The builder creates only visible items.',
    },
    {
      chapterId: 'lists',
      q: 'What does itemCount control?',
      options: ['The number of items', 'The item height', 'The scroll speed', 'The color'],
      answer: 0,
      explain: 'It tells the builder how many items exist.',
    },
    {
      chapterId: 'lists',
      q: 'Why give rows a stable key?',
      options: ['To sort them', 'To keep state with the right item', 'To color them', 'To make them faster always'],
      answer: 1,
      explain: 'Keys help Flutter match elements across rebuilds.',
    },
    {
      chapterId: 'lists',
      q: 'What causes grid overflow?',
      options: ['A bad childAspectRatio for the content', 'Too many colors', 'Using a key', 'Padding'],
      answer: 0,
      explain: 'The cell is not tall enough for the content.',
    },
  ],
};
