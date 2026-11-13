// English for Developers chapter: Emails & Updates.

export default {
  id: 'emails',
  title: 'Emails & Updates',
  description: 'Short, clear messages that get a reply',
  icon: 'mail',
  lessons: [
    {
      id: 'eng-email-structure',
      title: 'Email structure',
      blocks: [
        { type: 'text', value: 'A work email has a specific subject, one clear ask, the context and a next step. Keep it short. If it needs more than five sentences, use a document and link it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Subject: Need DB credentials for staging deploy

Hi Rahim,

The staging deploy is blocked on the database password.
Could you send it today?

Once I have it, I can finish the deploy by 4pm.

Thanks,
Ayesha` },
        { type: 'note', value: 'One email, one ask. Two unrelated asks get one answered and one forgotten.' },
      ],
    },
    {
      id: 'eng-status-update',
      title: 'Status updates',
      blocks: [
        { type: 'text', value: 'A status update answers three questions: what is done, what is next and what is blocking. Three lines are enough. Regular short updates build trust more than a long weekly report.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Done: course list and detail endpoints
Next: tests and staging deploy
Blocked: need the staging DB password` },
        { type: 'note', value: 'Put the blocker last so it is easy to scan. If there is no blocker, say “No blockers” explicitly.' },
      ],
    },
    {
      id: 'eng-tone',
      title: 'Tone',
      blocks: [
        { type: 'text', value: 'Written text loses tone. A short sentence can sound angry. Add a greeting, use “could you” instead of a bare command, and avoid all caps.' },
        { type: 'list', items: [
          'Use “could you” or “please” for requests',
          'Avoid “ASAP” unless it is an emergency',
          'Do not use all caps; it reads as shouting',
          'Acknowledge before disagreeing',
          'Say thank you when someone helps',
        ] },
        { type: 'note', value: 'If a message feels risky or emotional, wait ten minutes or move to a call.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'emails',
      q: 'How many asks should one email have?',
      options: ['As many as possible', 'One clear ask', 'Three', 'None'],
      answer: 1,
      explain: 'One ask gets answered.',
    },
    {
      chapterId: 'emails',
      q: 'What should a status update include?',
      options: ['Only what is done', 'Done, next and blockers', 'A long story', 'A price'],
      answer: 1,
      explain: 'Those three lines are enough.',
    },
    {
      chapterId: 'emails',
      q: 'Why avoid all caps?',
      options: ['It is slower', 'It reads as shouting', 'It is grammatically wrong', 'It cannot be translated'],
      answer: 1,
      explain: 'All caps feels aggressive.',
    },
    {
      chapterId: 'emails',
      q: 'What is a polite request phrase?',
      options: ['Do this now', 'Could you please…', 'You must…', 'ASAP'],
      answer: 1,
      explain: '“Could you” is polite and clear.',
    },
  ],
};
