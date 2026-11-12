// Next.js interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What does Next.js add to React?',
      a: 'Routing, server rendering, server-side data access, API endpoints, image and font optimization and a production build pipeline.',
      level: 'basic',
    },
    {
      q: 'What is the App Router?',
      a: 'The modern routing system in the app folder. Folders become URLs, and special files such as layout, page and loading describe each route.',
      level: 'basic',
    },
    {
      q: 'When is Next.js not the right choice?',
      a: 'A small client-only tool or a static page that does not need SEO or a server. A plain React app or a static site generator can be simpler.',
      level: 'intermediate',
    },
    {
      q: 'Why do the public folder files have root URLs?',
      a: 'Next.js serves public/ at the site root, so public/logo.svg is available at /logo.svg without any routing code.',
      level: 'basic',
    },
  ],
  routing: [
    {
      q: 'What does a layout do during navigation?',
      a: 'It persists between its child pages and does not re-render, so its state, such as an open sidebar, is kept.',
      level: 'basic',
    },
    {
      q: 'What is a route group?',
      a: 'A folder in parentheses, such as (auth). It groups routes or applies a layout without adding a segment to the URL.',
      level: 'intermediate',
    },
    {
      q: 'Why must params be awaited?',
      a: 'In Next.js 15 and later, params is a Promise. Awaiting it keeps dynamic rendering correct and matches the newer async APIs.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between [slug] and [...slug]?',
      a: '[slug] matches one segment. [...slug] is a catch-all that matches several segments, such as /docs/a/b/c.',
      level: 'basic',
    },
  ],
  'server-client': [
    {
      q: 'What is the default component type in the App Router?',
      a: 'Server Component. It runs on the server and sends rendered output, with no JavaScript shipped for that component.',
      level: 'basic',
    },
    {
      q: 'What can a Client Component not do?',
      a: 'Import a Server Component directly. It can receive one as children or as a prop, but it cannot use server-only code itself.',
      level: 'intermediate',
    },
    {
      q: 'What props can cross from server to client?',
      a: 'Serializable values such as strings, numbers, booleans, arrays and plain objects. Functions and class instances cannot cross, except Server Actions.',
      level: 'intermediate',
    },
    {
      q: 'Why keep "use client" components small?',
      a: 'Everything a Client Component imports is shipped to the browser. Keeping the boundary small keeps the bundle small and the page fast.',
      level: 'advanced',
    },
  ],
  'data-fetching': [
    {
      q: 'Where does a Server Component fetch data?',
      a: 'On the server during rendering, using async and await. The browser receives the finished HTML or the serialized result.',
      level: 'basic',
    },
    {
      q: 'What does revalidate do?',
      a: 'It sets how long cached data is considered fresh. After the window, the next request triggers a background refresh of the cache.',
      level: 'intermediate',
    },
    {
      q: 'What is a request waterfall?',
      a: 'Sequential requests where each waits for the previous one. Promise.all runs independent requests in parallel to remove it.',
      level: 'intermediate',
    },
    {
      q: 'What is generateStaticParams for?',
      a: 'It lists the dynamic route values to build at build time, so those pages are pre-rendered and served as static files.',
      level: 'advanced',
    },
  ],
  'server-actions': [
    {
      q: 'What is a Server Action?',
      a: 'An async function marked "use server" that runs on the server and can be called from a form or button, without a separate API route.',
      level: 'basic',
    },
    {
      q: 'How do you secure a Server Action?',
      a: 'Validate all input on the server, check that the user is logged in and allowed to perform the action, and filter data by the user id.',
      level: 'intermediate',
    },
    {
      q: 'Why do forms with actions work without JavaScript?',
      a: 'The form submits as a normal HTML form, so the server handles it. JavaScript only adds progressive enhancement like pending states.',
      level: 'intermediate',
    },
    {
      q: 'What does revalidatePath do?',
      a: 'It clears the cached data for a route so the next visit shows the result of the write.',
      level: 'basic',
    },
  ],
  'route-handlers': [
    {
      q: 'What is a route handler?',
      a: 'A route.ts file that exports GET, POST and other HTTP method functions. It is a plain HTTP endpoint for any client.',
      level: 'basic',
    },
    {
      q: 'Route handler versus Server Action?',
      a: 'Use a Server Action for mutations from your own pages. Use a route handler for public APIs, webhooks and other clients.',
      level: 'intermediate',
    },
    {
      q: 'How should a webhook be protected?',
      a: 'Verify the signature the provider sends with a shared secret before processing. Reject requests that do not match.',
      level: 'advanced',
    },
    {
      q: 'Which status code should a successful create return?',
      a: '201 Created, with the new resource in the body or a Location header.',
      level: 'basic',
    },
  ],
  rendering: [
    {
      q: 'Static versus dynamic rendering?',
      a: 'Static pages are built once and served from a cache. Dynamic pages render for each request, needed for cookies, headers and personal data.',
      level: 'basic',
    },
    {
      q: 'What is ISR?',
      a: 'Incremental static regeneration. A cached page is served and rebuilt in the background after a revalidate window.',
      level: 'intermediate',
    },
    {
      q: 'What does streaming give the user?',
      a: 'The fast parts of the page appear immediately while slow sections load behind Suspense boundaries.',
      level: 'intermediate',
    },
    {
      q: 'How do you keep most of a page static?',
      a: 'Move the personal or request-specific part into a small dynamic component, so the rest of the page can still be cached.',
      level: 'advanced',
    },
  ],
  'seo-media': [
    {
      q: 'How does Next.js help SEO?',
      a: 'It server-renders HTML with real content, and the Metadata API sets titles, descriptions and social tags per page.',
      level: 'basic',
    },
    {
      q: 'Why does next/image need dimensions?',
      a: 'The browser reserves the space before the image loads, which prevents layout shift and improves the CLS score.',
      level: 'intermediate',
    },
    {
      q: 'What does next/font do differently?',
      a: 'It self-hosts fonts at build time, so the browser does not request a font CDN and text does not flash.',
      level: 'intermediate',
    },
    {
      q: 'What belongs in a sitemap?',
      a: 'The public URLs you want search engines to index. Private pages should not be listed.',
      level: 'basic',
    },
  ],
  'auth-middleware': [
    {
      q: 'What is middleware used for?',
      a: 'Running code before a request reaches a route, such as redirecting unauthenticated users, rewriting URLs or adding headers.',
      level: 'basic',
    },
    {
      q: 'Why must data be protected beyond middleware?',
      a: 'Middleware is a first check that can be misconfigured. Each Server Component, action and handler that touches private data must verify the session too.',
      level: 'intermediate',
    },
    {
      q: 'What do httpOnly and secure cookies do?',
      a: 'httpOnly stops JavaScript from reading the cookie, and secure sends it only over HTTPS. Together they reduce token theft.',
      level: 'intermediate',
    },
    {
      q: 'How do you prevent users reading each other data?',
      a: 'Filter every query by the session user id on the server. Never trust a user id sent from the browser.',
      level: 'advanced',
    },
  ],
  deployment: [
    {
      q: 'Which variables are exposed to the browser?',
      a: 'Only variables prefixed with NEXT_PUBLIC_. Secrets must never use that prefix.',
      level: 'basic',
    },
    {
      q: 'What does output standalone produce?',
      a: 'A minimal server bundle with only the required files, which makes container images smaller and faster to deploy.',
      level: 'intermediate',
    },
    {
      q: 'How do you find a performance problem?',
      a: 'Read the build route table, check the bundle size, use Web Vitals and Lighthouse, then change the slowest part and measure again.',
      level: 'intermediate',
    },
    {
      q: 'What is a preview deployment?',
      a: 'A temporary URL built for each pull request, so changes can be reviewed on a real deploy before they reach production.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design a course platform?',
      a: 'Static catalog with ISR, dynamic per-user dashboard, Server Actions for writes, route handlers for public APIs and middleware for protected routes.',
      level: 'intermediate',
    },
    {
      q: 'What makes a Next.js answer strong in an interview?',
      a: 'It names where the code runs (server or client), the rendering mode, the caching behaviour and the security check, with one concrete example.',
      level: 'basic',
    },
    {
      q: 'How do you debug a page that shows stale data?',
      a: 'Check the fetch cache options, the revalidate window, the revalidatePath or tag calls after the write, and whether the page is static or dynamic.',
      level: 'advanced',
    },
    {
      q: 'What is the best first step for a beginner?',
      a: 'Build one small app with a list page and a detail page, then add a form with a Server Action, one at a time.',
      level: 'basic',
    },
  ],
};
