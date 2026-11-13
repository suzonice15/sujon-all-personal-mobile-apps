// Interview Prep chapter: Resume & Portfolio.

export default {
  id: 'resume',
  title: 'Resume & Portfolio',
  description: 'One page, results and a project you can explain',
  icon: 'description',
  lessons: [
    {
      id: 'ip-resume',
      title: 'The resume',
      blocks: [
        { type: 'text', value: 'A developer resume should be one page, easy to scan, and full of results. Lead with skills and projects, not a long personal statement. Use the same keywords as the job description.' },
        { type: 'list', items: [
          'One page, clear sections, no photo',
          'Skills grouped by category',
          'Projects with a result and a link',
          'Experience with measurable impact',
          'No “hardworking team player” filler',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `Weak:  "Worked on the backend."
Strong: "Built a Node.js API for 5k daily users and cut
         p95 latency from 800ms to 220ms."` },
        { type: 'note', value: 'A recruiter scans for 6 to 10 seconds. The first third of the page decides whether the rest is read.' },
      ],
    },
    {
      id: 'ip-portfolio',
      title: 'The portfolio',
      blocks: [
        { type: 'text', value: 'Two or three finished projects beat ten tutorials. Each needs a live link, a README and a short explanation of the problem, your decisions and the result.' },
        { type: 'list', items: [
          'A deployed project with a working link',
          'A README a stranger can follow',
          'One paragraph on the hardest decision',
          'Tests and error handling',
          'A clear scope, not a huge unfinished app',
        ] },
        { type: 'note', value: 'A project you can explain end to end is more valuable than a larger one you copied.' },
      ],
    },
    {
      id: 'ip-linkedin',
      title: 'LinkedIn and applications',
      blocks: [
        { type: 'text', value: 'A complete LinkedIn profile with the same headline as your resume helps recruiters find you. Turn on “open to work”, list the projects, and keep the location and role preferences honest.' },
        { type: 'list', items: [
          'Same headline as the resume',
          'Projects and skills filled in',
          'A clear, recent photo',
          'Open to work with the right roles',
          'A short About section with a result',
        ] },
        { type: 'note', value: 'Do not copy a template About section. Three specific sentences beat a page of buzzwords.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'resume',
      q: 'How long should a developer resume be?',
      options: ['One page', 'Five pages', 'Ten pages', 'No limit'],
      answer: 0,
      explain: 'One page is the norm for early career.',
    },
    {
      chapterId: 'resume',
      q: 'What makes a resume line strong?',
      options: ['A long list of tools', 'A measurable result', 'A buzzword', 'A photo'],
      answer: 1,
      explain: 'Results are memorable.',
    },
    {
      chapterId: 'resume',
      q: 'How many portfolio projects do you need?',
      options: ['Ten tutorials', 'Two or three finished projects', 'One unfinished app', 'None'],
      answer: 1,
      explain: 'Finished projects show real skill.',
    },
    {
      chapterId: 'resume',
      q: 'Why keep the headline consistent?',
      options: ['For SEO only', 'So recruiters recognise the role immediately', 'It is required', 'To look busy'],
      answer: 1,
      explain: 'Consistency helps discovery.',
    },
  ],
};
