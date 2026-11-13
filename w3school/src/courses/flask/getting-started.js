// Flask chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Flask is, setup and your first app',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'flask-what-is',
      title: 'What is Flask?',
      blocks: [
        { type: 'text', value: 'Flask is a small Python web framework. It gives you routing, requests, responses and templates, and lets you choose everything else: database, auth and structure. It is a good fit for small services and APIs.' },
        { type: 'list', items: [
          'Minimal core, many extensions',
          'No ORM by default; pick SQLAlchemy or another',
          'Jinja templates',
          'Easy to understand and debug',
          'Great for APIs and small products',
        ] },
        { type: 'note', value: 'Flask is not worse than Django. It is less opinionated, so you own more decisions. For a small API that is a strength.' },
      ],
    },
    {
      id: 'flask-setup',
      title: 'Setup',
      blocks: [
        { type: 'text', value: 'Create a virtual environment, install Flask and write a small app. Run it with the Flask CLI. Keep dependencies in requirements.txt.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `python -m venv .venv
source .venv/bin/activate
pip install flask

export FLASK_APP=app.py
flask run --debug` },
        { type: 'note', value: 'Never run the development server in production. Use Gunicorn or uWSGI behind Nginx.' },
      ],
    },
    {
      id: 'flask-first-app',
      title: 'Your first app',
      blocks: [
        { type: 'text', value: 'A route decorator maps a URL to a function. The function returns a string, a dict or a response object. Use jsonify for JSON.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask import Flask, jsonify

app = Flask(__name__)

@app.get("/")
def home():
    return "Hello from Flask"

@app.get("/api/health")
def health():
    return jsonify(status="ok")` },
        { type: 'note', value: 'Returning a dict also produces JSON in modern Flask, but jsonify is explicit and works everywhere.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is Flask?',
      options: ['A database', 'A small Python web framework', 'A frontend library', 'A CSS tool'],
      answer: 1,
      explain: 'Flask is a minimal Python web framework.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does @app.get("/") do?',
      options: ['Starts the database', 'Maps GET / to a function', 'Creates a template', 'Runs tests'],
      answer: 1,
      explain: 'It registers a route.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which server should run Flask in production?',
      options: ['flask run', 'Gunicorn or uWSGI behind Nginx', 'The debug server', 'Django'],
      answer: 1,
      explain: 'Use a production WSGI server.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use a virtual environment?',
      options: ['It is faster', 'To isolate package versions', 'To enable JSON', 'To run tests'],
      answer: 1,
      explain: 'A venv isolates dependencies.',
    },
  ],
};
