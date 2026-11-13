// Interview Prep chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Run a full mock interview loop',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ip-mock-loop',
      title: 'Project: a mock loop',
      blocks: [
        { type: 'text', value: 'Run a full mock loop in one week: a 40-second intro, two STAR stories, one coding problem, one project deep dive and one design question. Record the sessions and review them.' },
        { type: 'list', items: [
          'Self-introduction recorded',
          'Two STAR stories written and spoken',
          'One coding problem solved out loud',
          'One project explained for ten minutes',
          'One design question sketched',
          'One behavioural question on failure',
        ] },
        { type: 'note', value: 'A recorded mock reveals filler words, rushed answers and missing results. It is the fastest improvement tool.' },
      ],
    },
    {
      id: 'ip-questions-to-ask',
      title: 'Questions to ask them',
      blocks: [
        { type: 'list', items: [
          'What does success look like in the first 90 days?',
          'How does the team review and deploy code?',
          'What is the biggest technical challenge right now?',
          'How do you handle on-call and incidents?',
          'What does growth look like here?',
        ] },
        { type: 'text', value: 'Good questions show you are evaluating the role too. Ask about the work, not only the benefits.' },
        { type: 'note', value: 'Avoid asking questions whose answer is on the careers page. It signals you did not read.' },
      ],
    },
    {
      id: 'ip-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: resume and portfolio',
          'Week 2: six STAR stories',
          'Week 3: coding practice and project deep dive',
          'Week 4: system design basics',
          'Week 5: mock interviews and recordings',
          'Week 6: applications and referrals',
          'Week 7: interview loop',
          'Week 8: negotiation and decision',
        ] },
        { type: 'note', value: 'Treat the search like a project with a tracker and weekly review. Consistency beats intensity.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why record a mock interview?',
      options: ['To share online', 'To see filler words and missing results', 'To sell it', 'To avoid practice'],
      answer: 1,
      explain: 'Recording reveals real issues.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a good question to ask?',
      options: ['A benefits question from the site', 'One about the work and challenges', 'A joke', 'Nothing'],
      answer: 1,
      explain: 'Ask about the actual work.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How should the search be run?',
      options: ['Randomly', 'Like a project with a tracker', 'Only on weekends', 'Without a resume'],
      answer: 1,
      explain: 'A tracker keeps it consistent.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['Negotiate', 'Rewrite the resume with results', 'Apply to 500 jobs', 'Buy a suit'],
      answer: 1,
      explain: 'A results-focused resume opens doors.',
    },
  ],
};
