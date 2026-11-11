// Java chapter: Projects and Interview Practice.

export default {
  id: 'project-interview',
  title: 'Project & Interview Prep',
  description: 'Build a bank account model and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'java-project-bank',
      title: 'Project: bank account',
      blocks: [
        { type: 'text', value: 'Model an account with encapsulation and a custom checked exception. The example shows how validation, state and failure belong together in one class.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    private final String owner;
    private int balance;

    BankAccount(String owner, int balance) {
        this.owner = owner;
        this.balance = balance;
    }

    void withdraw(int amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Not enough balance");
        }
        balance -= amount;
    }

    int getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("Ayesha", 100);

        try {
            account.withdraw(150);
        } catch (InsufficientFundsException error) {
            System.out.println(error.getMessage());
        }

        System.out.println(account.getBalance());
    }
}` },
        { type: 'note', value: 'Money should not be stored in double. Use int paisa or BigDecimal. Floating point cannot represent every decimal exactly.' },
      ],
    },
    {
      id: 'java-project-service',
      title: 'Designing a service',
      blocks: [
        { type: 'text', value: 'Program to interfaces. A service depends on a repository interface, so the real database can be replaced with an in-memory implementation in tests.' },
        { type: 'code', lang: 'java', tryIt: false, value: `interface CourseRepository {
    void save(String title);
    int count();
}

class InMemoryCourseRepository implements CourseRepository {
    private int total;

    public void save(String title) {
        total++;
    }

    public int count() {
        return total;
    }
}

class CourseService {
    private final CourseRepository repository;

    CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    void add(String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        repository.save(title);
    }
}

public class Main {
    public static void main(String[] args) {
        CourseService service = new CourseService(new InMemoryCourseRepository());
        service.add("SQL");
        System.out.println("saved");
    }
}` },
        { type: 'note', value: 'Dependency injection is just passing the dependency in the constructor. It makes the class testable without a framework.' },
      ],
    },
    {
      id: 'java-testing',
      title: 'Testing with JUnit',
      blocks: [
        { type: 'text', value: 'JUnit runs test methods annotated with @Test. Assertions state the expected result. Test the behaviour, not the private implementation.' },
        { type: 'code', lang: 'java', tryIt: false, compile: false, value: `import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class BankAccountTest {
    @Test
    void rejectsWithdrawAboveBalance() {
        BankAccount account = new BankAccount("Ayesha", 100);

        assertThrows(InsufficientFundsException.class, () -> account.withdraw(150));
        assertEquals(100, account.getBalance());
    }
}` },
        { type: 'list', items: [
          'One assertion concept per test',
          'Test the happy path and the failure path',
          'Use a fresh object for each test',
          'Name tests by behaviour, not by method name',
        ] },
      ],
    },
    {
      id: 'java-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the difference between JDK, JRE and JVM?',
          'Why is String immutable?',
          'What is the difference between == and equals?',
          'Explain overloading versus overriding.',
          'Abstract class versus interface?',
          'What do equals and hashCode have to do with HashMap?',
          'Checked versus unchecked exceptions?',
          'What is the difference between ArrayList and LinkedList?',
          'What does the static keyword mean?',
          'How does garbage collection work at a high level?',
        ] },
        { type: 'text', value: 'Java interviews reward precise vocabulary. Say "dynamic dispatch" instead of "it picks the right method", and "immutable" instead of "cannot change". Then give a short example.' },
        { type: 'note', value: 'You do not need to memorise the JVM specification. You do need to explain the core object model and the trade-offs between collections.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'project-interview',
      q: 'Which type should store money?',
      options: ['double', 'float', 'int paisa or BigDecimal', 'char'],
      answer: 2,
      explain: 'Floating point cannot represent every decimal exactly.',
    },
    {
      chapterId: 'project-interview',
      q: 'Why depend on a repository interface?',
      options: ['To make the code longer', 'To swap implementations and test easily', 'To enable inheritance', 'To avoid constructors'],
      answer: 1,
      explain: 'The service can use an in-memory repository in tests.',
    },
    {
      chapterId: 'project-interview',
      q: 'What does assertThrows check?',
      options: ['That a method returns null', 'That a specific exception is thrown', 'That a method is fast', 'That a class compiles'],
      answer: 1,
      explain: 'It asserts the expected failure type.',
    },
    {
      chapterId: 'project-interview',
      q: 'What is dynamic dispatch?',
      options: ['Choosing the overridden method at runtime', 'Compiling faster', 'Creating a thread', 'Sorting a list'],
      answer: 0,
      explain: 'The actual object type decides which overridden method runs.',
    },
  ],
};
