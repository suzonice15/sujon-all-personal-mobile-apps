// Bootstrap interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Bootstrap?',
      a: 'A CSS framework with a responsive grid, components and utility classes that speeds up UI development.',
      level: 'basic',
    },
    {
      q: 'Does Bootstrap 5 need jQuery?',
      a: 'No. It ships its own JavaScript bundle, including Popper.',
      level: 'basic',
    },
    {
      q: 'Why is the viewport meta tag required?',
      a: 'Without it, mobile browsers use a wide virtual viewport and the grid is not responsive.',
      level: 'basic',
    },
    {
      q: 'How many columns in the grid?',
      a: 'Twelve, with breakpoints for sm, md, lg, xl and xxl.',
      level: 'basic',
    },
  ],
  'layout-grid': [
    {
      q: 'How does the grid work?',
      a: 'Rows hold columns. Columns span 12 units and use breakpoint classes such as col-md-6.',
      level: 'basic',
    },
    {
      q: 'Container versus container-fluid?',
      a: 'Container has a responsive max width. Container-fluid spans the full viewport.',
      level: 'basic',
    },
    {
      q: 'Why design mobile-first?',
      a: 'Base classes target small screens and breakpoint classes add complexity upward, matching how the grid applies styles.',
      level: 'intermediate',
    },
    {
      q: 'How do you hide an element on mobile?',
      a: 'Use d-none d-md-block to hide below md and show from md.',
      level: 'basic',
    },
  ],
  components: [
    {
      q: 'What does navbar-expand-lg do?',
      a: 'It collapses the navigation below the lg breakpoint.',
      level: 'basic',
    },
    {
      q: 'Why use h-100 on cards?',
      a: 'So cards in a row stretch to the same height.',
      level: 'basic',
    },
    {
      q: 'What is a badge for?',
      a: 'A small count or status label.',
      level: 'basic',
    },
    {
      q: 'What does role="alert" add?',
      a: 'It lets screen readers announce the message.',
      level: 'intermediate',
    },
  ],
  forms: [
    {
      q: 'Which class styles inputs?',
      a: 'form-control. Selects and textareas use the same class.',
      level: 'basic',
    },
    {
      q: 'How do you show a validation error?',
      a: 'Add is-invalid to the input and an invalid-feedback message.',
      level: 'basic',
    },
    {
      q: 'Why connect the label and input?',
      a: 'The for/id link improves accessibility and lets a click focus the field.',
      level: 'basic',
    },
    {
      q: 'Where must validation run?',
      a: 'On the server. Client validation is user experience only.',
      level: 'basic',
    },
  ],
  utilities: [
    {
      q: 'What does mb-4 do?',
      a: 'Adds a bottom margin at the size 4 step.',
      level: 'basic',
    },
    {
      q: 'What does d-none do?',
      a: 'Hides the element. Combine with breakpoint classes to show it later.',
      level: 'basic',
    },
    {
      q: 'Why avoid colour-only status?',
      a: 'Colour-blind users need an icon or label as well.',
      level: 'intermediate',
    },
    {
      q: 'When write custom CSS?',
      a: 'Only when no utility fits, such as a reusable brand component.',
      level: 'intermediate',
    },
  ],
  'js-components': [
    {
      q: 'What opens a modal?',
      a: 'data-bs-toggle="modal" and data-bs-target, plus the Bootstrap bundle JS.',
      level: 'basic',
    },
    {
      q: 'What is a modal good for?',
      a: 'A short confirmation or dialog, not a long form.',
      level: 'basic',
    },
    {
      q: 'Why do tooltips need initialisation?',
      a: 'They are created by JavaScript, so each element must be initialised.',
      level: 'intermediate',
    },
    {
      q: 'What is a toast for?',
      a: 'Brief feedback such as “Saved”. It is not for errors that need a decision.',
      level: 'basic',
    },
  ],
  customization: [
    {
      q: 'How do you change the primary colour?',
      a: 'Override $primary in Sass before importing Bootstrap.',
      level: 'basic',
    },
    {
      q: 'How does dark mode work?',
      a: 'Set data-bs-theme="dark" on html and use theme-aware utilities such as bg-body.',
      level: 'intermediate',
    },
    {
      q: 'Why override before import?',
      a: 'Bootstrap generates its classes from the variables at build time.',
      level: 'intermediate',
    },
    {
      q: 'How do you avoid class soup?',
      a: 'Extract repeated markup into components or a small custom class.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you build a responsive dashboard?',
      a: 'Navbar, responsive card grid, a table that stacks, a modal for destructive actions and a validated form, themed with Sass.',
      level: 'intermediate',
    },
    {
      q: 'What are the downsides of Bootstrap?',
      a: 'A recognizable default look and verbose markup. A custom brand may need more work on top.',
      level: 'intermediate',
    },
    {
      q: 'How do you test responsiveness?',
      a: 'Resize and test real devices at 360, 768 and 1280 pixels, checking navigation and tap targets.',
      level: 'basic',
    },
    {
      q: 'What is the best first step?',
      a: 'Set up the CDN, a container and a responsive row of cards.',
      level: 'basic',
    },
  ],
};
