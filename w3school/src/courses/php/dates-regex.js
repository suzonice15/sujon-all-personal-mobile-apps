// PHP chapter: Dates and Regular Expressions. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'dates-regex',
  title: 'Dates & Regular Expressions',
  description: 'DateTimeImmutable, time zones and preg_* functions',
  icon: 'event',
  lessons: [
    {
      id: 'php-date-basics',
      title: 'date(), time() and Timestamps',
      blocks: [
        { type: 'text', value: 'A Unix timestamp is the number of seconds since 1 January 1970 UTC. time() returns the current one; date() formats a timestamp.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
date_default_timezone_set('Asia/Dhaka');

$ts = mktime(14, 30, 0, 12, 16, 2026);   // 16 Dec 2026, 14:30
echo $ts, "\n";
echo date('Y-m-d H:i:s', $ts), "\n";     // 2026-12-16 14:30:00
echo date('d/m/Y', $ts), "\n";
echo date('D, j M Y', $ts), "\n";        // Wed, 16 Dec 2026
echo date('l jS F Y, g:i A', $ts), "\n";

// strtotime understands English phrases
echo date('Y-m-d', strtotime('2026-01-31 +1 month')), "\n";  // careful: 2026-03-03!
echo date('Y-m-d', strtotime('last day of next month', $ts)), "\n";
echo date('Y-m-d', strtotime('next friday', $ts)), "\n";` },
        { type: 'list', items: [
          'Y 4-digit year, m month 01-12, d day 01-31, H 00-23, i minutes, s seconds.',
          'D Mon..Sun, l Monday, M Jan, F January, j day without zero, A AM/PM, N weekday 1-7.',
          'Store dates in the database as UTC (DATETIME or TIMESTAMP) and convert to the user\'s time zone only when displaying.',
        ] },
      ],
    },
    {
      id: 'php-datetime',
      title: 'DateTimeImmutable',
      blocks: [
        { type: 'text', value: 'Use the DateTimeImmutable class in real code. Every change returns a NEW object, so a date you pass around can never be modified by accident (the mutable DateTime class is a common source of bugs).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$tz = new DateTimeZone('Asia/Dhaka');
$order = new DateTimeImmutable('2026-03-10 18:45', $tz);

$delivery = $order->modify('+3 days');
echo $order->format('D d M H:i'), " -> ", $delivery->format('D d M H:i'), "\n";

$due = $order->add(new DateInterval('P1M2DT3H'));   // 1 month 2 days 3 hours
echo $due->format(DATE_ATOM), "\n";

// Difference between two dates
$birth = new DateTimeImmutable('2001-07-25');
$today = new DateTimeImmutable('2026-03-10');
$age = $birth->diff($today);
echo "Age: {$age->y} years, {$age->m} months, {$age->d} days\n";
echo "Total days: {$age->days}\n";

// Parse a fixed format (strict)
$d = DateTimeImmutable::createFromFormat('d/m/Y H:i', '25/12/2026 09:00', $tz);
echo $d->format('Y-m-d H:i'), "\n";

// Convert time zones
$utc = $order->setTimezone(new DateTimeZone('UTC'));
echo "Dhaka {$order->format('H:i')} = UTC {$utc->format('H:i')}\n";

// Compare
var_dump($delivery > $order);` },
      ],
    },
    {
      id: 'php-date-periods',
      title: 'Periods and Calendars',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Every Monday in March 2026
$start = new DateTimeImmutable('first monday of march 2026');
$end = new DateTimeImmutable('2026-04-01');
foreach (new DatePeriod($start, new DateInterval('P1W'), $end) as $day) {
    echo $day->format('D d M'), "\n";
}

// Working days between two dates (skip Friday and Saturday)
function workingDays(DateTimeImmutable $from, DateTimeImmutable $to): int
{
    $count = 0;
    foreach (new DatePeriod($from, new DateInterval('P1D'), $to) as $d) {
        if (!in_array((int) $d->format('N'), [5, 6], true)) $count++;
    }
    return $count;
}
echo workingDays(new DateTimeImmutable('2026-03-01'), new DateTimeImmutable('2026-04-01')), " working days\n";

// "5 minutes ago" style
function ago(DateTimeImmutable $then, DateTimeImmutable $now): string
{
    $s = $now->getTimestamp() - $then->getTimestamp();
    return match (true) {
        $s < 60 => 'just now',
        $s < 3600 => intdiv($s, 60) . ' min ago',
        $s < 86400 => intdiv($s, 3600) . ' h ago',
        default => intdiv($s, 86400) . ' days ago',
    };
}
$now = new DateTimeImmutable('2026-03-10 12:00');
echo ago(new DateTimeImmutable('2026-03-10 11:52'), $now), "\n";
echo ago(new DateTimeImmutable('2026-03-07 09:00'), $now), "\n";` },
      ],
    },
    {
      id: 'php-regex-basics',
      title: 'Regular Expressions with preg_match',
      blocks: [
        { type: 'text', value: 'PHP uses PCRE (Perl-compatible) regular expressions. A pattern sits between delimiters, usually /.../, followed by flags like i (case-insensitive) or u (Unicode).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Does it match? (returns 1 or 0)
var_dump(preg_match('/^01[3-9]\d{8}$/', '01712345678'));   // Bangladeshi mobile
var_dump(preg_match('/^01[3-9]\d{8}$/', '01212345678'));

// Capture groups
if (preg_match('/(\d{4})-(\d{2})-(\d{2})/', 'Due: 2026-12-16', $m)) {
    print_r($m);   // [0] full match, [1] year, [2] month, [3] day
}

// Named groups are easier to read
preg_match('/(?<user>[\w.]+)@(?<domain>[\w.-]+)/', 'mail me at nadia.k@codenest.app', $m);
echo $m['user'], " / ", $m['domain'], "\n";

// All matches
preg_match_all('/#(\w+)/', 'Learning #php and #mysql on #codenest', $m);
print_r($m[1]);

// Unicode text needs the u flag
var_dump(preg_match('/^\p{Bengali}+$/u', 'বাংলা'));` },
        { type: 'list', items: [
          '\\d digit, \\w word character, \\s whitespace, . any character, ^ start, $ end.',
          '+ one or more, * zero or more, ? optional, {2,4} between 2 and 4.',
          '[abc] one of, [^abc] none of, (a|b) either, (?<name>...) named group.',
        ] },
      ],
    },
    {
      id: 'php-regex-replace',
      title: 'preg_replace, preg_split and Callbacks',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Replace
echo preg_replace('/\s+/', ' ', "too    many     spaces"), "\n";
echo preg_replace('/(\d{3})\d{5}(\d{3})/', '$1*****$2', '01712345678'), "\n";  // mask

// Make a URL slug
function slugify(string $text): string
{
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return trim($text, '-');
}
echo slugify("  PHP 8.3: What's New?! "), "\n";

// Callback replacement
echo preg_replace_callback('/\d+/', fn($m) => $m[0] * 2, 'Buy 2 get 3'), "\n";

// Split
print_r(preg_split('/[,;|]\s*/', 'php, mysql;laravel| redis'));

// Validate a strong password: 8+ chars, upper, lower, digit
$strong = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/';
foreach (['password', 'Passw0rd'] as $p) {
    echo $p, ": ", preg_match($strong, $p) ? 'strong' : 'weak', "\n";
}` },
        { type: 'note', value: 'Do not validate emails or URLs with your own regex: filter_var() is tested and correct. Use regex for your own formats (order numbers, phone numbers, slugs).' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'dates-regex', q: 'What does date("Y-m-d") produce for 5 March 2026?', options: ['05-03-2026', '2026-03-05', '2026-3-5', 'March 5, 2026'], answer: 1, explain: 'Y = 4-digit year, m and d = zero-padded month and day.' },
    { chapterId: 'dates-regex', q: 'Why prefer DateTimeImmutable over DateTime?', options: ['It is faster', 'Changes return a new object, so dates cannot be modified by accident', 'It supports time zones', 'It has more formats'], answer: 1, explain: 'DateTime::modify() changes the original object, which causes subtle bugs.' },
    { chapterId: 'dates-regex', q: 'Which interval spec means "1 month and 2 days"?', options: ['1M2D', 'P1M2D', 'PT1M2D', '+1m2d'], answer: 1, explain: 'P starts the period; T separates the time part (PT1M = 1 minute).' },
    { chapterId: 'dates-regex', q: 'How should dates be stored in the database?', options: ['In the user\'s local time zone', 'In UTC, converted for display', 'As formatted strings', 'As day names'], answer: 1, explain: 'UTC is unambiguous; convert per user when showing it.' },
    { chapterId: 'dates-regex', q: 'Which regex flag makes PCRE treat the subject as UTF-8?', options: ['i', 'm', 'u', 's'], answer: 2, explain: 'The u flag is required for Unicode text like Bangla.' },
    { chapterId: 'dates-regex', q: 'Which function returns ALL matches of a pattern?', options: ['preg_match', 'preg_match_all', 'preg_grep', 'preg_split'], answer: 1, explain: 'preg_match stops at the first match.' },
  ],
};
