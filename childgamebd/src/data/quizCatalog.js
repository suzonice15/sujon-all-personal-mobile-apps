export const QUIZ_MODES = [
  { id: 'study', title: 'পড়াশোনা', subtitle: 'সময় ছাড়া অনুশীলন', icon: 'menu-book', secondsPerQuestion: 0 },
  { id: 'skill', title: 'স্কিল টেস্ট', subtitle: 'প্রতি প্রশ্নে ১০ সেকেন্ড', icon: 'psychology', secondsPerQuestion: 10 },
  { id: 'exam', title: 'পরীক্ষা', subtitle: 'প্রতি প্রশ্নে ৩০ সেকেন্ড', icon: 'assignment', secondsPerQuestion: 30 },
];

export const QUIZ_CATEGORIES = [
  { id: 'islamic-quiz', title: 'ইসলামিক কুইজ', icon: 'mosque', subcategories: ['কুরআন', 'হাদিস', 'নামাজ', 'রোজা', 'দোয়া ও যিকির', 'নবী-রাসূল', 'সাহাবিদের জীবন', 'ইসলামের ইতিহাস', 'আকিদা ও ঈমান'] },
  { id: 'bangladesh-general-knowledge', title: 'বাংলাদেশ সাধারণ জ্ঞান', icon: 'flag', subcategories: ['মুক্তিযুদ্ধ', 'বাংলাদেশের ইতিহাস', 'জেলা ও বিভাগ', 'নদ-নদী', 'জাতীয় দিবস', 'জাতীয় প্রতীক', 'বিখ্যাত ব্যক্তিত্ব'] },
  { id: 'sports', title: 'খেলাধুলা', icon: 'sports-cricket', subcategories: ['ক্রিকেট', 'ফুটবল', 'বাংলাদেশ দল', 'বিশ্বকাপ', 'অলিম্পিক', 'খেলোয়াড় ও রেকর্ড'] },
  { id: 'science-technology', title: 'বিজ্ঞান ও প্রযুক্তি', icon: 'science', subcategories: ['পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'মহাকাশ', 'আবিষ্কার', 'কম্পিউটার', 'মোবাইল', 'কৃত্রিম বুদ্ধিমত্তা'] },
  { id: 'international-knowledge', title: 'আন্তর্জাতিক সাধারণ জ্ঞান', icon: 'public', subcategories: ['দেশ ও রাজধানী', 'মুদ্রা', 'ভাষা', 'আন্তর্জাতিক সংস্থা', 'বিশ্ব ভূগোল'] },
  { id: 'bangla-language-literature', title: 'বাংলা ভাষা ও সাহিত্য', icon: 'translate', subcategories: ['বাংলা ব্যাকরণ', 'কবি', 'লেখক', 'সাহিত্যকর্ম'] },
  { id: 'english-language', title: 'ইংরেজি ভাষা', icon: 'language', subcategories: ['Grammar', 'Vocabulary', 'Spelling', 'Sentence Correction'] },
  { id: 'math', title: 'গণিত', icon: 'calculate', subcategories: ['মৌলিক গণিত', 'শতকরা', 'অনুপাত', 'বীজগণিত', 'যুক্তিনির্ভর গণিত'] },
  { id: 'history', title: 'ইতিহাস', icon: 'account-balance', subcategories: ['বাংলাদেশ ইতিহাস', 'বিশ্ব ইতিহাস', 'প্রাচীন সভ্যতা'] },
  { id: 'geography', title: 'ভূগোল', icon: 'terrain', subcategories: ['নদী', 'পর্বত', 'মহাদেশ', 'জলবায়ু ও মানচিত্র'] },
  { id: 'job-preparation', title: 'চাকরির প্রস্তুতি', icon: 'work', metadataNote: 'প্রতিটি প্রশ্নের সঙ্গে উৎস, পরীক্ষার নাম ও সাল সংরক্ষণ করুন।', metadata: ['source_name', 'exam_name', 'exam_year'], subcategories: ['বিসিএস', 'ব্যাংক', 'সরকারি চাকরি', 'বাংলা', 'ইংরেজি', 'গণিত', 'সাধারণ জ্ঞান'] },
  { id: 'current-affairs', title: 'সাম্প্রতিক ঘটনা', icon: 'newspaper', metadataNote: 'সাম্প্রতিক ঘটনা-ভিত্তিক প্রশ্নে ঘটনার তারিখ ও নির্ভরযোগ্য সূত্রের URL সংরক্ষণ করা হয়েছে।', metadata: ['published_at', 'source_url'], subcategories: ['বাংলাদেশ', 'আন্তর্জাতিক', 'অর্থনীতি', 'বিজ্ঞান ও প্রযুক্তি'] },
  { id: 'computer-ict', title: 'কম্পিউটার ও আইসিটি', icon: 'computer', subcategories: ['Hardware', 'Software', 'Networking', 'Internet', 'Cybersecurity', 'Programming'] },
  { id: 'riddles-brain-games', title: 'ধাঁধা ও বুদ্ধির খেলা', icon: 'extension', subcategories: ['Logic', 'Number Puzzle', 'Pattern', 'Brain Teaser'] },
  { id: 'health-nutrition', title: 'স্বাস্থ্য ও পুষ্টি', icon: 'health-and-safety', subcategories: ['পুষ্টি', 'খাদ্যাভ্যাস', 'স্বাস্থ্যবিধি', 'প্রাথমিক স্বাস্থ্যজ্ঞান'], safetyNote: 'শুধু সাধারণ স্বাস্থ্যশিক্ষা; রোগ নির্ণয় বা চিকিৎসার পরামর্শ নয়।' },
  { id: 'environment-nature', title: 'পরিবেশ ও প্রকৃতি', icon: 'park', subcategories: ['জলবায়ু', 'পরিবেশ দূষণ', 'উদ্ভিদ', 'প্রাণী', 'জীববৈচিত্র্য'] },
  { id: 'film-entertainment', title: 'চলচ্চিত্র ও বিনোদন', icon: 'movie', subcategories: ['বাংলা সিনেমা', 'চলচ্চিত্র', 'অভিনয়শিল্পী', 'বিনোদন জগত'] },
  { id: 'music', title: 'সংগীত', icon: 'music-note', subcategories: ['বাংলা গান', 'শিল্পী', 'বাদ্যযন্ত্র', 'সংগীতের ইতিহাস'] },
  { id: 'literature-books', title: 'সাহিত্য ও বই', icon: 'auto-stories', subcategories: ['বিখ্যাত বই', 'লেখক', 'সাহিত্য পুরস্কার', 'বিশ্বসাহিত্য'] },
  { id: 'business-economics', title: 'ব্যবসা ও অর্থনীতি', icon: 'trending-up', subcategories: ['ব্যাংকিং', 'অর্থনীতি', 'ব্যবসার মৌলিক ধারণা', 'উদ্যোক্তা'] },
  { id: 'agriculture-rural-life', title: 'কৃষি ও গ্রামীণ জীবন', icon: 'agriculture', subcategories: ['ফসল', 'কৃষি', 'মৎস্য', 'প্রাণিসম্পদ', 'কৃষি প্রযুক্তি'] },
  { id: 'food-cooking', title: 'খাবার ও রান্না', icon: 'restaurant', subcategories: ['বাংলাদেশের খাবার', 'ফল', 'মসলা', 'পুষ্টি', 'রান্নার উপকরণ'] },
  { id: 'transport', title: 'যানবাহন ও পরিবহন', icon: 'directions-bus', subcategories: ['ট্রেন', 'বিমান', 'গাড়ি', 'জাহাজ', 'সড়ক নিরাপত্তা'] },
  { id: 'bangladesh-culture', title: 'বাংলাদেশ সংস্কৃতি', icon: 'festival', subcategories: ['ঐতিহ্য', 'উৎসব', 'লোকসংস্কৃতি', 'দর্শনীয় স্থান'] },
  { id: 'leadership-management', title: 'নেতৃত্ব ও ব্যবস্থাপনা', icon: 'groups', subcategories: ['নেতৃত্ব', 'দল পরিচালনা', 'সিদ্ধান্ত গ্রহণ', 'সময় ব্যবস্থাপনা', 'যোগাযোগ', 'সমস্যা সমাধান'] },
  { id: 'career-skills', title: 'পেশাগত দক্ষতা', icon: 'workspace-premium', subcategories: ['চাকরির সাক্ষাৎকার', 'কর্মক্ষেত্রের আচরণ', 'দলগত কাজ', 'যোগাযোগ দক্ষতা', 'সমস্যা সমাধান'] },
];

export const getQuizCategory = (title) =>
  QUIZ_CATEGORIES.find((category) => category.title === title);
