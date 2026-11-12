// Next.js chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a course platform and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'nx-project-platform',
      title: 'Project: course platform',
      blocks: [
        { type: 'text', value: 'Build a small learning site with a public catalog, course pages, a login, a dashboard with the user progress and one Server Action to mark a lesson done. It uses every main idea in this course.' },
        { type: 'code', lang: 'text', tryIt: false, value: `app/
  page.tsx                  home, static with ISR
  courses/
    page.tsx                catalog, cached with revalidate
    [slug]/page.tsx         course page, generateStaticParams + metadata
    [slug]/actions.ts       markLessonDone Server Action
  login/page.tsx            public login form
  dashboard/page.tsx        protected, dynamic, per-user data
  api/courses/route.ts      public JSON endpoint
middleware.ts               protects /dashboard` },
        { type: 'list', items: [
          'Static catalog with a sitemap and metadata',
          'Protected dashboard with per-user queries',
          'Validated Server Action with revalidatePath',
          'One route handler for another client',
          'Deployed with environment variables and a health check',
        ] },
        { type: 'note', value: 'A finished, deployed project with a clear README is worth more than a long list of half-built features.' },
      ],
    },
    {
      id: 'nx-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Server Component versus Client Component?',
          'When do you use "use client"?',
          'Static versus dynamic rendering?',
          'What is a Server Action and how do you secure it?',
          'Route handler versus Server Action?',
          'How does caching and revalidation work?',
          'How do you protect a dashboard?',
          'How do you deploy with secrets?',
        ] },
        { type: 'text', value: 'Strong answers explain where code runs and why. "The page reads the session on the server and filters the query by user id" is a complete answer to an auth question.' },
        { type: 'note', value: 'Be ready to build a small page with one Server Component, one Client Component and one Server Action live. That covers most frontend interviews.' },
      ],
    },
    {
      id: 'nx-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: React basics, then create-next-app',
          'Week 2: routing, layouts and dynamic segments',
          'Week 3: Server and Client Components',
          'Week 4: data fetching, caching and Server Actions',
          'Week 5: route handlers, auth and middleware',
          'Week 6: SEO, performance and deployment',
          'Week 7: build and deploy one complete project',
        ] },
        { type: 'note', value: 'Build the project before you read every chapter again. Real errors teach more than rereading the same explanation.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which part of the course platform should be dynamic?',
      options: ['The course catalog', 'The user dashboard with personal progress', 'The sitemap', 'The logo'],
      answer: 1,
      explain: 'Personal data needs a fresh, per-user render.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a portfolio Next.js project convincing?',
      options: ['Many unfinished pages', 'A deployed app with clear data flow and a README', 'A copied template only', 'A large node_modules folder'],
      answer: 1,
      explain: 'A working, explained project shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which pattern marks a completed lesson?',
      options: ['A Server Action that validates and revalidates', 'A CSS hover effect', 'A global variable in the browser', 'A static HTML file'],
      answer: 0,
      explain: 'Writes should go through a validated server function.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a Next.js interview answer include?',
      options: ['Only the library name', 'Where the code runs and the trade-off', 'A list of colours', 'The logo history'],
      answer: 1,
      explain: 'Explain the mechanism and the trade-off, not only the name.',
    },
  ],
};
