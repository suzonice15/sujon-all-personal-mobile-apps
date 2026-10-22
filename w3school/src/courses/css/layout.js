// CSS chapter: Layout. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'layout',
  title: 'Layout',
  description: 'Display, position, Flexbox and Grid',
  icon: 'dashboard',
  lessons: [
    {
      id: 'css-display',
      title: 'Display',
      blocks: [
        { type: 'list', items: [
          'block: starts on a new line, full width (div, p)',
          'inline: stays in the line, width and height are ignored (span, a)',
          'inline-block: stays in the line but accepts width and height',
          'none: hides the element completely',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .tag { display: inline-block; padding: 4px 10px; margin: 2px; background: #ddd; border-radius: 6px; }
  .hidden { display: none; }
</style>

<span class="tag">HTML</span>
<span class="tag">CSS</span>
<span class="tag">JavaScript</span>
<p class="hidden">You cannot see me.</p>` },
      ],
    },
    {
      id: 'css-position',
      title: 'Position',
      blocks: [
        { type: 'list', items: [
          'static: the default, normal flow',
          'relative: moved from its normal spot with top/left, other elements do not move',
          'absolute: placed relative to the nearest positioned parent',
          'fixed: stays in the same place on screen while scrolling',
          'sticky: scrolls normally, then sticks at a set position',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .parent { position: relative; height: 120px; background: #e0e7ff; }
  .badge {
    position: absolute; top: 8px; right: 8px;
    background: crimson; color: white; padding: 4px 8px; border-radius: 6px;
  }
</style>

<div class="parent">
  Parent box
  <span class="badge">NEW</span>
</div>` },
        { type: 'note', value: 'An absolute element needs a parent with position: relative, or it positions itself against the whole page.' },
      ],
    },
    {
      id: 'css-flexbox',
      title: 'Flexbox',
      blocks: [
        { type: 'text', value: 'Flexbox arranges items in a row or a column and makes aligning them easy. Set display: flex on the parent.' },
        { type: 'list', items: [
          'flex-direction: row or column',
          'justify-content: alignment along the main direction (flex-start, center, space-between)',
          'align-items: alignment across it (stretch, center)',
          'gap: space between items',
          'flex: 1 on a child makes it grow to fill space',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .row { display: flex; justify-content: space-between; align-items: center; gap: 8px;
         background: #f1f5f9; padding: 10px; }
  .item { background: #2965f1; color: white; padding: 10px; border-radius: 6px; }
  .grow { flex: 1; text-align: center; }
</style>

<div class="row">
  <div class="item">Logo</div>
  <div class="item grow">I grow</div>
  <div class="item">Menu</div>
</div>` },
        { type: 'note', value: 'Perfect centering: display: flex; justify-content: center; align-items: center;' },
      ],
    },
    {
      id: 'css-grid',
      title: 'CSS Grid',
      blocks: [
        { type: 'text', value: 'Grid lays items out in rows and columns at the same time. It is ideal for galleries and whole page layouts.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .grid div { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 6px; }
  .wide { grid-column: span 2; }
</style>

<div class="grid">
  <div class="wide">Spans 2 columns</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>` },
        { type: 'list', items: [
          '1fr means one equal share of the free space.',
          'repeat(3, 1fr) creates three equal columns.',
          'grid-column: span 2 makes an item take two columns.',
        ] },
      ],
    },
    {
      id: 'css-float',
      title: 'Float and Clear',
      blocks: [
        { type: 'text', value: 'float pushes an element to the left or right and lets text wrap around it, like a picture in a newspaper. Before Flexbox it was used for whole layouts; today its main job is wrapping text around images.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  img { float: left; margin: 0 12px 8px 0; border-radius: 8px; }
  .clear { clear: both; background: #f1f5f9; padding: 6px; }
</style>

<img src="https://picsum.photos/id/1025/100/100" alt="Dog" width="100" height="100">
<p>The text flows around the floated image. This is how magazines place photos inside articles. Add more text and it keeps wrapping neatly beside the picture until it passes the bottom of it.</p>
<p class="clear">clear: both starts below the float.</p>` },
        { type: 'note', value: 'For layouts, use Flexbox or Grid instead of float. You will still see float in older code, so it is worth knowing.' },
      ],
    },
    {
      id: 'css-z-index',
      title: 'z-index and Stacking',
      blocks: [
        { type: 'text', value: 'When elements overlap, z-index decides which one is on top. A higher number comes forward. It only works on positioned elements (relative, absolute, fixed, sticky) and flex or grid items.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .wrap { position: relative; height: 160px; }
  .card { position: absolute; width: 120px; height: 90px; border-radius: 10px; color: white; padding: 8px; }
  .a { background: #ef4444; top: 0; left: 0; z-index: 1; }
  .b { background: #3b82f6; top: 30px; left: 50px; z-index: 3; }
  .c { background: #10b981; top: 60px; left: 100px; z-index: 2; }
</style>

<div class="wrap">
  <div class="card a">z-index 1</div>
  <div class="card b">z-index 3</div>
  <div class="card c">z-index 2</div>
</div>` },
        { type: 'heading', value: 'Stacking contexts' },
        { type: 'text', value: 'A parent with its own z-index (or opacity below 1, or a transform) creates a stacking context. Its children can never appear above elements outside that parent, no matter how high their z-index is. This is the usual reason "z-index: 9999 does not work".' },
      ],
    },
    {
      id: 'css-centering',
      title: 'Centering Techniques',
      blocks: [
        { type: 'text', value: '"How do I center a div?" is the most famous CSS question. Here are the reliable answers.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .demo { height: 110px; background: #f1f5f9; margin-bottom: 10px; border-radius: 8px; }
  .item { background: #2965f1; color: white; padding: 8px 12px; border-radius: 6px; width: fit-content; }

  .flex { display: flex; justify-content: center; align-items: center; }
  .grid { display: grid; place-items: center; }
  .abs { position: relative; }
  .abs .item { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .auto .item { margin: 0 auto; }
</style>

<div class="demo flex"><div class="item">Flexbox</div></div>
<div class="demo grid"><div class="item">Grid place-items</div></div>
<div class="demo abs"><div class="item">Absolute + transform</div></div>
<div class="demo auto"><div class="item">margin: 0 auto (horizontal only)</div></div>` },
        { type: 'list', items: [
          'Text inside a box: text-align: center',
          'A block horizontally: margin: 0 auto (it needs a width)',
          'Both directions: Flexbox or Grid, the modern default',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'layout', q: 'Which display value hides an element completely?', options: ['hidden', 'none', 'invisible', 'transparent'], answer: 1, explain: 'display: none removes the element from the layout.' },
    { chapterId: 'layout', q: 'Which position keeps an element in place while the page scrolls?', options: ['fixed', 'absolute', 'relative', 'static'], answer: 0, explain: 'fixed positions against the screen, not the page.' },
    { chapterId: 'layout', q: 'In Flexbox, which property spaces items along the main direction?', options: ['align-items', 'flex-wrap', 'justify-content', 'gap-items'], answer: 2, explain: 'justify-content aligns along the main axis.' },
    { chapterId: 'layout', q: 'What does grid-template-columns: repeat(3, 1fr) create?', options: ['3 rows', '3 equal columns', 'Columns of 3px', '1 column of 3fr'], answer: 1, explain: 'Three columns, each taking one equal share.' },
    { chapterId: 'layout', q: 'What is needed on a parent so an absolute child positions inside it?', options: ['display: flex', 'overflow: hidden', 'position: relative', 'z-index: 1'], answer: 2, explain: 'Absolute elements position against the nearest positioned ancestor.' },
    { chapterId: 'layout', q: 'z-index only works on which elements?', options: ['Any element', 'Only images', 'Positioned elements and flex/grid items', 'Only block elements'], answer: 2, explain: 'static elements ignore z-index.' },
    { chapterId: 'layout', q: 'What is float mainly used for today?', options: ['Page layouts', 'Wrapping text around images', 'Centering', 'Animations'], answer: 1, explain: 'Flexbox and Grid replaced float for layouts.' },
    { chapterId: 'layout', q: 'Which one line centers a child in both directions on a grid parent?', options: ['align: center', 'place-items: center', 'center: both', 'margin: auto auto'], answer: 1, explain: 'place-items: center sets both align-items and justify-items.' },
  ],
};
