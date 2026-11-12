// Spring Boot interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Spring Boot?',
      a: 'An extension of Spring that provides auto-configuration, starters and an embedded server, so you can build standalone production applications quickly.',
      level: 'basic',
    },
    {
      q: 'What does @SpringBootApplication combine?',
      a: '@Configuration, @EnableAutoConfiguration and @ComponentScan. It marks the entry point and enables auto-configuration and scanning.',
      level: 'basic',
    },
    {
      q: 'What is a starter?',
      a: 'A curated dependency descriptor, such as spring-boot-starter-web, that brings in the libraries for one feature with compatible versions.',
      level: 'basic',
    },
    {
      q: 'What is an executable jar?',
      a: 'A jar that contains the app, its dependencies and an embedded server, so it runs with java -jar and needs no separate server installation.',
      level: 'intermediate',
    },
  ],
  'rest-api': [
    {
      q: 'RestController versus Controller?',
      a: 'RestController combines Controller with ResponseBody, so return values are written directly to the response, usually as JSON.',
      level: 'basic',
    },
    {
      q: 'What is the difference between PathVariable and RequestParam?',
      a: 'PathVariable reads a value from the URL path, such as /courses/5. RequestParam reads a query value, such as ?title=sql.',
      level: 'basic',
    },
    {
      q: 'When use ResponseEntity?',
      a: 'When you need to control the status code, headers or body of the response, such as 201 with a Location header after a create.',
      level: 'intermediate',
    },
    {
      q: 'Which status code for a missing resource?',
      a: '404 Not Found. A request that is malformed gets 400, and an unexpected server failure gets 500.',
      level: 'basic',
    },
  ],
  'dependency-injection': [
    {
      q: 'What is dependency injection?',
      a: 'The container creates objects and passes their dependencies in, so a class does not build its own collaborators.',
      level: 'basic',
    },
    {
      q: 'Why prefer constructor injection over field injection?',
      a: 'Dependencies are explicit, fields can be final, the object is valid after construction, and tests can pass mocks without Spring.',
      level: 'intermediate',
    },
    {
      q: 'What is the default bean scope?',
      a: 'Singleton: one instance per application context. Prototype creates a new instance each time it is requested.',
      level: 'basic',
    },
    {
      q: 'How do you choose between two implementations of an interface?',
      a: 'Mark one with @Primary as the default, or use @Profile or @Qualifier to select the right bean for each situation.',
      level: 'intermediate',
    },
  ],
  configuration: [
    {
      q: 'Where does Spring Boot read configuration from?',
      a: 'application.properties or application.yml, profile-specific files, environment variables and command-line arguments, with later sources overriding earlier ones.',
      level: 'basic',
    },
    {
      q: 'Why use @ConfigurationProperties instead of many @Value fields?',
      a: 'It binds a whole prefix to a typed class, validates it at startup and keeps related settings together.',
      level: 'intermediate',
    },
    {
      q: 'How should secrets be handled in production?',
      a: 'Inject them from environment variables or a secret store at runtime. Never commit them to the repository or bake them into the image.',
      level: 'basic',
    },
    {
      q: 'What does a profile do?',
      a: 'It activates beans and property files for one environment, such as dev or prod, selected with spring.profiles.active.',
      level: 'basic',
    },
  ],
  'data-jpa': [
    {
      q: 'What is JPA?',
      a: 'The Java Persistence API, a standard for mapping Java objects to relational tables. Hibernate is the most common implementation.',
      level: 'basic',
    },
    {
      q: 'What is a derived query?',
      a: 'A repository method whose name Spring Data parses into a query, such as findByEmailAndActiveTrue.',
      level: 'basic',
    },
    {
      q: 'How does @Transactional work?',
      a: 'Spring wraps the method in a transaction, commits on success and rolls back on a runtime exception, so related changes succeed or fail together.',
      level: 'intermediate',
    },
    {
      q: 'What is the N+1 query problem?',
      a: 'Loading a list and then one extra query per item for a related entity. Fix it with a join fetch or an entity graph.',
      level: 'advanced',
    },
  ],
  'validation-errors': [
    {
      q: 'How do you validate a request body?',
      a: 'Add constraints such as NotBlank or Min to the DTO and annotate the parameter with @Valid. Invalid input is rejected with 400.',
      level: 'basic',
    },
    {
      q: 'What does RestControllerAdvice do?',
      a: 'It applies exception handlers to all controllers, so each error is mapped to one consistent response.',
      level: 'intermediate',
    },
    {
      q: 'What is ProblemDetail?',
      a: 'The RFC 9457 error format in Spring 6 and later, with type, title, status, detail and instance fields.',
      level: 'intermediate',
    },
    {
      q: 'Why not return the stack trace to clients?',
      a: 'It leaks internal structure and details that help an attacker. Log it on the server and return a short, safe message.',
      level: 'basic',
    },
  ],
  security: [
    {
      q: 'What does Spring Security protect by default?',
      a: 'Once the starter is added, every endpoint requires authentication until you configure public paths in a SecurityFilterChain.',
      level: 'basic',
    },
    {
      q: 'Why use BCrypt for passwords?',
      a: 'It salts each hash and is deliberately slow, which makes stolen hashes expensive to crack.',
      level: 'intermediate',
    },
    {
      q: 'What is method security?',
      a: 'Checking a rule such as @PreAuthorize before a method runs, so service methods are protected regardless of who calls them.',
      level: 'intermediate',
    },
    {
      q: 'What is a JWT used for in an API?',
      a: 'A signed token that proves the user identity on each request without a server-side session. The server must verify the signature and expiry.',
      level: 'advanced',
    },
  ],
  testing: [
    {
      q: 'Unit test versus integration test?',
      a: 'A unit test checks one class with mocked dependencies. An integration test checks several layers together, often with a real database.',
      level: 'basic',
    },
    {
      q: 'What is @WebMvcTest for?',
      a: 'A slice test that loads only the web layer, so controllers are tested quickly with MockMvc and mocked services.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between @Mock and @MockBean?',
      a: '@Mock is a plain Mockito mock with no Spring context. @MockBean replaces a bean inside the Spring context.',
      level: 'advanced',
    },
    {
      q: 'Why test against the production database engine?',
      a: 'In-memory databases behave differently in SQL dialect and constraints. A few tests on the real engine catch those differences.',
      level: 'advanced',
    },
  ],
  production: [
    {
      q: 'What is Spring Boot Actuator?',
      a: 'A set of production endpoints for health, metrics and info. Orchestrators use the health endpoint to decide routing and restarts.',
      level: 'basic',
    },
    {
      q: 'How should logging be done?',
      a: 'Use SLF4J with a logger per class, placeholders for values, appropriate levels, and never log secrets or personal data.',
      level: 'basic',
    },
    {
      q: 'Why use a multi-stage Docker build?',
      a: 'The build stage needs the full JDK and build tools. The final image copies only the jar onto a JRE, which is smaller and has less to patch.',
      level: 'intermediate',
    },
    {
      q: 'How do you run database migrations safely?',
      a: 'Use a tool such as Flyway or Liquibase, version each change, and run migrations as a controlled step before the new version starts.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you structure a Spring API project?',
      a: 'Thin controllers, services for business logic, repositories for data, DTOs with validation, a global error handler and tests at each layer.',
      level: 'intermediate',
    },
    {
      q: 'What makes a backend project stand out?',
      a: 'It runs with one command, has tests, uses real persistence and security, exposes health checks, and the author can explain every decision.',
      level: 'basic',
    },
    {
      q: 'How do you debug a slow endpoint?',
      a: 'Check the logs and timing first, then the SQL that runs, missing indexes and N+1 queries. Measure before changing code.',
      level: 'advanced',
    },
    {
      q: 'What is the best first Spring step for a beginner?',
      a: 'Learn Java basics, build one REST endpoint with Spring Initializr, then add a repository, validation and a test, one piece at a time.',
      level: 'basic',
    },
  ],
};
