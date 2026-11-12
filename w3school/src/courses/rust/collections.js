// Rust chapter: Collections and Iterators.

export default {
  id: 'collections',
  title: 'Collections & Iterators',
  description: 'Vec, HashMap, strings and iterator chains',
  icon: 'view-list',
  lessons: [
    {
      id: 'rust-vec',
      title: 'Vec and HashMap',
      blocks: [
        { type: 'text', value: 'Vec<T> is a growable array on the heap. HashMap<K, V> maps keys to values. Both are in the standard library and are the most used collections.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::collections::HashMap;

fn main() {
    let mut courses = Vec::new();
    courses.push("Rust".to_string());
    courses.push("Go".to_string());
    println!("{:?}", courses);

    let mut prices = HashMap::new();
    prices.insert("Rust", 6000);
    prices.insert("Go", 5000);

    if let Some(price) = prices.get("Rust") {
        println!("Rust costs {}", price);
    }
}` },
        { type: 'note', value: 'Vec stores items contiguously, so indexing is fast but inserting in the middle copies elements. Use push for append.' },
      ],
    },
    {
      id: 'rust-strings',
      title: 'String versus &str',
      blocks: [
        { type: 'text', value: 'String is an owned, growable string on the heap. &str is a borrowed slice of a string. Most functions take &str so they work with both kinds. String concatenation moves ownership, so build strings with format! or push_str.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let name = String::from("Ayesha");
    let message = greet(&name);
    println!("{}", message);
    println!("original still valid: {}", name);
}` },
        { type: 'note', value: 'A common beginner mistake is taking String by value when &str would do. Prefer &str in parameters to accept any string.' },
      ],
    },
    {
      id: 'rust-iterators',
      title: 'Iterators and chains',
      blocks: [
        { type: 'text', value: 'Iterators produce items one at a time. Chains like map, filter and collect transform a sequence. They are lazy: nothing runs until collect or another consumer asks for a result.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `fn main() {
    let prices = [5000, 6000, 2000, 7500];

    let cheap: Vec<i32> = prices
        .iter()
        .filter(|&&p| p < 6000)
        .map(|&p| p + 500)
        .collect();

    println!("{:?}", cheap);

    let total: i32 = prices.iter().sum();
    println!("total: {}", total);
}` },
        { type: 'list', items: [
          'iter() borrows, into_iter() consumes, iter_mut() borrows mutably',
          'filter keeps items that match a predicate',
          'map transforms each item',
          'collect turns the chain into a Vec or other collection',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'collections',
      q: 'What is the difference between String and &str?',
      options: ['They are the same', 'String owns its data on the heap; &str borrows a slice', 'String is immutable', '&str is always faster'],
      answer: 1,
      explain: 'String owns, &str borrows.',
    },
    {
      chapterId: 'collections',
      q: 'When does an iterator chain actually run?',
      options: ['When map is called', 'When a consumer such as collect is called', 'Immediately on creation', 'Never'],
      answer: 1,
      explain: 'Iterators are lazy and run on demand.',
    },
    {
      chapterId: 'collections',
      q: 'Which iterator consumes the original collection?',
      options: ['iter()', 'iter_mut()', 'into_iter()', 'filter()'],
      answer: 2,
      explain: 'into_iter takes ownership of the collection.',
    },
    {
      chapterId: 'collections',
      q: 'Why prefer &str in function parameters?',
      options: ['It is shorter', 'It accepts both String and &str', 'It is faster to compile', 'It avoids borrowing'],
      answer: 1,
      explain: 'A &str parameter works with any string.',
    },
  ],
};
