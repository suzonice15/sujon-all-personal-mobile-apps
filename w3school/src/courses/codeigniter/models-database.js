// CodeIgniter chapter: Models & Database.

export default {
  id: 'models-database',
  title: 'Models & Database',
  description: 'Query builder, models and migrations',
  icon: 'storage',
  lessons: [
    {
      id: 'ci-models',
      title: 'Models',
      blocks: [
        { type: 'text', value: 'A model is a class that talks to a table. Extend Model, set the table and allowed fields, and use find, insert and update helpers. Return typed arrays or entities.' },
        { type: 'code', lang: 'php', tryIt: false, value: `class CourseModel extends Model
{
    protected $table = 'courses';
    protected $primaryKey = 'id';
    protected $allowedFields = ['title', 'price', 'published'];
    protected $useTimestamps = true;

    public function published()
    {
        return $this->where('published', 1)->findAll();
    }
}` },
        { type: 'note', value: 'allowedFields limits mass assignment. Never include an admin or price field that a client should not set.' },
      ],
    },
    {
      id: 'ci-query-builder',
      title: 'Query builder',
      blocks: [
        { type: 'text', value: 'The query builder composes SQL with methods and binds values safely. Use it for joins and reports that a model helper does not cover.' },
        { type: 'code', lang: 'php', tryIt: false, value: `$db = db_connect();

$rows = $db->table('courses c')
    ->select('c.id, c.title, COUNT(e.id) AS enrollments')
    ->join('enrollments e', 'e.course_id = c.id', 'left')
    ->where('c.published', 1)
    ->groupBy('c.id')
    ->orderBy('enrollments', 'DESC')
    ->limit(10)
    ->get()
    ->getResultArray();` },
        { type: 'note', value: 'Bind values with the builder, not string concatenation. That is what prevents SQL injection.' },
      ],
    },
    {
      id: 'ci-migrations',
      title: 'Migrations',
      blocks: [
        { type: 'text', value: 'Migrations version the schema. Create one with spark, define the table in up() and the reverse in down(), then migrate. Commit migrations with the code.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// php spark make:migration AddCourses
public function up()
{
    $this->forge->addField([
        'id' => ['type' => 'INT', 'unsigned' => true, 'auto_increment' => true],
        'title' => ['type' => 'VARCHAR', 'constraint' => 200],
        'price' => ['type' => 'INT', 'default' => 0],
    ]);
    $this->forge->addKey('id', true);
    $this->forge->createTable('courses');
}` },
        { type: 'list', items: [
          'One migration per schema change',
          'Always implement down()',
          'Run migrate as a deploy step',
          'Never edit an applied migration',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'models-database',
      q: 'What does allowedFields do?',
      options: ['Lists columns to display', 'Limits mass assignment', 'Creates indexes', 'Sets timestamps'],
      answer: 1,
      explain: 'It protects against mass assignment.',
    },
    {
      chapterId: 'models-database',
      q: 'Why use the query builder?',
      options: ['It is shorter', 'It binds values safely and prevents injection', 'It runs faster', 'It creates tables'],
      answer: 1,
      explain: 'Binding prevents SQL injection.',
    },
    {
      chapterId: 'models-database',
      q: 'What does a migration do?',
      options: ['Seeds demo data', 'Versions a schema change', 'Compiles PHP', 'Creates routes'],
      answer: 1,
      explain: 'Migrations version the schema.',
    },
    {
      chapterId: 'models-database',
      q: 'Why implement down()?',
      options: ['For style', 'To roll back the migration', 'To speed up queries', 'To add indexes'],
      answer: 1,
      explain: 'Rollback needs the reverse.',
    },
  ],
};
