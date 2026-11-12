// Rust chapter: Ownership, Borrowing and Lifetimes.

export default {
  id: 'ownership',
  title: 'Ownership & Borrowing',
  description: 'The rules that make Rust memory safe',
  icon: 'lock',
  lessons: [
    {
      id: 'rust-ownership-rules',
      title: 'The ownership rules',
      blocks: [
        { type: 'text', value: 'Every value has one owner. When the owner goes out of scope, the value is dropped and its memory freed. There is no free and no garbage collector. This single rule removes use-after-free and double-free bugs.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn main() {
    {
        let s = String::from("hello");
        // s owns the String
    }   // s goes out of scope, the String is dropped here

    // s is no longer usable
}` },
        { type: 'list', items: [
          'Each value has exactly one owner',
          'When the owner leaves scope, the value is dropped',
          'Assignment moves ownership instead of copying, unless the type implements Copy',
        ] },
      ],
    },
    {
      id: 'rust-move-copy',
      title: 'Move and Copy',
      blocks: [
        { type: 'text', value: 'Assigning a heap value moves it: the old binding becomes unusable. Types that live on the stack, such as integers, implement Copy, so assignment duplicates the value instead.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn main() {
    let a = String::from("hello");
    let b = a;           // a is moved into b
    // println!("{}", a);  // compile error: a is no longer valid

    let x = 5;
    let y = x;           // x is copied, both are valid
    println!("{} {}", x, y);
}` },
        { type: 'note', value: 'Move semantics are the reason Rust can free memory without a garbage collector. The compiler tracks every move and drops the value exactly once.' },
      ],
    },
    {
      id: 'rust-borrowing',
      title: 'Borrowing and references',
      blocks: [
        { type: 'text', value: 'Instead of moving a value, you can borrow it with a reference. An immutable borrow &T lets many readers access it. A mutable borrow &mut T gives one writer exclusive access. The compiler enforces that a mutable borrow cannot overlap with any other borrow.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn length(s: &String) -> usize {
    s.len()
}

fn append(s: &mut String) {
    s.push_str(" world");
}

fn main() {
    let mut text = String::from("hello");
    let n = length(&text);       // immutable borrow
    append(&mut text);           // mutable borrow
    println!("{} {}", n, text);
}` },
        { type: 'note', value: 'The borrow checker prevents data races at compile time. If code compiles, a mutable borrow and an immutable borrow never overlap.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'ownership',
      q: 'What happens when an owner goes out of scope?',
      options: ['The value is leaked', 'The value is dropped and its memory freed', 'A garbage collector runs', 'Nothing happens'],
      answer: 1,
      explain: 'Dropping frees the memory with no manual call.',
    },
    {
      chapterId: 'ownership',
      q: 'What is a move in Rust?',
      options: ['Copying the bytes', 'Transferring ownership so the old binding is unusable', 'A heap allocation', 'A function call'],
      answer: 1,
      explain: 'After a move, the old binding can no longer be used.',
    },
    {
      chapterId: 'ownership',
      q: 'Which types implement Copy?',
      options: ['Only strings', 'Stack-only types such as integers', 'All types', 'None'],
      answer: 1,
      explain: 'Types stored on the stack can be copied on assignment.',
    },
    {
      chapterId: 'ownership',
      q: 'How many mutable borrows may exist at once?',
      options: ['As many as you like', 'Exactly one, with no other borrows at the same time', 'Two, if they are short', 'None'],
      answer: 1,
      explain: 'A mutable borrow has exclusive access.',
    },
  ],
};
