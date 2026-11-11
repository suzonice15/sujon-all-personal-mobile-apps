// Laravel chapter: Queues & Jobs. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'queues-jobs',
  title: 'Queues & Jobs',
  description: 'Run slow work in the background reliably',
  icon: 'schedule',
  lessons: [
    {
      id: 'laravel-queues',
      title: 'Why Queues',
      blocks: [
        { type: 'text', value: 'A web request should finish quickly. Sending email, generating PDFs, resizing images, calling third-party APIs and importing CSVs can take seconds or fail. A queue moves that work to a background worker and lets the user get an immediate response.' },
        { type: 'code', lang: 'text', value: String.raw`# .env
QUEUE_CONNECTION=database

# Create the tables that store jobs and failed jobs
php artisan make:queue-table
php artisan make:queue-failed-table
php artisan migrate` },
        { type: 'list', items: [
          'database: simple and durable, good for most small and medium apps.',
          'redis: very fast, ideal with Horizon and high throughput.',
          'sqs: managed AWS queue, good for serverless or multi-server setups.',
          'sync: runs immediately in the same process, useful in tests but not in production.',
          'The worker reads jobs from the queue and runs them outside the request lifecycle.',
        ] },
        { type: 'note', value: 'A queue is not a scheduler. Use the scheduler for "run every hour" and a queue for "do this task now, but later". Most production apps need both.' },
      ],
    },
    {
      id: 'laravel-jobs',
      title: 'Creating and Dispatching Jobs',
      blocks: [
        { type: 'text', value: 'A job is a class with a handle method that does one unit of work. Dispatching it serializes the job to the queue; the worker unserializes it and calls handle. Constructor dependencies and Eloquent models are restored automatically.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Jobs;

use App\Models\Order;
use App\Services\InvoicePdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateInvoice implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Order $order)
    {
    }

    public function handle(InvoicePdf $pdf): void
    {
        $path = $pdf->render($this->order);

        $this->order->update(['invoice_path' => $path]);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

use App\Jobs\GenerateInvoice;
use App\Models\Order;
use Illuminate\Support\Facades\Bus;

$order = Order::findOrFail($id);

GenerateInvoice::dispatch($order);

// Dispatch only when a condition is true
GenerateInvoice::dispatchIf($order->needsInvoice(), $order);

// Queue, connection and delay can be chosen per dispatch
GenerateInvoice::dispatch($order)->onQueue('invoices')->delay(now()->addMinute());

Bus::dispatch(new GenerateInvoice($order));` },
        { type: 'list', items: [
          'Generate a job with php artisan make:job GenerateInvoice.',
          'Pass an Eloquent model, not a huge array; SerializesModels stores the key and reloads it in the worker.',
          'A job should be idempotent: it may run twice after a crash or a retry.',
          'Keep jobs small. A job that does five unrelated things is hard to retry safely.',
        ] },
        { type: 'note', value: 'Do not pass a request, a closure or a database connection in a job constructor; they cannot be serialized reliably. Pass ids and reload what you need inside handle().' },
      ],
    },
    {
      id: 'laravel-job-chains',
      title: 'Chains, Batches and Delays',
      blocks: [
        { type: 'text', value: 'Chains run jobs in order and stop if one fails. Batches run many jobs in parallel and let you react when all of them finish. Delays postpone a job without blocking a worker.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

use App\Jobs\GenerateInvoice;
use App\Jobs\SendInvoiceEmail;
use App\Jobs\ArchiveOrder;
use Illuminate\Support\Facades\Bus;

Bus::chain([
    new GenerateInvoice($order),
    new SendInvoiceEmail($order),
    new ArchiveOrder($order),
])->catch(function (\Throwable $e) {
    report($e);
})->dispatch();

Bus::batch([
    new GenerateInvoice($orderA),
    new GenerateInvoice($orderB),
    new GenerateInvoice($orderC),
])
    ->allowFailures()
    ->then(fn () => Log::info('invoices finished'))
    ->catch(fn () => Log::error('an invoice failed'))
    ->finally(fn () => Cache::forget('invoice.progress'))
    ->dispatch();

GenerateInvoice::dispatch($order)->delay(now()->addHours(2));` },
        { type: 'list', items: [
          'A chain runs on one queue connection and stops at the first failure unless you handle it.',
          'A batch stores progress in the job_batches table; make the table with php artisan make:queue-batches-table.',
          'allowFailures() lets the rest of the batch continue when one job fails.',
          'then, catch and finally callbacks can themselves be queued jobs for heavy work.',
          'Delays are approximate: a busy queue may run a job later than requested.',
        ] },
        { type: 'note', value: 'Do not build long chains for a workflow that must survive partial failure and resume days later. That is a state machine or a workflow engine, not a queue chain.' },
      ],
    },
    {
      id: 'laravel-job-retries',
      title: 'Retries, Timeouts and Failures',
      blocks: [
        { type: 'text', value: 'Networks fail and APIs time out. Jobs should retry a few times with backoff, stop before they hang forever, and record what happened when they finally fail.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ChargeOrder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 5;
    public int $maxExceptions = 2;
    public int $timeout = 20;
    public bool $failOnTimeout = true;

    public function __construct(public Order $order)
    {
    }

    public function handle(): void
    {
        if ($this->order->isPaid()) {
            return;
        }

        $this->order->charge();
    }

    public function backoff(): array
    {
        return [5, 15, 60, 300];
    }

    public function retryUntil(): \DateTime
    {
        return now()->addHours(6);
    }

    public function failed(\Throwable $exception): void
    {
        $this->order->update(['payment_state' => 'needs_review']);
        report($exception);
    }
}` },
        { type: 'list', items: [
          'tries caps the number of attempts; maxExceptions caps real exceptions (a job that is released does not count).',
          'timeout must be lower than the worker timeout, or the worker may kill the process first.',
          'backoff returns seconds or an array per attempt to avoid retry storms.',
          'retryUntil gives a deadline instead of a count, useful for slow external systems.',
          'failed() runs after the final failure; failed jobs are stored in the failed_jobs table.',
        ] },
        { type: 'note', value: 'A retried payment job can charge twice. Use an idempotency key with the payment provider or check the current state before charging. Retries are not a substitute for correct business logic.' },
      ],
    },
    {
      id: 'laravel-horizon',
      title: 'Laravel Horizon',
      blocks: [
        { type: 'text', value: 'Horizon is a Redis queue dashboard and supervisor manager. It shows throughput, wait times, failed jobs and recent jobs, and it can auto-balance workers across queues.' },
        { type: 'code', lang: 'text', value: String.raw`# Install and publish the config and assets
composer require laravel/horizon
php artisan horizon:install
php artisan migrate

# Start the supervisor (production runs this under systemd or Supervisor)
php artisan horizon

# Pause, continue and terminate gracefully
php artisan horizon:pause
php artisan horizon:continue
php artisan horizon:terminate` },
        { type: 'code', lang: 'php', value: String.raw`<?php

// config/horizon.php
return [
    'environments' => [
        'production' => [
            'supervisor-critical' => [
                'connection' => 'redis',
                'queue' => ['critical', 'default'],
                'balance' => 'auto',
                'maxProcesses' => 10,
                'tries' => 3,
            ],
            'supervisor-bulk' => [
                'connection' => 'redis',
                'queue' => ['exports', 'images'],
                'balance' => 'auto',
                'maxProcesses' => 4,
            ],
        ],
    ],
];` },
        { type: 'list', items: [
          'Horizon requires Redis; it is not a driver for database or SQS queues.',
          'Separate critical and bulk queues so a large export cannot starve password-reset emails.',
          'Protect the dashboard with the Horizon::auth gate in a service provider.',
          'Run php artisan horizon:terminate after every deploy so supervisors reload new code.',
          'Use horizon:snapshot or scheduled snapshots to keep metrics over time.',
        ] },
        { type: 'note', value: 'Auto balancing needs at least two queues per supervisor to be useful. Metrics retention defaults to a short window; tune the trim settings so a busy dashboard does not grow Redis forever.' },
      ],
    },
    {
      id: 'laravel-queue-production',
      title: 'Running Workers in Production',
      blocks: [
        { type: 'text', value: 'A worker is a long-running process. Use a process manager such as Supervisor or systemd to restart it after crashes and after deploys. Never rely on a terminal session staying open.' },
        { type: 'code', lang: 'text', value: String.raw`; /etc/supervisor/conf.d/worker.conf
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/app/artisan queue:work redis --queue=critical,default --sleep=1 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=4
redirect_stderr=true
stdout_logfile=/var/www/app/storage/logs/worker.log
stopwaitsecs=3600` },
        { type: 'code', lang: 'text', value: String.raw`# Reload workers after deploying new code
php artisan queue:restart

# Inspect and retry failed jobs
php artisan queue:failed
php artisan queue:retry all
php artisan queue:forget 5
php artisan queue:flush

# Process one job and exit, useful in tests and debugging
php artisan queue:work --once` },
        { type: 'list', items: [
          'Use queue:work, not queue:listen, in production: listen restarts the framework on every job and is much slower.',
          'Set --max-time or --max-jobs so workers recycle and do not leak memory over days.',
          'queue:restart signals workers to finish the current job and exit; Supervisor starts them again.',
          'Monitor queue size, wait time and failed jobs. A growing queue is an outage waiting to happen.',
          'Deploy code and restart workers together, or jobs may run old classes against new data.',
        ] },
        { type: 'note', value: 'During a deploy, run migrations that are backwards compatible with the previous code. Workers still running old code must not break when a new column appears.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'queues-jobs', q: 'Why move work to a queue?', options: ['To make the database faster', 'To keep the HTTP response fast and retry slow work', 'To avoid writing tests', 'To replace cron'], answer: 1, explain: 'Queues move slow or unreliable work out of the request cycle.' },
    { chapterId: 'queues-jobs', q: 'Which queue connection runs jobs immediately in the same process?', options: ['redis', 'database', 'sync', 'sqs'], answer: 2, explain: 'The sync driver is useful in tests but not for background work.' },
    { chapterId: 'queues-jobs', q: 'What happens when one job in a chain fails?', options: ['The rest still run', 'The chain stops', 'It retries forever', 'It switches queues'], answer: 1, explain: 'A chain stops at the first failure unless the failure is handled.' },
    { chapterId: 'queues-jobs', q: 'What does allowFailures() do on a batch?', options: ['Retries every job', 'Lets remaining jobs continue when one fails', 'Deletes failed jobs', 'Disables timeouts'], answer: 1, explain: 'Without it, a failed job cancels the batch.' },
    { chapterId: 'queues-jobs', q: 'What is maxExceptions?', options: ['The number of queue connections', 'The cap on real exceptions before failing the job', 'The maximum job size', 'The worker memory limit'], answer: 1, explain: 'It counts thrown exceptions, separate from tries.' },
    { chapterId: 'queues-jobs', q: 'Which queue backend does Horizon require?', options: ['Database', 'SQS', 'Redis', 'Beanstalkd'], answer: 2, explain: 'Horizon manages Redis queues and supervisors.' },
    { chapterId: 'queues-jobs', q: 'How do you make workers pick up new code after a deploy?', options: ['queue:flush', 'queue:restart', 'queue:retry', 'composer dump-autoload only'], answer: 1, explain: 'queue:restart tells workers to finish and exit, then the process manager restarts them.' },
  ],
};
