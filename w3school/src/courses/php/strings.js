// PHP chapter: Strings. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'strings',
  title: 'Strings',
  description: 'Quoting, interpolation, formatting and string functions',
  icon: 'text-fields',
  lessons: [
    {
      id: 'php-string-quotes',
      title: 'Single, Double, Heredoc and Nowdoc',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$name = "Karim";
$cart = ['items' => 3];

echo 'Single: $name\n', "\n";              // literal, only \' and \\ are escapes
echo "Double: $name\n";                     // variables and escapes work
echo "Array key: {$cart['items']} items\n"; // use {} for array keys and expressions
echo "Tab:\tafter tab\n";

// Heredoc: multi-line, interpolates like double quotes
$html = <<<HTML
<p>Hello, {$name}!</p>
<p>You have {$cart['items']} items.</p>
HTML;
echo $html, "\n";

// Nowdoc: multi-line, no interpolation (like single quotes)
$template = <<<'TXT'
Dear $name, this text is not interpolated.
TXT;
echo $template, "\n";` },
        { type: 'note', value: 'Use single quotes when there is nothing to interpolate: it is clearer. Use {$var} inside double quotes whenever it is more than a simple variable.' },
      ],
    },
    {
      id: 'php-string-functions',
      title: 'Essential String Functions',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$s = "  Learn PHP with CodeNest  ";

echo strlen($s), "\n";              // 27 (bytes)
echo "[" . trim($s) . "]\n";        // remove surrounding whitespace
echo strtoupper("php"), "\n";
echo strtolower("PHP"), "\n";
echo ucfirst("hello"), " ", ucwords("hello big world"), "\n";

$t = trim($s);
echo strpos($t, "PHP"), "\n";       // 6 (position, or false if missing)
echo substr($t, 6, 3), "\n";        // "PHP"
echo substr($t, -8), "\n";          // "CodeNest"
echo str_replace("PHP", "Laravel", $t), "\n";
echo str_repeat("=", 10), "\n";
echo str_pad("7", 3, "0", STR_PAD_LEFT), "\n";   // 007
echo strrev("abc"), "\n";

// PHP 8 helpers: clear and safe
var_dump(str_contains($t, "Code"));
var_dump(str_starts_with($t, "Learn"));
var_dump(str_ends_with($t, "Nest"));` },
        { type: 'note', value: 'strpos() returns 0 when the match is at the start, and 0 is falsy. Always compare with !== false, or better, use str_contains().' },
      ],
    },
    {
      id: 'php-explode-implode',
      title: 'Splitting and Joining',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$csv = "html,css,javascript,php";
$skills = explode(",", $csv);       // string -> array
print_r($skills);

echo implode(" | ", $skills), "\n"; // array -> string

// Limit the number of pieces
[$user, $domain] = explode("@", "nadia@example.com", 2);
echo "$user at $domain\n";

// Split into characters or fixed-size chunks
print_r(str_split("ABCDEF", 2));

// Words
echo str_word_count("PHP is fun to learn"), " words\n";
print_r(preg_split('/\s+/', "split   on  any   whitespace"));` },
      ],
    },
    {
      id: 'php-formatting',
      title: 'Formatting with printf and sprintf',
      blocks: [
        { type: 'text', value: 'sprintf() builds a string from a template; printf() prints it directly. They are perfect for money, padding and tables.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$product = "Keyboard";
$price = 1499.5;
$qty = 3;

printf("%s x %d = %.2f Tk\n", $product, $qty, $price * $qty);
echo sprintf("%05d", 42), "\n";          // 00042
echo sprintf("%-10s|", "left"), "\n";    // pad right
echo sprintf("%10s|", "right"), "\n";    // pad left
echo sprintf("%x %o %b", 255, 8, 5), "\n"; // hex, octal, binary
echo sprintf('%1$s and %1$s again', "echo"), "\n"; // reuse argument 1

// Thousands separators
echo number_format(1234567.891), "\n";          // 1,234,568
echo number_format(1234567.891, 2), "\n";       // 1,234,567.89
echo number_format(1234567.891, 2, '.', ' '), "\n";

// A small aligned table
foreach (['Mouse' => 450, 'Monitor' => 15500] as $item => $cost) {
    printf("%-8s %8s\n", $item, number_format($cost));
}` },
      ],
    },
    {
      id: 'php-multibyte',
      title: 'Unicode and Multibyte Strings',
      blocks: [
        { type: 'text', value: 'PHP strings are byte arrays. Text in Bangla, Arabic or emoji uses several bytes per character in UTF-8, so strlen(), substr() and strtoupper() can give wrong results. Use the mb_* functions from the mbstring extension for real text.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$word = "café";
$bn = "বাংলা";

echo strlen($word), " bytes, ", mb_strlen($word), " characters\n";
echo strlen($bn), " bytes, ", mb_strlen($bn), " characters\n";

echo strtoupper($word), "\n";     // CAFé (wrong)
echo mb_strtoupper($word), "\n";  // CAFÉ (right)

echo mb_substr($bn, 0, 2), "\n";  // first 2 characters, safely
echo mb_str_pad("৫", 3, "০", STR_PAD_LEFT), "\n"; // PHP 8.3: mb_str_pad

// Count user-visible characters, e.g. for a 160-character SMS limit
$message = "Hello 👋 from CodeNest";
echo mb_strlen($message), " characters\n";` },
        { type: 'note', value: 'Always store and send text as UTF-8: <meta charset="UTF-8"> in HTML, utf8mb4 in MySQL, and the header Content-Type: text/html; charset=UTF-8.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'strings', q: 'Which operator joins two strings?', options: ['+', '.', '&', ','], answer: 1, explain: '"a" . "b" gives "ab". + is only for numbers.' },
    { chapterId: 'strings', q: 'Which string type interpolates variables?', options: ['Single quotes', 'Nowdoc', 'Double quotes and heredoc', 'None'], answer: 2, explain: 'Double-quoted strings and heredoc interpolate; single quotes and nowdoc do not.' },
    { chapterId: 'strings', q: 'Why is if (strpos($s, "a")) risky?', options: ['strpos is deprecated', 'It returns 0 for a match at the start, which is falsy', 'It returns a string', 'It is case-insensitive'], answer: 1, explain: 'Compare with !== false or use str_contains().' },
    { chapterId: 'strings', q: 'What does explode(",", "a,b,c") return?', options: ['"abc"', '["a", "b", "c"]', '3', '"a b c"'], answer: 1, explain: 'explode() splits a string into an array.' },
    { chapterId: 'strings', q: 'What does sprintf("%.2f", 3.14159) return?', options: ['3.14159', '3.14', '3', '3.1'], answer: 1, explain: '%.2f formats a float with 2 decimals.' },
    { chapterId: 'strings', q: 'Why use mb_strlen() for Bangla text?', options: ['It is faster', 'strlen() counts bytes, not characters', 'strlen() does not accept Unicode', 'mb_strlen() trims spaces'], answer: 1, explain: 'UTF-8 characters can take several bytes; mb_* functions count characters.' },
  ],
};
