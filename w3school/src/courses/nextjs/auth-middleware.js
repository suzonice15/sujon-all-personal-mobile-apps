// Next.js chapter: Auth and Middleware.

export default {
  id: 'auth-middleware',
  title: 'Auth & Middleware',
  description: 'Protecting routes, cookies and sessions',
  icon: 'lock',
  lessons: [
    {
      id: 'nx-middleware',
      title: 'Middleware runs before a request',
      blocks: [
        { type: 'text', value: 'Middleware runs before a request reaches a route. It can read cookies, redirect, rewrite the URL or add headers. Put the file at the project root. The file name has changed across Next.js releases, so check the docs for your version.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// middleware.ts at the project root
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};` },
        { type: 'note', value: 'Middleware is a fast first check, not the only one. Verify the session again where the data is loaded, because a routing rule can be misconfigured.' },
      ],
    },
    {
      id: 'nx-sessions-cookies',
      title: 'Sessions and cookies',
      blocks: [
        { type: 'text', value: 'A session cookie identifies the logged-in user. Mark it httpOnly so scripts cannot read it, secure so it travels only over HTTPS, and sameSite to limit cross-site requests. In the App Router, cookies() is async.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/login/actions.ts
'use server';

import { cookies } from 'next/headers';

export async function login(token: string) {
  const store = await cookies();
  store.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}` },
        { type: 'list', items: [
          'httpOnly - scripts cannot read the cookie',
          'secure - sent only over HTTPS',
          'sameSite - limits cross-site sending',
          'Short maxAge for sensitive sessions',
        ] },
      ],
    },
    {
      id: 'nx-protect-data',
      title: 'Protecting data, not only pages',
      blocks: [
        { type: 'text', value: 'Hiding a link does not protect data. Every Server Component, Server Action and route handler that reads or writes private data must check the session and the user role itself.' },
        { type: 'code', lang: 'tsx', tryIt: false, value: `// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect('/login');

  const progress = await db.progress.findMany({
    where: { userId: session.user.id },   // only this user's rows
  });

  return <ProgressList items={progress} />;
}` },
        { type: 'note', value: 'Always filter database queries by the logged-in user id. Trusting an id sent by the browser lets one user read another user data.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'auth-middleware',
      q: 'What does middleware do?',
      options: ['Runs after the page is painted', 'Runs before a request reaches a route', 'Replaces React', 'Stores files'],
      answer: 1,
      explain: 'It can redirect, rewrite or inspect requests early.',
    },
    {
      chapterId: 'auth-middleware',
      q: 'Which cookie flag stops scripts from reading the cookie?',
      options: ['secure', 'httpOnly', 'maxAge', 'path'],
      answer: 1,
      explain: 'httpOnly keeps the cookie away from JavaScript in the page.',
    },
    {
      chapterId: 'auth-middleware',
      q: 'Why should data functions check the session again?',
      options: ['Middleware is the only safe check', 'Middleware alone is not enough; data must be protected too', 'It makes pages faster', 'It is required by React'],
      answer: 1,
      explain: 'Every read and write of private data needs its own check.',
    },
    {
      chapterId: 'auth-middleware',
      q: 'Why filter a query by the logged-in user id?',
      options: ['To speed up SQL', 'So one user cannot read another user data', 'To style the list', 'It is optional'],
      answer: 1,
      explain: 'Ownership must be enforced on the server.',
    },
  ],
};
