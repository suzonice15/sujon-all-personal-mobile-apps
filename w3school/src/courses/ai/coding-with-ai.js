// AI chapter: Coding with AI.

export default {
  id: 'coding-with-ai',
  title: 'Coding with AI',
  description: 'Learn faster without losing understanding',
  icon: 'code',
  lessons: [
    {
      id: 'ai-learn-not-copy',
      title: 'Learn, do not just copy',
      blocks: [
        { type: 'text', value: 'AI can explain, review and generate code. If you paste without understanding, you cannot debug it, extend it or defend it in an interview.' },
        { type: 'list', items: [
          'Ask for an explanation before the code',
          'Request the smallest example that shows the idea',
          'Rewrite it yourself from memory',
          'Ask "why this approach and what are the alternatives?"',
          'Test it with your own inputs',
        ] },
        { type: 'note', value: 'A good prompt for learning: "Explain this concept with a tiny example, then give me one exercise and wait for my answer."' },
      ],
    },
    {
      id: 'ai-review-tests',
      title: 'Review and tests',
      blocks: [
        { type: 'text', value: 'AI is strong at spotting patterns and generating test cases. It is weak at knowing your product rules. Use it as a second pair of eyes, not the final judge.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Review prompt:
"Review this function for bugs, edge cases and security issues.
List findings by severity. Do not rewrite it yet."

Test prompt:
"List edge cases for this input: empty, null, negative, huge, unicode.
Then write table-driven tests for the important ones."` },
        { type: 'note', value: 'Always run the tests yourself. A generated test can assert the wrong behaviour and still pass.' },
      ],
    },
    {
      id: 'ai-security-license',
      title: 'Security and licensing',
      blocks: [
        { type: 'list', items: [
          'Never paste secrets, keys or customer data into a chat',
          'Check the license of generated code and dependencies',
          'Review SQL, shell and auth code line by line',
          'Do not trust generated regex or crypto',
          'Scan dependencies with a real tool',
          'Keep a human responsible for the merge',
        ] },
        { type: 'text', value: 'Generated code is not automatically safe, correct or legally clean. The responsibility stays with the developer who ships it.' },
        { type: 'note', value: 'A model can invent a package name. An attacker can register that name. Verify every new dependency exists and is reputable.' },
      ],
    },
    {
      id: 'ai-workflow',
      title: 'A practical workflow',
      blocks: [
        { type: 'list', items: [
          'Write the problem and constraints yourself',
          'Ask for options and trade-offs',
          'Choose one and implement a small part',
          'Ask for edge cases and tests',
          'Review, run and commit in small steps',
          'Explain the change in your own words',
        ] },
        { type: 'text', value: 'The best developers use AI to remove boring work, not to skip thinking. The thinking is the part that compounds.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'coding-with-ai',
      q: 'What should you do before using generated code?',
      options: ['Paste it directly', 'Understand and test it', 'Commit it immediately', 'Delete the tests'],
      answer: 1,
      explain: 'You own the code you ship.',
    },
    {
      chapterId: 'coding-with-ai',
      q: 'Where is AI most useful in testing?',
      options: ['Deciding product rules', 'Listing edge cases and drafting tests', 'Deploying', 'Signing off'],
      answer: 1,
      explain: 'It is good at generating candidates; you verify.',
    },
    {
      chapterId: 'coding-with-ai',
      q: 'Why verify a new dependency?',
      options: ['It may not exist or may be malicious', 'It is always slow', 'It is not allowed', 'It costs tokens'],
      answer: 0,
      explain: 'Models can invent package names; attackers register them.',
    },
    {
      chapterId: 'coding-with-ai',
      q: 'What stays with the developer?',
      options: ['Nothing', 'Responsibility for the shipped code', 'Only the prompt', 'The model weights'],
      answer: 1,
      explain: 'AI assists; the developer is accountable.',
    },
  ],
};
