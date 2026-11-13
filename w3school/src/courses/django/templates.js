// Django chapter: Templates.

export default {
  id: 'templates',
  title: 'Templates',
  description: 'Django template language, inheritance and escaping',
  icon: 'code',
  lessons: [
    {
      id: 'dj-template-basics',
      title: 'Template basics',
      blocks: [
        { type: 'text', value: 'Django templates mix HTML with {{ variables }} and {% tags %}. The template language is deliberately limited: no arbitrary Python, which keeps logic in the view.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<h1>{{ course.title }}</h1>
<p>{{ course.price }} Tk</p>

{% if course.published %}
  <span class="badge">Published</span>
{% else %}
  <span class="badge muted">Draft</span>
{% endif %}` },
        { type: 'note', value: 'Django escapes variables by default. Only use |safe or mark_safe on trusted HTML you generated yourself.' },
      ],
    },
    {
      id: 'dj-template-inheritance',
      title: 'Template inheritance',
      blocks: [
        { type: 'text', value: 'A base template defines the shared layout with blocks. Child templates extend it and fill the blocks. This keeps navigation and footer in one file.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<!-- base.html -->
<html>
  <body>
    <nav>CodeNest</nav>
    {% block content %}{% endblock %}
  </body>
</html>

<!-- courses/list.html -->
{% extends "base.html" %}
{% block content %}
  <h1>Courses</h1>
  {% for course in courses %}
    <a href="{% url 'courses:detail' course.pk %}">{{ course.title }}</a>
  {% empty %}
    <p>No courses yet.</p>
  {% endfor %}
{% endblock %}` },
        { type: 'note', value: 'Handle the empty case with {% empty %}. A blank page looks broken; a short message explains the state.' },
      ],
    },
    {
      id: 'dj-static',
      title: 'Static files',
      blocks: [
        { type: 'text', value: 'CSS, JavaScript and images are static files. Use the static tag so the URL is correct in development and production. In production, collect them with collectstatic and serve from a CDN or web server.' },
        { type: 'code', lang: 'html', tryIt: false, value: `{% load static %}
<link rel="stylesheet" href="{% static 'css/app.css' %}">
<img src="{% static 'img/logo.png' %}" alt="CodeNest">` },
        { type: 'list', items: [
          'Never hard-code /static/ paths',
          'Run collectstatic during deploy',
          'Set a far-future cache header for hashed assets',
          'Serve static files from a web server, not Django, in production',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'templates',
      q: 'What does {{ value }} do?',
      options: ['Runs Python', 'Outputs a variable, escaped by default', 'Creates a tag', 'Imports a template'],
      answer: 1,
      explain: 'It outputs an escaped value.',
    },
    {
      chapterId: 'templates',
      q: 'What does {% extends %} do?',
      options: ['Imports CSS', 'Inherits a base template', 'Creates a loop', 'Escapes HTML'],
      answer: 1,
      explain: 'It builds on a base layout.',
    },
    {
      chapterId: 'templates',
      q: 'When is |safe acceptable?',
      options: ['For all user input', 'Only for trusted HTML you generated', 'For JSON', 'Never'],
      answer: 1,
      explain: '|safe disables escaping, so the content must be trusted.',
    },
    {
      chapterId: 'templates',
      q: 'Why use the static tag?',
      options: ['It is shorter', 'It builds the correct URL in every environment', 'It compresses files', 'It caches data'],
      answer: 1,
      explain: 'It handles the static URL correctly.',
    },
  ],
};
