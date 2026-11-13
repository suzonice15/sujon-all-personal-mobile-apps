// UI/UX chapter: Usability & Accessibility.

export default {
  id: 'usability-accessibility',
  title: 'Usability & Accessibility',
  description: 'Heuristics, WCAG and inclusive design',
  icon: 'accessible',
  lessons: [
    {
      id: 'ux-heuristics',
      title: 'Usability heuristics',
      blocks: [
        { type: 'text', value: 'Nielsen\'s ten heuristics are a checklist for evaluating an interface: visibility of system status, match to the real world, user control, consistency, error prevention, recognition over recall, flexibility, minimalist design, helpful errors and documentation.' },
        { type: 'list', items: [
          'Show status: loading, saved, failed',
          'Speak the user\'s language, not internal jargon',
          'Let people undo and go back',
          'Be consistent across screens',
          'Prevent errors before they happen',
          'Show options instead of forcing recall',
        ] },
        { type: 'note', value: 'A heuristic review is fast and finds real problems. Do it before a usability test to remove the obvious issues.' },
      ],
    },
    {
      id: 'ux-accessibility',
      title: 'Accessibility',
      blocks: [
        { type: 'text', value: 'Accessibility means people with disabilities can use the product. It covers vision, hearing, motor and cognitive needs. WCAG is the standard: perceivable, operable, understandable and robust.' },
        { type: 'list', items: [
          'Contrast 4.5:1 for text',
          'Keyboard access for every action',
          'Visible focus states',
          'Labels for every input',
          'Alt text for meaningful images',
          'Do not rely on colour alone',
          'Captions for video',
        ] },
        { type: 'note', value: 'Accessibility is not a separate project. It is part of building a usable product, and it often improves the experience for everyone.' },
      ],
    },
    {
      id: 'ux-error-states',
      title: 'Errors and empty states',
      blocks: [
        { type: 'text', value: 'Design the states people actually hit: loading, empty, error, success and disabled. Most mockups show only the happy path, which is why real products feel broken when something goes wrong.' },
        { type: 'list', items: [
          'Loading: a skeleton or spinner, not a blank screen',
          'Empty: explain what goes here and how to add it',
          'Error: say what happened and what to do next',
          'Success: confirm the action clearly',
          'Disabled: explain why, if it is not obvious',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `Bad:  "Error 500"
Good: "We could not save your changes. Check your connection and try again."` },
        { type: 'note', value: 'A clear error message prevents a support ticket. A vague one creates two.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'usability-accessibility',
      q: 'What is a usability heuristic?',
      options: ['A legal rule', 'A checklist principle for evaluating an interface', 'A colour', 'A font'],
      answer: 1,
      explain: 'Heuristics guide fast usability reviews.',
    },
    {
      chapterId: 'usability-accessibility',
      q: 'Which is an accessibility requirement?',
      options: ['Autoplay video', 'Keyboard access for every action', 'Low contrast text', 'Color-only status'],
      answer: 1,
      explain: 'Every action must be keyboard accessible.',
    },
    {
      chapterId: 'usability-accessibility',
      q: 'Why design empty and error states?',
      options: ['They are rare', 'Users hit them and need clear guidance', 'They look nice', 'They are required by law'],
      answer: 1,
      explain: 'Real products must handle failure clearly.',
    },
    {
      chapterId: 'usability-accessibility',
      q: 'What makes a good error message?',
      options: ['A code only', 'What happened and what to do next', 'A joke', 'Nothing'],
      answer: 1,
      explain: 'Explain the problem and the next step.',
    },
  ],
};
