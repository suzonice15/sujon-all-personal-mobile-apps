// Flutter chapter: State Management.

export default {
  id: 'state-management',
  title: 'State Management',
  description: 'Riverpod, Bloc and testing state',
  icon: 'account-tree',
  lessons: [
    {
      id: 'flutter-setstate-limits',
      title: 'Why state management',
      blocks: [
        { type: 'text', value: 'setState works for one widget. Once several screens share data, or a value must survive navigation, you need a store outside the widget tree.' },
        { type: 'list', items: [
          'Local UI state: setState or ValueNotifier',
          'Shared app state: Riverpod, Bloc or Provider',
          'Server cache: a repository plus a provider',
          'Never put business logic in build()',
          'Keep one source of truth per value',
        ] },
        { type: 'note', value: 'Adding a state library does not fix a design problem. Decide who owns each value first.' },
      ],
    },
    {
      id: 'flutter-riverpod',
      title: 'Riverpod',
      blocks: [
        { type: 'text', value: 'A provider exposes a value and rebuilds only its listeners. FutureProvider handles async loading, error and data states with when().' },
        { type: 'code', lang: 'dart', tryIt: false, value: `final coursesProvider = FutureProvider<List<Course>>((ref) async {\n  return ref.watch(apiClientProvider).fetchCourses();\n});\n\nclass CourseList extends ConsumerWidget {\n  const CourseList({super.key});\n\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final courses = ref.watch(coursesProvider);\n    return courses.when(\n      data: (items) => ListView.builder(\n        itemCount: items.length,\n        itemBuilder: (context, index) => ListTile(title: Text(items[index].title)),\n      ),\n      loading: () => const CircularProgressIndicator(),\n      error: (error, stack) => Text('Failed: ' + error.toString()),\n    );\n  }\n}` },
        { type: 'note', value: 'A provider is lazy by default. It runs when first watched, not when the app starts.' },
      ],
    },
    {
      id: 'flutter-bloc-testing',
      title: 'Bloc and testing',
      blocks: [
        { type: 'text', value: 'Bloc separates events from states. The UI adds an event, the bloc emits states, and the widget rebuilds. It is explicit and easy to test.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class CoursesBloc extends Bloc<CoursesEvent, CoursesState> {\n  CoursesBloc(this.repository) : super(const CoursesState.loading()) {\n    on<CoursesRequested>((event, emit) async {\n      final courses = await repository.fetch();\n      emit(CoursesState.loaded(courses));\n    });\n  }\n\n  final CourseRepository repository;\n}` },
        { type: 'code', lang: 'dart', tryIt: false, value: `blocTest<CoursesBloc, CoursesState>(\n  'emits loaded after request',\n  build: () => CoursesBloc(FakeRepository()),\n  act: (bloc) => bloc.add(const CoursesRequested()),\n  expect: () => [\n    isA<CoursesState>().having((s) => s.courses.length, 'courses', 2),\n  ],\n);` },
        { type: 'note', value: 'Test the bloc, not the widget, for business rules. Widget tests are for rendering and interaction.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'state-management',
      q: 'When is setState not enough?',
      options: ['For a button', 'When state is shared across screens', 'For a color', 'For a text field'],
      answer: 1,
      explain: 'Shared state needs an external store.',
    },
    {
      chapterId: 'state-management',
      q: 'What does FutureProvider handle?',
      options: ['Only success', 'Loading, data and error', 'Routing', 'Styling'],
      answer: 1,
      explain: 'when() covers all three states.',
    },
    {
      chapterId: 'state-management',
      q: 'How does Bloc work?',
      options: ['Events in, states out', 'States in, events out', 'Only UI', 'Only storage'],
      answer: 0,
      explain: 'The UI adds events and listens to states.',
    },
    {
      chapterId: 'state-management',
      q: 'What should you test for business rules?',
      options: ['The widget tree', 'The bloc', 'The theme', 'The router'],
      answer: 1,
      explain: 'Bloc tests are fast and focused.',
    },
  ],
};
