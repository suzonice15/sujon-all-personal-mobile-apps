// Kotlin chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Kotlin is, why Android uses it and your first program',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'kotlin-what-is',
      title: 'What is Kotlin?',
      blocks: [
        { type: 'text', value: 'Kotlin is a modern language that runs on the JVM, Android and JavaScript. It is concise, has null safety and interoperates with Java. Google recommends it for Android.' },
        { type: 'list', items: [
          'Runs on the JVM and compiles to native or JS too',
          'Null safety catches many crashes at compile time',
          'Much less boilerplate than Java',
          '100% interoperable with Java libraries',
          'Coroutines make async code readable',
        ] },
        { type: 'note', value: 'Kotlin is not a replacement for Java everywhere, but for Android and many backend services it is the default choice today.' },
      ],
    },
    {
      id: 'kotlin-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'A Kotlin program starts at main. println prints a line. No class or semicolon is required for a simple script.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    val name = "Ayesha"
    println("Hello, $name!")
    println("Welcome to Kotlin")
}` },
        { type: 'note', value: 'String templates use $name or ${expression}. They are safer and shorter than concatenation.' },
      ],
    },
    {
      id: 'kotlin-tooling',
      title: 'Tools',
      blocks: [
        { type: 'list', items: [
          'IntelliJ IDEA - the full Kotlin IDE',
          'Android Studio - Android development',
          'kotlinc - the command-line compiler',
          'Gradle - the build system',
          'Kotlin Playground - quick experiments in the browser',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar

# Or with Gradle
./gradlew run` },
        { type: 'note', value: 'For Android, install Android Studio. For backend, a Gradle or Maven project with the Kotlin plugin is enough.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Where does a Kotlin program start?',
      options: ['start()', 'main()', 'run()', 'init()'],
      answer: 1,
      explain: 'fun main() is the entry point.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does Kotlin add over Java?',
      options: ['A database', 'Null safety and less boilerplate', 'A browser', 'A CSS engine'],
      answer: 1,
      explain: 'Null safety and concise syntax are core benefits.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which platform does Kotlin target?',
      options: ['Only Android', 'JVM, Android, JS and native', 'Only the browser', 'Only iOS'],
      answer: 1,
      explain: 'It is multiplatform.',
    },
  ],
};
