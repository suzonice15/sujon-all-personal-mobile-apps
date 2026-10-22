// CSS chapter: CSS Basics. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'basics',
  title: 'CSS Basics',
  description: 'What CSS is and how to write rules',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'css-intro',
      title: 'What is CSS?',
      blocks: [
        { type: 'text', value: 'CSS (Cascading Style Sheets) controls how HTML looks: colors, fonts, spacing, and the position of every element on the page.' },
        { type: 'text', value: 'HTML says what something is ("this is a heading"). CSS says how it should look ("headings are blue and centered").' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  h1 { color: royalblue; text-align: center; }
  p  { color: #555; font-size: 18px; }
</style>

<h1>Styled with CSS</h1>
<p>The same HTML, but now it has style.</p>` },
        { type: 'note', value: 'One CSS file can style hundreds of pages. Change it once and the whole site updates.' },
      ],
    },
    {
      id: 'css-syntax',
      title: 'Syntax',
      blocks: [
        { type: 'text', value: 'A CSS rule has a selector and a declaration block. Each declaration is a property and a value, separated by a colon and ending with a semicolon.' },
        { type: 'code', lang: 'css', value: `selector {
  property: value;
  property: value;
}

/* Example */
p {
  color: green;
  font-size: 16px;
}` },
        { type: 'list', items: [
          'Selector: which elements to style (here, every <p>).',
          'Property: what to change (color, font-size).',
          'Value: the new setting (green, 16px).',
        ] },
        { type: 'note', value: 'Comments in CSS are written /* like this */.' },
      ],
    },
    {
      id: 'css-adding',
      title: 'Three Ways to Add CSS',
      blocks: [
        { type: 'heading', value: '1. External (best for real sites)' },
        { type: 'code', lang: 'html', value: `<head>
  <link rel="stylesheet" href="style.css">
</head>` },
        { type: 'heading', value: '2. Internal' },
        { type: 'code', lang: 'html', value: `<head>
  <style>
    body { background: #f5f5f5; }
  </style>
</head>` },
        { type: 'heading', value: '3. Inline' },
        { type: 'code', lang: 'html', value: '<p style="color: red;">Only this paragraph is red.</p>' },
        { type: 'text', value: 'If the same element gets different rules, inline styles win over internal and external ones.' },
      ],
    },
    {
      id: 'css-selectors',
      title: 'Selectors',
      blocks: [
        { type: 'text', value: 'Selectors pick which elements a rule applies to.' },
        { type: 'list', items: [
          'p: every <p> element (element selector)',
          '.card: every element with class="card" (class selector)',
          '#header: the one element with id="header" (id selector)',
          'h1, h2: both h1 and h2 (group)',
          'nav a: every <a> inside a <nav> (descendant)',
          '*: every element (universal)',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .note { background: #fff3cd; padding: 6px; }
  #title { color: crimson; }
  ul li { color: teal; }
</style>

<h2 id="title">Selectors demo</h2>
<p class="note">I have the class "note".</p>
<p>I am a plain paragraph.</p>
<ul><li>List items are teal</li></ul>` },
        { type: 'note', value: 'Use classes for most styling. Save ids for elements that are truly unique.' },
      ],
    },
    {
      id: 'css-cascade',
      title: 'Cascade and Specificity',
      blocks: [
        { type: 'text', value: 'When two rules target the same element, the browser decides which one wins:' },
        { type: 'list', items: [
          'More specific selectors win: id beats class, class beats element.',
          'If specificity is equal, the rule written later wins.',
          '!important overrides everything else (use it rarely).',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  p { color: gray; }
  .info { color: blue; }
  #special { color: green; }
</style>

<p>Gray (element rule)</p>
<p class="info">Blue (class beats element)</p>
<p class="info" id="special">Green (id beats class)</p>` },
        { type: 'heading', value: 'Counting specificity' },
        { type: 'text', value: 'Think of specificity as three numbers (ids, classes, elements). Compare from the left; the bigger number wins.' },
        { type: 'list', items: [
          'p → (0, 0, 1)',
          '.card p → (0, 1, 1)',
          '#nav .link → (1, 1, 0)',
          'Inline style="" beats all of them; !important beats even inline.',
        ] },
      ],
    },
    {
      id: 'css-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'Some properties pass down from a parent to its children automatically. Set a font on <body> and every paragraph inside uses it.' },
        { type: 'list', items: [
          'Inherited: color, font-family, font-size, line-height, text-align, visibility',
          'Not inherited: margin, padding, border, background, width, height',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .parent { color: darkgreen; font-family: Georgia, serif; border: 2px solid gray; padding: 8px; }
  .child-border { border: inherit; }
</style>

<div class="parent">
  Parent text
  <p>Child paragraph: green and serif (inherited), but no border.</p>
  <p class="child-border">This child uses border: inherit.</p>
</div>` },
        { type: 'heading', value: 'Keywords that control it' },
        { type: 'list', items: [
          'inherit: take the parent\'s value',
          'initial: use the property\'s built-in default',
          'unset: inherit if the property normally inherits, otherwise initial',
        ] },
      ],
    },
    {
      id: 'css-units',
      title: 'Units',
      blocks: [
        { type: 'text', value: 'Lengths in CSS always need a unit (except 0). Choosing the right unit is what makes a layout flexible.' },
        { type: 'heading', value: 'Absolute' },
        { type: 'list', items: [
          'px: one CSS pixel. Predictable, good for borders and small details.',
        ] },
        { type: 'heading', value: 'Relative' },
        { type: 'list', items: [
          '%: relative to the parent (width: 50% is half the parent\'s width)',
          'em: relative to the element\'s own font size',
          'rem: relative to the root <html> font size (usually 16px)',
          'vw / vh: 1% of the screen width / height',
          'ch: the width of the "0" character, great for readable text width',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  html { font-size: 16px; }
  .rem { font-size: 1.5rem; }          /* 24px */
  .half { width: 50%; background: #dbeafe; }
  .screen { width: 80vw; background: #fde68a; }
  .readable { max-width: 30ch; background: #dcfce7; }
</style>

<p class="rem">1.5rem text</p>
<div class="half">50% of the parent</div>
<div class="screen">80% of the screen width</div>
<p class="readable">This paragraph never gets wider than about thirty characters.</p>` },
        { type: 'note', value: 'Use rem for font sizes. If a user increases their phone\'s text size, rem-based text grows with it.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'basics', q: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Syntax'], answer: 0, explain: 'CSS stands for Cascading Style Sheets.' },
    { chapterId: 'basics', q: 'Which selector targets elements with class="menu"?', options: ['#menu', 'menu', '.menu', '*menu'], answer: 2, explain: 'A dot selects by class; a hash selects by id.' },
    { chapterId: 'basics', q: 'Which is the correct CSS syntax?', options: ['p: color = red;', 'p { color: red; }', '{p color: red}', 'p (color: red)'], answer: 1, explain: 'selector { property: value; }' },
    { chapterId: 'basics', q: 'Where should an external stylesheet be linked?', options: ['At the end of <body>', 'Inside <footer>', 'Inside <head>', 'Before <!DOCTYPE>'], answer: 2, explain: '<link rel="stylesheet"> goes inside <head>.' },
    { chapterId: 'basics', q: 'Which rule wins: .note, #note or p?', options: ['p', '.note', 'The first one written', '#note'], answer: 3, explain: 'An id selector is more specific than a class or element selector.' },
    { chapterId: 'basics', q: 'Which of these properties is inherited by child elements?', options: ['margin', 'border', 'color', 'padding'], answer: 2, explain: 'Text properties such as color and font are inherited; box properties are not.' },
    { chapterId: 'basics', q: 'What does 50vw mean?', options: ['50 pixels', 'Half the screen width', 'Half the parent width', '50% of the font size'], answer: 1, explain: '1vw is 1% of the viewport width.' },
    { chapterId: 'basics', q: 'Which selector has the highest specificity?', options: ['.card p', 'p', '#nav .link', 'div p span'], answer: 2, explain: 'It contains an id: (1, 1, 0) beats any number of classes and elements.' },
  ],
};
