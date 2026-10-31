// PHP chapter: Command-Line PHP. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it has no terminal, so samples set $argv themselves.

export default {
  id: 'cli',
  title: 'Command-Line PHP & Cron',
  description: 'CLI scripts, arguments, exit codes, Symfony Console and cron jobs',
  icon: 'terminal',
  lessons: [
    {
      id: 'php-cli-basics',
      title: 'PHP Outside the Browser',
      blocks: [
        { type: 'text', value: 'PHP is not only for web pages. Backend developers write command-line scripts all the time: data imports, nightly reports, database cleanups, sending queued emails, deployment tasks. php artisan and bin/console are just PHP CLI scripts.' },
        { type: 'code', lang: 'text', value: String.raw`$ php report.php --month=2026-03 --format=csv users.csv
$ php -r 'echo date("Y-m-d"), PHP_EOL;'      # run one line
$ php -l src/Order.php                        # syntax check (lint)
$ php -a                                      # interactive shell
$ php -m                                      # loaded extensions
$ php --ini                                   # which php.ini is used` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// In a terminal PHP fills these for you. Here we simulate:
// php import.php --dry-run --limit=50 products.csv
$argv = ['import.php', '--dry-run', '--limit=50', 'products.csv'];
$argc = count($argv);

echo "Script: {$argv[0]}, $argc arguments\n";

// Parse --flags, --key=value and plain arguments
$options = [];
$files = [];
foreach (array_slice($argv, 1) as $arg) {
    if (preg_match('/^--([\w-]+)(?:=(.*))?$/', $arg, $m)) {
        $options[$m[1]] = $m[2] ?? true;
    } else {
        $files[] = $arg;
    }
}
print_r($options);
print_r($files);

$limit = (int) ($options['limit'] ?? 100);
echo ($options['dry-run'] ?? false) ? "Dry run: would import $limit rows from {$files[0]}\n" : "Importing...\n";
echo "Running as: ", PHP_SAPI, "\n";     // "cli" in a terminal` },
        { type: 'note', value: 'In a real terminal, getopt(\'\', [\'dry-run\', \'limit:\']) parses options for you. PHP_SAPI tells you whether the script runs from the CLI or a web server.' },
      ],
    },
    {
      id: 'php-cli-io',
      title: 'Output, Input and Exit Codes',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`#!/usr/bin/env php
<?php
// STDOUT for normal output, STDERR for errors (so they can be redirected separately)
fwrite(STDOUT, "Processing...\n");
fwrite(STDERR, "Warning: 3 rows skipped\n");

// Ask a question
echo "Delete old logs? [y/N] ";
$answer = strtolower(trim(fgets(STDIN)));
if ($answer !== 'y') {
    echo "Cancelled\n";
    exit(0);
}

// Read piped data: cat data.txt | php count.php
$lines = 0;
while (($line = fgets(STDIN)) !== false) $lines++;

// Exit codes: 0 = success, anything else = failure (cron, CI and shell scripts check this)
exit($lines > 0 ? 0 : 1);` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Coloured, aligned terminal output with ANSI codes and a progress bar
function color(string $text, string $c): string
{
    $codes = ['green' => 32, 'red' => 31, 'yellow' => 33, 'bold' => 1];
    return "\033[{$codes[$c]}m$text\033[0m";
}

function progress(int $done, int $total, int $width = 30): string
{
    $filled = (int) round($width * $done / $total);
    return sprintf("[%s%s] %3d%%", str_repeat('#', $filled), str_repeat('.', $width - $filled), 100 * $done / $total);
}

foreach ([0, 25, 60, 100] as $n) {
    echo progress($n, 100), "\n";
}
// Green and red in a real terminal; Try it is not a terminal, so it shows the raw codes
echo color('Import finished', 'green'), "\n";
echo color('3 rows skipped', 'red'), "\n";
printf("%-10s %s\n", 'imported', '1,204');
printf("%-10s %s\n", 'skipped', '3');` },
      ],
    },
    {
      id: 'php-symfony-console',
      title: 'Building Commands with Symfony Console',
      blocks: [
        { type: 'text', value: 'For real tools use symfony/console (Laravel\'s Artisan is built on it). You get argument parsing, help text, colours, tables, progress bars and questions for free.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// composer require symfony/console
// src/Command/CleanupLogsCommand.php
namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'logs:cleanup', description: 'Delete log files older than N days')]
final class CleanupLogsCommand extends Command
{
    protected function configure(): void
    {
        $this->addOption('days', null, InputOption::VALUE_REQUIRED, 'Age in days', 30)
             ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Only show what would be deleted');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $limit = strtotime('-' . (int) $input->getOption('days') . ' days');
        $old = array_filter(glob(__DIR__ . '/../../storage/logs/*.log'), fn($f) => filemtime($f) < $limit);

        $io->progressStart(count($old));
        foreach ($old as $file) {
            if (!$input->getOption('dry-run')) unlink($file);
            $io->progressAdvance();
        }
        $io->progressFinish();
        $io->success(count($old) . ' files ' . ($input->getOption('dry-run') ? 'would be' : 'were') . ' deleted');
        return Command::SUCCESS;
    }
}

// bin/console
// $app = new Symfony\Component\Console\Application('CodeNest Tools');
// $app->add(new CleanupLogsCommand());
// $app->run();

// $ php bin/console logs:cleanup --days=14 --dry-run` },
      ],
    },
    {
      id: 'php-cron',
      title: 'Scheduled Jobs with Cron',
      blocks: [
        { type: 'text', value: 'Cron runs commands on a schedule on Linux servers. Five fields: minute, hour, day of month, month, day of week. Edit with crontab -e.' },
        { type: 'code', lang: 'text', value: String.raw`# m   h  dom mon dow  command
  */5 *  *   *   *    php /var/www/app/bin/console queue:retry-failed
  0   2  *   *   *    php /var/www/app/bin/console report:daily >> /var/log/report.log 2>&1
  30  9  *   *   1-5  php /var/www/app/bin/console reminders:send      # weekdays 09:30
  0   0  1   *   *    php /var/www/app/bin/console invoices:monthly

# Laravel: ONE cron line, the schedule lives in code (routes/console.php)
  *   *  *   *   *    cd /var/www/app && php artisan schedule:run >> /dev/null 2>&1` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// How a scheduler decides whether a cron expression is due (simplified: numbers, *, */n, ranges)
function fieldMatches(string $field, int $value): bool
{
    foreach (explode(',', $field) as $part) {
        if ($part === '*') return true;
        if (preg_match('#^\*/(\d+)$#', $part, $m) && $value % (int) $m[1] === 0) return true;
        if (preg_match('#^(\d+)-(\d+)$#', $part, $m) && $value >= $m[1] && $value <= $m[2]) return true;
        if (ctype_digit($part) && (int) $part === $value) return true;
    }
    return false;
}

function isDue(string $expression, DateTimeImmutable $at): bool
{
    [$min, $hour, $dom, $mon, $dow] = explode(' ', $expression);
    return fieldMatches($min, (int) $at->format('i')) && fieldMatches($hour, (int) $at->format('G'))
        && fieldMatches($dom, (int) $at->format('j')) && fieldMatches($mon, (int) $at->format('n'))
        && fieldMatches($dow, (int) $at->format('w'));
}

$at = new DateTimeImmutable('2026-03-09 09:30');   // a Monday
foreach (['*/5 * * * *', '0 2 * * *', '30 9 * * 1-5', '30 9 * * 0,6'] as $expr) {
    printf("%-14s %s\n", $expr, isDue($expr, $at) ? 'RUN' : '-');
}` },
        { type: 'list', items: [
          'Prevent overlapping runs: use a lock (flock() on a file, or Laravel ->withoutOverlapping()).',
          'Log output and alert on failures; a silent failing cron job can go unnoticed for weeks.',
          'Cron uses the server time zone: be explicit about it.',
          'Make jobs idempotent: running a job twice by mistake must not send invoices twice.',
        ] },
      ],
    },
    {
      id: 'php-long-running',
      title: 'Long-Running Workers and Signals',
      blocks: [
        { type: 'text', value: 'Queue workers and daemons run for hours. They must handle memory, database reconnections and graceful shutdown when the server deploys or stops them.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// worker.php, managed by Supervisor or systemd
pcntl_async_signals(true);
$running = true;
pcntl_signal(SIGTERM, function () use (&$running) { $running = false; });   // finish the current job, then stop
pcntl_signal(SIGINT, function () use (&$running) { $running = false; });

$started = time();
$processed = 0;

while ($running) {
    $job = $queue->reserve(timeout: 5);          // block up to 5 s waiting for work
    if ($job === null) continue;

    try {
        $job->handle();
        $queue->delete($job);
    } catch (Throwable $e) {
        $queue->release($job, delay: 60);        // retry later
        $logger->error('Job failed', ['exception' => $e]);
    }

    $processed++;
    // Restart regularly to avoid memory leaks and pick up new code
    if ($processed >= 1000 || memory_get_usage(true) > 128 * 1024 * 1024 || time() - $started > 3600) {
        break;                                   // Supervisor starts a fresh process
    }
}
echo "Worker stopped cleanly after $processed jobs\n";` },
        { type: 'code', lang: 'text', value: String.raw`; /etc/supervisor/conf.d/worker.conf
[program:codenest-worker]
command=php /var/www/app/worker.php
numprocs=4
process_name=%(program_name)s_%(process_num)02d
autostart=true
autorestart=true
stopwaitsecs=60
user=www-data
stdout_logfile=/var/log/codenest-worker.log` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'cli', q: 'Which variable holds command-line arguments?', options: ['$_GET', '$argv', '$_SERVER["ARGS"]', '$args'], answer: 1, explain: '$argv[0] is the script name, followed by the arguments; $argc is their count.' },
    { chapterId: 'cli', q: 'What does exit(1) tell the shell or cron?', options: ['Success', 'Failure', 'Restart', 'Nothing'], answer: 1, explain: '0 means success; any other code means failure.' },
    { chapterId: 'cli', q: 'Why write errors to STDERR instead of STDOUT?', options: ['It is faster', 'So errors can be redirected or logged separately from normal output', 'STDOUT cannot show errors', 'For colours'], answer: 1, explain: 'php job.php > out.txt still shows errors on the terminal.' },
    { chapterId: 'cli', q: 'What does the cron expression 0 2 * * * mean?', options: ['Every 2 minutes', 'At 02:00 every day', 'On the 2nd of every month', 'Every 2 hours'], answer: 1, explain: 'Minute 0, hour 2, every day, every month, every weekday.' },
    { chapterId: 'cli', q: 'How should a worker react to SIGTERM?', options: ['Ignore it', 'Finish the current job, then exit cleanly', 'Crash immediately', 'Restart the server'], answer: 1, explain: 'Graceful shutdown avoids half-processed jobs during deploys.' },
    { chapterId: 'cli', q: 'Why restart long-running PHP workers regularly?', options: ['PHP requires it', 'To release leaked memory and load newly deployed code', 'To clear the database', 'To change the time zone'], answer: 1, explain: 'Workers keep code and objects in memory between jobs.' },
  ],
};
