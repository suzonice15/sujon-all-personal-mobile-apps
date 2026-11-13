// Flask interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Flask?',
      a: 'A small Python web framework with routing, request handling and Jinja templates, leaving database and structure choices to you.',
      level: 'basic',
    },
    {
      q: 'Flask versus Django?',
      a: 'Flask is minimal and flexible. Django bundles an ORM, admin, auth and conventions for large projects.',
      level: 'basic',
    },
    {
      q: 'What is a route?',
      a: 'A URL rule mapped to a view function with @app.get, @app.post and similar decorators.',
      level: 'basic',
    },
    {
      q: 'Why not use flask run in production?',
      a: 'It is a development server. Use Gunicorn or uWSGI behind a real web server.',
      level: 'basic',
    },
  ],
  'routes-views': [
    {
      q: 'How do you capture a URL value?',
      a: 'Use a converter such as <int:course_id> and accept it as a view argument.',
      level: 'basic',
    },
    {
      q: 'How do you read a JSON body?',
      a: 'request.get_json(silent=True) returns a dict or None instead of raising on bad JSON.',
      level: 'basic',
    },
    {
      q: 'How do you set a status code?',
      a: 'Return a tuple (body, status), or use a response object.',
      level: 'basic',
    },
    {
      q: 'Why use abort?',
      a: 'It stops the request with the matching HTTP error, which error handlers can format.',
      level: 'intermediate',
    },
  ],
  templates: [
    {
      q: 'Does Jinja escape HTML by default?',
      a: 'Yes. Use |safe only on trusted content you generated.',
      level: 'basic',
    },
    {
      q: 'How does template inheritance work?',
      a: 'A base template defines blocks; child templates extend it and fill them.',
      level: 'basic',
    },
    {
      q: 'How do you reference a static file?',
      a: 'url_for("static", filename="css/app.css"), so the URL is correct in every environment.',
      level: 'basic',
    },
    {
      q: 'Where do templates live?',
      a: 'In the app templates folder, or per blueprint in the blueprint templates folder.',
      level: 'intermediate',
    },
  ],
  forms: [
    {
      q: 'What does Flask-WTF add?',
      a: 'CSRF protection and integration between WTForms and Flask request data.',
      level: 'basic',
    },
    {
      q: 'Why redirect after a successful POST?',
      a: 'To avoid resubmitting the form on refresh, the standard POST/Redirect/GET pattern.',
      level: 'basic',
    },
    {
      q: 'Where must validation happen?',
      a: 'On the server. Client validation is only for user experience.',
      level: 'basic',
    },
    {
      q: 'What is SECRET_KEY for?',
      a: 'Signing sessions and CSRF tokens. It must be secret and unique per environment.',
      level: 'intermediate',
    },
  ],
  database: [
    {
      q: 'What is db.session?',
      a: 'The SQLAlchemy session that tracks changes and commits them to the database.',
      level: 'basic',
    },
    {
      q: 'What does Flask-Migrate do?',
      a: 'It wraps Alembic to generate and apply schema migrations from model changes.',
      level: 'basic',
    },
    {
      q: 'Why roll back on error?',
      a: 'A failed session stays unusable until rolled back, and partial writes must not commit.',
      level: 'intermediate',
    },
    {
      q: 'Is the session thread-safe?',
      a: 'No. Use one session per request, which Flask-SQLAlchemy handles for you.',
      level: 'advanced',
    },
  ],
  blueprints: [
    {
      q: 'What is a blueprint?',
      a: 'A group of routes, templates and static files for one feature, registered on the app with a URL prefix.',
      level: 'basic',
    },
    {
      q: 'What is the app factory?',
      a: 'A create_app() function that builds and configures the app, which makes tests and environments easy.',
      level: 'intermediate',
    },
    {
      q: 'Why create extensions outside the app?',
      a: 'To avoid circular imports; the extension is bound later with init_app.',
      level: 'intermediate',
    },
    {
      q: 'How do you namespace endpoints?',
      a: 'Give each blueprint a name and use url_for("courses.list_courses").',
      level: 'basic',
    },
  ],
  'rest-api': [
    {
      q: 'Which status code for a created resource?',
      a: '201 Created.',
      level: 'basic',
    },
    {
      q: 'Why cap the page size?',
      a: 'To prevent a client from requesting the whole table and exhausting memory.',
      level: 'basic',
    },
    {
      q: 'What should an error response include?',
      a: 'A machine-readable code and a clear message, in one consistent shape.',
      level: 'intermediate',
    },
    {
      q: 'When add Marshmallow or Flask-RESTX?',
      a: 'When the API grows enough to need schemas, serialization and generated docs.',
      level: 'intermediate',
    },
  ],
  'auth-testing': [
    {
      q: 'How should passwords be stored?',
      a: 'As salted hashes with Werkzeug or a dedicated hasher, never in plain text.',
      level: 'basic',
    },
    {
      q: 'What does @login_required do?',
      a: 'It redirects anonymous users to the login page.',
      level: 'basic',
    },
    {
      q: 'How do you test a Flask app?',
      a: 'Build a fresh app with create_app, use the test client, and point it at a test database.',
      level: 'intermediate',
    },
    {
      q: 'Why check ownership, not only login?',
      a: 'An authenticated user must not read or change another user data.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you structure a Flask API?',
      a: 'An app factory, config classes, extensions, one blueprint per feature, a consistent error handler and tests.',
      level: 'intermediate',
    },
    {
      q: 'How do you deploy Flask?',
      a: 'Gunicorn or uWSGI behind Nginx, environment-based config, migrations as a deploy step and a health endpoint.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug a slow endpoint?',
      a: 'Check the query count and SQL, add indexes, and measure before changing code.',
      level: 'advanced',
    },
    {
      q: 'What is the best first Flask step?',
      a: 'One route with a JSON response, then templates, database and a blueprint.',
      level: 'basic',
    },
  ],
};
