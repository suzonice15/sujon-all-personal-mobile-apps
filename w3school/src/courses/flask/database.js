// Flask chapter: Database & SQLAlchemy.

export default {
  id: 'database',
  title: 'Database',
  description: 'SQLAlchemy models, sessions and migrations',
  icon: 'storage',
  lessons: [
    {
      id: 'flask-sqlalchemy',
      title: 'Models',
      blocks: [
        { type: 'text', value: 'Flask-SQLAlchemy connects Flask to SQLAlchemy. A model is a class with columns. The db object holds the session and metadata.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False, default=0)

    def to_dict(self):
        return {"id": self.id, "title": self.title, "price": self.price}` },
        { type: 'note', value: 'Use db.Integer for money in the smallest unit, or db.Numeric for exact decimals. Never use a float for currency.' },
      ],
    },
    {
      id: 'flask-session-queries',
      title: 'Sessions and queries',
      blocks: [
        { type: 'text', value: 'A session tracks changes. Add or delete objects and commit. Query with select() or the model query API. Roll back on errors.' },
        { type: 'code', lang: 'python', tryIt: false, value: `course = Course(title="Flask", price=5000)
db.session.add(course)
db.session.commit()

courses = Course.query.filter_by(price=5000).all()

try:
    db.session.commit()
except Exception:
    db.session.rollback()
    raise` },
        { type: 'note', value: 'A session is not thread-safe. In Flask, one session per request is handled for you; do not share it across requests.' },
      ],
    },
    {
      id: 'flask-migrations',
      title: 'Migrations',
      blocks: [
        { type: 'text', value: 'Flask-Migrate wraps Alembic. Generate a migration after each model change, review it, then upgrade. Commit migrations with the code.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `flask db init
flask db migrate -m "add courses"
flask db upgrade` },
        { type: 'list', items: [
          'Create a migration after every model change',
          'Review the generated script',
          'Never edit an applied migration',
          'Run upgrade as a deploy step',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'database',
      q: 'What does db.session.commit() do?',
      options: ['Rolls back', 'Writes pending changes', 'Creates a table', 'Starts a server'],
      answer: 1,
      explain: 'It flushes changes to the database.',
    },
    {
      chapterId: 'database',
      q: 'Which column type suits money?',
      options: ['Float', 'Integer of the smallest unit or Numeric', 'String', 'Boolean'],
      answer: 1,
      explain: 'Exact types avoid rounding errors.',
    },
    {
      chapterId: 'database',
      q: 'What does Flask-Migrate manage?',
      options: ['Routes', 'Schema migrations', 'Templates', 'Sessions'],
      answer: 1,
      explain: 'It wraps Alembic migrations.',
    },
    {
      chapterId: 'database',
      q: 'Why roll back on error?',
      options: ['To save memory', 'To keep the session usable and avoid partial writes', 'To enable CSRF', 'To cache'],
      answer: 1,
      explain: 'A failed session must be rolled back.',
    },
  ],
};
