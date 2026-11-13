// Django chapter: ORM & Performance.

export default {
  id: 'orm-performance',
  title: 'ORM & Performance',
  description: 'Querysets, N+1, select_related and indexes',
  icon: 'speed',
  lessons: [
    {
      id: 'dj-querysets',
      title: 'Querysets',
      blocks: [
        { type: 'text', value: 'A queryset is lazy: no SQL runs until you iterate, slice or call a terminal method. Chain filter, exclude, order_by and annotate before that point.' },
        { type: 'code', lang: 'python', tryIt: false, value: `courses = (
    Course.objects
    .filter(published=True, price__lte=6000)
    .order_by("title")
    .only("id", "title", "price")[:20]
)` },
        { type: 'note', value: 'Use only() or values() to fetch fewer columns. Selecting every column on a wide table is a common and invisible cost.' },
      ],
    },
    {
      id: 'dj-n-plus-one',
      title: 'The N+1 problem',
      blocks: [
        { type: 'text', value: 'Accessing a related object inside a loop runs one query per row. select_related follows a foreign key in the same query; prefetch_related batches a many-to-many or reverse relation.' },
        { type: 'code', lang: 'python', tryIt: false, value: `# Bad: one query per course for lessons
for course in Course.objects.all():
    for lesson in course.lessons.all():
        ...

# Good: two queries total
courses = Course.objects.prefetch_related("lessons")
for course in courses:
    for lesson in course.lessons.all():
        ...` },
        { type: 'note', value: 'Use select_related for ForeignKey and OneToOne. Use prefetch_related for ManyToMany and reverse relations.' },
      ],
    },
    {
      id: 'dj-indexes-explain',
      title: 'Indexes and query plans',
      blocks: [
        { type: 'text', value: 'Add an index for columns you filter or order by often. Check the SQL with queryset.query and the plan with EXPLAIN in your database. Measure before adding indexes.' },
        { type: 'code', lang: 'python', tryIt: false, value: `class Course(models.Model):
    title = models.CharField(max_length=200)
    published = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=["published", "title"]),
        ]` },
        { type: 'list', items: [
          'Index columns used in WHERE and ORDER BY',
          'Composite index order matters',
          'Every index slows writes',
          'Check the generated SQL for surprises',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'orm-performance',
      q: 'When does a queryset run SQL?',
      options: ['When created', 'When iterated, sliced or evaluated', 'At import time', 'Never'],
      answer: 1,
      explain: 'Querysets are lazy.',
    },
    {
      chapterId: 'orm-performance',
      q: 'What fixes an N+1 on a foreign key?',
      options: ['prefetch_related', 'select_related', 'only()', 'filter()'],
      answer: 1,
      explain: 'select_related joins the related row.',
    },
    {
      chapterId: 'orm-performance',
      q: 'What is prefetch_related for?',
      options: ['Foreign keys', 'Many-to-many and reverse relations', 'Indexes', 'Migrations'],
      answer: 1,
      explain: 'It batches a separate query.',
    },
    {
      chapterId: 'orm-performance',
      q: 'Why add an index?',
      options: ['To slow writes', 'To speed up filters and ordering on a column', 'To encrypt data', 'To run migrations'],
      answer: 1,
      explain: 'Indexes speed up reads.',
    },
  ],
};
