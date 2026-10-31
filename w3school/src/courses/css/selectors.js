// CSS chapter: Selectors Deep Dive. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'selectors',
  title: 'Selectors Deep Dive',
  description: 'Target exactly the elements you want',
  icon: 'my-location',
  lessons: [
    {
      id: 'css-attribute-selectors',
      title: 'Attribute Selectors',
      blocks: [
        { type: 'text', value: 'Attribute selectors match elements by their attributes and values, written in square brackets.' },
        { type: 'list', items: [
          '[disabled]: has the attribute at all',
          '[type="email"]: exact value',
          '[href^="https"]: value starts with',
          '[href$=".pdf"]: value ends with',
          '[class*="btn"]: value contains',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  a[href^="https"]::after { content: " ↗"; }
  a[href$=".pdf"] { color: crimson; font-weight: bold; }
  input[type="email"] { border: 2px solid #2965f1; }
  input[disabled] { background: #e5e7eb; }
</style>

<p><a href="https://example.com">External link</a></p>
<p><a href="guide.pdf">Download the PDF guide</a></p>
<p><input type="email" placeholder="Email"></p>
<p><input placeholder="Disabled" disabled></p>` },
      ],
    },
    {
      id: 'css-combinators',
      title: 'Combinators',
      blocks: [
        { type: 'text', value: 'Combinators describe the relationship between two selectors.' },
        { type: 'list', items: [
          'A B (space): B anywhere inside A (descendant)',
          'A > B: B directly inside A (child)',
          'A + B: the B right after A (next sibling)',
          'A ~ B: every B after A (later siblings)',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .menu > li { font-weight: bold; }
  h3 + p { color: #2965f1; }
  h3 ~ p { border-left: 3px solid #cbd5e1; padding-left: 6px; }
</style>

<ul class="menu">
  <li>Direct child (bold)
    <ul><li>Nested, not a direct child</li></ul>
  </li>
</ul>

<h3>Title</h3>
<p>First paragraph after h3 (blue)</p>
<p>Later sibling (border only)</p>` },
      ],
    },
    {
      id: 'css-pseudo',
      title: 'Pseudo-classes',
      blocks: [
        { type: 'text', value: 'Pseudo-classes start with a colon and style an element in a special state or position.' },
        { type: 'heading', value: 'User action' },
        { type: 'list', items: [
          ':hover when the pointer is over it (mouse devices)',
          ':active while it is being pressed',
          ':focus when it is selected; :focus-visible only for keyboard focus',
        ] },
        { type: 'heading', value: 'Form state' },
        { type: 'list', items: [
          ':checked, :disabled, :required, :valid, :invalid, :placeholder-shown',
        ] },
        { type: 'heading', value: 'Position' },
        { type: 'list', items: [
          ':first-child, :last-child',
          ':nth-child(2), :nth-child(odd), :nth-child(3n)',
          ':first-of-type, :only-child, :empty',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  button { background: #2965f1; color: white; border: 0; padding: 10px 16px; border-radius: 8px; }
  button:active { background: #1e40af; }
  input:focus { outline: 3px solid #f59e0b; }
  input:invalid { border-color: crimson; }
  li:nth-child(odd) { background: #f1f5f9; }
  li:last-child { font-weight: bold; }
  input[type="checkbox"]:checked + label { text-decoration: line-through; color: gray; }
</style>

<button>Press me</button>
<p><input type="email" placeholder="Type an invalid email" required></p>
<ul><li>One</li><li>Two</li><li>Three</li><li>Four (last)</li></ul>
<p><input type="checkbox" id="t1"><label for="t1"> Tick to complete this task</label></p>` },
      ],
    },
    {
      id: 'css-modern-pseudo',
      title: ':is, :where, :not and :has',
      blocks: [
        { type: 'text', value: 'Modern pseudo-classes make long selectors short and unlock things that used to need JavaScript.' },
        { type: 'list', items: [
          ':is(a, b): matches any in the list, so :is(h1, h2, h3) span replaces three selectors',
          ':where(a, b): same as :is but with zero specificity, easy to override',
          ':not(x): everything except x',
          ':has(x): the element contains x. Often called the "parent selector".',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  :is(h2, h3) { color: #7c3aed; }
  li:not(:last-child) { border-bottom: 1px solid #e5e7eb; }
  .card { padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; margin: 8px 0; }
  .card:has(img) { border-color: #10b981; }
  form:has(input:invalid) button { opacity: 0.4; }
</style>

<h2>Purple h2</h2>
<h3>Purple h3</h3>
<ul><li>Line</li><li>Line</li><li>No line under the last</li></ul>
<div class="card">Card without image</div>
<div class="card"><img src="https://picsum.photos/60" alt=""> Card with image (green)</div>
<form><input required placeholder="Fill me"> <button>Send</button></form>` },
        { type: 'note', value: ':has() lets a parent react to its children, such as highlighting a form field group when its input is invalid.' },
      ],
    },
    {
      id: 'css-pseudo-elements',
      title: 'Pseudo-elements',
      blocks: [
        { type: 'text', value: 'Pseudo-elements use two colons and style a part of an element, or add decorative content that is not in the HTML.' },
        { type: 'list', items: [
          '::before / ::after: insert content before or after the element (needs content)',
          '::first-letter / ::first-line: style the start of text',
          '::placeholder: the hint text in inputs',
          '::selection: text the user highlights',
          '::marker: the bullet or number of list items',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .quote::before { content: "“"; font-size: 40px; color: #2965f1; vertical-align: -12px; }
  .badge { position: relative; }
  .badge::after {
    content: "3"; position: absolute; top: -8px; right: -14px;
    background: crimson; color: white; font-size: 11px; padding: 1px 6px; border-radius: 999px;
  }
  .story::first-letter { font-size: 2.4em; font-weight: bold; color: #b45309; float: left; margin-right: 4px; }
  input::placeholder { color: #a78bfa; font-style: italic; }
  li::marker { color: #10b981; }
  ::selection { background: #fde68a; }
</style>

<p class="quote">Learning never exhausts the mind.</p>
<p><span class="badge">Messages</span></p>
<p class="story">Once upon a time, a student decided to learn CSS every day for a month.</p>
<input placeholder="Custom placeholder">
<ul><li>Green bullet</li><li>Green bullet</li></ul>` },
        { type: 'note', value: 'Text added with content is not read by every screen reader and cannot be selected. Use it for decoration only.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'selectors', q: 'Which pseudo-class styles an input that is selected?', options: [':hover', ':focus', ':checked', ':active'], answer: 1, explain: ':focus applies while an input is selected.' },
    { chapterId: 'selectors', q: 'Which selector matches links whose href ends with .pdf?', options: ['a[href^=".pdf"]', 'a[href*=".pdf"]', 'a[href$=".pdf"]', 'a[href=".pdf"]'], answer: 2, explain: '$= means "ends with".' },
    { chapterId: 'selectors', q: 'What does ul > li select?', options: ['All li anywhere in ul', 'Only li that are direct children of ul', 'The li right after a ul', 'Every ul inside li'], answer: 1, explain: '> is the child combinator.' },
    { chapterId: 'selectors', q: 'Which selector styles every odd list item?', options: ['li:odd', 'li:nth-child(odd)', 'li:nth(odd)', 'li::odd'], answer: 1, explain: ':nth-child(odd) matches the 1st, 3rd, 5th...' },
    { chapterId: 'selectors', q: 'Which pseudo-class selects a parent based on what it contains?', options: [':has()', ':is()', ':where()', ':parent()'], answer: 0, explain: '.card:has(img) matches cards that contain an image.' },
    { chapterId: 'selectors', q: 'What do ::before and ::after need to appear?', options: ['A width', 'The content property', 'display: block', 'An id'], answer: 1, explain: 'Without content (even content: "") they are not rendered.' },
  ],
};
