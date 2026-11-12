// .NET interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between the SDK and the runtime?',
      a: 'The SDK contains the compiler, CLI and templates for developers. The runtime only runs an app that is already built, so end users need only the runtime.',
      level: 'basic',
    },
    {
      q: 'What does the CLR do?',
      a: 'It loads IL assemblies, JIT-compiles them to machine code, manages memory with the garbage collector and handles exceptions.',
      level: 'intermediate',
    },
    {
      q: 'Framework-dependent versus self-contained deployment?',
      a: 'Framework-dependent apps need a runtime installed on the target. Self-contained apps bundle the runtime, which is bigger but needs nothing installed.',
      level: 'intermediate',
    },
    {
      q: 'What is NuGet?',
      a: 'The package manager for .NET. It installs libraries and records their versions in the project file.',
      level: 'basic',
    },
  ],
  'dotnet-cli': [
    {
      q: 'What does dotnet restore do?',
      a: 'It downloads the NuGet packages a project references. dotnet build and dotnet run also restore when needed.',
      level: 'basic',
    },
    {
      q: 'What is in a .csproj file?',
      a: 'The target framework, package references and build settings. The SDK fills in defaults so the file stays short.',
      level: 'basic',
    },
    {
      q: 'Why keep bin and obj out of git?',
      a: 'They are generated build output and can be recreated. Committing them causes noisy diffs and machine-specific problems.',
      level: 'basic',
    },
    {
      q: 'What does Nullable enable do?',
      a: 'It turns on null-state analysis so the compiler warns about possible null references before they cause runtime errors.',
      level: 'intermediate',
    },
  ],
  'aspnet-core': [
    {
      q: 'What is ASP.NET Core?',
      a: 'The cross-platform web framework in .NET for APIs and web apps. It includes routing, middleware, dependency injection and JSON support.',
      level: 'basic',
    },
    {
      q: 'Minimal API versus controllers?',
      a: 'Minimal APIs are short and direct, good for small services. Controllers add structure and conventions for larger APIs.',
      level: 'intermediate',
    },
    {
      q: 'Why does middleware order matter?',
      a: 'Each middleware runs in the order it is registered. Authentication must come before authorization, and both before the endpoints that need them.',
      level: 'intermediate',
    },
    {
      q: 'How does model binding work?',
      a: 'ASP.NET Core reads route values, query strings, headers or the JSON body and converts them to the parameter types. Failed conversion returns 400.',
      level: 'basic',
    },
  ],
  'dependency-injection': [
    {
      q: 'What is dependency injection?',
      a: 'A class receives the services it needs through its constructor, supplied by a container. It makes code easier to test and to change.',
      level: 'basic',
    },
    {
      q: 'Transient, scoped and singleton?',
      a: 'Transient creates a new instance each time. Scoped creates one per request. Singleton creates one for the application lifetime.',
      level: 'basic',
    },
    {
      q: 'Why is injecting a scoped service into a singleton a bug?',
      a: 'The singleton lives longer than the request, so it keeps a scoped instance alive after its request has ended. That causes stale data and thread-safety problems.',
      level: 'advanced',
    },
    {
      q: 'What is the options pattern?',
      a: 'Binding a configuration section to a typed class through IOptions<T>. It gives strongly typed, validated settings instead of string lookups.',
      level: 'intermediate',
    },
  ],
  'entity-framework': [
    {
      q: 'What is a DbContext?',
      a: 'A session with the database that tracks entities, runs queries and saves changes. It is not thread-safe, so it is usually scoped to a request.',
      level: 'basic',
    },
    {
      q: 'What is a migration?',
      a: 'A versioned, code-based change to the database schema. Migrations are applied in order and keep every environment in sync.',
      level: 'basic',
    },
    {
      q: 'When does EF Core query the database?',
      a: 'When a terminal call such as ToListAsync, FirstOrDefaultAsync or SaveChangesAsync runs. Until then the LINQ query is only an expression.',
      level: 'intermediate',
    },
    {
      q: 'Why can a LINQ query be slow even if it looks simple?',
      a: 'EF Core may generate SQL that scans a table or loads too many columns. Check the generated SQL, add indexes and project only the needed fields.',
      level: 'advanced',
    },
  ],
  'validation-errors': [
    {
      q: 'Why use a DTO instead of an entity in an API?',
      a: 'A DTO defines the exact public contract and hides internal fields such as password hashes. It also prevents mass-assignment bugs.',
      level: 'basic',
    },
    {
      q: 'Which status code for invalid input?',
      a: '400 Bad Request. 404 is for a missing resource and 409 for a conflict with the current state.',
      level: 'basic',
    },
    {
      q: 'What is ProblemDetails?',
      a: 'A standard JSON shape for error responses, with type, title, status and detail. Clients can parse errors the same way across APIs.',
      level: 'intermediate',
    },
    {
      q: 'Where do business rules belong?',
      a: 'In the service layer, not in data annotations. Annotations check the shape of input; services check rules that need data or context.',
      level: 'intermediate',
    },
  ],
  'auth-security': [
    {
      q: 'Authentication versus authorization?',
      a: 'Authentication identifies the caller. Authorization decides what that caller may do. 401 means not authenticated; 403 means authenticated but not allowed.',
      level: 'basic',
    },
    {
      q: 'What is a JWT?',
      a: 'A signed token with claims about the user. The server verifies the signature and expiry on each request, without storing a session.',
      level: 'intermediate',
    },
    {
      q: 'How should passwords be stored?',
      a: 'As a salted hash from a slow, purpose-built password hasher. Never store plain text, reversible encryption or a fast general hash.',
      level: 'intermediate',
    },
    {
      q: 'What is a policy in ASP.NET Core?',
      a: 'A named authorization rule, such as requiring a role or claim. Endpoints reference the policy by name with RequireAuthorization.',
      level: 'basic',
    },
  ],
  'testing-logging': [
    {
      q: 'What is a unit test?',
      a: 'A small, fast test of one behaviour in isolation. It should not depend on a network or a real database.',
      level: 'basic',
    },
    {
      q: 'Fact versus Theory in xUnit?',
      a: '[Fact] is a single test. [Theory] takes data through [InlineData] and runs the same test for several inputs.',
      level: 'intermediate',
    },
    {
      q: 'What is WebApplicationFactory used for?',
      a: 'Starting the real app pipeline in memory for integration tests, so endpoints are tested with routing, middleware and DI in place.',
      level: 'intermediate',
    },
    {
      q: 'What should you log in production?',
      a: 'Structured events with levels and a correlation id. Never log passwords, tokens or full personal data.',
      level: 'advanced',
    },
  ],
  deployment: [
    {
      q: 'What does dotnet publish produce?',
      a: 'A folder with the compiled app and its dependencies, ready to copy to a server or into a container image.',
      level: 'basic',
    },
    {
      q: 'How should configuration differ between environments?',
      a: 'Use environment-specific settings files and environment variables. Secrets come from a secret store, never from source control.',
      level: 'intermediate',
    },
    {
      q: 'Why use a multi-stage Dockerfile?',
      a: 'The build stage uses the SDK image, and the final image copies only the published output onto the smaller runtime image. This keeps images small.',
      level: 'intermediate',
    },
    {
      q: 'What does a health check endpoint do?',
      a: 'It reports whether the app can serve traffic. Load balancers and orchestrators use it to route requests and restart unhealthy instances.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you structure a clean API?',
      a: 'Thin endpoints, DTOs for input and output, services for logic, a scoped DbContext for data, and ProblemDetails for errors.',
      level: 'intermediate',
    },
    {
      q: 'What makes a portfolio API convincing?',
      a: 'It runs, has tests, uses real persistence and auth, is deployed with a health check, and you can explain every decision.',
      level: 'basic',
    },
    {
      q: 'How would you debug a slow endpoint?',
      a: 'Check logs and timing first, then the generated SQL, missing indexes and N+1 queries. Measure before changing code.',
      level: 'advanced',
    },
    {
      q: 'What is the best first .NET step for a beginner?',
      a: 'Learn C# basics, build a console app, then a minimal API with one endpoint, and add EF Core and tests one piece at a time.',
      level: 'basic',
    },
  ],
};
