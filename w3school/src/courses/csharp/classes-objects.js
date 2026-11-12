// C# chapter: Classes and Objects.

export default {
  id: 'classes-objects',
  title: 'Classes & Objects',
  description: 'Blueprints, constructors, properties and records',
  icon: 'class',
  lessons: [
    {
      id: 'cs-class-basics',
      title: 'Class and object',
      blocks: [
        { type: 'text', value: 'A class is a blueprint; an object is a real thing built from it. Think of a cookie cutter and a cookie. The class describes the fields and behaviour; each object has its own values.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Student
{
    public string Name;
    public int Score;

    public Student(string name, int score)
    {
        Name = name;
        Score = score;
    }

    public bool Passed()
    {
        return Score >= 60;
    }
}

class Program
{
    static void Main()
    {
        var ayesha = new Student("Ayesha", 92);
        var rahim = new Student("Rahim", 55);

        Console.WriteLine($"{ayesha.Name} passed: {ayesha.Passed()}");
        Console.WriteLine($"{rahim.Name} passed: {rahim.Passed()}");
    }
}` },
        { type: 'note', value: 'The constructor runs when you use new. It is the place to set the initial state of the object.' },
      ],
    },
    {
      id: 'cs-properties',
      title: 'Properties',
      blocks: [
        { type: 'text', value: 'A public field lets anyone write any value. A property gives you a controlled way to read and write. Auto-properties are the short form; init-only properties can be set only at creation.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Account
{
    public string Owner { get; }
    public decimal Balance { get; private set; }

    public Account(string owner, decimal balance)
    {
        Owner = owner;
        Balance = balance;
    }

    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            Balance += amount;
        }
    }
}

class Program
{
    static void Main()
    {
        var account = new Account("Ayesha", 100m);
        account.Deposit(50m);
        Console.WriteLine(account.Balance); // 150
    }
}` },
        { type: 'note', value: 'get; means readable, set; means writable. private set; means only the class can change it.' },
      ],
    },
    {
      id: 'cs-static-records',
      title: 'static and records',
      blocks: [
        { type: 'text', value: 'A static member belongs to the class, not to an object. A record is a small data type that gives you value equality and a readable ToString for free.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Counter
{
    public static int Count { get; private set; }

    public static int Next()
    {
        Count++;
        return Count;
    }
}

record Point(int X, int Y);

class Program
{
    static void Main()
    {
        Console.WriteLine(Counter.Next());
        Console.WriteLine(Counter.Next());

        var a = new Point(2, 3);
        var b = new Point(2, 3);
        Console.WriteLine(a == b); // true, value equality
        Console.WriteLine(a);      // Point { X = 2, Y = 3 }
    }
}` },
        { type: 'note', value: 'Use records for data you compare by value, such as coordinates, money or API responses. Use classes for objects with behaviour and identity.' },
      ],
    },
    {
      id: 'cs-object-initializer',
      title: 'Object initializers',
      blocks: [
        { type: 'text', value: 'An object initializer sets properties right after new. It keeps creation short without writing a long constructor for every combination of fields.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Course
{
    public string Title { get; set; } = "";
    public int Price { get; set; }
    public bool Published { get; set; }
}

class Program
{
    static void Main()
    {
        var course = new Course
        {
            Title = "SQL",
            Price = 5000,
            Published = true
        };

        Console.WriteLine($"{course.Title} {course.Price}");
    }
}` },
        { type: 'note', value: 'A property initializer such as = "" prevents an accidental null for string properties. It is a small habit with a big payoff.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'classes-objects',
      q: 'What is an object?',
      options: ['A blueprint', 'A real instance of a class', 'A method', 'A namespace'],
      answer: 1,
      explain: 'The class describes; the object exists.',
    },
    {
      chapterId: 'classes-objects',
      q: 'What does private set; mean on a property?',
      options: ['Anyone can write it', 'Only the class can write it', 'It is read-only forever', 'It is static'],
      answer: 1,
      explain: 'The getter is public but the setter is restricted.',
    },
    {
      chapterId: 'classes-objects',
      q: 'What is special about a record?',
      options: ['It has value equality', 'It cannot have methods', 'It is always static', 'It cannot be created'],
      answer: 0,
      explain: 'Records compare by value and print nicely by default.',
    },
    {
      chapterId: 'classes-objects',
      q: 'When does a constructor run?',
      options: ['When the class is declared', 'When new creates an object', 'When a method is called', 'At program exit'],
      answer: 1,
      explain: 'It initialises each new object.',
    },
  ],
};
