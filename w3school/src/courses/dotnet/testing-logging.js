// .NET chapter: Testing, Debugging and Logging.

export default {
  id: 'testing-logging',
  title: 'Testing & Logging',
  description: 'xUnit, mocks, debugging and structured logs',
  icon: 'bug-report',
  lessons: [
    {
      id: 'dn-xunit',
      title: 'Unit testing with xUnit',
      blocks: [
        { type: 'text', value: 'A unit test checks one small behaviour. xUnit uses [Fact] for a single test and [Theory] with [InlineData] for several inputs. Assert states the expected result.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_ReturnsSum()
    {
        var calculator = new Calculator();
        int result = calculator.Add(2, 3);
        Assert.Equal(5, result);
    }

    [Theory]
    [InlineData(1, 1, 2)]
    [InlineData(2, 3, 5)]
    public void Add_WorksForSeveralInputs(int a, int b, int expected)
    {
        Assert.Equal(expected, new Calculator().Add(a, b));
    }
}` },
        { type: 'note', value: 'Test behaviour, not private details. A test that breaks every time you rename a private method is a burden, not a safety net.' },
      ],
    },
    {
      id: 'dn-integration-tests',
      title: 'Testing services and endpoints',
      blocks: [
        { type: 'text', value: 'Test a service with a fake dependency, which is quick. Test an endpoint with WebApplicationFactory, which starts the real pipeline in memory. Together they cover logic and wiring.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `public class CoursesApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient client;

    public CoursesApiTests(WebApplicationFactory<Program> factory)
    {
        client = factory.CreateClient();
    }

    [Fact]
    public async Task Health_ReturnsOk()
    {
        var response = await client.GetAsync("/api/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}` },
        { type: 'note', value: 'Integration tests need Program to be visible to the test project, for example with a public partial class Program declaration.' },
      ],
    },
    {
      id: 'dn-logging',
      title: 'Debugging and logging',
      blocks: [
        { type: 'text', value: 'Start with the debugger for local logic. For running systems, use ILogger with structured messages. Named placeholders keep the values searchable instead of building a string.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `public class CourseService(ILogger<CourseService> logger)
{
    public void Add(string title)
    {
        logger.LogInformation("Adding course {Title}", title);
    }
}` },
        { type: 'list', items: [
          'Debugger for local logic and breakpoints',
          'ILogger for application events, with levels and categories',
          'Never log passwords, tokens or personal data',
          'Use a correlation id to follow one request across services',
        ] },
        { type: 'note', value: 'Console.WriteLine has no level, no category and no filtering. ILogger lets production choose what to keep.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-logging',
      q: 'Which attribute marks a single xUnit test?',
      options: ['[Test]', '[Fact]', '[TestMethod]', '[UnitTest]'],
      answer: 1,
      explain: 'xUnit uses [Fact] for one test and [Theory] for data-driven tests.',
    },
    {
      chapterId: 'testing-logging',
      q: 'Which class starts the app in memory for endpoint tests?',
      options: ['WebApplicationFactory', 'DbContext', 'HttpPost', 'ILogger'],
      answer: 0,
      explain: 'WebApplicationFactory hosts the real pipeline for tests.',
    },
    {
      chapterId: 'testing-logging',
      q: 'Why use ILogger instead of Console.WriteLine?',
      options: ['It is shorter', 'It supports levels, categories and filtering', 'It is required', 'It runs faster'],
      answer: 1,
      explain: 'Logging can be filtered, shipped and searched.',
    },
    {
      chapterId: 'testing-logging',
      q: 'Why use named placeholders in log messages?',
      options: ['They keep values structured and searchable', 'They make the message longer', 'They disable logging', 'They encrypt the message'],
      answer: 0,
      explain: 'Structured values can be queried by field.',
    },
  ],
};
