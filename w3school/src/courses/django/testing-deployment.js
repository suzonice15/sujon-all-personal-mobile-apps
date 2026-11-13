// Django chapter: Testing & Deployment.

export default {
  id: 'testing-deployment',
  title: 'Testing & Deployment',
  description: 'Tests, settings, static files and a production checklist',
  icon: 'build',
  lessons: [
    {
      id: 'dj-tests',
      title: 'Tests',
      blocks: [
        { type: 'text', value: 'Django test runner creates a test database and rolls it back after each test. Use TestCase for database tests and SimpleTestCase when no database is needed. Test views through the test client.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.test import TestCase
from django.urls import reverse
from .models import Course

class CourseTests(TestCase):
    def test_list_returns_published_only(self):
        Course.objects.create(title="Draft", published=False)
        Course.objects.create(title="Live", published=True)

        response = self.client.get(reverse("courses:list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Live")
        self.assertNotContains(response, "Draft")` },
        { type: 'note', value: 'Assert on behaviour a user can observe: status code, content and redirects. Do not test private helpers.' },
      ],
    },
    {
      id: 'dj-settings',
      title: 'Settings for production',
      blocks: [
        { type: 'text', value: 'Keep secrets in environment variables. Set DEBUG=False, configure ALLOWED_HOSTS, use a real database, and turn on HTTPS and secure cookies. Split settings per environment if the file grows.' },
        { type: 'code', lang: 'python', tryIt: false, value: `import os

DEBUG = os.environ.get("DJANGO_DEBUG") == "1"
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
ALLOWED_HOSTS = os.environ.get("DJANGO_HOSTS", "").split(",")

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True` },
        { type: 'note', value: 'Never commit the secret key. A leaked key lets an attacker forge sessions and signed data.' },
      ],
    },
    {
      id: 'dj-deploy',
      title: 'Deployment',
      blocks: [
        { type: 'text', value: 'Run Django behind a real web server such as Gunicorn or uWSGI plus Nginx. Serve static files from Nginx or a CDN. Run migrations as a deploy step, then verify a health endpoint.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `python manage.py migrate --noinput
python manage.py collectstatic --noinput
gunicorn codenest.wsgi:application --bind 0.0.0.0:8000 --workers 3` },
        { type: 'list', items: [
          'DEBUG=False in production',
          'A real secret key from the environment',
          'ALLOWED_HOSTS set to your domain',
          'Static files collected and served',
          'Health check and logs',
          'Backups and a rollback plan',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-deployment',
      q: 'What does Django TestCase do with the database?',
      options: ['Uses production', 'Creates a test database and rolls back', 'Deletes data', 'Skips the database'],
      answer: 1,
      explain: 'Tests run against an isolated test database.',
    },
    {
      chapterId: 'testing-deployment',
      q: 'Why set DEBUG=False?',
      options: ['It is faster', 'To avoid leaking detailed errors and settings', 'To enable static files', 'To run tests'],
      answer: 1,
      explain: 'Debug pages expose internals.',
    },
    {
      chapterId: 'testing-deployment',
      q: 'What collects static files for production?',
      options: ['migrate', 'collectstatic', 'runserver', 'startapp'],
      answer: 1,
      explain: 'collectstatic gathers them into STATIC_ROOT.',
    },
    {
      chapterId: 'testing-deployment',
      q: 'Why run migrations as a deploy step?',
      options: ['To speed up the app', 'So the schema is ready before the new code serves traffic', 'To collect static files', 'To enable admin'],
      answer: 1,
      explain: 'Schema and code deploy together.',
    },
  ],
};
