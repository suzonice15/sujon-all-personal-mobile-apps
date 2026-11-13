// Flask chapter: Templates.

export default {
  id: 'templates',
  title: 'Templates',
  description: 'Jinja, inheritance and escaping',
  icon: 'code',
  lessons: [
    {
      id: 'flask-jinja',
      title: 'Jinja basics',
      blocks: [
        { type: 'text', value: 'Jinja templates use {{ }} for values and {% %} for logic. Flask escapes values by default. Pass data with render_template.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask import render_template

@app.get("/courses")
def course_list():
    courses = Course.query.all()
    return render_template("courses/list.html", courses=courses)` },
        { type: 'code', lang: 'html', tryIt: false, value: `<h1>Courses</h1>
<ul>
  {% for course in courses %}
    <li>{{ course.title }} - {{ course.price }}</li>
  {% else %}
    <li>No courses yet</li>
  {% endfor %}
</ul>` },
        { type: 'note', value: 'Jinja autoescapes HTML. Use the |safe filter only on trusted content.' },
      ],
    },
    {
      id: 'flask-template-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'A base template holds the layout with blocks. Child templates extend it. This keeps navigation and footer in one place.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<!-- base.html -->
<html><body>
  <nav>CodeNest</nav>
  {% block content %}{% endblock %}
</body></html>

<!-- courses/list.html -->
{% extends "base.html" %}
{% block content %}
  <h1>Courses</h1>
{% endblock %}` },
        { type: 'note', value: 'Put base.html in templates/ and app templates in templates/<blueprint>/. A consistent layout is the fastest way to make a site look finished.' },
      ],
    },
    {
      id: 'flask-static',
      title: 'Static files',
      blocks: [
        { type: 'text', value: 'CSS and images live in the static folder. Use url_for("static", filename=...) so the URL is correct. In production, serve static files from Nginx or a CDN.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<link rel="stylesheet" href="{{ url_for('static', filename='css/app.css') }}">
<img src="{{ url_for('static', filename='img/logo.png') }}" alt="CodeNest">` },
        { type: 'list', items: [
          'Never hard-code /static/',
          'Add cache headers for hashed assets',
          'Serve static files outside the app in production',
          'Keep the folder small',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'templates',
      q: 'What does render_template do?',
      options: ['Runs SQL', 'Renders a Jinja template with data', 'Starts a server', 'Creates a route'],
      answer: 1,
      explain: 'It renders HTML with the given context.',
    },
    {
      chapterId: 'templates',
      q: 'Does Jinja escape HTML by default?',
      options: ['No', 'Yes', 'Only in debug', 'Only for JSON'],
      answer: 1,
      explain: 'Autoescaping is on by default.',
    },
    {
      chapterId: 'templates',
      q: 'What does {% extends %} do?',
      options: ['Imports CSS', 'Inherits a base template', 'Loops', 'Escapes'],
      answer: 1,
      explain: 'It builds on a base layout.',
    },
    {
      chapterId: 'templates',
      q: 'How do you link a static file?',
      options: ['/static/file directly', 'url_for("static", filename=...)', 'import static', 'link rel only'],
      answer: 1,
      explain: 'url_for builds the correct URL.',
    },
  ],
};
