// Swift chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a small iOS app and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'swift-project-app',
      title: 'Project: course list app',
      blocks: [
        { type: 'text', value: 'Build a small SwiftUI app: a list of courses, a detail screen, a search field and a favorite button. It uses a struct model, a List, NavigationStack and @State.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `import SwiftUI

struct Course: Identifiable, Hashable {
    let id = UUID()
    let title: String
    let tagline: String
}

struct CourseListView: View {
    @State private var query = ""
    @State private var favorites: Set<UUID> = []

    let courses = [
        Course(title: "Swift", tagline: "Modern language"),
        Course(title: "SwiftUI", tagline: "Declarative UI"),
    ]

    var filtered: [Course] {
        query.isEmpty ? courses : courses.filter { $0.title.localizedCaseInsensitiveContains(query) }
    }

    var body: some View {
        NavigationStack {
            List(filtered) { course in
                NavigationLink(value: course) {
                    HStack {
                        Text(course.title).font(.headline)
                        Spacer()
                        if favorites.contains(course.id) {
                            Image(systemName: "star.fill").foregroundColor(.yellow)
                        }
                    }
                }
            }
            .searchable(text: $query)
            .navigationTitle("Courses")
            .navigationDestination(for: Course.self) { course in
                Text(course.tagline)
            }
        }
    }
}` },
        { type: 'note', value: 'A finished app with a list, search, navigation and state is a strong portfolio piece. Keep the model small and the views simple.' },
      ],
    },
    {
      id: 'swift-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Value type versus reference type in Swift?',
          'Struct versus class?',
          'What is an optional and how do you unwrap it safely?',
          'What does guard let do?',
          'Protocol versus class inheritance?',
          'What is the difference between let and var?',
          'How does SwiftUI update the UI?',
          'What is an actor and why use it?',
          'What is the difference between async and a thread?',
          'How does memory management work in Swift?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "A struct is copied on assignment, so two variables cannot accidentally share mutable state" is better than "struct is a value type".' },
        { type: 'note', value: 'Be ready to write a small SwiftUI view with state and a list live. That covers most junior iOS interviews.' },
      ],
    },
    {
      id: 'swift-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1-2: Swift basics, optionals, control flow',
          'Week 3: structs, classes, protocols and extensions',
          'Week 4: collections, closures and generics',
          'Week 5: async and await, actors',
          'Week 6-7: SwiftUI views, state, lists and navigation',
          'Week 8: build and run one complete app on the simulator',
        ] },
        { type: 'note', value: 'You need a Mac with Xcode to run iOS apps. Learn the language first on any platform, then move to SwiftUI.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which property wrapper holds local view state in SwiftUI?',
      options: ['@Binding', '@State', '@ObservedObject', '@Environment'],
      answer: 1,
      explain: '@State holds local, mutable view state.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why conform a model to Identifiable for a List?',
      options: ['For styling', 'To give each row a stable id for diffing', 'For networking', 'For testing'],
      answer: 1,
      explain: 'Stable ids let SwiftUI update the list correctly.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes an iOS portfolio project convincing?',
      options: ['Many unfinished screens', 'A working app with a clear data flow and a README', 'A copied template only', 'A large dependency list'],
      answer: 1,
      explain: 'A working, explained app shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a Swift interview answer include?',
      options: ['Only the keyword name', 'The mechanism and the trade-off, with an example', 'A list of colours', 'The logo history'],
      answer: 1,
      explain: 'Explain the mechanism and the trade-off, not only the name.',
    },
  ],
};
