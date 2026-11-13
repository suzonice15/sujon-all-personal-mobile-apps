// UI/UX chapter: UX Research.

export default {
  id: 'research',
  title: 'UX Research',
  description: 'Interviews, personas and journey maps',
  icon: 'search',
  lessons: [
    {
      id: 'ux-interviews',
      title: 'User interviews',
      blocks: [
        { type: 'text', value: 'Interviews reveal why people do what they do. Ask about past behaviour, not hypothetical futures. "Tell me about the last time you..." produces better answers than "Would you use...".' },
        { type: 'list', items: [
          'Ask open questions, then stay quiet',
          'Ask about real past actions, not opinions',
          'Avoid leading questions',
          'Interview 5 to 8 people per segment to start',
          'Record and look for repeated pain points',
        ] },
        { type: 'note', value: 'People are bad at predicting their own behaviour. What they did last week is more reliable than what they say they would do.' },
      ],
    },
    {
      id: 'ux-personas',
      title: 'Personas and jobs to be done',
      blocks: [
        { type: 'text', value: 'A persona is a short profile of a user type: goals, context, frustrations. Jobs-to-be-done focuses on the task the user is trying to complete. Both keep the team from designing for themselves.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Persona: Ayesha, 22, student
Goal: finish a course between classes
Context: phone, slow data, 10-minute gaps
Frustration: loses progress when the page reloads
Job: "help me continue exactly where I stopped"` },
        { type: 'note', value: 'A persona built from a guess is fiction. Build it from a few real interviews, or keep it as an explicit assumption to test.' },
      ],
    },
    {
      id: 'ux-journey',
      title: 'Journey maps',
      blocks: [
        { type: 'text', value: 'A journey map shows the steps a user takes, what they think and feel at each step, and where they get stuck. It turns scattered notes into a shared picture of the experience.' },
        { type: 'list', items: [
          'Stages: discover, compare, sign up, first use, return',
          'Actions: what the user does at each stage',
          'Thoughts and feelings: confusion, confidence, doubt',
          'Pain points: where the flow breaks',
          'Opportunities: the fix with the biggest impact',
        ] },
        { type: 'note', value: 'A journey map is useful only if it changes a decision. Put the top three pain points next to your next sprint.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'research',
      q: 'What makes a good interview question?',
      options: ['Would you use this?', 'Tell me about the last time you did this', 'Do you like blue?', 'Is this easy?'],
      answer: 1,
      explain: 'Ask about real past behaviour.',
    },
    {
      chapterId: 'research',
      q: 'What is a persona?',
      options: ['A random user', 'A short profile of a user type built from research', 'A colour palette', 'A wireframe'],
      answer: 1,
      explain: 'A persona summarises a user type.',
    },
    {
      chapterId: 'research',
      q: 'What does a journey map show?',
      options: ['Only the final screen', 'Steps, thoughts, feelings and pain points over time', 'The database schema', 'The brand colours'],
      answer: 1,
      explain: 'It maps the experience across stages.',
    },
    {
      chapterId: 'research',
      q: 'How many interviews are a reasonable start?',
      options: ['One', '5 to 8 per segment', '1000', 'None'],
      answer: 1,
      explain: 'A small set reveals repeated patterns.',
    },
  ],
};
