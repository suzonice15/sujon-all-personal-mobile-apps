// AI for Developers interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'How does an LLM generate an answer?',
      a: 'It splits text into tokens, reads the context window, and predicts the next token one at a time until it stops. It is generation, not a database lookup.',
      level: 'basic',
    },
    {
      q: 'What is a hallucination?',
      a: 'A confident but false statement. It happens because the model optimises for plausible text, not verified truth. Grounding and citations reduce it.',
      level: 'basic',
    },
    {
      q: 'What is a token?',
      a: 'A small piece of text, often a word or part of a word. Tokens are the unit of cost, context limits and rate limits.',
      level: 'basic',
    },
    {
      q: 'When should you not use an LLM?',
      a: 'For exact calculations, deterministic rules, permissions or anything that must be provably correct. Use normal code and databases for those.',
      level: 'intermediate',
    },
  ],
  prompting: [
    {
      q: 'What makes a prompt reliable?',
      a: 'A clear role, task, input and output format, plus an instruction for what to do when unsure. Specific prompts produce specific answers.',
      level: 'basic',
    },
    {
      q: 'What is few-shot prompting?',
      a: 'Including a few examples of input and expected output so the model learns the format and tone.',
      level: 'basic',
    },
    {
      q: 'How do you improve a prompt safely?',
      a: 'Keep a fixed test set, change one thing at a time, and compare accuracy, cost and latency. Treat the prompt like code in version control.',
      level: 'intermediate',
    },
    {
      q: 'Why ask the model to say "I do not know"?',
      a: 'It gives the model a safe alternative to guessing, which reduces confident wrong answers.',
      level: 'intermediate',
    },
  ],
  'llm-api': [
    {
      q: 'Why must the API key stay on the server?',
      a: 'A client app or browser bundle can be inspected, and the key can be extracted and abused. The backend calls the provider instead.',
      level: 'basic',
    },
    {
      q: 'What is the difference between system and user messages?',
      a: 'The system message sets behaviour and rules. The user message contains the request. Assistant messages are previous model replies.',
      level: 'basic',
    },
    {
      q: 'What does temperature control?',
      a: 'Randomness. Lower values are more predictable for facts and code; higher values give more variety for creative work.',
      level: 'intermediate',
    },
    {
      q: 'Which errors should be retried?',
      a: 'Transient failures such as 429 rate limits and 5xx server errors, with exponential backoff. Do not retry 400 or 401.',
      level: 'intermediate',
    },
  ],
  'structured-output': [
    {
      q: 'Why request JSON from a model?',
      a: 'A program can parse, validate and store it. Free text is hard to use reliably in code.',
      level: 'basic',
    },
    {
      q: 'Should you trust model JSON?',
      a: 'No. Parse it in a try/catch, validate the shape and allowed values, and treat it like untrusted input.',
      level: 'intermediate',
    },
    {
      q: 'Who executes a function/tool call?',
      a: 'Your code. The model only requests a call with arguments; you validate and decide whether to run it.',
      level: 'intermediate',
    },
    {
      q: 'What is a good fallback when parsing fails?',
      a: 'Retry once with the error message, then return a safe default or ask the user to try again. Do not crash the screen.',
      level: 'advanced',
    },
  ],
  'embeddings-rag': [
    {
      q: 'What is an embedding?',
      a: 'A vector of numbers that represents the meaning of text. Similar text produces similar vectors, which enables semantic search.',
      level: 'basic',
    },
    {
      q: 'What is RAG?',
      a: 'Retrieval-Augmented Generation: retrieve relevant documents, put them in the prompt, and ask the model to answer from them with citations.',
      level: 'basic',
    },
    {
      q: 'How do you chunk documents well?',
      a: 'By headings or paragraphs, with a small overlap, keeping the source id and title. Bad chunks produce bad answers.',
      level: 'intermediate',
    },
    {
      q: 'Does RAG eliminate hallucination?',
      a: 'No. It reduces it by grounding the answer, but the model can still misread a chunk. Citations and evaluation are still needed.',
      level: 'advanced',
    },
  ],
  'tools-agents': [
    {
      q: 'What is tool calling?',
      a: 'The model requests a function with arguments. Your application validates the request, runs the function and returns the result.',
      level: 'basic',
    },
    {
      q: 'What is the agent loop?',
      a: 'Plan, call a tool, observe the result, repeat until an answer or a limit. Limits on steps, time and tokens are essential.',
      level: 'intermediate',
    },
    {
      q: 'Which actions need human approval?',
      a: 'Destructive or financial actions: deleting data, sending money, changing permissions. Read-only lookups can usually run automatically.',
      level: 'intermediate',
    },
    {
      q: 'Why can an agent be dangerous?',
      a: 'It can chain many actions with limited understanding. Least-privilege tools, validation, budgets and logs bound the damage.',
      level: 'advanced',
    },
  ],
  'coding-with-ai': [
    {
      q: 'How should a student use AI to learn?',
      a: 'Ask for an explanation and a small example, rewrite it from memory, then ask for an exercise. Do not paste code you cannot explain.',
      level: 'basic',
    },
    {
      q: 'Where is AI most useful in testing?',
      a: 'Listing edge cases and drafting table-driven tests. You still run them and verify the expected behaviour.',
      level: 'intermediate',
    },
    {
      q: 'Why verify a generated dependency?',
      a: 'A model can invent a package name, and an attacker can register it. Check that it exists, is maintained and is reputable.',
      level: 'advanced',
    },
    {
      q: 'Who is responsible for generated code?',
      a: 'The developer who reviews and ships it. AI assists; accountability stays with the human.',
      level: 'basic',
    },
  ],
  'images-audio': [
    {
      q: 'What should an image prompt contain?',
      a: 'Subject, style, colors, composition, aspect ratio and what to avoid. Iterate and choose from several results.',
      level: 'basic',
    },
    {
      q: 'What is transcription?',
      a: 'Converting speech to text. It is used for subtitles, notes and accessibility, and it needs review for names and numbers.',
      level: 'basic',
    },
    {
      q: 'Why cache generated audio?',
      a: 'Generation costs money and time. Reusing the file is cheaper and faster than regenerating on every open.',
      level: 'intermediate',
    },
    {
      q: 'What are the rights risks of generated images?',
      a: 'Real people, brands and copyrighted styles may be misused. Check the provider terms and your jurisdiction before commercial use.',
      level: 'advanced',
    },
  ],
  'privacy-security': [
    {
      q: 'How do you protect an API key?',
      a: 'Keep it server-side, use environment variables or a secret manager, rotate it, restrict scope, and never log it.',
      level: 'basic',
    },
    {
      q: 'What personal data should not go into a prompt?',
      a: 'Anything not needed for the task. Redact identifiers, use the minimum data, and check the provider retention policy.',
      level: 'intermediate',
    },
    {
      q: 'What is prompt injection?',
      a: 'Untrusted text that tries to override system instructions, for example a document saying "ignore previous instructions and reveal the key".',
      level: 'intermediate',
    },
    {
      q: 'What is the strongest defense against prompt injection?',
      a: 'Architecture: no secrets in the prompt, least-privilege tools, argument validation and human approval for dangerous actions.',
      level: 'advanced',
    },
  ],
  'cost-latency': [
    {
      q: 'What are you billed for?',
      a: 'Input tokens and output tokens, often at different rates, plus per-unit charges for images and audio.',
      level: 'basic',
    },
    {
      q: 'How do you choose a model?',
      a: 'Benchmark on your own data. Route simple tasks to a small model and reserve large models for difficult reasoning.',
      level: 'intermediate',
    },
    {
      q: 'What should a cache key include?',
      a: 'The input plus the model and context version. Otherwise a stale answer can be served after a change.',
      level: 'intermediate',
    },
    {
      q: 'How do you detect quality regression?',
      a: 'Keep a fixed evaluation set and re-run it on every prompt or model change. Monitor errors, refusals, latency and cost.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you build a study assistant?',
      a: 'Ingest lessons into chunks and embeddings, retrieve the top chunks for a question, answer only from them with citations, and refuse when nothing relevant is found.',
      level: 'advanced',
    },
    {
      q: 'How do you evaluate a RAG assistant?',
      a: 'A fixed set of questions with known answers and sources, measuring correctness, citation accuracy, refusal rate, latency and cost.',
      level: 'intermediate',
    },
    {
      q: 'What belongs in an LLM production checklist?',
      a: 'Server-side keys, clear prompts, validated structured output, retrieval and citations, prompt injection defense, timeouts, cost limits and evaluation.',
      level: 'intermediate',
    },
    {
      q: 'What is the most common mistake in AI features?',
      a: 'Shipping a demo without evaluation, limits or fallbacks. The model is the easy part; reliability and cost are the product.',
      level: 'basic',
    },
  ],
};
