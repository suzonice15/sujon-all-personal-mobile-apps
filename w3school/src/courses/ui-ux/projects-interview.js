// UI/UX chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Redesign a screen and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ux-project-redesign',
      title: 'Project: redesign a screen',
      blocks: [
        { type: 'text', value: 'Pick a real screen you use, such as a course list or a checkout, and redesign it. Document the problem, sketch options, build a prototype, test with five people and write up what changed and why.' },
        { type: 'list', items: [
          'Problem statement and success measure',
          'Three sketches with trade-offs',
          'One high-fidelity prototype with states',
          'Five usability tests with notes',
          'Before and after with the reasons',
          'A short case study for your portfolio',
        ] },
        { type: 'note', value: 'A redesign with test notes is far more convincing than a pretty mockup with no evidence.' },
      ],
    },
    {
      id: 'ux-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How do you start a new design problem?',
          'How do you decide what to cut?',
          'How do you use research in a small team?',
          'How do you handle feedback you disagree with?',
          'How do you design for accessibility?',
          'How do you work with developers?',
          'How do you measure whether a design worked?',
          'Walk me through a case study.',
        ] },
        { type: 'text', value: 'Strong answers give a concrete example and the trade-off. "I tested two layouts with five users, the second halved the time to find a course, so we shipped it" is a complete answer.' },
        { type: 'note', value: 'Be ready to walk through one case study end to end and to critique a screen live.' },
      ],
    },
    {
      id: 'ux-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: principles, hierarchy and spacing',
          'Week 2: colour, type and contrast',
          'Week 3: layout and responsive design',
          'Week 4: interviews and personas',
          'Week 5: wireframes and Figma',
          'Week 6: usability and accessibility',
          'Week 7: design systems and tokens',
          'Week 8: build a case study and portfolio',
        ] },
        { type: 'note', value: 'Design skill grows by critiquing real screens and testing with real people, not by watching tutorials.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should a redesign project include?',
      options: ['Only the final screen', 'Problem, sketches, prototype, tests and reasons', 'A logo', 'A price list'],
      answer: 1,
      explain: 'Show the process and evidence.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you know a redesign worked?',
      options: ['It looks better', 'A measure such as task time or completion rate improved', 'The client liked it', 'It has more colours'],
      answer: 1,
      explain: 'Use a measurable outcome.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a UX answer strong?',
      options: ['Only the tool name', 'A concrete example and the trade-off', 'A list of colours', 'The logo history'],
      answer: 1,
      explain: 'Concrete examples show real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first UX step?',
      options: ['High-fidelity mockups', 'Understand the problem and the user', 'Pick a font', 'Buy a tool'],
      answer: 1,
      explain: 'Understand before designing.',
    },
  ],
};
