// Agile chapter: Sprints & Metrics.

export default {
  id: 'sprints-metrics',
  title: 'Sprints & Metrics',
  description: 'Velocity, burndown, flow and honest reporting',
  icon: 'speed',
  lessons: [
    {
      id: 'agile-sprint-flow',
      title: 'Running a sprint',
      blocks: [
        { type: 'text', value: 'A sprint starts with a goal, runs for a fixed time and ends with a review and a retrospective. Protect the sprint from mid-cycle changes; urgent work replaces something, it does not pile on.' },
        { type: 'list', items: [
          'Fixed length, fixed goal',
          'No scope changes without removing something',
          'Daily sync and blocker removal',
          'Review with real feedback',
          'Retro with one improvement',
        ] },
        { type: 'note', value: 'A sprint that constantly changes scope is not a sprint. It is unplanned work with a ceremony attached.' },
      ],
    },
    {
      id: 'agile-velocity',
      title: 'Velocity and burndown',
      blocks: [
        { type: 'text', value: 'Velocity is the points completed per sprint. It forecasts capacity, not productivity. A burndown shows remaining work over the sprint; a flat line means work is not moving.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Sprint 1: 21 points
Sprint 2: 18 points
Sprint 3: 24 points
Average velocity: 21 points

Next sprint plan: pull about 21 points, not 30.` },
        { type: 'note', value: 'Velocity is a planning tool for one team. Using it to rank teams creates gaming and dishonest estimates.' },
      ],
    },
    {
      id: 'agile-flow',
      title: 'Flow and cycle time',
      blocks: [
        { type: 'text', value: 'Cycle time is how long an item takes from start to done. Little’s law relates work in progress, throughput and cycle time. Less work in progress usually means faster delivery.' },
        { type: 'list', items: [
          'Limit work in progress',
          'Measure cycle time, not only velocity',
          'Find the bottleneck in the flow',
          'A large queue hides delays',
          'Use a cumulative flow diagram to see it',
        ] },
        { type: 'note', value: 'Starting more work does not deliver more. Finishing work does.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sprints-metrics',
      q: 'What does velocity measure?',
      options: ['Hours worked', 'Points completed per sprint', 'Team size', 'Salary'],
      answer: 1,
      explain: 'It is a planning capacity measure.',
    },
    {
      chapterId: 'sprints-metrics',
      q: 'Should velocity rank teams?',
      options: ['Yes', 'No, it is only meaningful within one team', 'Only across companies', 'Only in waterfall'],
      answer: 1,
      explain: 'Comparing teams encourages gaming.',
    },
    {
      chapterId: 'sprints-metrics',
      q: 'What is cycle time?',
      options: ['Time from start to done for an item', 'Sprint length', 'Meeting duration', 'Time to hire'],
      answer: 0,
      explain: 'It measures flow through the system.',
    },
    {
      chapterId: 'sprints-metrics',
      q: 'What usually reduces cycle time?',
      options: ['More work in progress', 'Less work in progress', 'More meetings', 'Bigger batches'],
      answer: 1,
      explain: 'Limit WIP to finish faster.',
    },
  ],
};
