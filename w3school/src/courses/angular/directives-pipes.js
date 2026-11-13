// Angular chapter: Directives & Pipes.

export default {
  id: 'directives-pipes',
  title: 'Directives & Pipes',
  description: 'Control flow, structural directives and pipes',
  icon: 'filter-alt',
  lessons: [
    {
      id: 'ng-control-flow',
      title: 'Control flow in templates',
      blocks: [
        { type: 'text', value: 'Angular templates have built-in control flow: @if, @for and @switch. They replace the older *ngIf and *ngFor and read more like code.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `@if (loading) {
  <p>Loading...</p>
} @else {
  <ul>
    @for (course of courses; track course.id) {
      <li>{{ course.title }}</li>
    } @empty {
      <li>No courses yet</li>
    }
  </ul>
}

@switch (role) {
  @case ('admin') { <p>Admin panel</p> }
  @default { <p>Student view</p> }
}` },
        { type: 'note', value: 'Always provide a track expression in @for. It lets Angular reuse DOM nodes instead of rebuilding the list.' },
      ],
    },
    {
      id: 'ng-directives',
      title: 'Attribute directives and classes',
      blocks: [
        { type: 'text', value: 'An attribute directive changes the appearance or behaviour of an element. NgClass and NgStyle are common built-ins. You can also write your own with @Directive and a host binding.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `// Template
<p [class.active]="isActive" [class.muted]="!isActive">Course</p>

// Custom directive
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onEnter() { this.el.nativeElement.style.background = '#fef3c7'; }

  @HostListener('mouseleave')
  onLeave() { this.el.nativeElement.style.background = ''; }
}` },
        { type: 'note', value: 'Prefer CSS classes over direct style changes. A class is easier to theme and test than an inline style.' },
      ],
    },
    {
      id: 'ng-pipes',
      title: 'Pipes',
      blocks: [
        { type: 'text', value: 'A pipe transforms a value in the template. Angular ships date, currency, number, uppercase and json pipes. A custom pipe is a class with a transform method.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortTime', standalone: true })
export class ShortTimePipe implements PipeTransform {
  transform(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h ? h + 'h ' + m + 'm' : m + 'm';
  }
}

// Template
<p>{{ 95 | shortTime }}</p>        // 1h 35m
<p>{{ price | currency: 'BDT' }}</p>` },
        { type: 'note', value: 'A pure pipe runs only when the input changes. An impure pipe runs on every change detection, so use one only when necessary.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'directives-pipes',
      q: 'Which block replaces *ngFor?',
      options: ['@if', '@for', '@switch', '@defer'],
      answer: 1,
      explain: '@for renders a list.',
    },
    {
      chapterId: 'directives-pipes',
      q: 'Why provide track in @for?',
      options: ['To sort items', 'So Angular can reuse DOM nodes', 'To style items', 'To load data'],
      answer: 1,
      explain: 'track lets Angular diff the list efficiently.',
    },
    {
      chapterId: 'directives-pipes',
      q: 'What does a pipe do?',
      options: ['Routes a URL', 'Transforms a value in the template', 'Creates a service', 'Emits an event'],
      answer: 1,
      explain: 'Pipes transform displayed values.',
    },
    {
      chapterId: 'directives-pipes',
      q: 'Why prefer CSS classes over direct style changes?',
      options: ['They are shorter', 'They are easier to theme and test', 'They are faster', 'They are required'],
      answer: 1,
      explain: 'Classes keep styling in CSS.',
    },
  ],
};
