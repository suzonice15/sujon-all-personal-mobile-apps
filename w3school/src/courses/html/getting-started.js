// HTML chapter: Getting Started. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What HTML is and how a page is built',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'html-intro',
      title: 'What is HTML?',
      blocks: [
        { type: 'text', value: 'HTML (HyperText Markup Language) is the language that describes the structure of a web page. It tells the browser what each piece of content is: a heading, a paragraph, an image, a link, and so on.' },
        { type: 'text', value: 'HTML is not a programming language. It has no logic or calculations. It is a markup language: you wrap content in tags to give it meaning.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<h1>Welcome to my site</h1>
<p>This is my very first web page.</p>` },
        { type: 'heading', value: 'HTML, CSS and JavaScript' },
        { type: 'list', items: [
          'HTML gives a page its structure and content.',
          'CSS controls how it looks: colors, fonts, layout.',
          'JavaScript makes it interactive.',
        ] },
        { type: 'note', value: 'Every website you visit, no matter how complex, is built on HTML.' },
      ],
    },
    {
      id: 'html-first-page',
      title: 'Your First Page',
      blocks: [
        { type: 'text', value: 'All you need to write HTML is a plain text editor (such as VS Code or Notepad) and a web browser. Save your file with the .html extension, for example index.html, and open it in the browser.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>I made this page myself.</p>
  </body>
</html>` },
        { type: 'text', value: 'Tap "Try it" to edit the code and see the result instantly. Change the text and run it again.' },
        { type: 'note', value: 'index.html is the default file name most web servers look for first.' },
      ],
    },
    {
      id: 'html-structure',
      title: 'Page Structure',
      blocks: [
        { type: 'text', value: 'Every HTML document follows the same basic skeleton:' },
        { type: 'list', items: [
          '<!DOCTYPE html> tells the browser this is a modern HTML5 document.',
          '<html> is the root element that wraps everything.',
          '<head> holds information about the page (title, character set, styles). It is not shown on the page.',
          '<body> holds everything the visitor sees.',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Page title shows in the tab</title>
  </head>
  <body>
    <p>Visible content goes here.</p>
  </body>
</html>` },
        { type: 'note', value: 'The lang attribute helps screen readers and search engines understand the page language.' },
      ],
    },
    {
      id: 'html-elements',
      title: 'Elements and Tags',
      blocks: [
        { type: 'text', value: 'An element is usually made of an opening tag, some content and a closing tag. The closing tag has a forward slash.' },
        { type: 'code', lang: 'html', value: `<p>This is a paragraph.</p>
<!-- opening tag: <p>  content  closing tag: </p> -->` },
        { type: 'heading', value: 'Nesting' },
        { type: 'text', value: 'Elements can be placed inside other elements. Always close the inner element before the outer one.' },
        { type: 'code', lang: 'html', tryIt: true, value: '<p>This text is <strong>very important</strong>.</p>' },
        { type: 'heading', value: 'Empty elements' },
        { type: 'text', value: 'Some elements have no content and no closing tag, such as <br> (line break) and <img> (image).' },
        { type: 'code', lang: 'html', tryIt: true, value: '<p>First line<br>Second line</p>' },
        { type: 'note', value: 'Tag names are not case-sensitive, but lowercase is the standard.' },
      ],
    },
    {
      id: 'html-attributes',
      title: 'Attributes',
      blocks: [
        { type: 'text', value: 'Attributes add extra information to an element. They are written inside the opening tag as name="value".' },
        { type: 'code', lang: 'html', tryIt: true, value: `<a href="https://example.com" title="Visit example">Open example</a>
<p id="intro" class="highlight">Paragraph with an id and a class.</p>` },
        { type: 'heading', value: 'Common attributes' },
        { type: 'list', items: [
          'id: a unique name for one element.',
          'class: a group name shared by many elements, mostly used by CSS.',
          'style: inline CSS for one element.',
          'title: extra text shown as a tooltip.',
          'href / src: the address of a link or a file.',
        ] },
        { type: 'note', value: 'Always put attribute values in quotes.' },
      ],
    },
    {
      id: 'html-devtools',
      title: 'View Source and DevTools',
      blocks: [
        { type: 'text', value: 'The best way to learn HTML faster is to look at how real websites are built. Every browser lets you see the HTML behind any page.' },
        { type: 'heading', value: 'View page source' },
        { type: 'list', items: [
          'Desktop: right-click a page and choose "View page source" (or press Ctrl+U).',
          'Android Chrome: type view-source: before the address, for example view-source:example.com',
        ] },
        { type: 'heading', value: 'Developer Tools' },
        { type: 'text', value: 'On a computer, press F12 (or right-click an element and choose "Inspect") to open DevTools. The Elements panel shows the live HTML; you can click any element, edit its text or attributes, and see the change immediately.' },
        { type: 'list', items: [
          'Elements: inspect and edit the HTML and CSS',
          'Console: see errors and run JavaScript',
          'Network: see every file the page downloads',
          'Device toolbar: preview the page at phone sizes',
        ] },
        { type: 'note', value: 'Edits in DevTools are temporary. Reload the page and they disappear, so experiment freely.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'HyperTransfer Markup Language', 'Home Tool Markup Language'], answer: 0, explain: 'HTML stands for HyperText Markup Language.' },
    { chapterId: 'getting-started', q: 'Which part of the page is NOT shown to the visitor?', options: ['<body>', '<head>', '<p>', '<h1>'], answer: 1, explain: '<head> holds information about the page, like the title and meta tags.' },
    { chapterId: 'getting-started', q: 'Which declaration should be the first line of an HTML5 document?', options: ['<html>', '<head>', '<!DOCTYPE html>', '<meta>'], answer: 2, explain: '<!DOCTYPE html> tells the browser to use modern HTML5 rules.' },
    { chapterId: 'getting-started', q: 'Which attribute gives an element a unique name?', options: ['class', 'style', 'name', 'id'], answer: 3, explain: 'An id must be unique on the page; a class can be shared.' },
    { chapterId: 'getting-started', q: 'Which of these is an empty element (no closing tag)?', options: ['<p>', '<br>', '<div>', '<a>'], answer: 1, explain: '<br> has no content and no closing tag.' },
    { chapterId: 'getting-started', q: 'Which shortcut opens Developer Tools in most desktop browsers?', options: ['F5', 'F12', 'Ctrl+P', 'Alt+F4'], answer: 1, explain: 'F12 (or right-click > Inspect) opens DevTools.' },
  ],
};
