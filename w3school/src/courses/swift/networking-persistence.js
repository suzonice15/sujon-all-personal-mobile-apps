// Swift chapter: Networking & Persistence.

export default {
  id: 'networking-persistence',
  title: 'Networking & Data',
  description: 'URLSession, Codable and local storage',
  icon: 'cloud-sync',
  lessons: [
    {
      id: 'swift-urlsession',
      title: 'URLSession and Codable',
      blocks: [
        { type: 'text', value: 'Use async/await with URLSession. Decode with Codable, check the status code, and map errors to something the UI can show.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `struct Course: Codable, Identifiable {\n    let id: Int\n    let title: String\n}\n\nfunc loadCourses() async throws -> [Course] {\n    let url = URL(string: "https://api.codenest.app/courses")!\n    let (data, response) = try await URLSession.shared.data(from: url)\n    guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {\n        throw URLError(.badServerResponse)\n    }\n    return try JSONDecoder().decode([Course].self, from: data)\n}` },
        { type: 'list', items: [
          'Always check the HTTP status',
          'Decode into typed models',
          'Do not block the main thread',
          'Cancel tasks when the view disappears',
        ] },
        { type: 'note', value: 'A force-unwrapped URL is a crash waiting for a typo. Build it with URLComponents and handle nil.' },
      ],
    },
    {
      id: 'swift-swiftdata',
      title: 'Local persistence',
      blocks: [
        { type: 'text', value: 'SwiftData models classes with @Model and persists them automatically. For simple preferences use UserDefaults; for sensitive values use the Keychain.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `import SwiftData\n\n@Model\nfinal class LessonProgress {\n    var lessonId: String\n    var completed: Bool\n    var updatedAt: Date\n\n    init(lessonId: String, completed: Bool = false) {\n        self.lessonId = lessonId\n        self.completed = completed\n        self.updatedAt = .now\n    }\n}` },
        { type: 'code', lang: 'swift', tryIt: false, value: `@Query(sort: \\LessonProgress.updatedAt, order: .reverse)\nprivate var progress: [LessonProgress]\n\nvar body: some View {\n    List(progress) { item in\n        Text(item.lessonId)\n    }\n}` },
        { type: 'note', value: 'Never store tokens in UserDefaults. Use the Keychain; UserDefaults is a plain plist.' },
      ],
    },
    {
      id: 'swift-architecture-testing',
      title: 'Architecture and testing',
      blocks: [
        { type: 'text', value: 'MVVM keeps views small: the view renders state, the view model owns logic, and a service handles I/O. Inject the service so tests can replace it.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `@MainActor\nfinal class CoursesViewModel: ObservableObject {\n    @Published private(set) var courses: [Course] = []\n    @Published private(set) var error: String?\n\n    private let service: CourseService\n\n    init(service: CourseService) {\n        self.service = service\n    }\n\n    func load() async {\n        do {\n            courses = try await service.loadCourses()\n        } catch {\n            self.error = "Could not load courses"\n        }\n    }\n}` },
        { type: 'code', lang: 'swift', tryIt: false, value: `func testLoadSetsCourses() async {\n    let viewModel = CoursesViewModel(service: FakeService())\n    await viewModel.load()\n    XCTAssertEqual(viewModel.courses.count, 2)\n}` },
        { type: 'note', value: 'A view model that creates its own network client cannot be tested without the network. Inject it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'networking-persistence',
      q: 'Which API fetches data asynchronously?',
      options: ['URLSession with async/await', 'print', 'UserDefaults', 'Keychain'],
      answer: 0,
      explain: 'URLSession supports async/await.',
    },
    {
      chapterId: 'networking-persistence',
      q: 'What does Codable do?',
      options: ['Encrypts data', 'Maps JSON to types', 'Builds UI', 'Stores files'],
      answer: 1,
      explain: 'It encodes and decodes models.',
    },
    {
      chapterId: 'networking-persistence',
      q: 'Where do tokens belong?',
      options: ['UserDefaults', 'The Keychain', 'A plist', 'A text file'],
      answer: 1,
      explain: 'The Keychain is encrypted storage.',
    },
    {
      chapterId: 'networking-persistence',
      q: 'Why inject a service into the view model?',
      options: ['For style', 'So tests can use a fake', 'To save memory', 'To enable SwiftUI'],
      answer: 1,
      explain: 'Dependency injection makes it testable.',
    },
  ],
};
