// Java chapter: Exceptions.

export default {
  id: 'exceptions',
  title: 'Exceptions',
  description: 'Catch, throw and clean up resources safely',
  icon: 'report',
  lessons: [
    {
      id: 'java-try-catch',
      title: 'try, catch and finally',
      blocks: [
        { type: 'text', value: 'An exception interrupts normal flow. Catch the specific exception you can handle, and let everything else propagate. finally runs whether or not an exception occurred.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException error) {
            System.out.println("Cannot divide by zero");
        } finally {
            System.out.println("done");
        }
    }
}` },
        { type: 'note', value: 'Do not catch Exception just to print it and continue. Swallowing errors hides bugs and leaves the program in an unknown state.' },
      ],
    },
    {
      id: 'java-throw-custom',
      title: 'throw and custom exceptions',
      blocks: [
        { type: 'text', value: 'Throw an exception when a method cannot fulfil its contract. A custom checked exception makes the failure explicit in the method signature.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class InvalidAgeException extends Exception {
    InvalidAgeException(String message) {
        super(message);
    }
}

public class Main {
    static void checkAge(int age) throws InvalidAgeException {
        if (age < 0) {
            throw new InvalidAgeException("Age cannot be negative");
        }
    }

    public static void main(String[] args) {
        try {
            checkAge(-1);
        } catch (InvalidAgeException error) {
            System.out.println(error.getMessage());
        }
    }
}` },
        { type: 'note', value: 'Checked exceptions must be caught or declared. Unchecked exceptions extend RuntimeException and usually indicate a programming bug.' },
      ],
    },
    {
      id: 'java-checked-unchecked',
      title: 'Checked versus unchecked',
      blocks: [
        { type: 'list', items: [
          'Checked: IOException, SQLException - recoverable, caller must handle',
          'Unchecked: NullPointerException, IllegalArgumentException - usually a bug',
          'Never catch and ignore',
          'Wrap low-level exceptions in a domain exception when the caller should not know the details',
        ] },
        { type: 'text', value: 'A good rule: catch an exception only when you can do something useful: retry, use a fallback, or add context and rethrow.' },
      ],
    },
    {
      id: 'java-try-resources',
      title: 'try-with-resources',
      blocks: [
        { type: 'text', value: 'Any resource that implements AutoCloseable is closed automatically at the end of the block, even when an exception is thrown. This replaces most finally blocks.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.io.IOException;
import java.io.StringReader;

public class Main {
    public static void main(String[] args) {
        try (StringReader reader = new StringReader("hello")) {
            System.out.println((char) reader.read());
        } catch (IOException error) {
            System.out.println("read failed");
        }
    }
}` },
        { type: 'note', value: 'Declare multiple resources in one try, separated by semicolons. They close in reverse order.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'exceptions',
      q: 'When does finally run?',
      options: ['Only on success', 'Only on failure', 'Always, unless the JVM exits', 'Never'],
      answer: 2,
      explain: 'finally runs whether or not an exception was thrown.',
    },
    {
      chapterId: 'exceptions',
      q: 'Which exceptions must be caught or declared?',
      options: ['Unchecked', 'Checked', 'Runtime exceptions', 'Errors'],
      answer: 1,
      explain: 'The compiler enforces handling for checked exceptions.',
    },
    {
      chapterId: 'exceptions',
      q: 'What does try-with-resources guarantee?',
      options: ['Faster code', 'Automatic closing of resources', 'No exceptions', 'A new thread'],
      answer: 1,
      explain: 'AutoCloseable resources are closed at the end of the block.',
    },
    {
      chapterId: 'exceptions',
      q: 'Why is catching Exception and ignoring it bad?',
      options: ['It is slower', 'It hides bugs and leaves unknown state', 'It is not allowed', 'It uses too much memory'],
      answer: 1,
      explain: 'The program continues after a failure it did not handle.',
    },
  ],
};
