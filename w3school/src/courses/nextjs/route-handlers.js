// Next.js chapter: Route Handlers (API endpoints).

export default {
  id: 'route-handlers',
  title: 'Route Handlers & APIs',
  description: 'route.ts endpoints for other clients and webhooks',
  icon: 'api',
  lessons: [
    {
      id: 'nx-route-handler',
      title: 'Writing a route handler',
      blocks: [
        { type: 'text', value: 'A route.ts file exports functions named after HTTP methods: GET, POST, PUT, PATCH and DELETE. Each receives a Request and returns a Response. Use it when another app, a mobile client or a webhook needs an HTTP endpoint.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/api/courses/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const courses = await db.course.findMany();
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const course = await db.course.create({ data: { title: body.title } });
  return NextResponse.json(course, { status: 201 });
}` },
        { type: 'note', value: 'Route handlers cannot live in the same folder as a page.tsx. A folder holds either a page or a route, not both.' },
      ],
    },
    {
      id: 'nx-dynamic-api',
      title: 'Dynamic API routes',
      blocks: [
        { type: 'text', value: 'A dynamic handler reads its params the same way a page does: the second argument contains a Promise of params that you await.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/api/courses/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const course = await db.course.findUnique({ where: { id: Number(id) } });

  if (!course) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(course);
}` },
        { type: 'list', items: [
          'Use the correct status code: 200, 201, 204, 400, 404, 500',
          'Parse and validate the body before using it',
          'Return JSON with a consistent error shape',
        ] },
      ],
    },
    {
      id: 'nx-handler-vs-action',
      title: 'Route handler or Server Action?',
      blocks: [
        { type: 'text', value: 'Use a Server Action for forms and mutations inside your own Next.js app. Use a route handler for public APIs, webhooks, mobile apps and any caller that is not your own page.' },
        { type: 'list', items: [
          'Own form submitting data: Server Action',
          'Stripe or GitHub webhook: route handler',
          'Mobile app calling your backend: route handler',
          'Public JSON endpoint for other sites: route handler',
        ] },
        { type: 'note', value: 'A webhook must verify the signature of the request before doing anything. Otherwise anyone can fake a payment event.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'route-handlers',
      q: 'Which file defines an HTTP endpoint in the App Router?',
      options: ['page.tsx', 'route.ts', 'layout.tsx', 'loading.tsx'],
      answer: 1,
      explain: 'route.ts exports handlers named after HTTP methods.',
    },
    {
      chapterId: 'route-handlers',
      q: 'Which status code means a resource was created?',
      options: ['200', '201', '404', '500'],
      answer: 1,
      explain: '201 Created is the right response after a successful POST.',
    },
    {
      chapterId: 'route-handlers',
      q: 'When is a route handler better than a Server Action?',
      options: ['For your own form', 'For a mobile app or a webhook', 'For styling', 'For fonts'],
      answer: 1,
      explain: 'Route handlers are plain HTTP endpoints for any caller.',
    },
    {
      chapterId: 'route-handlers',
      q: 'What must a webhook handler do before acting?',
      options: ['Show a page', 'Verify the request signature', 'Cache the response', 'Redirect to the homepage'],
      answer: 1,
      explain: 'Without verification anyone can send fake events.',
    },
  ],
};
