// HTML chapter: Accessibility. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'accessibility',
  title: 'Accessibility',
  description: 'Build pages everyone can use',
  icon: 'accessibility-new',
  lessons: [
    {
      id: 'html-a11y-intro',
      title: 'Why Accessibility Matters',
      blocks: [
        { type: 'text', value: 'Accessibility (often written a11y) means making websites usable by everyone, including people who are blind, have low vision, cannot use a mouse, or are deaf.' },
        { type: 'list', items: [
          'Screen readers read the page aloud for blind users.',
          'Many people navigate only with a keyboard or a switch.',
          'Captions help deaf users and anyone watching without sound.',
          'Good contrast and large text help older users and anyone in bright sunlight.',
        ] },
        { type: 'text', value: 'The good news: correct, semantic HTML is already mostly accessible. Most accessibility problems come from using a <div> where a real <button>, <a> or <label> belongs.' },
        { type: 'code', lang: 'html', value: `<!-- Bad: not focusable, not announced as a button -->
<div onclick="save()">Save</div>

<!-- Good: works with keyboard and screen readers for free -->
<button onclick="save()">Save</button>` },
        { type: 'note', value: 'Accessible sites also rank better in search engines and are easier for everyone to use.' },
      ],
    },
    {
      id: 'html-a11y-structure',
      title: 'Alt Text, Headings and Landmarks',
      blocks: [
        { type: 'heading', value: 'Writing good alt text' },
        { type: 'list', items: [
          'Describe what the image shows and why it matters: alt="Graph showing sales doubling in 2026"',
          'Do not start with "image of"; screen readers already say it is an image.',
          'Decorative images get an empty alt="" so screen readers skip them.',
        ] },
        { type: 'heading', value: 'A logical heading outline' },
        { type: 'text', value: 'Screen reader users jump between headings to scan a page, so headings must follow order: h1, then h2, then h3. Never skip levels just to get a smaller font.' },
        { type: 'heading', value: 'Landmarks' },
        { type: 'text', value: '<header>, <nav>, <main>, <aside> and <footer> act as landmarks. Screen readers list them so users can jump straight to the main content or the navigation.' },
        { type: 'code', lang: 'html', value: `<a href="#main" class="skip-link">Skip to main content</a>
<header>...</header>
<nav aria-label="Main menu">...</nav>
<main id="main">...</main>
<footer>...</footer>` },
        { type: 'note', value: 'A "skip to main content" link as the first item lets keyboard users skip long menus.' },
      ],
    },
    {
      id: 'html-aria',
      title: 'ARIA Basics',
      blocks: [
        { type: 'text', value: 'ARIA (Accessible Rich Internet Applications) attributes add accessibility information when HTML alone is not enough, for example for custom widgets or icon-only buttons.' },
        { type: 'list', items: [
          'aria-label: a text name for an element with no visible text',
          'aria-labelledby / aria-describedby: point to another element that names or describes it',
          'aria-expanded: whether a menu or section is open',
          'aria-hidden="true": hide decorative content from screen readers',
          'aria-live="polite": announce content that changes, like status messages',
        ] },
        { type: 'code', lang: 'html', value: `<button aria-label="Close">✕</button>

<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>

<span aria-hidden="true">★</span> 4.8 rating

<p aria-live="polite" id="status">Saved!</p>` },
        { type: 'note', value: 'The first rule of ARIA: if a native HTML element does the job, use it instead. Wrong ARIA is worse than none.' },
      ],
    },
    {
      id: 'html-keyboard',
      title: 'Keyboard and Focus',
      blocks: [
        { type: 'text', value: 'Every interactive part of a page must work with the keyboard alone: Tab moves forward, Shift+Tab moves back, Enter and Space activate.' },
        { type: 'list', items: [
          'Links, buttons and form fields are focusable automatically.',
          'tabindex="0" makes a custom element focusable in normal order.',
          'tabindex="-1" makes it focusable only from JavaScript (useful for dialogs).',
          'Never use positive values like tabindex="5"; they scramble the order.',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  a:focus-visible, button:focus-visible, input:focus-visible {
    outline: 3px solid #f59e0b;
    outline-offset: 2px;
  }
</style>

<p>Focus moves through these in order:</p>
<a href="#">A link</a>
<button>A button</button>
<input placeholder="An input">` },
        { type: 'note', value: 'Never remove the focus outline without adding a clear replacement. Keyboard users rely on it to see where they are.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'accessibility', q: 'What alt text should a purely decorative image have?', options: ['alt="decoration"', 'No alt attribute', 'alt=""', 'alt="image"'], answer: 2, explain: 'An empty alt tells screen readers to skip the image.' },
    { chapterId: 'accessibility', q: 'Why is <button> better than a clickable <div>?', options: ['It looks nicer', 'It works with keyboards and screen readers by default', 'It loads faster', 'It is shorter to type'], answer: 1, explain: 'Native buttons are focusable and announced correctly with no extra code.' },
    { chapterId: 'accessibility', q: 'Which attribute names an icon-only button for screen readers?', options: ['title', 'aria-label', 'name', 'alt'], answer: 1, explain: 'aria-label gives an accessible name when there is no visible text.' },
    { chapterId: 'accessibility', q: 'Which tabindex value should you avoid?', options: ['tabindex="0"', 'tabindex="-1"', 'No tabindex', 'tabindex="3"'], answer: 3, explain: 'Positive values break the natural focus order.' },
    { chapterId: 'accessibility', q: 'What is the first rule of ARIA?', options: ['Use ARIA on every element', 'Prefer native HTML elements when they exist', 'Always add aria-hidden', 'Only use ARIA in forms'], answer: 1, explain: 'If a native element does the job, use it instead of ARIA.' },
  ],
};
