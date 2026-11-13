// Django chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Django is, setup and your first project',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'dj-what-is',
      title: 'What is Django?',
      blocks: [
        { type: 'text', value: 'Django is a high-level Python web framework with batteries included: an ORM, migrations, admin, authentication, forms, templates and security defaults. It is built for deadlines and large teams.' },
        { type: 'list', items: [
          'ORM and migrations built in',
          'Admin interface generated from models',
          'Authentication and permissions included',
          'Forms, templates and CSRF protection',
          'Security defaults against common attacks',
        ] },
        { type: 'note', value: 'Django is opinionated. That structure is a strength for a team, and a constraint if you want full control over every layer.' },
      ],
    },
    {
      id: 'dj-setup',
      title: 'Setup and project layout',
      blocks: [
        { type: 'text', value: 'A Django project contains settings and several apps. Each app is a small module with its own models, views, templates and migrations. Use a virtual environment and pin versions.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `python -m venv .venv
source .venv/bin/activate
pip install django

django-admin startproject codenest .
python manage.py startapp courses

python manage.py runserver` },
        { type: 'note', value: 'The trailing dot in startproject keeps manage.py at the project root, which is easier to run and deploy.' },
      ],
    },
    {
      id: 'dj-first-view',
      title: 'Your first view',
      blocks: [
        { type: 'text', value: 'A view is a function or class that receives a request and returns a response. Map it to a URL in urls.py. Django calls the view when the path matches.' },
        { type: 'code', lang: 'python', tryIt: false, value: `# courses/views.py
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok"})

# codenest/urls.py
from django.urls import path
from courses.views import health

urlpatterns = [
    path("api/health", health),
]` },
        { type: 'note', value: 'Always return a proper response object. JsonResponse sets the content type and serializes for you.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is Django?',
      options: ['A database', 'A high-level Python web framework', 'A frontend library', 'A CSS framework'],
      answer: 1,
      explain: 'Django is a full-stack Python web framework.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does startapp create?',
      options: ['A project', 'An app module with models, views and tests', 'A database', 'A server'],
      answer: 1,
      explain: 'startapp creates a reusable app inside the project.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does a view return?',
      options: ['A model', 'An HTTP response', 'A migration', 'A template only'],
      answer: 1,
      explain: 'A view returns a response object.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use a virtual environment?',
      options: ['It is faster', 'To isolate package versions per project', 'To enable HTTPS', 'To run tests'],
      answer: 1,
      explain: 'A venv keeps dependencies reproducible.',
    },
  ],
};
