// .NET chapter: ASP.NET Core.

export default {
  id: 'aspnet-core',
  title: 'ASP.NET Core',
  description: 'Minimal APIs, endpoints and middleware',
  icon: 'api',
  lessons: [
    {
      id: 'dn-what-is-aspnet',
      title: 'What is ASP.NET Core?',
      blocks: [
        { type: 'text', value: 'ASP.NET Core is the web framework in .NET. It handles HTTP requests, routing, JSON, authentication and dependency injection. You can build APIs, websites and real-time apps with it.' },
        { type: 'list', items: [
          'Cross-platform and high performance',
          'Built-in dependency injection',
          'Minimal APIs for small services',
          'Controllers for larger, structured APIs',
          'Razor Pages and Blazor for web UI',
        ] },
        { type: 'note', value: 'A web API returns data, usually JSON. A web app returns HTML. The same framework supports both.' },
      ],
    },
    {
      id: 'dn-minimal-api',
      title: 'A minimal API',
      blocks: [
        { type: 'text', value: 'A minimal API maps an HTTP method and a path to a function. It is the fastest way to understand a request and a response.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var courses = new List<Course>
{
    new(1, "SQL", 5000),
    new(2, "C#", 6000)
};

app.MapGet("/api/courses", () => courses);

app.MapGet("/api/courses/{id:int}", (int id) =>
    courses.FirstOrDefault(c => c.Id == id) is Course course
        ? Results.Ok(course)
        : Results.NotFound());

app.MapPost("/api/courses", (Course course) =>
{
    courses.Add(course);
    return Results.Created($"/api/courses/{course.Id}", course);
});

app.Run();

record Course(int Id, string Title, int Price);` },
        { type: 'note', value: 'Results.Ok, NotFound and Created set the status code for you. The status code is part of the API contract.' },
      ],
    },
    {
      id: 'dn-middleware',
      title: 'Middleware pipeline',
      blocks: [
        { type: 'text', value: 'Middleware is a component in the request pipeline. Each one can inspect the request, call the next component and inspect the response. Order matters: authentication must run before the endpoint that needs it.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `var app = builder.Build();

app.Use(async (context, next) =>
{
    var started = DateTime.UtcNow;
    await next();
    var elapsed = DateTime.UtcNow - started;
    Console.WriteLine($"{context.Request.Method} {context.Request.Path} {context.Response.StatusCode} {elapsed.TotalMilliseconds} ms");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));` },
        { type: 'note', value: 'Put exception handling and HTTPS redirection near the top of the pipeline so that they wrap the rest of the work.' },
      ],
    },
    {
      id: 'dn-routing-binding',
      title: 'Routing and model binding',
      blocks: [
        { type: 'text', value: 'Route values come from the path, query strings, headers or the body. ASP.NET Core converts them to your parameter types and returns 400 when conversion fails.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `// GET /api/courses/5?level=beginner
app.MapGet("/api/courses/{id:int}", (int id, string? level) =>
    Results.Ok(new { id, level }));

// POST with a JSON body
app.MapPost("/api/courses", (CreateCourse input) =>
    Results.Created($"/api/courses/1", input));

record CreateCourse(string Title, int Price);` },
        { type: 'list', items: [
          'Path: {id} in the route template',
          'Query: a parameter that is not in the path',
          'Body: a complex type is read from JSON',
          'Constraints such as :int reject bad values early',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'aspnet-core',
      q: 'What does ASP.NET Core handle?',
      options: ['Only HTML', 'HTTP requests, routing and APIs', 'Only databases', 'Only CSS'],
      answer: 1,
      explain: 'It is the web framework for .NET.',
    },
    {
      chapterId: 'aspnet-core',
      q: 'What does a minimal API map?',
      options: ['A method and path to a function', 'A CSS class', 'A database table', 'A thread'],
      answer: 0,
      explain: 'MapGet, MapPost and similar methods define endpoints.',
    },
    {
      chapterId: 'aspnet-core',
      q: 'Why does middleware order matter?',
      options: ['It changes the colour of the response', 'Each step runs in the order it is added', 'Order is random', 'It only matters in tests'],
      answer: 1,
      explain: 'Authentication must run before the endpoint that checks it.',
    },
    {
      chapterId: 'aspnet-core',
      q: 'What does the constraint {id:int} do?',
      options: ['Makes id optional', 'Only matches integer route values', 'Creates an id column', 'Hides the id'],
      answer: 1,
      explain: 'Requests with a non-integer id do not match the route.',
    },
  ],
};
