// PHP chapter: Concurrency and Async PHP. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'concurrency',
  title: 'Concurrency & Async PHP',
  description: 'Fibers, event loops, parallel HTTP and worker-mode servers',
  icon: 'sync-alt',
  lessons: [
    {
      id: 'php-concurrency-model',
      title: 'How PHP Handles Many Users',
      blocks: [
        { type: 'text', value: 'Classic PHP is synchronous: one request runs top to bottom in one process. Concurrency comes from running MANY processes (PHP-FPM workers) at once. That is simple and robust, but each worker waits idle during slow I/O such as an HTTP call.' },
        { type: 'list', items: [
          'Process model (PHP-FPM): 50 workers = 50 requests at the same time. A request waiting 2 s for an API blocks its worker for 2 s.',
          'Queues: move slow work out of the request (Performance chapter).',
          'Parallel I/O inside one request: curl_multi or Guzzle promises run several HTTP calls at once.',
          'Async event loop (ReactPHP, Amp, Revolt): one process juggles thousands of connections, ideal for websockets, chat and proxies.',
          'Worker mode (Swoole, RoadRunner, FrankenPHP, Laravel Octane): the app boots once and serves many requests, often with coroutines.',
        ] },
      ],
    },
    {
      id: 'php-fibers',
      title: 'Fibers',
      blocks: [
        { type: 'text', value: 'A Fiber (PHP 8.1) is a function that can pause itself (Fiber::suspend()) and be resumed later, keeping its whole call stack. Async libraries use fibers so that async code looks like normal synchronous code. You rarely use them directly, but understanding them explains how Amp and Revolt work.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
$fiber = new Fiber(function (string $name): string {
    echo "1. $name started\n";
    $reply = Fiber::suspend('waiting for data');   // pause, hand a value out
    echo "3. resumed with: $reply\n";
    Fiber::suspend('waiting again');
    echo "5. finishing\n";
    return "done";
});

$out = $fiber->start('download');            // runs until the first suspend
echo "2. main got: $out\n";
$out = $fiber->resume('first chunk');        // continue inside the fiber
echo "4. main got: $out\n";
$fiber->resume();
echo "6. result: ", $fiber->getReturn(), "\n";

// A tiny round-robin scheduler: several "tasks" take turns
function task(string $name, int $steps): Fiber
{
    return new Fiber(function () use ($name, $steps) {
        for ($i = 1; $i <= $steps; $i++) {
            echo "  $name step $i\n";
            Fiber::suspend();                 // yield control to the scheduler
        }
    });
}

$tasks = [task('email', 2), task('resize', 3), task('report', 1)];
foreach ($tasks as $t) $t->start();
while ($tasks = array_filter($tasks, fn(Fiber $t) => !$t->isTerminated())) {
    foreach ($tasks as $t) $t->resume();
}
echo "All tasks finished\n";` },
        { type: 'code', lang: 'text', value: String.raw`1. download started
2. main got: waiting for data
3. resumed with: first chunk
4. main got: waiting again
5. finishing
6. result: done
  email step 1
  resize step 1
  report step 1
  email step 2
  resize step 2
  resize step 3
All tasks finished` },
        { type: 'note', value: 'This is the real output from PHP on a computer. Fibers need low-level stack switching that the in-app PHP (WebAssembly) does not support, so this sample has no Try it button: copy it and run php fibers.php on your machine.' },
      ],
    },
    {
      id: 'php-parallel-http',
      title: 'Parallel HTTP Requests',
      blocks: [
        { type: 'text', value: 'A dashboard that calls three APIs taking 1 s each needs 3 s sequentially, but only about 1 s if the calls run in parallel. Both cURL and Guzzle support this.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Guzzle promises (composer require guzzlehttp/guzzle)
use GuzzleHttp\Client;
use GuzzleHttp\Promise\Utils;

$client = new Client(['timeout' => 5]);
$promises = [
    'weather' => $client->getAsync('https://api.example.com/weather?city=Dhaka'),
    'rates'   => $client->getAsync('https://api.example.com/rates?base=BDT'),
    'news'    => $client->getAsync('https://api.example.com/news?limit=5'),
];
$results = Utils::settle($promises)->wait();     // waits for ALL, never throws

foreach ($results as $name => $r) {
    echo $name, ': ', $r['state'] === 'fulfilled' ? $r['value']->getStatusCode() : 'failed', "\n";
}

// Plain cURL multi
$mh = curl_multi_init();
$handles = [];
foreach (['https://example.com/a', 'https://example.com/b'] as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}
do {
    $status = curl_multi_exec($mh, $active);
    if ($active) curl_multi_select($mh);
} while ($active && $status === CURLM_OK);
foreach ($handles as $ch) {
    $body = curl_multi_getcontent($ch);
    curl_multi_remove_handle($mh, $ch);
}` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Why parallel helps: a simulation with fake latencies (milliseconds)
$calls = ['weather' => 900, 'rates' => 400, 'news' => 1200];

$sequential = array_sum($calls);
$parallel = max($calls);
printf("Sequential: %d ms\nParallel:   %d ms (%.1fx faster)\n", $sequential, $parallel, $sequential / $parallel);` },
      ],
    },
    {
      id: 'php-event-loop',
      title: 'Event Loops: ReactPHP and Amp',
      blocks: [
        { type: 'text', value: 'An event loop runs forever, waking up when a socket has data or a timer fires. One PHP process can then serve thousands of slow connections, as Node.js does.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// composer require react/http react/event-loop
use Psr\Http\Message\ServerRequestInterface;
use React\Http\HttpServer;
use React\Http\Message\Response;
use React\EventLoop\Loop;
use React\Socket\SocketServer;

$visits = 0;   // lives as long as the process: shared between requests!

$server = new HttpServer(function (ServerRequestInterface $request) use (&$visits) {
    $visits++;
    return Response::json(['path' => $request->getUri()->getPath(), 'visits' => $visits]);
});
$server->listen(new SocketServer('0.0.0.0:8080'));

Loop::addPeriodicTimer(60, fn() => print("Still alive, $visits visits\n"));
echo "Listening on http://localhost:8080\n";
// The loop starts automatically at the end of the script` },
        { type: 'list', items: [
          'Never call blocking functions (PDO, sleep(), file_get_contents on URLs) inside an event loop: they freeze every connection. Use async drivers.',
          'State persists between requests, so be careful with memory and global data.',
          'Typical uses: WebSocket chat servers, real-time notifications, API gateways, crawlers.',
        ] },
      ],
    },
    {
      id: 'php-worker-mode',
      title: 'Swoole, RoadRunner and FrankenPHP',
      blocks: [
        { type: 'text', value: 'Normal PHP boots the whole framework for every request (loading config, container, routes). Worker-mode servers boot the app ONCE and keep it in memory, often doubling or tripling throughput.' },
        { type: 'code', lang: 'text', value: String.raw`# Laravel Octane with FrankenPHP or Swoole
$ composer require laravel/octane
$ php artisan octane:install --server=frankenphp
$ php artisan octane:start --workers=8 --max-requests=500

# Symfony with the FrankenPHP worker mode
$ docker run -e FRANKENPHP_CONFIG="worker ./public/index.php" -p 443:443 -v $PWD:/app dunglas/frankenphp` },
        { type: 'list', items: [
          'Static properties and singletons now survive between requests: reset per-request state (current user, request data).',
          '--max-requests restarts workers periodically to contain memory leaks.',
          'Swoole and OpenSwoole also add coroutines: go(function () { ... }) with non-blocking MySQL, Redis and HTTP clients.',
          'FrankenPHP is a modern server written in Go with HTTPS, HTTP/3 and early hints built in.',
        ] },
        { type: 'note', value: 'Start with PHP-FPM. Move to worker mode when profiling shows that framework bootstrapping is your bottleneck and your code is free of shared-state bugs.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'concurrency', q: 'How does classic PHP-FPM serve many users at once?', options: ['Threads inside one script', 'Many worker processes, each handling one request', 'An event loop', 'It cannot'], answer: 1, explain: 'Each FPM worker runs one request at a time.' },
    { chapterId: 'concurrency', q: 'What does Fiber::suspend() do?', options: ['Kills the fiber', 'Pauses the fiber and returns control (and a value) to the caller', 'Starts a new process', 'Sleeps for one second'], answer: 1, explain: 'resume() continues it later with its stack intact.' },
    { chapterId: 'concurrency', q: 'Three API calls of 1 s each run in parallel. Roughly how long does it take?', options: ['3 s', '1 s', '0 s', '6 s'], answer: 1, explain: 'Total time is about the slowest call.' },
    { chapterId: 'concurrency', q: 'What must you avoid inside a ReactPHP event loop?', options: ['Timers', 'Blocking calls like PDO queries or sleep()', 'JSON responses', 'Closures'], answer: 1, explain: 'A blocking call freezes every connection on that loop.' },
    { chapterId: 'concurrency', q: 'What is the main benefit of worker mode (Octane, FrankenPHP)?', options: ['Smaller code', 'The app boots once and serves many requests, increasing throughput', 'No database needed', 'Automatic security'], answer: 1, explain: 'It removes per-request bootstrapping cost.' },
    { chapterId: 'concurrency', q: 'Which bug becomes common in worker mode?', options: ['Syntax errors', 'State leaking between requests via static properties or singletons', 'Missing semicolons', 'Slower OPcache'], answer: 1, explain: 'Reset per-request state; memory survives between requests.' },
  ],
};
