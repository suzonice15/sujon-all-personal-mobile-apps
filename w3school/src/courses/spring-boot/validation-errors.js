// Spring Boot chapter: Validation and Error Handling.

export default {
  id: 'validation-errors',
  title: 'Validation & Errors',
  description: 'Bean validation, global exception handling and ProblemDetail',
  icon: 'rule',
  lessons: [
    {
      id: 'sb-bean-validation',
      title: 'Bean validation',
      blocks: [
        { type: 'text', value: 'Validate request data at the edge. Put constraints such as @NotBlank and @Min on the request object, and mark the parameter @Valid. Spring rejects invalid input with 400 Bad Request before your method runs.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateCourseRequest(
    @NotBlank String title,
    @Min(0) int price
) {}

@PostMapping
public ResponseEntity<Course> create(@Valid @RequestBody CreateCourseRequest request) {
    // only reached when the request is valid
    Course course = service.create(request.title(), request.price());
    return ResponseEntity.status(HttpStatus.CREATED).body(course);
}` },
        { type: 'note', value: 'Validation checks the shape of the input. Business rules, such as a course title that already exists, belong in the service layer.' },
      ],
    },
    {
      id: 'sb-exception-handler',
      title: 'Global exception handling',
      blocks: [
        { type: 'text', value: '@RestControllerAdvice catches exceptions from every controller in one place. Map each exception type to a status code and a clear body, so the API always returns the same error shape.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(java.util.NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String notFound() {
        return "Course not found";
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String invalid(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
    }
}` },
        { type: 'note', value: 'Never send a stack trace to the client. Log the details on the server and return a short, safe message.' },
      ],
    },
    {
      id: 'sb-problem-detail',
      title: 'ProblemDetail responses',
      blocks: [
        { type: 'text', value: 'Spring 6 and later support ProblemDetail, a standard JSON error format from RFC 9457. It has a type, a title, a status, a detail and an instance. Clients can read every error the same way, whatever the API.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.http.ProblemDetail;

@ExceptionHandler(java.util.NoSuchElementException.class)
public ProblemDetail notFound(java.util.NoSuchElementException ex) {
    ProblemDetail problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.NOT_FOUND, "The course does not exist");
    problem.setTitle("Course not found");
    return problem;
}` },
        { type: 'list', items: [
          'type - a URI that identifies the error kind',
          'title - a short human summary',
          'status - the HTTP status code',
          'detail - what went wrong for this request',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'validation-errors',
      q: 'Which annotation makes Spring validate a request body?',
      options: ['@Valid', '@Entity', '@Bean', '@Scheduled'],
      answer: 0,
      explain: '@Valid triggers validation of the annotated parameter.',
    },
    {
      chapterId: 'validation-errors',
      q: 'What does @RestControllerAdvice do?',
      options: ['Starts the app', 'Handles exceptions from all controllers in one place', 'Creates a table', 'Adds a route'],
      answer: 1,
      explain: 'It provides global exception handling.',
    },
    {
      chapterId: 'validation-errors',
      q: 'Which status code does failed bean validation usually return?',
      options: ['400 Bad Request', '404 Not Found', '500 Server Error', '201 Created'],
      answer: 0,
      explain: 'Invalid client input is a 400.',
    },
    {
      chapterId: 'validation-errors',
      q: 'What is ProblemDetail?',
      options: ['A database log', 'A standard JSON format for error responses', 'A test report', 'A bean scope'],
      answer: 1,
      explain: 'It follows RFC 9457 for consistent error bodies.',
    },
  ],
};
