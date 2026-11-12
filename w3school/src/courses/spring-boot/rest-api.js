// Spring Boot chapter: REST APIs.

export default {
  id: 'rest-api',
  title: 'REST APIs',
  description: 'Controllers, mappings, request bodies and status codes',
  icon: 'api',
  lessons: [
    {
      id: 'sb-controllers',
      title: 'Controllers and mappings',
      blocks: [
        { type: 'text', value: 'A @RestController handles HTTP requests. @GetMapping, @PostMapping, @PutMapping and @DeleteMapping map a method to an HTTP verb and a path. The return value is converted to JSON automatically.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.List;
import org.springframework.web.bind.annotation.*;

record Course(Long id, String title, int price) {}

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final List<Course> courses = List.of(
        new Course(1L, "SQL", 5000),
        new Course(2L, "Java", 6000)
    );

    @GetMapping
    public List<Course> all() {
        return courses;
    }

    @GetMapping("/{id}")
    public Course one(@PathVariable Long id) {
        return courses.stream()
            .filter(c -> c.id().equals(id))
            .findFirst()
            .orElseThrow();
    }
}` },
        { type: 'note', value: 'A record is a short, immutable data class. Spring serializes its components to JSON using the component names.' },
      ],
    },
    {
      id: 'sb-request-body',
      title: 'Request bodies and query parameters',
      blocks: [
        { type: 'text', value: '@RequestBody reads JSON from the request body into an object. @RequestParam reads a query string value such as ?level=beginner. Use @RequestBody for data you create or update, and @RequestParam for filters.' },
        { type: 'code', lang: 'java', tryIt: false, value: `@PostMapping
public ResponseEntity<Course> create(@RequestBody CreateCourseRequest request) {
    Course created = new Course(3L, request.title(), request.price());
    return ResponseEntity
        .created(URI.create("/api/courses/" + created.id()))
        .body(created);
}

@GetMapping("/search")
public List<Course> search(@RequestParam(defaultValue = "") String title) {
    return courses.stream()
        .filter(c -> c.title().toLowerCase().contains(title.toLowerCase()))
        .toList();
}` },
        { type: 'list', items: [
          '@PathVariable - a value in the path, such as /courses/5',
          '@RequestParam - a query value, such as ?title=sql',
          '@RequestBody - the JSON body, converted to an object',
          'Use ResponseEntity when you need to set the status code or headers',
        ] },
      ],
    },
    {
      id: 'sb-status-codes',
      title: 'Status codes and responses',
      blocks: [
        { type: 'text', value: 'A good API returns the right status code. 200 for success, 201 for created, 204 for success with no body, 404 when the resource does not exist. ResponseEntity lets you choose the status for each response.' },
        { type: 'code', lang: 'java', tryIt: false, value: `@GetMapping("/{id}")
public ResponseEntity<Course> one(@PathVariable Long id) {
    return courses.stream()
        .filter(c -> c.id().equals(id))
        .findFirst()
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    boolean removed = courses.removeIf(c -> c.id().equals(id));
    return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
}` },
        { type: 'note', value: 'Clients rely on status codes for retries and caching. Returning 200 with an error message in the body breaks that contract.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'rest-api',
      q: 'Which annotation maps an HTTP GET request to a method?',
      options: ['@GetMapping', '@Entity', '@Autowired', '@Bean'],
      answer: 0,
      explain: '@GetMapping maps GET requests to the method.',
    },
    {
      chapterId: 'rest-api',
      q: 'What does @RequestBody do?',
      options: ['Reads a query string value', 'Converts the JSON body into a Java object', 'Sets the status code', 'Creates a table'],
      answer: 1,
      explain: 'It reads and converts the request body.',
    },
    {
      chapterId: 'rest-api',
      q: 'Which status code means a resource was created?',
      options: ['200', '201', '404', '500'],
      answer: 1,
      explain: '201 Created is the right response after a successful POST.',
    },
    {
      chapterId: 'rest-api',
      q: 'What is ResponseEntity used for?',
      options: ['Storing data', 'Setting the status code and headers of a response', 'Starting the server', 'Testing methods'],
      answer: 1,
      explain: 'It gives full control over the HTTP response.',
    },
  ],
};
