// Laravel chapter: Artisan & Scheduling. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'artisan-scheduling',
  title: 'Artisan & Scheduling',
  description: 'Commands, cron-free scheduling and maintenance workflows',
  icon: 'terminal',
  lessons: [
    {
      id: 'laravel-artisan',
      title: 'Artisan Essentials',
      blocks: [
        { type: 'text', value: 'Artisan is the command-line companion of Laravel. It scaffolds code, runs migrations, clears caches, starts workers and runs your own commands. Most day-to-day Laravel work starts in the terminal.' },
        { type: 'code', lang: 'text', value: String.raw`# See every command, or get help for one
php artisan list
php artisan help make:model

# Scaffolding
php artisan make:model Invoice -mfsc
php artisan make:controller InvoiceController --resource
php artisan make:request StoreInvoiceRequest
php artisan make:job GenerateInvoice
php artisan make:test InvoiceTest --pest

# Database
php artisan migrate
php artisan migrate:fresh --seed
php artisan db:seed
php artisan db:show

# Caches and routes
php artisan optimize
php artisan optimize:clear
php artisan route:list --except-vendor
php artisan about` },
        { type: 'list', items: [
          'make:* commands are generators; they create files with the right namespace and boilerplate.',
          'migrate:fresh drops every table. Never run it against production.',
          'optimize caches config, routes, views and events for production; optimize:clear removes them during development.',
          'route:list is the fastest way to see which controller handles a URL and which middleware wraps it.',
          'Commands are registered automatically from app/Console/Commands in Laravel 11 and later.',
        ] },
        { type: 'note', value: 'In local development keep caches cleared while changing config or routes. A cached config ignores edits to .env and config files, which causes confusing bugs.' },
      ],
    },
    {
      id: 'laravel-custom-commands',
      title: 'Custom Artisan Commands',
      blocks: [
        { type: 'text', value: 'A custom command is a class with a signature and a handle method. Use arguments for required values, options for flags, and return an exit code so cron and CI can detect failure.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Console\Commands;

use App\Repositories\DraftRepository;
use Illuminate\Console\Command;

class PruneDrafts extends Command
{
    protected $signature = 'drafts:prune
                            {--days=30 : Delete drafts older than this many days}
                            {--dry-run : Show what would be deleted}';

    protected $description = 'Delete abandoned draft records';

    public function handle(DraftRepository $drafts): int
    {
        $days = (int) $this->option('days');

        if ($days < 1) {
            $this->error('The days option must be at least 1.');

            return self::FAILURE;
        }

        $count = $drafts->olderThan($days)->count();

        if ($this->option('dry-run')) {
            $this->info($count . ' drafts would be deleted.');

            return self::SUCCESS;
        }

        if (! $this->confirm('Delete ' . $count . ' drafts?', true)) {
            $this->warn('Cancelled.');

            return self::SUCCESS;
        }

        $deleted = $drafts->olderThan($days)->delete();
        $this->info($deleted . ' drafts deleted.');

        return self::SUCCESS;
    }
}` },
        { type: 'list', items: [
          'Generate one with php artisan make:command PruneDrafts.',
          'Read arguments with $this->argument("name") and options with $this->option("name").',
          'Return Command::SUCCESS (0) or Command::FAILURE (1); throwing an exception also fails the command.',
          'The container injects dependencies into handle(), so repositories and services work normally.',
          'Use $this->table(), $this->newLine() and progress bars for readable terminal output.',
        ] },
        { type: 'note', value: 'A command is still application code: keep business logic in a service and let the command parse input and report results. That way the same logic is reusable from a job or controller.' },
      ],
    },
    {
      id: 'laravel-scheduler',
      title: 'Task Scheduling',
      blocks: [
        { type: 'text', value: 'Instead of writing many cron entries, you define the schedule in code. One cron entry runs php artisan schedule:run every minute, and Laravel decides which tasks are due.' },
        { type: 'code', lang: 'text', value: String.raw`# The only cron entry needed
* * * * * cd /var/www/app && php artisan schedule:run >> /dev/null 2>&1` },
        { type: 'code', lang: 'php', value: String.raw`<?php

// routes/console.php (Laravel 11 and later)
use App\Jobs\SyncExchangeRates;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::command('drafts:prune --days=30')->dailyAt('02:00');
Schedule::command('reports:build')->weeklyOn(1, '06:30');
Schedule::job(new SyncExchangeRates)->hourly();
Schedule::call(function () {
    Cache::forget('homepage.stats');
})->everyFiveMinutes();

Schedule::command('backup:run')->daily()->timezone('Asia/Dhaka');
Schedule::command('billing:close-month')->monthlyOn(1, '00:15');` },
        { type: 'list', items: [
          'Common frequencies: everyMinute, everyFiveMinutes, hourly, daily, weekly, monthly and cron().',
          'Use between() and unlessBetween() to restrict a task to a time window.',
          'schedule:list shows the next run time of every task; use it to debug a schedule.',
          'The scheduler only runs while cron calls schedule:run; the app does not need to be running itself.',
          'Run schedule:work in local development to avoid editing your system cron.',
        ] },
        { type: 'note', value: 'A scheduled task runs on every server unless you add onOneServer(). For multi-server apps, combine onOneServer() with a shared cache driver so only one machine executes it.' },
      ],
    },
    {
      id: 'laravel-schedule-locks',
      title: 'Locks, Output and Overlap Control',
      blocks: [
        { type: 'text', value: 'Scheduled work can overlap, run twice on several servers, or fail silently. Laravel offers small, composable controls for these problems on the task builder.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('imports:run')
    ->everyTenMinutes()
    ->withoutOverlapping(15)
    ->onOneServer()
    ->runInBackground()
    ->appendOutputTo(storage_path('logs/imports.log'));

Schedule::command('billing:charge')
    ->dailyAt('01:00')
    ->onOneServer()
    ->evenInMaintenanceMode()
    ->emailOutputOnFailure('ops@example.com');

Schedule::command('cache:warm')
    ->hourly()
    ->when(fn () => app()->isProduction());` },
        { type: 'list', items: [
          'withoutOverlapping(minutes) takes a lock and skips a run while the previous one is still going.',
          'onOneServer() requires a shared cache driver such as Redis or database; it does nothing with the array driver.',
          'runInBackground() lets slow tasks run in parallel, but then output and exit codes are no longer inline.',
          'appendOutputTo() and emailOutputOnFailure() make silent failures visible.',
          'evenInMaintenanceMode() is for maintenance jobs such as clearing expired sessions.',
        ] },
        { type: 'note', value: 'Locks expire. Set a value slightly longer than the normal runtime; if a task can run for hours, a short lock will let a second copy start and overlap anyway.' },
      ],
    },
    {
      id: 'laravel-maintenance-tinker',
      title: 'Maintenance Mode and Tinker',
      blocks: [
        { type: 'text', value: 'Maintenance mode shows a friendly page while you migrate or deploy. Tinker is an interactive REPL for exploring models and services without writing a script.' },
        { type: 'code', lang: 'text', value: String.raw`# Put the app in maintenance mode with a bypass secret
php artisan down --secret="deploy-2026" --render="errors::503"

# Visit /deploy-2026 once to set a bypass cookie, then use the app normally
php artisan up

# Allow only selected IPs during maintenance
php artisan down --allow=127.0.0.1 --allow=10.0.0.5

# Tinker
php artisan tinker
App\Models\Order::where('status', 'pending')->count();
App\Models\Order::first()->update(['status' => 'cancelled']);
exit` },
        { type: 'list', items: [
          'The --render option lets you use a custom 503 view instead of the default page.',
          'The bypass secret is in the URL, so treat it like a password and change it per deploy.',
          'Maintenance mode returns HTTP 503, which load balancers and monitoring understand.',
          'In tinker, use exit or Ctrl+D; errors are shown immediately, which makes it great for debugging.',
          'Never run destructive experiments in tinker against production without a backup and a where clause.',
        ] },
        { type: 'note', value: 'Tinker is powerful enough to delete data. Prefer a real command or a test for anything repeatable, and use tinker for reading and one-off checks.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'artisan-scheduling', q: 'Which command caches config, routes and views for production?', options: ['php artisan migrate', 'php artisan optimize', 'php artisan serve', 'php artisan tinker'], answer: 1, explain: 'optimize builds the production caches; optimize:clear removes them.' },
    { chapterId: 'artisan-scheduling', q: 'How does the Laravel scheduler get triggered?', options: ['A queue worker runs it', 'One cron entry runs schedule:run every minute', 'The browser calls it', 'It runs on every request'], answer: 1, explain: 'A single cron entry calls schedule:run, and Laravel picks due tasks.' },
    { chapterId: 'artisan-scheduling', q: 'What does withoutOverlapping() do?', options: ['Runs the task twice', 'Skips a run while the previous one is still running', 'Deletes the lock immediately', 'Moves the task to a queue'], answer: 1, explain: 'It uses a cache lock to prevent concurrent runs.' },
    { chapterId: 'artisan-scheduling', q: 'What is required for onOneServer() to work?', options: ['A shared cache driver', 'A queue connection', 'HTTPS', 'Octane'], answer: 0, explain: 'The lock must be visible to all servers, so use Redis or the database cache.' },
    { chapterId: 'artisan-scheduling', q: 'What does php artisan down --secret do?', options: ['Encrypts the database', 'Creates a bypass URL to access the app during maintenance', 'Deletes the cache', 'Starts a worker'], answer: 1, explain: 'Visiting the secret URL sets a cookie that bypasses maintenance mode.' },
    { chapterId: 'artisan-scheduling', q: 'Why return Command::FAILURE from a command?', options: ['To print in colour', 'So cron and CI detect the failure', 'To retry automatically', 'To skip the scheduler'], answer: 1, explain: 'A non-zero exit code signals failure to the calling process.' },
  ],
};
