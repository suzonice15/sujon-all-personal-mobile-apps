// Game data for Word Matching (অক্ষর মেলানোর খেলা)
// Players match words with their pictures

export const MATCHING_PAIRS_BN = [
  { word: 'কলা', imageKey: 'banana', hint: 'হলুদ রংয়ের ফল' },
  { word: 'সাপলা', imageKey: 'waterlily', hint: 'পানিতে ভাসে' },
  { word: 'গাছ', imageKey: 'tree', hint: 'সবুগ বৃক্ষ' },
  { word: 'পাখি', imageKey: 'bird', hint: 'আকাশে ওড়ে' },
  { word: 'মাছ', imageKey: 'fish', hint: 'পানিতে থাকে' },
  { word: 'নদী', imageKey: 'river', hint: 'পানির প্রবাহ' },
  { word: 'চাঁদ', imageKey: 'moon', hint: 'রাতে উঠেছে' },
  { word: 'সূর্য', imageKey: 'sun', hint: 'দিনের আলো' },
  { word: 'বই', imageKey: 'book', hint: 'লেখার জিনিস' },
  { word: 'ঘর', imageKey: 'home', hint: 'আশ্রয়স্থল' },
];

export const MATCHING_PAIRS_EN = [
  { word: 'Cat', imageKey: 'cat', hint: 'A small animal that purrs' },
  { word: 'Dog', imageKey: 'dog', hint: 'A pet that barks' },
  { word: 'Apple', imageKey: 'apple', hint: 'A red or green fruit' },
  { word: 'Book', imageKey: 'book', hint: 'You read this' },
  { word: 'Sun', imageKey: 'sun', hint: 'Gives light and warmth' },
  { word: 'Tree', imageKey: 'tree', hint: 'Tall plant with leaves' },
  { word: 'Bird', imageKey: 'bird', hint: 'Flies in the sky' },
  { word: 'Fish', imageKey: 'fish', hint: 'Swims in water' },
  { word: 'Flower', imageKey: 'flower', hint: 'Smells sweet and beautiful' },
  { word: 'Water', imageKey: 'water', hint: 'A clear liquid to drink' },
];

export const getMatchingPairs = (lang) => lang === 'en' ? MATCHING_PAIRS_EN : MATCHING_PAIRS_BN;

export default { MATCHING_PAIRS_BN, MATCHING_PAIRS_EN, getMatchingPairs };