// UI/UX chapter: Portfolio & Freelance.

export default {
  id: 'portfolio-freelance',
  title: 'Portfolio & Freelance',
  description: 'Case studies, clients and pricing design work',
  icon: 'work',
  lessons: [
    {
      id: 'ux-case-studies',
      title: 'Case studies',
      blocks: [
        { type: 'text', value: 'A UX portfolio is built on case studies, not screenshots. Each case study explains the problem, your process, the decisions and the result. Show your thinking, not only the final pixels.' },
        { type: 'list', items: [
          'Problem and context in one paragraph',
          'Research: what you learned from users',
          'Process: sketches, options, trade-offs',
          'Solution: the final screens and the reasons',
          'Outcome: a metric or a clear qualitative result',
          'Reflection: what you would change',
        ] },
        { type: 'note', value: 'Two or three strong case studies beat ten dribbble shots. Hiring managers want to see how you reason.' },
      ],
    },
    {
      id: 'ux-clients',
      title: 'Working with clients',
      blocks: [
        { type: 'text', value: 'Design clients need clarity more than inspiration. Scope the deliverables, agree on review rounds and explain your decisions in plain language. A short weekly update prevents most problems.' },
        { type: 'list', items: [
          'Scope: screens, states and revisions',
          'Deliverables: Figma file, prototype, spec',
          'Review rounds: how many and who decides',
          'Handoff: tokens, components and notes for developers',
          'Timeline with a review buffer',
        ] },
        { type: 'note', value: 'A design that developers cannot build is not finished. Hand off tokens and states, and be available for questions.' },
      ],
    },
    {
      id: 'ux-pricing',
      title: 'Pricing design work',
      blocks: [
        { type: 'text', value: 'Price design by project or value, not by the hour, when the scope is clear. A landing page, a mobile app flow and a design system have very different effort. Quote after a short discovery call.' },
        { type: 'list', items: [
          'Small landing page: a fixed, modest price',
          'App flow with several screens: a project price',
          'Design system: a larger, phased project',
          'Ask for a deposit before starting',
          'Charge for extra rounds beyond the agreed number',
        ] },
        { type: 'note', value: 'Free "quick mockups" are a trap. Do a paid discovery or a small paid first step instead.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'portfolio-freelance',
      q: 'What should a UX case study show?',
      options: ['Only screenshots', 'Problem, process, decisions and result', 'Your resume', 'A colour palette'],
      answer: 1,
      explain: 'Case studies show your reasoning.',
    },
    {
      chapterId: 'portfolio-freelance',
      q: 'Why scope review rounds?',
      options: ['To limit feedback', 'To prevent unlimited revisions', 'To avoid contracts', 'To raise prices'],
      answer: 1,
      explain: 'A revision limit protects both sides.',
    },
    {
      chapterId: 'portfolio-freelance',
      q: 'What should a handoff include?',
      options: ['Only images', 'Tokens, components, states and notes', 'Your invoice', 'A mood board'],
      answer: 1,
      explain: 'Developers need tokens and states.',
    },
    {
      chapterId: 'portfolio-freelance',
      q: 'How should design work be priced?',
      options: ['Always hourly', 'By project or value when the scope is clear', 'Free', 'Randomly'],
      answer: 1,
      explain: 'Project pricing suits clear scope.',
    },
  ],
};
