// AI chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What LLMs are, what they are good at and where they fail',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ai-what-is',
      title: 'What is AI for developers?',
      blocks: [
        { type: 'text', value: 'For a developer, AI today mostly means large language models (LLMs). You send text and get text back. You can also send images, audio or structured data depending on the model.' },
        { type: 'list', items: [
          'Chat and Q&A assistants',
          'Summarising and rewriting text',
          'Code generation, review and explanation',
          'Extracting structured data from messy text',
          'Search with embeddings and retrieval',
          'Image, speech and transcription tools',
        ] },
        { type: 'note', value: 'An LLM is not a database and not a search engine. It predicts likely text. If you need facts, give it the facts or connect it to a real source.' },
      ],
    },
    {
      id: 'ai-how-llm-works',
      title: 'How an LLM works, simply',
      blocks: [
        { type: 'text', value: 'Text is split into tokens: small pieces of words. The model reads a context window of tokens and predicts the next token, one at a time. The answer is generated, not looked up.' },
        { type: 'code', lang: 'text', tryIt: false, value: `"Learning AI is fun"
-> tokens: ["Learn", "ing", " AI", " is", " fun"]
-> model predicts the next token from the context
-> repeats until it stops` },
        { type: 'list', items: [
          'Tokens are the unit of cost and context',
          'The context window is the maximum input plus output',
          'Temperature controls randomness',
          'The model has a knowledge cutoff and no memory by default',
        ] },
        { type: 'note', value: 'A model does not remember your previous chat unless the app sends the history again. Memory is an application feature, not a model feature.' },
      ],
    },
    {
      id: 'ai-good-bad',
      title: 'Good at, bad at',
      blocks: [
        { type: 'list', items: [
          'Good: drafting, summarising, explaining, transforming formats',
          'Good: generating tests and boilerplate from a clear spec',
          'Bad: guaranteed facts without a source',
          'Bad: maths and exact counting on long inputs',
          'Bad: secret knowledge about your private data',
          'Bad: replacing review, testing and judgement',
        ] },
        { type: 'text', value: 'Treat the model as a fast, confident junior assistant. It is useful, but you verify the work before it reaches users.' },
        { type: 'note', value: 'Hallucination means the model states something false with confidence. The fix is grounding: give it documents, tools or a database, and ask for citations.' },
      ],
    },
    {
      id: 'ai-use-cases',
      title: 'Choosing a use case',
      blocks: [
        { type: 'list', items: [
          'High value, low risk: summarise a support ticket',
          'High value, medium risk: draft a reply for a human to approve',
          'Low value, high risk: fully automatic financial advice',
          'Start with a narrow task and a measurable result',
        ] },
        { type: 'text', value: 'Write the task as a sentence: "Given a student question and three lesson excerpts, answer with a citation or say you do not know." That sentence becomes your prompt and your test.' },
        { type: 'note', value: 'A demo that works ten times is not a product. Measure accuracy on a test set before you trust it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does an LLM actually do?',
      options: ['Searches a database', 'Predicts the next token', 'Runs SQL', 'Stores facts'],
      answer: 1,
      explain: 'It generates text token by token from the context.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a hallucination?',
      options: ['A slow response', 'A confident but false statement', 'A token limit', 'A paid feature'],
      answer: 1,
      explain: 'The model invents plausible but incorrect information.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the context window?',
      options: ['The browser tab', 'The maximum tokens the model can read and write', 'The database size', 'The API key'],
      answer: 1,
      explain: 'Input plus output must fit inside it.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is grounding?',
      options: ['Making the model faster', 'Giving the model trusted sources to base the answer on', 'Encrypting prompts', 'Reducing cost'],
      answer: 1,
      explain: 'Grounding with documents or tools reduces hallucination.',
    },
  ],
};
