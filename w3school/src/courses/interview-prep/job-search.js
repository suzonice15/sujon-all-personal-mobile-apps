// Interview Prep chapter: Job Search.

export default {
  id: 'job-search',
  title: 'Job Search',
  description: 'Where to apply, referrals and tracking',
  icon: 'search',
  lessons: [
    {
      id: 'ip-where',
      title: 'Where to apply',
      blocks: [
        { type: 'list', items: [
          'Company careers pages - fewer applicants than job boards',
          'LinkedIn - broad, easy to filter',
          'Referrals - the highest response rate',
          'Communities and Discords - hidden roles',
          'Freelance clients - can become full-time',
        ] },
        { type: 'text', value: 'Apply to roles where you meet most of the requirements. A 60 percent match is usually worth applying; a 20 percent match rarely is.' },
        { type: 'note', value: 'A referral is not cheating. It is how most jobs are filled. Ask people you worked with, not strangers.' },
      ],
    },
    {
      id: 'ip-referrals',
      title: 'Referrals and outreach',
      blocks: [
        { type: 'text', value: 'A short, specific message works best. Say who you are, what role you are interested in and why you are a fit. Attach nothing on the first message; link the resume.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Hi Rahim,

I saw the backend role at your company. I build Node.js APIs
and recently cut checkout errors by 40 percent.

Would you be open to referring me, or pointing me to the
right person?

Resume: [link]

Thanks,
Ayesha` },
        { type: 'note', value: 'Do not ask a stranger to “refer me for any role”. Be specific and make it easy to say yes.' },
      ],
    },
    {
      id: 'ip-tracker',
      title: 'Tracking applications',
      blocks: [
        { type: 'text', value: 'Keep a simple sheet: company, role, date, stage, contact and next step. Follow up after a week if there is no reply. A tracker prevents duplicate applications and missed follow-ups.' },
        { type: 'list', items: [
          'Company and role',
          'Date applied and source',
          'Current stage',
          'Contact and referral',
          'Next action and date',
        ] },
        { type: 'note', value: 'Twenty targeted applications with follow-ups beat two hundred blind ones.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'job-search',
      q: 'Which source has the highest response rate?',
      options: ['Job boards', 'Referrals', 'Cold email only', 'Social media ads'],
      answer: 1,
      explain: 'Referrals are the strongest path.',
    },
    {
      chapterId: 'job-search',
      q: 'Should you apply at a 20 percent match?',
      options: ['Always', 'Rarely', 'Only with a referral', 'Every day'],
      answer: 1,
      explain: 'Aim for a reasonable match.',
    },
    {
      chapterId: 'job-search',
      q: 'What should an outreach message include?',
      options: ['A long life story', 'Who you are, the role and why you fit', 'A price', 'Nothing'],
      answer: 1,
      explain: 'Be specific and short.',
    },
    {
      chapterId: 'job-search',
      q: 'Why keep an application tracker?',
      options: ['For decoration', 'To avoid duplicates and missed follow-ups', 'To share online', 'To pay taxes'],
      answer: 1,
      explain: 'Tracking keeps the search organised.',
    },
  ],
};
