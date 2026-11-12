// C# chapter: Collections and LINQ.

export default {
  id: 'collections-linq',
  title: 'Collections & LINQ',
  description: 'List, Dictionary and querying with LINQ',
  icon: 'view-list',
  lessons: [
    {
      id: 'cs-list',
      title: 'List<T>',
      blocks: [
        { type: 'text', value: 'A List<T> is a resizable array. T is the type it stores. Add appends, Remove deletes, and Count tells you the size. It is the default collection for an ordered group.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var names = new List<string>();
        names.Add("Ayesha");
        names.Add("Rahim");
        names.Add("Nusrat");

        names.Remove("Rahim");

        foreach (var name in names)
        {
            Console.WriteLine(name);
        }

        Console.WriteLine(names.Count);
        Console.WriteLine(names.Contains("Ayesha"));
    }
}` },
        { type: 'note', value: 'List<T> keeps order and allows duplicates. Use a HashSet<T> when you need unique values and fast membership checks.' },
      ],
    },
    {
      id: 'cs-dictionary',
      title: 'Dictionary<TKey, TValue>',
      blocks: [
        { type: 'text', value: 'A dictionary stores key-value pairs. Lookup by key is fast. Keys must be unique. Use TryGetValue to avoid an exception when the key is missing.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var scores = new Dictionary<string, int>
        {
            ["Ayesha"] = 92,
            ["Rahim"] = 78
        };

        scores["Nusrat"] = 88;

        if (scores.TryGetValue("Ayesha", out int score))
        {
            Console.WriteLine(score);
        }

        foreach (var pair in scores)
        {
            Console.WriteLine($"{pair.Key}: {pair.Value}");
        }
    }
}` },
        { type: 'note', value: 'Do not use a dictionary when you only need a list. It is a tool for lookup by key, not a replacement for every collection.' },
      ],
    },
    {
      id: 'cs-hashset-queue',
      title: 'HashSet, Queue and Stack',
      blocks: [
        { type: 'list', items: [
          'HashSet<T> - unique values, fast contains',
          'Queue<T> - first in, first out',
          'Stack<T> - last in, first out',
          'SortedSet<T> - unique and sorted',
          'LinkedList<T> - fast insert at a known node',
        ] },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var unique = new HashSet<int> { 1, 2, 2, 3 };
        Console.WriteLine(unique.Count); // 3

        var queue = new Queue<string>();
        queue.Enqueue("first");
        queue.Enqueue("second");
        Console.WriteLine(queue.Dequeue()); // first

        var stack = new Stack<string>();
        stack.Push("first");
        stack.Push("second");
        Console.WriteLine(stack.Pop()); // second
    }
}` },
        { type: 'note', value: 'Choose the collection by how you read and write it. Queue for order of arrival, stack for undo, set for uniqueness.' },
      ],
    },
    {
      id: 'cs-linq',
      title: 'LINQ',
      blocks: [
        { type: 'text', value: 'LINQ lets you query collections with readable methods: Where filters, Select transforms, OrderBy sorts, and First takes the first match. It works on lists, arrays and database queries.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        var courses = new List<Course>
        {
            new("SQL", 5000),
            new("C#", 6000),
            new("Git", 2000)
        };

        var cheap = courses
            .Where(c => c.Price < 6000)
            .OrderBy(c => c.Price)
            .Select(c => c.Title)
            .ToList();

        Console.WriteLine(string.Join(", ", cheap));
        Console.WriteLine(courses.Sum(c => c.Price));
        Console.WriteLine(courses.Any(c => c.Title == "SQL"));
    }
}

record Course(string Title, int Price);` },
        { type: 'note', value: 'c => c.Price is a lambda: "for each c, give me c.Price". LINQ reads like the question you are asking.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'collections-linq',
      q: 'Which collection stores key-value pairs?',
      options: ['List<T>', 'Dictionary<TKey, TValue>', 'HashSet<T>', 'Queue<T>'],
      answer: 1,
      explain: 'A dictionary maps each key to a value.',
    },
    {
      chapterId: 'collections-linq',
      q: 'Which collection removes duplicates automatically?',
      options: ['List<T>', 'HashSet<T>', 'Queue<T>', 'Array'],
      answer: 1,
      explain: 'A set stores unique values.',
    },
    {
      chapterId: 'collections-linq',
      q: 'What does LINQ Where do?',
      options: ['Sorts', 'Filters', 'Transforms', 'Counts'],
      answer: 1,
      explain: 'Where keeps items that match a condition.',
    },
    {
      chapterId: 'collections-linq',
      q: 'What does TryGetValue avoid?',
      options: ['A key lookup', 'An exception when the key is missing', 'A sort', 'A duplicate'],
      answer: 1,
      explain: 'It returns false instead of throwing.',
    },
  ],
};
