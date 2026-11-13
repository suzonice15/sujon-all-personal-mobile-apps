// English for Developers chapter: Vocabulary.

export default {
  id: 'vocabulary',
  title: 'Technical Vocabulary',
  description: 'The words used in tickets, reviews and standups',
  icon: 'translate',
  lessons: [
    {
      id: 'eng-verbs',
      title: 'Verbs you will use daily',
      blocks: [
        { type: 'text', value: 'Developers use a small set of verbs constantly. Learn them in a sentence, not as a list, so you can use them without translating in your head.' },
        { type: 'list', items: [
          'deploy: put code on a server',
          'revert: undo a change',
          'reproduce: make a bug happen again',
          'refactor: improve code without changing behaviour',
          'migrate: move data or change the schema',
          'roll back: return to the previous version',
          'ship: release to users',
        ] },
        { type: 'note', value: 'Use the same verb the team uses. “Reproduce the bug” is clearer than “make the bug again”.' },
      ],
    },
    {
      id: 'eng-phrases',
      title: 'Useful phrases',
      blocks: [
        { type: 'list', items: [
          '“I will look into it.” - I will investigate',
          '“It is blocked on X.” - waiting for X',
          '“Out of scope.” - not part of this task',
          '“Heads up:” - a warning before something',
          '“On my side it works.” - cannot reproduce',
          '“Let us take it offline.” - discuss later in private',
          '“LGTM” - looks good to me',
        ] },
        { type: 'text', value: 'These phrases are shortcuts, not decoration. They save time when both sides know them.' },
        { type: 'note', value: 'Avoid idioms in writing for non-native readers. “Take it offline” is common; “ballpark” and “circle back” confuse more than they help.' },
      ],
    },
    {
      id: 'eng-ambiguity',
      title: 'Avoid ambiguity',
      blocks: [
        { type: 'text', value: 'Vague words cause bugs and delays. Replace “soon”, “some”, “maybe” and “a few” with a date, a number or a decision.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Vague:   "I will fix it soon."
Clear:   "I will fix it by Thursday 5pm."

Vague:   "The page is slow."
Clear:   "The page takes 4.2s to load on a 3G connection."` },
        { type: 'list', items: [
          'Use a date instead of “soon”',
          'Use a number instead of “several”',
          'Say who does what',
          'State the decision, not only the discussion',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'vocabulary',
      q: 'What does “revert” mean?',
      options: ['Deploy', 'Undo a change', 'Test', 'Review'],
      answer: 1,
      explain: 'Revert means to undo.',
    },
    {
      chapterId: 'vocabulary',
      q: 'What does “blocked on X” mean?',
      options: ['Finished', 'Waiting for X', 'Deleted', 'Cached'],
      answer: 1,
      explain: 'Work cannot continue until X is resolved.',
    },
    {
      chapterId: 'vocabulary',
      q: 'Why avoid “soon”?',
      options: ['It is impolite', 'It is ambiguous; use a date', 'It is too formal', 'It is slang'],
      answer: 1,
      explain: 'A date is actionable.',
    },
    {
      chapterId: 'vocabulary',
      q: 'What does LGTM mean?',
      options: ['Let us go', 'Looks good to me', 'Long task', 'Log file'],
      answer: 1,
      explain: 'It approves a change.',
    },
  ],
};
