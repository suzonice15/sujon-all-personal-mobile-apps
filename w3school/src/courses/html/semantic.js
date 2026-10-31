// HTML chapter: Semantic HTML. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'semantic',
  title: 'Semantic HTML',
  description: 'Meaningful layout, head tags and symbols',
  icon: 'account-tree',
  lessons: [
    {
      id: 'html-block-inline',
      title: 'Block, Inline, div and span',
      blocks: [
        { type: 'text', value: 'Block elements start on a new line and take the full width (<p>, <h1>, <div>). Inline elements stay inside the line and take only the space they need (<a>, <strong>, <span>).' },
        { type: 'code', lang: 'html', tryIt: true, value: `<div style="background: #e0f2fe; padding: 8px;">
  A div is a block container.
</div>
<p>This is <span style="color: crimson;">a red span</span> inside a line.</p>` },
        { type: 'note', value: '<div> and <span> have no meaning of their own. Use them for grouping and styling when no better element exists.' },
      ],
    },
    {
      id: 'html-classes-ids',
      title: 'Classes and IDs',
      blocks: [
        { type: 'text', value: 'class and id are the hooks that connect HTML to CSS and JavaScript.' },
        { type: 'list', items: [
          'class: a label many elements can share. One element can have several classes, separated by spaces.',
          'id: a unique name. Only one element on the page may use a given id.',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin: 6px 0; }
  .featured { border-color: gold; background: #fffbeb; }
  #main-title { color: #2965f1; }
</style>

<h2 id="main-title">Courses</h2>
<div class="card">HTML</div>
<div class="card featured">CSS (featured)</div>
<div class="card">JavaScript</div>

<button onclick="document.getElementById('main-title').textContent = 'Changed by JS!'">
  Change title
</button>` },
        { type: 'heading', value: 'Naming tips' },
        { type: 'list', items: [
          'Name by purpose, not looks: .error-message is better than .red-text.',
          'Use lowercase words joined by hyphens: .nav-link, .product-card',
          'Names are case-sensitive: .Card and .card are different.',
        ] },
      ],
    },
    {
      id: 'html-semantic',
      title: 'Semantic Layout Elements',
      blocks: [
        { type: 'text', value: 'Semantic elements describe their purpose, which helps search engines, screen readers and other developers.' },
        { type: 'list', items: [
          '<header> top of a page or section',
          '<nav> navigation links',
          '<main> the main content (one per page)',
          '<article> a self-contained piece, like a blog post',
          '<section> a themed group of content',
          '<aside> side content, like a sidebar',
          '<footer> bottom of a page or section',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<header><h1>My Blog</h1></header>
<nav><a href="#">Home</a> | <a href="#">About</a></nav>
<main>
  <article>
    <h2>First post</h2>
    <p>Semantic HTML makes pages easier to understand.</p>
  </article>
</main>
<footer><small>&copy; 2026 My Blog</small></footer>` },
      ],
    },
    {
      id: 'html-layout',
      title: 'Building a Page Layout',
      blocks: [
        { type: 'text', value: 'Most websites share the same skeleton: a header, navigation, main content, maybe a sidebar, and a footer. HTML defines the parts; CSS arranges them.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  body { margin: 0; font-family: sans-serif; }
  header, footer { background: #1e293b; color: white; padding: 12px; }
  nav { background: #334155; padding: 8px 12px; }
  nav a { color: white; margin-right: 12px; text-decoration: none; }
  .page { display: flex; flex-wrap: wrap; gap: 12px; padding: 12px; }
  main { flex: 3; min-width: 200px; }
  aside { flex: 1; min-width: 140px; background: #f1f5f9; padding: 8px; }
</style>

<header><strong>My Site</strong></header>
<nav><a href="#">Home</a><a href="#">Blog</a><a href="#">Contact</a></nav>
<div class="page">
  <main>
    <h2>Main content</h2>
    <p>The most important content of the page goes here.</p>
  </main>
  <aside>Sidebar: related links</aside>
</div>
<footer><small>&copy; 2026 My Site</small></footer>` },
        { type: 'text', value: 'On a narrow phone screen the sidebar drops below the main content automatically, because of flex-wrap and min-width.' },
        { type: 'note', value: 'Plan the HTML structure first, then style it. Good structure makes the CSS much easier.' },
      ],
    },
    {
      id: 'html-head',
      title: 'The Head and Meta Tags',
      blocks: [
        { type: 'text', value: 'The <head> contains information for the browser and search engines.' },
        { type: 'code', lang: 'html', value: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Free HTML lessons for beginners">
  <title>Learn HTML</title>
  <link rel="stylesheet" href="style.css">
  <script src="app.js" defer></script>
</head>` },
        { type: 'list', items: [
          'charset UTF-8 lets the page show any language, including Bangla.',
          'viewport makes the page fit phone screens.',
          'description is often shown under your link in search results.',
          '<link> loads a CSS file; <script> loads JavaScript.',
        ] },
        { type: 'note', value: 'Without the viewport meta tag, phones show a zoomed-out desktop version of your page.' },
      ],
    },
    {
      id: 'html-entities',
      title: 'Entities and Symbols',
      blocks: [
        { type: 'text', value: 'Some characters have a special meaning in HTML, such as < and >. To show them as text, write an entity instead.' },
        { type: 'list', items: [
          '&lt; shows <',
          '&gt; shows >',
          '&amp; shows &',
          '&quot; shows "',
          '&nbsp; a space that does not break the line',
          '&copy; shows ©',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<p>Use &lt;p&gt; for paragraphs.</p>
<p>Tom &amp; Jerry</p>
<p>&copy; 2026 CodeNest</p>` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'semantic', q: 'Which element is best for navigation links?', options: ['<div>', '<links>', '<nav>', '<menu>'], answer: 2, explain: '<nav> marks a block of navigation links.' },
    { chapterId: 'semantic', q: 'Which meta tag makes a page fit phone screens?', options: ['charset', 'description', 'author', 'viewport'], answer: 3, explain: 'The viewport meta tag sets the page width to the device width.' },
    { chapterId: 'semantic', q: 'How do you show the < character as text?', options: ['&lt;', '&less;', '<<', '\\<'], answer: 0, explain: '&lt; is the entity for <.' },
    { chapterId: 'semantic', q: 'Which of these is an inline element?', options: ['<div>', '<p>', '<span>', '<section>'], answer: 2, explain: '<span> stays inside the line; the others are block elements.' },
    { chapterId: 'semantic', q: 'How many elements may share the same id on a page?', options: ['Any number', 'Two', 'One', 'Up to ten'], answer: 2, explain: 'An id must be unique; use a class for groups.' },
  ],
};
