// CSS chapter: Responsive Design. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'responsive',
  title: 'Responsive Design',
  description: 'One site that works on every screen',
  icon: 'devices',
  lessons: [
    {
      id: 'css-media-queries',
      title: 'Media Queries',
      blocks: [
        { type: 'text', value: 'Media queries apply styles only when a condition is true, such as the screen being narrower than a certain width. This is how one site works on phones and desktops.' },
        { type: 'code', lang: 'css', value: `.cards { display: grid; grid-template-columns: repeat(3, 1fr); }

/* On screens 600px wide or less, use one column */
@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
}` },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  body { background: #dcfce7; }
  @media (max-width: 600px) {
    body { background: #fee2e2; }
    .msg::after { content: " You are on a small screen."; }
  }
</style>

<p class="msg">The background depends on the screen width.</p>` },
        { type: 'heading', value: 'Other things you can test' },
        { type: 'list', items: [
          '(orientation: landscape): the screen is wider than tall',
          '(prefers-color-scheme: dark): the user chose dark mode',
          '(prefers-reduced-motion: reduce): the user wants less animation',
          '(hover: hover): the device has a real mouse',
        ] },
        { type: 'note', value: 'Media queries only work on phones if the page has <meta name="viewport" content="width=device-width, initial-scale=1">.' },
      ],
    },
    {
      id: 'css-mobile-first',
      title: 'Mobile-first and Breakpoints',
      blocks: [
        { type: 'text', value: 'Mobile-first means writing the base styles for small screens, then adding min-width media queries as the screen grows. Phones get the lightest CSS, and layouts only get more complex when there is room.' },
        { type: 'code', lang: 'css', value: `/* Base: phones (one column) */
.products { display: grid; gap: 16px; grid-template-columns: 1fr; }

/* Tablets */
@media (min-width: 600px) {
  .products { grid-template-columns: repeat(2, 1fr); }
}

/* Laptops and up */
@media (min-width: 1024px) {
  .products { grid-template-columns: repeat(4, 1fr); }
}` },
        { type: 'heading', value: 'Common breakpoints' },
        { type: 'list', items: [
          '480px: large phones',
          '768px: tablets',
          '1024px: small laptops',
          '1280px: desktops',
        ] },
        { type: 'note', value: 'Do not chase device sizes. Add a breakpoint wherever your design starts to look stretched or cramped.' },
      ],
    },
    {
      id: 'css-fluid',
      title: 'Fluid Sizes with clamp()',
      blocks: [
        { type: 'text', value: 'Instead of jumping between fixed sizes at breakpoints, values can grow smoothly with the screen. clamp(min, preferred, max) picks the preferred value but never goes outside the limits.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  h1 { font-size: clamp(1.5rem, 6vw, 3rem); }
  .box { width: clamp(200px, 80%, 600px); padding: clamp(8px, 3vw, 32px); background: #e0e7ff; }
  img { max-width: 100%; height: auto; }
</style>

<h1>Fluid heading</h1>
<div class="box">This box and its padding grow with the screen, within limits.</div>
<img src="https://picsum.photos/800/300" alt="Wide landscape">` },
        { type: 'list', items: [
          'max-width: 100% on images stops them from overflowing small screens.',
          'clamp() can replace many media queries for font sizes and spacing.',
        ] },
      ],
    },
    {
      id: 'css-container-queries',
      title: 'Container Queries',
      blocks: [
        { type: 'text', value: 'Media queries look at the screen. Container queries look at the size of the element\'s parent. A card can then change its own layout depending on where it is placed: wide in the main column, compact in a sidebar.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .slot { container-type: inline-size; border: 1px dashed #94a3b8; margin-bottom: 10px; }
  .card { display: grid; gap: 8px; padding: 10px; background: #f1f5f9; }
  .card img { width: 100%; border-radius: 6px; }

  @container (min-width: 320px) {
    .card { grid-template-columns: 120px 1fr; align-items: center; }
  }
</style>

<div class="slot" style="width: 220px">
  <div class="card"><img src="https://picsum.photos/id/30/200/120" alt=""><p>Narrow slot: stacked</p></div>
</div>
<div class="slot">
  <div class="card"><img src="https://picsum.photos/id/30/200/120" alt=""><p>Wide slot: side by side</p></div>
</div>` },
        { type: 'note', value: 'container-type: inline-size on the parent is required before @container rules work.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'responsive', q: 'Which feature applies styles only on small screens?', options: ['@import', '@keyframes', '@font-face', '@media'], answer: 3, explain: 'Media queries (@media) apply styles conditionally.' },
    { chapterId: 'responsive', q: 'In mobile-first CSS, which media queries do you mostly write?', options: ['max-width', 'min-width', 'orientation', 'max-height'], answer: 1, explain: 'Base styles are for phones; min-width queries add styles as screens grow.' },
    { chapterId: 'responsive', q: 'What does clamp(1rem, 4vw, 2rem) return on a very wide screen?', options: ['1rem', '4vw', '2rem', 'It breaks'], answer: 2, explain: 'clamp never goes above the maximum value.' },
    { chapterId: 'responsive', q: 'What do container queries respond to?', options: ['The screen size', 'The parent container size', 'The font size', 'The device type'], answer: 1, explain: '@container checks the size of an ancestor with container-type.' },
  ],
};
