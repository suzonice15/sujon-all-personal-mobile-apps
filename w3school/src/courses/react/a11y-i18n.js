// React chapter: Accessibility and Internationalization. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'a11y-i18n',
  title: 'Accessibility and i18n',
  description: 'Apps everyone can use, in every language',
  icon: 'accessibility-new',
  lessons: [
    {
      id: 'react-focus-management',
      title: 'Focus Management',
      blocks: [
        { type: 'text', value: 'In a single-page app, content changes without a page load, so keyboard and screen reader users can get lost. Move focus deliberately: into a dialog when it opens, back to the trigger when it closes, and to the new heading after navigation.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useEffect, useRef, useState } from 'react';

function Dialog({ title, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;      // remember what had focus
    dialogRef.current.focus();                    // move focus into the dialog
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus();                          // give focus back on close
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="dlg-title" tabIndex={-1} ref={dialogRef}
         style={{ border: '2px solid #0f766e', padding: 14, borderRadius: 10, marginTop: 10 }}>
      <h3 id="dlg-title">{title}</h3>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Delete account</button>
      {open && (
        <Dialog title="Are you sure?" onClose={() => setOpen(false)}>
          <p>This cannot be undone. Press Esc to cancel.</p>
        </Dialog>
      )}
    </div>
  );
}` },
        { type: 'note', value: 'Production dialogs also trap focus inside (Tab cycles within the dialog). The native <dialog> element or libraries like Radix UI do this for you.' },
      ],
    },
    {
      id: 'react-aria-live',
      title: 'ARIA in Components and Live Regions',
      blocks: [
        { type: 'text', value: 'Custom widgets need the right roles and states so assistive technology understands them. Changes that appear without focus moving, such as "Saved" or "3 results", should be announced with a live region.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useId, useState } from 'react';

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();                 // unique id, safe with server rendering
  return (
    <div>
      <button aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
        {open ? '▾' : '▸'} {title}
      </button>
      <div id={panelId} hidden={!open}>{children}</div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const results = ['HTML', 'CSS', 'JavaScript', 'React'].filter(c => c.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <Accordion title="What is CodeNest?"><p>A free coding school in your pocket.</p></Accordion>
      <label htmlFor="q">Search courses</label>
      <input id="q" value={query} onChange={e => setQuery(e.target.value)} />
      <p aria-live="polite">{results.length} results</p>
      <ul>{results.map(r => <li key={r}>{r}</li>)}</ul>
    </div>
  );
}` },
        { type: 'list', items: [
          'useId creates ids for aria-controls, aria-labelledby and label htmlFor.',
          'aria-expanded tells screen readers whether the section is open.',
          'aria-live="polite" announces changes when the user is idle.',
        ] },
      ],
    },
    {
      id: 'react-a11y-testing',
      title: 'Testing Accessibility',
      blocks: [
        { type: 'list', items: [
          'eslint-plugin-jsx-a11y: flags missing alt text, clickable divs and invalid ARIA while you type.',
          'axe DevTools browser extension: scans a page and lists violations with fixes.',
          'jest-axe or vitest-axe: fail a test when a component has accessibility errors.',
          'Lighthouse in Chrome DevTools: an accessibility score for the whole page.',
          'Manual check: unplug the mouse and use the app with only Tab, Enter, Space and Esc.',
        ] },
        { type: 'code', lang: 'jsx', value: `import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

test('signup form has no accessibility violations', async () => {
  const { container } = render(<SignupForm />);
  expect(await axe(container)).toHaveNoViolations();
});` },
        { type: 'note', value: 'Automated tools catch about a third of problems. Keyboard testing and a quick screen reader check (TalkBack on Android) find the rest.' },
      ],
    },
    {
      id: 'react-i18n',
      title: 'Internationalization (i18n)',
      blocks: [
        { type: 'text', value: 'To support English and Bangla (or any languages), keep all user-facing text in translation files and look it up by key. react-i18next is the most used library.' },
        { type: 'code', lang: 'jsx', value: `// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'bn',
  fallbackLng: 'en',
  resources: {
    en: { translation: { welcome: 'Welcome, {{name}}!', lessons_one: '{{count}} lesson', lessons_other: '{{count}} lessons' } },
    bn: { translation: { welcome: 'স্বাগতম, {{name}}!', lessons_one: '{{count}}টি পাঠ', lessons_other: '{{count}}টি পাঠ' } },
  },
});` },
        { type: 'code', lang: 'jsx', value: `import { useTranslation } from 'react-i18next';

function Header({ user, done }) {
  const { t, i18n } = useTranslation();
  return (
    <header>
      <h1>{t('welcome', { name: user.name })}</h1>
      <p>{t('lessons', { count: done })}</p>
      <button onClick={() => i18n.changeLanguage(i18n.language === 'bn' ? 'en' : 'bn')}>EN / বাংলা</button>
    </header>
  );
}` },
        { type: 'list', items: [
          'Format numbers, dates and currency with Intl (you learned it in the JavaScript course).',
          'Plural rules differ by language; let the library handle count.',
          'Never build sentences by joining translated pieces; word order changes between languages.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'a11y-i18n', q: 'Where should focus go when a dialog closes?', options: ['To the top of the page', 'Back to the element that opened it', 'Nowhere', 'To the browser address bar'], answer: 1, explain: 'Users continue where they were.' },
    { chapterId: 'a11y-i18n', q: 'What is useId for?', options: ['Database ids', 'Generating unique ids for accessibility attributes', 'User ids', 'Keys in lists'], answer: 1, explain: 'Do not use it for list keys.' },
    { chapterId: 'a11y-i18n', q: 'How do you announce "3 results" to screen readers without moving focus?', options: ['alert()', 'An element with aria-live="polite"', 'A title attribute', 'console.log'], answer: 1, explain: 'Live regions announce content changes.' },
    { chapterId: 'a11y-i18n', q: 'Why not build translated sentences by joining pieces?', options: ['It is slower', 'Word order and grammar differ between languages', 'Libraries forbid it', 'It breaks CSS'], answer: 1, explain: 'Translate whole sentences with placeholders.' },
  ],
};
