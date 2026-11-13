// Angular chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Angular is, the CLI and your first app',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ng-what-is',
      title: 'What is Angular?',
      blocks: [
        { type: 'text', value: 'Angular is a framework for building large, structured web applications with TypeScript. It includes components, dependency injection, routing, forms, HTTP and a CLI. It is opinionated, which makes big teams consistent.' },
        { type: 'list', items: [
          'TypeScript-first',
          'Components with templates',
          'Built-in dependency injection',
          'Routing, forms and HTTP included',
          'Powerful CLI for code generation',
          'Signals for reactive state',
        ] },
        { type: 'note', value: 'Angular is a strong choice for large enterprise apps and teams that want one clear way to structure code. React is lighter and more flexible.' },
      ],
    },
    {
      id: 'ng-cli-setup',
      title: 'The CLI',
      blocks: [
        { type: 'text', value: 'The Angular CLI creates projects, components, services and builds. It handles bundling, dev server and production builds. Use it instead of wiring tools by hand.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npm install -g @angular/cli
ng new codenest
cd codenest
ng serve

ng generate component courses/course-list
ng generate service courses/course
ng build --configuration production` },
        { type: 'note', value: 'ng serve runs a dev server with live reload. ng build creates the production bundle, which is static files you can host anywhere.' },
      ],
    },
    {
      id: 'ng-first-app',
      title: 'Your first component',
      blocks: [
        { type: 'text', value: 'An Angular app starts with a root component, usually AppComponent. A component has a TypeScript class, an HTML template and optional styles. The @Component decorator connects them.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <h1>Hello, Angular</h1>
    <p>Welcome to CodeNest</p>
  \`,
})
export class AppComponent {}` },
        { type: 'note', value: 'Standalone components are the modern default. They declare their own imports and need no NgModule.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What language does Angular use?',
      options: ['JavaScript only', 'TypeScript', 'Python', 'Java'],
      answer: 1,
      explain: 'Angular is TypeScript-first.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which command starts the dev server?',
      options: ['ng build', 'ng serve', 'ng new', 'ng test'],
      answer: 1,
      explain: 'ng serve runs the development server.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does the @Component decorator do?',
      options: ['Creates a database', 'Connects a class to its template and styles', 'Starts the server', 'Runs tests'],
      answer: 1,
      explain: 'It declares the selector, template and styles.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a standalone component?',
      options: ['A component with no template', 'A component that declares its own imports without an NgModule', 'A component for mobile', 'A test component'],
      answer: 1,
      explain: 'Standalone components manage their own imports.',
    },
  ],
};
