// HTML chapter: Links and Media. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'links-media',
  title: 'Links and Media',
  description: 'Connect pages, show images and video',
  icon: 'link',
  lessons: [
    {
      id: 'html-links',
      title: 'Links',
      blocks: [
        { type: 'text', value: 'Links are created with the <a> (anchor) element. The href attribute holds the destination.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<a href="https://example.com">Go to example.com</a>
<br>
<a href="https://example.com" target="_blank">Open in a new tab</a>
<br>
<a href="mailto:hello@example.com">Send an email</a>` },
        { type: 'heading', value: 'Absolute and relative links' },
        { type: 'list', items: [
          'Absolute: a full address, like https://example.com/about.html',
          'Relative: a path inside your own site, like about.html or images/logo.png',
        ] },
        { type: 'heading', value: 'Jump within a page' },
        { type: 'code', lang: 'html', value: `<a href="#contact">Go to contact</a>
...
<h2 id="contact">Contact</h2>` },
      ],
    },
    {
      id: 'html-paths',
      title: 'File Paths and Downloads',
      blocks: [
        { type: 'text', value: 'A file path tells the browser where to find a file: another page, an image, a stylesheet. Getting paths right is one of the most common beginner problems.' },
        { type: 'text', value: 'Imagine this folder structure:' },
        { type: 'code', lang: 'text', value: `my-site/
├── index.html
├── about.html
├── images/
│   └── logo.png
└── blog/
    └── post.html` },
        { type: 'list', items: [
          'From index.html: images/logo.png (a folder inside the current one)',
          'From blog/post.html: ../images/logo.png (.. means "go up one folder")',
          'From anywhere: /images/logo.png (a leading / starts at the site root)',
        ] },
        { type: 'heading', value: 'Download links' },
        { type: 'code', lang: 'html', value: `<a href="files/cv.pdf" download>Download my CV</a>
<a href="files/cv.pdf" download="Rahim-CV.pdf">Download with a new name</a>` },
        { type: 'heading', value: 'Safe external links' },
        { type: 'code', lang: 'html', value: `<a href="https://other-site.com" target="_blank" rel="noopener noreferrer">
  Other site
</a>` },
        { type: 'note', value: 'rel="noopener" stops the opened page from controlling your page. Add it to every target="_blank" link.' },
      ],
    },
    {
      id: 'html-images',
      title: 'Images',
      blocks: [
        { type: 'text', value: 'The <img> element shows an image. It is an empty element with two important attributes:' },
        { type: 'list', items: [
          'src: the image address',
          'alt: a text description, shown if the image cannot load and read aloud by screen readers',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: '<img src="https://picsum.photos/300/180" alt="A random landscape" width="300">' },
        { type: 'heading', value: 'Image as a link' },
        { type: 'code', lang: 'html', tryIt: true, value: `<a href="https://example.com">
  <img src="https://picsum.photos/120" alt="Click me" width="120">
</a>` },
        { type: 'note', value: 'Always write a meaningful alt text. It is required for accessibility and helps SEO.' },
      ],
    },
    {
      id: 'html-responsive-images',
      title: 'Responsive Images',
      blocks: [
        { type: 'text', value: 'A phone does not need the huge image a desktop monitor needs. Responsive images let the browser download the right size, which makes pages load much faster.' },
        { type: 'heading', value: 'srcset and sizes' },
        { type: 'code', lang: 'html', value: `<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Mountain lake at sunrise">` },
        { type: 'list', items: [
          'srcset lists the available files and their real widths (400w = 400 pixels wide).',
          'sizes tells the browser how wide the image will be shown.',
          'The browser picks the smallest file that still looks sharp.',
        ] },
        { type: 'heading', value: 'The <picture> element' },
        { type: 'text', value: '<picture> lets you offer different formats or different crops. The browser uses the first <source> it supports, and <img> is the fallback.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<picture>
  <source media="(max-width: 600px)" srcset="https://picsum.photos/id/1015/300/300">
  <img src="https://picsum.photos/id/1015/600/250" alt="River valley" style="max-width:100%">
</picture>` },
        { type: 'heading', value: 'Lazy loading' },
        { type: 'code', lang: 'html', value: '<img src="gallery-12.jpg" alt="..." loading="lazy" width="600" height="400">' },
        { type: 'note', value: 'Always set width and height on images. The browser reserves the space, so the page does not jump while loading.' },
      ],
    },
    {
      id: 'html-favicon',
      title: 'Favicon and Page Title',
      blocks: [
        { type: 'text', value: 'The favicon is the small icon shown in the browser tab, bookmarks and history. Together with the <title>, it is the first thing people see of your site.' },
        { type: 'code', lang: 'html', value: `<head>
  <title>CodeNest | Learn HTML</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>` },
        { type: 'list', items: [
          'favicon.ico: works in every browser',
          'icon.svg: sharp at any size in modern browsers',
          'apple-touch-icon.png (180x180): used when someone adds your site to an iPhone home screen',
        ] },
        { type: 'heading', value: 'Writing a good title' },
        { type: 'list', items: [
          'Keep it under about 60 characters.',
          'Put the most important words first.',
          'Give every page its own unique title.',
        ] },
      ],
    },
    {
      id: 'html-media',
      title: 'Audio and Video',
      blocks: [
        { type: 'text', value: 'HTML5 can play media without any plugin, using <audio> and <video>. The controls attribute shows play, pause and volume buttons.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<video width="300" controls>
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  Your browser does not support video.
</video>` },
        { type: 'code', lang: 'html', value: `<audio controls>
  <source src="song.mp3" type="audio/mpeg">
</audio>` },
        { type: 'heading', value: 'Useful media attributes' },
        { type: 'list', items: [
          'autoplay: start playing on load (browsers only allow it when muted)',
          'muted: start without sound',
          'loop: play again when it ends',
          'poster="image.jpg": the picture shown before the video starts',
          'playsinline: play inside the page on iPhones instead of full screen',
        ] },
        { type: 'code', lang: 'html', value: '<video src="intro.mp4" poster="intro.jpg" autoplay muted loop playsinline></video>' },
        { type: 'heading', value: 'Subtitles' },
        { type: 'code', lang: 'html', value: `<video controls src="lesson.mp4">
  <track src="lesson-en.vtt" kind="subtitles" srclang="en" label="English" default>
  <track src="lesson-bn.vtt" kind="subtitles" srclang="bn" label="বাংলা">
</video>` },
      ],
    },
    {
      id: 'html-iframes',
      title: 'Iframes',
      blocks: [
        { type: 'text', value: 'The <iframe> element shows another web page inside yours. It is how sites embed YouTube videos, Google Maps and payment forms.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=90.38,23.72,90.42,23.75"
  width="100%" height="250"
  style="border:0"
  title="Map of Dhaka"
  loading="lazy">
</iframe>` },
        { type: 'list', items: [
          'title: describes the frame for screen readers (always add it)',
          'loading="lazy": load it only when it scrolls into view',
          'allowfullscreen: allow the embedded video to go full screen',
          'sandbox: restrict what the embedded page is allowed to do',
        ] },
        { type: 'note', value: 'Many sites block being shown in an iframe for security. If an iframe stays blank, the site probably does not allow it.' },
      ],
    },
    {
      id: 'html-svg-canvas',
      title: 'SVG and Canvas',
      blocks: [
        { type: 'text', value: 'HTML has two ways to draw graphics directly in the page.' },
        { type: 'heading', value: 'SVG: shapes described in markup' },
        { type: 'text', value: 'SVG (Scalable Vector Graphics) draws shapes with tags. It stays sharp at any size, which makes it perfect for icons, logos and charts.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<svg width="220" height="120">
  <rect x="10" y="10" width="90" height="90" rx="12" fill="#2965f1" />
  <circle cx="160" cy="55" r="45" fill="tomato" />
  <text x="135" y="62" fill="white" font-size="20">SVG</text>
</svg>` },
        { type: 'heading', value: 'Canvas: pixels drawn with JavaScript' },
        { type: 'text', value: '<canvas> is an empty drawing area. JavaScript paints pixels onto it, which is how browser games and image editors work.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<canvas id="board" width="220" height="120" style="border:1px solid #ccc"></canvas>
<script>
  const ctx = document.getElementById('board').getContext('2d');
  ctx.fillStyle = '#10b981';
  ctx.fillRect(10, 10, 100, 100);
  ctx.beginPath();
  ctx.arc(165, 60, 45, 0, Math.PI * 2);
  ctx.fillStyle = '#f59e0b';
  ctx.fill();
</script>` },
        { type: 'note', value: 'Use SVG for graphics that must stay sharp or be styled with CSS; use canvas for fast-changing pixels such as games.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'links-media', q: 'Which attribute sets where a link goes?', options: ['src', 'link', 'href', 'to'], answer: 2, explain: 'The href attribute of <a> holds the destination.' },
    { chapterId: 'links-media', q: 'How do you open a link in a new tab?', options: ['target="_blank"', 'new="tab"', 'open="new"', 'target="_new"'], answer: 0, explain: 'target="_blank" opens the link in a new tab or window.' },
    { chapterId: 'links-media', q: 'Which attribute describes an image for screen readers?', options: ['title', 'alt', 'desc', 'src'], answer: 1, explain: 'alt text is read aloud and shown if the image fails to load.' },
    { chapterId: 'links-media', q: 'Which attribute shows play and pause buttons on a video?', options: ['play', 'buttons', 'autoplay', 'controls'], answer: 3, explain: 'controls shows the browser\'s built-in media controls.' },
    { chapterId: 'links-media', q: 'From blog/post.html, which path reaches images/logo.png at the site root folder?', options: ['images/logo.png', '../images/logo.png', './logo.png', 'blog/images/logo.png'], answer: 1, explain: '.. goes up one folder, out of blog/.' },
    { chapterId: 'links-media', q: 'Which attribute lists several image files so the browser can choose a size?', options: ['sizes', 'src', 'srcset', 'source'], answer: 2, explain: 'srcset lists candidate files with their widths.' },
    { chapterId: 'links-media', q: 'Which graphic stays sharp at any size and is written as markup?', options: ['<canvas>', 'JPEG', 'PNG', '<svg>'], answer: 3, explain: 'SVG is vector markup; canvas draws pixels with JavaScript.' },
  ],
};
