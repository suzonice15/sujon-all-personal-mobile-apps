// Spring Boot chapter: Data Access with Spring Data JPA.

export default {
  id: 'data-jpa',
  title: 'Data with JPA',
  description: 'Entities, repositories, queries and transactions',
  icon: 'storage',
  lessons: [
    {
      id: 'sb-entity',
      title: 'Entities and repositories',
      blocks: [
        { type: 'text', value: 'A JPA entity is a Java class mapped to a database table. Spring Data JPA gives you a repository interface, and it writes the implementation for you. Methods such as save, findById and findAll work with no SQL.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private int price;

    protected Course() {}   // JPA needs a no-argument constructor

    public Course(String title, int price) {
        this.title = title;
        this.price = price;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public int getPrice() { return price; }
}

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByPriceLessThan(int price);
}` },
        { type: 'note', value: 'findByPriceLessThan is a derived query: Spring reads the method name and writes the SQL. Keep names clear, and switch to @Query when the name gets too long.' },
      ],
    },
    {
      id: 'sb-queries',
      title: 'Custom queries',
      blocks: [
        { type: 'text', value: 'For a query that is hard to name, write JPQL with @Query. Use named parameters with @Param, never string concatenation, to avoid SQL injection.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("select c from Course c where c.price between :min and :max order by c.title")
    List<Course> findInPriceRange(@Param("min") int min, @Param("max") int max);
}` },
        { type: 'list', items: [
          'Derived queries - the method name describes the query',
          '@Query - JPQL, with named parameters',
          'Pagination - pass a Pageable to avoid loading everything',
          'Add indexes for columns you search on often',
        ] },
      ],
    },
    {
      id: 'sb-transactions',
      title: 'Transactions',
      blocks: [
        { type: 'text', value: 'A transaction makes several database changes succeed or fail together. Put @Transactional on a service method that changes data. If a runtime exception is thrown, Spring rolls the whole method back.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.transaction.annotation.Transactional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollments;
    private final CourseRepository courses;

    public EnrollmentService(EnrollmentRepository enrollments, CourseRepository courses) {
        this.enrollments = enrollments;
        this.courses = courses;
    }

    @Transactional
    public void enroll(Long userId, Long courseId) {
        Course course = courses.findById(courseId).orElseThrow();
        enrollments.save(new Enrollment(userId, course.getId()));
        course.markPopular();   // both changes commit together or not at all
    }
}` },
        { type: 'note', value: 'Keep transactions short and put them in the service layer, not the controller. A long transaction holds database locks and slows the whole system.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'data-jpa',
      q: 'What does @Entity mark?',
      options: ['A controller', 'A class mapped to a database table', 'A test', 'A bean scope'],
      answer: 1,
      explain: 'Entities are persisted to a table.',
    },
    {
      chapterId: 'data-jpa',
      q: 'What is a derived query?',
      options: ['A query written by hand in SQL', 'A query Spring builds from the repository method name', 'A cached result', 'A migration'],
      answer: 1,
      explain: 'findByPriceLessThan becomes the matching SQL.',
    },
    {
      chapterId: 'data-jpa',
      q: 'Why use named parameters with @Query?',
      options: ['They are faster', 'They prevent SQL injection', 'They are required by Java', 'They sort results'],
      answer: 1,
      explain: 'Parameters are bound safely instead of concatenated into the query.',
    },
    {
      chapterId: 'data-jpa',
      q: 'What happens when a runtime exception leaves a @Transactional method?',
      options: ['Changes are committed anyway', 'All database changes in the method are rolled back', 'Only the last change is saved', 'The app restarts'],
      answer: 1,
      explain: 'The transaction is rolled back so changes succeed or fail together.',
    },
  ],
};
