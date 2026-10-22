// PHP interview questions, grouped by chapter id (see src/courses/index.js).
// Questions with tryIt: true open their code in the Try it editor.

export default {
  'getting-started': [
    { level: 'basic', q: 'What is PHP and where does it run?', a: 'PHP is a server-side scripting language for the web. It runs on the server (usually PHP-FPM behind Nginx or Apache), produces HTML or JSON and sends only the result to the browser. Users never see the PHP source.' },
    { level: 'basic', q: 'What is the difference between echo and print?', a: 'Both output strings. echo is a language construct that accepts several comma-separated arguments and returns nothing; print accepts one argument and returns 1, so it can be used in expressions. echo is the common choice.' },
    { level: 'intermediate', q: 'Why should a file containing only PHP omit the closing ?> tag?', a: 'Any whitespace or newline after ?> is sent as output. That breaks header(), setcookie() and session_start() with "headers already sent" errors and can corrupt JSON or file downloads. PSR-12 requires omitting it.' },
    { level: 'intermediate', q: 'What does "shared nothing" mean for PHP?', a: 'Each request starts with a fresh process state: variables, objects and static properties are gone after the response. State must be kept in a database, session, cache or files. This makes PHP easy to scale horizontally (add more servers).' },
  ],
  'variables-types': [
    { level: 'basic', q: 'What are PHP\'s scalar types?', a: 'int, float, string and bool. Compound types are array, object, callable and iterable; special types are null and resource. var_dump() and get_debug_type() show the type of a value.' },
    { level: 'basic', q: 'What is the difference between isset(), empty() and is_null()?', a: 'isset() is true if the variable or key exists and is not null. empty() is true if it does not exist or is falsy (0, "0", "", [], null, false). is_null() checks for null but warns on undefined variables. Use ?? to read optional values.' },
    { level: 'intermediate', q: 'What does declare(strict_types=1) change?', a: 'It disables automatic conversion of scalar arguments and return values for calls made from that file: passing "5" to an int parameter throws TypeError instead of being converted. The only allowed widening is int to float. It must be the first statement of the file.', code: String.raw`<?php
declare(strict_types=1);
function double(int $n): int { return $n * 2; }
echo double(5), "\n";
try { double("5"); } catch (TypeError $e) { echo $e->getMessage(), "\n"; }`, lang: 'php', tryIt: true },
    { level: 'intermediate', q: 'Which values are falsy in PHP?', a: 'false, 0, 0.0, -0.0, "" (empty string), "0", null and [] (empty array). Everything else is truthy, including "0.0", " ", "false" and objects.' },
    { level: 'advanced', q: 'How did string-to-number comparison change in PHP 8?', a: 'Before PHP 8, comparing a number with a non-numeric string converted the string to a number, so 0 == "abc" was true. Since PHP 8, if the string is not numeric the number is converted to a string and compared as strings, so 0 == "abc" is false. Numeric strings still compare numerically.' },
  ],
  strings: [
    { level: 'basic', q: 'What is the difference between single and double quotes?', a: 'Double-quoted strings interpolate variables ("Hi $name") and escape sequences like \\n. Single-quoted strings are literal except for \\\' and \\\\. Heredoc behaves like double quotes and nowdoc like single quotes for multi-line text.' },
    { level: 'intermediate', q: 'Why is checking strpos() with if (strpos(...)) a bug?', a: 'strpos() returns the position, which is 0 when the needle is at the start, and 0 is falsy. It returns false when not found. Compare with !== false, or use str_contains(), str_starts_with() and str_ends_with() in PHP 8.' },
    { level: 'intermediate', q: 'When do you need mb_* functions?', a: 'For multibyte UTF-8 text (Bangla, Arabic, emoji, accented letters). strlen() counts bytes and substr()/strtoupper() can cut or mangle characters. mb_strlen(), mb_substr(), mb_strtoupper() work with characters.', code: String.raw`<?php
$s = "বাংলা";
echo strlen($s), " bytes vs ", mb_strlen($s), " characters\n";`, lang: 'php', tryIt: true },
    { level: 'advanced', q: 'How would you build a URL slug safely?', a: 'Transliterate or lowercase the text, replace every run of characters outside [a-z0-9] with a hyphen using preg_replace(), trim hyphens from the ends, and make it unique in the database by appending a counter when it already exists.' },
  ],
  'operators-control': [
    { level: 'basic', q: 'What is the difference between ?? and ?:', a: '$a ?? $b returns $b only when $a is undefined or null. $a ?: $b returns $b whenever $a is falsy (0, "", "0", false...). Use ?? for optional input so a valid 0 is kept.' },
    { level: 'basic', q: 'match vs switch?', a: 'match is an expression that returns a value, compares strictly with ===, has no fall-through (no break needed), supports several values per arm and throws UnhandledMatchError when nothing matches. switch compares loosely and falls through without break.' },
    { level: 'intermediate', q: 'What does the spaceship operator return and where is it used?', a: '$a <=> $b returns -1, 0 or 1. It is ideal for usort() callbacks, and comparing arrays [$a->x, $a->y] <=> [$b->x, $b->y] sorts by several fields at once.' },
    { level: 'intermediate', q: 'Why prefer && over and?', a: 'and/or have lower precedence than assignment. $ok = true and false; assigns true to $ok and then evaluates the and. && binds tighter, so $ok = true && false; gives false as expected.' },
  ],
  functions: [
    { level: 'basic', q: 'What are named arguments?', a: 'PHP 8 lets you pass arguments by parameter name: createUser(name: "Rafi", active: false). You can skip optional parameters and the call documents itself. Parameter names become part of the public API.' },
    { level: 'intermediate', q: 'Closure with use vs arrow function fn?', a: 'An anonymous function only sees outer variables listed in use (...), by value unless you write &. An arrow function fn() => expr captures outer variables automatically by value, but can contain only a single expression.', code: String.raw`<?php
$rate = 2;
$a = function ($x) use ($rate) { return $x * $rate; };
$b = fn($x) => $x * $rate;
echo $a(5), " ", $b(5), "\n";`, lang: 'php', tryIt: true },
    { level: 'intermediate', q: 'What is a first-class callable?', a: 'PHP 8.1 syntax strlen(...) or $obj->method(...) or Foo::bar(...) creates a Closure from any callable. It is checked by the engine and friendlier to static analysis than string or array callables like "strlen" or [$obj, "method"].' },
    { level: 'advanced', q: 'What is the never return type?', a: 'never (8.1) declares that a function never returns normally: it always throws or calls exit. Static analysers then know code after the call is unreachable, for example in redirect() or abort() helpers.' },
    { level: 'advanced', q: 'Pass by value vs by reference for arrays: which is faster?', a: 'Passing by value is usually just as fast because arrays are copy-on-write: no copy happens unless the function modifies the array. References can actually disable optimisations. Use & only when you intend to modify the caller\'s variable.' },
  ],
  arrays: [
    { level: 'basic', q: 'What is the difference between array_merge() and the + operator?', a: 'For string keys, array_merge() keeps the value from the later array, while + keeps the value from the left array. For integer keys, array_merge() renumbers and appends everything; + only adds keys that are missing from the left array.', code: String.raw`<?php
print_r(array_merge(['a' => 1], ['a' => 2]));
print_r(['a' => 1] + ['a' => 2]);
print_r(array_merge([1, 2], [3]));
print_r([1, 2] + [5, 6, 7]);`, lang: 'php', tryIt: true },
    { level: 'basic', q: 'What does array_filter() do to keys?', a: 'It preserves the original keys, so the result can have gaps like [0, 2, 5]. Wrap it with array_values() to reindex, especially before json_encode(), which would otherwise produce an object instead of a list.' },
    { level: 'intermediate', q: 'sort vs asort vs ksort vs usort?', a: 'sort() sorts values and reindexes; asort() sorts values but keeps key associations; ksort() sorts by keys; usort() sorts values with a user callback (and reindexes); uasort()/uksort() keep keys. All sort in place and return true.' },
    { level: 'intermediate', q: 'How do you check membership efficiently in a large list?', a: 'in_array() is O(n). Flip the list once with array_flip() (or build [$value => true]) and use isset($map[$value]), which is O(1). For strict checks with in_array(), pass true as the third argument.' },
    { level: 'advanced', q: 'How are PHP arrays implemented internally?', a: 'As ordered hash tables: each element has a key (int or string) and the table also keeps insertion order. Packed arrays (keys 0..n in order) use a compact layout. That is why one structure works as list, map, stack and queue.' },
  ],
  'forms-http': [
    { level: 'basic', q: 'GET vs POST?', a: 'GET sends parameters in the URL, is cached and bookmarkable, and must not change data. POST sends data in the request body and is used for creating or changing data and for sensitive fields. Neither is encrypted without HTTPS.' },
    { level: 'intermediate', q: 'What is the Post/Redirect/Get pattern?', a: 'After successfully handling a POST, redirect (302/303) to a GET page instead of rendering directly. Refreshing then reloads the GET page instead of resubmitting the form, which prevents duplicate orders or comments.' },
    { level: 'intermediate', q: 'How do you read a JSON request body?', a: '$_POST is only filled for application/x-www-form-urlencoded and multipart/form-data. For JSON, read file_get_contents("php://input") and json_decode() it with JSON_THROW_ON_ERROR, returning 400 for invalid JSON.' },
    { level: 'advanced', q: 'How do you handle file uploads securely?', a: 'Check $_FILES[...]["error"] and size, detect the real MIME type with finfo (never trust the browser type or extension), generate a random file name, move it with move_uploaded_file() to storage outside the web root or a folder that cannot execute PHP, and set upload limits in php.ini.' },
  ],
  'sessions-cookies': [
    { level: 'basic', q: 'How does a PHP session work?', a: 'session_start() reads the session id from the PHPSESSID cookie (or creates one), loads the data stored on the server for that id into $_SESSION, and saves it back at the end of the request.' },
    { level: 'intermediate', q: 'What is session fixation and how do you prevent it?', a: 'An attacker makes the victim use a session id the attacker knows, then waits for the victim to log in. Prevent it by calling session_regenerate_id(true) after login and privilege changes, and enabling session.use_strict_mode.' },
    { level: 'intermediate', q: 'Which cookie flags should session cookies have?', a: 'HttpOnly (JavaScript cannot read it), Secure (HTTPS only), SameSite=Lax or Strict (not sent on cross-site requests, mitigates CSRF), and an appropriate path and lifetime.' },
    { level: 'advanced', q: 'How do sessions work with several web servers?', a: 'Default file sessions exist only on the server that created them. Use a shared session store (Redis, Memcached or the database) through session.save_handler or the framework, or use stateless tokens. Sticky sessions on the load balancer are a fragile workaround.' },
  ],
  files: [
    { level: 'basic', q: 'include vs require vs require_once?', a: 'require stops with a fatal error if the file is missing; include emits a warning and continues. The _once variants load a file at most once per request. Classes are normally loaded by Composer\'s autoloader instead.' },
    { level: 'intermediate', q: 'How do you process a 2 GB log file?', a: 'Stream it: fopen() and fgets() in a loop, SplFileObject, or a generator that yields lines. Never file_get_contents() or file() it, because they load everything into memory.' },
    { level: 'intermediate', q: 'json_decode returns null. How do you find out why?', a: 'Use JSON_THROW_ON_ERROR so a JsonException with the reason is thrown, or call json_last_error_msg(). Also note that the JSON literal null legitimately decodes to null. PHP 8.3 adds json_validate() for a cheap check.' },
    { level: 'advanced', q: 'How do you avoid race conditions when two requests write the same file?', a: 'Use file_put_contents() with LOCK_EX or flock() around read-modify-write, write to a temporary file and rename() it atomically, or better move shared state to a database with transactions.' },
  ],
  'dates-regex': [
    { level: 'basic', q: 'DateTime vs DateTimeImmutable?', a: 'DateTime methods like modify() change the object itself, so a date passed to a function can be changed by surprise. DateTimeImmutable returns a new object for every change. Prefer DateTimeImmutable.' },
    { level: 'intermediate', q: 'How should you store and display dates for users in different time zones?', a: 'Store in UTC (DATETIME/TIMESTAMP in UTC, or ISO 8601 with offset), keep each user\'s time zone in their profile, and convert with setTimezone() only when displaying.' },
    { level: 'intermediate', q: 'Why is strtotime("2026-01-31 +1 month") surprising?', a: 'It gives 2026-03-03, because 31 February overflows into March. Use "last day of next month" or DateTimeImmutable::modify("first day of next month") when working with month ends.', code: String.raw`<?php
echo date('Y-m-d', strtotime('2026-01-31 +1 month')), "\n";
echo (new DateTimeImmutable('2026-01-31'))->modify('last day of next month')->format('Y-m-d'), "\n";`, lang: 'php', tryIt: true },
    { level: 'advanced', q: 'What does the u modifier do in preg_* patterns?', a: 'It makes PCRE treat the pattern and subject as UTF-8, so . and character classes match whole characters and \\p{...} Unicode properties work. Without it multibyte characters are treated as separate bytes.' },
  ],
  'oop-basics': [
    { level: 'basic', q: 'What is the difference between a class and an object?', a: 'A class is a blueprint that defines properties and methods. An object is an instance created from it with new, holding its own property values.' },
    { level: 'basic', q: 'Explain public, protected and private.', a: 'public members are accessible everywhere, protected ones inside the class and its subclasses, private ones only inside the declaring class. Keep properties private and expose behaviour through methods (encapsulation).' },
    { level: 'intermediate', q: 'What is constructor property promotion?', a: 'PHP 8 lets you declare and assign properties directly in the constructor signature: public function __construct(private string $name) {}. It removes the boilerplate of declaring the property and assigning $this->name = $name.' },
    { level: 'intermediate', q: 'Are objects passed by reference in PHP?', a: 'Objects are passed by handle: the variable holds an identifier pointing to the object, so a function can modify the object and the caller sees it. But reassigning the parameter to a new object does not affect the caller. Use clone for a copy.', code: String.raw`<?php
function changeName(stdClass $o) { $o->name = 'changed'; $o = new stdClass(); }
$x = new stdClass(); $x->name = 'original';
changeName($x);
echo $x->name, "\n";`, lang: 'php', tryIt: true },
    { level: 'advanced', q: 'Shallow vs deep clone?', a: 'clone copies the object\'s properties, but properties holding objects still point to the same inner objects (shallow). Implement __clone() to clone those inner objects for a deep copy, or use immutable value objects so sharing is safe.' },
  ],
  'oop-advanced': [
    { level: 'basic', q: 'Abstract class vs interface?', a: 'An interface only declares public methods (and constants); a class can implement many. An abstract class can contain properties, implemented methods and abstract methods, and a class can extend only one. Use interfaces for contracts, abstract classes for shared base behaviour.' },
    { level: 'intermediate', q: 'What is a trait and what are its downsides?', a: 'A trait is a set of methods and properties copied into a class with use, for reuse across unrelated classes. Downsides: hidden dependencies on the host class, method conflicts (resolved with insteadof/as), and harder-to-follow code if overused.' },
    { level: 'intermediate', q: 'What is late static binding?', a: 'static:: refers to the class that was called at runtime, while self:: refers to the class where the method is defined. It lets parent methods like Model::create() return an instance of the child class that called them.' },
    { level: 'advanced', q: 'Composition vs inheritance?', a: 'Inheritance creates tight coupling and fragile hierarchies; changes in a parent ripple to all children. Composition (an object holding other objects behind interfaces) is more flexible and testable. Favour composition and keep inheritance shallow; mark classes final by default.' },
  ],
  'modern-php': [
    { level: 'basic', q: 'What are enums and backed enums?', a: 'Enums (8.1) define a type with a fixed set of cases. Backed enums give every case a scalar value (string or int) for storage and JSON, with from() (throws) and tryFrom() (null) to convert back. Enums can have methods, constants and implement interfaces.' },
    { level: 'intermediate', q: 'What is a readonly property?', a: 'A typed property that can be initialised once, from inside the class scope, and never modified afterwards. readonly classes (8.2) make all properties readonly. They are ideal for immutable value objects and DTOs.' },
    { level: 'intermediate', q: 'What does the nullsafe operator do?', a: '$a?->b()?->c returns null as soon as any part is null instead of throwing an error. Combine it with ?? for a default: $user?->profile?->city ?? "unknown".' },
    { level: 'advanced', q: 'What are attributes and how are they read?', a: 'Attributes (#[Route("/x")]) are structured metadata attached to classes, methods, properties, parameters or constants. They do nothing by themselves; code reads them with Reflection (getAttributes() then newInstance()). Frameworks use them for routing, ORM mapping, validation and DI.' },
    { level: 'advanced', q: 'Name notable features of PHP 8.4.', a: 'Property hooks (get/set logic on properties), asymmetric visibility (public private(set)), array_find/array_any/array_all, new MyClass()->method() without parentheses, the #[\\Deprecated] attribute, lazy objects and an HTML5-compliant DOM parser.' },
  ],
  errors: [
    { level: 'basic', q: 'Exception vs Error in PHP?', a: 'Both implement Throwable. Exception is for conditions your code can anticipate and handle (invalid input, missing record). Error is thrown by the engine for programming bugs (TypeError, DivisionByZeroError, calling undefined methods). Catch Throwable only at the top level.' },
    { level: 'intermediate', q: 'What is finally used for?', a: 'A finally block runs whether the try succeeded, threw, or returned, so it is used for cleanup: closing files, releasing locks, rolling back or logging. If finally itself returns, that return value wins, which is a known trap.' },
    { level: 'intermediate', q: 'How do you make PHP warnings stop execution?', a: 'Register set_error_handler() that throws ErrorException for every reported error. Frameworks do this, so undefined keys and similar warnings become exceptions with stack traces instead of silent wrong results.' },
    { level: 'advanced', q: 'How should errors be handled in production?', a: 'display_errors=Off, log_errors=On, a global exception handler that logs with context (PSR-3/Monolog), sends alerts (Sentry), and shows a generic error page or JSON with a reference id. Never leak stack traces, SQL or paths to users.' },
  ],
  'namespaces-composer': [
    { level: 'basic', q: 'What is Composer?', a: 'The dependency manager for PHP. composer.json lists required packages and version constraints, composer.lock pins exact versions, packages are installed into vendor/ and vendor/autoload.php autoloads them and your own PSR-4 classes.' },
    { level: 'intermediate', q: 'composer install vs composer update?', a: 'install installs exactly the versions in composer.lock (use it on servers and CI). update resolves the newest versions allowed by composer.json and rewrites composer.lock (use it deliberately in development).' },
    { level: 'intermediate', q: 'Explain PSR-4 autoloading.', a: 'A namespace prefix is mapped to a base directory; the rest of the fully qualified class name maps to sub-directories and the file name. With "App\\\\": "src/", App\\Http\\Kernel is loaded from src/Http/Kernel.php.' },
    { level: 'advanced', q: 'What do PSR-7, PSR-11 and PSR-15 define?', a: 'PSR-7: immutable HTTP request and response message interfaces. PSR-11: a container interface (get/has) for dependency injection. PSR-15: server request handlers and middleware built on PSR-7. Together they make middleware and frameworks interoperable.' },
  ],
  database: [
    { level: 'basic', q: 'Why use PDO instead of mysqli?', a: 'PDO offers one API for many databases (MySQL, PostgreSQL, SQLite...), named placeholders, flexible fetch modes and exceptions. mysqli only supports MySQL. Both support prepared statements.' },
    { level: 'basic', q: 'How do prepared statements prevent SQL injection?', a: 'The SQL structure is sent and parsed first with placeholders; values are sent separately and treated strictly as data, so input can never change the query. With ATTR_EMULATE_PREPARES=false, MySQL does real server-side preparation.' },
    { level: 'intermediate', q: 'What is a transaction and when do you need one?', a: 'A group of queries that succeed or fail together (atomicity). Use them whenever several writes must stay consistent: placing an order with items, transferring money, updating stock. beginTransaction(), commit(), and rollBack() on any exception.' },
    { level: 'intermediate', q: 'What is the N+1 problem?', a: 'Loading a list with one query and then running one more query per row to load related data. 100 posts become 101 queries. Fix it with a JOIN, a single WHERE id IN (...) query, or eager loading in an ORM.' },
    { level: 'advanced', q: 'How do you handle two users buying the last item at the same time?', a: 'Inside a transaction, lock the row with SELECT ... FOR UPDATE (or update with a condition: UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0 and check rowCount()), so only one request succeeds. Add unique constraints and idempotency keys for payments.', code: String.raw`<?php
$db = new PDO('sqlite::memory:');
$db->exec('CREATE TABLE products (id INTEGER PRIMARY KEY, stock INTEGER)');
$db->exec('INSERT INTO products VALUES (1, 1)');
$buy = $db->prepare('UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0');
foreach (['Customer A', 'Customer B'] as $c) {
    $buy->execute();
    echo $c, ': ', $buy->rowCount() === 1 ? 'bought it' : 'sold out', "\n";
}`, lang: 'php', tryIt: true },
  ],
  security: [
    { level: 'basic', q: 'How do you store passwords?', a: 'With password_hash($password, PASSWORD_DEFAULT) (bcrypt or Argon2id: slow, salted) in a VARCHAR(255) column, and password_verify() on login. Use password_needs_rehash() to upgrade old hashes. Never md5, sha1 or encryption.' },
    { level: 'basic', q: 'What is XSS and how do you prevent it?', a: 'Cross-site scripting: user input printed into HTML runs as script in other users\' browsers. Prevent it by escaping on output with htmlspecialchars($v, ENT_QUOTES, "UTF-8") (or an auto-escaping template engine), sanitising rich HTML with a library, and adding a Content-Security-Policy.' },
    { level: 'intermediate', q: 'What is CSRF and how do you prevent it?', a: 'Cross-site request forgery: another site makes the user\'s browser send an authenticated request to your site. Prevent it with a per-session random token in every state-changing form verified with hash_equals(), SameSite cookies, and never changing data with GET.' },
    { level: 'intermediate', q: 'What is IDOR?', a: 'Insecure direct object reference: the app uses an id from the request (/invoices/42) without checking the current user may access it. Always check ownership or permissions on the server, or scope queries: WHERE id = ? AND user_id = ?.' },
    { level: 'advanced', q: 'Why is unserialize() on user input dangerous?', a: 'It can instantiate arbitrary classes and trigger magic methods (__wakeup, __destruct) that, chained together ("POP gadgets"), can lead to remote code execution. Use json_decode() for external data, or allowed_classes => false if unserialize is unavoidable.' },
  ],
  'rest-api': [
    { level: 'basic', q: 'Which status codes should a REST API use?', a: '200 OK, 201 Created (with Location), 204 No Content, 400 Bad Request (malformed), 401 Unauthorized (not authenticated), 403 Forbidden (not allowed), 404 Not Found, 409 Conflict, 422 validation failed, 429 rate limited, 500 server error.' },
    { level: 'intermediate', q: 'PUT vs PATCH?', a: 'PUT replaces the whole resource with the sent representation and is idempotent. PATCH applies a partial update to only the sent fields. Both target an existing resource URL like /products/42.' },
    { level: 'intermediate', q: 'JWT vs database tokens?', a: 'JWTs are self-contained signed tokens that need no database lookup but are hard to revoke before expiry and their payload is readable. Opaque database tokens (store only the hash) are easy to revoke and audit. For first-party apps, database tokens or cookie sessions are often simpler and safer.' },
    { level: 'advanced', q: 'How do you make a payment endpoint safe to retry?', a: 'Make it idempotent: the client sends an Idempotency-Key header; the server stores the key with the result in a unique-constrained table and returns the stored result for repeats instead of charging again. Wrap the work in a transaction.' },
  ],
  architecture: [
    { level: 'basic', q: 'Explain MVC.', a: 'Model: data and business rules. View: presentation (templates). Controller: handles the request, calls models/services and returns a response with a view. It separates concerns so each part can change independently.' },
    { level: 'intermediate', q: 'What is dependency injection?', a: 'Giving a class its dependencies from outside (usually through the constructor) instead of creating them inside with new or using globals. It makes dependencies explicit and lets you substitute fakes in tests. A DI container automates wiring.' },
    { level: 'intermediate', q: 'What is middleware?', a: 'Layers that wrap the request handler. Each receives the request and a $next callable, can act before and after the inner layers, or return early (e.g. 401). Used for auth, CSRF, CORS, logging, rate limiting and maintenance mode (PSR-15).' },
    { level: 'advanced', q: 'Explain the SOLID principles briefly.', a: 'Single responsibility (one reason to change), Open/closed (extend with new code, not edits), Liskov substitution (subtypes honour the parent contract), Interface segregation (small, focused interfaces), Dependency inversion (depend on abstractions, inject concretions).' },
    { level: 'advanced', q: 'Why is the Singleton pattern often considered an anti-pattern?', a: 'It is global state in disguise: hidden dependencies, hard to replace in tests, and shared mutable state. A DI container that shares one instance (a "shared service") gives the same benefit with explicit dependencies.' },
  ],
  advanced: [
    { level: 'intermediate', q: 'What is a generator and when do you use one?', a: 'A function with yield that returns a Generator, producing values lazily one at a time. Use it for large datasets (files, database cursors, exports) to keep memory constant, and for building lazy pipelines.' },
    { level: 'intermediate', q: 'What is copy-on-write?', a: 'Arrays and strings are shared between variables until one of them is modified; only then is a real copy made. Assigning or passing large arrays is therefore cheap.' },
    { level: 'advanced', q: 'What is the foreach-by-reference trap?', a: 'After foreach ($arr as &$v), $v remains a reference to the last element. A later foreach ($arr as $v) writes each value into that last element, corrupting the array. Always unset($v) after a by-reference loop.', code: String.raw`<?php
$arr = [1, 2, 3];
foreach ($arr as &$v) {}
foreach ($arr as $v) {}
print_r($arr);`, lang: 'php', tryIt: true },
    { level: 'advanced', q: 'What is WeakMap used for?', a: 'A map keyed by objects that does not keep those objects alive. When an object is garbage-collected its entry disappears, so you can attach cached data or metadata to objects without memory leaks, useful in long-running workers.' },
  ],
  testing: [
    { level: 'basic', q: 'Unit vs integration vs feature tests?', a: 'Unit tests check one class in isolation with dependencies replaced. Integration tests check several real parts together, like a repository with a test database. Feature tests send HTTP requests to the app and check responses. Have many unit tests and fewer slow ones.' },
    { level: 'intermediate', q: 'Stub vs mock vs fake?', a: 'A stub returns predefined answers. A mock also verifies interactions (called once with these arguments). A fake is a lightweight working implementation, like an in-memory repository.' },
    { level: 'intermediate', q: 'What is a data provider in PHPUnit?', a: 'A static method returning sets of arguments; the test runs once per set. It removes duplicate tests for different inputs. Name the sets with array keys so failures are readable.' },
    { level: 'advanced', q: 'What does PHPStan add on top of tests?', a: 'Static analysis finds type errors, null dereferences, undefined methods and dead code without running anything, including on paths tests do not cover. With generics in docblocks it understands collections. Higher levels are stricter.' },
  ],
  'performance-deploy': [
    { level: 'basic', q: 'What is OPcache?', a: 'An extension that stores compiled PHP bytecode in shared memory so scripts are not parsed and compiled on every request. It is essential in production; with validate_timestamps=0 you must reload PHP-FPM after deploying.' },
    { level: 'intermediate', q: 'How do you find why a page is slow?', a: 'Measure: use a profiler (Xdebug, Blackfire, Tideways) or APM, log slow queries, check EXPLAIN plans. Typical fixes: indexes, removing N+1 queries, caching expensive results, moving slow work to queues, and OPcache.' },
    { level: 'intermediate', q: 'When should work go to a queue?', a: 'When it is slow or unreliable and the user does not need the result immediately: emails, SMS, PDFs, image processing, webhooks, imports. A worker processes jobs with retries and backoff while the response returns instantly.' },
    { level: 'advanced', q: 'Describe a zero-downtime deployment.', a: 'Build a new release directory (composer install --no-dev -o, assets), run backwards-compatible migrations, warm caches, atomically switch the "current" symlink, reload PHP-FPM gracefully, restart queue workers, and keep previous releases for instant rollback.' },
  ],
  frameworks: [
    { level: 'basic', q: 'Why use a framework like Laravel?', a: 'It provides tested, integrated solutions for routing, ORM, validation, auth, sessions, CSRF, queues, mail, caching and testing, plus conventions that make teams productive and codebases familiar.' },
    { level: 'intermediate', q: 'Active Record vs Data Mapper?', a: 'Active Record (Eloquent): a model object both holds data and saves itself (User::create, $user->save()). Simple and fast to write. Data Mapper (Doctrine): entities are plain objects and a separate EntityManager persists them. More decoupled and better for complex domains.' },
    { level: 'intermediate', q: 'What is mass assignment protection?', a: 'Eloquent only fills attributes listed in $fillable (or not in $guarded) when you pass an array, so a user cannot add fields like is_admin=1 to a form and have them saved.' },
    { level: 'advanced', q: 'Describe the Laravel request lifecycle.', a: 'public/index.php loads the autoloader and creates the application, the HTTP kernel boots service providers, the request passes through global middleware, the router matches a route and its middleware, the controller returns a response, which passes back out through middleware and is sent; terminable middleware runs last.' },
  ],
  cli: [
    { level: 'basic', q: 'How do you read command-line arguments in PHP?', a: '$argv holds the script name followed by the arguments and $argc their count. getopt() parses -x and --long=value options. For real tools use symfony/console, which adds validation, help and colours.' },
    { level: 'intermediate', q: 'Why do exit codes matter in CLI scripts?', a: 'Cron, CI pipelines, Supervisor and shell scripts decide success or failure from the exit code: 0 means success, anything else failure. exit(1) on errors so failures are detected and alerted.' },
    { level: 'intermediate', q: 'How do you stop a cron job from running twice at the same time?', a: 'Take a lock at the start: flock() on a lock file with LOCK_EX | LOCK_NB, a Redis lock with an expiry, or the framework helper (Laravel withoutOverlapping()). Exit quietly if the lock is held.' },
    { level: 'advanced', q: 'How should a long-running worker shut down during a deploy?', a: 'Listen for SIGTERM with pcntl_signal (and pcntl_async_signals(true)), finish the current job, release resources and exit. The process manager (Supervisor/systemd) waits stopwaitsecs, then starts a new worker with the new code.' },
  ],
  integrations: [
    { level: 'basic', q: 'How do you send email reliably from PHP?', a: 'Use Symfony Mailer or PHPMailer with SMTP or an email API (SES, Mailgun, Postmark), send from a queue job, configure SPF, DKIM and DMARC, and catch emails with Mailpit in development.' },
    { level: 'intermediate', q: 'Describe a safe payment gateway integration.', a: 'Create a pending order, redirect to the gateway, and only mark the order paid after a server-to-server confirmation (signed webhook/IPN or validation API). Check amount and currency, make the handler idempotent with a unique transaction id, log everything, and keep secrets in environment variables.' },
    { level: 'intermediate', q: 'How do you parse HTML from another site?', a: 'Load it into DOMDocument (libxml_use_internal_errors(true) for broken markup, keep UTF-8), query with DOMXPath, and read textContent/attributes. Respect robots.txt and terms, set timeouts and a user agent, and cache results.', code: String.raw`<?php
$doc = new DOMDocument();
$doc->loadHTML('<ul><li class="x">PHP</li><li class="x">SQL</li></ul>');
foreach ((new DOMXPath($doc))->query('//li[@class="x"]') as $li) echo $li->textContent, "\n";`, lang: 'php', tryIt: true },
    { level: 'advanced', q: 'How would you generate 50,000 PDF certificates?', a: 'Not in a web request: dispatch one queue job per certificate (or batches), render each from an HTML template with dompdf or a headless Chrome service, store the files in object storage (S3/R2), track progress, and email links when done. Scale by adding workers.' },
  ],
  'clean-architecture': [
    { level: 'intermediate', q: 'What is a value object? Give examples.', a: 'An immutable object defined by its value rather than identity, validating itself on creation: Email, Money, PhoneNumber, DateRange. Two with the same value are equal, and invalid values can never exist in the system.' },
    { level: 'intermediate', q: 'Entity vs value object?', a: 'An entity has an identity that persists while its attributes change (Order #42 stays the same order). A value object has no identity; changing it means replacing it with a new value.' },
    { level: 'advanced', q: 'What is hexagonal (ports and adapters) architecture?', a: 'The application core defines ports (interfaces) for what it needs, such as repositories or payment gateways; infrastructure provides adapters (PDO, Stripe, SMTP). The core has no framework or database dependencies and can be tested in isolation.' },
    { level: 'advanced', q: 'What is the outbox pattern?', a: 'To publish events reliably, write them to an outbox table in the same database transaction as the business change; a separate worker reads the outbox and publishes to the queue or other services, marking rows as sent. No event is lost and none is sent for rolled-back changes.' },
  ],
  concurrency: [
    { level: 'intermediate', q: 'Is PHP multithreaded?', a: 'Normal PHP runs one request per process/worker without threads; concurrency comes from many PHP-FPM workers. Within a request you can parallelise I/O with curl_multi or Guzzle promises. Async libraries (ReactPHP, Amp) and Swoole provide event loops or coroutines; the parallel extension adds threads but is rarely used.' },
    { level: 'intermediate', q: 'What are Fibers?', a: 'PHP 8.1 Fibers are interruptible functions with their own call stack: Fiber::suspend() pauses and $fiber->resume() continues. Async frameworks build on them so asynchronous code can be written in a synchronous style.', code: String.raw`<?php
$f = new Fiber(function () { echo "a\n"; Fiber::suspend(); echo "c\n"; });
$f->start(); echo "b\n"; $f->resume();
// Output: a, b, c (each on its own line)`, lang: 'php' },
    { level: 'advanced', q: 'What changes when you move an app to Laravel Octane or FrankenPHP worker mode?', a: 'The application stays in memory between requests, so static properties, singletons and global state persist. You must reset per-request state, avoid memory leaks, restart workers periodically (max-requests), and make sure database connections are reconnected when they drop.' },
  ],
  algorithms: [
    { level: 'basic', q: 'What is Big-O notation?', a: 'A way to describe how running time or memory grows with input size, ignoring constants: O(1) constant, O(log n), O(n), O(n log n), O(n²). It helps choose algorithms that still work when data grows.' },
    { level: 'intermediate', q: 'How do you find duplicates in a large array efficiently?', a: 'Walk the array once and keep seen values as keys of a hash map: isset($seen[$v]) is O(1), so the whole job is O(n) instead of O(n²) with nested loops. array_count_values() does the counting for you.' },
    { level: 'intermediate', q: 'BFS vs DFS?', a: 'Breadth-first search uses a queue and explores level by level, finding shortest paths in unweighted graphs. Depth-first search uses recursion or a stack, going deep first; it is used for topological sorting, cycle detection and exploring all paths.' },
    { level: 'advanced', q: 'Implement an LRU cache in PHP.', a: 'PHP arrays preserve insertion order, so on get() remove the key and re-insert it at the end (most recent); on put() insert at the end and, when over capacity, remove array_key_first() (least recent). Both operations are O(1) on average.', code: String.raw`<?php
$cache = []; $cap = 2;
$put = function ($k, $v) use (&$cache, $cap) { unset($cache[$k]); $cache[$k] = $v; if (count($cache) > $cap) unset($cache[array_key_first($cache)]); };
$put('a', 1); $put('b', 2); $put('c', 3);
print_r(array_keys($cache));`, lang: 'php', tryIt: true },
  ],
  wordpress: [
    { level: 'basic', q: 'What is the difference between an action and a filter?', a: 'Both are hooks. An action (do_action/add_action) lets you run code at a certain point. A filter (apply_filters/add_filter) passes a value through your callback, which must return the (possibly changed) value.' },
    { level: 'intermediate', q: 'How do you secure a WordPress form handler?', a: 'Check capabilities with current_user_can(), verify a nonce (check_admin_referer/check_ajax_referer), sanitize every input (sanitize_text_field, absint...), use $wpdb->prepare() for SQL, and escape output with esc_html/esc_attr/esc_url.' },
    { level: 'intermediate', q: 'Child theme vs plugin: where does custom code go?', a: 'Presentation changes for one theme go into a child theme. Functionality that should survive a theme change (custom post types, shortcodes, integrations) belongs in a plugin.' },
    { level: 'advanced', q: 'How do you make a slow WordPress site fast?', a: 'Measure with Query Monitor, add page caching and a persistent object cache (Redis), optimise WP_Query arguments (no_found_rows, fields => ids), avoid queries in loops, offload media to a CDN, remove heavy plugins, use PHP 8.x with OPcache, and move huge datasets to custom tables.' },
  ],
  projects: [
    { level: 'intermediate', q: 'Walk me through a project you built.', a: 'Explain the problem, the structure (front controller, repositories, services), key decisions (why SQLite/MySQL, how you validated input, how you secured login), a difficult bug you fixed, what you tested, and what you would improve next.' },
    { level: 'intermediate', q: 'How did you make your login system secure?', a: 'Validated input, password_hash/password_verify with rehashing, same error message for unknown email and wrong password, throttled attempts, session_regenerate_id after login, HttpOnly/Secure/SameSite cookies, CSRF tokens on forms and HTTPS.' },
    { level: 'advanced', q: 'How would you scale the URL shortener to millions of clicks?', a: 'Cache code->URL lookups in Redis, increment click counts asynchronously (queue or Redis counters flushed in batches), use a unique index on code, put the app behind a load balancer with several stateless servers, and serve redirects with minimal bootstrapping.' },
  ],
  interview: [
    { level: 'basic', q: 'Tell me what is new in PHP 8 that you use daily.', a: 'Named arguments, match, the nullsafe operator, constructor promotion, union types, str_contains, enums, readonly properties, first-class callables and attributes. Mention which ones you used in your projects and why.' },
    { level: 'intermediate', q: 'What would you check first when a production page shows a 500 error?', a: 'The PHP and web server error logs (or Sentry) for the exception and stack trace, recent deployments, then reproduce locally with the same input. Fix the cause, add a test, and make sure display_errors stays off.' },
    { level: 'advanced', q: 'How do you keep a large PHP codebase maintainable?', a: 'Strict types, small classes with clear responsibilities, dependency injection, automated tests, static analysis and coding standards in CI, code review, consistent architecture, regular dependency and PHP upgrades (Rector), and documentation of key decisions.' },
  ],
};
