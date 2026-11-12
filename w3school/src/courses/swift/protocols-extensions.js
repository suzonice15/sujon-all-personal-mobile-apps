// Swift chapter: Protocols & Extensions.

export default {
  id: 'protocols-extensions',
  title: 'Protocols & Extensions',
  description: 'Protocols, extensions, generics and associated types',
  icon: 'extension',
  lessons: [
    {
      id: 'swift-protocol',
      title: 'Protocols',
      blocks: [
        { type: 'text', value: 'A protocol is a contract: a list of properties and methods a type must provide. Structs, classes and enums can all conform. Protocols are how Swift shares behaviour across unrelated types, since there is no multiple inheritance.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `protocol Describable {
    var title: String { get }
    func describe() -> String
}

struct Course: Describable {
    let title: String
    func describe() -> String { "Course: \\(title)" }
}

func show(_ item: Describable) {
    print(item.describe())
}

show(Course(title: "Swift"))` },
        { type: 'note', value: 'Protocol-oriented programming is a core Swift idea. Prefer small protocols and composition over large class hierarchies.' },
      ],
    },
    {
      id: 'swift-extension',
      title: 'Extensions',
      blocks: [
        { type: 'text', value: 'An extension adds methods and computed properties to an existing type, even types you do not own, such as String or Int. It cannot add stored properties.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `extension String {
    var isBlank: Bool { self.trimmingCharacters(in: .whitespaces).isEmpty }
    func shouting() -> String { self.uppercased() + "!" }
}

print("   ".isBlank)
print("hello".shouting())

extension Int {
    func squared() -> Int { self * self }
}
print(4.squared())` },
        { type: 'note', value: 'Extensions keep related helpers next to the type they extend, without modifying the original source.' },
      ],
    },
    {
      id: 'swift-generics',
      title: 'Generics',
      blocks: [
        { type: 'text', value: 'Generics let one function or type work with many types. The type parameter is checked at compile time, so there is no runtime cost. Constraints use where clauses or protocol bounds.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `func largest<T: Comparable>(_ items: [T]) -> T? {
    items.max()
}

print(largest([3, 1, 4, 1, 5]) ?? 0)
print(largest(["apple", "fig", "banana"]) ?? "")

struct Stack<Element> {
    private var items: [Element] = []
    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element? { items.pop() }
}

var stack = Stack<Int>()
stack.push(10)
print(stack.pop() ?? 0)` },
        { type: 'note', value: 'Generic types are specialized at compile time, so Stack<Int> and Stack<String> are separate, optimized types.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'protocols-extensions',
      q: 'What is a protocol?',
      options: ['A class', 'A contract of properties and methods a type must provide', 'A macro', 'A global variable'],
      answer: 1,
      explain: 'Protocols define shared behaviour across types.',
    },
    {
      chapterId: 'protocols-extensions',
      q: 'Can an extension add a stored property to an existing type?',
      options: ['Yes', 'No, only computed properties and methods', 'Only to structs', 'Only to classes'],
      answer: 1,
      explain: 'Extensions add behaviour, not stored state.',
    },
    {
      chapterId: 'protocols-extensions',
      q: 'What does a generic type parameter give you?',
      options: ['Runtime flexibility', 'Compile-time type safety with no runtime cost', 'Dynamic typing', 'A global variable'],
      answer: 1,
      explain: 'Generics are specialized at compile time.',
    },
    {
      chapterId: 'protocols-extensions',
      q: 'Which types can conform to a protocol?',
      options: ['Only classes', 'Structs, classes and enums', 'Only structs', 'Only enums'],
      answer: 1,
      explain: 'Any type can conform to a protocol.',
    },
  ],
};
