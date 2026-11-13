// Kotlin chapter: Jetpack Compose.

export default {
  id: 'android-compose',
  title: 'Jetpack Compose',
  description: 'Declarative UI, state and ViewModel',
  icon: 'phone-android',
  lessons: [
    {
      id: 'kotlin-compose-ui',
      title: 'Compose basics',
      blocks: [
        { type: 'text', value: 'Jetpack Compose builds UI with functions annotated @Composable. You describe the screen; Compose re-runs the affected functions when state changes. There is no XML layout.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `@Composable\nfun CourseCard(title: String, onClick: () -> Unit) {\n    Card(\n        modifier = Modifier\n            .fillMaxWidth()\n            .padding(16.dp)\n            .clickable(onClick = onClick)\n    ) {\n        Column(modifier = Modifier.padding(16.dp)) {\n            Text(text = title, style = MaterialTheme.typography.titleMedium)\n            Text(text = "Tap to start", style = MaterialTheme.typography.bodySmall)\n        }\n    }\n}` },
        { type: 'list', items: [
          'Composables are functions, not classes',
          'Modifier order matters',
          'Preview with @Preview',
          'Keep composables small',
          'Do not do I/O inside a composable',
        ] },
        { type: 'note', value: 'A composable can run many times. Keep it idempotent and cheap.' },
      ],
    },
    {
      id: 'kotlin-compose-state',
      title: 'State and ViewModel',
      blocks: [
        { type: 'text', value: 'UI state lives in a ViewModel as a StateFlow. The screen collects it and renders. Events call ViewModel functions, never the repository directly.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `class CoursesViewModel(private val repository: CourseRepository) : ViewModel() {\n    private val _state = MutableStateFlow(CoursesUiState())\n    val state: StateFlow<CoursesUiState> = _state.asStateFlow()\n\n    fun load() {\n        viewModelScope.launch {\n            _state.update { it.copy(loading = true) }\n            val courses = repository.courses()\n            _state.update { it.copy(loading = false, courses = courses) }\n        }\n    }\n}` },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `@Composable\nfun CoursesScreen(viewModel: CoursesViewModel) {\n    val state by viewModel.state.collectAsStateWithLifecycle()\n    if (state.loading) {\n        CircularProgressIndicator()\n    } else {\n        LazyColumn {\n            items(state.courses) { course ->\n                CourseCard(title = course.title, onClick = { })\n            }\n        }\n    }\n}` },
        { type: 'note', value: 'Use collectAsStateWithLifecycle so collection stops when the screen is not visible.' },
      ],
    },
    {
      id: 'kotlin-compose-testing',
      title: 'Navigation and testing',
      blocks: [
        { type: 'text', value: 'Navigation Compose maps routes to screens. UI tests use createComposeRule to find nodes by text and assert behaviour, not implementation.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `@Test\nfun showsCourseTitle() {\n    composeTestRule.setContent {\n        CourseCard(title = "SQL", onClick = { })\n    }\n    composeTestRule.onNodeWithText("SQL").assertIsDisplayed()\n}` },
        { type: 'code', lang: 'bash', tryIt: false, value: `./gradlew testDebugUnitTest\n./gradlew connectedDebugAndroidTest\n./gradlew assembleRelease` },
        { type: 'list', items: [
          'Test a screen with a fake ViewModel',
          'Assert visible text and enabled state',
          'Keep navigation logic out of composables',
          'Run instrumentation tests on a real device',
        ] },
        { type: 'note', value: 'A composable that takes data as parameters is testable. One that fetches inside itself is not.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'android-compose',
      q: 'How is UI built in Compose?',
      options: ['XML layouts', 'Composable functions', 'HTML', 'A database'],
      answer: 1,
      explain: 'Compose uses @Composable functions.',
    },
    {
      chapterId: 'android-compose',
      q: 'Where should screen state live?',
      options: ['In the composable', 'In a ViewModel', 'In a static field', 'In the manifest'],
      answer: 1,
      explain: 'The ViewModel survives recomposition.',
    },
    {
      chapterId: 'android-compose',
      q: 'Why collectAsStateWithLifecycle?',
      options: ['It is faster', 'It stops collection when not visible', 'It adds animations', 'It saves to disk'],
      answer: 1,
      explain: 'It is lifecycle aware.',
    },
    {
      chapterId: 'android-compose',
      q: 'What makes a composable testable?',
      options: ['Global state', 'Data passed as parameters', 'Direct network calls', 'A singleton'],
      answer: 1,
      explain: 'Parameters make it predictable.',
    },
  ],
};
