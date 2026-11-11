// Java chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'JVM, JDK, your first program and how compilation works',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'java-what-is',
      title: 'What is Java?',
      blocks: [
        { type: 'text', value: 'Java is a class-based, statically typed language. Source code compiles to bytecode, and the Java Virtual Machine (JVM) runs that bytecode on any operating system.' },
        { type: 'list', items: [
          'Write once, run anywhere: the JVM hides the platform',
          'Strong typing catches mistakes at compile time',
          'Huge ecosystem: Android, Spring, enterprise systems',
          'Automatic memory management with a garbage collector',
        ] },
        { type: 'note', value: 'JDK is the toolkit you install to compile. JRE is the runtime. JVM is the machine that executes bytecode. Modern JDKs include all three.' },
      ],
    },
    {
      id: 'java-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'Every Java program starts from a class. The main method is the entry point. System.out.println writes a line to the console.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}` },
        { type: 'list', items: [
          'public - accessible from anywhere',
          'static - belongs to the class, not an object',
          'void - returns nothing',
          'String[] args - command-line arguments',
        ] },
        { type: 'note', value: 'The file name must match the public class name. A public class Main must live in Main.java.' },
      ],
    },
    {
      id: 'java-compile-run',
      title: 'Compile and run',
      blocks: [
        { type: 'text', value: 'javac compiles source to .class bytecode. java runs the class. The JVM loads the class, finds main and executes it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `javac Main.java
java Main

# Newer JDKs can run a single file directly
java Main.java` },
        { type: 'text', value: 'A compile error means the code violates the language rules. A runtime exception means the code compiled but failed while running. The distinction tells you where to look.' },
        { type: 'note', value: 'Install a JDK 17 or 21 LTS. Avoid very new non-LTS versions for learning projects unless a library requires them.' },
      ],
    },
    {
      id: 'java-tooling',
      title: 'Tooling',
      blocks: [
        { type: 'list', items: [
          'IntelliJ IDEA - the most popular Java IDE',
          'VS Code with the Java extension pack',
          'Maven or Gradle - dependency and build management',
          'JUnit - the standard testing library',
          'Spring Boot - the most common backend framework',
        ] },
        { type: 'text', value: 'Start with plain javac and a text editor for the first week. Understanding compilation and classpath makes every larger tool easier to debug later.' },
        { type: 'note', value: 'The classpath is where the JVM looks for classes and jars. Most "class not found" errors are a classpath or package name mistake.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What runs Java bytecode?',
      options: ['The browser', 'The JVM', 'javac', 'Node.js'],
      answer: 1,
      explain: 'The Java Virtual Machine executes compiled bytecode on any platform.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which method is the entry point of a Java program?',
      options: ['start()', 'main()', 'run()', 'init()'],
      answer: 1,
      explain: 'public static void main(String[] args) is the entry point.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does javac produce?',
      options: ['A .exe file', 'Bytecode .class files', 'A jar only', 'HTML'],
      answer: 1,
      explain: 'javac compiles source into .class bytecode for the JVM.',
    },
    {
      chapterId: 'getting-started',
      q: 'What must match the public class name?',
      options: ['The folder name', 'The file name', 'The package name', 'The method name'],
      answer: 1,
      explain: 'A public class Main must be in Main.java.',
    },
  ],
};
