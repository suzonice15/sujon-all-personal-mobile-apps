// .NET chapter: Validation, DTOs and Errors.

export default {
  id: 'validation-errors',
  title: 'Validation & Errors',
  description: 'DTOs, validation, status codes and ProblemDetails',
  icon: 'rule',
  lessons: [
    {
      id: 'dn-dto',
      title: 'DTOs and why not expose entities',
      blocks: [
        { type: 'text', value: 'A DTO is a small class that describes exactly what the API accepts or returns. Do not send database entities straight to clients. A DTO hides internal fields and keeps the public contract stable.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `// What the client sends
public record CreateCourseRequest(string Title, int Price);

// What the client receives
public record CourseResponse(int Id, string Title, int Price);

app.MapPost("/api/courses", async (CreateCourseRequest request, CourseService service) =>
{
    var created = await service.AddAsync(new Course { Title = request.Title, Price = request.Price });
    return Results.Created($"/api/courses/{created.Id}",
        new CourseResponse(created.Id, created.Title, created.Price));
});` },
        { type: 'note', value: 'An entity can have fields such as PasswordHash or IsDeleted. Mapping to a DTO prevents accidental leaks and mass-assignment bugs.' },
      ],
    },
    {
      id: 'dn-validation',
      title: 'Validating input',
      blocks: [
        { type: 'text', value: 'Validate input at the edge of the system. Data annotations describe simple rules on a DTO. Reject bad input with 400 Bad Request before any business logic runs.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System.ComponentModel.DataAnnotations;

public class CreateCourseRequest
{
    [Required, StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = "";

    [Range(0, 100000)]
    public int Price { get; set; }
}

// In an endpoint with the validation helper
if (!Validator.TryValidateObject(request, new ValidationContext(request), errors, true))
{
    return Results.ValidationProblem(errors.ToDictionary(e => e.MemberNames.First(), e => new[] { e.ErrorMessage! }));
}` },
        { type: 'note', value: 'Validation checks the shape of the input. Business rules, such as a title that already exists, still belong in the service layer.' },
      ],
    },
    {
      id: 'dn-problem-details',
      title: 'Status codes and ProblemDetails',
      blocks: [
        { type: 'text', value: 'Use the right status code: 200 for success, 201 for a created resource, 204 for success with no body, 400 for bad input, 404 when the item is missing, and 401 or 403 for auth problems. Errors should use the standard ProblemDetails shape.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `builder.Services.AddProblemDetails();
var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

app.MapGet("/api/courses/{id:int}", async (int id, AppDbContext db) =>
    await db.Courses.FindAsync(id) is Course course
        ? Results.Ok(course)
        : Results.Problem(title: "Course not found", statusCode: 404));` },
        { type: 'list', items: [
          '400 - the request is malformed or invalid',
          '404 - the resource does not exist',
          '409 - a conflict with the current state',
          '500 - an unexpected server error; never show stack traces to clients',
        ] },
        { type: 'note', value: 'Clients rely on status codes. A 200 with an error inside the body breaks retries, caches and monitoring.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'validation-errors',
      q: 'Why use a DTO instead of an entity in an endpoint?',
      options: ['It is shorter', 'It exposes only the fields the API should expose', 'It makes SQL faster', 'It is required by .NET'],
      answer: 1,
      explain: 'A DTO defines the public contract and hides internal fields.',
    },
    {
      chapterId: 'validation-errors',
      q: 'Which status code means the request input was invalid?',
      options: ['200', '400', '404', '500'],
      answer: 1,
      explain: '400 Bad Request means the client sent invalid input.',
    },
    {
      chapterId: 'validation-errors',
      q: 'What does [Required] do on a DTO property?',
      options: ['Makes it optional', 'Validates that a value is present', 'Creates a database column', 'Hides the property'],
      answer: 1,
      explain: 'Data annotations describe validation rules.',
    },
    {
      chapterId: 'validation-errors',
      q: 'What should a 500 response show to a client?',
      options: ['The full stack trace', 'A generic error, with details only in logs', 'The database password', 'Nothing at all'],
      answer: 1,
      explain: 'Keep internal details in the logs, not the response.',
    },
  ],
};
