// Design Patterns chapter: SOLID Principles.

export default {
  id: 'solid',
  title: 'SOLID Principles',
  description: 'Five principles that make code easier to change',
  icon: 'rule',
  lessons: [
    {
      id: 'dp-srp-ocp',
      title: 'Single Responsibility and Open/Closed',
      blocks: [
        { type: 'text', value: 'Single Responsibility: a class should have one reason to change. Open/Closed: code should be open for extension but closed for modification. Add new behaviour without editing working code.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Bad: one class does parsing, validation and saving
class UserService {
    void save(String json) { /* parse + validate + save */ }
}

// Better: one reason to change per class
class UserParser { User parse(String json) { ... } }
class UserValidator { void validate(User user) { ... } }
class UserRepository { void save(User user) { ... } }` },
        { type: 'note', value: 'Single Responsibility is about reasons to change, not lines of code. A class can be long and still have one responsibility.' },
      ],
    },
    {
      id: 'dp-lsp-isp',
      title: 'Liskov and Interface Segregation',
      blocks: [
        { type: 'text', value: 'Liskov Substitution: a subtype must be usable anywhere its parent is used, without breaking behaviour. Interface Segregation: many small interfaces are better than one large one that forces clients to implement unused methods.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Bad: a large interface forces every implementation to implement everything
interface Worker { void work(); void eat(); void sleep(); }

// Better: small, focused interfaces
interface Workable { void work(); }
interface Feedable { void eat(); }` },
        { type: 'note', value: 'A square is not a rectangle in code if the rectangle allows independent width and height. LSP is about behaviour, not the shape name.' },
      ],
    },
    {
      id: 'dp-dip',
      title: 'Dependency Inversion',
      blocks: [
        { type: 'text', value: 'Depend on abstractions, not concrete classes. High-level policy should not depend on low-level details; both should depend on interfaces. This is what makes dependency injection and testing possible.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Bad: hard-coded dependency
class CourseService {
    private final MySqlCourseRepository repo = new MySqlCourseRepository();
}

// Better: depend on the interface
interface CourseRepository { List<Course> all(); }

class CourseService {
    private final CourseRepository repo;
    CourseService(CourseRepository repo) { this.repo = repo; }
}` },
        { type: 'note', value: 'Dependency Inversion is the reason constructor injection and interfaces are everywhere in modern frameworks.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'solid',
      q: 'What does Single Responsibility mean?',
      options: ['One method per class', 'One reason to change per class', 'One file per class', 'One developer per class'],
      answer: 1,
      explain: 'A class should have one reason to change.',
    },
    {
      chapterId: 'solid',
      q: 'What does Open/Closed mean?',
      options: ['No code changes ever', 'Open for extension, closed for modification', 'Always use inheritance', 'Always use interfaces'],
      answer: 1,
      explain: 'Add behaviour without editing existing code.',
    },
    {
      chapterId: 'solid',
      q: 'What does Liskov Substitution require?',
      options: ['Subtypes can replace their parent without breaking behaviour', 'Every class must be final', 'No inheritance', 'No interfaces'],
      answer: 0,
      explain: 'A subtype must be usable wherever the parent is.',
    },
    {
      chapterId: 'solid',
      q: 'What does Dependency Inversion mean?',
      options: ['Depend on concrete classes', 'Depend on abstractions, not details', 'No dependencies at all', 'Use global variables'],
      answer: 1,
      explain: 'High-level code should depend on interfaces.',
    },
  ],
};
