// Interview Prep chapter: Behavioural Interviews.

export default {
  id: 'behavioral',
  title: 'Behavioural Interviews',
  description: 'STAR stories that show judgement',
  icon: 'record-voice-over',
  lessons: [
    {
      id: 'ip-star',
      title: 'STAR',
      blocks: [
        { type: 'text', value: 'Behavioural questions ask for a past example. Answer with STAR: Situation, Task, Action, Result. Keep the situation short and spend most of the answer on your action and the result.' },
        { type: 'code', lang: 'text', tryIt: false, value: `S: Checkout failed for 8% of orders.
T: Find the cause and fix it.
A: Added logs, found a race in order creation,
   wrapped it in a transaction and added a test.
R: Failures fell to 0.5% in two weeks.` },
        { type: 'note', value: 'Use “I”, not “we”, for your own actions. Interviewers need to know what you did.' },
      ],
    },
    {
      id: 'ip-stories',
      title: 'Prepare six stories',
      blocks: [
        { type: 'text', value: 'Most behavioural questions map to a small set of themes. Prepare one strong story for each and you can answer almost anything.' },
        { type: 'list', items: [
          'A difficult bug or incident',
          'A disagreement with a teammate',
          'A missed deadline or mistake',
          'A project you led or improved',
          'A time you learned something fast',
          'A time you said no or pushed back',
        ] },
        { type: 'note', value: 'Write the six stories once, in STAR form, and rehearse them out loud. Do not memorize word for word.' },
      ],
    },
    {
      id: 'ip-weakness',
      title: 'Weakness and failure questions',
      blocks: [
        { type: 'text', value: 'Answer honestly with a real weakness and what you do about it. For a failure, own the mistake, describe the fix and the lesson. Avoid “I work too hard”.' },
        { type: 'code', lang: 'text', tryIt: false, value: `"I used to underestimate testing time. On the payments
project I shipped a bug that cost a day. Now I write the
test list before estimating and add a buffer."` },
        { type: 'note', value: 'A candidate who can name a real mistake and a concrete change is more trustworthy than one who claims none.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'behavioral',
      q: 'What does STAR stand for?',
      options: ['Skill, Task, Answer, Result', 'Situation, Task, Action, Result', 'Story, Talk, Ask, Reply', 'Start, Test, Apply, Review'],
      answer: 1,
      explain: 'STAR structures a behavioural answer.',
    },
    {
      chapterId: 'behavioral',
      q: 'What should you say instead of “we” for your actions?',
      options: ['“They”', '“I”', '“Someone”', '“The team”'],
      answer: 1,
      explain: 'Interviewers need your contribution.',
    },
    {
      chapterId: 'behavioral',
      q: 'How many stories should you prepare?',
      options: ['One', 'About six themes', 'Twenty', 'None'],
      answer: 1,
      explain: 'Six themes cover most questions.',
    },
    {
      chapterId: 'behavioral',
      q: 'How do you answer a weakness question?',
      options: ['“I work too hard”', 'A real weakness and what you do about it', '“I have none”', 'Change the subject'],
      answer: 1,
      explain: 'Honesty plus a fix is strong.',
    },
  ],
};
