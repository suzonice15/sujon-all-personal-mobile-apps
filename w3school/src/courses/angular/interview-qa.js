// Angular interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Angular?',
      a: 'A TypeScript framework for building large web apps with components, dependency injection, routing, forms and HTTP built in.',
      level: 'basic',
    },
    {
      q: 'What does the Angular CLI do?',
      a: 'It creates projects and code, runs the dev server, builds production bundles and runs tests.',
      level: 'basic',
    },
    {
      q: 'What is a standalone component?',
      a: 'A component that declares its own imports and needs no NgModule. It is the modern default.',
      level: 'basic',
    },
    {
      q: 'What does the @Component decorator define?',
      a: 'The selector, template and styles that connect a class to its view.',
      level: 'basic',
    },
  ],
  'components-templates': [
    {
      q: 'What is interpolation?',
      a: '{{ }} displays component data in the template and escapes HTML by default.',
      level: 'basic',
    },
    {
      q: 'How does a child communicate with a parent?',
      a: 'With @Output and an EventEmitter. The parent listens to the emitted event.',
      level: 'basic',
    },
    {
      q: 'Why load data in ngOnInit?',
      a: 'Inputs are set before ngOnInit but not in the constructor, so data loading has the values it needs.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between property and event binding?',
      a: 'Property binding [x]="v" sets a DOM property. Event binding (click)="fn()" listens for an event.',
      level: 'basic',
    },
  ],
  'directives-pipes': [
    {
      q: 'What replaced *ngIf and *ngFor?',
      a: 'The built-in control flow blocks @if, @for and @switch.',
      level: 'basic',
    },
    {
      q: 'Why provide track in @for?',
      a: 'So Angular can match items across renders and reuse DOM nodes.',
      level: 'intermediate',
    },
    {
      q: 'What is a pipe?',
      a: 'A class with a transform method that changes a value for display, such as date, currency or a custom format.',
      level: 'basic',
    },
    {
      q: 'Pure versus impure pipe?',
      a: 'A pure pipe runs only when its input changes. An impure pipe runs on every change detection, which is expensive.',
      level: 'advanced',
    },
  ],
  'services-di': [
    {
      q: 'What is a service?',
      a: 'A class that holds shared logic or state, marked @Injectable so Angular can provide it.',
      level: 'basic',
    },
    {
      q: 'What does providedIn: root mean?',
      a: 'One singleton instance is shared across the whole application.',
      level: 'basic',
    },
    {
      q: 'What does inject() do?',
      a: 'It retrieves a dependency from the injector in a field initializer or constructor.',
      level: 'intermediate',
    },
    {
      q: 'How does hierarchical injection work?',
      a: 'Angular walks up the injector tree. A provider on a component gives that subtree its own instance.',
      level: 'advanced',
    },
  ],
  routing: [
    {
      q: 'What is the wildcard route?',
      a: 'path: "**" matches unknown URLs. Put it last.',
      level: 'basic',
    },
    {
      q: 'How do you read a route parameter?',
      a: 'Inject ActivatedRoute and subscribe to paramMap, or read the snapshot for one-time use.',
      level: 'basic',
    },
    {
      q: 'What does a guard do?',
      a: 'It decides whether navigation may proceed, such as requiring authentication.',
      level: 'intermediate',
    },
    {
      q: 'How does lazy loading work?',
      a: 'loadChildren or loadComponent returns a dynamic import, so the feature is a separate bundle loaded on demand.',
      level: 'intermediate',
    },
  ],
  forms: [
    {
      q: 'Reactive versus template-driven forms?',
      a: 'Reactive forms define the model in TypeScript and are easier to test. Template-driven forms use ngModel and are simpler for small forms.',
      level: 'basic',
    },
    {
      q: 'What does a validator return when valid?',
      a: 'null. When invalid it returns an object describing the error.',
      level: 'intermediate',
    },
    {
      q: 'How do you disable submit while invalid?',
      a: 'Bind [disabled]="form.invalid" and also check form.valid in the submit handler.',
      level: 'basic',
    },
    {
      q: 'Why validate on the server too?',
      a: 'Client validation is for user experience. The server is the security boundary.',
      level: 'basic',
    },
  ],
  'http-observables': [
    {
      q: 'What does HttpClient return?',
      a: 'An Observable. Subscribe to it or use the async pipe in the template.',
      level: 'basic',
    },
    {
      q: 'switchMap versus mergeMap?',
      a: 'switchMap cancels the previous inner observable; mergeMap keeps all of them running. Use switchMap for search.',
      level: 'intermediate',
    },
    {
      q: 'What does the async pipe do?',
      a: 'It subscribes to an Observable and unsubscribes automatically when the view is destroyed.',
      level: 'basic',
    },
    {
      q: 'Why clean up subscriptions?',
      a: 'Leaked subscriptions hold memory and can update a component after it is destroyed.',
      level: 'intermediate',
    },
  ],
  'state-signals': [
    {
      q: 'What is a signal?',
      a: 'A reactive value that notifies dependents when it changes.',
      level: 'basic',
    },
    {
      q: 'What is a computed signal?',
      a: 'A derived value that is cached and recomputed only when one of its dependencies changes.',
      level: 'intermediate',
    },
    {
      q: 'What is an effect for?',
      a: 'Running side effects when signals change, such as saving to storage or logging.',
      level: 'intermediate',
    },
    {
      q: 'Signals versus RxJS?',
      a: 'Signals are pull-based and synchronous for template state. RxJS is stronger for streams of events over time and complex async composition.',
      level: 'advanced',
    },
  ],
  'testing-build': [
    {
      q: 'What does TestBed do?',
      a: 'It configures a testing module and creates components or services with their dependencies.',
      level: 'basic',
    },
    {
      q: 'Why call detectChanges?',
      a: 'To run change detection and update the DOM after changing component state in a test.',
      level: 'intermediate',
    },
    {
      q: 'How do you test HTTP?',
      a: 'Use provideHttpClientTesting and HttpTestingController to flush controlled responses.',
      level: 'intermediate',
    },
    {
      q: 'Why test the production build?',
      a: 'Minification, hashing and lazy chunks can break behaviour the dev server hides.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you structure an Angular app?',
      a: 'Feature folders with routes, components, services and tests, plus a shared folder for pipes and directives.',
      level: 'intermediate',
    },
    {
      q: 'How do you share state across features?',
      a: 'A service provided at root with signals or RxJS, or a store such as NgRx for large teams.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug a slow Angular page?',
      a: 'Check the bundle size and lazy chunks, find expensive change detection, and profile with the browser devtools.',
      level: 'advanced',
    },
    {
      q: 'What is the best first Angular step?',
      a: 'Build one component, one route and one service call, then add forms and state.',
      level: 'basic',
    },
  ],
};
