// Laravel chapter: Query Builder & SQL. Lessons plus this chapter's quiz questions.

export default {
  id: 'query-builder',
  title: 'Query Builder & SQL',
  description: 'Write efficient SQL with the query builder and avoid injection',
  icon: 'table-chart',
  lessons: [
    {
      id: 'laravel-query-builder',
      title: 'The Query Builder',
      blocks: [
        { type: 'text', value: 'The query builder is a fluent, database-agnostic way to write SQL. DB::table returns rows as stdClass objects, skips models, events and casts, and is ideal for reports, imports and simple reads where a full model adds nothing.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Support\Facades\DB;

$users = DB::table('users')
    ->select('id', 'name', 'email')
    ->where('active', true)
    ->whereIn('role', ['admin', 'editor'])
    ->orderBy('name')
    ->limit(20)
    ->get();

$user = DB::table('users')->where('email', $email)->first();
$count = DB::table('users')->where('active', true)->count();
$page = DB::table('posts')->latest()->paginate(15);` },
        { type: 'code', lang: 'php', value: String.raw`$posts = DB::table('posts')
    ->when($request->filled('search'), function ($query) use ($request) {
        $query->where('title', 'like', '%' . $request->string('search') . '%');
    })
    ->when($request->filled('author'), function ($query) use ($request) {
        $query->where('user_id', $request->integer('author'));
    })
    ->orderByDesc('created_at')
    ->get();` },
        { type: 'list', items: [
          'where, orWhere, whereIn, whereBetween, whereNull and whereDate cover most filters and all use parameter binding.',
          'get() returns a Collection of stdClass; first() returns one row or null; value() returns a single column.',
          'paginate() builds LIMIT and OFFSET and returns a paginator with links and totals for the UI.',
          'when() keeps optional filters readable and only adds the clause when the condition is truthy.',
          'Call toSql() and getBindings() while debugging to see the real SQL and its parameters.',
        ] },
        { type: 'note', value: 'Use the query builder when you do not need model behaviour. If you need relationships, casts or events, use Eloquent instead of recreating them by hand.' },
      ],
    },
    {
      id: 'laravel-joins',
      title: 'Joins and Subqueries',
      blocks: [
        { type: 'text', value: 'A join combines columns from several tables in one query. The query builder supports inner, left, right and cross joins, plus subquery joins for cases where a derived table is clearer than a nested WHERE.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Support\Facades\DB;

$rows = DB::table('orders')
    ->join('users', 'users.id', '=', 'orders.user_id')
    ->leftJoin('payments', 'payments.order_id', '=', 'orders.id')
    ->select('orders.id', 'users.name', 'payments.status as payment_status')
    ->where('orders.total', '>', 100)
    ->get();

$rows = DB::table('users')
    ->join('profiles', function ($join) {
        $join->on('profiles.user_id', '=', 'users.id')
            ->where('profiles.active', true);
    })
    ->get();` },
        { type: 'code', lang: 'php', value: String.raw`$latest = DB::table('posts')
    ->select('user_id', DB::raw('MAX(created_at) as last_post'))
    ->groupBy('user_id');

$users = DB::table('users')
    ->joinSub($latest, 'latest', 'latest.user_id', '=', 'users.id')
    ->select('users.name', 'latest.last_post')
    ->get();

$hasOrders = DB::table('users')
    ->whereExists(function ($query) {
        $query->select(DB::raw(1))
            ->from('orders')
            ->whereColumn('orders.user_id', 'users.id');
    })
    ->get();` },
        { type: 'list', items: [
          'Qualify every column with its table alias. Ambiguous id columns are a common join error.',
          'A left join keeps unmatched left rows; put conditions that must not filter them out in the ON clause, not WHERE.',
          'use whereColumn to compare two columns; a normal where compares against a value.',
          'joinSub and whereExists express derived tables and existence checks without raw SQL strings.',
          'Alias selected columns when names collide, and select only the columns the page uses.',
        ] },
        { type: 'note', value: 'Joins multiply rows when a relation has many matches. Add distinct, group by or an aggregate when you need one row per parent, and test the count before trusting the result.' },
      ],
    },
    {
      id: 'laravel-aggregates',
      title: 'Aggregates, Grouping and Reports',
      blocks: [
        { type: 'text', value: 'Reports almost always need aggregates: counts, sums, averages and per-group totals. The query builder exposes them directly and lets you combine several aggregates in one pass instead of loading rows into PHP.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Support\Facades\DB;

$stats = DB::table('orders')
    ->whereBetween('created_at', [$from, $to])
    ->selectRaw('COUNT(*) as orders, SUM(total) as revenue, AVG(total) as average')
    ->first();

$monthly = DB::table('orders')
    ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, SUM(total) as revenue')
    ->groupBy('month')
    ->having('revenue', '>', 10000)
    ->orderBy('month')
    ->get();

$customers = DB::table('orders')
    ->select('user_id')
    ->selectRaw('COUNT(DISTINCT id) as orders, SUM(total) as spent')
    ->groupBy('user_id')
    ->orderByDesc('spent')
    ->limit(10)
    ->get();` },
        { type: 'list', items: [
          'count(), sum(), avg(), min() and max() are shortcuts; selectRaw is used when you need several at once.',
          'Every non-aggregated selected column must appear in groupBy, or strict SQL modes reject the query.',
          'having filters groups after aggregation; where filters rows before aggregation.',
          'Date functions differ per database: DATE_FORMAT on MySQL, to_char on PostgreSQL, strftime on SQLite.',
          'Count distinct values with selectRaw or distinct()->count() when duplicates would inflate the number.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`$activeUsers = DB::table('users')
    ->where('last_seen_at', '>=', now()->subDays(30))
    ->distinct()
    ->count('id');` },
        { type: 'note', value: 'Paginating a grouped query can be expensive because the database counts groups. For dashboards, cache the aggregate for a few minutes and refresh it with a scheduled job.' },
      ],
    },
    {
      id: 'laravel-raw-sql',
      title: 'Raw Expressions and SQL Safety',
      blocks: [
        { type: 'text', value: 'Some SQL cannot be expressed with fluent methods: database functions, arithmetic expressions or vendor-specific syntax. Raw expressions fill that gap, but they also move responsibility for escaping values from Laravel to you.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Support\Facades\DB;

$products = DB::table('products')
    ->selectRaw('name, price * quantity as total')
    ->whereRaw('price > ?', [100])
    ->orderByRaw('FIELD(status, ?, ?, ?)', ['active', 'draft', 'archived'])
    ->get();

$groups = DB::table('orders')
    ->select('user_id')
    ->selectRaw('SUM(total) as spent')
    ->groupBy('user_id')
    ->havingRaw('SUM(total) > ?', [5000])
    ->get();

$rows = DB::select('select id, name from users where team_id = ?', [$teamId]);` },
        { type: 'list', items: [
          'selectRaw, whereRaw, orderByRaw, havingRaw and groupByRaw accept bindings as a second argument.',
          'DB::raw embeds a string verbatim with no escaping; use it only with trusted, code-controlled text.',
          'Values belong in bindings. Identifiers such as column or table names cannot be bound and must be allow-listed.',
          'DB::select runs a read query; DB::statement runs DDL or statements with no result set; DB::unprepared is rarely needed.',
          'Keep raw fragments small and close to the query so reviewers can see what is interpolated.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`$column = in_array($request->sort, ['name', 'price'], true)
    ? $request->sort
    : 'name';

$products = DB::table('products')
    ->selectRaw('name, price * quantity as total')
    ->orderByRaw($column . ' asc')
    ->get();` },
        { type: 'note', value: 'Never build a raw string from request input, even with addslashes or manual quoting. Bind values and allow-list identifiers; that rule covers every injection path in this chapter.' },
      ],
    },
    {
      id: 'laravel-sql-injection',
      title: 'SQL Injection and Parameter Binding',
      blocks: [
        { type: 'text', value: 'SQL injection happens when input becomes part of the SQL text. An attacker can change the query, bypass a login or read another table. Laravel protects normal query builder methods with parameter binding, but raw concatenation removes that protection.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Support\Facades\DB;

$email = $request->input('email');

// Vulnerable: input is pasted into the SQL text
$unsafe = DB::select("SELECT * FROM users WHERE email = '" . $email . "'");

// Safe: the value is sent separately
$safe = DB::select('SELECT * FROM users WHERE email = ?', [$email]);

// Safe: fluent methods bind automatically
$user = DB::table('users')->where('email', $email)->first();

// Safe raw filter with a binding
$products = DB::table('products')
    ->whereRaw('price > ?', [$request->integer('min')])
    ->get();` },
        { type: 'code', lang: 'php', value: String.raw`$sort = in_array($request->sort, ['name', 'price', 'created_at'], true)
    ? $request->sort
    : 'created_at';

$direction = $request->sort_dir === 'asc' ? 'asc' : 'desc';

$products = DB::table('products')
    ->orderBy($sort, $direction)
    ->get();

$term = addcslashes($request->input('search', ''), '%_\\');

$posts = DB::table('posts')
    ->where('title', 'like', '%' . $term . '%')
    ->get();` },
        { type: 'list', items: [
          'Bindings protect values, not identifiers. ORDER BY, column names and table names must be checked against an allow-list.',
          'Escaping LIKE wildcards prevents a user from turning a search into an expensive full scan with % or _.',
          'Validation reduces bad input but is not a substitute for bindings; both belong in a safe design.',
          'Give the application database user only the privileges it needs: no DROP, no access to unrelated schemas.',
          'Log and alert on database errors, but never return raw SQL errors or stack traces to users.',
        ] },
        { type: 'note', value: 'Eloquent and the query builder are safe only when used correctly. A single whereRaw with concatenation can undo the protection of an otherwise well-written application.' },
      ],
    },
    {
      id: 'laravel-sql-performance',
      title: 'Reading Query Plans and Indexes',
      blocks: [
        { type: 'text', value: 'Slow queries are usually missing indexes, non-sargable predicates or too much data. EXPLAIN shows how the database plans to execute a query, which columns it reads and whether it scans or seeks.' },
        { type: 'code', lang: 'text', value: String.raw`EXPLAIN SELECT id, total, created_at
FROM orders
WHERE user_id = 7 AND status = 'paid'
ORDER BY created_at DESC
LIMIT 50;

-- Look for: type = ref or range, key = index name,
-- rows close to the LIMIT, Extra without Using filesort.` },
        { type: 'code', lang: 'php', value: String.raw`Schema::table('orders', function (Blueprint $table) {
    $table->index(['user_id', 'status', 'created_at']);
});

$orders = DB::table('orders')
    ->select('id', 'total', 'created_at')
    ->where('user_id', 7)
    ->where('status', 'paid')
    ->orderByDesc('created_at')
    ->cursorPaginate(50);` },
        { type: 'list', items: [
          'A composite index helps only if the query uses its leftmost columns: user_id, then status, then created_at.',
          'Keep predicates sargable: WHERE email = ? can use an index, but LOWER(email) = ? usually cannot.',
          'A leading wildcard in LIKE starts with % and forces a scan; search prefixes or use full-text indexes instead.',
          'Select only the needed columns. A covering index can answer the query without reading the table.',
          'Large OFFSET values get slower as pages increase; keyset pagination with cursorPaginate stays fast.',
        ] },
        { type: 'note', value: 'Measure before adding indexes. Every index speeds reads but slows inserts and uses disk, so confirm with EXPLAIN ANALYZE and real data instead of guessing.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'query-builder', q: 'DB::table returns rows as what by default?', options: ['Eloquent models', 'stdClass objects', 'Arrays only', 'JSON strings'], answer: 1, explain: 'The query builder returns plain stdClass rows; map them yourself if you need another shape.' },
    { chapterId: 'query-builder', q: 'Which join keeps all rows from the left table even without a match?', options: ['join', 'leftJoin', 'crossJoin', 'innerJoin'], answer: 1, explain: 'A left join returns every left row and fills related columns with null when there is no match.' },
    { chapterId: 'query-builder', q: 'Which clause filters groups after GROUP BY?', options: ['where', 'having', 'orderBy', 'limit'], answer: 1, explain: 'where filters rows before grouping; having filters the aggregated groups afterwards.' },
    { chapterId: 'query-builder', q: 'Which raw where clause is safe?', options: ['whereRaw("price > " . $x)', 'whereRaw("price > ?", [$x])', 'whereRaw("price > $x")', 'whereRaw("price > :x") without bindings'], answer: 1, explain: 'Passing the value as a binding sends it separately from the SQL text, so it cannot change the query.' },
    { chapterId: 'query-builder', q: 'Parameter placeholders can safely replace which part of a query?', options: ['Table names', 'Column names', 'Values', 'ORDER BY columns'], answer: 2, explain: 'Bindings replace data values only. Identifiers must be validated against an allow-list.' },
    { chapterId: 'query-builder', q: 'Which predicate uses an index most effectively?', options: ['WHERE email LIKE "%x%"', 'WHERE email = "x"', 'WHERE LOWER(email) = "x"', 'WHERE YEAR(created_at) = 2026'], answer: 1, explain: 'A direct equality on an indexed column can seek; leading wildcards and functions on the column usually force a scan.' },
    { chapterId: 'query-builder', q: 'What does EXPLAIN show?', options: ['The SQL result', 'The query plan the database will use', 'Only errors', 'The table schema'], answer: 1, explain: 'EXPLAIN shows access type, chosen indexes, estimated rows and extra operations such as filesort.' },
  ],
};
