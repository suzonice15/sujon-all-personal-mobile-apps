// C# chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What C# and .NET are, and your first program',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'cs-what-is',
      title: 'C# and .NET in simple words',
      blocks: [
        { type: 'text', value: 'Think of C# as the language you write, and .NET as the workshop that runs it. C# is the grammar; .NET provides the tools, libraries and runtime that turn your code into a working app.' },
        { type: 'list', items: [
          'C# - a modern, typed, object-oriented language',
          '.NET - the platform: runtime, libraries and tools',
          'CLR - the engine that runs compiled C# code',
          'BCL - the built-in library: lists, files, HTTP, JSON',
          'SDK - the command-line tools that build and run projects',
        ] },
        { type: 'note', value: 'You do not need to memorise the acronyms. Just remember: C# is the language, .NET is the platform that runs it.' },
      ],
    },
    {
      id: 'cs-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'A C# program starts at Main. System.Console.WriteLine prints a line. Every statement ends with a semicolon, and code lives inside a class.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, C#!");
        Console.WriteLine("My first .NET program");
    }
}` },
        { type: 'list', items: [
          'using System; lets you use Console without the full name',
          'class Program is the container for your code',
          'static void Main() is the entry point',
          'Console.WriteLine prints text and a newline',
        ] },
        { type: 'note', value: 'Modern .NET also allows top-level statements: you can write Console.WriteLine("Hi"); at the top of the file without a class. Both styles are valid.' },
      ],
    },
    {
      id: 'cs-how-it-runs',
      title: 'How C# runs',
      blocks: [
        { type: 'text', value: 'C# compiles to IL (Intermediate Language), not directly to machine code. When the program starts, the CLR uses JIT compilation to turn IL into machine code for your computer.' },
        { type: 'code', lang: 'text', tryIt: false, value: `your code (C#)
  -> compiler -> IL (.dll)
    -> CLR loads it
      -> JIT -> machine code for this CPU
        -> program runs` },
        { type: 'list', items: [
          'Compile once, run on Windows, Linux and macOS',
          'JIT means the code is optimised for the current machine',
          'Garbage collection frees unused objects automatically',
          'You still manage resources such as files and connections',
        ] },
        { type: 'note', value: 'This is why .NET is cross-platform today. The same compiled app runs wherever .NET is installed.' },
      ],
    },
    {
      id: 'cs-tools',
      title: 'Tools you will use',
      blocks: [
        { type: 'list', items: [
          'Visual Studio - the full IDE for Windows',
          'VS Code + C# Dev Kit - light and cross-platform',
          'dotnet CLI - create, build, run and test from the terminal',
          'NuGet - the package manager for .NET libraries',
          'xUnit - the common testing library',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `dotnet new console -n HelloApp
cd HelloApp
dotnet run

dotnet new webapi -n CoursesApi
dotnet test` },
        { type: 'note', value: 'Start with dotnet new console. Seeing a program run in the terminal makes the whole toolchain concrete.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is the relationship between C# and .NET?',
      options: ['They are the same thing', 'C# is the language; .NET is the platform', '.NET is a database', 'C# is a browser'],
      answer: 1,
      explain: 'You write C#; .NET provides the runtime, libraries and tools.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which method is the entry point?',
      options: ['Start', 'Main', 'Run', 'Init'],
      answer: 1,
      explain: 'Execution begins at Main.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does the CLR do?',
      options: ['Designs the UI', 'Runs compiled .NET code', 'Stores data', 'Compiles JavaScript'],
      answer: 1,
      explain: 'The Common Language Runtime loads and executes IL.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which command runs a .NET project?',
      options: ['dotnet run', 'dotnet test only', 'node start', 'java run'],
      answer: 0,
      explain: 'dotnet run builds and starts the project.',
    },
  ],
};
