// UI/UX chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What UI and UX are and how a design process works',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ux-what-is-ui-ux',
      title: 'UI versus UX',
      blocks: [
        { type: 'text', value: 'UX (user experience) is how a product works: whether people can find what they need, understand it and finish their task. UI (user interface) is how it looks and feels: layout, colour, type and controls. Good products need both.' },
        { type: 'list', items: [
          'UX: research, flows, information architecture, usability',
          'UI: layout, colour, typography, components, states',
          'UX asks "can the user do this?"',
          'UI asks "is it clear and pleasant to do?"',
          'Both serve the same goal: a task completed with little friction',
        ] },
        { type: 'note', value: 'A beautiful screen that confuses people is bad UI and bad UX. A clear flow with poor visual hierarchy is also hard to use. They are not separate jobs in a small team.' },
      ],
    },
    {
      id: 'ux-process',
      title: 'The design process',
      blocks: [
        { type: 'text', value: 'A practical process loops: understand the problem, sketch options, build a prototype, test with people, then refine. You do not need a big team or a long timeline to follow it.' },
        { type: 'list', items: [
          'Discover: talk to users, review data and the existing product',
          'Define: write the problem and the success measure',
          'Ideate: sketch several directions before choosing',
          'Prototype: make the cheapest thing that can be tested',
          'Test: watch real people try to complete a task',
          'Iterate: fix the biggest problem first',
        ] },
        { type: 'note', value: 'Design is iterative, not a single handoff. The first idea is rarely the best one.' },
      ],
    },
    {
      id: 'ux-deliverables',
      title: 'What designers produce',
      blocks: [
        { type: 'text', value: 'Deliverables depend on the stage. Early work is sketches and flows; later work is prototypes, specs and a design system. The goal is always to help the team build the right thing.' },
        { type: 'list', items: [
          'User flows and journey maps',
          'Wireframes and high-fidelity screens',
          'Interactive prototypes',
          'Component specs and design tokens',
          'Usability test notes and recommendations',
        ] },
        { type: 'note', value: 'A Figma file is not the deliverable. The deliverable is a decision the team can build and test.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is UX mainly about?',
      options: ['Colour choice', 'How a product works and whether people can complete tasks', 'Fonts', 'Illustrations'],
      answer: 1,
      explain: 'UX is about the experience and task success.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is UI mainly about?',
      options: ['Research interviews', 'Layout, colour, type and controls', 'Server code', 'Pricing'],
      answer: 1,
      explain: 'UI is the visual and interactive surface.',
    },
    {
      chapterId: 'getting-started',
      q: 'What comes before building a high-fidelity screen?',
      options: ['Nothing', 'Understanding the problem and sketching options', 'Marketing', 'Hiring'],
      answer: 1,
      explain: 'Understand first, then sketch, then refine.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why test a prototype?',
      options: ['To make it pretty', 'To see if real people can complete the task', 'To avoid building', 'To please the client'],
      answer: 1,
      explain: 'Testing reveals real friction early.',
    },
  ],
};
