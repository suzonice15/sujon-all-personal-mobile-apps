// Swift chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Swift is, tooling and your first program',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'swift-what-is',
      title: 'What is Swift?',
      blocks: [
        { type: 'text', value: 'Swift is Apple\'s modern language for iOS, macOS, watchOS and tvOS apps. It is fast, type safe, and removes whole classes of bugs such as null pointer crashes. It interoperates with Objective-C and is open source.' },
        { type: 'list', items: [
          'Type safe and null safe by default',
          'Fast: compiles to native code',
          'Modern syntax with less boilerplate than Objective-C',
          'SwiftUI for declarative UI, UIKit for the older imperative style',
          'Open source and runs on Linux too',
        ] },
        { type: 'note', value: 'You need a Mac with Xcode to build iOS apps. Swift itself can be learned on any platform with the open-source toolchain.' },
      ],
    },
    {
      id: 'swift-tooling',
      title: 'Tooling',
      blocks: [
        { type: 'text', value: 'Xcode is the IDE for Apple development. It contains the Swift compiler, the iOS simulator, Interface Builder and the debugger. Swift Package Manager (SPM) handles dependencies.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `swift --version
swift run
swift test

# Create a new package
swift package init --type executable
swift build
swift run` },
        { type: 'note', value: 'Install Xcode from the Mac App Store. The command line tools (xcode-select --install) are enough for learning the language without the full IDE.' },
      ],
    },
    {
      id: 'swift-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'A Swift program starts at main or at the top level of a script. print writes to the console. let declares a constant and var a variable.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `let name = "Ayesha"
var score = 0

score += 10
print("Hello, \\(name)!")
print("Score: \\(score)")` },
        { type: 'note', value: 'String interpolation uses \\(expression). Strings are value types, so they are copied, not shared.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Where do you build iOS apps with Swift?',
      options: ['Visual Studio', 'Xcode on a Mac', 'Android Studio', 'VS Code only'],
      answer: 1,
      explain: 'Xcode is Apple\'s IDE for iOS and macOS development.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does let declare?',
      options: ['A variable', 'A constant', 'A function', 'A class'],
      answer: 1,
      explain: 'let is a constant; var is a variable.',
    },
    {
      chapterId: 'getting-started',
      q: 'How do you interpolate a value into a string?',
      options: ['With +', 'With \\(expression)', 'With ${}', 'With %s'],
      answer: 1,
      explain: 'Swift uses \\(expression) inside strings.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is Swift Package Manager?',
      options: ['A database', 'The dependency and build tool for Swift', 'A UI framework', 'A test runner only'],
      answer: 1,
      explain: 'SPM manages dependencies and builds.',
    },
  ],
};
