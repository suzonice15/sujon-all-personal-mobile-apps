// Vue chapter: Nuxt. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'nuxt',
  title: 'Nuxt',
  description: 'The full-stack Vue framework',
  icon: 'dns',
  lessons: [
    {
      id: 'vue-nuxt-intro',
      title: 'Nuxt: Routing and Layouts',
      blocks: [
        { type: 'text', value: 'Nuxt is to Vue what Next.js is to React: file-based routing, server-side rendering, SEO, auto-imports and API routes. Pages are rendered on the server first, so they load fast and search engines see real content.' },
        { type: 'code', lang: 'text', value: `npx nuxi@latest init my-site

pages/
├── index.vue              /
├── courses/
│   ├── index.vue          /courses
│   └── [slug].vue         /courses/html, /courses/vue ...
layouts/
└── default.vue            shared header and footer (<slot />)
components/                auto-imported, no import lines needed
composables/               auto-imported
server/api/
└── courses.get.js         an API endpoint at /api/courses` },
        { type: 'code', lang: 'vue', value: `<!-- pages/courses/[slug].vue -->
<script setup>
const route = useRoute();                       // auto-imported
const { data: course, error } = await useFetch('/api/courses/' + route.params.slug);
if (error.value) throw createError({ statusCode: 404, message: 'Course not found' });

useSeoMeta({
  title: () => 'Learn ' + course.value.title + ' | CodeNest',
  description: () => course.value.tagline,
});
</script>

<template>
  <h1>{{ course.title }}</h1>
  <NuxtLink v-for="l in course.lessons" :key="l.id" :to="'/courses/' + route.params.slug + '/' + l.id">{{ l.title }}</NuxtLink>
</template>` },
      ],
    },
    {
      id: 'vue-nuxt-server',
      title: 'Data Fetching, Server Routes and Deployment',
      blocks: [
        { type: 'code', lang: 'js', value: `// server/api/courses.get.js: runs only on the server
export default defineEventHandler(async (event) => {
  const query = getQuery(event);                 // ?level=beginner
  const courses = await db.course.findMany({ where: { level: query.level } });
  return courses;                                // returned as JSON
});` },
        { type: 'list', items: [
          'useFetch / useAsyncData: fetch on the server during SSR, reuse the data in the browser (no double request).',
          'Rendering modes per route: SSR, static (prerender), or client-only.',
          'runtimeConfig: secrets stay on the server; public values go to the browser.',
          'Deploy to Vercel, Netlify, Cloudflare or any Node server with almost no configuration.',
        ] },
        { type: 'note', value: 'Choose Nuxt when you need SEO, fast first loads or a backend in the same project. For dashboards behind a login, a plain Vite + Vue app is often enough.' },
      ],
    },
    {
      id: 'vue-nuxt-middleware-state',
      title: 'Middleware, Shared State and Plugins',
      blocks: [
        { type: 'heading', value: 'Route middleware' },
        { type: 'code', lang: 'js', value: `// middleware/auth.js: runs before entering any page that uses it
export default defineNuxtRouteMiddleware((to) => {
  const user = useUser();
  if (!user.value) return navigateTo('/login?redirect=' + to.fullPath);
});

// pages/dashboard.vue
// <script setup> definePageMeta({ middleware: 'auth' }) </script>` },
        { type: 'heading', value: 'SSR-safe shared state with useState' },
        { type: 'code', lang: 'js', value: `// composables/useUser.js
export const useUser = () => useState('user', () => null);
// The same key returns the same state everywhere, and it is
// transferred from the server render to the browser automatically.` },
        { type: 'heading', value: 'Plugins' },
        { type: 'code', lang: 'js', value: `// plugins/api.js: runs once when the app starts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const api = $fetch.create({ baseURL: config.public.apiBase });
  return { provide: { api } };    // available as useNuxtApp().$api
});` },
        { type: 'note', value: 'Never keep per-user state in a plain module-level ref in Nuxt: on the server it would be shared between all visitors. Use useState or Pinia.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'nuxt', q: 'Which file creates the page /courses/:slug in Nuxt?', options: ['pages/courses/slug.vue', 'pages/courses/[slug].vue', 'routes/courses.js', 'app/courses/page.vue'], answer: 1, explain: 'Square brackets mark a dynamic segment.' },
    { chapterId: 'nuxt', q: 'What is special about useFetch in Nuxt?', options: ['It only works in the browser', 'It fetches during SSR and reuses the data on the client', 'It needs axios', 'It caches forever'], answer: 1, explain: 'This avoids requesting the same data twice.' },
    { chapterId: 'nuxt', q: 'Where do Nuxt API endpoints live?', options: ['public/', 'server/api/', 'pages/api/', 'components/api/'], answer: 1, explain: 'Files in server/api become endpoints.' },
    { chapterId: 'nuxt', q: 'Why use useState instead of a module-level ref in Nuxt?', options: ['It is shorter', 'A module-level ref is shared between all visitors on the server', 'Refs do not work in Nuxt', 'For styling'], answer: 1, explain: 'useState is per request and transferred to the client.' },
  ],
};
