// Angular chapter: Components & Templates.

export default {
  id: 'components-templates',
  title: 'Components & Templates',
  description: 'Interpolation, binding, events and inputs',
  icon: 'widgets',
  lessons: [
    {
      id: 'ng-interpolation-binding',
      title: 'Interpolation and binding',
      blocks: [
        { type: 'text', value: 'A template displays component data with interpolation {{ }}. Property binding [property]="value" sets an element property. Event binding (click)="method()" listens for events. Two-way binding [(ngModel)] keeps an input and a property in sync.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Component } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  template: \`
    <h3>{{ course.title }}</h3>
    <p>{{ course.price }} Tk</p>
    <img [src]="course.image" [alt]="course.title" />
    <button (click)="enroll()">Enroll</button>
  \`,
})
export class CourseCardComponent {
  course = { title: 'Angular', price: 6000, image: '/angular.png' };

  enroll() {
    console.log('enrolled in', this.course.title);
  }
}` },
        { type: 'note', value: 'Interpolation escapes HTML, so it is safe by default. Binding raw HTML with innerHTML requires a sanitizer.' },
      ],
    },
    {
      id: 'ng-inputs-outputs',
      title: 'Inputs and outputs',
      blocks: [
        { type: 'text', value: 'An input lets a parent pass data into a child with @Input. An output lets a child emit events to the parent with @Output and an EventEmitter. This keeps components reusable.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  template: \`<button (click)="select.emit(courseId)">Select</button>\`,
})
export class CourseCardComponent {
  @Input({ required: true }) courseId!: number;
  @Input() title = '';
  @Output() select = new EventEmitter<number>();
}` },
        { type: 'note', value: 'Required inputs fail at compile time if the parent forgets them. Use them when the child cannot work without the value.' },
      ],
    },
    {
      id: 'ng-lifecycle',
      title: 'Lifecycle hooks',
      blocks: [
        { type: 'text', value: 'Angular calls lifecycle hooks at known moments. ngOnInit runs after the inputs are set, which is where you load data. ngOnDestroy runs before the component is removed, which is where you clean up subscriptions.' },
        { type: 'list', items: [
          'ngOnInit: component ready after inputs',
          'ngOnChanges: an input changed',
          'ngAfterViewInit: the view is ready',
          'ngOnDestroy: clean up subscriptions and timers',
          'Use the newer inject() for services in standalone code',
        ] },
        { type: 'note', value: 'Do heavy work in ngOnInit, not in the constructor. Inputs are not available in the constructor.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'components-templates',
      q: 'What does {{ value }} do in a template?',
      options: ['Runs a query', 'Interpolates component data into the view', 'Creates a component', 'Adds CSS'],
      answer: 1,
      explain: 'Interpolation displays component data.',
    },
    {
      chapterId: 'components-templates',
      q: 'What does [property]="value" do?',
      options: ['Listens to an event', 'Binds a component value to a DOM property', 'Creates a pipe', 'Routes a link'],
      answer: 1,
      explain: 'Property binding sets an element property.',
    },
    {
      chapterId: 'components-templates',
      q: 'How does a child send data to a parent?',
      options: ['With @Input', 'With @Output and EventEmitter', 'With a pipe', 'With a service only'],
      answer: 1,
      explain: 'Outputs emit events to the parent.',
    },
    {
      chapterId: 'components-templates',
      q: 'Where should you load data?',
      options: ['In the constructor', 'In ngOnInit', 'In CSS', 'In the template'],
      answer: 1,
      explain: 'Inputs are ready in ngOnInit.',
    },
  ],
};
