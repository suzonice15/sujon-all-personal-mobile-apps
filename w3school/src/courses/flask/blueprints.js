// Flask chapter: Blueprints & App Factory.

export default {
  id: 'blueprints',
  title: 'Blueprints & Structure',
  description: 'Split a growing Flask app into modules',
  icon: 'account-tree',
  lessons: [
    {
      id: 'flask-blueprints',
      title: 'Blueprints',
      blocks: [
        { type: 'text', value: 'A blueprint groups routes, templates and static files for one feature. Register it on the app with a URL prefix. This keeps a growing app from becoming one huge file.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask import Blueprint

courses = Blueprint("courses", __name__, url_prefix="/api/courses")

@courses.get("/")
def list_courses():
    return {"courses": []}

# app.py
app.register_blueprint(courses)` },
        { type: 'note', value: 'Name blueprints and use url_for("courses.list_courses"). Names prevent collisions between features.' },
      ],
    },
    {
      id: 'flask-app-factory',
      title: 'The app factory',
      blocks: [
        { type: 'text', value: 'A create_app() function builds the app, configures extensions and registers blueprints. It makes tests and multiple environments easy, because each call returns a fresh app.' },
        { type: 'code', lang: 'python', tryIt: false, value: `def create_app(config=None):
    app = Flask(__name__)
    app.config.from_object(config or "config.Development")

    db.init_app(app)
    app.register_blueprint(courses)
    return app

# run.py
app = create_app()` },
        { type: 'note', value: 'Extensions are created outside the app and bound with init_app. That avoids circular imports in a package layout.' },
      ],
    },
    {
      id: 'flask-project-layout',
      title: 'Project layout',
      blocks: [
        { type: 'code', lang: 'text', tryIt: false, value: `codenest/
  app/
    __init__.py       create_app
    config.py
    models.py
    courses/
      __init__.py     blueprint
      routes.py
      templates/
    auth/
      __init__.py
      routes.py
  migrations/
  tests/
  requirements.txt` },
        { type: 'list', items: [
          'One package per feature',
          'Shared models in one place',
          'Config classes per environment',
          'Tests import create_app and build a test client',
        ] },
        { type: 'note', value: 'Structure is your choice in Flask. Choose one early and keep it consistent.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'blueprints',
      q: 'What is a blueprint?',
      options: ['A database table', 'A group of routes and resources for a feature', 'A template', 'A server'],
      answer: 1,
      explain: 'Blueprints organise features.',
    },
    {
      chapterId: 'blueprints',
      q: 'What does create_app() enable?',
      options: ['Faster queries', 'A fresh app per test or environment', 'CSRF', 'Static files'],
      answer: 1,
      explain: 'The factory builds isolated app instances.',
    },
    {
      chapterId: 'blueprints',
      q: 'Why create extensions outside the app?',
      options: ['It is faster', 'To avoid circular imports and bind with init_app', 'To enable JSON', 'To run migrations'],
      answer: 1,
      explain: 'It keeps imports clean in a package.',
    },
    {
      chapterId: 'blueprints',
      q: 'Why name blueprints?',
      options: ['For speed', 'So url_for can reference routes without collisions', 'To encrypt', 'To paginate'],
      answer: 1,
      explain: 'Names namespace the endpoints.',
    },
  ],
};
