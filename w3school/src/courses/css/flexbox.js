// CSS chapter: Flexbox Deep Dive. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'flexbox',
  title: 'Flexbox Deep Dive',
  description: 'Master one-dimensional layouts',
  icon: 'view-column',
  lessons: [
    {
      id: 'css-flex-container',
      title: 'Flex Container Properties',
      blocks: [
        { type: 'text', value: 'Flexbox works along two axes. The main axis follows flex-direction (a row by default); the cross axis runs across it. Every alignment property refers to one of these axes.' },
        { type: 'list', items: [
          'flex-direction: row | row-reverse | column | column-reverse',
          'flex-wrap: nowrap (default) | wrap, lets items move to new lines',
          'justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly (main axis)',
          'align-items: stretch | flex-start | center | flex-end | baseline (cross axis)',
          'align-content: spacing between wrapped lines',
          'gap: space between items',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .row { display: flex; gap: 6px; background: #f1f5f9; padding: 6px; margin-bottom: 10px; min-height: 70px; }
  .row div { background: #2965f1; color: white; padding: 8px; border-radius: 4px; }
  .a { justify-content: space-between; align-items: center; }
  .b { justify-content: space-evenly; align-items: flex-end; }
  .c { flex-direction: column; align-items: center; }
  .d { flex-wrap: wrap; }
  .d div { width: 40%; }
</style>

<div class="row a"><div>1</div><div>2</div><div>3</div></div>
<div class="row b"><div>1</div><div>2</div><div>3</div></div>
<div class="row c"><div>Column</div><div>2</div></div>
<div class="row d"><div>wrap 1</div><div>wrap 2</div><div>wrap 3</div></div>` },
        { type: 'note', value: 'With flex-direction: column the axes swap: justify-content becomes vertical and align-items horizontal.' },
      ],
    },
    {
      id: 'css-flex-items',
      title: 'Flex Item Properties',
      blocks: [
        { type: 'text', value: 'These properties go on the children and decide how they share the space.' },
        { type: 'list', items: [
          'flex-grow: how much an item grows to fill extra space (0 = do not grow)',
          'flex-shrink: how much it shrinks when space is short (0 = never shrink)',
          'flex-basis: the starting size before growing or shrinking',
          'flex: 1 is shorthand for grow 1, shrink 1, basis 0, the most used value',
          'align-self: override align-items for one item',
          'order: change the visual order without changing the HTML',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .row { display: flex; gap: 6px; background: #f1f5f9; padding: 6px; height: 90px; margin-bottom: 10px; }
  .row div { background: #10b981; color: white; padding: 8px; border-radius: 4px; }
  .grow1 { flex: 1; }
  .grow2 { flex: 2; }
  .fixed { flex: 0 0 80px; }
  .bottom { align-self: flex-end; }
  .first { order: -1; background: #f59e0b !important; }
</style>

<div class="row"><div class="fixed">80px</div><div class="grow1">flex 1</div><div class="grow2">flex 2</div></div>
<div class="row"><div>A</div><div class="bottom">align-self</div><div class="first">order -1</div></div>` },
        { type: 'note', value: 'order only changes the visual order. Screen readers and the Tab key still follow the HTML order.' },
      ],
    },
    {
      id: 'css-flex-patterns',
      title: 'Real-world Flexbox Patterns',
      blocks: [
        { type: 'heading', value: 'Navbar: logo left, links right' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  nav { display: flex; align-items: center; gap: 14px; background: #0f172a; padding: 10px 14px; }
  nav a { color: white; text-decoration: none; }
  .logo { font-weight: bold; margin-right: auto; }
</style>

<nav><a class="logo" href="#">CodeNest</a><a href="#">Courses</a><a href="#">Login</a></nav>` },
        { type: 'text', value: 'margin-right: auto on the logo pushes every following item to the right.' },
        { type: 'heading', value: 'Cards with buttons aligned at the bottom' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .cards { display: flex; gap: 10px; flex-wrap: wrap; }
  .card { flex: 1 1 140px; display: flex; flex-direction: column; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; }
  .card p { flex: 1; }
  .card button { background: #2965f1; color: white; border: 0; padding: 8px; border-radius: 6px; }
</style>

<div class="cards">
  <div class="card"><h4>Basic</h4><p>Short text.</p><button>Buy</button></div>
  <div class="card"><h4>Pro</h4><p>A much longer description that takes more lines than the other card.</p><button>Buy</button></div>
</div>` },
        { type: 'heading', value: 'Footer that sticks to the bottom' },
        { type: 'code', lang: 'css', value: `body { min-height: 100vh; display: flex; flex-direction: column; margin: 0; }
main { flex: 1; }   /* main takes all free space, pushing the footer down */` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'flexbox', q: 'Which property lets flex items move onto new lines?', options: ['flex-flow: lines', 'flex-wrap: wrap', 'overflow: wrap', 'white-space: wrap'], answer: 1, explain: 'flex-wrap: wrap allows multiple lines.' },
    { chapterId: 'flexbox', q: 'With flex-direction: column, what does justify-content align?', options: ['Horizontally', 'Vertically', 'Nothing', 'Only text'], answer: 1, explain: 'The main axis becomes vertical in a column.' },
    { chapterId: 'flexbox', q: 'What does flex: 1 do on an item?', options: ['Sets width to 1px', 'Lets it grow to fill available space', 'Puts it first', 'Hides it'], answer: 1, explain: 'flex: 1 means grow 1, shrink 1, basis 0.' },
    { chapterId: 'flexbox', q: 'Which property changes one item\'s cross-axis alignment?', options: ['align-items', 'justify-self', 'align-self', 'order'], answer: 2, explain: 'align-self overrides align-items for a single item.' },
    { chapterId: 'flexbox', q: 'In a flex navbar, what pushes the links to the right of the logo?', options: ['float: right on links', 'margin-right: auto on the logo', 'text-align: right', 'order: 99'], answer: 1, explain: 'An auto margin takes up all the free space on that side.' },
  ],
};
