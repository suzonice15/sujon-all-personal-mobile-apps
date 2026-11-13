// Angular chapter: Routing.

export default {
  id: 'routing',
  title: 'Routing & Navigation',
  description: 'Routes, params, guards and lazy loading',
  icon: 'alt-route',
  lessons: [
    {
      id: 'ng-routes',
      title: 'Configuring routes',
      blocks: [
        { type: 'text', value: 'The Angular router maps URL paths to components. A route can have a path, a component and child routes. The router outlet renders the matched component.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Routes, RouterOutlet, RouterLink } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: '**', component: NotFoundComponent },
];

// app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: \`
    <nav><a routerLink="/courses">Courses</a></nav>
    <router-outlet />
  \`,
})
export class AppComponent {}` },
        { type: 'note', value: 'The ** route is the fallback for unknown URLs. Put it last, or it will match everything.' },
      ],
    },
    {
      id: 'ng-params',
      title: 'Route parameters and query params',
      blocks: [
        { type: 'text', value: 'Read route parameters with ActivatedRoute. Params change while the component stays alive, so subscribe to the param stream instead of reading once.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ /* ... */ })
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  id = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
      // load the course for this id
    });
  }
}` },
        { type: 'note', value: 'Query parameters use queryParamMap. Use them for filters and pagination, and route params for identity.' },
      ],
    },
    {
      id: 'ng-guards-lazy',
      title: 'Guards and lazy loading',
      blocks: [
        { type: 'text', value: 'A guard decides whether navigation may proceed, such as requiring login. Lazy loading splits a feature into its own bundle, so the first load is smaller.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then(m => m.COURSES_ROUTES),
  },
];` },
        { type: 'note', value: 'Lazy load large features, not tiny ones. Each chunk has a request cost, so group related routes.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'routing',
      q: 'Which route matches unknown URLs?',
      options: ['path: ""', 'path: "**"', 'path: "404"', 'path: "all"'],
      answer: 1,
      explain: 'The ** wildcard is the fallback.',
    },
    {
      chapterId: 'routing',
      q: 'How do you read a route parameter?',
      options: ['From window.location', 'From ActivatedRoute paramMap', 'From a pipe', 'From a service only'],
      answer: 1,
      explain: 'ActivatedRoute exposes the params.',
    },
    {
      chapterId: 'routing',
      q: 'Why subscribe to paramMap instead of reading once?',
      options: ['It is faster', 'The param can change while the component stays alive', 'It is required', 'It avoids imports'],
      answer: 1,
      explain: 'Params can change on navigation within the same component.',
    },
    {
      chapterId: 'routing',
      q: 'What does lazy loading do?',
      options: ['Loads everything upfront', 'Splits a feature into its own bundle loaded on demand', 'Deletes routes', 'Caches data'],
      answer: 1,
      explain: 'It reduces the initial bundle size.',
    },
  ],
};
