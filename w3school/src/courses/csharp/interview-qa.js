// C# interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is C# and what is .NET?',
      a: 'C# is a modern object-oriented language. .NET is the platform that provides the runtime, libraries and tools to build and run C# applications.',
      level: 'basic',
    },
    {
      q: 'What does the CLR do?',
      a: 'The Common Language Runtime loads compiled IL, JIT-compiles it to machine code, manages memory with the garbage collector and handles exceptions.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between .NET Framework and .NET?',
      a: '.NET Framework is the older Windows-only platform. Modern .NET is cross-platform, faster and the current version for new projects.',
      level: 'intermediate',
    },
    {
      q: 'What is NuGet?',
      a: 'The package manager for .NET. It installs libraries into a project and records them in the .csproj file.',
      level: 'basic',
    },
  ],
  'variables-types': [
    {
      q: 'Value type versus reference type?',
      a: 'A value type stores the data directly and is copied by value. A reference type stores a reference and copying it shares the same object.',
      level: 'basic',
    },
    {
      q: 'Class versus struct?',
      a: 'A class is a reference type and supports inheritance. A struct is a value type, usually small and immutable, and cannot inherit from another struct or class.',
      level: 'intermediate',
    },
    {
      q: 'Why use decimal for money?',
      a: 'decimal is a base-10 type with high precision, so it avoids the rounding errors of binary floating point for currency.',
      level: 'basic',
    },
    {
      q: 'What do ?. and ?? do?',
      a: '?. accesses a member only when the object is not null. ?? returns a fallback when the left side is null.',
      level: 'intermediate',
    },
  ],
  'operators-control': [
    {
      q: 'What is integer division?',
      a: 'Dividing two ints drops the fractional part. Cast one operand to double for a decimal result.',
      level: 'basic',
    },
    {
      q: 'When use switch instead of if/else?',
      a: 'When comparing one value against several clear options. A switch expression can return a value and is often shorter.',
      level: 'basic',
    },
    {
      q: 'What does break do in a loop?',
      a: 'It exits the loop immediately. continue skips the rest of the current iteration instead.',
      level: 'basic',
    },
    {
      q: 'What is a switch expression?',
      a: 'A concise form that maps patterns to values, for example score switch { >= 80 => "A", _ => "F" }. It returns a value and has no fall-through.',
      level: 'intermediate',
    },
  ],
  methods: [
    {
      q: 'ref versus out?',
      a: 'ref requires the caller to pass an initialised variable and allows reading and writing. out requires the method to assign the variable before returning.',
      level: 'intermediate',
    },
    {
      q: 'What are optional and named arguments?',
      a: 'Optional parameters have default values and can be omitted. Named arguments let the caller specify which parameter gets which value, in any order.',
      level: 'basic',
    },
    {
      q: 'What is method overloading?',
      a: 'Several methods with the same name but different parameter lists. The compiler chooses the correct one.',
      level: 'basic',
    },
    {
      q: 'Why prefer returning a result object over many out parameters?',
      a: 'A result object is easier to read, extend and test. It also avoids calling with a long list of out variables.',
      level: 'advanced',
    },
  ],
  'classes-objects': [
    {
      q: 'What is a constructor?',
      a: 'A special method that runs when an object is created with new. It initialises the object state.',
      level: 'basic',
    },
    {
      q: 'What is encapsulation?',
      a: 'Keeping fields private and exposing controlled properties or methods, so the class protects its own invariants.',
      level: 'basic',
    },
    {
      q: 'What is an auto-property?',
      a: 'A short property form such as public string Name { get; set; }. The compiler creates the backing field.',
      level: 'basic',
    },
    {
      q: 'When is a record better than a class?',
      a: 'When the type is mostly data and should compare by value, such as coordinates or API responses. Records generate equality, ToString and with-expressions.',
      level: 'intermediate',
    },
  ],
  'inheritance-polymorphism': [
    {
      q: 'virtual versus override?',
      a: 'virtual declares that a child may replace the method. override is the child actually replacing it. Without virtual, the parent method always runs.',
      level: 'basic',
    },
    {
      q: 'Abstract class versus interface?',
      a: 'An abstract class can hold state and shared code but allows only single inheritance. An interface is a contract and a class can implement many.',
      level: 'intermediate',
    },
    {
      q: 'What is polymorphism?',
      a: 'One variable or method call can behave differently depending on the real object type, through virtual dispatch.',
      level: 'basic',
    },
    {
      q: 'When prefer composition over inheritance?',
      a: 'When the relationship is "has a" rather than "is a", or when the base class is not designed for extension. Composition is more flexible.',
      level: 'advanced',
    },
  ],
  'collections-linq': [
    {
      q: 'List versus array?',
      a: 'An array has a fixed length. A List<T> resizes and provides Add, Remove and other methods.',
      level: 'basic',
    },
    {
      q: 'When use a Dictionary?',
      a: 'When you need fast lookup by a unique key. Use a List when order matters and you do not need key lookup.',
      level: 'basic',
    },
    {
      q: 'What is deferred execution in LINQ?',
      a: 'A query is not executed until you enumerate it or call a terminal method such as ToList or Count. That is why the result can change if the source changes first.',
      level: 'advanced',
    },
    {
      q: 'What does a lambda expression do?',
      a: 'It is a short inline function, such as c => c.Price, passed to methods like Where or Select.',
      level: 'basic',
    },
  ],
  'exceptions-files': [
    {
      q: 'What does finally guarantee?',
      a: 'It runs after try/catch whether or not an exception occurred, unless the process exits. It is used for cleanup.',
      level: 'basic',
    },
    {
      q: 'When create a custom exception?',
      a: 'When callers need to distinguish a domain failure, such as insufficient funds, and handle it differently.',
      level: 'intermediate',
    },
    {
      q: 'What does using do?',
      a: 'It calls Dispose on an IDisposable object at the end of the block, even when an exception is thrown.',
      level: 'basic',
    },
    {
      q: 'Why not catch Exception and ignore it?',
      a: 'It hides bugs and leaves the program in an unknown state. Catch only what you can handle.',
      level: 'intermediate',
    },
  ],
  'async-await': [
    {
      q: 'What does async/await actually do?',
      a: 'It lets a method wait for I/O without blocking the thread. The thread is released while the operation runs and resumes the method when it finishes.',
      level: 'basic',
    },
    {
      q: 'Why avoid async void?',
      a: 'It cannot be awaited and exceptions are hard to catch. Use async Task, except for event handlers.',
      level: 'intermediate',
    },
    {
      q: 'What is a deadlock risk with .Result?',
      a: 'Calling .Result or .Wait() on a UI thread can block the context needed to finish the task, causing a deadlock.',
      level: 'advanced',
    },
    {
      q: 'When use Task.WhenAll?',
      a: 'When several independent operations can run concurrently and you want to await all of them together.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you start a C# project?',
      a: 'Use dotnet new console or dotnet new webapi, then build the smallest complete feature first.',
      level: 'basic',
    },
    {
      q: 'What makes an API endpoint clean?',
      a: 'It validates input, calls a service, returns the correct status code and does not contain business logic in the route handler.',
      level: 'intermediate',
    },
    {
      q: 'How do you keep a project testable?',
      a: 'Small classes, dependencies injected, no hidden global state, and business logic separated from HTTP and database code.',
      level: 'intermediate',
    },
    {
      q: 'What is a good C# learning path?',
      a: 'Language basics, classes and LINQ, async, then ASP.NET Core and EF Core, then testing and one complete portfolio API.',
      level: 'basic',
    },
  ],
};
