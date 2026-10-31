// Vue chapter: Errors, Auth and APIs. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'errors-auth-api',
  title: 'Errors, Auth and APIs',
  description: 'Error boundaries, login flows and real-time data',
  icon: 'lock',
  lessons: [
    {
      id: 'vue-error-handling',
      title: 'Error Handling',
      blocks: [
        { type: 'text', value: 'A component that throws can break the screen. onErrorCaptured lets a parent catch errors from its descendants and show a fallback, like a React error boundary. app.config.errorHandler catches anything left over, for logging.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, onErrorCaptured, defineComponent } from 'vue';

const BuggyCounter = defineComponent({
  setup() {
    const n = ref(0);
    return { n };
  },
  template: \`<button @click="n++">Count: {{ n }} {{ n === 3 ? crash() : '' }} (crashes at 3)</button>\`,
  methods: { crash() { throw new Error('Counter crashed at 3!'); } },
});

const ErrorBoundary = defineComponent({
  setup() {
    const error = ref(null);
    onErrorCaptured(err => {
      error.value = err;
      console.log('Report to monitoring:', err.message);
      return false;              // stop the error from propagating further
    });
    return { error };
  },
  template: \`
    <div v-if="error" style="background: #fee2e2; padding: 10px; border-radius: 8px">
      Something went wrong. <button @click="error = null">Try again</button>
    </div>
    <slot v-else />\`,
});
</script>

<template>
  <ErrorBoundary><BuggyCounter /></ErrorBoundary>
  <p>The rest of the app keeps working.</p>
</template>` },
        { type: 'code', lang: 'js', value: `// main.js: last line of defense, e.g. send to Sentry
app.config.errorHandler = (err, instance, info) => {
  console.error('Unhandled error in', info, err);
  reportToMonitoring(err);
};` },
      ],
    },
    {
      id: 'vue-auth-flow',
      title: 'API Layer and Authentication Flow',
      blocks: [
        { type: 'text', value: 'A production login flow has four parts: an API client, an auth store, a router guard and session restore on startup.' },
        { type: 'code', lang: 'js', value: `// services/api.js
const BASE = import.meta.env.VITE_API_URL;

export async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(BASE + path, {
    method,
    credentials: 'include',                       // send the httpOnly session cookie
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { status: 401 });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || res.statusText);
  return res.status === 204 ? null : res.json();
}

// stores/auth.js
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const ready = ref(false);
  const isLoggedIn = computed(() => !!user.value);

  async function restore() {                      // call once on app start
    try { user.value = await request('/auth/me'); } catch { user.value = null; }
    ready.value = true;
  }
  async function login(email, password) {
    user.value = await request('/auth/login', { method: 'POST', body: { email, password } });
  }
  async function logout() {
    await request('/auth/logout', { method: 'POST' });
    user.value = null;
  }
  return { user, ready, isLoggedIn, restore, login, logout };
});

// router guard
router.beforeEach(async to => {
  const auth = useAuthStore();
  if (!auth.ready) await auth.restore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) return { name: 'login', query: { redirect: to.fullPath } };
});` },
        { type: 'note', value: 'Keep tokens in httpOnly cookies set by the server whenever possible. Anything in localStorage can be stolen by an XSS bug.' },
      ],
    },
    {
      id: 'vue-websocket',
      title: 'Real-time Data with a WebSocket Composable',
      blocks: [
        { type: 'code', lang: 'js', value: `// composables/useChat.js
import { ref, watchEffect, toValue, onWatcherCleanup } from 'vue';

export function useChat(roomId) {
  const messages = ref([]);
  const status = ref('connecting');
  let socket = null;

  watchEffect(() => {
    messages.value = [];
    socket = new WebSocket('wss://chat.example.com/rooms/' + toValue(roomId));
    socket.onopen = () => { status.value = 'online'; };
    socket.onclose = () => { status.value = 'offline'; };
    socket.onmessage = e => messages.value.push(JSON.parse(e.data));
    onWatcherCleanup(() => socket.close());     // when roomId changes or the component unmounts
  });

  const send = text => socket?.send(JSON.stringify({ text }));
  return { messages, status, send };
}` },
        { type: 'list', items: [
          'Pass a ref or getter as roomId, and the composable reconnects when it changes.',
          'Add reconnect with exponential backoff for mobile networks.',
          'VueUse has useWebSocket with auto-reconnect and heartbeat built in.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'errors-auth-api', q: 'Which hook lets a parent catch errors from child components?', options: ['onErrorCaptured', 'onError', 'catchError', 'onMounted'], answer: 0, explain: 'Return false to stop further propagation.' },
    { chapterId: 'errors-auth-api', q: 'Where should the app restore the logged-in user on startup?', options: ['In every component', 'Once, in the auth store, before guarded routes load', 'In CSS', 'It is not needed'], answer: 1, explain: 'The router guard awaits restore() before checking access.' },
    { chapterId: 'errors-auth-api', q: 'What does onWatcherCleanup do in the chat composable?', options: ['Clears messages forever', 'Closes the old socket when the watcher re-runs or stops', 'Sends a message', 'Reconnects instantly'], answer: 1, explain: 'It prevents duplicate connections.' },
  ],
};
