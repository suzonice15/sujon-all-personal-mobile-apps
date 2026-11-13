// Angular chapter: Forms.

export default {
  id: 'forms',
  title: 'Forms',
  description: 'Template-driven forms, reactive forms and validation',
  icon: 'edit-note',
  lessons: [
    {
      id: 'ng-reactive-forms',
      title: 'Reactive forms',
      blocks: [
        { type: 'text', value: 'Reactive forms define the form model in TypeScript. They are easier to test and validate than template-driven forms, and they scale better for complex forms.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="save()">
      <input formControlName="title" placeholder="Title" />
      <input formControlName="price" type="number" />
      <button [disabled]="form.invalid">Save</button>
    </form>
  \`,
})
export class CourseFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  save() {
    if (this.form.valid) console.log(this.form.value);
  }
}` },
        { type: 'note', value: 'The form model is the source of truth. The template binds to it, not the other way around.' },
      ],
    },
    {
      id: 'ng-validation',
      title: 'Validation',
      blocks: [
        { type: 'text', value: 'Validators run on controls. Built-in validators cover required, min, max, pattern and email. A custom validator is a function that returns an error object or null. Show errors only after the user touches the field.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `export function noSpaces(control: AbstractControl) {
  const value = control.value ?? '';
  return value.includes(' ') ? { noSpaces: true } : null;
}

// Template
@if (form.controls.title.touched && form.controls.title.errors?.['required']) {
  <p class="error">Title is required</p>
}
@if (form.controls.title.errors?.['noSpaces']) {
  <p class="error">Title cannot contain spaces</p>
}` },
        { type: 'note', value: 'Validate on the server too. Client validation is for user experience, not security.' },
      ],
    },
    {
      id: 'ng-form-patterns',
      title: 'Form patterns',
      blocks: [
        { type: 'list', items: [
          'Group related fields with FormGroup',
          'Use FormArray for dynamic lists of fields',
          'Disable the submit button while invalid or submitting',
          'Show a success message after saving',
          'Reset the form after a successful submit',
          'Debounce search inputs to avoid a request per keystroke',
        ] },
        { type: 'text', value: 'Keep the form model close to the component. Move shared validation and mapping into a service when the form grows.' },
        { type: 'note', value: 'A disabled button is not enough. Check form.valid in the submit handler as well.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'forms',
      q: 'Where is the model defined in reactive forms?',
      options: ['In the template', 'In TypeScript', 'In CSS', 'In the router'],
      answer: 1,
      explain: 'Reactive forms define the model in code.',
    },
    {
      chapterId: 'forms',
      q: 'What does Validators.required do?',
      options: ['Marks a field optional', 'Requires a non-empty value', 'Formats a value', 'Creates a control'],
      answer: 1,
      explain: 'It rejects empty values.',
    },
    {
      chapterId: 'forms',
      q: 'What should a custom validator return when valid?',
      options: ['true', 'null', 'an error object', 'undefined only'],
      answer: 1,
      explain: 'Valid means null; invalid returns an error object.',
    },
    {
      chapterId: 'forms',
      q: 'Why validate on the server too?',
      options: ['It is faster', 'Client validation is for UX, not security', 'It is required by Angular', 'It avoids forms'],
      answer: 1,
      explain: 'Server validation is the real protection.',
    },
  ],
};
