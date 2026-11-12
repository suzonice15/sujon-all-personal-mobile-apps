// .NET chapter: Dependency Injection and Configuration.

export default {
  id: 'dependency-injection',
  title: 'Dependency Injection & Config',
  description: 'Service lifetimes, options and settings',
  icon: 'settings',
  lessons: [
    {
      id: 'dn-di-basics',
      title: 'Dependency injection',
      blocks: [
        { type: 'text', value: 'Dependency injection gives a class the services it needs instead of creating them. The container builds the object graph, so the class only says what it depends on through its constructor.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `public interface ICourseRepository
{
    IReadOnlyList<string> GetTitles();
}

public class CourseRepository : ICourseRepository
{
    public IReadOnlyList<string> GetTitles() => new[] { "SQL", "C#" };
}

public class CourseService
{
    private readonly ICourseRepository repo;

    public CourseService(ICourseRepository repo)
    {
        this.repo = repo;
    }

    public IReadOnlyList<string> Titles() => repo.GetTitles();
}

// Program.cs
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<CourseService>();` },
        { type: 'note', value: 'Depending on an interface lets you swap a real database for a fake one in tests without changing CourseService.' },
      ],
    },
    {
      id: 'dn-lifetimes',
      title: 'Service lifetimes',
      blocks: [
        { type: 'text', value: 'Every registration has a lifetime that decides how long an instance lives. Choosing the wrong one causes subtle bugs, especially with database contexts.' },
        { type: 'list', items: [
          'Transient - a new instance every time it is requested',
          'Scoped - one instance per HTTP request',
          'Singleton - one instance for the whole application',
          'Never inject a scoped service into a singleton',
        ] },
        { type: 'code', lang: 'csharp', tryIt: false, value: `builder.Services.AddTransient<IEmailSender, SmtpSender>();   // cheap, stateless
builder.Services.AddScoped<AppDbContext>();                   // one per request
builder.Services.AddSingleton<IClock, SystemClock>();         // shared, thread-safe` },
        { type: 'note', value: 'A DbContext is scoped on purpose. It is not thread-safe, so sharing one across requests would corrupt data.' },
      ],
    },
    {
      id: 'dn-configuration',
      title: 'Configuration and the options pattern',
      blocks: [
        { type: 'text', value: 'Settings come from appsettings.json, environment variables and user secrets, in that order of precedence. The options pattern binds a section to a typed class.' },
        { type: 'code', lang: 'text', tryIt: false, value: `appsettings.json
{
  "Courses": {
    "PageSize": 20,
    "ApiBaseUrl": "https://api.example.com"
  }
}` },
        { type: 'code', lang: 'csharp', tryIt: false, value: `public class CoursesOptions
{
    public int PageSize { get; set; } = 10;
    public string ApiBaseUrl { get; set; } = "";
}

builder.Services.Configure<CoursesOptions>(
    builder.Configuration.GetSection("Courses"));

public class CourseService(IOptions<CoursesOptions> options)
{
    public int PageSize => options.Value.PageSize;
}` },
        { type: 'note', value: 'Environment variables override appsettings.json. Use Courses__PageSize as the variable name for a nested key.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dependency-injection',
      q: 'What does dependency injection do?',
      options: ['Creates every object with new inside the class', 'The container provides the services a class needs', 'Removes interfaces', 'Stores data in files'],
      answer: 1,
      explain: 'The class receives its dependencies through the constructor.',
    },
    {
      chapterId: 'dependency-injection',
      q: 'Which lifetime gives one instance per HTTP request?',
      options: ['Transient', 'Scoped', 'Singleton', 'Static'],
      answer: 1,
      explain: 'Scoped services live for one request.',
    },
    {
      chapterId: 'dependency-injection',
      q: 'Why is a DbContext registered as scoped?',
      options: ['It is not thread-safe and should not be shared across requests', 'It is faster as a singleton', 'It must be static', 'Scoped is the default for everything'],
      answer: 0,
      explain: 'Each request gets its own context.',
    },
    {
      chapterId: 'dependency-injection',
      q: 'Which setting source has the highest precedence here?',
      options: ['appsettings.json', 'Environment variables', 'A comment', 'The class default'],
      answer: 1,
      explain: 'Environment variables override the JSON file.',
    },
  ],
};
