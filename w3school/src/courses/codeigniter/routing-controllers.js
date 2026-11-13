// CodeIgniter chapter: Routing & Controllers.

export default {
  id: 'routing-controllers',
  title: 'Routing & Controllers',
  description: 'Routes, groups, filters and request data',
  icon: 'alt-route',
  lessons: [
    {
      id: 'ci-routes',
      title: 'Routes',
      blocks: [
        { type: 'text', value: 'Routes can be simple, parameterised or grouped. Route groups apply a prefix and filters, such as auth, to every route inside. Name routes so views can build URLs.' },
        { type: 'code', lang: 'php', tryIt: false, value: `$routes->group('api', ['namespace' => 'App\\Controllers\\Api'], function ($routes) {
    $routes->get('courses', 'Courses::index');
    $routes->get('courses/(:num)', 'Courses::show/$1');
    $routes->post('courses', 'Courses::create', ['filter' => 'auth']);
});` },
        { type: 'note', value: 'Use (:num) or (:segment) placeholders instead of parsing the URL by hand.' },
      ],
    },
    {
      id: 'ci-controllers',
      title: 'Controllers',
      blocks: [
        { type: 'text', value: 'A controller handles a request, calls a model or service, then returns a view or JSON. Keep controllers thin and put business rules in models or libraries.' },
        { type: 'code', lang: 'php', tryIt: false, value: `class Courses extends BaseController
{
    public function show($id)
    {
        $course = model(CourseModel::class)->find($id);
        if (!$course) {
            return $this->response->setStatusCode(404)
                ->setJSON(['error' => 'Not found']);
        }
        return $this->response->setJSON($course);
    }
}` },
        { type: 'note', value: 'A controller that is hundreds of lines long is a sign the logic should move to a model or service.' },
      ],
    },
    {
      id: 'ci-request-filters',
      title: 'Request data and filters',
      blocks: [
        { type: 'text', value: 'Read input with $this->request->getGet(), getPost() or getJSON(). Filters run before or after a controller, which is ideal for authentication and rate limiting.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// app/Filters/AuthFilter.php
public function before(RequestInterface $request, $arguments = null)
{
    if (!session()->get('userId')) {
        return redirect()->to('/login');
    }
}

// app/Config/Filters.php
public $aliases = [
    'auth' => \\App\\Filters\\AuthFilter::class,
];` },
        { type: 'list', items: [
          'Filters for auth, CORS and rate limits',
          'Validate input before using it',
          'Return the right status code',
          'Keep request parsing in the controller',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'routing-controllers',
      q: 'What does a route group apply?',
      options: ['A database', 'A prefix and filters to its routes', 'A view', 'A model'],
      answer: 1,
      explain: 'Groups share a prefix and filters.',
    },
    {
      chapterId: 'routing-controllers',
      q: 'What does (:num) match?',
      options: ['Any text', 'A numeric segment', 'A file', 'A header'],
      answer: 1,
      explain: 'It matches a number in the URL.',
    },
    {
      chapterId: 'routing-controllers',
      q: 'Where should business logic live?',
      options: ['In the route file', 'In a model or service', 'In the view', 'In CSS'],
      answer: 1,
      explain: 'Keep controllers thin.',
    },
    {
      chapterId: 'routing-controllers',
      q: 'What are filters for?',
      options: ['Styling', 'Running logic before or after a controller', 'Creating tables', 'Compiling PHP'],
      answer: 1,
      explain: 'They handle auth and similar concerns.',
    },
  ],
};
