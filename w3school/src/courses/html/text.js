// HTML chapter: Working with Text. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'text',
  title: 'Working with Text',
  description: 'Headings, paragraphs and formatting',
  icon: 'text-fields',
  lessons: [
    {
      id: 'html-headings',
      title: 'Headings',
      blocks: [
        { type: 'text', value: 'HTML has six heading levels, from <h1> (most important) to <h6> (least important).' },
        { type: 'code', lang: 'html', tryIt: true, value: `<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
<h5>Heading level 5</h5>
<h6>Heading level 6</h6>` },
        { type: 'text', value: 'Use headings to show the outline of your content, like chapters and sections in a book, not just to make text big.' },
        { type: 'note', value: 'Use one <h1> per page for the main topic. Search engines use headings to understand your page.' },
      ],
    },
    {
      id: 'html-paragraphs',
      title: 'Paragraphs and Line Breaks',
      blocks: [
        { type: 'text', value: 'The <p> element defines a paragraph. Browsers add space above and below each paragraph automatically.' },
        { type: 'text', value: 'Extra spaces and new lines in your code are collapsed into a single space. Use <br> for a line break, and <hr> for a horizontal divider line.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<p>This    has     many spaces,
but the browser shows only one.</p>

<p>Roses are red,<br>violets are blue.</p>
<hr>
<p>A new section after the line.</p>` },
        { type: 'heading', value: 'Keeping spaces with <pre>' },
        { type: 'code', lang: 'html', tryIt: true, value: `<pre>
  Spaces   and
     line breaks
  are kept here.
</pre>` },
      ],
    },
    {
      id: 'html-formatting',
      title: 'Text Formatting',
      blocks: [
        { type: 'text', value: 'HTML has elements that give text a special meaning or look:' },
        { type: 'list', items: [
          '<strong> important text (bold)',
          '<em> emphasized text (italic)',
          '<mark> highlighted text',
          '<small> smaller text, like fine print',
          '<del> deleted text, <ins> inserted text',
          '<sub> subscript, <sup> superscript',
          '<code> a piece of computer code',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<p><strong>Warning:</strong> this is <em>really</em> important.</p>
<p>Price: <del>$50</del> <ins>$35</ins></p>
<p>Water is H<sub>2</sub>O and E = mc<sup>2</sup>.</p>
<p>Search for <mark>highlighted</mark> words.</p>
<p>Use the <code>console.log()</code> function.</p>` },
        { type: 'note', value: 'Prefer <strong> and <em> over <b> and <i>: they also tell screen readers the text matters.' },
      ],
    },
    {
      id: 'html-quotations',
      title: 'Quotations and Citations',
      blocks: [
        { type: 'text', value: 'HTML has elements for quoted text, abbreviations and contact details. They give text a precise meaning that browsers and search engines understand.' },
        { type: 'list', items: [
          '<blockquote> a long quotation, usually shown indented',
          '<q> a short inline quotation (the browser adds quote marks)',
          '<abbr> an abbreviation; the title attribute holds the full form',
          '<cite> the title of a creative work (book, film, song)',
          '<address> contact information for the author or owner',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<blockquote cite="https://example.com/speech">
  The best way to predict the future is to create it.
</blockquote>

<p>She said <q>practice every day</q> and it worked.</p>
<p>The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>
<p>My favourite book is <cite>The Pragmatic Programmer</cite>.</p>

<address>
  Written by Rahim<br>
  <a href="mailto:rahim@example.com">rahim@example.com</a>
</address>` },
        { type: 'note', value: 'On a computer, hovering over an <abbr> shows its full form as a tooltip.' },
      ],
    },
    {
      id: 'html-comments',
      title: 'Comments',
      blocks: [
        { type: 'text', value: 'Comments are notes in your code that the browser ignores. They start with <!-- and end with -->.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<!-- This is a comment. It is not shown. -->
<p>This paragraph is shown.</p>

<!--
<p>This paragraph is hidden for now.</p>
-->` },
        { type: 'note', value: 'Comments are visible to anyone who views the page source, so never put passwords in them.' },
      ],
    },
    {
      id: 'html-colors',
      title: 'Colors and Inline Styles',
      blocks: [
        { type: 'text', value: 'The style attribute lets you add CSS directly to one element. It is a quick way to change colors and fonts.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<h2 style="color: tomato;">Colored heading</h2>
<p style="background-color: #fff3cd; padding: 8px;">Yellow box</p>
<p style="color: rgb(0, 120, 200); font-size: 20px;">Blue, bigger text</p>` },
        { type: 'heading', value: 'Ways to write a color' },
        { type: 'list', items: [
          'Name: red, tomato, navy',
          'HEX: #ff6347',
          'RGB: rgb(255, 99, 71)',
        ] },
        { type: 'note', value: 'For real sites, put styles in a CSS file instead. You will learn this in a CSS course.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'text', q: 'Which is the most important heading?', options: ['<h6>', '<heading>', '<h1>', '<head>'], answer: 2, explain: '<h1> is the top-level heading; <h6> is the lowest.' },
    { chapterId: 'text', q: 'How do you write a comment in HTML?', options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'], answer: 3, explain: 'HTML comments start with <!-- and end with -->.' },
    { chapterId: 'text', q: 'Which element marks text as important?', options: ['<strong>', '<important>', '<b>', '<mark>'], answer: 0, explain: '<strong> shows bold text and also tells screen readers it is important.' },
    { chapterId: 'text', q: 'Which element keeps spaces and line breaks exactly as written?', options: ['<p>', '<pre>', '<code>', '<br>'], answer: 1, explain: '<pre> shows preformatted text.' },
    { chapterId: 'text', q: 'How do you write H₂O correctly?', options: ['H<sup>2</sup>O', 'H<small>2</small>O', 'H<sub>2</sub>O', 'H<low>2</low>O'], answer: 2, explain: '<sub> creates subscript text.' },
    { chapterId: 'text', q: 'Which element is for a long, block-level quotation?', options: ['<q>', '<cite>', '<blockquote>', '<quote>'], answer: 2, explain: '<blockquote> is for long quotations; <q> is for short inline ones.' },
    { chapterId: 'text', q: 'Where does <abbr> keep the full form of an abbreviation?', options: ['In the title attribute', 'In the alt attribute', 'Inside <full>', 'In a comment'], answer: 0, explain: '<abbr title="World Health Organization">WHO</abbr>' },
  ],
};
