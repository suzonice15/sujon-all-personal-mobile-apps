// Django chapter: Models & Migrations.

export default {
  id: 'models-migrations',
  title: 'Models & Migrations',
  description: 'Define tables in Python and evolve the schema',
  icon: 'storage',
  lessons: [
    {
      id: 'dj-models',
      title: 'Models',
      blocks: [
        { type: 'text', value: 'A model is a Python class that maps to a database table. Each field is a column. Django generates the SQL and gives you a query API.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    price = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title` },
        { type: 'note', value: 'Use PositiveIntegerField for prices in the smallest currency unit, or DecimalField for exact money. Never use FloatField for currency.' },
      ],
    },
    {
      id: 'dj-migrations',
      title: 'Migrations',
      blocks: [
        { type: 'text', value: 'A migration is a versioned change to the database schema, generated from your models. Apply migrations in order and commit them with the code.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `python manage.py makemigrations
python manage.py migrate

# See the SQL a migration will run
python manage.py sqlmigrate courses 0001` },
        { type: 'list', items: [
          'Create a migration after every model change',
          'Review the generated file before applying',
          'Never edit an applied migration; add a new one',
          'Run migrations as a deploy step, not only at startup',
        ] },
      ],
    },
    {
      id: 'dj-relations',
      title: 'Relationships',
      blocks: [
        { type: 'text', value: 'ForeignKey is many-to-one, ManyToManyField is many-to-many and OneToOneField is one-to-one. Choose on_delete deliberately: CASCADE, PROTECT or SET_NULL.' },
        { type: 'code', lang: 'python', tryIt: false, value: `class Lesson(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="lessons",
    )
    title = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        unique_together = [("course", "order")]` },
        { type: 'note', value: 'related_name lets you write course.lessons.all(). Without it the reverse name is lesson_set, which is less readable.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'models-migrations',
      q: 'What does a model represent?',
      options: ['A URL', 'A database table', 'A template', 'A view'],
      answer: 1,
      explain: 'A model maps to a table.',
    },
    {
      chapterId: 'models-migrations',
      q: 'Which field type is right for money?',
      options: ['FloatField', 'DecimalField or an integer of the smallest unit', 'CharField', 'BooleanField'],
      answer: 1,
      explain: 'Float has rounding errors; use exact types.',
    },
    {
      chapterId: 'models-migrations',
      q: 'What does on_delete=PROTECT do?',
      options: ['Deletes children', 'Blocks deleting a parent that still has children', 'Sets null', 'Ignores the delete'],
      answer: 1,
      explain: 'PROTECT prevents the parent delete.',
    },
    {
      chapterId: 'models-migrations',
      q: 'Why commit migrations with the code?',
      options: ['To save disk', 'So every environment applies the same schema changes', 'To speed up queries', 'To enable admin'],
      answer: 1,
      explain: 'Migrations are part of the deployment.',
    },
  ],
};
