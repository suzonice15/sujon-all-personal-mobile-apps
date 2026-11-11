// Laravel chapter: Validation. Lessons plus this chapter's quiz questions.

export default {
  id: 'validation',
  title: 'Validation',
  description: 'Validate input with rules, Form Requests and custom rules',
  icon: 'check-circle',
  lessons: [
    {
      id: 'laravel-validation-basics',
      title: 'Validating Request Data',
      blocks: [
        { type: 'text', value: 'Never trust input. Laravel validation takes the incoming data, checks it against rules and either returns the validated values or stops the request with errors. Browser requests are redirected back with errors in the session; JSON requests receive a 422 response.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Http\Request;

public function store(Request $request)
{
    $data = $request->validate([
        'title' => ['required', 'string', 'max:120'],
        'body' => ['required', 'string'],
        'email' => ['required', 'email', 'unique:users,email'],
        'age' => ['nullable', 'integer', 'between:18,120'],
    ]);

    $post = Post::create($data);

    return redirect()->route('posts.show', $post);
}` },
        { type: 'list', items: [
          'validate() returns only the fields that have rules, so unexpected keys are not mass assigned.',
          'A failed browser request flashes errors and old input, then redirects back automatically.',
          'A failed request with Accept: application/json returns 422 with an errors object.',
          'Rules can be strings with pipes or arrays. Arrays are preferred for readability and for rule objects.',
          'Use nullable when a field may be absent or null, and sometimes when it may be omitted entirely.',
          'The first failing rule for a field stops checking that field by default; use bail only when you need to skip later rules.',
        ] },
        { type: 'note', value: 'Validation is not sanitisation. It proves a value has an expected shape, but you still escape on output and use bindings in queries. A valid string can still contain dangerous HTML.' },
      ],
    },
    {
      id: 'laravel-form-requests',
      title: 'Form Requests',
      blocks: [
        { type: 'text', value: 'A Form Request is a dedicated class for one request. It keeps validation and authorization out of the controller and can transform input before validation. Generate one with Artisan and type-hint it in the controller method.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan make:request StorePostRequest` },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Post::class);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'body' => ['required', 'string'],
            'published_at' => ['nullable', 'date', 'after:now'],
            'tags' => ['array', 'max:5'],
            'tags.*' => ['string', 'distinct', 'max:30'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Every post needs a title.',
        ];
    }

    public function attributes(): array
    {
        return ['published_at' => 'publish date'];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => trim((string) $this->title),
        ]);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;

class PostController extends Controller
{
    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());

        return redirect()->route('posts.show', $post);
    }
}` },
        { type: 'list', items: [
          'authorize() must return true, or Laravel returns 403 before validation runs.',
          'validated() returns only fields covered by rules; safe() is a similar helper for plain requests.',
          'messages() customises text and attributes() makes field names read naturally in errors.',
          'prepareForValidation() normalises input before rules are applied, for example trimming or slugging.',
          'passedValidation() and after() hooks handle checks that need the validated data or several fields together.',
          'Keep Form Requests for input concerns only. Business rules belong in services, actions or models.',
        ] },
        { type: 'note', value: 'A common mistake is forgetting authorize(). The generated class may return false by default, which makes every request 403 until you write a real check or return true for public forms.' },
      ],
    },
    {
      id: 'laravel-validation-rules',
      title: 'The Most Useful Rules',
      blocks: [
        { type: 'text', value: 'Laravel ships a large rule catalogue. The ones below cover most real forms, and combining them with field-specific messages and conditional rules handles the rest.' },
        { type: 'list', items: [
          'Presence: required, nullable, sometimes, filled, present, prohibited, exclude_if.',
          'Types: string, integer, numeric, boolean, array, list, json, file, image.',
          'Format: email, url, uuid, ip, date, date_format, regex, alpha_dash, starts_with, ends_with, enum.',
          'Size: min, max, size, between; for files max is in kilobytes.',
          'Comparison: same, different, confirmed, gt, gte, lt, lte, after, before.',
          'Choice: in, not_in, Rule::in([...]), Rule::enum(Status::class).',
          'Database: unique:table,column,except_id,id_column and exists:table,column.',
          'Conditional: required_if, required_unless, required_with, required_without, required_array_keys.',
          'Password: password with Password::min(10)->mixedCase()->numbers()->symbols() and confirmed.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

$data = $request->validate([
    'name' => ['required', 'string', 'min:2', 'max:80'],
    'slug' => [
        'required',
        'alpha_dash',
        Rule::unique('posts', 'slug')->ignore($post->id),
    ],
    'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
    'price' => ['required', 'numeric', 'min:0', 'max:99999'],
    'discount' => ['nullable', 'numeric', 'lt:price'],
    'password' => ['required', 'confirmed', Password::min(10)->mixedCase()->numbers()],
    'start_date' => ['required', 'date'],
    'end_date' => ['required', 'date', 'after_or_equal:start_date'],
    'contact' => ['required_if:role,vendor', 'nullable', 'email'],
]);` },
        { type: 'note', value: 'The unique rule with ignore() is essential on update forms. Without it, saving an unchanged record fails because the row already exists with that value.' },
      ],
    },
    {
      id: 'laravel-custom-rules',
      title: 'Custom Validation Rules',
      blocks: [
        { type: 'text', value: 'When the built-in rules cannot express a business rule, write your own. A closure is enough for a local check; a reusable Rule object is better when the logic is used in several places or needs dependencies.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan make:rule Uppercase` },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Uppercase implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strtoupper((string) $value) !== (string) $value) {
            $fail('The :attribute must be uppercase.');
        }
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
use App\Rules\Uppercase;
use Illuminate\Support\Facades\Validator;

// Rule object
$request->validate([
    'code' => ['required', 'string', new Uppercase],
]);

// Closure rule for a one-off check
$request->validate([
    'username' => [
        'required',
        'string',
        function (string $attribute, mixed $value, Closure $fail) {
            if (in_array(strtolower((string) $value), ['admin', 'root', 'support'], true)) {
                $fail('That username is reserved.');
            }
        },
    ],
]);

// A rule that depends on another field
$request->validate([
    'discount' => [
        'nullable',
        'numeric',
        function (string $attribute, mixed $value, Closure $fail) use ($request) {
            if ($value >= $request->input('price')) {
                $fail('The discount must be lower than the price.');
            }
        },
    ],
]);` },
        { type: 'list', items: [
          'Implement ValidationRule and put the check in validate(); call $fail with a message to reject the value.',
          'Rule objects can take constructor arguments, for example a minimum age or a list of allowed domains.',
          'Closure rules receive the attribute, the value and a fail callback, which is perfect for small local checks.',
          'Rules that must run even when the value is missing implement ImplicitRule.',
          'For complex rules, add a dedicated message and cover both passing and failing cases in tests.',
        ] },
        { type: 'note', value: 'Keep rule classes small and free of side effects. A rule that writes to the database or calls a remote API on every keystroke will make forms slow and tests flaky.' },
      ],
    },
    {
      id: 'laravel-validation-errors',
      title: 'Displaying Errors and Old Input',
      blocks: [
        { type: 'text', value: 'Laravel shares a $errors variable with every Blade view after validation fails. It also flashes old input, so forms can be redisplayed with the values the user typed. This is the difference between a form that feels broken and one that feels helpful.' },
        { type: 'code', lang: 'html', value: String.raw`@if ($errors->any())
  <div class="alert alert-error">
    <ul>
      @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
      @endforeach
    </ul>
  </div>
@endif

<form method="POST" action="{{ route('posts.store') }}">
  @csrf

  <label for="title">Title</label>
  <input
    id="title"
    name="title"
    value="{{ old('title') }}"
    class="@error('title') border-red-500 @enderror"
  >
  @error('title')
    <p class="text-red-600">{{ $message }}</p>
  @enderror

  <button type="submit">Save</button>
</form>` },
        { type: 'list', items: [
          'old("field", "default") returns the flashed input or a fallback value.',
          '@error("field") and @enderror print a message for one field; $message is already escaped.',
          '$errors->has("field") checks presence, $errors->first("field") returns the first message.',
          'withErrors($messages) and redirect()->withInput() flash messages and input manually.',
          'Named error bags separate login errors from registration errors on the same page.',
          'For APIs, do not render HTML: return a 422 JSON body with an errors object and the first message.',
        ] },
        { type: 'note', value: 'Never show raw exception messages to users in production. Validation messages are safe because you define them; stack traces and SQL errors are not.' },
      ],
    },
    {
      id: 'laravel-file-validation',
      title: 'Validating Files and Images',
      blocks: [
        { type: 'text', value: 'Uploads are a security-sensitive input. Check the size, the real MIME type, the extension and, for images, the dimensions. Then store the file with a generated name on a disk that is not executable.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

public function update(Request $request)
{
    $data = $request->validate([
        'avatar' => [
            'required',
            'file',
            'image',
            'mimes:jpg,jpeg,png,webp',
            'max:2048',
            'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000',
        ],
        'documents' => ['nullable', 'array', 'max:3'],
        'documents.*' => ['file', 'mimetypes:application/pdf', 'max:5120'],
    ]);

    $path = $request->file('avatar')->store('avatars', 'public');

    $request->user()->update([
        'avatar_path' => $path,
    ]);

    return back()->with('status', 'Profile updated.');
}` },
        { type: 'list', items: [
          'max is measured in kilobytes for files: 2048 means about 2 MB.',
          'image checks that the file is a real image; mimes checks the extension and guessed type.',
          'dimensions rejects tiny or huge images that could break layouts or consume memory.',
          'store("folder", "disk") generates a random file name and returns the path relative to the disk.',
          'storeAs() lets you choose the name, but generated names avoid collisions and path tricks.',
          'For multiple uploads, validate the array and then use files() and a loop to store each file.',
          'Serve public uploads through php artisan storage:link or a signed controller route, never by exposing the entire storage folder.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`# Create the public storage symlink
php artisan storage:link

# Result
public/storage -> storage/app/public` },
        { type: 'note', value: 'A validated MIME type does not make an image safe to process at any size. If you resize or convert uploads, use a maintained image library, limit pixel dimensions, and run processing in a queue instead of a web request.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'validation', q: 'What does $request->validate() return on success?', options: ['The whole request', 'Only the validated fields', 'A boolean', 'A response object'], answer: 1, explain: 'It returns an array containing the fields that have validation rules.' },
    { chapterId: 'validation', q: 'What happens when a JSON request fails validation?', options: ['A 500 error', 'A redirect back', 'A 422 response with errors', 'An empty 200 response'], answer: 2, explain: 'Requests expecting JSON receive 422 Unprocessable Entity with an errors object.' },
    { chapterId: 'validation', q: 'What must authorize() return in a Form Request?', options: ['A string message', 'A boolean', 'A view', 'An array of rules'], answer: 1, explain: 'Returning false aborts with 403 before the rules run.' },
    { chapterId: 'validation', q: 'Which rule checks that a value is not already in a table?', options: ['exists', 'in', 'unique', 'distinct'], answer: 2, explain: 'unique:table,column rejects duplicates; exists does the opposite.' },
    { chapterId: 'validation', q: 'On an update form, why add ignore() to the unique rule?', options: ['To skip validation', 'To ignore the current record id', 'To ignore other users', 'To cache the query'], answer: 1, explain: 'Without it the record conflicts with itself when the value is unchanged.' },
    { chapterId: 'validation', q: 'Which class should a custom rule implement?', options: ['ValidationRule', 'RuleContract', 'FormRequest', 'Validator'], answer: 0, explain: 'Implement Illuminate\Contracts\Validation\ValidationRule and define validate().' },
    { chapterId: 'validation', q: 'What does the file max rule measure?', options: ['Bytes', 'Kilobytes', 'Megabytes', 'Pixels'], answer: 1, explain: 'For files, max is in kilobytes; 2048 is about 2 MB.' },
  ],
};
