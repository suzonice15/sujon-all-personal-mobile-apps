// React chapter: Routing. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'routing',
  title: 'Routing',
  description: 'Multiple pages with React Router',
  icon: 'alt-route',
  lessons: [
    {
      id: 'react-router-basics',
      title: 'React Router Basics',
      blocks: [
        { type: 'text', value: 'A React app is one HTML page, but users expect real URLs: /, /courses, /courses/html. React Router maps URLs to components and changes pages without reloading.' },
        { type: 'code', lang: 'text', value: `npm install react-router` },
        { type: 'code', lang: 'jsx', value: `// main.jsx
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Courses from './pages/Courses';
import NotFound from './pages/NotFound';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);` },
        { type: 'code', lang: 'jsx', value: `import { Link, NavLink, useNavigate } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <Link to="/">Home</Link>
      <NavLink to="/courses" className={({ isActive }) => (isActive ? 'active' : '')}>Courses</NavLink>
      <button onClick={() => navigate('/courses')}>Go from code</button>
    </nav>
  );
}` },
        { type: 'note', value: 'Use <Link>, not <a href>, for pages inside your app. A plain link reloads the whole page and loses all state.' },
      ],
    },
    {
      id: 'react-router-params',
      title: 'URL Parameters and Query Strings',
      blocks: [
        { type: 'code', lang: 'jsx', value: `<Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />` },
        { type: 'code', lang: 'jsx', value: `import { useParams, useSearchParams } from 'react-router';

function Lesson() {
  const { courseId, lessonId } = useParams();         // /courses/html/lessons/intro
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'read';       // ?tab=quiz

  return (
    <div>
      <h1>{courseId} / {lessonId}</h1>
      <button onClick={() => setSearchParams({ tab: 'quiz' })}>Open quiz tab</button>
      {tab === 'quiz' ? <Quiz /> : <Content />}
    </div>
  );
}` },
        { type: 'note', value: 'Put things users may want to share or bookmark in the URL: the current item, filters, search text, page number.' },
      ],
    },
    {
      id: 'react-router-layouts',
      title: 'Nested Routes and Layouts',
      blocks: [
        { type: 'text', value: 'Nested routes share a layout. The parent renders the common parts (header, sidebar) and an <Outlet /> where the child page appears.' },
        { type: 'code', lang: 'jsx', value: `<Routes>
  <Route element={<AppLayout />}>
    <Route index element={<Home />} />
    <Route path="courses" element={<Courses />} />
    <Route path="courses/:id" element={<CourseDetail />} />
  </Route>
  <Route path="login" element={<Login />} />
</Routes>

function AppLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}` },
      ],
    },
    {
      id: 'react-protected-routes',
      title: 'Protected Routes',
      blocks: [
        { type: 'text', value: 'Some pages need a logged-in user. A small wrapper component checks authentication and redirects to the login page, remembering where the user wanted to go.' },
        { type: 'code', lang: 'jsx', value: `import { Navigate, Outlet, useLocation } from 'react-router';

function RequireAuth() {
  const { user } = useAuth();          // your own auth context
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

<Routes>
  <Route path="/login" element={<Login />} />
  <Route element={<RequireAuth />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
</Routes>` },
        { type: 'note', value: 'Hiding a page in the front-end is not security. The server must also check that the user is allowed to get the data.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'routing', q: 'Why use <Link> instead of <a href> inside a React app?', options: ['It looks better', 'It changes pages without a full reload, keeping state', 'It is required by HTML', 'It works offline'], answer: 1, explain: 'Link uses the History API instead of reloading.' },
    { chapterId: 'routing', q: 'Which hook reads :courseId from the URL?', options: ['useLocation', 'useParams', 'useNavigate', 'useRoute'], answer: 1, explain: 'useParams returns the dynamic segments.' },
    { chapterId: 'routing', q: 'Where does a nested child route render inside its layout?', options: ['In <Children />', 'In <Outlet />', 'In <Slot />', 'Anywhere automatically'], answer: 1, explain: 'Outlet marks the spot for the matched child.' },
    { chapterId: 'routing', q: 'Is a protected route enough to secure private data?', options: ['Yes', 'No, the server must also check permissions', 'Only with HTTPS', 'Only in production'], answer: 1, explain: 'Front-end checks can be bypassed.' },
  ],
};
