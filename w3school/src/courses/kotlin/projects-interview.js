// Kotlin chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a console app and a Compose screen',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'kotlin-project-console',
      title: 'Project: student manager',
      blocks: [
        { type: 'text', value: 'Combine a data class, a list and the standard collection functions. The program prints an average, the top student and the passing students.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `data class Student(val name: String, val score: Int)

fun main() {
    val students = listOf(
        Student("Ayesha", 92),
        Student("Rahim", 78),
        Student("Nusrat", 88)
    )

    val average = students.map { it.score }.average()
    val top = students.maxBy { it.score }
    val passed = students.filter { it.score >= 80 }

    println("Average: %.1f".format(average))
    println("Top: \${top.name} (\${top.score})")
    passed.forEach { println("\${it.name} passed") }
}` },
        { type: 'note', value: 'A data class, listOf and three collection calls already form a complete program. Small and finished beats large and unfinished.' },
      ],
    },
    {
      id: 'kotlin-project-compose',
      title: 'Project: course list screen',
      blocks: [
        { type: 'text', value: 'A Compose screen with a list, a loading state and a click handler. Use a ViewModel for the data and remember for local UI state.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `@Composable
fun CourseListScreen(viewModel: CourseViewModel = viewModel()) {
    val courses by viewModel.courses.collectAsState()

    LazyColumn {
        items(courses) { course ->
            ListItem(
                headlineContent = { Text(course) },
                modifier = Modifier.clickable { /* open detail */ }
            )
        }
    }
}` },
        { type: 'note', value: 'LazyColumn is the Compose equivalent of a virtualised list. Do not use a Column with a huge number of children.' },
      ],
    },
    {
      id: 'kotlin-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'val versus var?',
          'How does null safety work?',
          'What is a data class?',
          'open, override and final?',
          'Sealed class versus abstract class?',
          'What is a suspend function?',
          'launch versus async?',
          'What is a ViewModel for?',
          'How does Compose recomposition work?',
          'Why is Kotlin preferred for Android?',
        ] },
        { type: 'text', value: 'Strong answers are concrete and compare with Java or another language. "val is a read-only reference, var can be reassigned" is better than "val is constant".' },
        { type: 'note', value: 'Be ready to write a data class, a collection pipeline and a small Compose screen live.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which collection function computes an average?',
      options: ['sum', 'average', 'count', 'maxBy'],
      answer: 1,
      explain: 'average returns the mean of numbers.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which Compose widget is a virtualised list?',
      options: ['Column', 'LazyColumn', 'Row', 'Box'],
      answer: 1,
      explain: 'LazyColumn builds items on demand.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a ViewModel avoid holding?',
      options: ['A repository', 'An Activity or View', 'A StateFlow', 'A data class'],
      answer: 1,
      explain: 'Holding an Activity leaks it.',
    },
  ],
};
