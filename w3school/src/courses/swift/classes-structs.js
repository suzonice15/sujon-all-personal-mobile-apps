// Swift chapter: Classes & Structs.

export default {
  id: 'classes-structs',
  title: 'Structs & Classes',
  description: 'Value types, reference types and initializers',
  icon: 'class',
  lessons: [
    {
      id: 'swift-struct',
      title: 'Structs are value types',
      blocks: [
        { type: 'text', value: 'A struct is a value type: assigning or passing it copies the whole value. Structs are the default choice in Swift for data models. Methods live in an extension or in the struct itself.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `struct Course {
    let id: Int
    var title: String
    var price: Int

    func label() -> String {
        "\\(title) - \\(price) Tk"
    }

    mutating func discount(by amount: Int) {
        price -= amount
    }
}

var course = Course(id: 1, title: "Swift", price: 6000)
let copy = course
course.title = "Swift & iOS"
print(course.title)
print(copy.title)   // unchanged` },
        { type: 'note', value: 'A mutating method is needed to change a property of a struct, because the struct itself is a value.' },
      ],
    },
    {
      id: 'swift-class',
      title: 'Classes are reference types',
      blocks: [
        { type: 'text', value: 'A class is a reference type: assigning or passing it shares the same instance. Classes support inheritance and deinitializers. Use a class when identity matters, such as a view controller or a shared model.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `class Student {
    var name: String
    var score: Int

    init(name: String, score: Int) {
        self.name = name
        self.score = score
    }

    deinit {
        print("\\(name) is being removed")
    }
}

let a = Student(name: "Ayesha", score: 92)
let b = a
b.score = 95
print(a.score)   // 95: a and b point to the same instance` },
        { type: 'note', value: 'Prefer struct for data and class for identity. Most Swift code uses structs far more than classes.' },
      ],
    },
    {
      id: 'swift-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'A class can inherit from one parent. override marks a method that replaces the parent version. final prevents further subclassing, which the compiler uses for optimization.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `class Animal {
    func sound() -> String { "..." }
}

class Dog: Animal {
    override func sound() -> String { "woof" }
}

final class Cat: Animal {
    override func sound() -> String { "meow" }
}

let pet: Animal = Dog()
print(pet.sound())   // woof` },
        { type: 'note', value: 'Inheritance is single in Swift. For shared behaviour across unrelated types, use protocols instead.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'classes-structs',
      q: 'Which is a value type?',
      options: ['Class', 'Struct', 'Actor', 'Protocol'],
      answer: 1,
      explain: 'Structs are value types and are copied on assignment.',
    },
    {
      chapterId: 'classes-structs',
      q: 'Which is a reference type?',
      options: ['Struct', 'Enum', 'Class', 'Tuple'],
      answer: 2,
      explain: 'Classes share one instance across references.',
    },
    {
      chapterId: 'classes-structs',
      q: 'Why mark a method mutating in a struct?',
      options: ['To make it faster', 'To allow it to change a property', 'To make it private', 'To enable inheritance'],
      answer: 1,
      explain: 'Structs are immutable by default; mutating permits changes.',
    },
    {
      chapterId: 'classes-structs',
      q: 'What does final do on a class?',
      options: ['Makes it abstract', 'Prevents further subclassing', 'Makes it a struct', 'Removes its methods'],
      answer: 1,
      explain: 'final stops other classes from inheriting from it.',
    },
  ],
};
