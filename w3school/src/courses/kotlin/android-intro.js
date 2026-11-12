// Kotlin chapter: Android Intro.

export default {
  id: 'android-intro',
  title: 'Android with Kotlin',
  description: 'Activity, Compose, state and lifecycle',
  icon: 'phone-android',
  lessons: [
    {
      id: 'kotlin-activity',
      title: 'Activity',
      blocks: [
        { type: 'text', value: 'An Activity is one screen. onCreate sets up the UI. Modern Android uses Jetpack Compose for the UI and ViewModel for state that survives configuration changes.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                CounterScreen()
            }
        }
    }
}` },
        { type: 'note', value: 'Do not do heavy work in onCreate. Load data asynchronously and show a loading state.' },
      ],
    },
    {
      id: 'kotlin-compose',
      title: 'Compose basics',
      blocks: [
        { type: 'text', value: 'Compose describes UI with functions annotated @Composable. State is read in the composable; changing it triggers recomposition. remember and mutableStateOf hold local state.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }

    Column(Modifier.padding(16.dp)) {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Add")
        }
    }
}` },
        { type: 'note', value: 'Never mutate state outside setter functions. With mutableStateOf, assignment through the delegate triggers recomposition.' },
      ],
    },
    {
      id: 'kotlin-viewmodel',
      title: 'ViewModel and lifecycle',
      blocks: [
        { type: 'text', value: 'A ViewModel holds screen state and survives rotation. It should not hold an Activity or a View. Use viewModelScope for async work so it cancels when the ViewModel clears.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `class CourseViewModel : ViewModel() {
    private val _courses = MutableStateFlow<List<String>>(emptyList())
    val courses: StateFlow<List<String>> = _courses

    fun load() {
        viewModelScope.launch {
            _courses.value = repository.fetchCourses()
        }
    }
}` },
        { type: 'note', value: 'A ViewModel that takes an Activity leaks it. Pass a repository or application context instead.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'android-intro',
      q: 'What is an Activity?',
      options: ['A database', 'One screen', 'A thread', 'A network call'],
      answer: 1,
      explain: 'It hosts a screen in Android.',
    },
    {
      chapterId: 'android-intro',
      q: 'What does @Composable mark?',
      options: ['A database table', 'A UI function', 'A test', 'A thread'],
      answer: 1,
      explain: 'Compose renders the function as UI.',
    },
    {
      chapterId: 'android-intro',
      q: 'Why use a ViewModel?',
      options: ['To hold screen state across rotation', 'To style buttons', 'To open routes', 'To compile'],
      answer: 0,
      explain: 'It survives configuration changes.',
    },
  ],
};
