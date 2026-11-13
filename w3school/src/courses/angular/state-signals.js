// Angular chapter: State & Signals.

export default {
  id: 'state-signals',
  title: 'State & Signals',
  description: 'Signals, computed values and shared state',
  icon: 'memory',
  lessons: [
    {
      id: 'ng-signals',
      title: 'Signals',
      blocks: [
        { type: 'text', value: 'A signal is a reactive value. Reading it in a template or a computed tracks the dependency. Setting it notifies everything that depends on it, and Angular updates only what changed.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button (click)="count.set(count() + 1)">Add</button>
  \`,
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);
}` },
        { type: 'note', value: 'Call a signal like a function: count(). Use set to replace and update to derive from the previous value.' },
      ],
    },
    {
      id: 'ng-effects',
      title: 'Effects and linked state',
      blocks: [
        { type: 'text', value: 'An effect runs when a signal it reads changes. It is for side effects such as logging or syncing to storage, not for computing state. Keep effects small.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { effect, signal } from '@angular/core';

const theme = signal<'light' | 'dark'>('light');

effect(() => {
  localStorage.setItem('theme', theme());
  document.body.dataset.theme = theme();
});` },
        { type: 'list', items: [
          'signal: writable reactive value',
          'computed: derived value, cached until a dependency changes',
          'effect: run a side effect when dependencies change',
          'linkedSignal: writable state derived from another signal',
          'Avoid writing signals inside computed',
        ] },
      ],
    },
    {
      id: 'ng-shared-state',
      title: 'Shared state in a service',
      blocks: [
        { type: 'text', value: 'A service can hold signals and expose them read-only. Components inject the service and update it through methods. This keeps state in one place without a heavy store.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<string[]>([]);
  readonly list = this.items.asReadonly();
  readonly count = computed(() => this.items().length);

  add(title: string) {
    this.items.update(list => [...list, title]);
  }

  clear() {
    this.items.set([]);
  }
}` },
        { type: 'note', value: 'A signals service covers most apps. Add NgRx or another store only when you need time-travel debugging, strict event flows or very large teams.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'state-signals',
      q: 'How do you read a signal in code?',
      options: ['signal.value', 'signal()', 'signal.get', 'signal.read'],
      answer: 1,
      explain: 'Signals are called like functions.',
    },
    {
      chapterId: 'state-signals',
      q: 'What is a computed signal?',
      options: ['A writable value', 'A derived value cached until dependencies change', 'A side effect', 'A service'],
      answer: 1,
      explain: 'computed derives from other signals.',
    },
    {
      chapterId: 'state-signals',
      q: 'What is an effect for?',
      options: ['Computing state', 'Running side effects when dependencies change', 'Routing', 'Testing'],
      answer: 1,
      explain: 'Effects run side effects.',
    },
    {
      chapterId: 'state-signals',
      q: 'How do you expose a signal read-only from a service?',
      options: ['Make it public', 'Use asReadonly()', 'Use a pipe', 'Use a getter only'],
      answer: 1,
      explain: 'asReadonly() prevents external writes.',
    },
  ],
};
