// English for Developers chapter: Documentation.

export default {
  id: 'documentation',
  title: 'Documentation',
  description: 'READMEs, comments and clear naming',
  icon: 'description',
  lessons: [
    {
      id: 'eng-readme',
      title: 'READMEs',
      blocks: [
        { type: 'text', value: 'A README answers: what is this, how do I run it, what does it need and where do I start. A reviewer should not need to ask you.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# CodeNest API

Course and enrollment API built with Node.js and PostgreSQL.

## Setup
npm install
cp .env.example .env
npm run migrate
npm run dev

## Endpoints
GET /api/courses
POST /api/courses` },
        { type: 'note', value: 'A README with a working setup block is worth more than a long description. People copy the commands, not read the prose.' },
      ],
    },
    {
      id: 'eng-comments',
      title: 'Comments',
      blocks: [
        { type: 'text', value: 'Comment the why, not the what. The code already says what it does. A comment explains a decision, a workaround or a non-obvious rule.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Bad: increments the counter
counter++;

// Good: Stripe counts in the smallest unit
const total = Math.round(price * 100);` },
        { type: 'note', value: 'If a comment is needed to explain what the code does, rename the variable or extract a function first.' },
      ],
    },
    {
      id: 'eng-naming',
      title: 'Naming',
      blocks: [
        { type: 'list', items: [
          'Use full words: `courseCount`, not `cc`',
          'Booleans read as questions: `isPublished`',
          'Functions are verbs: `calculateTotal`',
          'Avoid abbreviations only you understand',
          'Be consistent across the codebase',
        ] },
        { type: 'text', value: 'Good names are documentation that cannot go stale. A rename is often the cheapest documentation improvement.' },
        { type: 'note', value: 'English matters in code too. `userList` is readable by every teammate; `lstUsr` is not.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'documentation',
      q: 'What should a README include?',
      options: ['Only the title', 'What it is, setup, requirements and endpoints', 'The full source', 'Passwords'],
      answer: 1,
      explain: 'A reviewer must be able to run it.',
    },
    {
      chapterId: 'documentation',
      q: 'What should a comment explain?',
      options: ['What the line does', 'Why the code is written this way', 'The syntax', 'The colour'],
      answer: 1,
      explain: 'Comment the why.',
    },
    {
      chapterId: 'documentation',
      q: 'How should a boolean be named?',
      options: ['count', 'isPublished', 'publish', 'flag'],
      answer: 1,
      explain: 'Booleans read as questions.',
    },
    {
      chapterId: 'documentation',
      q: 'Why use full words in names?',
      options: ['To be longer', 'So every teammate can read them', 'For speed', 'Because compilers require it'],
      answer: 1,
      explain: 'Readable names are documentation.',
    },
  ],
};
