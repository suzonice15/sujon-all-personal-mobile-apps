// Vue interview questions, grouped by chapter id (see src/courses/index.js).

export default {
  'getting-started': [
    { level: 'basic', q: 'What is Vue and what makes it "progressive"?', a: 'A JavaScript framework for building user interfaces. Progressive means you can adopt it gradually: enhance a single widget with a script tag, or build a full app with routing, state management and server rendering.' },
    { level: 'basic', q: 'What is a Single File Component?', a: 'A .vue file that contains a component\'s <template>, <script> and <style> together. It keeps everything about one component in one place and is compiled by the build tool.' },
    { level: 'intermediate', q: 'What is <script setup>?', a: 'Compile-time syntactic sugar for the Composition API. Top-level imports, variables and functions are automatically available in the template, with less boilerplate and better TypeScript inference.' },
    { level: 'intermediate', q: 'How does Vue differ from React?', a: 'Vue uses HTML templates and fine-grained reactivity that tracks dependencies automatically, updating only what changed. React re-runs component functions and diffs the result. Vue has official router and state libraries; React relies on the community.' },
  ],
  reactivity: [
    { level: 'basic', q: 'What is the difference between ref and reactive?', a: 'ref wraps any value and is accessed with .value in script (auto-unwrapped in templates). reactive makes an object deeply reactive without .value but loses reactivity when replaced or destructured. ref is the recommended default.' },
    { level: 'intermediate', q: 'What is the difference between computed and watch?', a: 'computed derives a cached value from reactive state and must be pure. watch runs side effects (API calls, storage, logging) when its sources change and can access old and new values.' },
    { level: 'intermediate', q: 'Why does destructuring a reactive object break reactivity?', a: 'Reactivity works through Proxy property access. Destructuring copies the current values into plain variables, which are no longer connected to the proxy. Use toRefs() to destructure into refs.' },
    { level: 'advanced', q: 'How does Vue 3 reactivity work internally?', a: 'reactive() wraps objects in Proxies. When an effect (render, computed, watcher) reads a property, Vue tracks that dependency; when the property is set, Vue triggers the effects that depend on it.' },
    { level: 'advanced', q: 'What is the difference between watch and watchEffect?', a: 'watch observes explicit sources, is lazy by default and gives old and new values. watchEffect runs immediately and tracks whatever reactive values it reads automatically.' },
  ],
  directives: [
    { level: 'basic', q: 'What is the difference between v-if and v-show?', a: 'v-if adds or removes the element from the DOM (higher toggle cost, nothing rendered when false). v-show always renders and toggles display: none (higher initial cost, cheap toggling).' },
    { level: 'intermediate', q: 'Why should v-if and v-for not be on the same element?', a: 'In Vue 3 v-if has higher priority than v-for, so the condition cannot access the loop variable, and the intent is unclear. Filter the list with a computed property, or wrap with a <template>.' },
    { level: 'basic', q: 'How does v-model work?', a: 'It is shorthand for binding a value and listening for its update event. On inputs it binds value and listens to input; on components it binds modelValue and listens to update:modelValue.' },
    { level: 'intermediate', q: 'What are event modifiers?', a: 'Suffixes that handle common event tasks declaratively: .prevent (preventDefault), .stop (stopPropagation), .once, .self, and key modifiers like .enter and .esc.' },
  ],
  components: [
    { level: 'basic', q: 'How do parent and child components communicate?', a: 'Props pass data down; the child emits events to send data up. v-model gives two-way binding, slots pass template content, and provide/inject reaches deep descendants.' },
    { level: 'intermediate', q: 'What are scoped slots?', a: 'Slots that receive data from the child component (<slot :item="item" />). The parent decides how to render each item while the child owns the logic, a pattern used by tables and lists.' },
    { level: 'intermediate', q: 'What does defineModel do?', a: 'A Vue 3.4+ macro that declares a modelValue prop and update:modelValue event and returns a ref synced with the parent\'s v-model; assigning to it updates the parent.' },
    { level: 'intermediate', q: 'When would you use provide/inject?', a: 'To pass data or services to deeply nested descendants without prop drilling, for example a theme, a form context or a component library\'s configuration. Provide a ref to keep it reactive.' },
  ],
  lifecycle: [
    { level: 'basic', q: 'Name the main lifecycle hooks in the Composition API.', a: 'onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, plus onErrorCaptured and the KeepAlive hooks onActivated and onDeactivated.' },
    { level: 'intermediate', q: 'When are template refs available?', a: 'After the component is mounted. They are null during setup and after unmount, so access them in onMounted, event handlers or watchers.' },
    { level: 'intermediate', q: 'What is nextTick used for?', a: 'Vue batches DOM updates asynchronously. await nextTick() waits until pending changes are applied so you can work with the updated DOM, e.g. scroll to a newly added message.' },
  ],
  composables: [
    { level: 'basic', q: 'What is a composable?', a: 'A function (named useSomething) that encapsulates reusable stateful logic with the Composition API: refs, computed, watchers and lifecycle hooks. Each call creates independent state.' },
    { level: 'intermediate', q: 'How do composables compare to mixins?', a: 'Composables are explicit: you see where each value comes from, can rename on destructuring and avoid name clashes. Mixins merged properties invisibly into components and caused conflicts.' },
    { level: 'intermediate', q: 'Why accept refs or getters as composable arguments?', a: 'So the composable can react to changes. Using toValue() inside a watchEffect lets callers pass a plain value, a ref or a getter, and the composable re-runs when it changes.' },
  ],
  routing: [
    { level: 'basic', q: 'What is the difference between useRoute and useRouter?', a: 'useRoute returns the current route location (params, query, meta). useRouter returns the router instance for navigation (push, replace, back).' },
    { level: 'intermediate', q: 'What are navigation guards?', a: 'Functions that run before or after navigation: global (router.beforeEach), per-route (beforeEnter) and in-component (onBeforeRouteLeave). They are used for authentication, permissions and unsaved-change warnings.' },
    { level: 'intermediate', q: 'What happens when only route params change?', a: 'The same component instance is reused, so setup does not run again. Watch the param (or route) to load new data.' },
    { level: 'intermediate', q: 'How do you lazy-load routes?', a: 'Use a dynamic import as the component: component: () => import("./views/Admin.vue"). The bundler creates a separate chunk loaded only when the route is visited.' },
  ],
  pinia: [
    { level: 'basic', q: 'What is Pinia and why did it replace Vuex?', a: 'Vue\'s official state management library. It has a simpler API (no mutations), full TypeScript support, modular stores, devtools integration and works naturally with the Composition API.' },
    { level: 'intermediate', q: 'Why use storeToRefs?', a: 'Destructuring a store directly loses reactivity for state and getters. storeToRefs converts them into refs; actions can be destructured directly from the store.' },
    { level: 'intermediate', q: 'What are state, getters and actions in a setup store?', a: 'refs are state, computed values are getters, and functions are actions. Everything you return from the setup function becomes part of the store.' },
  ],
  'forms-data': [
    { level: 'intermediate', q: 'How do you implement form validation in Vue?', a: 'For small forms, computed error messages with touched state. For large forms, VeeValidate with a schema library such as Zod for declarative, reusable rules.' },
    { level: 'intermediate', q: 'Where should server data live in a Vue app?', a: 'In a server-state cache like TanStack Vue Query, which handles caching, refetching and invalidation. Keep client-only state (UI, drafts) in refs or Pinia.' },
  ],
  'styling-animation': [
    { level: 'basic', q: 'How does <style scoped> work?', a: 'Vue adds a unique data attribute to the component\'s elements and rewrites the CSS selectors to include it, so styles only apply inside that component. :deep() reaches into child components.' },
    { level: 'intermediate', q: 'How do Vue transitions work?', a: '<Transition> applies classes at each stage (v-enter-from, v-enter-active, v-enter-to, and the leave equivalents) when its child appears or disappears, so CSS can animate entering and leaving. <TransitionGroup> does it for lists, including move animations.' },
  ],
  'advanced-components': [
    { level: 'intermediate', q: 'What does <KeepAlive> do?', a: 'It caches inactive dynamic components instead of destroying them, preserving their state when you switch away and back. include/exclude/max control what is cached.' },
    { level: 'intermediate', q: 'What is <Teleport> used for?', a: 'Rendering part of a component\'s template into another DOM location (often body), for modals and toasts that must escape overflow or z-index, while staying logically inside the component.' },
    { level: 'advanced', q: 'When would you write a custom directive?', a: 'For low-level DOM behavior that is reused across elements: v-focus, v-click-outside, lazy-loading images, tooltips. Directives have hooks like mounted, updated and unmounted.' },
    { level: 'advanced', q: 'When are render functions useful?', a: 'When template syntax is limiting: highly dynamic structures, choosing the tag at runtime, or building component libraries. They use h() to create virtual DOM nodes with full JavaScript.' },
  ],
  'component-deep-dive': [
    { level: 'intermediate', q: 'What are fallthrough attributes?', a: 'Attributes and listeners passed to a component but not declared as props or emits (class, style, id, @click). They are applied to the root element automatically, or anywhere with v-bind="$attrs" and inheritAttrs: false.' },
    { level: 'intermediate', q: 'What does defineExpose do?', a: '<script setup> components are closed by default. defineExpose chooses which properties and methods a parent can access through a template ref, for imperative actions like focus() or reset().' },
    { level: 'advanced', q: 'How do you write a Vue plugin?', a: 'An object with install(app, options) that registers global components or directives, provides services with app.provide, or adds configuration. Install it with app.use(plugin, options).' },
  ],
  'errors-auth-api': [
    { level: 'intermediate', q: 'How do you handle errors in Vue components?', a: 'onErrorCaptured in a parent catches errors from descendants (return false to stop propagation) to show a fallback. app.config.errorHandler catches anything unhandled for logging. Use try/catch for async code.' },
    { level: 'intermediate', q: 'Describe a typical authentication flow in a Vue app.', a: 'An API client sends credentials and receives an httpOnly session cookie; a Pinia auth store holds the user and restores the session on startup (/me); a router.beforeEach guard redirects unauthenticated users to login with a redirect query.' },
    { level: 'advanced', q: 'How do you avoid duplicate WebSocket connections in a composable?', a: 'Create the socket inside watchEffect (or watch) and close it in onWatcherCleanup/onUnmounted, so changing the room or unmounting the component always closes the previous connection.' },
  ],
  'a11y-i18n': [
    { level: 'intermediate', q: 'How do you make a Vue app accessible?', a: 'Use semantic HTML, label every input (useId for ids), manage focus for dialogs and route changes, announce updates with aria-live, support the keyboard, and check with eslint-plugin-vuejs-accessibility and axe.' },
    { level: 'intermediate', q: 'How does vue-i18n handle plurals?', a: 'Messages define plural forms separated by |, and t(key, count) picks the right form for the current locale. Numbers and dates are formatted with n() and d(), based on Intl.' },
  ],
  'typescript-testing': [
    { level: 'intermediate', q: 'How do you type props and emits with <script setup lang="ts">?', a: 'defineProps<{ title: string; count?: number }>() with withDefaults for defaults, and defineEmits<{ change: [value: number] }>() to type each event and its arguments.' },
    { level: 'intermediate', q: 'How do you test a Vue component?', a: 'With Vitest and Vue Test Utils: mount the component with props, trigger events (await trigger("click") because DOM updates are async), and assert on the rendered text and emitted events.' },
    { level: 'intermediate', q: 'Why use vue-tsc instead of tsc?', a: 'Plain tsc does not understand .vue files. vue-tsc type-checks scripts and templates of Single File Components and is used in CI with --noEmit.' },
  ],
  performance: [
    { level: 'intermediate', q: 'When would you use shallowRef?', a: 'For large or immutable data (big lists, third-party instances) where deep reactivity is unnecessary. Only replacing .value triggers updates, avoiding the cost of deep proxies.' },
    { level: 'intermediate', q: 'What are v-once and v-memo?', a: 'v-once renders content once and never updates it. v-memo="[deps]" skips re-rendering a subtree (often list items) unless one of the listed dependencies changes.' },
    { level: 'intermediate', q: 'How do you reduce the bundle size of a Vue app?', a: 'Lazy-load routes and heavy components with dynamic imports, import only what you use from libraries, remove unused dependencies and inspect the bundle with a visualizer.' },
  ],
  internals: [
    { level: 'advanced', q: 'What makes Vue\'s virtual DOM "compiler-informed"?', a: 'The template compiler analyzes templates at build time: static nodes are hoisted and never diffed, dynamic nodes get patch flags describing what can change, and blocks track only dynamic children, so updates skip most of the tree.' },
    { level: 'advanced', q: 'What do the watcher flush options mean?', a: 'pre (default) runs before the component re-renders, post runs after the DOM update (to access the new DOM), and sync runs immediately on every change (rarely needed, can be costly).' },
    { level: 'advanced', q: 'What is an effect scope?', a: 'A container for reactive effects (computed, watchers) created inside it, so they can all be stopped together with scope.stop(). Components create one automatically, which is why watchers stop on unmount.' },
  ],
  'options-api': [
    { level: 'intermediate', q: 'Compare the Options API and the Composition API.', a: 'The Options API organizes code by option type (data, methods, computed) and uses this. The Composition API organizes code by feature, enables reuse through composables and has better TypeScript support. Both are supported in Vue 3.' },
    { level: 'intermediate', q: 'What are the main changes from Vue 2 to Vue 3?', a: 'createApp instead of new Vue, Proxy-based reactivity, the Composition API, multiple root nodes (fragments), Teleport and Suspense, v-model changes on components, removal of filters and the event bus, and Pinia and Vite as the new standards.' },
    { level: 'advanced', q: 'How would you migrate a large Vue 2 app?', a: 'Upgrade dependencies, run the app with the @vue/compat migration build to surface deprecation warnings, fix them module by module, replace Vuex with Pinia and mixins with composables gradually, then remove the compat build.' },
  ],
  nuxt: [
    { level: 'intermediate', q: 'What does Nuxt add on top of Vue?', a: 'File-based routing, server-side rendering and static generation, auto-imports, server API routes, SEO helpers, useFetch for SSR-friendly data fetching and an easy deployment story.' },
    { level: 'intermediate', q: 'What is hydration?', a: 'After the server sends rendered HTML, the client-side Vue app takes it over by attaching event listeners and reactivity to the existing markup instead of re-creating it. Mismatches between server and client output cause hydration warnings.' },
    { level: 'advanced', q: 'Why is a module-level ref dangerous in SSR?', a: 'On the server, modules are shared across all requests, so a top-level ref would leak one user\'s data to others. Use useState (per request) or Pinia for shared state.' },
  ],
  deploy: [
    { level: 'basic', q: 'How do you use environment variables in a Vite + Vue app?', a: 'Define VITE_-prefixed variables in .env files and read them with import.meta.env.VITE_NAME. They are embedded into the client bundle, so they are public; never store secrets there.' },
    { level: 'intermediate', q: 'Why might a deployed Vue SPA show 404 on refresh?', a: 'With history mode, the server receives /courses/vue and has no such file. Configure a fallback that serves index.html for all routes so Vue Router can handle them.' },
  ],
  projects: [
    { level: 'intermediate', q: 'How do you organize a Vue project?', a: 'views for routes, components split into generic (Base*) and feature components, composables for reusable logic, stores for shared state, services for API calls, following the official style guide and multi-word component names.' },
    { level: 'intermediate', q: 'Why use watch with { deep: true } when saving a list to localStorage?', a: 'A shallow watcher only fires when the array is replaced. deep: true also reacts to changes inside items (toggling done, editing text), so every change is persisted.' },
  ],
  interview: [
    { level: 'intermediate', q: 'What is the purpose of the key attribute in Vue?', a: 'It gives list items a stable identity so Vue can reuse and move the right elements, and changing a component\'s key forces Vue to recreate it with fresh state.' },
    { level: 'advanced', q: 'Live task: build a toggleable accordion where only one panel is open. What do you consider?', a: 'Keep the open index in a ref, toggle it on click, use aria-expanded and aria-controls with matching ids, render panels with v-show for cheap toggling, and consider a prop to allow multiple open panels.' },
    { level: 'intermediate', q: 'How would you explain Vue reactivity to a junior developer?', a: 'Vue watches the data your template and computed values read. When you change that data, Vue automatically re-runs only the parts that used it, so you just change values instead of manually updating the page.' },
  ],
};
