// React interview questions, grouped by chapter id (see src/courses/index.js).

export default {
  'getting-started': [
    { level: 'basic', q: 'What is React and why is it popular?', a: 'A JavaScript library for building user interfaces from reusable components. It is declarative (describe the UI for the current state), has a huge ecosystem, and the same model works on web and mobile (React Native).' },
    { level: 'basic', q: 'What is JSX?', a: 'A syntax extension that lets you write HTML-like markup in JavaScript. It compiles to function calls (React.createElement or the jsx runtime). Differences from HTML: className, htmlFor, camelCase attributes, closing every tag and expressions in { }.' },
    { level: 'intermediate', q: 'What is the virtual DOM?', a: 'A lightweight JavaScript description of the UI. When state changes, React renders a new description, compares it with the previous one (reconciliation) and applies only the differences to the real DOM.' },
    { level: 'intermediate', q: 'Why must components be pure while rendering?', a: 'React may render a component several times, pause or discard a render (concurrent features, StrictMode). Rendering must only compute JSX from props and state, without side effects or mutating outside values; side effects belong in event handlers or effects.' },
  ],
  'components-props': [
    { level: 'basic', q: 'What is the difference between props and state?', a: 'Props are inputs passed from a parent and are read-only for the child. State is data owned by a component that can change over time; updating it re-renders the component.' },
    { level: 'basic', q: 'Why do list items need keys?', a: 'Keys identify items across renders so React can match, move, add or remove the right elements. Use stable unique ids; array indexes cause bugs (lost input state, wrong items updated) when the list is reordered or filtered.' },
    { level: 'intermediate', q: 'What is the children prop?', a: 'The content placed between a component\'s opening and closing tags. It enables composition: wrappers like Card, Modal and Layout render whatever children they receive.' },
    { level: 'intermediate', q: 'What is "lifting state up"?', a: 'Moving state to the closest common parent of the components that need it, then passing the value down as props and change functions as callbacks. It keeps a single source of truth.' },
  ],
  'state-events': [
    { level: 'basic', q: 'Why should you not mutate state directly?', a: 'React detects changes by comparing references. Mutating an object or array keeps the same reference, so React may not re-render, and you break features that rely on previous values. Always create new objects/arrays with the change.' },
    { level: 'intermediate', q: 'Why use the updater form setCount(c => c + 1)?', a: 'State is a snapshot for each render. Several setCount(count + 1) calls in one event all use the same old value. The updater function receives the latest queued state, so each update builds on the previous one.' },
    { level: 'intermediate', q: 'What is the difference between controlled and uncontrolled inputs?', a: 'Controlled: value comes from React state and changes go through onChange, giving full control (validation, formatting). Uncontrolled: the DOM keeps the value and you read it with a ref or FormData when needed.' },
    { level: 'intermediate', q: 'Is setState synchronous?', a: 'No. Calling a setter schedules an update; the new value is available on the next render, not on the next line. React batches multiple updates into one render.' },
  ],
  effects: [
    { level: 'basic', q: 'What is useEffect for?', a: 'Synchronizing a component with something outside React: fetching data, subscriptions, timers, browser APIs, third-party widgets. It runs after the render is committed to the screen.' },
    { level: 'intermediate', q: 'Explain the dependency array.', a: 'Omitted: the effect runs after every render. []: only after the first render. [a, b]: after the first render and whenever a or b changes. Every reactive value used inside should be listed.' },
    { level: 'intermediate', q: 'When does the cleanup function run?', a: 'Before the effect runs again (when dependencies change) and when the component unmounts. Use it to clear timers, remove listeners, abort requests and close connections.' },
    { level: 'advanced', q: 'Why does an effect run twice in development?', a: 'StrictMode intentionally mounts, unmounts and remounts components in development to reveal effects that are missing a cleanup. It does not happen in production.' },
    { level: 'advanced', q: 'Name cases where you do not need an effect.', a: 'Computing values from props or state (calculate during render), responding to user events (do it in the handler), resetting state when a prop changes (use a key), and expensive calculations (useMemo).' },
  ],
  hooks: [
    { level: 'basic', q: 'What are the rules of hooks?', a: 'Call hooks only at the top level of a component or custom hook (not in conditions, loops or nested functions), and only from React functions. React relies on the call order being the same on every render.' },
    { level: 'intermediate', q: 'What is the difference between useMemo and useCallback?', a: 'useMemo caches a computed value; useCallback caches a function. useCallback(fn, deps) is the same as useMemo(() => fn, deps). Both help when passing stable values to memoized children or effect dependencies.' },
    { level: 'intermediate', q: 'What is the difference between useRef and useState?', a: 'Both persist across renders, but changing ref.current does not trigger a re-render. Use refs for DOM elements and values not shown on screen (timer ids, previous values); use state for anything that affects the UI.' },
    { level: 'intermediate', q: 'When would you choose useReducer over useState?', a: 'When state has several related fields or many ways to change, or the next state depends on complex logic. A reducer centralizes updates in a pure, testable function and components just dispatch actions.' },
    { level: 'advanced', q: 'What is the difference between useEffect and useLayoutEffect?', a: 'useLayoutEffect runs synchronously after DOM changes and before the browser paints, so you can measure layout and update without a visible flicker. It blocks painting, so use it only when necessary.' },
  ],
  'context-state': [
    { level: 'basic', q: 'What problem does context solve?', a: 'Prop drilling: passing a value through many layers of components that do not use it. A provider makes the value available to any descendant through useContext.' },
    { level: 'intermediate', q: 'What are the performance pitfalls of context?', a: 'Every component that reads a context re-renders when its value changes. Passing a new object every render causes needless renders. Split contexts by concern, memoize the value, and use a state library for fast-changing global state.' },
    { level: 'intermediate', q: 'When would you use Redux Toolkit or Zustand instead of context?', a: 'For complex, frequently updated global state shared across many components, where you want selective subscriptions (components re-render only for the slice they use), devtools and middleware.' },
    { level: 'intermediate', q: 'What is the difference between client state and server state?', a: 'Client state is owned by the UI (theme, open modal, form input). Server state lives on a server and is cached locally (lists, profiles); it needs fetching, caching, refetching and invalidation, which libraries like TanStack Query handle.' },
  ],
  styling: [
    { level: 'basic', q: 'How do you apply conditional classes in React?', a: 'Build the className string: className={"tab " + (active ? "active" : "")}, or use a helper like clsx: clsx("tab", { active }).' },
    { level: 'intermediate', q: 'What are CSS Modules?', a: 'CSS files whose class names are scoped to the importing component automatically (styles.button becomes a unique class), preventing collisions between components.' },
    { level: 'intermediate', q: 'When are inline styles appropriate?', a: 'For values computed at runtime, such as a progress bar width or a position from a drag. Static styling belongs in CSS classes, which support media queries, pseudo-classes and caching.' },
  ],
  animation: [
    { level: 'intermediate', q: 'How do you animate a component that is removed from the DOM?', a: 'CSS alone cannot, because the element disappears immediately. Keep it mounted until the animation ends, or use a library like Motion with AnimatePresence, which delays unmounting until the exit animation finishes.' },
    { level: 'intermediate', q: 'How do you keep React animations smooth?', a: 'Animate transform and opacity, avoid state updates on every frame when CSS can do it, use requestAnimationFrame or an animation library for JS-driven motion, and respect prefers-reduced-motion.' },
  ],
  routing: [
    { level: 'basic', q: 'How does client-side routing work?', a: 'The router listens to URL changes via the History API and renders the matching component without a full page reload. <Link> updates the URL; the router re-renders the right route.' },
    { level: 'intermediate', q: 'How do you read URL parameters and query strings in React Router?', a: 'useParams() for dynamic segments like :courseId, and useSearchParams() for the query string (?tab=quiz). useNavigate() changes the URL from code.' },
    { level: 'intermediate', q: 'How do you protect routes?', a: 'Wrap protected routes in a component that checks authentication and returns <Navigate to="/login" /> (remembering the original location) when the user is not logged in. The server must still enforce permissions.' },
    { level: 'intermediate', q: 'What are nested routes and layouts?', a: 'Child routes render inside a parent route\'s <Outlet />, so pages share a layout (header, sidebar) that stays mounted while the child page changes.' },
  ],
  'forms-data': [
    { level: 'intermediate', q: 'How do you handle forms in large React apps?', a: 'A form library like React Hook Form (uncontrolled inputs, few re-renders) with a schema validator like Zod for consistent rules shared with the backend, plus clear touched/submit error display.' },
    { level: 'intermediate', q: 'What does TanStack Query give you over fetch in useEffect?', a: 'Caching by query key, deduplicated requests, background refetching, retries, pagination helpers, loading/error states, mutations with invalidation and optimistic updates, without race-condition bugs.' },
    { level: 'advanced', q: 'What is an optimistic update?', a: 'Updating the UI immediately as if a request succeeded, then rolling back if it fails. It makes apps feel instant, especially on slow mobile networks.' },
  ],
  'auth-api': [
    { level: 'intermediate', q: 'Where should you store authentication tokens?', a: 'Preferably in httpOnly, Secure, SameSite cookies set by the server, so JavaScript (and XSS) cannot read them. Storing tokens in localStorage is common but exposes them to any injected script.' },
    { level: 'intermediate', q: 'How do you handle an expired access token?', a: 'On a 401 response, call the refresh endpoint once (sharing one refresh promise between concurrent requests), retry the original request, and log the user out if refreshing fails.' },
    { level: 'intermediate', q: 'Why create an API layer instead of calling fetch in components?', a: 'It centralizes base URLs, headers, auth, error handling and response parsing, so components stay simple and changes happen in one place. It also makes mocking in tests easy.' },
    { level: 'advanced', q: 'How would you add real-time updates to a React app?', a: 'Use a WebSocket (or Server-Sent Events) in a custom hook that connects in an effect, updates state with functional updates on each message, reconnects with backoff, and closes in the cleanup.' },
  ],
  performance: [
    { level: 'intermediate', q: 'What does React.memo do?', a: 'It skips re-rendering a component when its props are shallowly equal to the previous props. It only helps if the props are stable (memoize objects and callbacks passed to it).' },
    { level: 'intermediate', q: 'How do you find performance problems in React?', a: 'Measure with the React DevTools Profiler (which components render, how often and why), enable highlight updates, and test on a real mid-range phone. Optimize what the measurements show.' },
    { level: 'intermediate', q: 'What is code splitting?', a: 'Loading parts of the app only when needed with lazy(() => import("./Page")) and <Suspense>. Splitting by route gives the biggest reduction in initial bundle size.' },
    { level: 'advanced', q: 'What do useTransition and useDeferredValue do?', a: 'They mark updates as non-urgent so urgent ones (typing, clicks) stay responsive. useTransition wraps a state update; useDeferredValue gives a lagging copy of a value for expensive rendering.' },
    { level: 'advanced', q: 'How do you render a list of 10,000 items efficiently?', a: 'Virtualize it: render only the rows visible in the viewport (TanStack Virtual, react-window), keep rows memoized with stable keys, and paginate or filter on the server when possible.' },
  ],
  internals: [
    { level: 'intermediate', q: 'How does React decide whether to keep a component\'s state?', a: 'State is tied to a component\'s position in the tree. If the same component type renders at the same position (with the same key), state is preserved; a different type or key at that position resets it.' },
    { level: 'intermediate', q: 'How can you reset a component\'s state when a prop changes?', a: 'Give it a key based on that prop (<Profile key={userId} />). A new key makes React create a fresh instance, which is simpler and less buggy than an effect that resets fields.' },
    { level: 'advanced', q: 'What is React Fiber?', a: 'The reconciliation engine introduced in React 16. Work is split into small units (fibers) so React can pause, prioritize, resume or abandon rendering, which enables concurrent features like transitions and Suspense.' },
    { level: 'advanced', q: 'What is automatic batching?', a: 'Since React 18, multiple state updates in the same event, timeout or promise are combined into a single re-render. flushSync can force an immediate update when really needed.' },
  ],
  patterns: [
    { level: 'intermediate', q: 'What is an error boundary?', a: 'A class component with getDerivedStateFromError / componentDidCatch that catches errors thrown while rendering its children and shows a fallback UI. It does not catch errors in event handlers or async code.' },
    { level: 'intermediate', q: 'What are portals used for?', a: 'createPortal renders children into a different DOM node (often document.body) while keeping React context and event bubbling. Modals, tooltips and toasts use it to escape overflow and stacking contexts.' },
    { level: 'advanced', q: 'What are compound components?', a: 'A set of components that work together and share implicit state through context, like <Tabs>, <Tabs.Tab> and <Tabs.Panel>. They give a flexible, readable API, as in Radix UI.' },
    { level: 'advanced', q: 'What are HOCs and render props, and what replaced them?', a: 'A higher-order component wraps a component to add behavior; a render prop passes a function that returns UI. Both share logic but cause wrapper nesting. Custom hooks replaced most uses.' },
  ],
  'a11y-i18n': [
    { level: 'intermediate', q: 'How do you manage focus in a single-page app?', a: 'Move focus into dialogs when they open and back to the trigger when they close, trap focus inside modals, move focus to the main heading after route changes, and never remove visible focus outlines.' },
    { level: 'intermediate', q: 'What is useId for?', a: 'Generating unique, stable ids for accessibility attributes (htmlFor, aria-labelledby, aria-describedby) that match between server and client rendering. It should not be used for list keys.' },
    { level: 'intermediate', q: 'How do you internationalize a React app?', a: 'Use a library like react-i18next: keep all text in translation files keyed by id, translate whole sentences with placeholders, let the library handle plurals, and format numbers and dates with Intl.' },
  ],
  'typescript-testing': [
    { level: 'intermediate', q: 'How do you type props in TypeScript?', a: 'Declare a type or interface for the props and annotate the component parameter: function Card({ title }: CardProps). Use ?: for optional props, unions for limited values and React.ReactNode for children.' },
    { level: 'intermediate', q: 'What is the philosophy of React Testing Library?', a: 'Test components the way users use them: find elements by role, label or text, interact with userEvent, and assert on what appears. Avoid testing implementation details like state or internal methods.' },
    { level: 'advanced', q: 'How do you test a component that fetches data?', a: 'Mock the network with MSW so the component uses its real fetch code, render it, assert on the loading state, then await findBy... for the data, and add a test for the error response.' },
    { level: 'advanced', q: 'What are discriminated unions useful for in React?', a: 'Modeling states that cannot overlap, like { status: "loading" } | { status: "error"; error } | { status: "success"; data }. TypeScript then only allows data access in the success branch, preventing impossible states.' },
  ],
  'modern-react': [
    { level: 'intermediate', q: 'What are React Server Components?', a: 'Components that run only on the server. They can access databases and secrets directly, and send rendered UI to the browser without shipping their JavaScript. Interactive parts are Client Components marked "use client".' },
    { level: 'intermediate', q: 'What are Actions in React 19?', a: 'Async functions passed to form action props or startTransition. React tracks their pending state, errors and results; hooks like useActionState, useFormStatus and useOptimistic build on them.' },
    { level: 'advanced', q: 'How is the use() API different from other hooks?', a: 'use() reads a promise or a context and can be called conditionally. Reading a pending promise suspends the component until it resolves, showing the nearest Suspense fallback.' },
  ],
  nextjs: [
    { level: 'intermediate', q: 'Why use Next.js instead of plain React?', a: 'File-based routing, server rendering and static generation for fast loads and SEO, Server Components, API routes and Server Actions, image and font optimization, and simple deployment.' },
    { level: 'intermediate', q: 'What is the difference between SSR, SSG and ISR?', a: 'SSR renders on every request (fresh, personalized). SSG renders once at build time (fastest). ISR serves static pages but regenerates them in the background after a revalidation interval.' },
    { level: 'advanced', q: 'What must you always do inside a Server Action?', a: 'Treat it as a public endpoint: authenticate the user, check permissions and validate all input on the server, then revalidate affected paths or tags.' },
    { level: 'intermediate', q: 'What do loading.jsx and error.jsx do in the App Router?', a: 'loading.jsx is shown automatically while a route segment loads (a Suspense boundary). error.jsx is an automatic error boundary for that segment, with a reset function to try again.' },
  ],
  deploy: [
    { level: 'basic', q: 'What is the difference between a development and a production build?', a: 'Development includes warnings, readable code and fast refresh. Production is minified, tree-shaken, split into hashed chunks and strips development-only checks, so it is much smaller and faster.' },
    { level: 'intermediate', q: 'Why does refreshing /courses/html on a deployed SPA sometimes return 404?', a: 'The server looks for a file at that path. Single-page apps need a rewrite rule that serves index.html for all routes so the client-side router can handle the URL.' },
    { level: 'intermediate', q: 'What should a CI pipeline for a React app run?', a: 'Install with npm ci, lint, type-check, run unit and component tests, build the app, and optionally run E2E tests against a preview deployment. A failing step blocks the merge.' },
  ],
  projects: [
    { level: 'intermediate', q: 'How would you structure a large React project?', a: 'Group by feature (features/courses, features/auth) with shared components, hooks and an API layer; keep components small; separate server state (query library) from client state; and enforce conventions with ESLint and TypeScript.' },
    { level: 'intermediate', q: 'How do you avoid race conditions in a search-as-you-type feature?', a: 'Debounce the input, abort the previous request with AbortController in the effect cleanup (or ignore stale responses), and show loading, empty and error states.' },
    { level: 'intermediate', q: 'Why derive totals instead of storing them in state?', a: 'Values computed from existing state (cart total, item count, filtered lists) can never get out of sync if they are calculated during render. Storing them separately creates duplicate sources of truth.' },
  ],
  interview: [
    { level: 'intermediate', q: 'Explain the React component lifecycle with hooks.', a: 'Mount: the component renders, the DOM updates, then effects run. Update: state/props change, it re-renders, cleanups of changed effects run, then the effects run again. Unmount: all cleanups run.' },
    { level: 'intermediate', q: 'How would you build a reusable modal component?', a: 'Render it in a portal, control open state from the parent, close on Escape and backdrop click, move focus into it and restore focus on close, trap focus, add role="dialog" and aria-modal, and prevent background scroll.' },
    { level: 'advanced', q: 'Live task: build a counter with a minimum and maximum. What do you consider?', a: 'Use useState with functional updates, disable buttons at the limits, accept min/max/step as props with defaults, add accessible labels, and consider extracting a useCounter hook for reuse and testing.', code: `import { useState } from 'react';

export default function App({ min = 0, max = 5 }) {
  const [n, setN] = useState(min);
  return (
    <div>
      <button aria-label="Decrease" disabled={n <= min} onClick={() => setN(c => c - 1)}>−</button>
      <span style={{ margin: '0 12px' }}>{n}</span>
      <button aria-label="Increase" disabled={n >= max} onClick={() => setN(c => c + 1)}>+</button>
    </div>
  );
}`, lang: 'jsx', tryIt: true },
  ],
};
