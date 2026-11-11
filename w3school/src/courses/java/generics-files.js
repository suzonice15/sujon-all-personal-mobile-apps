// Java chapter: Generics and Files.

export default {
  id: 'generics-files',
  title: 'Generics & Files',
  description: 'Type-safe containers, streams and file I/O',
  icon: 'folder',
  lessons: [
    {
      id: 'java-generic-class',
      title: 'Generic classes',
      blocks: [
        { type: 'text', value: 'A generic class works with many types while keeping type safety. T is a type parameter chosen when the object is created. Generics are checked at compile time and erased at runtime.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Box<T> {
    private final T value;

    Box(T value) {
        this.value = value;
    }

    T get() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Box<String> text = new Box<>("SQL");
        Box<Integer> number = new Box<>(42);

        System.out.println(text.get());
        System.out.println(number.get());
    }
}` },
        { type: 'note', value: 'You cannot create a generic array or use a primitive as a type argument. Use Integer instead of int inside generics.' },
      ],
    },
    {
      id: 'java-generic-method',
      title: 'Generic methods and bounds',
      blocks: [
        { type: 'text', value: 'A generic method declares its own type parameter. A bound such as T extends Comparable<T> guarantees the method can compare values.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(max(3, 7));
        System.out.println(max("apple", "banana"));
    }
}` },
        { type: 'note', value: 'Generics improve compile-time safety. They do not create separate classes at runtime; the compiler inserts casts where needed.' },
      ],
    },
    {
      id: 'java-streams',
      title: 'Streams',
      blocks: [
        { type: 'text', value: 'A stream processes a collection as a pipeline: filter, map, sort and collect. It is declarative and readable, but not always faster than a loop.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = List.of(1, 2, 3, 4, 5, 6);

        List<Integer> even = values.stream()
                .filter(value -> value % 2 == 0)
                .map(value -> value * 10)
                .collect(Collectors.toList());

        System.out.println(even);
    }
}` },
        { type: 'note', value: 'A stream can be consumed once. Reusing a stream after a terminal operation throws IllegalStateException.' },
      ],
    },
    {
      id: 'java-files',
      title: 'Files',
      blocks: [
        { type: 'text', value: 'java.nio.file.Files reads and writes text in one call. For large files, use a BufferedReader or Files.lines so the whole file is not loaded into memory.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws Exception {
        Path file = Path.of("demo.txt");

        Files.writeString(file, "Hello, file!");
        System.out.println(Files.readString(file));

        Files.deleteIfExists(file);
    }
}` },
        { type: 'note', value: 'Always close files. try-with-resources is the safest pattern for readers, writers and streams.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'generics-files',
      q: 'What does Box<String> guarantee?',
      options: ['Only strings can be stored', 'Any object can be stored', 'The box is static', 'The box is immutable'],
      answer: 0,
      explain: 'The type parameter fixes the element type at compile time.',
    },
    {
      chapterId: 'generics-files',
      q: 'What does T extends Comparable<T> mean?',
      options: ['T is a number', 'T can be compared to itself', 'T is optional', 'T is an array'],
      answer: 1,
      explain: 'The bound allows compareTo calls on values of type T.',
    },
    {
      chapterId: 'generics-files',
      q: 'Which stream operation is terminal?',
      options: ['filter', 'map', 'collect', 'sorted'],
      answer: 2,
      explain: 'collect produces a result and consumes the stream.',
    },
    {
      chapterId: 'generics-files',
      q: 'Why use Files.lines for a large file?',
      options: ['It is shorter', 'It processes line by line without loading everything', 'It encrypts the file', 'It writes faster'],
      answer: 1,
      explain: 'Streaming keeps memory usage low.',
    },
  ],
};
