// CSS chapter: Grid Deep Dive. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'grid',
  title: 'Grid Deep Dive',
  description: 'Two-dimensional layouts made easy',
  icon: 'grid-view',
  lessons: [
    {
      id: 'css-grid-areas',
      title: 'Grid Template Areas',
      blocks: [
        { type: 'text', value: 'grid-template-areas lets you draw the layout with names. Each string is a row, each word a cell. Then you place each element by name with grid-area.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .page {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header"
      "side   main"
      "footer footer";
    gap: 6px;
    height: 260px;
  }
  .page > * { padding: 8px; border-radius: 6px; color: white; }
  header { grid-area: header; background: #0f172a; }
  aside  { grid-area: side;   background: #64748b; }
  main   { grid-area: main;   background: #2965f1; }
  footer { grid-area: footer; background: #0f172a; }
</style>

<div class="page">
  <header>Header</header>
  <aside>Side</aside>
  <main>Main</main>
  <footer>Footer</footer>
</div>` },
        { type: 'note', value: 'To change the layout on phones, only redefine grid-template-areas inside a media query. The HTML never changes.' },
      ],
    },
    {
      id: 'css-grid-responsive',
      title: 'Responsive Grids with auto-fit and minmax',
      blocks: [
        { type: 'text', value: 'This single line is one of the most useful in all of CSS. It creates as many columns as fit, each at least 140px wide, and stretches them to fill the row. No media queries needed.' },
        { type: 'code', lang: 'css', value: 'grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 8px;
  }
  .gallery img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; }
</style>

<div class="gallery">
  <img src="https://picsum.photos/id/10/300" alt="">
  <img src="https://picsum.photos/id/11/300" alt="">
  <img src="https://picsum.photos/id/12/300" alt="">
  <img src="https://picsum.photos/id/13/300" alt="">
  <img src="https://picsum.photos/id/14/300" alt="">
  <img src="https://picsum.photos/id/15/300" alt="">
</div>` },
        { type: 'list', items: [
          'minmax(140px, 1fr): never smaller than 140px, never bigger than one share',
          'auto-fit: collapse empty tracks so items stretch; auto-fill keeps the empty tracks',
          'aspect-ratio and object-fit: cover keep every image a neat square',
        ] },
      ],
    },
    {
      id: 'css-grid-alignment',
      title: 'Placing and Aligning Grid Items',
      blocks: [
        { type: 'heading', value: 'Placing by line numbers' },
        { type: 'text', value: 'Grid lines are numbered from 1. grid-column: 1 / 3 means "from line 1 to line 3", covering two columns. -1 is the last line.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 60px; gap: 6px; }
  .grid div { background: #8b5cf6; color: white; border-radius: 6px; padding: 6px; }
  .hero { grid-column: 1 / -1; background: #0f172a !important; }
  .tall { grid-row: span 2; }
  .wide { grid-column: span 2; }
</style>

<div class="grid">
  <div class="hero">Full width: 1 / -1</div>
  <div class="tall">Tall</div>
  <div class="wide">Wide</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>` },
        { type: 'heading', value: 'Alignment' },
        { type: 'list', items: [
          'justify-items / align-items: align content inside every cell',
          'place-items: center: shorthand for both',
          'justify-self / align-self: align one item in its cell',
          'grid-auto-flow: dense: fill gaps with later items',
        ] },
        { type: 'note', value: 'Flexbox for one direction (a row or a column), Grid for two directions (rows and columns together).' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'grid', q: 'Which property names regions of a grid layout?', options: ['grid-names', 'grid-template-areas', 'grid-regions', 'grid-layout'], answer: 1, explain: 'grid-template-areas draws the layout with named cells.' },
    { chapterId: 'grid', q: 'What does repeat(auto-fit, minmax(140px, 1fr)) create?', options: ['Exactly 140 columns', 'As many columns as fit, at least 140px each', 'One 140px column', 'Rows of 140px'], answer: 1, explain: 'It is the classic responsive grid without media queries.' },
    { chapterId: 'grid', q: 'What does grid-column: 1 / -1 do?', options: ['Hides the item', 'Spans all columns', 'Puts it in the last column', 'Reverses columns'], answer: 1, explain: '-1 is the last grid line, so it spans the full width.' },
    { chapterId: 'grid', q: 'When should you prefer Grid over Flexbox?', options: ['For one row of buttons', 'For layouts with both rows and columns', 'For text only', 'Never'], answer: 1, explain: 'Grid is two-dimensional; Flexbox is one-dimensional.' },
  ],
};
