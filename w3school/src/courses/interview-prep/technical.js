// Interview Prep chapter: Technical Interviews.

export default {
  id: 'technical',
  title: 'Technical Interviews',
  description: 'Think out loud, ask and debug',
  icon: 'code',
  lessons: [
    {
      id: 'ip-coding-round',
      title: 'The coding round',
      blocks: [
        { type: 'text', value: 'Restate the problem, ask about input size and edge cases, then describe an approach before coding. Write readable code, not clever code, and test with a small example.' },
        { type: 'list', items: [
          'Repeat the problem in your own words',
          'Ask about empty input, duplicates and limits',
          'Describe the approach and complexity',
          'Write small functions with clear names',
          'Run one example by hand',
          'Fix the bug out loud, not silently',
        ] },
        { type: 'note', value: 'Interviewers score the process as much as the answer. Silence is the biggest mistake.' },
      ],
    },
    {
      id: 'ip-project-round',
      title: 'The project deep dive',
      blocks: [
        { type: 'text', value: 'You will be asked to explain a project end to end: the problem, the design, the trade-offs and what you would change. Prepare one project deeply rather than many shallowly.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Problem: students lost progress on reload
Design: session + progress table, save on lesson complete
Trade-off: write per lesson vs batch; chose per lesson
           for reliability
What I would change: add offline support and a queue` },
        { type: 'note', value: '“What would you change?” is a test of judgement. Answer honestly with one concrete improvement.' },
      ],
    },
    {
      id: 'ip-debug-round',
      title: 'The debugging round',
      blocks: [
        { type: 'text', value: 'You may get broken code or a failing test. Read the error, form a hypothesis, then test it. Explain what you are checking and why.' },
        { type: 'list', items: [
          'Read the full error message',
          'Reproduce the failure first',
          'Form one hypothesis at a time',
          'Use logs and small experiments',
          'Fix the cause, not the symptom',
          'Add a test for the bug',
        ] },
        { type: 'note', value: 'A calm, systematic debugger is more valuable than someone who guesses fast.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'technical',
      q: 'What should you do before coding?',
      options: ['Start typing', 'Restate the problem and ask about edge cases', 'Stay silent', 'Open Google'],
      answer: 1,
      explain: 'Clarify before writing code.',
    },
    {
      chapterId: 'technical',
      q: 'What do interviewers score?',
      options: ['Only the final answer', 'The process and communication too', 'Typing speed', 'The editor theme'],
      answer: 1,
      explain: 'Thinking out loud matters.',
    },
    {
      chapterId: 'technical',
      q: 'How do you answer “what would you change?”',
      options: ['“Nothing”', 'One concrete improvement with a reason', 'Change the subject', 'Blame the team'],
      answer: 1,
      explain: 'It tests judgement.',
    },
    {
      chapterId: 'technical',
      q: 'What is the first debugging step?',
      options: ['Rewrite everything', 'Reproduce the failure and read the error', 'Restart the laptop', 'Ask for the answer'],
      answer: 1,
      explain: 'Reproduce, then hypothesize.',
    },
  ],
};
