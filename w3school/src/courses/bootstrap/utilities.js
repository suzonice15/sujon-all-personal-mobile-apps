// Bootstrap chapter: Utilities.

export default {
  id: 'utilities',
  title: 'Utilities',
  description: 'Spacing, colours, display and text helpers',
  icon: 'tune',
  lessons: [
    {
      id: 'bs-spacing',
      title: 'Spacing',
      blocks: [
        { type: 'text', value: 'Spacing utilities use m for margin and p for padding, a side (t, b, s, e, x, y) and a size from 0 to 5. They remove most one-off CSS rules.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="p-3 mb-4">
  <h2 class="mb-2">Courses</h2>
  <p class="mb-0 text-muted">Pick a topic and start.</p>
</div>` },
        { type: 'note', value: 'mb-0 on the last element removes the extra gap before the next section.' },
      ],
    },
    {
      id: 'bs-colors-text',
      title: 'Colours and text',
      blocks: [
        { type: 'text', value: 'Use text-* and bg-* for colour, text-center and text-muted for alignment and emphasis, and fw-bold or fst-italic for weight and style.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<p class="text-muted">Secondary information</p>
<p class="text-danger">Something went wrong</p>
<div class="bg-body-tertiary p-3 rounded">
  <span class="fw-bold">Total:</span> 5,000 Tk
</div>` },
        { type: 'note', value: 'Colour is not enough for status. Add an icon or label for accessibility.' },
      ],
    },
    {
      id: 'bs-display',
      title: 'Display and flex helpers',
      blocks: [
        { type: 'list', items: [
          'd-none and d-block for visibility',
          'd-flex for a flex container',
          'gap-2 to gap-5 for spacing',
          'justify-content-center and align-items-center',
          'flex-column for stacking',
          'text-truncate for one-line ellipsis',
        ] },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="d-flex flex-column flex-md-row gap-3 align-items-md-center">
  <h2 class="m-0 flex-grow-1">Courses</h2>
  <button class="btn btn-primary">New</button>
</div>` },
        { type: 'note', value: 'A utility-first pass often replaces half the custom CSS. Only write CSS when no utility fits.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'utilities',
      q: 'What does mb-4 do?',
      options: ['Adds margin bottom 4 units', 'Adds padding', 'Sets a border', 'Changes colour'],
      answer: 0,
      explain: 'm is margin, b is bottom.',
    },
    {
      chapterId: 'utilities',
      q: 'Which class hides an element?',
      options: ['d-none', 'd-hide', 'hidden', 'v-none'],
      answer: 0,
      explain: 'd-none hides it.',
    },
    {
      chapterId: 'utilities',
      q: 'What does d-flex enable?',
      options: ['Grid', 'Flexbox layout', 'A modal', 'A table'],
      answer: 1,
      explain: 'It applies display flex.',
    },
    {
      chapterId: 'utilities',
      q: 'Why add an icon to a status colour?',
      options: ['For decoration', 'So colour is not the only signal', 'To load faster', 'To add a link'],
      answer: 1,
      explain: 'Accessibility needs a non-colour cue.',
    },
  ],
};
