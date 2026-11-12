// Spring Boot chapter: Dependency Injection.

export default {
  id: 'dependency-injection',
  title: 'Dependency Injection',
  description: 'Beans, components, services and constructor injection',
  icon: 'account-tree',
  lessons: [
    {
      id: 'sb-beans',
      title: 'Beans and components',
      blocks: [
        { type: 'text', value: 'A bean is an object that Spring creates and manages. Classes marked @Component, @Service or @Repository are found by component scanning and registered as beans. The container creates them once and shares them where they are needed.' },
        { type: 'list', items: [
          '@Component - a general-purpose bean',
          '@Service - business logic',
          '@Repository - data access',
          '@Controller or @RestController - web layer',
          'Beans are singletons by default: one instance for the application',
        ] },
      ],
    },
    {
      id: 'sb-constructor-injection',
      title: 'Constructor injection',
      blocks: [
        { type: 'text', value: 'Spring injects dependencies through the constructor. Make the fields final so the object cannot change after creation. In recent Spring versions a single constructor needs no @Autowired annotation.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.stereotype.Service;

public interface CourseRepository {
    java.util.List<String> titles();
}

@Service
public class CourseService {

    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    public int count() {
        return repository.titles().size();
    }
}` },
        { type: 'note', value: 'Constructor injection makes dependencies visible and easy to replace in tests. Field injection with @Autowired hides them and is harder to test.' },
      ],
    },
    {
      id: 'sb-interfaces-profiles',
      title: 'Choosing between implementations',
      blocks: [
        { type: 'text', value: 'When two beans implement the same interface, Spring needs a hint. @Primary marks the default. @Profile activates a bean only in a chosen environment, such as dev or prod.' },
        { type: 'code', lang: 'java', tryIt: false, value: `@Repository
@Profile("dev")
class InMemoryCourseRepository implements CourseRepository {
    public java.util.List<String> titles() {
        return java.util.List.of("SQL", "Java");
    }
}

@Repository
@Profile("prod")
class DatabaseCourseRepository implements CourseRepository {
    public java.util.List<String> titles() {
        return java.util.List.of();   // replace with a real query
    }
}` },
        { type: 'note', value: 'Start the app with --spring.profiles.active=dev to pick the in-memory version. Profiles keep test and production data separate.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dependency-injection',
      q: 'What is a bean?',
      options: ['A coffee type', 'An object that Spring creates and manages', 'A database table', 'A test file'],
      answer: 1,
      explain: 'The container creates and wires beans.',
    },
    {
      chapterId: 'dependency-injection',
      q: 'Why prefer constructor injection?',
      options: ['It is slower', 'Dependencies are visible and fields can be final', 'It disables beans', 'It needs XML'],
      answer: 1,
      explain: 'Constructor injection makes dependencies explicit and testable.',
    },
    {
      chapterId: 'dependency-injection',
      q: 'What does @Profile("dev") do?',
      options: ['Creates a developer account', 'Activates the bean only in the dev profile', 'Deletes beans', 'Hides errors'],
      answer: 1,
      explain: 'Profiles choose beans per environment.',
    },
    {
      chapterId: 'dependency-injection',
      q: 'What is the default scope of a Spring bean?',
      options: ['Request', 'Singleton', 'Session', 'Prototype'],
      answer: 1,
      explain: 'Beans are singletons unless you change the scope.',
    },
  ],
};
