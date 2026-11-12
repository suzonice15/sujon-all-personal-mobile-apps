// Redis chapter: Transactions and Lua.

export default {
  id: 'transactions-lua',
  title: 'Transactions & Lua',
  description: 'MULTI/EXEC, Lua scripts and atomic operations',
  icon: 'code',
  lessons: [
    {
      id: 'redis-multi-exec',
      title: 'MULTI and EXEC',
      blocks: [
        { type: 'text', value: 'MULTI starts a transaction. Commands are queued, not executed, until EXEC runs them all at once. No other client can interleave commands between MULTI and EXEC, so the sequence is atomic. DISCARD cancels the queue.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `MULTI
INCR balance:ayesha
DECR balance:rahim
EXEC

# If a command has a syntax error, the whole transaction is aborted.
# A runtime error on one command does not roll back the others.` },
        { type: 'note', value: 'Redis transactions are not like SQL transactions: there is no rollback on a runtime error. Each command still runs. Use Lua for true atomic logic.' },
      ],
    },
    {
      id: 'redis-lua',
      title: 'Lua scripts',
      blocks: [
        { type: 'text', value: 'A Lua script runs atomically on the server. It can read and write multiple keys and apply logic that would be racy as separate commands. Scripts are cached and called with EVAL or EVALSHA.' },
        { type: 'code', lang: 'lua', tryIt: false, value: `-- Atomic rate limiter: returns 1 if allowed, 0 if blocked
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local current = redis.call("INCR", key)
if current == 1 then
    redis.call("EXPIRE", key, window)
end
if current > limit then
    return 0
end
return 1` },
        { type: 'code', lang: 'bash', tryIt: false, value: `EVAL "local key=KEYS[1] ..." 1 rate:user:42 100 60` },
        { type: 'note', value: 'Lua scripts block the server while they run. Keep them short and avoid loops over large data.' },
      ],
    },
    {
      id: 'redis-pipeline',
      title: 'Pipelining',
      blocks: [
        { type: 'text', value: 'Pipelining sends several commands without waiting for each reply. It reduces round-trip latency dramatically. Unlike MULTI/EXEC, pipelined commands are not atomic, but they are much faster.' },
        { type: 'code', lang: 'python', tryIt: false, value: `pipe = r.pipeline()
pipe.incr("counter")
pipe.get("counter")
pipe.setex("session:abc", 3600, "user:42")
results = pipe.execute()   # one round trip for all three` },
        { type: 'note', value: 'Combine pipelining with transactions (pipeline(transaction=True)) when you need both speed and atomicity.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'transactions-lua',
      q: 'What does MULTI do?',
      options: ['Runs one command', 'Starts a queue of commands that run together on EXEC', 'Deletes keys', 'Creates a Lua script'],
      answer: 1,
      explain: 'Commands are queued and executed atomically on EXEC.',
    },
    {
      chapterId: 'transactions-lua',
      q: 'Why use a Lua script instead of MULTI/EXEC?',
      options: ['Lua is faster to type', 'Lua can apply logic atomically across keys', 'MULTI cannot run', 'Lua stores data on disk'],
      answer: 1,
      explain: 'Lua runs atomically and can read and write conditionally.',
    },
    {
      chapterId: 'transactions-lua',
      q: 'What does pipelining reduce?',
      options: ['Memory usage', 'Round-trip latency by batching commands', 'Data size', 'The number of keys'],
      answer: 1,
      explain: 'One round trip carries many commands.',
    },
    {
      chapterId: 'transactions-lua',
      q: 'Why keep Lua scripts short?',
      options: ['Long scripts are not allowed', 'They block the server while running', 'They use too much memory', 'They are slower to parse'],
      answer: 1,
      explain: 'The server cannot process other commands during a script.',
    },
  ],
};
