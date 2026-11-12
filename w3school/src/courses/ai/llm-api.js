// AI chapter: LLM API.

export default {
  id: 'llm-api',
  title: 'The LLM API',
  description: 'Messages, temperature, streaming and errors',
  icon: 'api',
  lessons: [
    {
      id: 'ai-first-call',
      title: 'Your first API call',
      blocks: [
        { type: 'text', value: 'Most providers expose a chat-style API: you send a list of messages and receive a message. The key is a secret and must live on the server, never in the app.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a concise coding tutor.' },
      { role: 'user', content: 'Explain a for loop in one sentence.' },
    ],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);` },
        { type: 'note', value: 'Never ship an API key inside a mobile app or a web page. Anyone can extract it. Call the provider from your own backend.' },
      ],
    },
    {
      id: 'ai-messages-params',
      title: 'Messages and parameters',
      blocks: [
        { type: 'list', items: [
          'system - behaviour and rules',
          'user - the request',
          'assistant - previous model replies',
          'temperature - lower is more predictable, higher is more creative',
          'max_tokens - cap the output length',
          'stop - optional sequences that end the answer',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `const body = {
  model: 'gpt-4o-mini',
  temperature: 0.2,
  max_tokens: 300,
  messages: [
    { role: 'system', content: 'Answer only from the provided notes.' },
    { role: 'user', content: 'Notes: ...\\nQuestion: What is a token?' },
  ],
};` },
        { type: 'note', value: 'For facts and code, use a low temperature. For brainstorming, a higher value gives more variety.' },
      ],
    },
    {
      id: 'ai-streaming',
      title: 'Streaming',
      blocks: [
        { type: 'text', value: 'Streaming sends tokens as they are generated. The user sees progress immediately, which feels much faster even when the total time is the same.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const response = await fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ ...body, stream: true }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  process.stdout.write(decoder.decode(value));
}` },
        { type: 'note', value: 'Streaming complicates error handling and storage. You must handle a dropped connection and decide whether to keep the partial answer.' },
      ],
    },
    {
      id: 'ai-api-errors',
      title: 'Errors and retries',
      blocks: [
        { type: 'list', items: [
          '401 - bad or missing API key',
          '429 - rate limit; retry with backoff',
          '400 - invalid request; fix the payload',
          '500/503 - provider problem; retry later',
          'timeout - set a client timeout',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `async function withRetry(fn, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** i));
    }
  }
}` },
        { type: 'note', value: 'Retry only transient failures such as 429 and 5xx. Retrying a 400 just wastes time and money.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'llm-api',
      q: 'Where should the API key live?',
      options: ['In the mobile app', 'On the server', 'In the README', 'In the prompt'],
      answer: 1,
      explain: 'Client apps cannot keep a secret.',
    },
    {
      chapterId: 'llm-api',
      q: 'Which role sets the behaviour?',
      options: ['user', 'system', 'assistant', 'tool'],
      answer: 1,
      explain: 'The system message sets rules and tone.',
    },
    {
      chapterId: 'llm-api',
      q: 'What does streaming improve?',
      options: ['Total cost', 'Perceived latency', 'Model accuracy', 'Context size'],
      answer: 1,
      explain: 'Users see tokens as they arrive.',
    },
    {
      chapterId: 'llm-api',
      q: 'Which error should be retried?',
      options: ['400', '401', '429', 'Invalid JSON'],
      answer: 2,
      explain: '429 is a temporary rate limit.',
    },
  ],
};
