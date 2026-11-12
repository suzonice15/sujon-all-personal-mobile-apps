// .NET chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What .NET is, the SDK and the runtime',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'dn-what-is-dotnet',
      title: 'What is .NET?',
      blocks: [
        { type: 'text', value: '.NET is a free, cross-platform platform for building apps. It includes a runtime that runs your code, a set of libraries, and tools. You can use it for web APIs, desktop apps, mobile apps, games and cloud services.' },
        { type: 'list', items: [
          'C# is the main language, F# and Visual Basic are also supported',
          'The runtime runs on Windows, Linux and macOS',
          'ASP.NET Core is the web framework',
          'EF Core is the data access library',
          'NuGet is the package manager',
        ] },
        { type: 'note', value: 'Use the current long-term support version of .NET for new projects. The old .NET Framework only runs on Windows and is not the choice for new work.' },
      ],
    },
    {
      id: 'dn-sdk-runtime',
      title: 'SDK and runtime',
      blocks: [
        { type: 'text', value: 'The SDK is what developers install. It contains the compiler, the CLI and the templates. The runtime is what end users need to run a published app.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `dotnet --info
dotnet --list-sdks
dotnet --list-runtimes` },
        { type: 'list', items: [
          'SDK - build, test and run code',
          'Runtime - only runs an app that is already built',
          'Framework-dependent - needs a runtime on the target machine',
          'Self-contained - bundles the runtime, bigger but needs nothing installed',
        ] },
        { type: 'note', value: 'Deploying a self-contained app is a simple way to avoid "runtime not installed" errors on a server.' },
      ],
    },
    {
      id: 'dn-clr-jit',
      title: 'How .NET runs your code',
      blocks: [
        { type: 'text', value: 'The C# compiler turns source code into IL, an intermediate language. At run time the Common Language Runtime (CLR) compiles IL to machine code with the JIT compiler, and manages memory with the garbage collector.' },
        { type: 'code', lang: 'text', tryIt: false, value: `source (.cs)
  -> C# compiler -> IL in a .dll
  -> CLR loads the .dll
  -> JIT compiles IL to machine code
  -> garbage collector frees unused objects` },
        { type: 'note', value: 'Ahead-of-time (AOT) compilation can produce native binaries with faster startup. It is useful for serverless and small containers.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is the .NET SDK?',
      options: ['Only the runtime', 'Compiler, CLI and templates for developers', 'A database', 'A browser'],
      answer: 1,
      explain: 'Developers install the SDK to build and run projects.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does the CLR do?',
      options: ['Designs the UI', 'Loads IL, JIT-compiles it and manages memory', 'Stores files', 'Sends email'],
      answer: 1,
      explain: 'The runtime executes compiled .NET code.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a self-contained deployment?',
      options: ['An app that needs no runtime on the target', 'An app with no code', 'A database backup', 'A test project'],
      answer: 0,
      explain: 'The runtime is bundled with the app.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is NuGet?',
      options: ['A package manager for .NET libraries', 'A web server', 'A database', 'A language'],
      answer: 0,
      explain: 'NuGet installs and versions packages.',
    },
  ],
};
