// Spring Boot chapter: Testing.

export default {
  id: 'testing',
  title: 'Testing',
  description: 'JUnit, MockMvc, slice tests and mocks',
  icon: 'bug-report',
  lessons: [
    {
      id: 'sb-unit-tests',
      title: 'Unit tests with JUnit and Mockito',
      blocks: [
        { type: 'text', value: 'A unit test checks one class in isolation. Mockito replaces the dependencies with mocks, so the test controls what they return. No database and no web server are started, so these tests are fast.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;

class CourseServiceTest {

    @Test
    void countsCourses() {
        CourseRepository repository = mock(CourseRepository.class);
        when(repository.titles()).thenReturn(List.of("SQL", "Java"));

        CourseService service = new CourseService(repository);

        assertThat(service.count()).isEqualTo(2);
    }
}` },
        { type: 'note', value: 'Constructor injection makes these tests easy: you pass the mock straight into the constructor, with no Spring context needed.' },
      ],
    },
    {
      id: 'sb-mockmvc',
      title: 'Testing controllers with MockMvc',
      blocks: [
        { type: 'text', value: '@WebMvcTest starts only the web layer and replaces the services with mocks. MockMvc sends fake HTTP requests and checks the status, the JSON and the headers, without starting a real server.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CourseController.class)
class CourseControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    CourseService service;

    @Test
    void returnsNotFoundForUnknownCourse() throws Exception {
        mvc.perform(get("/api/courses/99"))
           .andExpect(status().isNotFound());
    }
}` },
        { type: 'note', value: 'A slice test is much faster than a full @SpringBootTest. Use full tests for a few end-to-end checks, and slices for most of the coverage.' },
      ],
    },
    {
      id: 'sb-integration',
      title: 'Integration tests',
      blocks: [
        { type: 'text', value: '@SpringBootTest starts the whole application context. Combined with an in-memory database such as H2, it tests the real wiring from the controller down to the database. Keep these tests focused on critical paths.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CoursesIntegrationTest {

    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate rest;

    @Test
    void healthEndpointIsUp() {
        var response = rest.getForEntity("http://localhost:" + port + "/actuator/health", String.class);
        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
    }
}` },
        { type: 'note', value: 'Test against an in-memory database only for speed. Also run a few tests against the same database engine you use in production, because H2 is not identical to PostgreSQL.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing',
      q: 'What does Mockito do in a unit test?',
      options: ['Starts a database', 'Replaces dependencies with mocks that return set values', 'Deploys the app', 'Formats the code'],
      answer: 1,
      explain: 'Mocks let the test control the dependencies.',
    },
    {
      chapterId: 'testing',
      q: 'What does @WebMvcTest start?',
      options: ['The whole application', 'Only the web layer', 'A real database', 'A browser'],
      answer: 1,
      explain: 'It is a slice test focused on controllers.',
    },
    {
      chapterId: 'testing',
      q: 'Which annotation starts the full application context for a test?',
      options: ['@WebMvcTest', '@SpringBootTest', '@Mock', '@Entity'],
      answer: 1,
      explain: 'SpringBootTest loads the full context.',
    },
    {
      chapterId: 'testing',
      q: 'Why are constructor-injected services easy to unit test?',
      options: ['They need no tests', 'You pass mocks directly into the constructor', 'They use static fields', 'They skip the database'],
      answer: 1,
      explain: 'No Spring context is needed to create the object.',
    },
  ],
};
