// CodeIgniter chapter: Testing & Deployment.

export default {
  id: 'testing-deployment',
  title: 'Testing & Deployment',
  description: 'PHPUnit, config and production checks',
  icon: 'build',
  lessons: [
    {
      id: 'ci-testing',
      title: 'Testing',
      blocks: [
        { type: 'text', value: 'CodeIgniter ships with PHPUnit and test helpers. Use FeatureTestTrait for HTTP tests and a test database that resets between runs.' },
        { type: 'code', lang: 'php', tryIt: false, value: `class CoursesTest extends CIUnitTestCase
{
    use FeatureTestTrait;

    public function testHealth()
    {
        $result = $this->get('api/health');
        $result->assertStatus(200);
        $result->assertJSONFragment(['status' => 'ok']);
    }
}` },
        { type: 'note', value: 'Assert the status code and the body. A 200 with the wrong data is still a broken endpoint.' },
      ],
    },
    {
      id: 'ci-config',
      title: 'Configuration',
      blocks: [
        { type: 'text', value: 'Configuration lives in app/Config and .env. Keep secrets in .env, set the base URL, database and encryption key. Use separate .env files per environment.' },
        { type: 'code', lang: 'text', tryIt: false, value: `CI_ENVIRONMENT = production
app.baseURL = 'https://codenest.app/'
database.default.hostname = db
database.default.database = codenest
database.default.username = app
database.default.password = secret` },
        { type: 'note', value: 'Never commit .env. Keep a .env.example with the keys and no secrets.' },
      ],
    },
    {
      id: 'ci-deploy',
      title: 'Deployment',
      blocks: [
        { type: 'list', items: [
          'Point the web root at public/',
          'Run composer install --no-dev',
          'Run php spark migrate as a deploy step',
          'Set writable/ permissions correctly',
          'Enable HTTPS and secure cookies',
          'Add a health endpoint',
          'Keep a rollback release',
        ] },
        { type: 'text', value: 'On shared hosting, upload the app and set the document root to public/. If you cannot, use a rewrite to protect app/ and .env.' },
        { type: 'note', value: 'A missing writable permission looks like a random 500. Check the logs first.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-deployment',
      q: 'What runs PHP tests?',
      options: ['spark', 'PHPUnit', 'Composer', 'Nginx'],
      answer: 1,
      explain: 'PHPUnit runs the test suite.',
    },
    {
      chapterId: 'testing-deployment',
      q: 'Where do secrets belong?',
      options: ['.env', 'app/Config', 'public/', 'Git'],
      answer: 0,
      explain: '.env stays out of git.',
    },
    {
      chapterId: 'testing-deployment',
      q: 'Which folder must the web server serve?',
      options: ['app/', 'public/', 'writable/', 'vendor/'],
      answer: 1,
      explain: 'Only public/ should be served.',
    },
    {
      chapterId: 'testing-deployment',
      q: 'What should run during deploy?',
      options: ['Nothing', 'Migrations and dependency install', 'Only CSS', 'The dev server'],
      answer: 1,
      explain: 'Schema and dependencies must be ready.',
    },
  ],
};
