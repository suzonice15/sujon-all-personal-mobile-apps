// Flutter chapter: Layout.

export default {
  id: 'layout',
  title: 'Layout',
  description: 'Row, Column, constraints and responsive screens',
  icon: 'view-column',
  lessons: [
    {
      id: 'flutter-row-column',
      title: 'Row and Column',
      blocks: [
        { type: 'text', value: 'Row lays children horizontally; Column lays them vertically. mainAxisAlignment controls the main axis, crossAxisAlignment controls the other. MainAxisSize.min shrinks to fit.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: const [
    Text('SQL', style: TextStyle(fontSize: 24)),
    SizedBox(height: 8),
    Text('13 chapters'),
  ],
)` },
        { type: 'note', value: 'If content overflows a Column, wrap it in a SingleChildScrollView or use a ListView. Do not ignore the yellow and black overflow stripes.' },
      ],
    },
    {
      id: 'flutter-container-expanded',
      title: 'Container and Expanded',
      blocks: [
        { type: 'text', value: 'Container adds padding, margin, color and size. Expanded takes the remaining space in a Row or Column. Flexible is like Expanded but can shrink.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `Row(
  children: [
    Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        color: Colors.teal.shade100,
        child: const Text('Left'),
      ),
    ),
    const SizedBox(width: 12),
    Expanded(
      flex: 2,
      child: Container(
        padding: const EdgeInsets.all(16),
        color: Colors.teal.shade50,
        child: const Text('Right'),
      ),
    ),
  ],
)` },
        { type: 'note', value: 'Expanded must be inside a Row, Column or Flex. Using it in the wrong parent throws a layout error.' },
      ],
    },
    {
      id: 'flutter-stack',
      title: 'Stack',
      blocks: [
        { type: 'text', value: 'Stack layers children on top of each other. Positioned places a child at a distance from an edge. It is useful for badges, overlays and image captions.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `Stack(
  children: [
    Image.network('https://example.com/cover.jpg'),
    Positioned(
      top: 12,
      right: 12,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        color: Colors.black54,
        child: const Text('New', style: TextStyle(color: Colors.white)),
      ),
    ),
  ],
)` },
        { type: 'note', value: 'Stack sizes itself to its largest non-positioned child. If everything is Positioned, give the Stack a size or a parent constraint.' },
      ],
    },
    {
      id: 'flutter-responsive',
      title: 'Responsive layout',
      blocks: [
        { type: 'text', value: 'Use LayoutBuilder or MediaQuery to adapt to the screen width. A phone shows one column; a tablet can show two. Avoid hardcoded widths for the whole screen.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `LayoutBuilder(
  builder: (context, constraints) {
    final columns = constraints.maxWidth > 600 ? 2 : 1;
    return GridView.count(
      crossAxisCount: columns,
      shrinkWrap: true,
      children: const [CourseCard(), CourseCard()],
    );
  },
)` },
        { type: 'note', value: 'Test on a small phone, a large phone and a tablet. The layout that looks fine on one size often breaks on another.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'layout',
      q: 'Which widget lays children vertically?',
      options: ['Row', 'Column', 'Stack', 'Expanded'],
      answer: 1,
      explain: 'Column stacks children on the vertical axis.',
    },
    {
      chapterId: 'layout',
      q: 'What does Expanded do?',
      options: ['Adds padding', 'Takes the remaining space', 'Centers text', 'Adds a border'],
      answer: 1,
      explain: 'It fills the free space along the main axis.',
    },
    {
      chapterId: 'layout',
      q: 'Which widget layers children?',
      options: ['Stack', 'Row', 'Column', 'Container'],
      answer: 0,
      explain: 'Stack paints children on top of each other.',
    },
    {
      chapterId: 'layout',
      q: 'How do you fix a vertical overflow?',
      options: ['Ignore it', 'Use a scroll view or list', 'Remove all text', 'Use a bigger font'],
      answer: 1,
      explain: 'Scrolling or a virtualised list gives the content room.',
    },
  ],
};
