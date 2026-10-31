// Python chapter: Django. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Django needs a full project and is not available in Try it, so samples are read-only.

export default {
  id: 'django',
  title: 'Django Web Framework',
  description: 'Projects and apps, models, ORM, views, templates, forms, admin, auth and DRF',
  icon: 'web',
  lessons: [
    {
      id: 'py-django-start',
      title: 'Projects, Apps and the Request Flow',
      blocks: [
        { type: 'text', value: 'Django is a "batteries included" framework used by Instagram, Pinterest and countless companies. It gives you an ORM, migrations, an admin site, authentication, forms, templates and security protections out of the box.' },
        { type: 'code', lang: 'text', value: String.raw`$ uv add django
$ django-admin startproject config .      # project settings
$ python manage.py startapp courses       # an app: one feature area
$ python manage.py migrate                 # create the built-in tables
$ python manage.py createsuperuser
$ python manage.py runserver               # http://127.0.0.1:8000

config/settings.py   urls.py   wsgi.py / asgi.py
courses/models.py    views.py  urls.py  admin.py  forms.py  templates/  tests.py  migrations/

Request flow: URL -> urls.py -> view -> (model / ORM) -> template -> HTTP response` },
        { type: 'list', items: [
          'Add the app to INSTALLED_APPS in settings.py.',
          'Keep secrets (SECRET_KEY, database password) in environment variables, never in settings.py in git.',
          'DEBUG = False in production, with ALLOWED_HOSTS set.',
        ] },
      ],
    },
    {
      id: 'py-django-models',
      title: 'Models, Migrations and the ORM',
      blocks: [
        { type: 'code', lang: 'python', value: String.raw`# courses/models.py
from django.db import models
from django.conf import settings

class Course(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    price = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

class Enrollment(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["student", "course"], name="unique_enrollment")]

# $ python manage.py makemigrations && python manage.py migrate` },
        { type: 'code', lang: 'python', value: String.raw`from django.db.models import Count, Q, F
from courses.models import Course

Course.objects.create(title="Python for Experts", slug="python", price=999)
free = Course.objects.filter(price=0, published=True)
popular = Course.objects.annotate(students=Count("enrollments")).filter(students__gt=100).order_by("-students")
search = Course.objects.filter(Q(title__icontains="python") | Q(slug__startswith="py"))
Course.objects.filter(published=False).update(price=F("price") * 0.9)

# Avoid N+1: load related objects in the same query
for e in Enrollment.objects.select_related("course", "student")[:50]:
    print(e.student.username, e.course.title)
courses = Course.objects.prefetch_related("enrollments")     # for many-to-many / reverse FKs` },
        { type: 'note', value: 'QuerySets are lazy: no SQL runs until you iterate, slice or call list(). Chain filters freely, and use django-debug-toolbar to see every query a page runs.' },
      ],
    },
    {
      id: 'py-django-views',
      title: 'URLs, Views and Templates',
      blocks: [
        { type: 'code', lang: 'python', value: String.raw`# courses/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from .models import Course, Enrollment

class CourseListView(ListView):          # class-based view
    model = Course
    paginate_by = 20
    queryset = Course.objects.filter(published=True)

def course_detail(request, slug):        # function-based view
    course = get_object_or_404(Course, slug=slug, published=True)
    return render(request, "courses/detail.html", {"course": course})

@login_required
def enroll(request, slug):
    course = get_object_or_404(Course, slug=slug)
    if request.method == "POST":
        Enrollment.objects.get_or_create(student=request.user, course=course)
        return redirect("courses:detail", slug=slug)          # Post/Redirect/Get
    return render(request, "courses/confirm_enroll.html", {"course": course})

# courses/urls.py
from django.urls import path
from . import views
app_name = "courses"
urlpatterns = [
    path("", views.CourseListView.as_view(), name="list"),
    path("<slug:slug>/", views.course_detail, name="detail"),
    path("<slug:slug>/enroll/", views.enroll, name="enroll"),
]
# config/urls.py: path("courses/", include("courses.urls"))` },
        { type: 'code', lang: 'html', value: String.raw`{# courses/templates/courses/detail.html #}
{% extends "base.html" %}
{% block content %}
  <h1>{{ course.title }}</h1>                      {# auto-escaped: XSS-safe #}
  <p>{{ course.price|default:"Free" }} Tk · {{ course.enrollments.count }} students</p>
  <form method="post" action="{% url 'courses:enroll' course.slug %}">
    {% csrf_token %}
    <button>Enroll</button>
  </form>
{% endblock %}` },
      ],
    },
    {
      id: 'py-django-forms-admin',
      title: 'Forms, Admin and Authentication',
      blocks: [
        { type: 'code', lang: 'python', value: String.raw`# courses/forms.py
from django import forms
from .models import Course

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ["title", "slug", "price", "published"]

    def clean_price(self):
        price = self.cleaned_data["price"]
        if price > 100_000:
            raise forms.ValidationError("Price looks too high")
        return price

# In a view
def create_course(request):
    form = CourseForm(request.POST or None)
    if form.is_valid():
        course = form.save()
        return redirect("courses:detail", slug=course.slug)
    return render(request, "courses/form.html", {"form": form})

# courses/admin.py: a full management UI in a few lines
from django.contrib import admin
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "published", "created_at"]
    list_filter = ["published"]
    search_fields = ["title", "slug"]
    prepopulated_fields = {"slug": ["title"]}` },
        { type: 'list', items: [
          'Authentication is built in: login/logout views, password hashing (PBKDF2/argon2), permissions and groups.',
          'Use a custom user model from day one (AUTH_USER_MODEL) so you can add fields like phone later.',
          'Security defaults: CSRF tokens, XSS-escaping templates, SQL-injection-safe ORM, clickjacking protection. Run python manage.py check --deploy before going live.',
        ] },
      ],
    },
    {
      id: 'py-django-rest',
      title: 'Django REST Framework and Testing',
      blocks: [
        { type: 'code', lang: 'python', value: String.raw`# pip install djangorestframework
from rest_framework import serializers, viewsets, permissions
from rest_framework.routers import DefaultRouter

class CourseSerializer(serializers.ModelSerializer):
    students = serializers.IntegerField(source="enrollments.count", read_only=True)
    class Meta:
        model = Course
        fields = ["id", "title", "slug", "price", "students"]

class CourseViewSet(viewsets.ModelViewSet):          # list, retrieve, create, update, delete
    queryset = Course.objects.filter(published=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

router = DefaultRouter()
router.register("courses", CourseViewSet)
# urlpatterns += [path("api/", include(router.urls))]  ->  /api/courses/, /api/courses/7/

# courses/tests.py
from django.test import TestCase
from django.urls import reverse

class CourseTests(TestCase):
    def setUp(self):
        self.course = Course.objects.create(title="Python", slug="python", published=True)

    def test_detail_page(self):
        response = self.client.get(reverse("courses:detail", args=["python"]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Python")

    def test_unpublished_is_404(self):
        Course.objects.create(title="Draft", slug="draft")
        self.assertEqual(self.client.get("/courses/draft/").status_code, 404)` },
        { type: 'note', value: 'Production checklist: PostgreSQL, gunicorn/uvicorn behind Nginx, collectstatic + WhiteNoise or a CDN, Redis for cache and Celery for background tasks, environment-based settings, and Sentry for errors.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'django', q: 'Which command creates migration files after you change models?', options: ['python manage.py migrate', 'python manage.py makemigrations', 'django-admin startapp', 'python manage.py runserver'], answer: 1, explain: 'makemigrations writes them; migrate applies them.' },
    { chapterId: 'django', q: 'When does a Django QuerySet hit the database?', options: ['When it is created', 'When it is evaluated (iterated, sliced, list(), etc.)', 'Never', 'At server start'], answer: 1, explain: 'QuerySets are lazy.' },
    { chapterId: 'django', q: 'Which avoids N+1 queries for ForeignKey relations?', options: ['select_related()', 'filter()', 'order_by()', 'values()'], answer: 0, explain: 'select_related joins; prefetch_related handles many-to-many and reverse relations.' },
    { chapterId: 'django', q: 'What must every POST form in a Django template include?', options: ['{% load static %}', '{% csrf_token %}', '{% block %}', '{{ form.media }}'], answer: 1, explain: 'Django rejects POSTs without a valid CSRF token.' },
    { chapterId: 'django', q: 'What does get_object_or_404 do?', options: ['Returns None if missing', 'Returns the object or raises Http404', 'Creates the object', 'Deletes it'], answer: 1, explain: 'A clean way to return 404 for missing objects.' },
    { chapterId: 'django', q: 'Which package is the standard for building REST APIs with Django?', options: ['Flask-RESTful', 'Django REST Framework', 'FastAPI', 'Graphene only'], answer: 1, explain: 'DRF provides serializers, viewsets and routers.' },
  ],
};
