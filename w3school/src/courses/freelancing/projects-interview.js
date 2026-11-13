// Freelancing chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a freelance portfolio and prepare for client work',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'fl-project-portfolio',
      title: 'Project: build your freelance portfolio',
      blocks: [
        { type: 'text', value: 'Build a complete portfolio site with 2-3 projects, a clear niche, a contact form and testimonials. Deploy it and share the link in your profiles.' },
        { type: 'list', items: [
          'Choose one niche and one target client',
          'Build 2-3 complete projects with live links',
          'Write a short case study for each project',
          'Add a contact form and a clear call to action',
          'Deploy on a fast host with a custom domain',
        ] },
        { type: 'note', value: 'A finished, deployed portfolio with a clear niche is worth more than ten half-finished projects.' },
      ],
    },
    {
      id: 'fl-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How do you find your first client?',
          'How do you price a project?',
          'What goes in a contract?',
          'How do you handle scope creep?',
          'How do you handle a late payment?',
          'How do you get repeat clients?',
          'How do you choose a niche?',
          'What is your biggest freelance mistake?',
        ] },
        { type: 'text', value: 'Strong answers are specific and honest. "I underpriced my first project, learned to scope clearly and now charge 3x more with better clients" shows growth.' },
        { type: 'note', value: 'Be ready to walk through one project end to end: how you found the client, how you scoped and priced it, and what you learned.' },
      ],
    },
    {
      id: 'fl-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: choose a niche and build a portfolio site',
          'Week 2: create profiles on one platform',
          'Week 3: write proposals and send direct outreach',
          'Week 4: land your first small project',
          'Week 5: deliver, get a testimonial, ask for referrals',
          'Week 6: raise your rate and add a retainer offer',
          'Week 7: build a passive income product',
        ] },
        { type: 'note', value: 'The first client is the hardest. After that, referrals and repeat work do most of the selling.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What is the most important part of a freelance portfolio?',
      options: ['A long list of skills', '2-3 complete projects with live links and case studies', 'A copied template', 'A price list'],
      answer: 1,
      explain: 'Finished projects show real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you get repeat clients?',
      options: ['By being the cheapest', 'By delivering well and communicating clearly', 'By sending more proposals', 'By working for free'],
      answer: 1,
      explain: 'Trust and delivery drive repeat work.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best way to find your first client?',
      options: ['Wait for them to find you', 'Build a portfolio and do direct outreach', ' Apply to 1000 jobs', ' Lower your price to zero'],
      answer: 1,
      explain: 'A portfolio plus targeted outreach works.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a freelance answer strong in an interview?',
      options: ['Only the platform name', 'A specific story with lessons learned', ' A list of tools', ' The logo history'],
      answer: 1,
      explain: 'Specific stories show real experience.',
    },
  ],
};
