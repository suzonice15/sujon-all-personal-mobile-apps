// Design Patterns chapter: Testing and Patterns.

export default {
  id: 'testing-patterns',
  title: 'Testing & Patterns',
  description: 'Testing, mocks and testable design',
  icon: 'fact-check',
  lessons: [
    {
      id: 'dp-testable',
      title: 'Design for testability',
      blocks: [
        { type: 'text', value: 'Testable code has small units, clear dependencies and no hidden global state. Patterns such as dependency injection and strategy make it easy to replace a real service with a fake in a test.' },
        { type: 'list', items: [
          'Inject dependencies through constructors',
          'Keep business logic out of UI and database code',
          'Depend on interfaces so tests can pass fakes',
          'Avoid static and global state',
          'Make time, randomness and IO explicit',
        ] },
        { type: 'note', value: 'If a class is hard to test, it is usually poorly designed. The test difficulty is a design signal.' },
      ],
    },
    {
      id: 'dp-mocks',
      title: 'Mocks, stubs and fakes',
      blocks: [
        { type: 'text', value: 'A stub returns canned data. A mock records calls and lets you assert on them. A fake is a working lightweight implementation, such as an in-memory repository. All three replace a real dependency in a test.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Fake repository for tests
class InMemoryCourseRepository implements CourseRepository {
    private final List<Course> courses = new ArrayList<>();
    public List<Course> all() { return courses; }
    public void save(Course c) { courses.add(c); }
}

// The service does not know the difference
CourseService service = new CourseService(new InMemoryCourseRepository());
service.create("Patterns");
assertEquals(1, service.count());` },
        { type: 'note', value: 'Prefer fakes for complex dependencies and mocks for simple interactions. A test full of mocks often means the design is too coupled.' },
      ],
    },
    {
      id: 'dp-test-doubles',
      title: 'Test doubles trade-offs',
      blocks: [
        { type: 'list', items: [
          'Too many mocks: the test breaks when implementation changes, not behaviour',
          'Fakes: closer to real behaviour but need maintenance',
          'Real objects: slow but honest, good for integration tests',
          'Stubs: simple and fast for one return value',
          'Test behaviour, not implementation details',
        ] },
        { type: 'text', value: 'A test that mocks every dependency tests the wiring, not the behaviour. Use the smallest double that lets the test assert on behaviour.' },
        { type: 'note', value: 'The best test is short, deterministic and reads like a sentence about behaviour.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-patterns',
      q: 'What makes code testable?',
      options: ['Global variables', 'Small units with injected dependencies', 'Static methods', 'Long methods'],
      answer: 1,
      explain: 'Injected dependencies are easy to replace.',
    },
    {
      chapterId: 'testing-patterns',
      q: 'What is a fake?',
      options: ['A stub returning canned data', 'A working lightweight implementation', 'A real database', 'A test framework'],
      answer: 1,
      explain: 'A fake implements the interface simply.',
    },
    {
      chapterId: 'testing-patterns',
      q: 'What is a mock used for?',
      options: ['Returning data', 'Recording calls and asserting on them', 'Replacing the database', 'Speeding up builds'],
      answer: 1,
      explain: 'Mocks verify interactions.',
    },
    {
      chapterId: 'testing-patterns',
      q: 'What is a sign of too many mocks?',
      options: ['Fast tests', 'The test breaks on refactors, not behaviour changes', 'High coverage', 'Clear code'],
      answer: 1,
      explain: 'It usually means the design is too coupled.',
    },
  ],
};
