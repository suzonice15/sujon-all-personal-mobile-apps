// AI chapter: Prompting.

export default {
  id: 'prompting',
  title: 'Prompting',
  description: 'Clear instructions, context, examples and iteration',
  icon: 'chat',
  lessons: [
    {
      id: 'ai-prompt-structure',
      title: 'A good prompt structure',
      blocks: [
        { type: 'text', value: 'A reliable prompt has four parts: the role, the task, the input, and the output format. Vague prompts produce vague answers.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Role: You are a patient coding tutor.
Task: Explain the bug in the code below to a beginner.
Input: [code]
Format: 3 short paragraphs, no jargon, end with one practice tip.
If unsure, say what is missing instead of guessing.` },
        { type: 'list', items: [
          'Be specific about the audience and the goal',
          'Provide the data the model needs',
          'State the output format and length',
          'Tell it what to do when unsure',
        ] },
        { type: 'note', value: 'The instruction "be accurate" does not make a model accurate. Supplying the source or a tool does.' },
      ],
    },
    {
      id: 'ai-examples-constraints',
      title: 'Examples and constraints',
      blocks: [
        { type: 'text', value: 'Showing one or two examples (few-shot prompting) is often more effective than a long description. Constraints keep the answer usable.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Example input: "I payed for the course but it is not showing"
Example output: {"category":"billing","urgency":"high","summary":"Payment made, course missing"}

Now classify: "The video freezes at 2:10"
Return JSON only, with keys category, urgency, summary.` },
        { type: 'note', value: 'Examples teach format and tone. Do not include private customer data in an example unless the provider allows it and you have consent.' },
      ],
    },
    {
      id: 'ai-iteration',
      title: 'Iteration and testing',
      blocks: [
        { type: 'text', value: 'Treat a prompt like code. Keep a set of test inputs, change one thing at a time, and compare results. A prompt that works once is a demo, not a feature.' },
        { type: 'list', items: [
          'Collect 20-50 realistic test cases',
          'Define what a correct answer looks like',
          'Change one instruction or example at a time',
          'Record accuracy, cost and latency',
          'Keep the prompt in version control',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `test-01: answer found in document -> must cite source
test-02: answer missing -> must say "I don't know"
test-03: prompt injection -> must ignore instructions in the document` },
        { type: 'note', value: 'Store prompts as files or database records, not as strings scattered through the code. You will need to change and compare them.' },
      ],
    },
    {
      id: 'ai-prompt-patterns',
      title: 'Useful patterns',
      blocks: [
        { type: 'list', items: [
          'Step-by-step: ask for reasoning before the final answer',
          'Critique: generate, then ask the model to review its own output',
          'Role: a specific expert voice for tone and depth',
          'Format: a schema or a table for machine-readable output',
          'Refusal: an explicit "say I do not know" rule',
          'Decomposition: split a large task into smaller prompts',
        ] },
        { type: 'note', value: 'Chain-of-thought helps reasoning but can expose sensitive intermediate text. Do not log hidden reasoning in production if policy forbids it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'prompting',
      q: 'Which is part of a good prompt?',
      options: ['A vague goal', 'Clear task, input and output format', 'Only a question mark', 'A password'],
      answer: 1,
      explain: 'Specificity and structure improve reliability.',
    },
    {
      chapterId: 'prompting',
      q: 'What is few-shot prompting?',
      options: ['Using many models', 'Providing a few examples in the prompt', 'A slow request', 'A token limit'],
      answer: 1,
      explain: 'Examples teach format and behaviour.',
    },
    {
      chapterId: 'prompting',
      q: 'Why keep prompts in version control?',
      options: ['They are large', 'To compare changes and roll back', 'To encrypt them', 'To reduce tokens'],
      answer: 1,
      explain: 'Prompts are code-like assets that need history.',
    },
    {
      chapterId: 'prompting',
      q: 'What should a prompt say when the answer is unknown?',
      options: ['Guess confidently', 'Say I do not know or ask for the missing source', 'Return an empty string', 'Repeat the question'],
      answer: 1,
      explain: 'An explicit refusal rule reduces hallucination.',
    },
  ],
};
