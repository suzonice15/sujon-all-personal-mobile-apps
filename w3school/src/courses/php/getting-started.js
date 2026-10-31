// PHP chapter: Getting Started. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What PHP is, how it runs and your first scripts',
  icon: 'play-circle-outline',
  lessons: [
    {
      id: 'php-intro',
      title: 'What is PHP?',
      blocks: [
        { type: 'text', value: 'PHP is a server-side programming language made for the web. It runs on the server, builds a response (usually HTML or JSON) and sends only the result to the browser. The visitor never sees your PHP code.' },
        { type: 'list', items: [
          'It powers a large share of the web: WordPress, Wikipedia, Facebook (originally), Laravel and Symfony apps.',
          'It is free, open source and runs on almost every hosting provider.',
          'Modern PHP (version 8+) is fast, typed and object-oriented, with a huge package ecosystem (Composer).',
          'It talks to databases (MySQL, PostgreSQL, SQLite), handles forms, logins, file uploads, emails and APIs.',
        ] },
        { type: 'heading', value: 'How a PHP page is served' },
        { type: 'list', items: [
          '1. The browser requests https://example.com/profile.php',
          '2. The web server (Nginx or Apache) passes the request to PHP (PHP-FPM).',
          '3. PHP runs the script, reads the database and builds HTML.',
          '4. The server sends that HTML back. PHP then forgets everything: each request starts fresh.',
        ] },
        { type: 'note', value: 'That last point matters: PHP is "shared nothing". Variables do not survive between requests. To remember things you use a database, files, sessions or a cache.' },
      ],
    },
    {
      id: 'php-first-script',
      title: 'Your First Script',
      blocks: [
        { type: 'text', value: 'PHP code lives between <?php and ?> tags. Everything outside the tags is sent as-is. echo prints text. Every statement ends with a semicolon.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
echo "Hello, World!\n";
echo "Welcome to CodeNest.\n";

// print works too (it returns 1, so it can be used in expressions)
print "Learning PHP 8\n";

// echo can take several values separated by commas
echo "2 + 3 = ", 2 + 3, "\n";` },
        { type: 'list', items: [
          '"\\n" is a new line. In a browser you would usually output <br> or HTML tags instead.',
          'Files that contain only PHP should NOT end with ?>: a stray space after it would be sent to the browser and can break headers.',
          'PHP is case-sensitive for variables ($name and $Name are different) but not for keywords and function names.',
        ] },
      ],
    },
    {
      id: 'php-in-html',
      title: 'PHP Inside HTML',
      blocks: [
        { type: 'text', value: 'PHP was born as a templating language. You can mix it into HTML, and the short echo tag <?= ... ?> prints a value.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$title = "My Shop";
$products = ["Keyboard", "Mouse", "Monitor"];
?>
<!DOCTYPE html>
<html>
<body>
  <h1><?= $title ?></h1>
  <p>Today is <?= date('l') ?>.</p>
  <ul>
    <?php foreach ($products as $product): ?>
      <li><?= $product ?></li>
    <?php endforeach; ?>
  </ul>
</body>
</html>` },
        { type: 'note', value: 'Try it shows the raw HTML your script produced and the rendered page below it. In real templates, always escape values with htmlspecialchars() (Security chapter).' },
      ],
    },
    {
      id: 'php-comments-syntax',
      title: 'Comments and Basic Syntax',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Single-line comment
# Also a single-line comment (less common)

/*
  Multi-line comment.
  Useful for longer explanations.
*/

/**
 * DocBlock: documents functions and classes.
 * Editors and tools like PHPStan read these.
 *
 * @param string $name The person to greet
 */
function greet(string $name): string
{
    return "Hi, $name!";
}

echo greet("Rahim"), "\n";` },
        { type: 'list', items: [
          'Statements end with ;. Blocks use { }.',
          'Whitespace and indentation do not change the meaning, but follow PSR-12: 4 spaces, braces of functions and classes on their own line.',
          'Variables start with $ and are created on first assignment: no let or var keyword.',
        ] },
      ],
    },
    {
      id: 'php-setup',
      title: 'Setting Up PHP on Your Computer',
      blocks: [
        { type: 'text', value: 'In this app Try it runs PHP for you. For real projects install PHP locally:' },
        { type: 'list', items: [
          'Windows: XAMPP or Laragon (PHP + Apache/Nginx + MySQL in one installer), or download PHP from windows.php.net.',
          'macOS: brew install php. Linux: sudo apt install php-cli php-mysql php-mbstring php-xml.',
          'Check it: php -v',
          'Run a script from the terminal: php hello.php',
          'Start the built-in development server in a folder: php -S localhost:8000, then open http://localhost:8000',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ php -v
PHP 8.3.11 (cli)

$ php -r 'echo PHP_VERSION, "\n";'
8.3.11

$ php -S localhost:8000
PHP Development Server started at http://localhost:8000` },
        { type: 'note', value: 'Use VS Code with the "PHP Intelephense" extension for autocompletion and error checking. The built-in server is for development only; production uses Nginx + PHP-FPM (Deployment chapter).' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'Where does PHP code run?', options: ['In the browser', 'On the server', 'In the database', 'In CSS'], answer: 1, explain: 'PHP runs on the server and only sends the result (HTML, JSON) to the browser.' },
    { chapterId: 'getting-started', q: 'Which tag starts a block of PHP code?', options: ['<php>', '<?php', '<script php>', '{{ php'], answer: 1, explain: 'PHP code goes between <?php and ?>.' },
    { chapterId: 'getting-started', q: 'What does <?= $name ?> do?', options: ['Assigns $name', 'Prints $name', 'Compares $name', 'Comments out $name'], answer: 1, explain: '<?= is the short echo tag: <?php echo $name; ?>' },
    { chapterId: 'getting-started', q: 'What ends a PHP statement?', options: ['A new line', 'A period', 'A semicolon', 'A colon'], answer: 2, explain: 'Every statement ends with ;' },
    { chapterId: 'getting-started', q: 'Why should a PHP-only file not end with ?>', options: ['It is a syntax error', 'Whitespace after it is sent as output and can break headers', 'It disables echo', 'It makes the file slower'], answer: 1, explain: 'Stray output before header() or session_start() causes "headers already sent" errors.' },
    { chapterId: 'getting-started', q: 'What happens to PHP variables after a request finishes?', options: ['They are saved automatically', 'They are lost; each request starts fresh', 'They move to the browser', 'They become constants'], answer: 1, explain: 'PHP is shared-nothing: use a database, session or cache to keep data.' },
  ],
};
