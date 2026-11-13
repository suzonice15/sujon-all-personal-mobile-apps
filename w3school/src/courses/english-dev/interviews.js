// English for Developers chapter: Interviews.

export default {
  id: 'interviews',
  title: 'Interviews in English',
  description: 'Explain your work clearly under pressure',
  icon: 'record-voice-over',
  lessons: [
    {
      id: 'eng-self-intro',
      title: 'Introducing yourself',
      blocks: [
        { type: 'text', value: 'A good introduction is 30 to 45 seconds: who you are, what you build, one result and why this role. Do not recite your resume.' },
        { type: 'code', lang: 'text', tryIt: false, value: `"I am Ayesha, a backend developer with two years of
experience. I build APIs with Node.js and PostgreSQL.
Last year I reduced checkout errors by 40 percent.
I am interested in this role because you work on payments."` },
        { type: 'note', value: 'Practice the introduction out loud until it sounds natural. A rehearsed 40 seconds beats a rambling 3 minutes.' },
      ],
    },
    {
      id: 'eng-star',
      title: 'STAR answers',
      blocks: [
        { type: 'text', value: 'Answer behavioural questions with STAR: Situation, Task, Action, Result. Keep each part to one or two sentences and end with a measurable result.' },
        { type: 'code', lang: 'text', tryIt: false, value: `S: Checkout failed 8 percent of the time.
T: Find and fix the cause.
A: Added logs, found a race in order creation,
   added a transaction and a test.
R: Failures dropped to 0.5 percent in two weeks.` },
        { type: 'note', value: 'Interviewers remember results. “We improved it” is weaker than “errors dropped from 8 percent to 0.5 percent”.' },
      ],
    },
    {
      id: 'eng-when-stuck',
      title: 'When you do not know',
      blocks: [
        { type: 'text', value: 'It is normal not to know. Say what you do know, how you would find out and what you would try first. Never invent an answer.' },
        { type: 'list', items: [
          '“I have not used that, but I have used X.”',
          '“I would check the docs for Y.”',
          '“My first step would be to reproduce it.”',
          '“Can I think for a moment?”',
          '“I would ask the team before changing that.”',
        ] },
        { type: 'note', value: 'Honesty plus a plan is a strong answer. Guessing and bluffing is the fastest way to fail.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'interviews',
      q: 'How long should an introduction be?',
      options: ['3 minutes', '30-45 seconds', '10 seconds', 'As long as possible'],
      answer: 1,
      explain: 'Short and specific works best.',
    },
    {
      chapterId: 'interviews',
      q: 'What does STAR stand for?',
      options: ['Start, Talk, Answer, Repeat', 'Situation, Task, Action, Result', 'Skill, Test, Apply, Review', 'Story, Time, Ask, Reply'],
      answer: 1,
      explain: 'STAR structures a behavioural answer.',
    },
    {
      chapterId: 'interviews',
      q: 'What should a STAR answer end with?',
      options: ['A question', 'A measurable result', 'A joke', 'An apology'],
      answer: 1,
      explain: 'Results are memorable.',
    },
    {
      chapterId: 'interviews',
      q: 'What should you do when you do not know?',
      options: ['Guess', 'Say what you know and how you would find out', 'Change the subject', 'Stay silent'],
      answer: 1,
      explain: 'Honesty plus a plan is strong.',
    },
  ],
};
