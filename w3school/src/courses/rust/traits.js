// Rust chapter: Traits and Generics.

export default {
  id: 'traits',
  title: 'Traits & Generics',
  description: 'Shared behaviour, generics and trait objects',
  icon: 'extension',
  lessons: [
    {
      id: 'rust-traits',
      title: 'Traits',
      blocks: [
        { type: 'text', value: 'A trait defines shared behaviour, like an interface. A type implements a trait by providing its methods. Traits can have default methods, and you can implement a trait for a type you did not write, such as Display for your own type.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `trait Describe {
    fn describe(&self) -> String;

    fn short(&self) -> String {
        self.describe().chars().take(20).collect()
    }
}

struct Course {
    title: String,
    price: u32,
}

impl Describe for Course {
    fn describe(&self) -> String {
        format!("{} costs {} Tk", self.title, self.price)
    }
}

fn main() {
    let c = Course { title: "Rust".into(), price: 6000 };
    println!("{}", c.describe());
    println!("{}", c.short());
}` },
        { type: 'note', value: 'Traits are the main way to share behaviour in Rust. They replace inheritance: instead of an "is a" hierarchy, you compose behaviour with traits.' },
      ],
    },
    {
      id: 'rust-generics',
      title: 'Generics',
      blocks: [
        { type: 'text', value: 'Generics let one function or struct work with many types. The type parameter is checked at compile time, so there is no runtime cost. Constraints use trait bounds such as T: Display.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::fmt::Display;

fn print_item<T: Display>(item: T) {
    println!("{}", item);
}

fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest { largest = item; }
    }
    largest
}

fn main() {
    print_item(42);
    print_item("hello");
    println!("{}", largest(&[3, 1, 4, 1, 5]));
}` },
        { type: 'note', value: 'Generics are monomorphized: the compiler generates a separate version for each concrete type. That is why generics have zero runtime cost.' },
      ],
    },
    {
      id: 'rust-trait-objects',
      title: 'Trait objects and dynamic dispatch',
      blocks: [
        { type: 'text', value: 'When the type is not known at compile time, use a trait object such as Box<dyn Describe>. Calls go through a vtable, which costs a small runtime overhead but allows mixing types in one collection.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `trait Describe {
    fn describe(&self) -> String;
}

struct Course { title: String }
struct Book { title: String, pages: u32 }

impl Describe for Course {
    fn describe(&self) -> String { self.title.clone() }
}
impl Describe for Book {
    fn describe(&self) -> String { format!("{} ({} pages)", self.title, self.pages) }
}

fn main() {
    let items: Vec<Box<dyn Describe>> = vec![
        Box::new(Course { title: "Rust".into() }),
        Box::new(Book { title: "Rust Book".into(), pages: 500 }),
    ];
    for item in &items {
        println!("{}", item.describe());
    }
}` },
        { type: 'note', value: 'Use generics when the type is known at compile time. Use trait objects when you need a collection of different types or a plugin system.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'traits',
      q: 'What is a trait?',
      options: ['A class with inheritance', 'A shared behaviour contract implemented by types', 'A macro', 'A variable'],
      answer: 1,
      explain: 'Traits define methods that types implement.',
    },
    {
      chapterId: 'traits',
      q: 'What does a trait bound such as T: Display mean?',
      options: ['T must be a number', 'T must implement Display', 'T is optional', 'T is a pointer'],
      answer: 1,
      explain: 'The bound constrains the generic type.',
    },
    {
      chapterId: 'traits',
      q: 'Why do generics have zero runtime cost?',
      options: ['They are interpreted', 'The compiler generates a version per concrete type', 'They use a garbage collector', 'They are cached'],
      answer: 1,
      explain: 'Monomorphization creates specialized code.',
    },
    {
      chapterId: 'traits',
      q: 'When should you use a trait object such as Box<dyn Trait>?',
      options: ['When the type is known at compile time', 'When you need to mix different types at runtime', 'Always', 'Never'],
      answer: 1,
      explain: 'Trait objects allow dynamic dispatch for heterogeneous collections.',
    },
  ],
};
