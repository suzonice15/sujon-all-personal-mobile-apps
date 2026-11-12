// Spring Boot chapter: Production.

export default {
  id: 'production',
  title: 'Production',
  description: 'Actuator, logging, packaging and Docker',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'sb-actuator',
      title: 'Health and metrics with Actuator',
      blocks: [
        { type: 'text', value: 'Spring Boot Actuator adds endpoints for health, metrics and app info. Load balancers and orchestrators call /actuator/health to decide whether an instance should receive traffic.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# application.properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized

# Check the app
curl http://localhost:8080/actuator/health` },
        { type: 'note', value: 'Expose only the endpoints you need. Actuator endpoints can reveal internal details, so protect them with security rules in production.' },
      ],
    },
    {
      id: 'sb-logging',
      title: 'Logging',
      blocks: [
        { type: 'text', value: 'Spring Boot uses SLF4J with Logback. Log with a logger per class and use placeholders instead of string concatenation, so the message is built only when the level is enabled.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CourseService {

    private static final Logger log = LoggerFactory.getLogger(CourseService.class);

    public Course create(String title) {
        log.info("Creating course {}", title);
        // never log passwords, tokens or personal data
        return new Course(title, 0);
    }
}` },
        { type: 'list', items: [
          'Use levels: debug for detail, info for events, warn and error for problems',
          'Set levels per package with logging.level.com.codenest=debug',
          'Log errors with the exception object, so the stack trace is kept',
        ] },
      ],
    },
    {
      id: 'sb-package-docker',
      title: 'Packaging and Docker',
      blocks: [
        { type: 'text', value: 'mvn package builds an executable jar with everything inside. A Docker image can run that jar on a small Java runtime. Build in one stage and copy only the jar into the final image.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# Build the jar
./mvnw clean package -DskipTests

# Dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/courses-api.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]` },
        { type: 'note', value: 'Run the tests before packaging. Skipping tests is fine for a quick local build, never for the build that goes to production.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'production',
      q: 'What is /actuator/health used for?',
      options: ['Storing logs', 'Telling load balancers whether the app is ready', 'Creating users', 'Running tests'],
      answer: 1,
      explain: 'Health endpoints drive routing and restarts.',
    },
    {
      chapterId: 'production',
      q: 'Why use placeholders in log messages?',
      options: ['They look better', 'The message is built only when the level is enabled', 'They are required', 'They encrypt the log'],
      answer: 1,
      explain: 'Placeholders avoid building strings that are never logged.',
    },
    {
      chapterId: 'production',
      q: 'What does mvn package produce for deployment?',
      options: ['A database dump', 'An executable jar', 'A test report', 'A Git tag'],
      answer: 1,
      explain: 'The jar bundles the app and its dependencies.',
    },
    {
      chapterId: 'production',
      q: 'Why should the production Docker image use a JRE rather than the full build tools?',
      options: ['It is faster to type', 'It keeps the image smaller and removes build tools from production', 'Java needs no runtime', 'It disables logging'],
      answer: 1,
      explain: 'A smaller image has less to patch and deploys faster.',
    },
  ],
};
