// Cloud chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Cloud models, regions and shared responsibility',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'cloud-what-is',
      title: 'What is the cloud?',
      blocks: [
        { type: 'text', value: 'The cloud is someone else\'s data center, rented by the minute. You get compute, storage, databases and networking through an API instead of buying hardware.' },
        { type: 'list', items: [
          'IaaS - virtual machines, networks and disks',
          'PaaS - a managed runtime, for example App Service or Cloud Run',
          'SaaS - a finished product such as email or a CRM',
          'Serverless - you deploy code, the provider runs it on demand',
        ] },
        { type: 'note', value: 'The cloud does not remove operations. It moves the work from hardware to configuration, identity and cost.' },
      ],
    },
    {
      id: 'cloud-regions',
      title: 'Regions and availability zones',
      blocks: [
        { type: 'text', value: 'A region is a geographic area. Each region has several availability zones: separate data centers with independent power and network. Deploy across zones for resilience.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Region: ap-southeast-1 (Singapore)
  AZ a: 10.0.1.0/24
  AZ b: 10.0.2.0/24
  AZ c: 10.0.3.0/24

App in two AZs + managed database = survive one AZ failure` },
        { type: 'note', value: 'Choose a region close to your users for latency, and check data-residency rules before storing personal data.' },
      ],
    },
    {
      id: 'cloud-shared-responsibility',
      title: 'Shared responsibility',
      blocks: [
        { type: 'text', value: 'The provider secures the physical infrastructure and the managed service internals. You secure identities, configuration, data and application code.' },
        { type: 'list', items: [
          'Provider: data centers, hardware, hypervisor',
          'You: IAM, network rules, encryption, app code',
          'Managed database: provider patches the engine, you control access',
          'Object storage: provider stores it, you set the policy',
        ] },
        { type: 'note', value: 'Most cloud breaches are customer-side misconfiguration: a public bucket, an open port or an over-permissive role.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is IaaS?',
      options: ['A finished app', 'Virtual machines and infrastructure', 'A database only', 'A support plan'],
      answer: 1,
      explain: 'You rent infrastructure and manage the OS and app.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is an availability zone?',
      options: ['A country', 'An isolated data center within a region', 'A billing plan', 'A database'],
      answer: 1,
      explain: 'AZs are separate facilities for resilience.',
    },
    {
      chapterId: 'getting-started',
      q: 'Who secures your IAM policy?',
      options: ['The provider', 'You', 'The database', 'The CDN'],
      answer: 1,
      explain: 'IAM is customer-side configuration.',
    },
  ],
};
