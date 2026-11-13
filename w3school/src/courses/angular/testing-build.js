// Angular chapter: Testing & Build.

export default {
  id: 'testing-build',
  title: 'Testing & Build',
  description: 'Unit tests, build sizes and deployment',
  icon: 'build',
  lessons: [
    {
      id: 'ng-unit-tests',
      title: 'Unit tests',
      blocks: [
        { type: 'text', value: 'Angular projects ship with a test runner and TestBed. TestBed creates a component with its dependencies, and fixtures let you read the DOM. Test behaviour, not implementation details.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [CourseCardComponent],
  }));

  it('shows the title', () => {
    const fixture = TestBed.createComponent(CourseCardComponent);
    fixture.componentInstance.title = 'Angular';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
  });
});` },
        { type: 'note', value: 'Call detectChanges after changing state, or the DOM will not update in the test.' },
      ],
    },
    {
      id: 'ng-service-tests',
      title: 'Testing services',
      blocks: [
        { type: 'text', value: 'Test a service with TestBed and a fake dependency. For HTTP, use provideHttpClientTesting to control the responses without a real network.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CourseService);
    http = TestBed.inject(HttpTestingController);
  });

  it('loads courses', () => {
    service.all().subscribe(courses => expect(courses.length).toBe(2));
    const req = http.expectOne('/api/courses');
    req.flush([{ id: 1, title: 'A', price: 1 }, { id: 2, title: 'B', price: 2 }]);
  });
});` },
        { type: 'note', value: 'HttpTestingController fails the test if an unexpected request is made, which catches accidental network calls.' },
      ],
    },
    {
      id: 'ng-build-deploy',
      title: 'Build and deploy',
      blocks: [
        { type: 'text', value: 'ng build --configuration production creates an optimized bundle with hashed filenames. Deploy the dist folder to any static host or CDN. Check the bundle size and lazy chunks.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ng build --configuration production
# output: dist/codenest/browser

# Serve locally to check
npx http-server dist/codenest/browser -p 4200` },
        { type: 'list', items: [
          'Use budget limits to catch bundle bloat',
          'Lazy load large features',
          'Enable hashing for cache busting',
          'Set the base href for subpath hosting',
          'Test the production build, not only the dev server',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-build',
      q: 'What does TestBed do?',
      options: ['Builds the app', 'Creates a component with its dependencies for tests', 'Routes URLs', 'Caches data'],
      answer: 1,
      explain: 'TestBed configures the test environment.',
    },
    {
      chapterId: 'testing-build',
      q: 'Why call detectChanges in a test?',
      options: ['To run the build', 'To update the DOM after changing state', 'To route', 'To cache'],
      answer: 1,
      explain: 'The DOM updates on change detection.',
    },
    {
      chapterId: 'testing-build',
      q: 'What does HttpTestingController do?',
      options: ['Makes real requests', 'Lets you flush controlled HTTP responses', 'Caches results', 'Creates routes'],
      answer: 1,
      explain: 'It replaces the real backend.',
    },
    {
      chapterId: 'testing-build',
      q: 'Why test the production build?',
      options: ['It is faster', 'Minification and lazy chunks can break things the dev server hides', 'It is required', 'To avoid tests'],
      answer: 1,
      explain: 'Production behaviour differs from dev.',
    },
  ],
};
