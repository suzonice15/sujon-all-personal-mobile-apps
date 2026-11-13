// Angular chapter: Services & Dependency Injection.

export default {
  id: 'services-di',
  title: 'Services & DI',
  description: 'Injectable services, providers and inject()',
  icon: 'account-tree',
  lessons: [
    {
      id: 'ng-services',
      title: 'Services',
      blocks: [
        { type: 'text', value: 'A service holds logic and state that several components share, such as an API client or a cart. Mark it @Injectable so Angular can create and inject it. Keep components focused on the view.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses = ['HTML', 'Angular', 'GraphQL'];

  all(): string[] {
    return this.courses;
  }

  add(title: string) {
    this.courses.push(title);
  }
}` },
        { type: 'note', value: 'providedIn: root registers the service as a singleton for the whole app. Use a component-level provider when each component needs its own instance.' },
      ],
    },
    {
      id: 'ng-inject',
      title: 'Injecting dependencies',
      blocks: [
        { type: 'text', value: 'Modern Angular uses the inject() function in a field initializer. It works in components, directives, pipes and other services, and it reads better with TypeScript.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Component, inject } from '@angular/core';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  template: \`
    <ul>
      @for (c of courses; track c) { <li>{{ c }}</li> }
    </ul>
  \`,
})
export class CourseListComponent {
  private service = inject(CourseService);
  courses = this.service.all();
}` },
        { type: 'note', value: 'The old constructor injection still works. inject() is shorter and works in more places, but keep it at the top of the class.' },
      ],
    },
    {
      id: 'ng-hierarchical-di',
      title: 'Hierarchical injectors',
      blocks: [
        { type: 'text', value: 'Angular has a tree of injectors. A provider at the root creates one shared instance. A provider on a component creates an instance for that component and its children. This lets you scope state to a feature.' },
        { type: 'list', items: [
          'Root provider: one shared singleton',
          'Component provider: one instance per component subtree',
          'Route-level providers scope state to a lazy-loaded feature',
          'Tokens and useValue allow injecting configuration',
          'Override providers in tests easily',
        ] },
        { type: 'note', value: 'A cart service provided at the root is shared by every page. A cart service provided on the checkout component is separate, which is often a bug.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'services-di',
      q: 'What is a service for?',
      options: ['Styling', 'Shared logic and state', 'Routing only', 'Testing only'],
      answer: 1,
      explain: 'Services hold shared logic and state.',
    },
    {
      chapterId: 'services-di',
      q: 'What does providedIn: root do?',
      options: ['Creates a component', 'Registers one singleton for the whole app', 'Routes a path', 'Adds a pipe'],
      answer: 1,
      explain: 'It creates a root-level singleton.',
    },
    {
      chapterId: 'services-di',
      q: 'What does inject() do?',
      options: ['Creates a service', 'Retrieves a dependency from the injector', 'Starts the app', 'Routes a URL'],
      answer: 1,
      explain: 'inject() resolves a dependency.',
    },
    {
      chapterId: 'services-di',
      q: 'Why provide a service on a component instead of root?',
      options: ['It is faster', 'To give that component subtree its own instance', 'To avoid imports', 'It is required'],
      answer: 1,
      explain: 'Component providers scope the instance.',
    },
  ],
};
