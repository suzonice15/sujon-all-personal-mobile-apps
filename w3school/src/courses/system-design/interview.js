// System Design chapter: Interview.

export default {
  id: 'interview',
  title: 'The Design Interview',
  description: 'A repeatable framework and how to communicate',
  icon: 'record-voice-over',
  lessons: [
    {
      id: 'sd-interview-framework',
      title: 'The framework',
      blocks: [
        { type: 'list', items: [
          'Clarify requirements and scope (5 min)',
          'Estimate scale and constraints (5 min)',
          'Define the API and data model (10 min)',
          'Draw the high-level architecture (10 min)',
          'Deep dive into one or two components (15 min)',
          'Discuss bottlenecks, failure and trade-offs (10 min)',
        ] },
        { type: 'text', value: 'Do not jump to a diagram. The first ten minutes decide whether the design solves the right problem.' },
        { type: 'note', value: 'State assumptions out loud. "I assume 1 million daily users and a 100:1 read ratio" lets the interviewer correct you early.' },
      ],
    },
    {
      id: 'sd-interview-questions',
      title: 'Common questions',
      blocks: [
        { type: 'list', items: [
          'Design a URL shortener',
          'Design a social feed',
          'Design a chat app',
          'Design a rate limiter',
          'Design a notification service',
          'Design a file storage service',
          'Design a search autocomplete',
          'Design a ticket booking system',
          'Design a payment system',
          'Design a metrics pipeline',
        ] },
        { type: 'text', value: 'Most questions reuse the same blocks: load balancer, stateless API, cache, database, queue and object storage. The differences are the access pattern and the consistency requirement.' },
        { type: 'note', value: 'Practise drawing the same architecture for different questions. The transferable skill is the reasoning, not the memorised diagram.' },
      ],
    },
    {
      id: 'sd-interview-communication',
      title: 'Communication',
      blocks: [
        { type: 'text', value: 'Interviewers evaluate how you think. Narrate the trade-off: "I chose a cache here because the read is hot and a few seconds of staleness is acceptable."' },
        { type: 'list', items: [
          'State assumptions and invite correction',
          'Compare two options and choose one',
          'Mention the failure mode you are protecting against',
          'Admit what you do not know',
          'Summarise the design at the end',
        ] },
        { type: 'note', value: 'Silence is the enemy. A reasonable design explained clearly beats a perfect design you cannot communicate.' },
      ],
    },
    {
      id: 'sd-interview-summary',
      title: 'Final checklist',
      blocks: [
        { type: 'list', items: [
          'Did I cover functional and non-functional requirements?',
          'Did I estimate scale?',
          'Is the API and data model explicit?',
          'Did I name the bottleneck and how to scale it?',
          'Did I discuss caching and consistency?',
          'Did I handle failure and retries?',
          'Did I mention monitoring and deployment?',
          'Did I state the trade-offs?',
        ] },
        { type: 'text', value: 'A finished, explained design with a clear bottleneck discussion is the goal. Perfection is not.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'interview',
      q: 'What should you do first in a design interview?',
      options: ['Draw the database', 'Clarify requirements and scope', 'Write code', 'Pick a cloud vendor'],
      answer: 1,
      explain: 'The first step is understanding the problem.',
    },
    {
      chapterId: 'interview',
      q: 'Why state assumptions out loud?',
      options: ['To fill time', 'So the interviewer can correct them early', 'To show confidence', 'To avoid questions'],
      answer: 1,
      explain: 'Early correction prevents a wrong design.',
    },
    {
      chapterId: 'interview',
      q: 'What is more important than a perfect diagram?',
      options: ['Clear reasoning and trade-offs', 'A large diagram', 'Many components', 'A specific vendor'],
      answer: 0,
      explain: 'Interviewers evaluate thinking and communication.',
    },
    {
      chapterId: 'interview',
      q: 'What should you discuss at the end?',
      options: ['Bottlenecks, failure and trade-offs', 'Only the UI', 'The code style', 'The logo'],
      answer: 0,
      explain: 'That is where senior-level judgement shows.',
    },
  ],
};
