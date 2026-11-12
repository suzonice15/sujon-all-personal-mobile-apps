// Security chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Secure a small app and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'sec-project-audit',
      title: 'Project: audit a small app',
      blocks: [
        { type: 'text', value: 'Take a simple CRUD app and review it like an attacker with permission. Map the entry points, then test authentication, access control, input handling and secrets.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Checklist:
1. Can I read another user's object by changing an id?
2. Is every query parameterized?
3. Are passwords hashed slowly?
4. Are tokens in secure storage?
5. Is the admin route protected on the server?
6. Are secrets out of the repo?
7. Are dependencies patched?
8. Do errors leak stack traces?` },
        { type: 'list', items: [
          'Write the finding with steps and impact',
          'Fix the highest-impact issue first',
          'Add a regression test',
          'Retest the fix',
          'Document the remaining risk',
        ] },
        { type: 'note', value: 'A small app with a real audit and a fixed bug is a strong portfolio piece. It shows judgement, not just tools.' },
      ],
    },
    {
      id: 'sec-project-threat-model',
      title: 'Project: threat model',
      blocks: [
        { type: 'text', value: 'Draw the data flow for a course app: app, API, database, file storage, admin. Mark trust boundaries and list the top threats at each one.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Trust boundaries:
user -> API        auth, input, rate limit
API -> database    parameterized SQL, least privilege
API -> storage     file type and size, signed URLs
admin -> API       MFA, role check, audit log` },
        { type: 'note', value: 'The value of the model is the conversation it starts. Review it with the team before shipping a new feature.' },
      ],
    },
    {
      id: 'sec-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the CIA triad?',
          'How do you prevent SQL injection and XSS?',
          'How do you store passwords?',
          'What is the difference between authentication and authorization?',
          'What is CSRF and how do you stop it?',
          'Why is a JWT not encrypted?',
          'How do you secure a mobile app token?',
          'What is least privilege?',
          'How do you respond to an incident?',
          'How do you report a vulnerability responsibly?',
        ] },
        { type: 'text', value: 'Strong answers connect a control to a concrete attack and a failure mode. "Parameterized queries because input must never change the SQL structure" is better than "validate input".' },
        { type: 'note', value: 'Be ready to review a small code sample and name the bug, the impact and the fix. That is the practical round.' },
      ],
    },
    {
      id: 'sec-career',
      title: 'Security career paths',
      blocks: [
        { type: 'list', items: [
          'Application security - secure coding and reviews',
          'Penetration testing - authorized offensive testing',
          'Blue team / SOC - detection and response',
          'Cloud security - IAM, configuration, architecture',
          'GRC - policy, risk and compliance',
          'Bug bounty - independent, scope-based testing',
        ] },
        { type: 'text', value: 'Every path needs the same base: networking, operating systems, web fundamentals and clear writing. Choose the one that matches how you like to work.' },
        { type: 'note', value: 'Certifications help with HR filters, but a portfolio of responsible reports and fixes is stronger evidence of skill.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should you test first in an audit?',
      options: ['UI colors', 'Object ownership and access control', 'Font size', 'Animations'],
      answer: 1,
      explain: 'Broken access control is the most common serious bug.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a finding useful?',
      options: ['A long list of ports', 'Steps, impact and a fix', 'A tool logo', 'A severity word only'],
      answer: 1,
      explain: 'The team must be able to reproduce and fix it.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What does threat modeling identify?',
      options: ['Only code bugs', 'Assets, trust boundaries, threats and controls', 'The office layout', 'The marketing plan'],
      answer: 1,
      explain: 'It maps what can go wrong and what to do.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the base for every security path?',
      options: ['Only a certificate', 'Networking, OS, web fundamentals and writing', 'A tool license', 'A social media account'],
      answer: 1,
      explain: 'Fundamentals transfer across roles.',
    },
  ],
};
