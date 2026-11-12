// Swift chapter: SwiftUI.

export default {
  id: 'swiftui',
  title: 'SwiftUI',
  description: 'Declarative views, state and navigation',
  icon: 'view-quilt',
  lessons: [
    {
      id: 'swift-swiftui-basics',
      title: 'Views and body',
      blocks: [
        { type: 'text', value: 'SwiftUI describes the UI with structs that conform to View. The body property returns the view tree. Views are value types, so SwiftUI rebuilds them cheaply when state changes.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello, SwiftUI!")
                .font(.title)
            Text("Build apps declaratively")
                .foregroundColor(.secondary)
        }
        .padding()
    }
}` },
        { type: 'note', value: 'some View means "a type that conforms to View, chosen by the compiler". The exact type is hidden, which keeps the API readable.' },
      ],
    },
    {
      id: 'swift-state',
      title: 'State and data flow',
      blocks: [
        { type: 'text', value: '@State holds local view state. @Binding connects a child view to a parent\'s state. @ObservedObject and @StateObject hold a reference-type model that publishes changes.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 12) {
            Text("Count: \\(count)")
            Button("Add") { count += 1 }
        }
    }
}` },
        { type: 'note', value: 'When @State changes, SwiftUI re-evaluates body and updates only the parts of the view tree that changed.' },
      ],
    },
    {
      id: 'swift-navigation',
      title: 'Lists and navigation',
      blocks: [
        { type: 'text', value: 'List shows a scrollable collection. NavigationStack and NavigationLink push new screens. ForEach builds views from a collection.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `import SwiftUI

struct Course: Identifiable {
    let id = UUID()
    let title: String
}

struct CourseListView: View {
    let courses = [Course(title: "Swift"), Course(title: "SwiftUI")]

    var body: some View {
        NavigationStack {
            List(courses) { course in
                NavigationLink(course.title) {
                    Text(course.title).font(.title)
                }
            }
            .navigationTitle("Courses")
        }
    }
}` },
        { type: 'list', items: [
          'Identifiable gives each item a stable id',
          'List handles scrolling and cell reuse',
          'NavigationStack replaces the older NavigationView',
          'Use .sheet for modal presentation',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'swiftui',
      q: 'What does body return in a SwiftUI view?',
      options: ['A view tree', 'A string', 'An integer', 'A database'],
      answer: 0,
      explain: 'body is the declarative description of the UI.',
    },
    {
      chapterId: 'swiftui',
      q: 'What is @State for?',
      options: ['Global storage', 'Local view state that triggers re-rendering', 'A network call', 'A database'],
      answer: 1,
      explain: '@State holds local, mutable view state.',
    },
    {
      chapterId: 'swiftui',
      q: 'Why conform to Identifiable for a List?',
      options: ['For styling', 'To give each item a stable id so SwiftUI can diff the list', 'For networking', 'For testing'],
      answer: 1,
      explain: 'Stable ids let SwiftUI update the list correctly.',
    },
    {
      chapterId: 'swiftui',
      q: 'What replaced NavigationView?',
      options: ['TabView', 'NavigationStack', 'ScrollView', 'List'],
      answer: 1,
      explain: 'NavigationStack is the modern navigation container.',
    },
  ],
};
