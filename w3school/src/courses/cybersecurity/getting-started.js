// Security chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'The security mindset, the CIA triad and threat modeling',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'sec-what-is',
      title: 'What is security?',
      blocks: [
        { type: 'text', value: 'Security is not a product you install. It is a set of decisions that reduce the chance and impact of failure: someone reading data they should not, changing it, or stopping the service.' },
        { type: 'list', items: [
          'Confidentiality - only authorised people can read data',
          'Integrity - data cannot be changed undetected',
          'Availability - the service keeps working',
          'Authentication - who are you?',
          'Authorization - what may you do?',
          'Auditability - can we reconstruct what happened?',
        ] },
        { type: 'note', value: 'The CIA triad is the vocabulary of every security conversation. Most controls protect one or more of these three.' },
      ],
    },
    {
      id: 'sec-threat-model',
      title: 'Threat modeling',
      blocks: [
        { type: 'text', value: 'A threat model asks four questions: what are we building, what can go wrong, what are we going to do, and did we do a good job? Do it before writing code.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Asset: user accounts and coins
Entry points: login, API, admin panel, database
Threats: credential stuffing, IDOR, stolen token, SQL injection
Controls: MFA, ownership checks, short tokens, parameterized SQL
Residual risk: phishing; add user education and alerts` },
        { type: 'list', items: [
          'Draw the data flow and trust boundaries',
          'List assets and who can reach them',
          'Rank threats by likelihood and impact',
          'Choose controls and record the residual risk',
        ] },
        { type: 'note', value: 'A threat model that fits on one page is more useful than a 40-page document nobody reads.' },
      ],
    },
    {
      id: 'sec-attack-surface',
      title: 'Attack surface',
      blocks: [
        { type: 'text', value: 'The attack surface is everything an attacker can reach: endpoints, forms, uploads, APIs, admin panels, dependencies, cloud buckets and human support.' },
        { type: 'list', items: [
          'Every public endpoint is a door',
          'Every dependency is code you did not write',
          'Every permission is a potential mistake',
          'Every human is a phishing target',
          'Every old backup is a copy of your data',
        ] },
        { type: 'note', value: 'Reduce the surface before adding controls. A service that is not exposed cannot be attacked through that exposure.' },
      ],
    },
    {
      id: 'sec-ethics-law',
      title: 'Ethics and law',
      blocks: [
        { type: 'text', value: 'Only test systems you own or have explicit written permission to test. Unauthorised access is a crime in most countries, even if you meant well.' },
        { type: 'list', items: [
          'Get written scope and permission',
          'Stay inside the agreed targets and hours',
          'Do not access real user data',
          'Report findings privately and responsibly',
          'Never demand payment to disclose a bug',
        ] },
        { type: 'note', value: 'A "harmless" scan can take down a fragile service. Authorization and a rollback plan are part of professional testing.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does confidentiality protect?',
      options: ['Uptime', 'Who can read data', 'Data accuracy', 'Backups'],
      answer: 1,
      explain: 'Only authorised people should read the data.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is threat modeling?',
      options: ['A firewall', 'A structured look at what can go wrong and what to do', 'A password', 'A scanner'],
      answer: 1,
      explain: 'It identifies assets, threats, controls and residual risk.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the attack surface?',
      options: ['The CPU', 'Everything an attacker can reach', 'The database size', 'The office'],
      answer: 1,
      explain: 'It includes endpoints, dependencies, permissions and people.',
    },
    {
      chapterId: 'getting-started',
      q: 'When may you test a system?',
      options: ['Whenever you want', 'With written authorization and scope', 'Only at night', 'If it is public'],
      answer: 1,
      explain: 'Unauthorised testing is illegal and unethical.',
    },
  ],
};
