// Django chapter: REST APIs with DRF.

export default {
  id: 'rest-drf',
  title: 'REST APIs (DRF)',
  description: 'Serializers, viewsets, routers and permissions',
  icon: 'api',
  lessons: [
    {
      id: 'dj-serializers',
      title: 'Serializers',
      blocks: [
        { type: 'text', value: 'Django REST Framework serializes models to JSON and validates incoming data. A ModelSerializer builds fields from the model; you choose which fields are public.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "title", "price", "published"]
        read_only_fields = ["id"]` },
        { type: 'note', value: 'Separate read and write serializers when the shapes differ. Returning internal fields such as cost or owner is a common leak.' },
      ],
    },
    {
      id: 'dj-viewsets',
      title: 'Viewsets and routers',
      blocks: [
        { type: 'text', value: 'A ViewSet groups list, create, retrieve, update and destroy in one class. A router generates the URL patterns. This keeps an API small and consistent.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(published=True)
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# urls.py
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register("courses", CourseViewSet)
urlpatterns = router.urls` },
        { type: 'note', value: 'Set a sensible default permission. Everything public is a decision, not a default.' },
      ],
    },
    {
      id: 'dj-drf-pagination',
      title: 'Pagination and filtering',
      blocks: [
        { type: 'text', value: 'Never return an unbounded list. Configure pagination globally, and add filtering with django-filter for fields clients actually need.' },
        { type: 'code', lang: 'python', tryIt: false, value: `# settings.py
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}` },
        { type: 'list', items: [
          'Paginate every list endpoint',
          'Allow filters only on indexed columns',
          'Return metadata such as count and next',
          'Limit the maximum page size',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'rest-drf',
      q: 'What does a serializer do?',
      options: ['Routes URLs', 'Converts models to JSON and validates input', 'Runs migrations', 'Serves static files'],
      answer: 1,
      explain: 'Serializers handle JSON in both directions.',
    },
    {
      chapterId: 'rest-drf',
      q: 'What does a router generate?',
      options: ['Models', 'URL patterns for a viewset', 'Migrations', 'Templates'],
      answer: 1,
      explain: 'Routers map viewset actions to URLs.',
    },
    {
      chapterId: 'rest-drf',
      q: 'Why paginate a list endpoint?',
      options: ['To look nice', 'To avoid returning an unbounded result', 'To enable CSRF', 'To run tests'],
      answer: 1,
      explain: 'Unbounded lists are slow and risky.',
    },
    {
      chapterId: 'rest-drf',
      q: 'Why set an explicit permission class?',
      options: ['It is required', 'So public access is a deliberate decision', 'To speed up queries', 'To paginate'],
      answer: 1,
      explain: 'Defaults should not expose data by accident.',
    },
  ],
};
