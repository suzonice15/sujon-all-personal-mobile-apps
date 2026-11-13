// Agile & Scrum interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Agile?',
      a: 'Working in short cycles with frequent feedback, delivering small increments and adjusting the plan as you learn.',
      level: 'basic',
    },
    {
      q: 'Agile versus waterfall?',
      a: 'Waterfall plans everything up front and delivers at the end. Agile delivers in slices and learns between them.',
      level: 'basic',
    },
    {
      q: 'When can waterfall be reasonable?',
      a: 'When requirements are fixed and change is expensive, such as some regulated or hardware projects.',
      level: 'intermediate',
    },
    {
      q: 'What is Agile theatre?',
      a: 'Doing the ceremonies without honest feedback or change.',
      level: 'intermediate',
    },
  ],
  principles: [
    {
      q: 'What are the four Agile values?',
      a: 'Individuals and interactions, working software, customer collaboration, and responding to change.',
      level: 'basic',
    },
    {
      q: 'Why deliver early and often?',
      a: 'To get real feedback and reduce the risk of building the wrong thing.',
      level: 'basic',
    },
    {
      q: 'What does “maximise the work not done” mean?',
      a: 'Simplicity: build only what is needed instead of every possible feature.',
      level: 'intermediate',
    },
    {
      q: 'What makes continuous improvement real?',
      a: 'One applied, owned change per cycle, measured next time.',
      level: 'intermediate',
    },
  ],
  roles: [
    {
      q: 'What are the three Scrum roles?',
      a: 'Product owner, scrum master and developers.',
      level: 'basic',
    },
    {
      q: 'What does the product owner own?',
      a: 'The backlog order and the value delivered, and accepting or rejecting the increment.',
      level: 'basic',
    },
    {
      q: 'What does the scrum master do?',
      a: 'Coaches the process, removes blockers and helps the team improve.',
      level: 'basic',
    },
    {
      q: 'Why does team size matter?',
      a: 'Small teams communicate faster. Scrum teams are usually 3 to 9 people.',
      level: 'intermediate',
    },
  ],
  events: [
    {
      q: 'What are the Scrum events?',
      a: 'The sprint, sprint planning, the daily scrum, the sprint review and the retrospective.',
      level: 'basic',
    },
    {
      q: 'What does sprint planning produce?',
      a: 'A sprint goal and the selected backlog items.',
      level: 'basic',
    },
    {
      q: 'What is the daily for?',
      a: 'A short team sync: what was done, what is next and blockers.',
      level: 'basic',
    },
    {
      q: 'What is the retrospective for?',
      a: 'Improving how the team works, with one owned change.',
      level: 'intermediate',
    },
  ],
  backlog: [
    {
      q: 'What is a user story?',
      a: 'A need from the user’s view: as a role, I want X, so that Y.',
      level: 'basic',
    },
    {
      q: 'What are acceptance criteria?',
      a: 'Observable conditions that define when a story is done and testable.',
      level: 'basic',
    },
    {
      q: 'What is a vertical slice?',
      a: 'A thin end-to-end piece that delivers value and can be demoed.',
      level: 'intermediate',
    },
    {
      q: 'Why avoid splitting by technical layer?',
      a: 'No slice is demoable until every layer is finished, so feedback is delayed.',
      level: 'intermediate',
    },
  ],
  estimation: [
    {
      q: 'What do story points measure?',
      a: 'Relative size: effort, complexity and uncertainty, not hours.',
      level: 'basic',
    },
    {
      q: 'Why use planning poker?',
      a: 'Simultaneous reveal avoids anchoring and surfaces different assumptions.',
      level: 'intermediate',
    },
    {
      q: 'What does a wide estimate spread mean?',
      a: 'The story is unclear. Clarify it before estimating again.',
      level: 'intermediate',
    },
    {
      q: 'What is a spike?',
      a: 'A short, time-boxed investigation to reduce uncertainty before estimating.',
      level: 'basic',
    },
  ],
  'sprints-metrics': [
    {
      q: 'What is velocity?',
      a: 'Points completed per sprint. It forecasts capacity for one team only.',
      level: 'basic',
    },
    {
      q: 'Should you compare velocity across teams?',
      a: 'No. Points are team-specific and comparison encourages gaming.',
      level: 'intermediate',
    },
    {
      q: 'What is cycle time?',
      a: 'The time from starting an item to finishing it.',
      level: 'basic',
    },
    {
      q: 'How do you improve flow?',
      a: 'Limit work in progress, find the bottleneck and reduce batch size.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you handle urgent work in a sprint?',
      a: 'Replace a story with it and keep capacity honest. Do not pile it on top.',
      level: 'intermediate',
    },
    {
      q: 'What makes a retro action useful?',
      a: 'It is one change, with an owner and a way to measure it next time.',
      level: 'basic',
    },
    {
      q: 'How do you improve a struggling team?',
      a: 'Make the work visible, limit WIP, fix the biggest blocker, and keep the goal small and clear.',
      level: 'advanced',
    },
    {
      q: 'What is the best first Agile step?',
      a: 'Write one sprint goal and three small stories with acceptance criteria.',
      level: 'basic',
    },
  ],
};
