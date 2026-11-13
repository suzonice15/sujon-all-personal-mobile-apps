// Django chapter: Views & URLs.

export default {
  id: 'views-urls',
  title: 'Views & URLs',
  description: 'Function and class views, routing and status codes',
  icon: 'alt-route',
  lessons: [
    {
      id: 'dj-urls',
      title: 'URL configuration',
      blocks: [
        { type: 'text', value: 'urls.py maps paths to views. Use include() to keep each app’s routes in its own file, and name each route so templates and code can reverse it.' },
        { type: 'code', lang: 'python', tryIt: false, value: `# codenest/urls.py
from django.urls import include, path

urlpatterns = [
    path("api/", include("courses.urls")),
]

# courses/urls.py
from django.urls import path
from . import views

app_name = "courses"

urlpatterns = [
    path("", views.course_list, name="list"),
    path("<int:pk>/", views.course_detail, name="detail"),
]` },
        { type: 'note', value: 'Name routes and use reverse() or the {% url %} tag. Hard-coded paths break when a route changes.' },
      ],
    },
    {
      id: 'dj-function-views',
      title: 'Function views',
      blocks: [
        { type: 'text', value: 'A function view reads the request, does the work and returns a response. Use get_object_or_404 so a missing object returns 404 instead of crashing.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Course

def course_detail(request, pk):
    course = get_object_or_404(Course, pk=pk, published=True)
    return JsonResponse({
        "id": course.id,
        "title": course.title,
        "price": course.price,
    })` },
        { type: 'note', value: 'Filter by published=True in the lookup, not after fetching. It prevents leaking drafts and avoids a second query.' },
      ],
    },
    {
      id: 'dj-class-views',
      title: 'Class-based views',
      blocks: [
        { type: 'text', value: 'Class-based views provide reusable behaviour for list, detail, create and update screens. Use them when they fit; a plain function is clearer for a custom endpoint.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.views.generic import ListView, DetailView
from .models import Course

class CourseListView(ListView):
    model = Course
    template_name = "courses/list.html"
    context_object_name = "courses"
    paginate_by = 12

    def get_queryset(self):
        return Course.objects.filter(published=True)` },
        { type: 'note', value: 'Use ListView and DetailView for standard pages. Switch to a function view when the logic no longer matches the generic shape.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'views-urls',
      q: 'What does include() do in urls.py?',
      options: ['Imports a model', 'Mounts another URL configuration under a prefix', 'Runs tests', 'Creates a view'],
      answer: 1,
      explain: 'It keeps app routes modular.',
    },
    {
      chapterId: 'views-urls',
      q: 'What does get_object_or_404 do?',
      options: ['Returns None', 'Raises a 404 response if the object is missing', 'Creates the object', 'Deletes the object'],
      answer: 1,
      explain: 'It returns a 404 instead of crashing.',
    },
    {
      chapterId: 'views-urls',
      q: 'When is a class-based view a good fit?',
      options: ['For a standard list or detail page', 'For every endpoint', 'Only for APIs', 'Never'],
      answer: 0,
      explain: 'Generic views fit standard pages.',
    },
    {
      chapterId: 'views-urls',
      q: 'Why name a route?',
      options: ['For SEO', 'So reverse() and {% url %} can build the path', 'To cache it', 'To secure it'],
      answer: 1,
      explain: 'Names keep links stable when paths change.',
    },
  ],
};
