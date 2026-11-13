// Tailwind CSS interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is utility-first CSS?',
      a: 'Composing small single-purpose classes in the markup instead of writing large component classes.',
      level: 'basic',
    },
    {
      q: 'How are unused classes removed?',
      a: 'Tailwind scans the configured content paths and generates only the classes found there.',
      level: 'basic',
    },
    {
      q: 'Why do dynamic class names fail?',
      a: 'The scanner reads source text, so a class assembled at runtime is not detected. Use complete classes or a safelist.',
      level: 'intermediate',
    },
    {
      q: 'Does Tailwind include components?',
      a: 'No. It provides utilities; you build and own the components.',
      level: 'basic',
    },
  ],
  'utility-first': [
    {
      q: 'What does p-4 mean?',
      a: 'Padding at the 4 step of the spacing scale, which is one rem.',
      level: 'basic',
    },
    {
      q: 'What is a variant such as hover:?',
      a: 'A prefix that applies the utility only in that state.',
      level: 'basic',
    },
    {
      q: 'Why cap reading width?',
      a: 'Long lines are hard to read. max-w-prose keeps a comfortable measure.',
      level: 'basic',
    },
    {
      q: 'Why keep a focus ring?',
      a: 'Keyboard users must see where focus is. Removing the outline without a replacement breaks accessibility.',
      level: 'intermediate',
    },
  ],
  'layout-flex-grid': [
    {
      q: 'Flex versus grid?',
      a: 'Flex is for one-dimensional rows or columns. Grid is for two-dimensional layouts with rows and columns.',
      level: 'basic',
    },
    {
      q: 'Why use gap instead of margins?',
      a: 'Gap adds space between children only, avoiding the last-child margin problem.',
      level: 'basic',
    },
    {
      q: 'What does absolute need?',
      a: 'A positioned ancestor, usually relative, so it positions against that box.',
      level: 'intermediate',
    },
    {
      q: 'How do you align items vertically in flex?',
      a: 'items-center on the flex container.',
      level: 'basic',
    },
  ],
  responsive: [
    {
      q: 'Mobile-first means what in Tailwind?',
      a: 'Base classes apply at all sizes; sm, md and lg variants apply from that width upward.',
      level: 'basic',
    },
    {
      q: 'How do you center a container?',
      a: 'mx-auto with a max-w-* width and horizontal padding.',
      level: 'basic',
    },
    {
      q: 'How do you hide a nav on mobile?',
      a: 'hidden md:flex, so it is hidden below md and shown from md.',
      level: 'basic',
    },
    {
      q: 'Why test intermediate widths?',
      a: 'Layouts often break between the common breakpoints, such as 600px.',
      level: 'intermediate',
    },
  ],
  'components-patterns': [
    {
      q: 'How do you avoid repeating utility lists?',
      a: 'Extract a component that owns the classes and variants.',
      level: 'basic',
    },
    {
      q: 'Why use clsx?',
      a: 'To combine conditional class strings safely without undefined values.',
      level: 'intermediate',
    },
    {
      q: 'Which states should a form input style?',
      a: 'Default, focus, error and disabled.',
      level: 'basic',
    },
    {
      q: 'Why limit hover effects?',
      a: 'Many simultaneous effects feel noisy and distract from the content.',
      level: 'basic',
    },
  ],
  'dark-mode': [
    {
      q: 'Which dark mode strategy allows a user toggle?',
      a: 'class, by toggling the dark class on the html element.',
      level: 'basic',
    },
    {
      q: 'Why read the saved theme early?',
      a: 'To avoid a flash of the light theme before JavaScript applies dark mode.',
      level: 'intermediate',
    },
    {
      q: 'Why are semantic colour tokens useful?',
      a: 'They describe purpose, adapt to themes, and survive a rebrand better than raw shades.',
      level: 'intermediate',
    },
    {
      q: 'Is dark mode just inverted light?',
      a: 'No. Contrast, images and charts need deliberate dark variants.',
      level: 'basic',
    },
  ],
  'config-customization': [
    {
      q: 'Extend versus override the theme?',
      a: 'Extend adds to the defaults. Override replaces them and removes values you may still need.',
      level: 'intermediate',
    },
    {
      q: 'When use arbitrary values?',
      a: 'For genuine one-off needs. If a value repeats, add a token.',
      level: 'basic',
    },
    {
      q: 'What does the typography plugin do?',
      a: 'It adds prose classes for readable long-form content.',
      level: 'basic',
    },
    {
      q: 'How do you keep the build small?',
      a: 'Configure accurate content paths and avoid safelisting classes you do not use.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you structure a Tailwind project?',
      a: 'Reusable components owning the classes, a config with brand tokens, and consistent spacing and radius scales.',
      level: 'intermediate',
    },
    {
      q: 'Tailwind versus Bootstrap?',
      a: 'Tailwind gives utilities and full visual control. Bootstrap gives ready-made components and a recognizable default look.',
      level: 'intermediate',
    },
    {
      q: 'How do you test a Tailwind page?',
      a: 'Three widths, both themes, keyboard focus and real devices.',
      level: 'basic',
    },
    {
      q: 'What is the best first step?',
      a: 'Set up the build and style one card with utilities.',
      level: 'basic',
    },
  ],
};
