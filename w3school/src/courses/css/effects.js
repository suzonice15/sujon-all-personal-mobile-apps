// CSS chapter: Effects and Animation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'effects',
  title: 'Effects and Animation',
  description: 'Transitions, transforms, animations and filters',
  icon: 'animation',
  lessons: [
    {
      id: 'css-transitions',
      title: 'Transitions',
      blocks: [
        { type: 'text', value: 'A transition animates the change between two states, for example when a style changes on :hover, :active or when JavaScript adds a class.' },
        { type: 'code', lang: 'css', value: `/* property  duration  timing-function  delay */
transition: background 0.3s ease-in-out 0s;

/* several properties */
transition: transform 0.2s ease, opacity 0.2s ease;` },
        { type: 'list', items: [
          'ease: slow start and end (default)',
          'linear: constant speed',
          'ease-out: fast start, gentle stop; feels natural for things appearing',
          'cubic-bezier(...): your own curve',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .btn {
    background: #10b981; color: white; padding: 12px 20px; border: 0; border-radius: 8px;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }
  .btn:active { transform: scale(0.92); background: #047857; box-shadow: 0 0 0 6px #a7f3d0; }

  .panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: #f1f5f9; }
  .panel.open { max-height: 100px; }
</style>

<button class="btn">Press and hold</button>
<p><button onclick="document.querySelector('.panel').classList.toggle('open')">Toggle panel</button></p>
<div class="panel"><p>Smoothly revealed content.</p></div>` },
      ],
    },
    {
      id: 'css-transforms',
      title: 'Transforms',
      blocks: [
        { type: 'text', value: 'transform moves, rotates, scales or skews an element without affecting the layout around it. That is why it is the fastest way to animate.' },
        { type: 'list', items: [
          'translate(x, y): move',
          'rotate(45deg): turn',
          'scale(1.5): grow or shrink',
          'skew(10deg): slant',
          'Combine them: transform: translateY(-4px) scale(1.05);',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .row { display: flex; gap: 22px; padding: 30px 10px; }
  .box { width: 60px; height: 60px; background: #2965f1; color: white; display: grid; place-items: center; border-radius: 8px; font-size: 12px; }
  .move { transform: translate(10px, -10px); }
  .turn { transform: rotate(30deg); }
  .grow { transform: scale(1.3); }
  .slant { transform: skew(-15deg); }
  .flip { transform: perspective(300px) rotateY(45deg); }
</style>

<div class="row">
  <div class="box move">move</div>
  <div class="box turn">turn</div>
  <div class="box grow">grow</div>
  <div class="box slant">slant</div>
  <div class="box flip">3D</div>
</div>` },
        { type: 'note', value: 'transform-origin changes the point it rotates or scales around, for example transform-origin: top left.' },
      ],
    },
    {
      id: 'css-animations',
      title: 'Keyframe Animations',
      blocks: [
        { type: 'text', value: 'For animations that run on their own, define the steps with @keyframes and attach them with the animation property.' },
        { type: 'code', lang: 'css', value: `/* name  duration  timing  delay  iterations  direction  fill-mode */
animation: bounce 1s ease-in-out 0s infinite alternate both;` },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  .ball { width: 46px; height: 46px; border-radius: 50%; background: tomato; margin-top: 36px; animation: bounce 1s ease-in-out infinite; }
  .spinner { width: 36px; height: 36px; border: 4px solid #e5e7eb; border-top-color: #2965f1; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 16px 0; }
  .appear { animation: fade-in 0.8s ease-out both; }
  .appear:nth-child(2) { animation-delay: 0.3s; }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
  }
</style>

<div class="ball"></div>
<div class="spinner"></div>
<div><p class="appear">Fades in first</p><p class="appear">Then me</p></div>` },
        { type: 'note', value: 'Animate transform and opacity when you can, and respect prefers-reduced-motion for users who get dizzy from motion.' },
      ],
    },
    {
      id: 'css-filters',
      title: 'Filters and Blend Modes',
      blocks: [
        { type: 'text', value: 'filter applies photo-editing effects to any element. backdrop-filter applies them to whatever is behind the element, which creates the popular frosted-glass look.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .row { display: flex; flex-wrap: wrap; gap: 6px; }
  .row img { width: 90px; border-radius: 6px; }
  .gray { filter: grayscale(1); }
  .blur { filter: blur(3px); }
  .bright { filter: brightness(1.4) saturate(1.6); }
  .shadow { filter: drop-shadow(0 6px 6px rgba(0,0,0,0.4)); }

  .hero { position: relative; height: 140px; margin-top: 10px; background: url("https://picsum.photos/id/1018/600/300") center/cover; border-radius: 10px; }
  .glass {
    position: absolute; inset: 20px; display: grid; place-items: center; color: white; font-weight: bold;
    background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border-radius: 10px;
  }
</style>

<div class="row">
  <img src="https://picsum.photos/id/1062/200" alt="">
  <img class="gray" src="https://picsum.photos/id/1062/200" alt="">
  <img class="blur" src="https://picsum.photos/id/1062/200" alt="">
  <img class="bright" src="https://picsum.photos/id/1062/200" alt="">
</div>
<div class="hero"><div class="glass">Frosted glass</div></div>` },
        { type: 'list', items: [
          'grayscale, blur, brightness, contrast, saturate, sepia, hue-rotate, drop-shadow',
          'mix-blend-mode: multiply / screen / overlay blends an element with what is behind it',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'effects', q: 'What defines the steps of a CSS animation?', options: ['@keyframes', '@steps', 'transition', '@animate'], answer: 0, explain: '@keyframes lists the styles at each point of the animation.' },
    { chapterId: 'effects', q: 'Which properties are smoothest to animate?', options: ['width and height', 'margin and padding', 'transform and opacity', 'top and left'], answer: 2, explain: 'transform and opacity avoid recalculating the layout.' },
    { chapterId: 'effects', q: 'Which property animates a change between two states?', options: ['animation', 'transition', 'transform', 'keyframes'], answer: 1, explain: 'transition animates when a property value changes.' },
    { chapterId: 'effects', q: 'Which transform function moves an element?', options: ['move()', 'shift()', 'translate()', 'position()'], answer: 2, explain: 'translate(x, y) moves without affecting layout.' },
    { chapterId: 'effects', q: 'Which value makes an animation repeat forever?', options: ['forever', 'loop', 'infinite', 'repeat'], answer: 2, explain: 'animation-iteration-count: infinite.' },
    { chapterId: 'effects', q: 'Which media query respects users who want less motion?', options: ['prefers-reduced-motion', 'reduce-animation', 'motion: none', 'prefers-static'], answer: 0, explain: '@media (prefers-reduced-motion: reduce) { ... }' },
    { chapterId: 'effects', q: 'Which property blurs what is behind an element (frosted glass)?', options: ['filter: blur()', 'backdrop-filter', 'background-blur', 'opacity'], answer: 1, explain: 'backdrop-filter affects the content behind the element.' },
  ],
};
