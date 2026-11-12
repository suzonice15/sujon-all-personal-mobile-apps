// Spring Boot chapter: Configuration and Profiles.

export default {
  id: 'configuration',
  title: 'Configuration',
  description: 'application.properties, typed config and environment variables',
  icon: 'settings',
  lessons: [
    {
      id: 'sb-properties',
      title: 'application.properties and YAML',
      blocks: [
        { type: 'text', value: 'Spring Boot reads settings from src/main/resources/application.properties or application.yml. Values such as the server port or the database URL live there, so the code does not change between environments.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# application.properties
server.port=8080
spring.application.name=courses-api
spring.datasource.url=jdbc:h2:mem:coursesdb
app.page-size=20` },
        { type: 'note', value: 'Keep defaults in application.properties and override only what changes per environment. Spring also reads environment variables, which is how production gets secrets.' },
      ],
    },
    {
      id: 'sb-typed-config',
      title: 'Typed configuration',
      blocks: [
        { type: 'text', value: '@Value injects one property into a field. For a group of related settings, @ConfigurationProperties binds a whole prefix to a typed class. Typed config is easier to test and check at startup.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppSettings(int pageSize, String welcomeMessage) {}

// Enable binding in the main class:
// @SpringBootApplication
// @EnableConfigurationProperties(AppSettings.class)

@Service
public class CourseListService {

    private final AppSettings settings;

    public CourseListService(AppSettings settings) {
        this.settings = settings;
    }

    public int pageSize() {
        return settings.pageSize();
    }
}` },
        { type: 'note', value: 'Typed config fails at startup if a value is missing or has the wrong type. That is much better than a null discovered during a request.' },
      ],
    },
    {
      id: 'sb-env-profiles',
      title: 'Environment variables and profiles',
      blocks: [
        { type: 'text', value: 'Environment variables override properties. Spring maps SPRING_DATASOURCE_URL to spring.datasource.url. A profile file such as application-prod.properties applies only when that profile is active.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Production: secrets come from the environment, not the repository
export SPRING_PROFILES_ACTIVE=prod
export SPRING_DATASOURCE_URL="jdbc:postgresql://db:5432/courses"
export SPRING_DATASOURCE_PASSWORD="replace-with-a-secret"

java -jar target/courses-api.jar` },
        { type: 'list', items: [
          'application.properties - shared defaults',
          'application-dev.properties - local development',
          'application-prod.properties - production values without secrets',
          'Environment variables - secrets and per-host values',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'configuration',
      q: 'Where do Spring Boot settings usually live?',
      options: ['In the database', 'In application.properties or application.yml', 'In the browser', 'In Git only'],
      answer: 1,
      explain: 'These files in resources hold the configuration.',
    },
    {
      chapterId: 'configuration',
      q: 'What does @ConfigurationProperties do?',
      options: ['Creates a table', 'Binds a prefix of properties to a typed class', 'Starts a server', 'Hides secrets'],
      answer: 1,
      explain: 'It maps a group of properties to a typed object.',
    },
    {
      chapterId: 'configuration',
      q: 'How does SPRING_DATASOURCE_URL relate to spring.datasource.url?',
      options: ['They are unrelated', 'The environment variable overrides the property', 'It is a typo', 'It is only used in tests'],
      answer: 1,
      explain: 'Environment variables override the matching property.',
    },
    {
      chapterId: 'configuration',
      q: 'Why keep secrets out of application.properties in Git?',
      options: ['Files are too big', 'Anyone with repository access could read them', 'Spring cannot read them', 'They slow the app'],
      answer: 1,
      explain: 'Secrets belong in an environment or secret store.',
    },
  ],
};
