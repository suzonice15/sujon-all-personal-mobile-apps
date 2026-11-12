// Cloud chapter: Monitoring and Cost.

export default {
  id: 'monitoring-cost',
  title: 'Monitoring & Cost',
  description: 'Logs, metrics, alerts and budgets',
  icon: 'monitor',
  lessons: [
    {
      id: 'cloud-monitoring',
      title: 'Logs and metrics',
      blocks: [
        { type: 'text', value: 'Cloud monitoring collects metrics, logs and traces. Alert on symptoms users feel: errors, latency and availability. Do not alert on every CPU spike.' },
        { type: 'list', items: [
          'AWS CloudWatch',
          'GCP Cloud Monitoring / Logging',
          'Azure Monitor / Log Analytics',
          'Dashboards for rate, errors, duration and saturation',
        ] },
        { type: 'note', value: 'A dashboard nobody opens is decoration. Tie each panel to a decision or an alert.' },
      ],
    },
    {
      id: 'cloud-cost',
      title: 'Cost control',
      blocks: [
        { type: 'text', value: 'Cloud bills grow from idle resources, oversized instances, forgotten disks and egress. Set budgets and alerts before the surprise invoice.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Checklist:
- right-size instances
- delete unattached disks and old snapshots
- use lifecycle rules for storage
- cache and compress to cut egress
- turn off dev environments at night
- set a budget alert` },
        { type: 'note', value: 'The cheapest resource is the one you delete. Review unused resources monthly.' },
      ],
    },
    {
      id: 'cloud-incidents',
      title: 'Incidents in the cloud',
      blocks: [
        { type: 'list', items: [
          'Know which region and service are affected',
          'Use status pages and provider health dashboards',
          'Have a rollback path',
          'Keep a runbook for DNS, TLS and database failover',
          'Communicate with users early',
        ] },
        { type: 'text', value: 'You cannot control the provider outage, but you can control your retries, timeouts, fallbacks and communication.' },
        { type: 'note', value: 'A single-region design fails when that region fails. Multi-region is expensive; decide based on the availability target.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'monitoring-cost',
      q: 'What should alerts focus on?',
      options: ['Every CPU spike', 'Symptoms users feel', 'Disk color', 'Deploy logs only'],
      answer: 1,
      explain: 'Errors, latency and availability matter.',
    },
    {
      chapterId: 'monitoring-cost',
      q: 'What is a common source of cloud waste?',
      options: ['Caching', 'Idle resources and forgotten disks', 'Compression', 'Lifecycle rules'],
      answer: 1,
      explain: 'Unused resources still cost money.',
    },
    {
      chapterId: 'monitoring-cost',
      q: 'What limits a single-region outage?',
      options: ['A bigger VM', 'A multi-region design', 'A longer timeout', 'A new logo'],
      answer: 1,
      explain: 'Multi-region is expensive but resilient.',
    },
  ],
};
