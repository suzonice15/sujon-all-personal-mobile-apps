// .NET chapter: Publishing and Deployment.

export default {
  id: 'deployment',
  title: 'Deployment',
  description: 'Publish, configure, containerize and monitor',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'dn-publish',
      title: 'Publishing an app',
      blocks: [
        { type: 'text', value: 'dotnet publish builds a release version and copies everything the server needs into one folder. Choose framework-dependent or self-contained, depending on whether the server has the runtime.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `dotnet publish CoursesApi -c Release -o ./publish

# Self-contained for Linux x64, no runtime needed on the server
dotnet publish CoursesApi -c Release -r linux-x64 --self-contained true -o ./publish-linux

# Run the published output
dotnet ./publish/CoursesApi.dll` },
        { type: 'note', value: 'Always publish in Release configuration. Debug builds are slower and include extra information that is not needed in production.' },
      ],
    },
    {
      id: 'dn-environments',
      title: 'Environments and configuration',
      blocks: [
        { type: 'text', value: 'ASPNETCORE_ENVIRONMENT tells the app which environment it runs in. Each environment can have its own settings file, such as appsettings.Production.json. Secrets come from environment variables or a secret store.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `export ASPNETCORE_ENVIRONMENT=Production
export ConnectionStrings__Default="Server=db;Database=courses;User Id=app;Password=***"
export Jwt__Key="replace-with-a-secret-from-your-store"` },
        { type: 'list', items: [
          'Development: detailed errors and local database',
          'Staging: production-like with test data',
          'Production: no detailed errors, real secrets from the store',
        ] },
        { type: 'note', value: 'Do not show the developer exception page in production. It reveals source code and paths to attackers.' },
      ],
    },
    {
      id: 'dn-docker-health',
      title: 'Docker and health checks',
      blocks: [
        { type: 'text', value: 'A container image packages the app with its runtime. A health endpoint lets the platform know when the app is ready to receive traffic, and when to restart it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY ./publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "CoursesApi.dll"]` },
        { type: 'code', lang: 'csharp', tryIt: false, value: `builder.Services.AddHealthChecks();
app.MapHealthChecks("/health");` },
        { type: 'note', value: 'Use the ASP.NET runtime image for running the app, and the SDK image only in the build stage. Smaller images deploy faster and expose less.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment',
      q: 'Which command creates a production-ready build output?',
      options: ['dotnet new', 'dotnet publish -c Release', 'dotnet test', 'dotnet add'],
      answer: 1,
      explain: 'publish copies the release build and its dependencies to a folder.',
    },
    {
      chapterId: 'deployment',
      q: 'What does a self-contained deployment include?',
      options: ['Only your source code', 'The runtime, so the server needs nothing installed', 'A database', 'The SDK and all tests'],
      answer: 1,
      explain: 'It bundles the runtime with the application.',
    },
    {
      chapterId: 'deployment',
      q: 'Where should production secrets come from?',
      options: ['Committed appsettings.json', 'Environment variables or a secret store', 'The Dockerfile', 'A public README'],
      answer: 1,
      explain: 'Secrets must never be committed or baked into an image.',
    },
    {
      chapterId: 'deployment',
      q: 'What is a health endpoint for?',
      options: ['Showing a web page', 'Telling the platform when the app is ready or unhealthy', 'Storing logs', 'Compiling code'],
      answer: 1,
      explain: 'Orchestrators use it to route traffic and restart failing instances.',
    },
  ],
};
