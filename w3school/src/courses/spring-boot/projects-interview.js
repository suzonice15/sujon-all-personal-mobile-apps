// Spring Boot chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a courses API and prepare for Spring interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'sb-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Build a small REST API with CRUD, a JPA entity, validation, a global error handler, one protected endpoint and tests. Keep controllers thin, put logic in services, and let Spring handle the wiring.' },
        { type: 'code', lang: 'text', tryIt: false, value: `courses-api/
  src/main/java/com/codenest/courses/
    CoursesApplication.java
    api/CourseController.java        REST endpoints, thin
    api/ApiExceptionHandler.java     global errors
    service/CourseService.java       business rules, @Transactional
    domain/Course.java               JPA entity
    domain/CourseRepository.java     Spring Data interface
    config/SecurityConfig.java       filter chain
  src/main/resources/application.properties
  src/test/java/.../CourseServiceTest.java
  src/test/java/.../CourseControllerTest.java` },
        { type: 'list', items: [
          'Constructor injection everywhere',
          'DTOs with validation for requests',
          'ProblemDetail for every error',
          'Secrets from environment variables',
          'Actuator health endpoint and a Dockerfile',
        ] },
        { type: 'note', value: 'A finished, tested API with a README is worth more than a long list of half-built features. Make it run with one command.' },
      ],
    },
    {
      id: 'sb-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What does Spring Boot add on top of Spring?',
          'Constructor injection versus field injection?',
          'Singleton and prototype bean scopes?',
          'How does @Transactional roll back?',
          'Derived query versus @Query?',
          'How do you handle errors globally?',
          'How do you secure an endpoint?',
          'What is the difference between @WebMvcTest and @SpringBootTest?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "Constructor injection makes dependencies explicit and lets tests pass mocks directly" beats "it is a way to inject".' },
        { type: 'note', value: 'Be ready to write a controller with one endpoint, a service method and a test, live. That covers most junior Spring interviews.' },
      ],
    },
    {
      id: 'sb-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: Java basics, then Spring Initializr and your first endpoint',
          'Week 2: REST APIs, request bodies and status codes',
          'Week 3: dependency injection and configuration',
          'Week 4: JPA entities, repositories and transactions',
          'Week 5: validation, global errors and ProblemDetail',
          'Week 6: Spring Security basics',
          'Week 7: testing with MockMvc and Mockito',
          'Week 8: package with Docker and deploy one complete API',
        ] },
        { type: 'note', value: 'Finish one project end to end before starting the next. Interviewers ask about the decisions you made in a project you built yourself.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should a Spring controller do in a clean API?',
      options: ['Hold all business logic', 'Accept the request, call a service and return a response', 'Open database connections', 'Write logs to a file'],
      answer: 1,
      explain: 'Keep controllers thin and put logic in services.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which status code should a successful create return?',
      options: ['200', '201', '404', '500'],
      answer: 1,
      explain: '201 Created is the standard response for a new resource.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a Spring portfolio project convincing?',
      options: ['Many unfinished features', 'A tested, runnable API with clear structure and a README', 'A copied tutorial', 'A large unused dependency list'],
      answer: 1,
      explain: 'A working, tested project shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which annotation best describes a service class in the interview answer?',
      options: ['@Service', '@Entity', '@Test', '@Profile'],
      answer: 0,
      explain: '@Service marks business logic as a bean.',
    },
  ],
};
