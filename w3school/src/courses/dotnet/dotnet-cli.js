// .NET chapter: The dotnet CLI and project structure.

export default {
  id: 'dotnet-cli',
  title: 'dotnet CLI & Projects',
  description: 'Create, build, run and test with the command line',
  icon: 'terminal',
  lessons: [
    {
      id: 'dn-cli-commands',
      title: 'The dotnet CLI',
      blocks: [
        { type: 'text', value: 'The dotnet command creates projects, adds packages, builds, runs and tests. The same commands work on Windows, Linux and macOS, and CI servers use them too.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `dotnet new console -n HelloApp
dotnet new webapi -n CoursesApi
dotnet new xunit -n CoursesApi.Tests

dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet restore
dotnet build
dotnet run --project CoursesApi
dotnet test` },
        { type: 'note', value: 'dotnet restore downloads packages. dotnet build compiles. dotnet run builds and starts the app in one step.' },
      ],
    },
    {
      id: 'dn-csproj',
      title: 'The .csproj file',
      blocks: [
        { type: 'text', value: 'A project file describes the target framework, the packages and the build options. Modern projects are short because the SDK fills in the defaults.' },
        { type: 'code', lang: 'text', tryIt: false, value: `<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="10.0.0" />
  </ItemGroup>

</Project>` },
        { type: 'note', value: 'Nullable enable turns on null-safety warnings. Keep it on for new projects; it catches many bugs at compile time.' },
      ],
    },
    {
      id: 'dn-project-structure',
      title: 'Project structure',
      blocks: [
        { type: 'text', value: 'Keep the entry point small. Put endpoints, services, models and data access in separate folders. A predictable structure makes a growing API easier to navigate.' },
        { type: 'code', lang: 'text', tryIt: false, value: `CoursesApi/
  Program.cs          app setup and endpoints
  Models/
    Course.cs
  Services/
    CourseService.cs
  Data/
    AppDbContext.cs
  Endpoints/
    CourseEndpoints.cs
  appsettings.json
  CoursesApi.csproj

CoursesApi.Tests/
  CourseServiceTests.cs` },
        { type: 'list', items: [
          'bin and obj are build output: do not commit them',
          'A separate test project keeps test packages out of production',
          'Put secrets in user secrets or environment variables, not appsettings.json',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dotnet-cli',
      q: 'Which command downloads NuGet packages?',
      options: ['dotnet restore', 'dotnet publish', 'dotnet new', 'dotnet format'],
      answer: 0,
      explain: 'dotnet restore resolves and downloads the packages a project needs.',
    },
    {
      chapterId: 'dotnet-cli',
      q: 'What does the .csproj file hold?',
      options: ['Only the source code', 'The target framework, packages and build options', 'The database', 'Test results'],
      answer: 1,
      explain: 'It describes how the project is built.',
    },
    {
      chapterId: 'dotnet-cli',
      q: 'Which folder should not be committed to git?',
      options: ['Controllers', 'bin and obj', 'Models', 'Endpoints'],
      answer: 1,
      explain: 'bin and obj are generated build output.',
    },
    {
      chapterId: 'dotnet-cli',
      q: 'What does Nullable enable do?',
      options: ['Turns off null checks', 'Warns about possible null references', 'Makes all fields optional', 'Creates a database'],
      answer: 1,
      explain: 'It helps the compiler find null reference bugs early.',
    },
  ],
};
