// Django chapter: Admin & Auth.

export default {
  id: 'admin-auth',
  title: 'Admin & Auth',
  description: 'The admin site, users and permissions',
  icon: 'admin-panel-settings',
  lessons: [
    {
      id: 'dj-admin',
      title: 'The admin site',
      blocks: [
        { type: 'text', value: 'Django generates an admin interface from your models. Register a model to manage its rows without writing screens. Use it for internal tools, not as your public UI.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.contrib import admin
from .models import Course, Lesson

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "published")
    list_filter = ("published",)
    search_fields = ("title",)

admin.site.register(Lesson)` },
        { type: 'note', value: 'Restrict admin access in production. The admin is powerful, so protect it with strong auth and network rules.' },
      ],
    },
    {
      id: 'dj-auth',
      title: 'Authentication',
      blocks: [
        { type: 'text', value: 'Django ships with a user model, login and logout views, sessions and password hashing. For custom fields, subclass AbstractUser rather than replacing the model later.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    return render(request, "dashboard.html")

# Settings
LOGIN_URL = "/accounts/login/"
LOGIN_REDIRECT_URL = "/dashboard/"` },
        { type: 'list', items: [
          'Use the built-in password hashers',
          'Set LOGIN_URL and redirects explicitly',
          'Never store plain passwords',
          'Use HTTPS in production',
        ] },
      ],
    },
    {
      id: 'dj-permissions',
      title: 'Permissions',
      blocks: [
        { type: 'text', value: 'Django has users, groups and permissions. Check permissions in views and templates. For row-level access, filter every query by the current user.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.contrib.auth.decorators import permission_required

@permission_required("courses.change_course", raise_exception=True)
def edit_course(request, pk):
    ...

# Template
{% if perms.courses.add_course %}
  <a href="{% url 'courses:create' %}">New course</a>
{% endif %}` },
        { type: 'note', value: 'Hiding a button is not authorization. The view must check the permission too.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'admin-auth',
      q: 'What does the admin site do?',
      options: ['Serve the public UI', 'Generate an internal CRUD interface from models', 'Replace the database', 'Run tests'],
      answer: 1,
      explain: 'It is a built-in management UI.',
    },
    {
      chapterId: 'admin-auth',
      q: 'How does Django store passwords?',
      options: ['Plain text', 'Hashed with a password hasher', 'Base64', 'Encrypted with a static key'],
      answer: 1,
      explain: 'Django hashes passwords with a salted algorithm.',
    },
    {
      chapterId: 'admin-auth',
      q: 'What is @login_required for?',
      options: ['Hashing passwords', 'Redirecting anonymous users to login', 'Creating users', 'Granting admin'],
      answer: 1,
      explain: 'It requires an authenticated session.',
    },
    {
      chapterId: 'admin-auth',
      q: 'Why filter queries by the current user?',
      options: ['For speed', 'To prevent one user reading another user data', 'To enable CSRF', 'To run migrations'],
      answer: 1,
      explain: 'Ownership must be enforced on the server.',
    },
  ],
};
