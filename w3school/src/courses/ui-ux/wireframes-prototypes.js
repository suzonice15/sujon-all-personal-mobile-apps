// UI/UX chapter: Wireframes & Prototypes.

export default {
  id: 'wireframes-prototypes',
  title: 'Wireframes & Prototypes',
  description: 'Sketching, Figma and testing a flow',
  icon: 'draw',
  lessons: [
    {
      id: 'ux-wireframes',
      title: 'Wireframes',
      blocks: [
        { type: 'text', value: 'A wireframe is a low-fidelity sketch of structure: what goes where, without colour or final content. It is fast and cheap, so you can try several layouts before committing.' },
        { type: 'list', items: [
          'Start on paper or a whiteboard',
          'Show structure, not styling',
          'Sketch three options, not one',
          'Use real content lengths to catch layout problems',
          'Get feedback before adding polish',
        ] },
        { type: 'note', value: 'Jumping straight to high-fidelity screens hides structural problems under pretty pixels. Sketch first.' },
      ],
    },
    {
      id: 'ux-figma',
      title: 'Figma basics',
      blocks: [
        { type: 'text', value: 'Figma is the most common design tool. Frames are screens, components are reusable elements, and auto layout handles spacing. Variants cover states such as hover and disabled.' },
        { type: 'list', items: [
          'Frames: screens and sections',
          'Auto layout: responsive spacing and stacking',
          'Components: reusable buttons, inputs, cards',
          'Variants: default, hover, focus, disabled',
          'Styles and variables: colour and type tokens',
          'Prototype links: connect screens into a flow',
        ] },
        { type: 'note', value: 'Build components with auto layout from the start. Resizing a screen later is trivial when the elements are laid out properly.' },
      ],
    },
    {
      id: 'ux-prototype-test',
      title: 'Prototypes and testing',
      blocks: [
        { type: 'text', value: 'A prototype connects screens so a person can click through a flow. Test with 5 people and watch where they hesitate, misclick or give up. You are testing the design, not the person.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Task: "Find the JavaScript course and start lesson 3."

Watch for:
- where the user looks first
- wrong turns and hesitation
- questions they ask out loud
- whether they finish without help` },
        { type: 'note', value: 'Ask the user to think aloud, but do not guide them. A hint hides the exact problem you need to see.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'wireframes-prototypes',
      q: 'What is a wireframe?',
      options: ['A final design', 'A low-fidelity sketch of structure', 'A code file', 'A colour palette'],
      answer: 1,
      explain: 'Wireframes show structure without styling.',
    },
    {
      chapterId: 'wireframes-prototypes',
      q: 'Why sketch several options?',
      options: ['To waste time', 'To compare directions before committing', 'To please the client', 'To avoid testing'],
      answer: 1,
      explain: 'Options reveal better directions.',
    },
    {
      chapterId: 'wireframes-prototypes',
      q: 'What does auto layout help with?',
      options: ['Colour contrast', 'Responsive spacing and stacking', 'Typography', 'Research'],
      answer: 1,
      explain: 'Auto layout handles spacing and resizing.',
    },
    {
      chapterId: 'wireframes-prototypes',
      q: 'How many people for a quick prototype test?',
      options: ['One', 'About 5', '50', 'None'],
      answer: 1,
      explain: 'Five users reveal most major issues.',
    },
  ],
};
