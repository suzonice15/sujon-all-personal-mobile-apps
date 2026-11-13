// English for Developers chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Why clear English matters and how to improve',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'eng-why',
      title: 'Why English matters',
      blocks: [
        { type: 'text', value: 'Most documentation, issues, code reviews and interviews happen in English. Clear writing gets your work reviewed faster and makes you easier to hire. You do not need perfect grammar; you need clear meaning.' },
        { type: 'list', items: [
          'Documentation and READMEs are read by everyone',
          'Code reviews are written communication',
          'Remote teams work mostly in writing',
          'Interviews test explanation, not vocabulary',
          'Clear writing reduces bugs and rework',
        ] },
        { type: 'note', value: 'Simple, correct English beats complex, unclear English. Short sentences are a feature, not a weakness.' },
      ],
    },
    {
      id: 'eng-habits',
      title: 'Daily habits',
      blocks: [
        { type: 'text', value: 'Improvement comes from daily use, not from a grammar book. Write a short note every day, read documentation aloud, and ask for corrections on real work.' },
        { type: 'list', items: [
          'Write a 3-line daily update in English',
          'Read one README and summarize it',
          'Keep a list of words you had to look up',
          'Ask a colleague to correct one message a week',
          'Record yourself explaining a feature for 1 minute',
        ] },
        { type: 'note', value: 'Ten minutes a day for three months beats a weekend grammar marathon.' },
      ],
    },
    {
      id: 'eng-structure',
      title: 'Structure beats vocabulary',
      blocks: [
        { type: 'text', value: 'A clear message has a point, the reason and the next step. Put the point first. Readers skim, so the first line decides whether the rest is read.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Weak:  "I was thinking maybe we could perhaps look at the
        login issue at some point if possible."

Strong: "The login page fails on Safari. It is a cookie bug.
        I can fix it today. Can we ship it tomorrow?"` },
        { type: 'note', value: 'Point first, then context. This one habit improves emails, tickets and interviews immediately.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What matters most in developer English?',
      options: ['Perfect grammar', 'Clear meaning', 'Long words', 'An accent'],
      answer: 1,
      explain: 'Clarity beats complexity.',
    },
    {
      chapterId: 'getting-started',
      q: 'What improves English fastest?',
      options: ['One long study session', 'Short daily practice on real work', 'Memorizing a dictionary', 'Avoiding writing'],
      answer: 1,
      explain: 'Daily use compounds.',
    },
    {
      chapterId: 'getting-started',
      q: 'Where should the main point go?',
      options: ['At the end', 'In the first line', 'In a footnote', 'Nowhere'],
      answer: 1,
      explain: 'Readers skim the first line.',
    },
    {
      chapterId: 'getting-started',
      q: 'Are short sentences a weakness?',
      options: ['Yes', 'No, they are clearer', 'Only in speech', 'Only in emails'],
      answer: 1,
      explain: 'Short sentences are easier to read.',
    },
  ],
};
