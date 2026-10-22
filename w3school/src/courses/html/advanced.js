// HTML chapter: Advanced Elements. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'advanced',
  title: 'Advanced Elements',
  description: 'Scripts, interactive widgets and custom data',
  icon: 'auto-awesome',
  lessons: [
    {
      id: 'html-scripts',
      title: 'Adding JavaScript',
      blocks: [
        { type: 'text', value: 'The <script> element adds JavaScript to a page, either written inline or loaded from a file.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<p id="greeting">Waiting...</p>
<script>
  document.getElementById('greeting').textContent = 'Hello from JavaScript!';
</script>` },
        { type: 'heading', value: 'Loading a file: defer and async' },
        { type: 'code', lang: 'html', value: `<head>
  <script src="app.js" defer></script>
  <script src="analytics.js" async></script>
</head>` },
        { type: 'list', items: [
          'No attribute: the browser stops building the page until the script downloads and runs.',
          'defer: download in the background, run after the HTML is ready, in order. Best for your own code.',
          'async: download in the background, run as soon as it arrives, in any order. Good for independent scripts like analytics.',
        ] },
        { type: 'heading', value: 'noscript' },
        { type: 'code', lang: 'html', value: '<noscript>Please enable JavaScript to use this app.</noscript>' },
        { type: 'note', value: 'Use defer for almost every script you write. It never blocks the page and keeps the order of your files.' },
      ],
    },
    {
      id: 'html-details',
      title: 'Details and Summary',
      blocks: [
        { type: 'text', value: '<details> creates a box that opens and closes when tapped. The <summary> is the always-visible heading. No JavaScript needed, which makes it perfect for FAQs.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<details>
  <summary>What is HTML?</summary>
  <p>HTML is the markup language that structures web pages.</p>
</details>

<details open>
  <summary>Is it free to learn?</summary>
  <p>Yes! All you need is a text editor and a browser.</p>
</details>

<details name="faq">
  <summary>Only one in this group opens at a time</summary>
  <p>Details elements that share a name act like an accordion.</p>
</details>
<details name="faq">
  <summary>Try opening this one</summary>
  <p>The other one closes automatically.</p>
</details>` },
        { type: 'note', value: 'The open attribute makes a details box start expanded.' },
      ],
    },
    {
      id: 'html-dialog',
      title: 'The Dialog Element',
      blocks: [
        { type: 'text', value: '<dialog> is a built-in popup window. Opened with showModal(), it appears on top of the page, dims the background, and closes with the Esc key or a form button.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<button onclick="document.getElementById('box').showModal()">Open dialog</button>

<dialog id="box">
  <h3>Subscribe?</h3>
  <p>Get one new lesson every week.</p>
  <form method="dialog">
    <button value="no">Not now</button>
    <button value="yes">Subscribe</button>
  </form>
</dialog>` },
        { type: 'list', items: [
          'showModal(): open as a modal, blocking the rest of the page',
          'show(): open without blocking',
          'close(): close it from JavaScript',
          '<form method="dialog">: any button in it closes the dialog',
        ] },
        { type: 'note', value: 'A native dialog handles focus and the Esc key for you, which makes it more accessible than most homemade popups.' },
      ],
    },
    {
      id: 'html-data-attributes',
      title: 'Custom Data Attributes',
      blocks: [
        { type: 'text', value: 'Any attribute that starts with data- is yours to use. It stores extra information on an element that JavaScript and CSS can read, without breaking the HTML rules.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  [data-status="sold-out"] { opacity: 0.4; text-decoration: line-through; }
</style>

<ul>
  <li data-price="1200" data-status="in-stock">Keyboard</li>
  <li data-price="800" data-status="sold-out">Mouse</li>
  <li data-price="15000" data-status="in-stock">Monitor</li>
</ul>
<p id="total"></p>

<script>
  let sum = 0;
  document.querySelectorAll('[data-status="in-stock"]').forEach(item => {
    sum += Number(item.dataset.price);
  });
  document.getElementById('total').textContent = 'In-stock total: ' + sum;
</script>` },
        { type: 'list', items: [
          'In JavaScript, data-price is read as element.dataset.price.',
          'A name like data-user-id becomes dataset.userId.',
          'In CSS, select it with [data-status="sold-out"].',
        ] },
      ],
    },
    {
      id: 'html-template-progress',
      title: 'Template, Progress and Meter',
      blocks: [
        { type: 'heading', value: 'Progress and meter' },
        { type: 'text', value: '<progress> shows how much of a task is done. <meter> shows a measurement within a known range, like storage used or a score.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<p>Download: <progress value="70" max="100">70%</progress></p>
<p>Loading: <progress></progress> (no value = still working)</p>
<p>Disk usage: <meter value="0.8" low="0.5" high="0.75" optimum="0.2">80%</meter></p>` },
        { type: 'heading', value: 'Template' },
        { type: 'text', value: 'Content inside <template> is not shown. JavaScript copies it to build repeated items such as cards or list rows.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<template id="row">
  <li><strong class="name"></strong>: <span class="score"></span> points</li>
</template>
<ul id="board"></ul>

<script>
  const players = [['Rahim', 90], ['Karim', 75], ['Nadia', 98]];
  const tpl = document.getElementById('row');
  players.forEach(([name, score]) => {
    const copy = tpl.content.cloneNode(true);
    copy.querySelector('.name').textContent = name;
    copy.querySelector('.score').textContent = score;
    document.getElementById('board').appendChild(copy);
  });
</script>` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'advanced', q: 'Which attribute runs a script after the HTML is ready, keeping file order?', options: ['async', 'defer', 'lazy', 'wait'], answer: 1, explain: 'defer downloads in the background and runs scripts in order after parsing.' },
    { chapterId: 'advanced', q: 'Which element creates an expandable section with no JavaScript?', options: ['<dialog>', '<section>', '<details>', '<toggle>'], answer: 2, explain: '<details> with a <summary> opens and closes on tap.' },
    { chapterId: 'advanced', q: 'Which method opens a <dialog> as a modal?', options: ['open()', 'show()', 'popup()', 'showModal()'], answer: 3, explain: 'showModal() opens it on top of the page and blocks the rest.' },
    { chapterId: 'advanced', q: 'How do you read data-price in JavaScript?', options: ['element.dataset.price', 'element.data.price', 'element.price', 'element.getData("price")'], answer: 0, explain: 'data-* attributes are available through element.dataset.' },
    { chapterId: 'advanced', q: 'Which element shows how much of a task is complete?', options: ['<meter>', '<progress>', '<output>', '<range>'], answer: 1, explain: '<progress> shows task completion; <meter> shows a measurement in a range.' },
  ],
};
