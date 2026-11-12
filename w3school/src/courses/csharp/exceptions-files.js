// C# chapter: Exceptions and Files.

export default {
  id: 'exceptions-files',
  title: 'Exceptions & Files',
  description: 'Handle failure and read or write files safely',
  icon: 'report',
  lessons: [
    {
      id: 'cs-try-catch',
      title: 'try, catch and finally',
      blocks: [
        { type: 'text', value: 'An exception is a failure that interrupts normal flow. Catch the specific exception you can handle. finally runs whether or not an exception happened.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        try
        {
            int result = 10 / int.Parse("0");
            Console.WriteLine(result);
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("Cannot divide by zero");
        }
        catch (FormatException)
        {
            Console.WriteLine("That was not a number");
        }
        finally
        {
            Console.WriteLine("done");
        }
    }
}` },
        { type: 'note', value: 'Catch the most specific exception first. A broad catch (Exception) hides bugs you did not expect.' },
      ],
    },
    {
      id: 'cs-custom-exception',
      title: 'Custom exceptions',
      blocks: [
        { type: 'text', value: 'Create a custom exception when the caller needs to distinguish a domain failure, such as insufficient funds, from a generic error.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class InsufficientFundsException : Exception
{
    public InsufficientFundsException(string message) : base(message) { }
}

class Account
{
    public decimal Balance { get; private set; } = 100m;

    public void Withdraw(decimal amount)
    {
        if (amount > Balance)
        {
            throw new InsufficientFundsException("Not enough balance");
        }
        Balance -= amount;
    }
}

class Program
{
    static void Main()
    {
        try
        {
            new Account().Withdraw(150m);
        }
        catch (InsufficientFundsException error)
        {
            Console.WriteLine(error.Message);
        }
    }
}` },
        { type: 'note', value: 'Throw when a method cannot fulfil its contract. Return a result object when failure is a normal expected outcome.' },
      ],
    },
    {
      id: 'cs-files',
      title: 'Files',
      blocks: [
        { type: 'text', value: 'System.IO.File reads and writes text in one call. For very large files, use a StreamReader or StreamWriter so the whole file is not loaded into memory.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.IO;

class Program
{
    static void Main()
    {
        string path = "demo.txt";

        File.WriteAllText(path, "Hello, file!");
        string text = File.ReadAllText(path);

        Console.WriteLine(text);
        Console.WriteLine(File.Exists(path));

        File.Delete(path);
    }
}` },
        { type: 'note', value: 'File operations can fail: the path is wrong, permission is denied or the disk is full. Wrap them in try/catch and show a clear message.' },
      ],
    },
    {
      id: 'cs-using',
      title: 'using and IDisposable',
      blocks: [
        { type: 'text', value: 'Some objects hold a resource such as a file or network connection. They implement IDisposable. A using block calls Dispose automatically, even when an exception occurs.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.IO;

class Program
{
    static void Main()
    {
        using (var writer = new StreamWriter("log.txt"))
        {
            writer.WriteLine("line 1");
            writer.WriteLine("line 2");
        } // Dispose closes the file here

        using var reader = new StreamReader("log.txt");
        string? line;
        while ((line = reader.ReadLine()) != null)
        {
            Console.WriteLine(line);
        }

        File.Delete("log.txt");
    }
}` },
        { type: 'note', value: 'using is not only for files. Any IDisposable resource, including database connections and HTTP responses, benefits from deterministic cleanup.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'exceptions-files',
      q: 'When does finally run?',
      options: ['Only on success', 'Only on failure', 'Always, unless the process exits', 'Never'],
      answer: 2,
      explain: 'It runs whether or not an exception occurred.',
    },
    {
      chapterId: 'exceptions-files',
      q: 'Why catch a specific exception?',
      options: ['It is faster', 'It avoids hiding unexpected bugs', 'It is required by C#', 'It enables LINQ'],
      answer: 1,
      explain: 'A broad catch can swallow errors you did not plan for.',
    },
    {
      chapterId: 'exceptions-files',
      q: 'What does a using block do?',
      options: ['Imports a namespace', 'Calls Dispose automatically', 'Creates a thread', 'Opens a database'],
      answer: 1,
      explain: 'It guarantees cleanup for IDisposable objects.',
    },
    {
      chapterId: 'exceptions-files',
      q: 'Which class writes text to a file easily?',
      options: ['File', 'Math', 'Console', 'Task'],
      answer: 0,
      explain: 'File.WriteAllText and ReadAllText are the simple helpers.',
    },
  ],
};
