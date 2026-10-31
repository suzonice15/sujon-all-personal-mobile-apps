// CSS chapter: Colors and Text. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'colors-text',
  title: 'Colors and Text',
  description: 'Color values, backgrounds and typography',
  icon: 'format-color-text',
  lessons: [
    {
      id: 'css-colors',
      title: 'Colors',
      blocks: [
        { type: 'text', value: 'CSS accepts colors in several formats:' },
        { type: 'list', items: [
          'Name: red, navy, tomato',
          'HEX: #ff6347 (or short #f63)',
          'RGB: rgb(255, 99, 71)',
          'RGBA: rgba(255, 99, 71, 0.5), the last number is opacity',
          'HSL: hsl(9, 100%, 64%)',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .a { color: tomato; }
  .b { color: #2965f1; }
  .c { color: rgb(0, 150, 100); }
  .d { background: rgba(0, 0, 0, 0.1); }
</style>

<p class="a">Named color</p>
<p class="b">HEX color</p>
<p class="c">RGB color</p>
<p class="d">Transparent background</p>` },
      ],
    },
    {
      id: 'css-backgrounds',
      title: 'Backgrounds',
      blocks: [
        { type: 'text', value: 'Backgrounds can be a color, an image or a gradient.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .solid { background-color: #e0f2fe; padding: 16px; }
  .gradient {
    background: linear-gradient(to right, #6366f1, #ec4899);
    color: white;
    padding: 16px;
  }
  .image {
    background-image: url("https://picsum.photos/400/120");
    background-size: cover;
    color: white;
    padding: 30px;
  }
</style>

<div class="solid">Solid color</div>
<div class="gradient">Gradient</div>
<div class="image">Image background</div>` },
        { type: 'note', value: 'background-size: cover fills the box with the image without stretching it.' },
      ],
    },
    {
      id: 'css-text',
      title: 'Text Styling',
      blocks: [
        { type: 'list', items: [
          'text-align: left, center, right, justify',
          'text-decoration: underline, line-through, none',
          'text-transform: uppercase, lowercase, capitalize',
          'line-height: space between lines',
          'letter-spacing: space between letters',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  h2 { text-align: center; text-transform: uppercase; letter-spacing: 3px; }
  p { line-height: 1.8; }
  a { text-decoration: none; color: #2965f1; }
</style>

<h2>Centered title</h2>
<p>Comfortable line height makes long text easier to read on any screen.</p>
<a href="#">A link without an underline</a>` },
      ],
    },
    {
      id: 'css-fonts',
      title: 'Fonts',
      blocks: [
        { type: 'text', value: 'font-family sets the typeface. Always list a fallback in case the first font is missing.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .serif { font-family: Georgia, serif; }
  .sans { font-family: Arial, sans-serif; }
  .mono { font-family: "Courier New", monospace; }
  .big { font-size: 24px; font-weight: bold; font-style: italic; }
</style>

<p class="serif">Serif font</p>
<p class="sans">Sans-serif font</p>
<p class="mono">Monospace font</p>
<p class="big">Big, bold and italic</p>` },
        { type: 'heading', value: 'Font shorthand' },
        { type: 'code', lang: 'css', value: `/* style  weight  size/line-height  family */
font: italic 700 1.25rem/1.5 Arial, sans-serif;` },
      ],
    },
    {
      id: 'css-web-fonts',
      title: 'Web Fonts',
      blocks: [
        { type: 'text', value: 'Web fonts let you use any typeface, not only the fonts installed on the visitor\'s device. Google Fonts is the most popular free source.' },
        { type: 'heading', value: 'Using Google Fonts' },
        { type: 'code', lang: 'html', tryIt: true, value: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Hind+Siliguri&display=swap" rel="stylesheet">
<style>
  h2 { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .bn { font-family: 'Hind Siliguri', sans-serif; font-size: 20px; }
</style>

<h2>Poppins heading</h2>
<p class="bn">বাংলা লেখার জন্য Hind Siliguri ফন্ট</p>` },
        { type: 'heading', value: 'Hosting your own font with @font-face' },
        { type: 'code', lang: 'css', value: `@font-face {
  font-family: 'MyFont';
  src: url('fonts/myfont.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

body { font-family: 'MyFont', sans-serif; }` },
        { type: 'note', value: 'font-display: swap shows a fallback font immediately, then swaps in the web font, so text is never invisible while loading.' },
      ],
    },
    {
      id: 'css-text-effects',
      title: 'Text Effects',
      blocks: [
        { type: 'heading', value: 'Text shadow' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .shadow { font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.4); }
  .glow { font-size: 32px; color: white; background: #0f172a; padding: 8px; text-shadow: 0 0 10px #38bdf8; }
  .gradient-text {
    font-size: 32px; font-weight: 900;
    background: linear-gradient(90deg, #f43f5e, #8b5cf6);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
</style>

<p class="shadow">Shadow</p>
<p class="glow">Glow</p>
<p class="gradient-text">Gradient</p>` },
        { type: 'heading', value: 'Cutting long text with an ellipsis' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .one-line { width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border: 1px solid #ccc; }
  .two-lines { width: 200px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; border: 1px solid #ccc; }
</style>

<p class="one-line">This is a very long product title that will not fit on one line</p>
<p class="two-lines">This description is longer. It is allowed to use two lines, then the rest is hidden with an ellipsis at the end.</p>` },
      ],
    },
    {
      id: 'css-lists-tables',
      title: 'Styling Lists and Tables',
      blocks: [
        { type: 'heading', value: 'Lists' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .check { list-style: none; padding: 0; }
  .check li::before { content: "✔ "; color: #16a34a; }
  .roman { list-style-type: upper-roman; }
  .menu { list-style: none; padding: 0; display: flex; gap: 12px; }
</style>

<ul class="check"><li>Fast</li><li>Free</li><li>Offline</li></ul>
<ol class="roman"><li>Intro</li><li>Body</li></ol>
<ul class="menu"><li>Home</li><li>Blog</li><li>About</li></ul>` },
        { type: 'heading', value: 'Tables' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: left; }
  th { background: #2965f1; color: white; }
  tr:nth-child(even) { background: #f8fafc; }
</style>

<table>
  <tr><th>Course</th><th>Lessons</th></tr>
  <tr><td>HTML</td><td>52</td></tr>
  <tr><td>CSS</td><td>56</td></tr>
  <tr><td>JavaScript</td><td>60</td></tr>
</table>` },
        { type: 'note', value: 'border-collapse: collapse merges the double borders between cells into single lines.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'colors-text', q: 'Which property changes the text color?', options: ['color', 'text-color', 'font-color', 'foreground'], answer: 0, explain: 'The color property sets the text color.' },
    { chapterId: 'colors-text', q: 'In rgba(0, 0, 0, 0.5), what does 0.5 control?', options: ['Brightness', 'Opacity', 'Saturation', 'Size'], answer: 1, explain: 'The fourth value (alpha) sets the opacity.' },
    { chapterId: 'colors-text', q: 'Which property centers text?', options: ['align: center', 'text-align: center', 'font-align: center', 'center: true'], answer: 1, explain: 'text-align: center centers inline content.' },
    { chapterId: 'colors-text', q: 'Which unit is relative to the root font size?', options: ['px', 'em', 'rem', '%'], answer: 2, explain: 'rem is relative to the <html> font size.' },
    { chapterId: 'colors-text', q: 'How do you remove the underline from links?', options: ['text-decoration: none', 'underline: none', 'text-style: none', 'link-style: plain'], answer: 0, explain: 'text-decoration controls underlines.' },
    { chapterId: 'colors-text', q: 'Which font-display value shows fallback text while a web font loads?', options: ['block', 'swap', 'hidden', 'wait'], answer: 1, explain: 'swap shows a fallback font immediately, then swaps.' },
    { chapterId: 'colors-text', q: 'Which property adds "..." when text is cut off?', options: ['text-overflow: ellipsis', 'overflow: dots', 'text-cut: ellipsis', 'white-space: ellipsis'], answer: 0, explain: 'It works together with overflow: hidden and white-space: nowrap.' },
    { chapterId: 'colors-text', q: 'Which property merges double table borders into one?', options: ['border-merge', 'border-spacing: 0', 'border-collapse: collapse', 'table-layout: fixed'], answer: 2, explain: 'border-collapse: collapse shares borders between cells.' },
  ],
};
