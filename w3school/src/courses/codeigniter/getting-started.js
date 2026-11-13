// CodeIgniter chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What CodeIgniter is, setup and your first route',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ci-what-is',
      title: 'What is CodeIgniter?',
      blocks: [
        { type: 'text', value: 'CodeIgniter is a lightweight PHP framework with MVC, routing, a query builder, validation and security helpers. It is smaller and less opinionated than Laravel, which makes it fast to learn and to deploy.' },
        { type: 'list', items: [
          'MVC structure without heavy magic',
          'Small footprint and fast boot',
          'Query builder and migrations',
          'Form validation and CSRF helpers',
          'Works on shared hosting',
        ] },
        { type: 'note', value: 'CodeIgniter 4 is the current version. Do not start a new project on CodeIgniter 3.' },
      ],
    },
    {
      id: 'ci-setup',
      title: 'Setup',
      blocks: [
        { type: 'text', value: 'Install with Composer, configure the database and start the development server. The app has app/, public/, writable/ and vendor/ folders.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `composer create-project codeigniter4/appstarter codenest
cd codenest
cp env .env

# .env
database.default.hostname = localhost
database.default.database = codenest
database.default.username = root
database.default.password = secret

php spark serve` },
        { type: 'note', value: 'The public folder is the web root. Never point the web server at the project root; config and .env would be exposed.' },
      ],
    },
    {
      id: 'ci-first-route',
      title: 'Your first route',
      blocks: [
        { type: 'text', value: 'Routes map a URL to a controller method. A controller returns a view or a response. Use the spark CLI to generate files.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// app/Config/Routes.php
$routes->get('/', 'Home::index');
$routes->get('api/health', 'Api::health');

// app/Controllers/Api.php
class Api extends BaseController
{
    public function health()
    {
        return $this->response->setJSON(['status' => 'ok']);
    }
}` },
        { type: 'note', value: 'Use the response object for status codes and headers. Returning an array is not enough for a proper API response.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is CodeIgniter?',
      options: ['A JavaScript library', 'A lightweight PHP MVC framework', 'A database', 'A CSS framework'],
      answer: 1,
      explain: 'It is a small PHP framework.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which version should a new project use?',
      options: ['CodeIgniter 2', 'CodeIgniter 3', 'CodeIgniter 4', 'Any'],
      answer: 2,
      explain: 'CodeIgniter 4 is current.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which folder is the web root?',
      options: ['app', 'public', 'writable', 'vendor'],
      answer: 1,
      explain: 'Point the server at public/.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does a route map?',
      options: ['A table to a model', 'A URL to a controller method', 'CSS to HTML', 'A user to a role'],
      answer: 1,
      explain: 'Routes connect URLs to controllers.',
    },
  ],
};
