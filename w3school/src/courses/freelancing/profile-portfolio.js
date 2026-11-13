// Freelancing chapter: Profile & Portfolio.

export default {
  id: 'profile-portfolio',
  title: 'Profile & Portfolio',
  description: 'Build a profile and portfolio that win clients',
  icon: 'person',
  lessons: [
    {
      id: 'fl-profile',
      title: 'Your profile',
      blocks: [
        { type: 'text', value: 'Your profile is your storefront. A clear photo, a specific headline and a portfolio of real work beat a long list of skills. Clients skim profiles in seconds, so the first two lines matter most.' },
        { type: 'list', items: [
          'Use a clear, professional photo',
          'Headline: what you do and for whom, not just "Developer"',
          'Summary: your best skills, your niche, your results',
          'List only skills you can demonstrate',
          'Keep it updated as you grow',
        ] },
        { type: 'note', value: 'A headline like "React developer building fast web apps for SaaS startups" beats "Full-stack developer" because it says who you help.' },
      ],
    },
    {
      id: 'fl-portfolio',
      title: 'Building a portfolio',
      blocks: [
        { type: 'text', value: 'A portfolio shows what you can do. Three strong, finished projects with a live link and a short write-up beat ten half-finished tutorials. Show the problem, your solution and the result.' },
        { type: 'list', items: [
          'Build 2-3 complete projects for real or realistic use cases',
          'Deploy them so clients can click and use them',
          'Write a short case study: problem, approach, result',
          'Include screenshots and a link to the code',
          'Keep the portfolio focused on one niche',
        ] },
        { type: 'note', value: 'A project you built for a real client, even unpaid, is worth more than a tutorial clone. Offer a small free project to a local business to get one.' },
      ],
    },
    {
      id: 'fl-github',
      title: 'GitHub and online presence',
      blocks: [
        { type: 'text', value: 'Clients and platforms check your GitHub. A clean profile with a few well-documented repos, a good README and consistent commits signals professionalism.' },
        { type: 'list', items: [
          'Pin your best 3-4 repositories',
          'Write a README with what it does, how to run it and a screenshot',
          'Commit regularly with clear messages',
          'Keep experiments private and polished work public',
          'Add a LinkedIn profile that matches your freelance niche',
        ] },
        { type: 'note', value: 'A README with a screenshot and a one-line description is the difference between a repo that looks professional and one that looks abandoned.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'profile-portfolio',
      q: 'What makes a strong headline?',
      options: ['A long list of skills', 'What you do and for whom', 'Your degree', 'Your age'],
      answer: 1,
      explain: 'A specific headline says who you help.',
    },
    {
      chapterId: 'profile-portfolio',
      q: 'How many portfolio projects do you need to start?',
      options: ['Twenty', 'Two or three strong, finished projects', 'One unfinished project', 'None'],
      answer: 1,
      explain: 'A few complete projects beat many half-finished ones.',
    },
    {
      chapterId: 'profile-portfolio',
      q: 'What should a project case study include?',
      options: ['Only the code', 'Problem, approach and result', 'Your resume', 'A price list'],
      answer: 1,
      explain: 'Clients want to see how you think and what you delivered.',
    },
    {
      chapterId: 'profile-portfolio',
      q: 'What makes a GitHub repo look professional?',
      options: ['Many commits in one day', 'A clear README with a screenshot and run instructions', 'Private visibility', 'No description'],
      answer: 1,
      explain: 'A good README signals professionalism.',
    },
  ],
};
