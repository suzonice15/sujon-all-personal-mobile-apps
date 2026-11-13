// Angular chapter: HTTP & Observables.

export default {
  id: 'http-observables',
  title: 'HTTP & Observables',
  description: 'HttpClient, RxJS operators and async data',
  icon: 'cloud-download',
  lessons: [
    {
      id: 'ng-http',
      title: 'HttpClient',
      blocks: [
        { type: 'text', value: 'HttpClient makes HTTP requests and returns Observables. Import provideHttpClient in the app config, inject HttpClient, and subscribe or use the async pipe to consume the result.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface Course { id: number; title: string; price: number; }

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);
  private url = '/api/courses';

  all() { return this.http.get<Course[]>(this.url); }
  one(id: number) { return this.http.get<Course>(this.url + '/' + id); }
  create(course: Omit<Course, 'id'>) { return this.http.post<Course>(this.url, course); }
}` },
        { type: 'note', value: 'Type the response with a generic. HttpClient does not validate the shape at runtime, so keep the server contract in sync.' },
      ],
    },
    {
      id: 'ng-rxjs',
      title: 'RxJS operators',
      blocks: [
        { type: 'text', value: 'Observables stream values over time. Operators transform them: map changes each value, filter removes values, switchMap cancels the previous request when a new one starts, and catchError handles failures.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

search = new FormControl('');

results$ = this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term =>
    this.service.search(term ?? '').pipe(
      catchError(() => of([]))
    )
  ),
);` },
        { type: 'note', value: 'Use switchMap for search. mergeMap keeps every request running, which is usually wrong for typing.' },
      ],
    },
    {
      id: 'ng-async-pipe',
      title: 'The async pipe and cleanup',
      blocks: [
        { type: 'text', value: 'The async pipe subscribes to an Observable in the template and unsubscribes automatically. If you subscribe in code, unsubscribe in ngOnDestroy or use takeUntilDestroyed.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `@Component({
  template: \`
    @if (courses$ | async; as courses) {
      <ul>@for (c of courses; track c.id) { <li>{{ c.title }}</li> }</ul>
    } @else {
      <p>Loading...</p>
    }
  \`,
})
export class CourseListComponent {
  private service = inject(CourseService);
  courses$ = this.service.all();
}` },
        { type: 'note', value: 'A subscription that is never cleaned up leaks memory and can update a destroyed component. Prefer the async pipe.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'http-observables',
      q: 'What does HttpClient return?',
      options: ['A Promise', 'An Observable', 'A string', 'A component'],
      answer: 1,
      explain: 'HttpClient returns Observables.',
    },
    {
      chapterId: 'http-observables',
      q: 'Which operator is best for a search box?',
      options: ['mergeMap', 'switchMap', 'concatMap', 'map only'],
      answer: 1,
      explain: 'switchMap cancels the previous request.',
    },
    {
      chapterId: 'http-observables',
      q: 'What does the async pipe do?',
      options: ['Caches data', 'Subscribes to an Observable and unsubscribes automatically', 'Creates a service', 'Routes a URL'],
      answer: 1,
      explain: 'It manages the subscription lifecycle.',
    },
    {
      chapterId: 'http-observables',
      q: 'Why clean up subscriptions?',
      options: ['To make code shorter', 'To avoid memory leaks and updates on destroyed components', 'It is required by RxJS', 'To cache data'],
      answer: 1,
      explain: 'Leaked subscriptions cause bugs.',
    },
  ],
};
