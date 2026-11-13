// UI/UX chapter: Design Systems.

export default {
  id: 'design-systems',
  title: 'Design Systems',
  description: 'Tokens, components and documentation',
  icon: 'layers',
  lessons: [
    {
      id: 'ux-design-system',
      title: 'What a design system is',
      blocks: [
        { type: 'text', value: 'A design system is a shared set of tokens, components, patterns and rules that keeps a product consistent. It is both a design file and a code library, kept in sync.' },
        { type: 'list', items: [
          'Tokens: colour, spacing, type, radius, shadow',
          'Components: button, input, card, modal',
          'Patterns: forms, navigation, empty states',
          'Guidelines: when to use what',
          'Versioning and release notes',
        ] },
        { type: 'note', value: 'A design system is a product for the team. If nobody uses it, it is a folder of pretty files.' },
      ],
    },
    {
      id: 'ux-tokens',
      title: 'Design tokens',
      blocks: [
        { type: 'text', value: 'Tokens are named values shared between design and code. They make themes possible and prevent one-off colours and spacing. A token name describes purpose, not appearance.' },
        { type: 'code', lang: 'css', tryIt: false, value: `:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-primary: #0f766e;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;

  --radius-sm: 8px;
  --radius-md: 14px;
}` },
        { type: 'note', value: 'Name tokens by role (color-text, color-danger), not by value (gray-700). A rename should not change every file.' },
      ],
    },
    {
      id: 'ux-docs',
      title: 'Documenting components',
      blocks: [
        { type: 'text', value: 'A component is not done until it is documented: what it is for, its states, its accessibility behaviour and its do and do-not examples. Documentation is what makes a system usable by others.' },
        { type: 'list', items: [
          'Anatomy: the parts of the component',
          'States: default, hover, focus, disabled, error, loading',
          'Content rules: label length and tone',
          'Accessibility: keyboard and screen reader behaviour',
          'Do and do-not examples',
        ] },
        { type: 'note', value: 'A component with no disabled or error state will be re-implemented badly somewhere else. Document every state.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'design-systems',
      q: 'What is a design system?',
      options: ['A colour palette only', 'Shared tokens, components, patterns and rules', 'A single screen', 'A research method'],
      answer: 1,
      explain: 'A system covers tokens, components and guidance.',
    },
    {
      chapterId: 'design-systems',
      q: 'How should tokens be named?',
      options: ['By hex value', 'By purpose and role', 'Randomly', 'By file name'],
      answer: 1,
      explain: 'Role-based names survive redesigns.',
    },
    {
      chapterId: 'design-systems',
      q: 'Why document component states?',
      options: ['To fill space', 'So others do not rebuild them badly', 'It is required by Figma', 'To slow the team'],
      answer: 1,
      explain: 'Documentation prevents inconsistent rebuilds.',
    },
    {
      chapterId: 'design-systems',
      q: 'What makes a design system succeed?',
      options: ['A big file', 'Teams actually using it', 'Many colours', 'A logo'],
      answer: 1,
      explain: 'Adoption is the measure of success.',
    },
  ],
};
