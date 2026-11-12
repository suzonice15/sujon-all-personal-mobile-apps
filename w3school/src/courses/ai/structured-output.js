// AI chapter: Structured Output.

export default {
  id: 'structured-output',
  title: 'Structured Output',
  description: 'JSON, schemas and safe parsing',
  icon: 'data-object',
  lessons: [
    {
      id: 'ai-why-structured',
      title: 'Why structured output?',
      blocks: [
        { type: 'text', value: 'Free text is hard for a program to use. JSON with a fixed schema lets you store, validate and display the result reliably.' },
        { type: 'code', lang: 'json', tryIt: false, value: `{
  "category": "billing",
  "urgency": "high",
  "summary": "Payment made but the course is missing",
  "confidence": 0.92
}` },
        { type: 'note', value: 'Ask for JSON only, and still parse it defensively. Models occasionally add text around the JSON or use the wrong type.' },
      ],
    },
    {
      id: 'ai-json-mode',
      title: 'JSON mode and schemas',
      blocks: [
        { type: 'text', value: 'Many providers support a JSON mode or a schema-constrained response. Use it when available; it removes most formatting errors.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const body = {
  model: 'gpt-4o-mini',
  response_format: { type: 'json_object' },
  messages: [
    { role: 'system', content: 'Return JSON with category, urgency, summary.' },
    { role: 'user', content: ticketText },
  ],
};` },
        { type: 'list', items: [
          'Describe every field and its allowed values',
          'Say "JSON only, no markdown fences"',
          'Use a real schema when the provider supports it',
          'Provide one example of the exact shape',
        ] },
      ],
    },
    {
      id: 'ai-validation',
      title: 'Validation and retries',
      blocks: [
        { type: 'text', value: 'Parse inside try/catch and validate the shape. If it fails, retry once with the error message, or fall back to a safe default.' },
        { type: 'code', lang: 'js', tryIt: false, value: `function parseTicket(text) {
  try {
    const data = JSON.parse(text);
    if (!['billing', 'technical', 'other'].includes(data.category)) {
      throw new Error('Unknown category');
    }
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}` },
        { type: 'note', value: 'Never trust a model output as if it were user input validated by a schema. Treat it exactly like data from an untrusted client.' },
      ],
    },
    {
      id: 'ai-tool-schema',
      title: 'Function schemas',
      blocks: [
        { type: 'text', value: 'A tool or function schema describes the arguments the model may request. The model does not execute the function; your code does, after validation.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const tools = [{
  type: 'function',
  function: {
    name: 'get_course',
    description: 'Look up a course by id',
    parameters: {
      type: 'object',
      properties: { id: { type: 'integer' } },
      required: ['id'],
    },
  },
}];` },
        { type: 'note', value: 'Validate tool arguments before running them. A model can request a dangerous action; your code decides whether it is allowed.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'structured-output',
      q: 'Why request JSON?',
      options: ['It is shorter', 'Programs can parse and validate it', 'It is cheaper', 'It improves accuracy always'],
      answer: 1,
      explain: 'A fixed shape is machine-readable.',
    },
    {
      chapterId: 'structured-output',
      q: 'What should you do with model JSON?',
      options: ['Trust it', 'Parse and validate it', 'Store it as HTML', 'Run it with eval'],
      answer: 1,
      explain: 'Treat it like untrusted input.',
    },
    {
      chapterId: 'structured-output',
      q: 'Who executes a tool call?',
      options: ['The model', 'Your code', 'The provider', 'The database'],
      answer: 1,
      explain: 'The model only requests the call.',
    },
    {
      chapterId: 'structured-output',
      q: 'What is a good fallback when parsing fails?',
      options: ['Crash', 'Retry once or use a safe default', 'Ignore the error', 'Return raw text'],
      answer: 1,
      explain: 'Keep the app usable with a controlled fallback.',
    },
  ],
};
