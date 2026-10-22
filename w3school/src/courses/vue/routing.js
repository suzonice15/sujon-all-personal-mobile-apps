// Vue chapter: Vue Router. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'routing',
  title: 'Vue Router',
  description: 'Pages, parameters, nested routes and guards',
  icon: 'alt-route',
  lessons: [
    {
      id: 'vue-router-basics',
      title: 'Router Basics',
      blocks: [
        { type: 'text', value: 'Vue Router is the official router. It maps URLs to components, renders the matched one in <RouterView>, and switches pages without reloading.' },
        { type: 'code', lang: 'js', value: `// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/courses', name: 'courses', component: () => import('../views/Courses.vue') }, // lazy
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
  ],
});

// src/main.js
createApp(App).use(router).mount('#app');` },
        { type: 'code', lang: 'vue', value: `<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink :to="{ name: 'courses' }">Courses</RouterLink>
  </nav>
  <RouterView />
</template>

<style>
.router-link-active { font-weight: bold; }   /* added automatically to the current link */
</style>` },
        { type: 'note', value: 'Use named routes ({ name: "courses" }) in links. If a URL changes later, you only update it in one place.' },
      ],
    },
    {
      id: 'vue-router-params',
      title: 'Dynamic Routes, Query and Navigation',
      blocks: [
        { type: 'code', lang: 'js', value: `const routes = [
  { path: '/courses/:courseId/lessons/:lessonId', name: 'lesson', component: Lesson, props: true },
];` },
        { type: 'code', lang: 'vue', value: `<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({ courseId: String, lessonId: String }); // props: true passes params as props
const route = useRoute();
const router = useRouter();

const tab = computed(() => route.query.tab ?? 'read');   // /courses/vue/lessons/intro?tab=quiz

function openQuiz() {
  router.push({ query: { ...route.query, tab: 'quiz' } });
}
function goNext(nextId) {
  router.push({ name: 'lesson', params: { courseId: props.courseId, lessonId: nextId } });
}
</script>

<template>
  <h1>{{ courseId }} / {{ lessonId }}</h1>
  <button @click="openQuiz">Quiz</button>
  <QuizPanel v-if="tab === 'quiz'" />
</template>` },
        { type: 'note', value: 'When only params change (lesson 1 → lesson 2), Vue reuses the same component. Watch the param, or the data, to load the new lesson.' },
      ],
    },
    {
      id: 'vue-router-nested-guards',
      title: 'Nested Routes and Navigation Guards',
      blocks: [
        { type: 'code', lang: 'js', value: `const routes = [
  {
    path: '/dashboard',
    component: DashboardLayout,          // has its own <RouterView /> for children
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: Overview },      // /dashboard
      { path: 'settings', component: Settings },                 // /dashboard/settings
    ],
  },
  { path: '/login', name: 'login', component: Login },
];

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } };   // remember where they wanted to go
  }
});` },
        { type: 'list', items: [
          'router.beforeEach: global guard for auth, permissions and analytics',
          'beforeEnter on a route: guard for one route',
          'onBeforeRouteLeave in a component: warn about unsaved changes',
          'scrollBehavior option: restore scroll position on back navigation',
        ] },
        { type: 'note', value: 'Guards only protect the UI. The API must still verify every request.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'routing', q: 'Where does the matched route component render?', options: ['<RouterLink>', '<RouterView>', '<Outlet>', '<Route>'], answer: 1, explain: 'RouterView is the placeholder.' },
    { chapterId: 'routing', q: 'How do you read the :courseId param inside a component?', options: ['useRouter().params', 'useRoute().params.courseId', 'this.params', 'window.location'], answer: 1, explain: 'useRoute gives the current route; useRouter navigates.' },
    { chapterId: 'routing', q: 'Which navigates programmatically?', options: ['route.push()', 'router.push()', 'RouterLink.go()', 'history.vue()'], answer: 1, explain: 'router.push({ name, params, query }).' },
    { chapterId: 'routing', q: 'Where do you check if a route requires login for every navigation?', options: ['In main.css', 'In router.beforeEach', 'In every template', 'In package.json'], answer: 1, explain: 'A global guard runs before each navigation.' },
  ],
};
