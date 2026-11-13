// Java chapter: Lambdas & Streams.

export default {
  id: 'streams-lambdas',
  title: 'Lambdas & Streams',
  description: 'Functional interfaces, stream pipelines and collectors',
  icon: 'code',
  lessons: [
    {
      id: 'java-lambdas',
      title: 'Lambdas and functional interfaces',
      blocks: [
        { type: 'text', value: 'A lambda is a short implementation of a functional interface: an interface with exactly one abstract method. Java ships common ones: Function, Predicate, Supplier and Consumer.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.List;\nimport java.util.function.Function;\n\npublic class LambdaDemo {\n    interface PriceRule {\n        int apply(int price);\n    }\n\n    public static void main(String[] args) {\n        PriceRule tenPercent = price -> price * 90 / 100;\n        Function<String, Integer> length = String::length;\n\n        System.out.println(tenPercent.apply(1000));\n        System.out.println(length.apply("CodeNest"));\n        System.out.println(List.of("a", "bb").stream().map(String::length).toList());\n    }\n}` },
        { type: 'note', value: 'A lambda captures effectively final variables only. Reassigning a captured local is a compile error.' },
      ],
    },
    {
      id: 'java-stream-pipeline',
      title: 'Stream pipelines',
      blocks: [
        { type: 'text', value: 'A stream pipeline is a source, zero or more intermediate operations and one terminal operation. Intermediate steps are lazy; nothing runs until the terminal step.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class StreamDemo {\n    record Course(String title, int price) {}\n\n    public static void main(String[] args) {\n        List<Course> courses = List.of(\n            new Course("HTML", 0),\n            new Course("SQL", 5000),\n            new Course("React", 4000)\n        );\n\n        List<String> paid = courses.stream()\n            .filter(c -> c.price() > 0)\n            .sorted((a, b) -> Integer.compare(a.price(), b.price()))\n            .map(Course::title)\n            .collect(Collectors.toList());\n\n        int total = courses.stream().mapToInt(Course::price).sum();\n        System.out.println(paid);\n        System.out.println(total);\n    }\n}` },
        { type: 'list', items: [
          'Use mapToInt for numeric sums and averages',
          'Keep lambdas to one line when possible',
          'Do not mutate a collection inside a stream',
          'A stream can be consumed once',
        ] },
        { type: 'note', value: 'A stream over a huge collection is not automatically parallel. Only use parallel() when the work is CPU-heavy and independent.' },
      ],
    },
    {
      id: 'java-collectors-optional',
      title: 'Collectors and Optional',
      blocks: [
        { type: 'text', value: 'Collectors group, partition and join results. Optional models a value that may be absent, so callers handle the empty case instead of risking a null.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.List;\nimport java.util.Map;\nimport java.util.Optional;\nimport java.util.stream.Collectors;\n\npublic class CollectorDemo {\n    record Course(String level, String title) {}\n\n    public static void main(String[] args) {\n        List<Course> courses = List.of(\n            new Course("beginner", "HTML"),\n            new Course("beginner", "CSS"),\n            new Course("advanced", "React")\n        );\n\n        Map<String, List<String>> byLevel = courses.stream()\n            .collect(Collectors.groupingBy(\n                Course::level,\n                Collectors.mapping(Course::title, Collectors.toList())\n            ));\n\n        Optional<Course> first = courses.stream()\n            .filter(c -> c.level().equals("advanced"))\n            .findFirst();\n\n        System.out.println(byLevel);\n        System.out.println(first.map(Course::title).orElse("none"));\n    }\n}` },
        { type: 'note', value: 'Return Optional from a method that may find nothing. Do not use it for fields or method parameters.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'streams-lambdas',
      q: 'What is a functional interface?',
      options: ['Any interface', 'An interface with one abstract method', 'A class with no fields', 'An annotation'],
      answer: 1,
      explain: 'It has exactly one abstract method.',
    },
    {
      chapterId: 'streams-lambdas',
      q: 'When does a stream pipeline run?',
      options: ['At the source', 'At each intermediate step', 'At the terminal operation', 'Never'],
      answer: 2,
      explain: 'Intermediate operations are lazy.',
    },
    {
      chapterId: 'streams-lambdas',
      q: 'Which collector groups by a key?',
      options: ['toList', 'groupingBy', 'joining', 'counting'],
      answer: 1,
      explain: 'groupingBy builds a Map of groups.',
    },
    {
      chapterId: 'streams-lambdas',
      q: 'What does Optional represent?',
      options: ['A nullable array', 'A value that may be absent', 'A thread', 'A stream'],
      answer: 1,
      explain: 'It models presence or absence.',
    },
  ],
};
