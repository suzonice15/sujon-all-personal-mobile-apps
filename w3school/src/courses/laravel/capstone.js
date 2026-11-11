// Laravel chapter: Expert Capstone.

export default {
  id: 'laravel-capstone',
  title: 'Expert Capstone',
  description: 'Build a production-grade SaaS with Laravel',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'laravel-capstone-plan',
      title: 'Capstone Plan',
      blocks: [
        { type: 'list', items: [
          'Multi-tenant SaaS with subdomains.',
          'Auth with Sanctum + 2FA.',
          'Billing with Stripe (Laravel Cashier).',
          'Admin panel with Filament.',
          'Real-time notifications with Reverb.',
          'Queue workers and scheduled jobs.',
          'Full Pest test suite + CI.',
          'Deploy with Forge/Vapor + monitoring.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'laravel-capstone', q: 'Best final project to prove expertise?', options: ['Production SaaS', 'Hello world', 'Single page', 'Static site'], answer: 0, explain: 'SaaS covers all skills.' },
  ],
};
