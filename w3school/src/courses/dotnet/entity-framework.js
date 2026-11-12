// .NET chapter: Entity Framework Core.

export default {
  id: 'entity-framework',
  title: 'Entity Framework Core',
  description: 'DbContext, migrations and CRUD with LINQ',
  icon: 'storage',
  lessons: [
    {
      id: 'dn-ef-intro',
      title: 'DbContext and entities',
      blocks: [
        { type: 'text', value: 'EF Core maps C# classes to database tables. A DbContext represents one session with the database. Each DbSet property is a table, and LINQ queries are translated to SQL.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `public class Course
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public int Price { get; set; }
}

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Course> Courses => Set<Course>();
}

// Program.cs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=courses.db"));` },
        { type: 'note', value: 'Use a provider such as SQLite for learning, SQL Server or PostgreSQL for production. The C# code stays nearly the same.' },
      ],
    },
    {
      id: 'dn-ef-migrations',
      title: 'Migrations',
      blocks: [
        { type: 'text', value: 'A migration is a versioned change to the database schema. Migrations are code, so they are reviewed and deployed with the app.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `dotnet tool install --global dotnet-ef
dotnet ef migrations add AddCourses
dotnet ef database update` },
        { type: 'list', items: [
          'Create a migration after every model change',
          'Review the generated code before applying it',
          'Apply migrations in staging before production',
          'Never edit an applied migration; add a new one',
        ] },
        { type: 'note', value: 'Running migrations automatically at startup is convenient for a small app. For larger systems, run them as a deploy step.' },
      ],
    },
    {
      id: 'dn-ef-crud',
      title: 'CRUD with async queries',
      blocks: [
        { type: 'text', value: 'Use async methods for database calls so the thread is free while the database works. Query with LINQ, then call a method such as ToListAsync to run the SQL.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `public class CourseService(AppDbContext db)
{
    public Task<List<Course>> GetCheapAsync() =>
        db.Courses
          .Where(c => c.Price <= 5000)
          .OrderBy(c => c.Title)
          .ToListAsync();

    public async Task<Course> AddAsync(Course course)
    {
        db.Courses.Add(course);
        await db.SaveChangesAsync();
        return course;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var course = await db.Courses.FindAsync(id);
        if (course is null) return false;
        db.Courses.Remove(course);
        await db.SaveChangesAsync();
        return true;
    }
}` },
        { type: 'note', value: 'Nothing is sent to the database until a terminal call such as ToListAsync or SaveChangesAsync. Check the generated SQL when a query is slow.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'entity-framework',
      q: 'What does a DbSet represent?',
      options: ['A table', 'A controller', 'A middleware', 'A thread'],
      answer: 0,
      explain: 'Each DbSet maps to one table.',
    },
    {
      chapterId: 'entity-framework',
      q: 'What does a migration do?',
      options: ['Creates a versioned schema change', 'Deletes all data', 'Starts the web server', 'Runs unit tests'],
      answer: 0,
      explain: 'Migrations apply schema changes in order.',
    },
    {
      chapterId: 'entity-framework',
      q: 'When does EF Core send a query to the database?',
      options: ['When the LINQ statement is written', 'When a terminal call such as ToListAsync runs', 'At compile time', 'Never'],
      answer: 1,
      explain: 'Queries are deferred until enumerated or materialised.',
    },
    {
      chapterId: 'entity-framework',
      q: 'Why use async methods for database calls?',
      options: ['They make SQL shorter', 'The thread is free while the database works', 'They skip migrations', 'They remove the DbContext'],
      answer: 1,
      explain: 'Async I/O does not block a thread while waiting.',
    },
  ],
};
