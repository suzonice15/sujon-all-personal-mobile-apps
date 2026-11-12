// C# chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a console app and prepare for C# interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'cs-project-console',
      title: 'Project: student manager',
      blocks: [
        { type: 'text', value: 'Combine a class, a list and LINQ. The program adds students, calculates an average and prints the top student. This is a complete, small, useful program.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Collections.Generic;
using System.Linq;

record Student(string Name, int Score);

class Program
{
    static void Main()
    {
        var students = new List<Student>
        {
            new("Ayesha", 92),
            new("Rahim", 78),
            new("Nusrat", 88)
        };

        double average = students.Average(s => s.Score);
        var top = students.OrderByDescending(s => s.Score).First();

        Console.WriteLine($"Average: {average:F1}");
        Console.WriteLine($"Top: {top.Name} ({top.Score})");

        foreach (var student in students.Where(s => s.Score >= 80))
        {
            Console.WriteLine($"{student.Name} passed with {student.Score}");
        }
    }
}` },
        { type: 'note', value: 'A record, a list and three LINQ calls already form a real program. Small and complete beats large and unfinished.' },
      ],
    },
    {
      id: 'cs-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the difference between a value type and a reference type?',
          'Class versus struct?',
          'What do virtual, override and abstract mean?',
          'Interface versus abstract class?',
          'What is dependency injection?',
          'What does async/await actually do?',
          'What is the difference between IEnumerable and List?',
          'How does garbage collection work at a high level?',
          'What is the difference between const, readonly and static?',
          'When do you throw an exception versus return a result?',
        ] },
        { type: 'text', value: 'C# interviews reward precise language. Say "reference type" and "value type", "compile time" and "runtime", and explain the trade-off instead of reciting a definition.' },
        { type: 'note', value: 'Be ready to write a small class, a LINQ query and a minimal API endpoint live. Those three cover most junior interviews.' },
      ],
    },
    {
      id: 'cs-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1-2: syntax, types, methods, classes',
          'Week 3: collections, LINQ, exceptions, files',
          'Week 4: async/await and a console project',
          'Week 5: take the .NET course for ASP.NET Core, EF Core and testing',
          'Week 6: build one complete portfolio project',
        ] },
        { type: 'text', value: 'Do not jump to ASP.NET Core before you are comfortable with classes and LINQ. The web framework is thin; the language is the real work.' },
        { type: 'note', value: 'Build one project you can explain end to end. Interviewers care more about depth in one app than a list of tutorials.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which LINQ method calculates an average?',
      options: ['Sum', 'Average', 'Count', 'First'],
      answer: 1,
      explain: 'Average returns the mean of a numeric sequence.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which keyword makes a method return a value that can be awaited later?',
      options: ['static', 'async Task', 'virtual', 'readonly'],
      answer: 1,
      explain: 'async Task marks a method whose result can be awaited.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is a good first portfolio project?',
      options: ['A large unfinished platform', 'A small complete API with tests', 'A UI mockup', 'A copied tutorial'],
      answer: 1,
      explain: 'Depth and completeness beat size.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why learn classes before ASP.NET Core?',
      options: ['The framework requires it', 'The language and object model are the foundation', 'It is faster', 'It is not necessary'],
      answer: 1,
      explain: 'The web framework is thin on top of the language.',
    },
  ],
};
