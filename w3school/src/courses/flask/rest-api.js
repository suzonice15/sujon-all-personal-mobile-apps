// Flask chapter: REST APIs.

export default {
  id: 'rest-api',
  title: 'REST APIs',
  description: 'JSON endpoints, status codes and pagination',
  icon: 'api',
  lessons: [
    {
      id: 'flask-json-api',
      title: 'JSON endpoints',
      blocks: [
        { type: 'text', value: 'Build REST endpoints with routes that return JSON and the right status code. Keep the view thin: validate, call a service, return the response.' },
        { type: 'code', lang: 'python', tryIt: false, value: `@app.get("/api/courses")
def list_courses():
    page = request.args.get("page", 1, type=int)
    per_page = min(request.args.get("per_page", 20, type=int), 100)
    items = Course.query.paginate(page=page, per_page=per_page, error_out=False)
    return {
        "items": [c.to_dict() for c in items.items],
        "total": items.total,
        "page": page,
        "pages": items.pages,
    }` },
        { type: 'note', value: 'Cap per_page. An unbounded page size lets a client ask for the whole table.' },
      ],
    },
    {
      id: 'flask-api-errors',
      title: 'Errors and validation',
      blocks: [
        { type: 'text', value: 'Return a consistent error shape with a code and a message. Validate before touching the database, and never return a stack trace.' },
        { type: 'code', lang: 'python', tryIt: false, value: `def error(message, status=400, code="BAD_REQUEST"):
    return {"error": {"code": code, "message": message}}, status

@app.post("/api/courses")
def create_course():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    if len(title) < 3:
        return error("Title must be at least 3 characters")
    course = Course(title=title, price=int(data.get("price", 0)))
    db.session.add(course)
    db.session.commit()
    return course.to_dict(), 201` },
        { type: 'note', value: 'One error shape across the API makes client code simple and reliable.' },
      ],
    },
    {
      id: 'flask-api-patterns',
      title: 'API patterns',
      blocks: [
        { type: 'list', items: [
          'Plural nouns for resources: /courses',
          'HTTP methods for actions',
          'Pagination on every list',
          'Consistent JSON errors',
          'Version the API when you must break it',
          'Add a health endpoint',
        ] },
        { type: 'text', value: 'For larger APIs, Flask-RESTX or Marshmallow add schemas and docs. Start with plain Flask and add them when the API grows.' },
        { type: 'note', value: 'A clean small API with tests beats a large one with inconsistent responses.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'rest-api',
      q: 'Which status code for a created resource?',
      options: ['200', '201', '404', '500'],
      answer: 1,
      explain: '201 Created is the standard.',
    },
    {
      chapterId: 'rest-api',
      q: 'Why cap per_page?',
      options: ['To look nice', 'To prevent a client requesting the whole table', 'To enable CSRF', 'To paginate'],
      answer: 1,
      explain: 'A limit protects the server.',
    },
    {
      chapterId: 'rest-api',
      q: 'What should an API error include?',
      options: ['Only a code', 'A code and a clear message', 'A stack trace', 'Nothing'],
      answer: 1,
      explain: 'Clients need a consistent, safe shape.',
    },
    {
      chapterId: 'rest-api',
      q: 'Why add a health endpoint?',
      options: ['For SEO', 'So a load balancer can check readiness', 'To paginate', 'To encrypt'],
      answer: 1,
      explain: 'Health checks drive routing and restarts.',
    },
  ],
};
