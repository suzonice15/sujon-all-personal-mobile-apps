// CSS chapter: Architecture and Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'projects',
  title: 'Architecture and Projects',
  description: 'Organize CSS like a pro and build real UIs',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'css-architecture',
      title: 'Naming and Organizing CSS (BEM)',
      blocks: [
        { type: 'text', value: 'On big projects, CSS gets messy fast: styles clash and nobody dares to delete anything. A naming convention keeps it predictable. BEM (Block, Element, Modifier) is the most widely used one.' },
        { type: 'list', items: [
          'Block: a standalone component, .card',
          'Element: a part of the block, two underscores, .card__title',
          'Modifier: a variation, two dashes, .card--featured',
        ] },
        { type: 'code', lang: 'html', value: `<article class="card card--featured">
  <img class="card__image" src="..." alt="">
  <h3 class="card__title">Learn CSS</h3>
  <button class="card__button card__button--primary">Start</button>
</article>` },
        { type: 'code', lang: 'css', value: `.card { border-radius: 10px; padding: 16px; }
.card--featured { border: 2px solid gold; }
.card__title { font-size: 1.25rem; }
.card__button--primary { background: var(--brand); }` },
        { type: 'heading', value: 'Organizing files' },
        { type: 'list', items: [
          'base.css: reset, variables, typography',
          'layout.css: header, grid, page structure',
          'components/: one file per component (card.css, button.css)',
          'utilities.css: small helpers like .sr-only or .text-center',
        ] },
        { type: 'note', value: 'Prefer classes over ids and element selectors for styling. Classes keep specificity low and equal, so the order of your files decides.' },
      ],
    },
    {
      id: 'css-reset',
      title: 'CSS Reset and Base Styles',
      blocks: [
        { type: 'text', value: 'Every browser has its own default styles (margins on body, different heading sizes). A small reset at the top of your CSS gives every project the same clean starting point.' },
        { type: 'code', lang: 'css', value: `*, *::before, *::after { box-sizing: border-box; }

* { margin: 0; }

html { -webkit-text-size-adjust: 100%; }

body {
  min-height: 100vh;
  line-height: 1.5;
  font-family: system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg { display: block; max-width: 100%; }

input, button, textarea, select { font: inherit; }

p, h1, h2, h3 { overflow-wrap: break-word; }` },
        { type: 'list', items: [
          'box-sizing: border-box makes widths include padding and border',
          'max-width: 100% stops media from overflowing on phones',
          'font: inherit makes form controls use your font instead of the browser\'s',
        ] },
      ],
    },
    {
      id: 'css-debugging',
      title: 'Debugging CSS',
      blocks: [
        { type: 'text', value: 'When a style "does not work", it is almost always one of a few causes. Check them in this order.' },
        { type: 'list', items: [
          'Typo: a missing semicolon or a misspelled property silently breaks a declaration.',
          'Wrong selector: the class name in HTML and CSS do not match exactly.',
          'Specificity: another rule is stronger. DevTools shows overridden rules crossed out.',
          'The property does not apply: z-index on a static element, width on an inline element.',
          'Cache: the browser is using an old file. Hard reload with Ctrl+Shift+R.',
        ] },
        { type: 'heading', value: 'The outline trick' },
        { type: 'text', value: 'Add this temporarily to see the exact box of every element, which instantly reveals what is overflowing.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  * { outline: 1px solid rgba(255, 0, 0, 0.5); }
  .wide { width: 120%; background: #fde68a; }
</style>

<div>Normal box</div>
<div class="wide">This box is too wide and causes sideways scrolling</div>
<p>Paragraph <span>with a span</span></p>` },
        { type: 'note', value: 'In DevTools, the Computed tab shows the final value of every property and which rule set it.' },
      ],
    },
    {
      id: 'css-project-navbar',
      title: 'Project 1: Responsive Navbar',
      blocks: [
        { type: 'text', value: 'A navbar that shows links in a row on wide screens and collapses into a menu button on phones. It uses Flexbox, a media query and a checkbox trick, so no JavaScript is required.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: sans-serif; }
  .nav { display: flex; align-items: center; flex-wrap: wrap; background: #0f172a; padding: 12px 16px; }
  .nav__logo { color: white; font-weight: 800; font-size: 20px; text-decoration: none; margin-right: auto; }
  .nav__toggle { display: none; }
  .nav__button { color: white; font-size: 26px; cursor: pointer; display: none; }
  .nav__links { display: flex; gap: 18px; list-style: none; margin: 0; padding: 0; }
  .nav__links a { color: #cbd5e1; text-decoration: none; }

  @media (max-width: 600px) {
    .nav__button { display: block; }
    .nav__links { display: none; width: 100%; flex-direction: column; gap: 0; margin-top: 10px; }
    .nav__links a { display: block; padding: 10px 0; border-top: 1px solid #1e293b; }
    .nav__toggle:checked ~ .nav__links { display: flex; }
  }
</style>

<nav class="nav">
  <a class="nav__logo" href="#">CodeNest</a>
  <input type="checkbox" id="menu" class="nav__toggle">
  <label for="menu" class="nav__button" aria-label="Menu">☰</label>
  <ul class="nav__links">
    <li><a href="#">Courses</a></li>
    <li><a href="#">Quiz</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>
<p style="padding:16px">Tap ☰ on a phone screen to open the menu.</p>` },
        { type: 'heading', value: 'Challenge' },
        { type: 'list', items: [
          'Animate the menu opening with a transition on max-height.',
          'Highlight the current page link with a .nav__link--active modifier.',
        ] },
      ],
    },
    {
      id: 'css-project-pricing',
      title: 'Project 2: Pricing Cards',
      blocks: [
        { type: 'text', value: 'A classic pricing section: responsive grid, variables for theming, a highlighted plan, and buttons aligned to the bottom with Flexbox.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  :root { --brand: #6366f1; --radius: 16px; }
  * { box-sizing: border-box; }
  body { font-family: sans-serif; background: #f8fafc; margin: 0; padding: 16px; color: #0f172a; }
  .pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
  .plan { display: flex; flex-direction: column; background: white; border-radius: var(--radius); padding: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
  .plan--popular { border: 2px solid var(--brand); transform: translateY(-6px); position: relative; }
  .plan--popular::before { content: "Most popular"; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--brand); color: white; font-size: 12px; padding: 3px 10px; border-radius: 999px; }
  .plan__price { font-size: 32px; font-weight: 800; margin: 8px 0; }
  .plan__price small { font-size: 14px; color: #64748b; font-weight: 400; }
  .plan__features { list-style: none; padding: 0; flex: 1; }
  .plan__features li { padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
  .plan__features li::before { content: "✓ "; color: #10b981; font-weight: bold; }
  .plan__button { margin-top: 12px; padding: 12px; border: 0; border-radius: 10px; background: #e0e7ff; color: var(--brand); font-weight: 700; transition: transform 0.15s; }
  .plan--popular .plan__button { background: var(--brand); color: white; }
  .plan__button:active { transform: scale(0.96); }
</style>

<section class="pricing">
  <article class="plan">
    <h3>Free</h3>
    <p class="plan__price">৳0 <small>/month</small></p>
    <ul class="plan__features"><li>HTML course</li><li>Quizzes</li></ul>
    <button class="plan__button">Start free</button>
  </article>
  <article class="plan plan--popular">
    <h3>Pro</h3>
    <p class="plan__price">৳199 <small>/month</small></p>
    <ul class="plan__features"><li>All courses</li><li>Certificates</li><li>No ads</li></ul>
    <button class="plan__button">Go Pro</button>
  </article>
  <article class="plan">
    <h3>Team</h3>
    <p class="plan__price">৳999 <small>/month</small></p>
    <ul class="plan__features"><li>10 members</li><li>Progress reports</li></ul>
    <button class="plan__button">Contact us</button>
  </article>
</section>` },
        { type: 'heading', value: 'Challenge' },
        { type: 'list', items: [
          'Add a monthly/yearly toggle using a checkbox and :has().',
          'Add a dark theme by overriding the variables.',
        ] },
      ],
    },
    {
      id: 'css-project-blog',
      title: 'Project 3: Responsive Blog Layout',
      blocks: [
        { type: 'text', value: 'A full page layout with Grid template areas that rearranges itself on phones, fluid typography with clamp(), and article cards. This combines nearly everything from the course.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  :root { --brand: #0f766e; --gap: 14px; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; color: #0f172a; }
  .layout {
    display: grid; gap: var(--gap); padding: var(--gap);
    grid-template-areas: "header" "main" "side" "footer";
  }
  @media (min-width: 700px) {
    .layout { grid-template-columns: 3fr 1fr; grid-template-areas: "header header" "main side" "footer footer"; }
  }
  .header { grid-area: header; background: var(--brand); color: white; padding: 20px; border-radius: 12px; }
  .header h1 { margin: 0; font-size: clamp(1.5rem, 5vw, 2.5rem); }
  .main { grid-area: main; display: grid; gap: var(--gap); }
  .side { grid-area: side; background: #f1f5f9; padding: 14px; border-radius: 12px; }
  .footer { grid-area: footer; text-align: center; color: #64748b; }
  .post { display: grid; grid-template-columns: 90px 1fr; gap: 12px; align-items: center; background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px; }
  .post img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; }
  .post h3 { margin: 0; font-size: 1.05rem; }
  .post p { margin: 4px 0 0; color: #64748b; font-size: 0.9rem; }
  .tag { display: inline-block; background: white; border: 1px solid #cbd5e1; border-radius: 999px; padding: 2px 10px; margin: 3px; font-size: 13px; }
</style>

<div class="layout">
  <header class="header"><h1>The Dev Diary</h1><p>Notes on learning to code</p></header>
  <main class="main">
    <article class="post"><img src="https://picsum.photos/id/0/200" alt=""><div><h3>My first month with CSS</h3><p>What finally made Flexbox click.</p></div></article>
    <article class="post"><img src="https://picsum.photos/id/2/200" alt=""><div><h3>Grid in 10 minutes</h3><p>Template areas changed everything.</p></div></article>
    <article class="post"><img src="https://picsum.photos/id/3/200" alt=""><div><h3>Dark mode the easy way</h3><p>Variables plus one media query.</p></div></article>
  </main>
  <aside class="side">
    <h3>Topics</h3>
    <span class="tag">HTML</span><span class="tag">CSS</span><span class="tag">Grid</span><span class="tag">Flexbox</span>
  </aside>
  <footer class="footer"><small>&copy; 2026 The Dev Diary</small></footer>
</div>` },
        { type: 'note', value: 'Congratulations! You have finished the CSS course. Take the CSS Full Test in the Quiz tab to check your skills.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'In BEM, what does .card__title represent?', options: ['A modifier', 'An element of the card block', 'A new block', 'An id'], answer: 1, explain: 'Two underscores mark an element inside a block.' },
    { chapterId: 'projects', q: 'In BEM, what does .button--primary represent?', options: ['An element', 'A block', 'A modifier (variation)', 'A pseudo-class'], answer: 2, explain: 'Two dashes mark a modifier.' },
    { chapterId: 'projects', q: 'Why add box-sizing: border-box to every element?', options: ['It adds borders', 'Width includes padding and border, making sizes predictable', 'It removes margins', 'It improves fonts'], answer: 1, explain: 'With border-box, width: 200px really means 200px wide.' },
    { chapterId: 'projects', q: 'A rule appears crossed out in DevTools. What does that mean?', options: ['It has a syntax error', 'Another rule overrides it', 'The file is missing', 'It is a comment'], answer: 1, explain: 'Crossed-out declarations lost the cascade to a stronger rule.' },
  ],
};
