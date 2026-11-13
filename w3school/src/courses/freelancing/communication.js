// Freelancing chapter: Communication.

export default {
  id: 'communication',
  title: 'Communication',
  description: 'Client updates, feedback and difficult conversations',
  icon: 'chat',
  lessons: [
    {
      id: 'fl-updates',
      title: 'Client updates',
      blocks: [
        { type: 'text', value: 'Clients worry when they hear nothing. Send a short update every few days: what you did, what is next and any blockers. A 3-line update prevents most anxious messages.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Subject: Update on the courses API

Hi [Name],

Done this week:
- Built the course and lesson endpoints
- Added authentication with JWT

Next:
- Write tests and deploy to staging

Blocker:
- Need the database credentials to finish deployment

I will have a staging link by Thursday.

Best,
[Your name]` },
        { type: 'note', value: 'A short, regular update builds trust. Silence makes clients anxious, even when work is going well.' },
      ],
    },
    {
      id: 'fl-feedback',
      title: 'Handling feedback',
      blocks: [
        { type: 'text', value: 'Feedback is part of the job. Separate the person from the work, and ask clarifying questions before changing anything. A revision is not a failure; it is a normal step.' },
        { type: 'list', items: [
          'Read feedback twice before replying',
          'Ask for examples when feedback is vague',
          'Confirm the change in writing before doing it',
          'Push back politely when a change breaks the scope',
          'Keep a revision count in the contract',
        ] },
        { type: 'note', value: 'A client who gives feedback is engaged. A client who goes silent is the real risk.' },
      ],
    },
    {
      id: 'fl-difficult',
      title: 'Difficult conversations',
      blocks: [
        { type: 'text', value: 'Scope creep, late payments and missed deadlines happen. Address them early and in writing. Be firm but respectful, and always offer a solution.' },
        { type: 'list', items: [
          'Scope creep: quote the extra work and its cost before doing it',
          'Late payment: send a polite reminder, then a firm one',
          'Missed deadline: tell the client as soon as you know, with a new date',
          'Unhappy client: listen, acknowledge, propose a fix',
          'Never argue in public channels; move to a call or email',
        ] },
        { type: 'note', value: 'Most disputes come from unclear expectations. A clear contract and regular updates prevent most of them.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'communication',
      q: 'How often should you update a client?',
      options: ['Only at the end', 'Every few days with a short update', 'Once a month', 'Never'],
      answer: 1,
      explain: 'Regular short updates build trust.',
    },
    {
      chapterId: 'communication',
      q: 'What should an update include?',
      options: ['Only the final result', 'What you did, what is next and any blockers', 'A long report', 'Nothing'],
      answer: 1,
      explain: 'A short update covers done, next and blockers.',
    },
    {
      chapterId: 'communication',
      q: 'How should you handle vague feedback?',
      options: ['Ignore it', 'Ask for examples and confirm the change in writing', 'Do whatever you think', ' Argue about it'],
      answer: 1,
      explain: 'Clarify before changing anything.',
    },
    {
      chapterId: 'communication',
      q: 'When should you raise a scope change?',
      options: ['After doing the work', 'Before doing the extra work, with a quote', 'Never', 'At the end of the project'],
      answer: 1,
      explain: 'Quote extra work before doing it.',
    },
  ],
};
