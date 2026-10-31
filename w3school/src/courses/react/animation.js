// React chapter: Animation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'animation',
  title: 'Animation',
  description: 'Smooth transitions with CSS and Motion',
  icon: 'animation',
  lessons: [
    {
      id: 'react-css-animation',
      title: 'Animating with CSS and State',
      blocks: [
        { type: 'text', value: 'The simplest React animations are CSS transitions driven by state: change a class or style, and CSS animates the difference. No library needed.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

const css = \`
  .drawer { overflow: hidden; max-height: 0; opacity: 0; transition: max-height .35s ease, opacity .35s ease; }
  .drawer.open { max-height: 200px; opacity: 1; }
  .heart { font-size: 32px; border: 0; background: none; transition: transform .15s; }
  .heart:active { transform: scale(1.4); }
  .toast { position: fixed; left: 50%; bottom: 20px; transform: translate(-50%, 100px); background: #0f172a; color: white;
           padding: 10px 16px; border-radius: 10px; transition: transform .3s cubic-bezier(.2,.9,.3,1.3); }
  .toast.show { transform: translate(-50%, 0); }
\`;

export default function App() {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  return (
    <div>
      <style>{css}</style>
      <button onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Show'} details</button>
      <div className={'drawer' + (open ? ' open' : '')}>
        <p>Smoothly revealed with a CSS transition on max-height and opacity.</p>
      </div>
      <button className="heart" onClick={() => setLiked(!liked)}>{liked ? '❤️' : '🤍'}</button>
      <button onClick={showToast}>Show toast</button>
      <div className={'toast' + (toast ? ' show' : '')}>Saved successfully!</div>
    </div>
  );
}` },
        { type: 'note', value: 'CSS cannot animate an element that is removed from the DOM: it disappears instantly. For exit animations, keep it mounted (as above) or use a library.' },
      ],
    },
    {
      id: 'react-motion',
      title: 'Motion (Framer Motion)',
      blocks: [
        { type: 'text', value: 'Motion (formerly Framer Motion) is the most popular React animation library. Replace a tag with motion.div and describe the target state; it handles springs, gestures, layout changes and exit animations.' },
        { type: 'code', lang: 'text', value: `npm install motion` },
        { type: 'code', lang: 'jsx', value: `import { motion, AnimatePresence } from 'motion/react';

function Notifications({ items, onDismiss }) {
  return (
    <ul>
      <AnimatePresence>
        {items.map(item => (
          <motion.li
            key={item.id}
            layout                                  // animates position when the list changes
            initial={{ opacity: 0, y: -20 }}        // start
            animate={{ opacity: 1, y: 0 }}          // end
            exit={{ opacity: 0, x: 100 }}           // when removed
            whileTap={{ scale: 0.95 }}
            onClick={() => onDismiss(item.id)}
          >
            {item.text}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}` },
        { type: 'list', items: [
          'AnimatePresence keeps removed children mounted until their exit animation finishes.',
          'layout animates size and position changes automatically (great for reordering lists).',
          'whileHover, whileTap and drag add gesture animations in one prop.',
          'Respect users: check prefers-reduced-motion (Motion\'s useReducedMotion hook).',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'animation', q: 'Why can a plain CSS transition not animate an element being removed?', options: ['CSS is too slow', 'The element leaves the DOM instantly', 'React blocks CSS', 'It only works with ids'], answer: 1, explain: 'Exit animations need the element to stay mounted until they finish.' },
    { chapterId: 'animation', q: 'Which Motion component enables exit animations?', options: ['motion.exit', 'AnimatePresence', 'Transition', 'Suspense'], answer: 1, explain: 'It delays unmounting until the exit animation completes.' },
    { chapterId: 'animation', q: 'What does the layout prop in Motion do?', options: ['Sets CSS Grid', 'Animates position and size changes automatically', 'Adds a header', 'Disables animation'], answer: 1, explain: 'Elements smoothly move to their new layout.' },
  ],
};
