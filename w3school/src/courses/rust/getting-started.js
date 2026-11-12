// Rust chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Why Rust, installation and your first program',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'rust-what-is',
      title: 'What is Rust?',
      blocks: [
        { type: 'text', value: 'Rust is a systems language that guarantees memory safety and thread safety at compile time, without a garbage collector. The compiler rejects code that could cause a use-after-free, a data race or a null pointer. Programs run as fast as C or C++.' },
        { type: 'list', items: [
          'No garbage collector, no manual free, no use-after-free',
          'Ownership and borrowing are checked at compile time',
          'Zero-cost abstractions: high-level code compiles to fast machine code',
          'Cargo is the package manager and build tool',
          'Used by Mozilla, Microsoft, Google, AWS and the Linux kernel',
        ] },
        { type: 'note', value: 'Rust has a steep learning curve because the compiler enforces rules you used to enforce by discipline. The payoff is that a program that compiles usually runs correctly and safely.' },
      ],
    },
    {
      id: 'rust-install',
      title: 'Installing Rust',
      blocks: [
        { type: 'text', value: 'rustup installs the Rust toolchain and keeps it updated. It manages the compiler, Cargo and extra tools for every platform.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

rustc --version
cargo --version` },
        { type: 'note', value: 'On Windows, rustup installs the MSVC toolchain by default. Use rustup show to see which toolchain is active.' },
      ],
    },
    {
      id: 'rust-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'A program starts at main. println! is a macro, which is why it has an exclamation mark. Variables are immutable by default; use mut to allow changes.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn main() {
    let name = "Ayesha";
    let mut score = 0;

    score = score + 10;
    println!("Hello, {}!", name);
    println!("Score: {}", score);
}` },
        { type: 'note', value: 'let creates a binding. The value can be shadowed by a new let, but a mut binding can be reassigned. Prefer immutable by default.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Why is Rust memory safe without a garbage collector?',
      options: ['It ignores memory', 'Ownership and borrowing are checked at compile time', 'It uses a virtual machine', 'It is interpreted'],
      answer: 1,
      explain: 'The compiler rejects unsafe memory use before the program runs.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does the ! in println! mean?',
      options: ['It is a method', 'It is a macro', 'It is a comment', 'It is an operator'],
      answer: 1,
      explain: 'Macros are called with ! in Rust.',
    },
    {
      chapterId: 'getting-started',
      q: 'Are variables mutable by default in Rust?',
      options: ['Yes, always', 'No, they are immutable unless you add mut', 'Only in functions', 'Only in structs'],
      answer: 1,
      explain: 'mut declares that a binding may be reassigned.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does rustup do?',
      options: ['Compiles Rust to JavaScript', 'Installs and manages the Rust toolchain', 'Runs tests only', 'Formats code'],
      answer: 1,
      explain: 'rustup manages rustc, cargo and updates.',
    },
  ],
};
