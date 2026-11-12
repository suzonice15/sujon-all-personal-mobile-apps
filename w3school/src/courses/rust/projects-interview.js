// Rust chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a CLI tool and prepare for Rust interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'rust-project-cli',
      title: 'Project: a small CLI tool',
      blocks: [
        { type: 'text', value: 'Build a command-line tool that reads a file, counts words and prints the top ten. It uses ownership, error handling with Result, an iterator chain and a HashMap. Small and finished beats large and unfinished.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::collections::HashMap;
use std::env;
use std::fs;

fn main() {
    let path = env::args().nth(1).expect("usage: wordcount <file>");
    let text = fs::read_to_string(&path).expect("could not read file");

    let mut counts: HashMap<&str, usize> = HashMap::new();
    for word in text.split_whitespace() {
        *counts.entry(word).or_insert(0) += 1;
    }

    let mut pairs: Vec<(&str, usize)> = counts.into_iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(&a.1));

    for (word, count) in pairs.into_iter().take(10) {
        println!("{:4} {}", count, word);
    }
}` },
        { type: 'note', value: 'entry().or_insert() is the idiomatic way to count in a HashMap. It borrows the value if it exists and inserts zero otherwise.' },
      ],
    },
    {
      id: 'rust-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What are the three ownership rules?',
          'Move versus Copy?',
          'Immutable versus mutable borrow?',
          'What is the difference between String and &str?',
          'How does Result differ from Option?',
          'What does the ? operator do?',
          'When should you use generics and when trait objects?',
          'How do Arc and Mutex work together?',
          'What is the borrow checker checking?',
          'When would you write unsafe code?',
        ] },
        { type: 'text', value: 'Strong answers name the rule and a concrete example. "A mutable borrow has exclusive access, so two mutable borrows at once do not compile" is better than "Rust checks borrows".' },
        { type: 'note', value: 'Be ready to write a small struct with an impl block, a trait implementation and a Result-returning function. Those three cover most junior Rust interviews.' },
      ],
    },
    {
      id: 'rust-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: syntax, variables, functions and the ownership rules',
          'Week 2: borrowing, references and lifetimes',
          'Week 3: structs, enums, Option and Result',
          'Week 4: collections, iterators and error handling',
          'Week 5: traits, generics and modules',
          'Week 6: concurrency, async and smart pointers',
          'Week 7: Cargo, testing and documentation',
          'Week 8: build one complete CLI tool or library',
        ] },
        { type: 'note', value: 'Fight the borrow checker one error at a time. Each error message teaches a rule, and after a few weeks the rules feel natural.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What does entry().or_insert(0) do in a HashMap?',
      options: ['Deletes the key', 'Returns the value if present, otherwise inserts 0 and returns it', 'Sorts the map', 'Locks the map'],
      answer: 1,
      explain: 'It inserts a default and returns a mutable reference to the value.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which collection should you use to count words?',
      options: ['Vec only', 'HashMap from word to count', 'A tuple', 'A string'],
      answer: 1,
      explain: 'A map from each word to its count is the natural structure.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a Rust portfolio project convincing?',
      options: ['A huge unfinished codebase', 'A small working tool with tests and documentation', 'A copied tutorial', 'No error handling'],
      answer: 1,
      explain: 'A finished, tested tool shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best way to learn Rust?',
      options: ['Reading the whole book first', 'Writing small programs and reading compiler errors', 'Avoiding the borrow checker', 'Using unsafe everywhere'],
      answer: 1,
      explain: 'Compiler feedback is the fastest teacher.',
    },
  ],
};
