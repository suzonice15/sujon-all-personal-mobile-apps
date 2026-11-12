// .NET chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a complete courses API and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'dn-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Build a small API with CRUD, validation, a database, auth and tests. Keep each endpoint thin: validate the DTO, call a service and return the right status code.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlite("Data Source=courses.db"));
builder.Services.AddScoped<CourseService>();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.MapGet("/api/courses", async (CourseService service) =>
    Results.Ok(await service.ListAsync()));

app.MapPost("/api/courses", async (CreateCourseRequest request, CourseService service) =>
{
    if (string.IsNullOrWhiteSpace(request.Title))
    {
        return Results.BadRequest(new { error = "Title is required" });
    }

    var course = await service.AddAsync(request);
    return Results.Created($"/api/courses/{course.Id}", course);
});

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.Run();` },
        { type: 'note', value: 'Add a migration, a health endpoint and a test project. That turns a tutorial into a portfolio piece you can run and explain.' },
      ],
    },
    {
      id: 'dn-project-checklist',
      title: 'Production checklist',
      blocks: [
        { type: 'list', items: [
          'DTOs for requests and responses',
          'Validation and ProblemDetails for errors',
          'Scoped DbContext and async queries',
          'Migrations in source control',
          'Secrets from environment or a secret store',
          'Authentication and policies on protected endpoints',
          'Structured logging, no sensitive data in logs',
          'Unit and integration tests in CI',
          'Health endpoint and Docker image',
        ] },
        { type: 'text', value: 'A reviewer checks these points before anything goes live. Walk through them for your own project and write down what is missing.' },
      ],
    },
    {
      id: 'dn-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the difference between the SDK and the runtime?',
          'Scoped versus singleton lifetimes?',
          'Why use a DTO instead of an entity?',
          'How do migrations work?',
          'Authentication versus authorization?',
          'How do you test an endpoint?',
          'Which status codes do you return and why?',
          'How do you deploy and configure secrets?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "A scoped DbContext is per request because it is not thread-safe" is more useful than "it is a lifetime".' },
        { type: 'note', value: 'Be ready to build a small minimal API with one DTO, one service and one test, live. That covers most backend interviews.' },
      ],
    },
    {
      id: 'dn-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: install the SDK and build a console app',
          'Week 2: project structure, dotnet CLI and NuGet',
          'Week 3: minimal APIs, routing and middleware',
          'Week 4: dependency injection and configuration',
          'Week 5: EF Core, migrations and CRUD',
          'Week 6: validation, errors and auth',
          'Week 7: tests, logging and deployment',
          'Week 8: build and deploy one complete portfolio API',
        ] },
        { type: 'note', value: 'Finish one project end to end before starting another. A deployed API with tests is worth more than five unfinished tutorials.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should each endpoint do in a clean API?',
      options: ['Hold all business logic', 'Validate input, call a service and return a status code', 'Open database connections directly', 'Write logs to a file'],
      answer: 1,
      explain: 'Keep endpoints thin and put logic in services.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a POST endpoint return when it creates a resource?',
      options: ['200', '201 Created', '404', '500'],
      answer: 1,
      explain: '201 Created includes the location of the new resource.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which item belongs on a production checklist?',
      options: ['Secrets committed to git', 'Migrations in source control', 'Stack traces shown to users', 'Debug builds'],
      answer: 1,
      explain: 'Migrations are code and must be versioned and reviewed.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a portfolio project strong?',
      options: ['Many unfinished features', 'One complete API with tests and deployment', 'A copied tutorial', 'A large folder of unused files'],
      answer: 1,
      explain: 'Depth and a working deployment beat size.',
    },
  ],
};
