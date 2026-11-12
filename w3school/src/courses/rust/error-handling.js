// Rust chapter: Error Handling.

export default {
  id: 'error-handling',
  title: 'Error Handling',
  description: 'Result, ?, panic and custom error types',
  icon: 'warning',
  lessons: [
    {
      id: 'rust-result',
      title: 'Result and the ? operator',
      blocks: [
        { type: 'text', value: 'Result<T, E> is an enum with Ok(T) and Err(E). It is how Rust handles recoverable errors, such as a missing file or a failed parse. The ? operator returns the error early from the function, so the happy path stays flat.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::fs::File;
use std::io::{self, Read};

fn read_file(path: &str) -> Result<String, io::Error> {
    let mut file = File::open(path)?;   // returns early on error
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

fn main() {
    match read_file("missing.txt") {
        Ok(text) => println!("{}", text),
        Err(e) => println!("could not read: {}", e),
    }
}` },
        { type: 'note', value: 'The ? operator only works in functions that return Result or Option. It is the idiomatic way to chain fallible calls.' },
      ],
    },
    {
      id: 'rust-panic',
      title: 'When to panic',
      blocks: [
        { type: 'text', value: 'panic! aborts the program. Use it for bugs and broken invariants that cannot be recovered from, such as an index that should always be in range. Use Result for anything a caller might reasonably handle, such as a network timeout.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn divide(a: f64, b: f64) -> Result<f64, &'static str> {
    if b == 0.0 {
        Err("division by zero")
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 0.0) {
        Ok(value) => println!("{}", value),
        Err(msg) => println!("error: {}", msg),
    }
}` },
        { type: 'list', items: [
          'panic! for unrecoverable bugs and broken invariants',
          'Result for recoverable errors the caller can handle',
          'unwrap and expect are shortcuts that panic on Err',
          'expect gives a custom message, which is clearer than unwrap',
        ] },
      ],
    },
    {
      id: 'rust-custom-errors',
      title: 'Custom error types',
      blocks: [
        { type: 'text', value: 'A real application defines its own error enum so callers can match on specific failures. Implement Display and the standard error trait so your type works with ? and with logging.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::fmt;

#[derive(Debug)]
enum AppError {
    NotFound,
    InvalidInput(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::NotFound => write!(f, "not found"),
            AppError::InvalidInput(msg) => write!(f, "invalid: {}", msg),
        }
    }
}

fn check(id: u32) -> Result<(), AppError> {
    if id == 0 { Err(AppError::InvalidInput("id cannot be zero".into())) }
    else { Ok(()) }
}` },
        { type: 'note', value: 'The thiserror and anyhow crates remove most of this boilerplate. Use them once you understand the manual version.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'error-handling',
      q: 'What does the ? operator do?',
      options: ['Ignores the error', 'Returns the error early from the function', 'Panics on any error', 'Converts it to a string'],
      answer: 1,
      explain: 'It propagates the error to the caller and keeps the happy path flat.',
    },
    {
      chapterId: 'error-handling',
      q: 'When should you use panic!?',
      options: ['For every failed parse', 'For unrecoverable bugs and broken invariants', 'For missing files', 'For network timeouts'],
      answer: 1,
      explain: 'Use Result for recoverable errors; panic for bugs.',
    },
    {
      chapterId: 'error-handling',
      q: 'What is the difference between unwrap and expect?',
      options: ['None', 'expect gives a custom panic message', 'unwrap is faster', 'expect never panics'],
      answer: 1,
      explain: 'Both panic on Err, but expect adds a message.',
    },
    {
      chapterId: 'error-handling',
      q: 'Why define a custom error enum?',
      options: ['To make code longer', 'So callers can match on specific failure kinds', 'To avoid Result', 'To remove the ? operator'],
      answer: 1,
      explain: 'A custom enum lets callers handle each case differently.',
    },
  ],
};
