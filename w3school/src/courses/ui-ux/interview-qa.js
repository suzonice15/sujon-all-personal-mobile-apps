// UI/UX interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between UI and UX?',
      a: 'UX is how the product works and whether people can complete tasks. UI is the visual and interactive surface: layout, colour, type and controls.',
      level: 'basic',
    },
    {
      q: 'What is the design process?',
      a: 'Understand the problem, sketch options, prototype, test with users, then refine. It is iterative.',
      level: 'basic',
    },
    {
      q: 'Why test a prototype before building?',
      a: 'To find real friction early, when changes are cheap.',
      level: 'basic',
    },
    {
      q: 'What is the deliverable of design work?',
      a: 'A decision the team can build and test, not a Figma file by itself.',
      level: 'intermediate',
    },
  ],
  'design-principles': [
    {
      q: 'What is visual hierarchy?',
      a: 'Using size, weight, colour and space to rank what the eye reads first, second and third.',
      level: 'basic',
    },
    {
      q: 'Why is whitespace important?',
      a: 'It groups related items, separates sections and makes text readable.',
      level: 'basic',
    },
    {
      q: 'What does proximity communicate?',
      a: 'Items close together are perceived as related.',
      level: 'basic',
    },
    {
      q: 'Why use a spacing scale?',
      a: 'Consistent spacing looks professional and removes arbitrary decisions.',
      level: 'intermediate',
    },
  ],
  'color-typography': [
    {
      q: 'What makes a good colour palette?',
      a: 'A primary colour, a neutral scale and semantic colours for success, warning and error, used consistently.',
      level: 'basic',
    },
    {
      q: 'What contrast does text need?',
      a: 'At least 4.5:1 for normal text and 3:1 for large text and UI components.',
      level: 'intermediate',
    },
    {
      q: 'Why not rely on colour alone?',
      a: 'Colour-blind users need another signal, so add an icon or label.',
      level: 'basic',
    },
    {
      q: 'What is a comfortable line length?',
      a: 'About 45 to 75 characters for body text.',
      level: 'basic',
    },
  ],
  'layout-responsive': [
    {
      q: 'Why use a grid?',
      a: 'It gives the page consistent alignment and structure.',
      level: 'basic',
    },
    {
      q: 'What does mobile-first mean?',
      a: 'Design the smallest screen first, then add complexity as space grows.',
      level: 'basic',
    },
    {
      q: 'Where should breakpoints come from?',
      a: 'Where the content breaks, not from device names.',
      level: 'intermediate',
    },
    {
      q: 'How large should a tap target be?',
      a: 'At least 44 by 44 pixels.',
      level: 'basic',
    },
  ],
  research: [
    {
      q: 'What makes a good interview question?',
      a: 'One about real past behaviour, such as "tell me about the last time you...", not a hypothetical.',
      level: 'basic',
    },
    {
      q: 'What is a persona?',
      a: 'A short profile of a user type with goals, context and frustrations, built from research.',
      level: 'basic',
    },
    {
      q: 'What does a journey map show?',
      a: 'The stages a user goes through, with actions, thoughts, feelings and pain points.',
      level: 'intermediate',
    },
    {
      q: 'How many interviews to start?',
      a: 'Five to eight per user segment reveals repeated patterns.',
      level: 'basic',
    },
  ],
  'wireframes-prototypes': [
    {
      q: 'What is a wireframe?',
      a: 'A low-fidelity sketch of structure without final styling.',
      level: 'basic',
    },
    {
      q: 'Why sketch several options?',
      a: 'To compare directions before committing to one.',
      level: 'basic',
    },
    {
      q: 'What does auto layout do in Figma?',
      a: 'It handles spacing, stacking and resizing so screens adapt cleanly.',
      level: 'intermediate',
    },
    {
      q: 'How do you test a prototype?',
      a: 'Give a task, ask the user to think aloud, and watch without guiding them. About five users is enough to start.',
      level: 'intermediate',
    },
  ],
  'usability-accessibility': [
    {
      q: 'What are usability heuristics?',
      a: 'Checklist principles such as visibility of status, consistency, error prevention and recognition over recall.',
      level: 'basic',
    },
    {
      q: 'What are the WCAG principles?',
      a: 'Perceivable, operable, understandable and robust.',
      level: 'intermediate',
    },
    {
      q: 'Why design empty and error states?',
      a: 'Users hit them and need clear guidance, otherwise the product feels broken.',
      level: 'basic',
    },
    {
      q: 'What makes a good error message?',
      a: 'It says what happened and what to do next, in plain language.',
      level: 'basic',
    },
  ],
  'design-systems': [
    {
      q: 'What is a design system?',
      a: 'A shared set of tokens, components, patterns and rules that keeps a product consistent.',
      level: 'basic',
    },
    {
      q: 'How should tokens be named?',
      a: 'By role, such as color-text or color-danger, not by raw value.',
      level: 'intermediate',
    },
    {
      q: 'What must a component document include?',
      a: 'Anatomy, states, content rules, accessibility behaviour and do and do-not examples.',
      level: 'intermediate',
    },
    {
      q: 'How do you measure a design system?',
      a: 'By adoption: how many teams and screens actually use it.',
      level: 'advanced',
    },
  ],
  'portfolio-freelance': [
    {
      q: 'What should a case study contain?',
      a: 'Problem, research, process, solution and outcome, with the reasons behind the decisions.',
      level: 'basic',
    },
    {
      q: 'Why limit review rounds?',
      a: 'To prevent unlimited revisions and keep the project profitable.',
      level: 'basic',
    },
    {
      q: 'What should be in a developer handoff?',
      a: 'Tokens, components, all states and notes on behaviour.',
      level: 'intermediate',
    },
    {
      q: 'How should design work be priced?',
      a: 'By project or value when the scope is clear, with a deposit and extra rounds billed separately.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you start a new design problem?',
      a: 'Understand the user and the task, write a problem statement and success measure, then sketch options.',
      level: 'intermediate',
    },
    {
      q: 'How do you know a design worked?',
      a: 'A measure improved, such as task completion, time on task or error rate.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle feedback you disagree with?',
      a: 'Ask what problem they see, test the options with users, and decide with evidence rather than opinion.',
      level: 'advanced',
    },
    {
      q: 'What is the best first UX step for a beginner?',
      a: 'Redesign one real screen and test it with five people.',
      level: 'basic',
    },
  ],
};
