// React chapter: Authentication and APIs. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'auth-api',
  title: 'Authentication and APIs',
  description: 'API clients, login flows, tokens and real-time data',
  icon: 'lock',
  lessons: [
    {
      id: 'react-api-layer',
      title: 'Building an API Layer',
      blocks: [
        { type: 'text', value: 'Scattering fetch calls through components makes apps hard to change. Professional apps put all network code in one place: a small client that sets the base URL, headers and error handling, plus one function per endpoint.' },
        { type: 'code', lang: 'jsx', value: `// src/lib/api.js
const BASE_URL = import.meta.env.VITE_API_URL;   // from .env, different per environment

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(BASE_URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.message ?? res.statusText);
  return data;
}

export const api = {
  getCourses: () => request('/courses'),
  getCourse: id => request('/courses/' + id),
  enroll: (id, token) => request('/courses/' + id + '/enroll', { method: 'POST', token }),
};` },
        { type: 'code', lang: 'text', value: `# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.codenest.app` },
        { type: 'note', value: 'Only variables starting with VITE_ are exposed to the browser, and everything in them is public. Never put secret keys there.' },
      ],
    },
    {
      id: 'react-auth-flow',
      title: 'Login Flow with an Auth Context',
      blocks: [
        { type: 'text', value: 'An auth provider keeps the current user, exposes login and logout, and restores the session on startup. Every component reads it through a useAuth hook.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Fake server for the demo
const fakeApi = {
  login: (email, password) => new Promise((resolve, reject) => setTimeout(() =>
    password === 'secret123' ? resolve({ user: { name: email.split('@')[0], email } }) : reject(new Error('Wrong email or password')), 700)),
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    const { user } = await fakeApi.login(email, password);
    setUser(user);
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    try {
      await login(data.get('email'), data.get('password'));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" defaultValue="nadia@example.com" />
      <input name="password" type="password" placeholder="Try: secret123" />
      <button disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </form>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  return <div><h3>Welcome, {user.name}!</h3><button onClick={logout}>Log out</button></div>;
}

function Screen() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LoginForm />;
}

export default function App() {
  return <AuthProvider><Screen /></AuthProvider>;
}` },
        { type: 'heading', value: 'Where to keep the token' },
        { type: 'list', items: [
          'Best: an httpOnly cookie set by the server. JavaScript cannot read it, so XSS cannot steal it.',
          'Common but riskier: memory or localStorage with a short-lived access token.',
          'On app start, call /me to check the session and restore the user.',
        ] },
      ],
    },
    {
      id: 'react-token-refresh',
      title: 'Expired Tokens and Refreshing',
      blocks: [
        { type: 'text', value: 'Access tokens expire quickly (often 15 minutes) for safety. When a request returns 401, the client asks for a new access token with a long-lived refresh token, then retries the original request once. Concurrent requests must share a single refresh call.' },
        { type: 'code', lang: 'jsx', value: `let refreshPromise = null;

async function refreshAccessToken() {
  // Only one refresh at a time, even if 5 requests fail together
  refreshPromise ??= fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
    .then(res => {
      if (!res.ok) throw new Error('Session expired');
      return res.json();
    })
    .finally(() => { refreshPromise = null; });
  return refreshPromise;
}

export async function authFetch(url, options = {}) {
  let res = await fetch(url, { ...options, credentials: 'include' });
  if (res.status === 401) {
    try {
      await refreshAccessToken();                 // new cookie set by the server
      res = await fetch(url, { ...options, credentials: 'include' }); // retry once
    } catch {
      window.location.href = '/login';             // refresh failed: log out
    }
  }
  return res;
}` },
        { type: 'note', value: 'With axios, the same logic lives in a response interceptor. The idea is identical: catch 401, refresh once, retry.' },
      ],
    },
    {
      id: 'react-websockets',
      title: 'Real-time Data with WebSockets',
      blocks: [
        { type: 'text', value: 'Chats, live scores and notifications need the server to push data instantly. A WebSocket keeps a connection open in both directions. Wrap it in a custom hook that connects on mount and closes on unmount.' },
        { type: 'code', lang: 'jsx', value: `import { useEffect, useRef, useState } from 'react';

export function useChat(roomId) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('connecting');
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('wss://chat.example.com/rooms/' + roomId);
    socketRef.current = socket;

    socket.onopen = () => setStatus('online');
    socket.onclose = () => setStatus('offline');
    socket.onmessage = event => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);     // updater: no stale state
    };

    return () => socket.close();                    // cleanup when the room changes
  }, [roomId]);

  const send = text => socketRef.current?.send(JSON.stringify({ text }));
  return { messages, status, send };
}` },
        { type: 'list', items: [
          'Reconnect with backoff when the connection drops (mobile networks drop often).',
          'Libraries such as Socket.IO add rooms, reconnection and fallbacks.',
          'For simple one-way updates, Server-Sent Events (EventSource) are easier.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'auth-api', q: 'Why centralize fetch calls in an API layer?', options: ['It is required by React', 'One place for base URL, headers and error handling', 'It makes requests faster', 'To avoid JSON'], answer: 1, explain: 'Changing an endpoint or header means editing one file.' },
    { chapterId: 'auth-api', q: 'Which Vite environment variables reach the browser?', options: ['All of them', 'Only ones starting with VITE_', 'None', 'Only ones in .env.production'], answer: 1, explain: 'And they are public: never store secrets there.' },
    { chapterId: 'auth-api', q: 'What is the safest place for an auth token in the browser?', options: ['localStorage', 'A global variable', 'An httpOnly cookie set by the server', 'The URL'], answer: 2, explain: 'JavaScript cannot read httpOnly cookies, so XSS cannot steal them.' },
    { chapterId: 'auth-api', q: 'What should happen when a request returns 401 because the access token expired?', options: ['Show an error forever', 'Refresh the token once and retry the request', 'Reload the app', 'Ignore it'], answer: 1, explain: 'If refreshing fails, log the user out.' },
  ],
};
