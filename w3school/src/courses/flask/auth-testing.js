// Flask chapter: Auth & Testing.

export default {
  id: 'auth-testing',
  title: 'Auth & Testing',
  description: 'Login sessions, password hashing and tests',
  icon: 'lock',
  lessons: [
    {
      id: 'flask-login',
      title: 'Login and sessions',
      blocks: [
        { type: 'text', value: 'Flask-Login manages the user session. Passwords are hashed with Werkzeug. Protect routes with @login_required and check ownership in the view.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask_login import LoginManager, login_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

login_manager = LoginManager()

user.password_hash = generate_password_hash(raw_password)
ok = check_password_hash(user.password_hash, raw_password)

@app.get("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html")` },
        { type: 'note', value: 'Never store plain passwords. Hashing with a salt is mandatory, and the session cookie needs a strong SECRET_KEY.' },
      ],
    },
    {
      id: 'flask-auth-api',
      title: 'API authentication',
      blocks: [
        { type: 'text', value: 'For a JSON API, send a bearer token and verify it before the view runs. Keep tokens short-lived and store them in httpOnly cookies for browsers, or in secure storage for mobile.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from functools import wraps

def token_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
        user = verify_token(token)
        if user is None:
            return {"error": "Unauthorized"}, 401
        return view(user, *args, **kwargs)
    return wrapper` },
        { type: 'list', items: [
          'Verify the token on every protected route',
          'Check the role and ownership, not only login',
          'Use HTTPS',
          'Rotate signing keys',
        ] },
      ],
    },
    {
      id: 'flask-tests',
      title: 'Tests',
      blocks: [
        { type: 'text', value: 'Use the Flask test client against a fresh app from create_app. Point tests at an in-memory database and commit nothing to production.' },
        { type: 'code', lang: 'python', tryIt: false, value: `import pytest
from app import create_app

@pytest.fixture()
def client():
    app = create_app("config.Testing")
    with app.test_client() as c:
        yield c

def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json()["status"] == "ok"` },
        { type: 'note', value: 'Test the status code and the response body. A view that returns 200 with the wrong data is still broken.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'auth-testing',
      q: 'How should passwords be stored?',
      options: ['Plain text', 'Hashed with a salt', 'Base64', 'Encrypted with a static key'],
      answer: 1,
      explain: 'Always hash passwords.',
    },
    {
      chapterId: 'auth-testing',
      q: 'What does @login_required do?',
      options: ['Hashes a password', 'Redirects anonymous users to login', 'Creates a user', 'Runs tests'],
      answer: 1,
      explain: 'It requires an authenticated session.',
    },
    {
      chapterId: 'auth-testing',
      q: 'Why use the test client?',
      options: ['To send real traffic', 'To test routes in memory without a server', 'To migrate', 'To hash passwords'],
      answer: 1,
      explain: 'It exercises the app without a network.',
    },
    {
      chapterId: 'auth-testing',
      q: 'Why check ownership in the view?',
      options: ['For speed', 'So one user cannot read or change another user data', 'To enable CSRF', 'To paginate'],
      answer: 1,
      explain: 'Authorization must be enforced on the server.',
    },
  ],
};
