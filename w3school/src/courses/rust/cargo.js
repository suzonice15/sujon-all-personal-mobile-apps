// Rust chapter: Cargo and Project Structure.

export default {
  id: 'cargo',
  title: 'Cargo & Projects',
  description: 'Cargo, crates, modules and tests',
  icon: 'inventory-2',
  lessons: [
    {
      id: 'rust-cargo-basics',
      title: 'Cargo basics',
      blocks: [
        { type: 'text', value: 'Cargo is the build system and package manager. It creates projects, resolves dependencies, builds, runs tests and publishes crates. A Cargo.toml file describes the project and its dependencies.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `cargo new courses
cd courses
cargo build
cargo run
cargo test
cargo check        # fast type check without building
cargo clippy       # lint
cargo fmt          # format` },
        { type: 'code', lang: 'text', tryIt: false, value: `# Cargo.toml
[package]
name = "courses"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }` },
        { type: 'note', value: 'cargo check is much faster than cargo build. Run it while editing to get compiler feedback without waiting for the full build.' },
      ],
    },
    {
      id: 'rust-modules',
      title: 'Modules and visibility',
      blocks: [
        { type: 'text', value: 'Modules organize code. Items are private by default. pub makes them public. The module tree is declared in the code and mirrored on disk.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `// src/lib.rs
mod courses;
pub use courses::Course;

// src/courses.rs
pub struct Course {
    pub title: String,
    price: u32,            // private field
}

impl Course {
    pub fn new(title: &str, price: u32) -> Self {
        Self { title: title.into(), price }
    }
}` },
        { type: 'note', value: 'A library crate exposes a public API. Keep the public surface small and put implementation details in private modules.' },
      ],
    },
    {
      id: 'rust-testing-docs',
      title: 'Tests and documentation',
      blocks: [
        { type: 'text', value: 'Tests live next to the code in a #[cfg(test)] module. Doc comments with /// become the API documentation, and code examples in them are run as tests by cargo test --doc.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `/// Adds two numbers.
///
/// # Example
/// \`\`\`
/// assert_eq!(add(2, 3), 5);
/// \`\`\`
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds() {
        assert_eq!(add(2, 3), 5);
    }
}` },
        { type: 'list', items: [
          'cargo test runs unit, integration and doc tests',
          'cargo doc --open builds and opens the documentation',
          'Integration tests live in the tests/ folder',
          'Doc examples are compiled and run, so they cannot rot',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'cargo',
      q: 'What is Cargo?',
      options: ['A code formatter', 'The build system and package manager for Rust', 'A test framework only', 'A debugger'],
      answer: 1,
      explain: 'Cargo builds, tests, manages dependencies and publishes.',
    },
    {
      chapterId: 'cargo',
      q: 'What does cargo check do?',
      options: ['Runs all tests', 'Type-checks without producing a binary', 'Formats code', 'Publishes the crate'],
      answer: 1,
      explain: 'It is faster than a full build for feedback.',
    },
    {
      chapterId: 'cargo',
      q: 'Are items public by default in Rust?',
      options: ['Yes', 'No, they are private unless marked pub', 'Only in tests', 'Only in the main module'],
      answer: 1,
      explain: 'Visibility is private by default.',
    },
    {
      chapterId: 'cargo',
      q: 'What does a doc comment with /// and a code block do?',
      options: ['Nothing', 'It becomes documentation and the example is tested by cargo test --doc', 'It is a macro', 'It deletes the function'],
      answer: 1,
      explain: 'Doc tests keep examples correct.',
    },
  ],
};
