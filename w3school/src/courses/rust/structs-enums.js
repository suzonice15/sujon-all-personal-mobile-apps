// Rust chapter: Structs, Enums and Pattern Matching.

export default {
  id: 'structs-enums',
  title: 'Structs, Enums & Match',
  description: 'Custom types, Option, Result and pattern matching',
  icon: 'category',
  lessons: [
    {
      id: 'rust-struct',
      title: 'Structs and impl blocks',
      blocks: [
        { type: 'text', value: 'A struct groups related data. Methods live in an impl block. Fields are private by default, and the struct is created with a constructor function you write.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `struct Course {
    id: u32,
    title: String,
    price: u32,
}

impl Course {
    fn new(id: u32, title: &str, price: u32) -> Self {
        Self { id, title: title.to_string(), price }
    }

    fn label(&self) -> String {
        format!("{} - {} Tk", self.title, self.price)
    }
}

fn main() {
    let course = Course::new(1, "Rust", 6000);
    println!("{}", course.label());
}` },
        { type: 'note', value: 'A struct owns its data. If a field is a String, the struct owns that string. Borrowing the struct borrows its fields too.' },
      ],
    },
    {
      id: 'rust-enum-option',
      title: 'Enums and Option',
      blocks: [
        { type: 'text', value: 'An enum lists the possible variants of a value. Option<T> is the standard enum for a value that may be absent: Some(value) or None. There is no null in Rust; Option makes absence explicit and the compiler forces you to handle it.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn find_course(id: u32) -> Option<String> {
    if id == 1 { Some(String::from("Rust")) } else { None }
}

fn main() {
    match find_course(1) {
        Some(title) => println!("found: {}", title),
        None => println!("not found"),
    }

    // if let is shorter for one case
    if let Some(title) = find_course(2) {
        println!("found: {}", title);
    } else {
        println!("nothing");
    }
}` },
        { type: 'note', value: 'match must be exhaustive: every variant must be handled. That is why you cannot forget the missing case.' },
      ],
    },
    {
      id: 'rust-pattern-match',
      title: 'Pattern matching',
      blocks: [
        { type: 'text', value: 'match compares a value against patterns and runs the matching arm. Patterns can destructure structs and enums, guard with if, and bind values with @.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `enum Status { Ok, NotFound(u32), Error(String) }

fn describe(s: Status) {
    match s {
        Status::Ok => println!("ok"),
        Status::NotFound(code) if code == 404 => println!("missing page"),
        Status::NotFound(code) => println!("missing resource {}", code),
        Status::Error(msg) => println!("error: {}", msg),
    }
}

fn main() {
    describe(Status::NotFound(404));
}` },
        { type: 'list', items: [
          'match is exhaustive: every variant must be handled',
          'Guard with if inside an arm',
          'Destructure with @ to bind and test at once',
          'Use if let when one case is all you care about',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'structs-enums',
      q: 'What is Option<T> for?',
      options: ['A random value', 'A value that may be present or absent, with no null', 'A list of items', 'A thread'],
      answer: 1,
      explain: 'Option is Some(value) or None, and the compiler forces you to handle both.',
    },
    {
      chapterId: 'structs-enums',
      q: 'What must a match expression be?',
      options: ['Partial', 'Exhaustive: every variant must be handled', 'Optional', 'Random'],
      answer: 1,
      explain: 'The compiler checks that all cases are covered.',
    },
    {
      chapterId: 'structs-enums',
      q: 'Where do methods of a struct live?',
      options: ['In the struct definition', 'In an impl block', 'In the main function', 'In a trait only'],
      answer: 1,
      explain: 'impl blocks attach methods to a type.',
    },
    {
      chapterId: 'structs-enums',
      q: 'What does if let do?',
      options: ['Loops forever', 'Handles one pattern and ignores the rest', 'Creates a thread', 'Defines a macro'],
      answer: 1,
      explain: 'It is the short form when only one case matters.',
    },
  ],
};
