// AI chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a study assistant with citations',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ai-project-assistant',
      title: 'Project: study assistant',
      blocks: [
        { type: 'text', value: 'Build an assistant that answers questions from your course notes. It retrieves the best chunks, answers only from them, and cites the lesson id. If nothing is relevant, it says so.' },
        { type: 'code', lang: 'text', tryIt: false, value: `ingest:
  lessons -> chunks -> embeddings -> vector store

ask:
  embed question -> top 3 chunks
  -> prompt with notes + question
  -> answer with citation ids
  -> validate citations exist
  -> return answer + sources` },
        { type: 'list', items: [
          'Ingestion is a batch job, not a request-time job',
          'Store the lesson title and id with every chunk',
          'Return "not found" when similarity is low',
          'Show the sources in the UI',
          'Log the retrieved ids for debugging',
        ] },
        { type: 'note', value: 'A study assistant is a perfect portfolio project: it shows retrieval, prompting, validation and UI in one small app.' },
      ],
    },
    {
      id: 'ai-project-eval',
      title: 'Evaluating the assistant',
      blocks: [
        { type: 'text', value: 'Create 30 realistic questions with known answers and expected sources. Measure how often the answer is correct, cited and grounded in the provided notes.' },
        { type: 'list', items: [
          'Correct answer rate',
          'Citation accuracy',
          'Refusal rate when the answer is missing',
          'Average latency and cost',
          'Failure examples reviewed by a human',
        ] },
        { type: 'note', value: 'A single impressive demo is not evidence. A small fixed test set catches regressions when you change the prompt or the model.' },
      ],
    },
    {
      id: 'ai-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How does an LLM generate text?',
          'What is a token and why does it matter?',
          'How do you reduce hallucination?',
          'What is RAG and when do you use it?',
          'How do you choose a model for a task?',
          'How do you protect an API key?',
          'What is prompt injection and how do you defend?',
          'How do you evaluate an LLM feature?',
          'How do you control cost and latency?',
          'When should you not use an LLM?',
        ] },
        { type: 'text', value: 'Strong answers connect the model to the product: grounding, evaluation, cost and a human fallback. "We used a bigger model" is not a design answer.' },
        { type: 'note', value: 'Be ready to describe a feature end to end: input, prompt, retrieval, validation, UI, cost and failure handling.' },
      ],
    },
    {
      id: 'ai-checklist',
      title: 'Production checklist',
      blocks: [
        { type: 'list', items: [
          'Server-side API key with spending limits',
          'Clear prompt with refusal behaviour',
          'Structured output validated before use',
          'Retrieval and citations where facts matter',
          'Prompt injection considered',
          'Timeout, retry and fallback',
          'Cost and latency measured',
          'Evaluation set and monitoring',
        ] },
        { type: 'text', value: 'The difference between a demo and a product is mostly the boring parts: validation, limits, evaluation and failure handling.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should a grounded answer include?',
      options: ['A longer answer', 'Citations to the sources', 'A random fact', 'The API key'],
      answer: 1,
      explain: 'Citations let a human verify the answer.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should the assistant do when nothing matches?',
      options: ['Guess', 'Say it does not know', 'Return an empty string', 'Repeat the question'],
      answer: 1,
      explain: 'A clear refusal is better than a false answer.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What proves a feature improved?',
      options: ['One good demo', 'A fixed evaluation set', 'A larger model', 'More tokens'],
      answer: 1,
      explain: 'Repeatable measurement catches regressions.',
    },
    {
      chapterId: 'projects-interview',
      q: 'When should you avoid an LLM?',
      options: ['For exact money calculations', 'For drafting text', 'For summarising', 'For classification'],
      answer: 0,
      explain: 'Deterministic rules are safer for money and permissions.',
    },
  ],
};
