// Flask chapter: Routes & Views.

export default {
  id: 'routes-views',
  title: 'Routes & Views',
  description: 'URL rules, variables and request data',
  icon: 'alt-route',
  lessons: [
    {
      id: 'flask-routes',
      title: 'Routes and variables',
      blocks: [
        { type: 'text', value: 'A route can include variables with a converter, such as <int:course_id>. Flask passes them to the view as arguments. Use url_for to build URLs from the endpoint name.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask import url_for

@app.get("/courses/<int:course_id>")
def course_detail(course_id):
    return {"id": course_id}

# Build a URL: /courses/7
url_for("course_detail", course_id=7)` },
        { type: 'note', value: 'Use url_for in redirects and templates. Hard-coded paths break when a route changes.' },
      ],
    },
    {
      id: 'flask-request',
      title: 'Request data',
      blocks: [
        { type: 'text', value: 'The request object holds the method, headers, query string, form data and JSON body. Read JSON with request.get_json() and query values with request.args.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask import request

@app.post("/api/courses")
def create_course():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    if not title:
        return {"error": "Title is required"}, 400
    return {"title": title}, 201` },
        { type: 'note', value: 'Return a tuple of (body, status) to set the status code. Always validate the body before using it.' },
      ],
    },
    {
      id: 'flask-errors',
      title: 'Errors and responses',
      blocks: [
        { type: 'text', value: 'Use abort() to stop with a status, and error handlers to return a consistent shape. Never leak stack traces to clients in production.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask import abort

@app.errorhandler(404)
def not_found(error):
    return {"error": "Not found"}, 404

@app.get("/courses/<int:course_id>")
def course_detail(course_id):
    course = find_course(course_id)
    if course is None:
        abort(404)
    return course` },
        { type: 'list', items: [
          '400 for invalid input',
          '404 for a missing resource',
          '405 for a wrong method',
          '500 for an unexpected error',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'routes-views',
      q: 'What does <int:course_id> do?',
      options: ['Creates a table', 'Captures an integer from the URL', 'Sets the status', 'Adds JSON'],
      answer: 1,
      explain: 'It is a typed URL converter.',
    },
    {
      chapterId: 'routes-views',
      q: 'How do you read a JSON body?',
      options: ['request.args', 'request.get_json()', 'request.form only', 'request.headers'],
      answer: 1,
      explain: 'get_json parses the JSON body.',
    },
    {
      chapterId: 'routes-views',
      q: 'What does abort(404) do?',
      options: ['Deletes data', 'Stops with a 404 response', 'Redirects', 'Starts a server'],
      answer: 1,
      explain: 'It raises the matching HTTP error.',
    },
    {
      chapterId: 'routes-views',
      q: 'Why use url_for?',
      options: ['It is shorter', 'It builds URLs that survive route changes', 'It caches', 'It secures'],
      answer: 1,
      explain: 'It generates the URL from the endpoint.',
    },
  ],
};
