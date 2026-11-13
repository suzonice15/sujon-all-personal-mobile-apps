// English for Developers chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Write a README and practise a full interview',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'eng-project-reading',
      title: 'Project: document a repo',
      blocks: [
        { type: 'text', value: 'Take a project you built and write a README in English: what it is, setup, endpoints and one example request. Then write a 3-line status update and a code review comment for the same project.' },
        { type: 'list', items: [
          'A README a stranger can follow',
          'A status update with done, next and blockers',
          'One blocking review comment with impact',
          'A 40-second spoken introduction',
        ] },
        { type: 'note', value: 'Written clarity is a portfolio skill. A recruiter often reads your README before your code.' },
      ],
    },
    {
      id: 'eng-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Tell me about yourself.',
          'Describe a bug you fixed.',
          'Tell me about a disagreement in a review.',
          'How do you explain a technical idea to a non-developer?',
          'What did you build recently?',
          'Why do you want this role?',
          'Tell me about a time you missed a deadline.',
          'What questions do you have for us?',
        ] },
        { type: 'text', value: 'Record yourself answering two of these. Listen for filler words, unclear structure and sentences that never end. One recording teaches more than ten readings.' },
        { type: 'note', value: 'Use short sentences and finish them. A complete simple answer beats an unfinished complex one.' },
      ],
    },
    {
      id: 'eng-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: daily 3-line updates',
          'Week 2: technical vocabulary in sentences',
          'Week 3: emails and status updates',
          'Week 4: README and comments',
          'Week 5: code review language',
          'Week 6: standups and calls',
          'Week 7: STAR answers and self-introduction',
          'Week 8: record a mock interview',
        ] },
        { type: 'note', value: 'Use English on real work every day. Practice without a real task rarely sticks.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should a README let a stranger do?',
      options: ['Nothing', 'Run the project from the instructions', 'Read your resume', 'Pay you'],
      answer: 1,
      explain: 'A README is a working guide.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a status update contain?',
      options: ['Only done', 'Done, next and blockers', 'A long story', 'A price'],
      answer: 1,
      explain: 'Three lines keep it useful.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you improve interview English?',
      options: ['Read silently', 'Record and review your answers', 'Memorize a script', 'Avoid speaking'],
      answer: 1,
      explain: 'Recording reveals the real issues.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a spoken answer strong?',
      options: ['Long sentences', 'Short, complete sentences with a result', 'Filler words', 'Big vocabulary'],
      answer: 1,
      explain: 'Clarity and results matter.',
    },
  ],
};
