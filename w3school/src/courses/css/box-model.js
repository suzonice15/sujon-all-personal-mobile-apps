// CSS chapter: The Box Model. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'box-model',
  title: 'The Box Model',
  description: 'Margin, border, padding and size',
  icon: 'crop-square',
  lessons: [
    {
      id: 'css-box-model',
      title: 'Understanding the Box Model',
      blocks: [
        { type: 'text', value: 'Every element is a rectangular box made of four layers, from inside to outside:' },
        { type: 'list', items: [
          'Content: the text or image',
          'Padding: space between the content and the border',
          'Border: a line around the padding',
          'Margin: space outside the border, separating it from other elements',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .box {
    width: 200px;
    padding: 20px;
    border: 5px solid #2965f1;
    margin: 30px;
    background: #e0e7ff;
  }
</style>

<div class="box">Content area</div>` },
        { type: 'note', value: 'Add box-sizing: border-box so padding and border are included in the width. Most developers set it on every element.' },
      ],
    },
    {
      id: 'css-margin-padding',
      title: 'Margin and Padding',
      blocks: [
        { type: 'text', value: 'Both accept one to four values, going clockwise: top, right, bottom, left.' },
        { type: 'code', lang: 'css', value: `padding: 10px;                /* all sides */
padding: 10px 20px;           /* top+bottom, left+right */
padding: 5px 10px 15px 20px;  /* top, right, bottom, left */
margin-top: 8px;              /* one side only */
margin: 0 auto;               /* center a block horizontally */` },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .card { width: 220px; margin: 0 auto; padding: 16px 24px; background: #fef3c7; }
</style>

<div class="card">I am centered with margin: 0 auto.</div>` },
      ],
    },
    {
      id: 'css-borders',
      title: 'Borders and Rounded Corners',
      blocks: [
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  div { padding: 12px; margin: 10px 0; }
  .solid { border: 2px solid #333; }
  .dashed { border: 2px dashed tomato; }
  .round { border: 2px solid #2965f1; border-radius: 12px; }
  .pill { background: #10b981; color: white; border-radius: 999px; text-align: center; }
  .circle { width: 60px; height: 60px; background: orange; border-radius: 50%; padding: 0; }
</style>

<div class="solid">Solid border</div>
<div class="dashed">Dashed border</div>
<div class="round">Rounded corners</div>
<div class="pill">Pill button</div>
<div class="circle"></div>` },
        { type: 'note', value: 'border-radius: 50% on a square makes a perfect circle.' },
      ],
    },
    {
      id: 'css-sizing',
      title: 'Width, Height and Overflow',
      blocks: [
        { type: 'text', value: 'width and height set the size. max-width keeps an element from growing too wide, which is very useful on big screens.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .container { max-width: 300px; background: #e0f2fe; padding: 10px; }
  .scroll { height: 60px; overflow: auto; border: 1px solid #999; margin-top: 10px; }
</style>

<div class="container">I never get wider than 300px.</div>
<div class="scroll">
  This box has a fixed height. When the text is longer than the box,
  overflow: auto adds a scrollbar so nothing spills out of it.
  Keep reading to scroll down inside the box.
</div>` },
        { type: 'list', items: [
          'overflow: visible (default) lets content spill out',
          'overflow: hidden cuts it off',
          'overflow: auto adds a scrollbar only when needed',
        ] },
      ],
    },
    {
      id: 'css-shadows',
      title: 'Shadows and Outline',
      blocks: [
        { type: 'text', value: 'box-shadow adds depth: x offset, y offset, blur, spread and color. Soft, large, transparent shadows look the most modern.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .box { width: 200px; padding: 16px; margin: 18px; background: white; border-radius: 12px; }
  .soft { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .deep { box-shadow: 0 20px 40px -10px rgba(0,0,0,0.35); }
  .inset { box-shadow: inset 0 2px 6px rgba(0,0,0,0.25); }
  .ring { box-shadow: 0 0 0 4px #93c5fd; }
  .outline { outline: 3px dashed tomato; outline-offset: 6px; }
</style>

<div class="box soft">Soft shadow</div>
<div class="box deep">Deep shadow</div>
<div class="box inset">Inset shadow</div>
<div class="box ring">Ring (spread only)</div>
<div class="box outline">Outline with offset</div>` },
        { type: 'list', items: [
          'Several shadows can be combined with commas.',
          'outline is drawn outside the border and does not take up space.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'box-model', q: 'Which layer is between the content and the border?', options: ['Margin', 'Outline', 'Padding', 'Gap'], answer: 2, explain: 'Padding is inside the border; margin is outside.' },
    { chapterId: 'box-model', q: 'What does margin: 0 auto do on a block with a width?', options: ['Removes all spacing', 'Centers it horizontally', 'Centers it vertically', 'Makes it full width'], answer: 1, explain: 'Auto left and right margins split the free space equally.' },
    { chapterId: 'box-model', q: 'Which value makes a square element a circle?', options: ['border-radius: 50%', 'border: circle', 'shape: round', 'radius: 100px'], answer: 0, explain: 'A 50% radius on a square creates a circle.' },
    { chapterId: 'box-model', q: 'Which overflow value adds a scrollbar only when needed?', options: ['visible', 'hidden', 'scroll', 'auto'], answer: 3, explain: 'auto shows a scrollbar only if content overflows.' },
    { chapterId: 'box-model', q: 'Which keyword draws a shadow inside the box?', options: ['inner', 'inset', 'inside', 'deep'], answer: 1, explain: 'box-shadow: inset ... draws the shadow inside.' },
  ],
};
