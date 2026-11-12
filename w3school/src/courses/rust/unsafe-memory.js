// Rust chapter: Unsafe and Memory Management.

export default {
  id: 'unsafe-memory',
  title: 'Unsafe & Memory',
  description: 'Smart pointers, unsafe code and FFI',
  icon: 'memory',
  lessons: [
    {
      id: 'rust-smart-pointers',
      title: 'Box, Rc and RefCell',
      blocks: [
        { type: 'text', value: 'Smart pointers own data and add behaviour. Box<T> puts a value on the heap. Rc<T> is a reference-counted pointer for shared ownership in one thread. RefCell<T> moves borrow checking to runtime, allowing interior mutability.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let shared = Rc::new(RefCell::new(0));
    let a = Rc::clone(&shared);
    let b = Rc::clone(&shared);

    *a.borrow_mut() += 1;
    *b.borrow_mut() += 1;

    println!("value: {}", shared.borrow());   // 2
    println!("strong count: {}", Rc::strong_count(&shared));
}` },
        { type: 'note', value: 'Rc is not thread-safe. Use Arc for threads. RefCell panics if you borrow mutably while an immutable borrow is alive.' },
      ],
    },
    {
      id: 'rust-unsafe',
      title: 'Unsafe blocks',
      blocks: [
        { type: 'text', value: 'unsafe blocks let you do things the compiler cannot verify: dereference raw pointers, call unsafe functions, access mutable statics, and implement unsafe traits. The safety contract becomes your responsibility.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn main() {
    let mut num = 5;
    let r = &mut num as *mut i32;

    unsafe {
        *r = 10;
    }
    println!("{}", num);   // 10
}` },
        { type: 'list', items: [
          'unsafe does not turn off the borrow checker everywhere, only inside the block',
          'Raw pointers *const T and *mut T have no ownership or borrow rules',
          'Keep unsafe code small and document the invariants',
          'Wrap unsafe in a safe function with a clear contract',
        ] },
      ],
    },
    {
      id: 'rust-ffi',
      title: 'FFI and C interop',
      blocks: [
        { type: 'text', value: 'Rust can call C functions and be called from C. extern "C" declares the ABI. This is how Rust integrates with existing libraries and how you write a fast core with a Python or Node wrapper.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `extern "C" {
    fn abs(x: i32) -> i32;
}

fn main() {
    unsafe {
        println!("abs(-5) = {}", abs(-5));
    }
}

// Expose a Rust function to C:
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}` },
        { type: 'note', value: 'FFI crosses the safety boundary. Every value coming from C must be validated before you trust it in Rust.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'unsafe-memory',
      q: 'What is Rc<T>?',
      options: ['A thread-safe reference counter', 'A single-thread reference-counted pointer', 'A mutex', 'A raw pointer'],
      answer: 1,
      explain: 'Rc shares ownership in one thread.',
    },
    {
      chapterId: 'unsafe-memory',
      q: 'What does an unsafe block allow?',
      options: ['Anything at all', 'Operations the compiler cannot verify, with safety your responsibility', 'Skipping all checks forever', 'Garbage collection'],
      answer: 1,
      explain: 'unsafe enables specific unchecked operations.',
    },
    {
      chapterId: 'unsafe-memory',
      q: 'Rc versus Arc?',
      options: ['They are identical', 'Arc is thread-safe; Rc is not', 'Rc is faster in all cases', 'Arc cannot share data'],
      answer: 1,
      explain: 'Use Arc when data crosses threads.',
    },
    {
      chapterId: 'unsafe-memory',
      q: 'What does #[no_mangle] do?',
      options: ['Removes the function', 'Keeps the symbol name stable for FFI', 'Makes it private', 'Disables optimization'],
      answer: 1,
      explain: 'It prevents name mangling so C can call the function.',
    },
  ],
};
