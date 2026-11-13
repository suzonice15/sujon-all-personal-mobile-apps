// English for Developers chapter: Meetings.

export default {
  id: 'meetings',
  title: 'Meetings & Standups',
  description: 'Speak clearly in standups, calls and demos',
  icon: 'groups',
  lessons: [
    {
      id: 'eng-standup',
      title: 'Standups',
      blocks: [
        { type: 'text', value: 'A standup answer has three parts: yesterday, today and blockers. Keep it under a minute. If a topic needs discussion, say “I will take it offline” and continue.' },
        { type: 'code', lang: 'text', tryIt: false, value: `"Yesterday I finished the courses endpoint.
Today I am adding tests.
No blockers."` },
        { type: 'note', value: 'Prepare your three lines before the call. Reading them is fine and faster than improvising.' },
      ],
    },
    {
      id: 'eng-calls',
      title: 'Calls and questions',
      blocks: [
        { type: 'list', items: [
          '“Can you hear me?” - check audio',
          '“Could you repeat that?” - ask again',
          '“Let me share my screen.” - present',
          '“I have a question about X.” - introduce',
          '“To summarize, we agreed to…” - close',
          '“I will follow up by email.” - next step',
        ] },
        { type: 'text', value: 'Ask for repetition without embarrassment. A misunderstood requirement costs far more than one “could you repeat that?”.' },
        { type: 'note', value: 'End a call with a one-line summary and who does what by when. It prevents “I thought you were doing it”.' },
      ],
    },
    {
      id: 'eng-demo',
      title: 'Demos',
      blocks: [
        { type: 'text', value: 'A demo shows the user problem, the solution and one real path through it. Do not click randomly. Prepare the data and the order of clicks.' },
        { type: 'code', lang: 'text', tryIt: false, value: `1. Problem: students lose progress on reload
2. Demo: complete a lesson, reload, progress remains
3. Result: saved 2 support tickets this week` },
        { type: 'note', value: 'Say the result, not only the feature. “Progress is saved” matters more than “we added a column”.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'meetings',
      q: 'What are the three parts of a standup?',
      options: ['Past, present, future tense', 'Yesterday, today, blockers', 'Intro, body, end', 'Price, time, name'],
      answer: 1,
      explain: 'That is the standard standup shape.',
    },
    {
      chapterId: 'meetings',
      q: 'What should you do with a long topic in standup?',
      options: ['Discuss it fully', 'Take it offline', 'Ignore it', 'Cancel the standup'],
      answer: 1,
      explain: 'Keep the standup short.',
    },
    {
      chapterId: 'meetings',
      q: 'How should a call end?',
      options: ['Silently', 'With a summary and next steps', 'With a joke', 'With a new topic'],
      answer: 1,
      explain: 'A summary prevents confusion.',
    },
    {
      chapterId: 'meetings',
      q: 'What makes a demo clear?',
      options: ['Random clicking', 'Problem, solution and one real path', 'Many features at once', 'No preparation'],
      answer: 1,
      explain: 'A focused path is easier to follow.',
    },
  ],
};
