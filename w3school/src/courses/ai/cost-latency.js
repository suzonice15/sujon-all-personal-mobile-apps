// AI chapter: Cost and Latency.

export default {
  id: 'cost-latency',
  title: 'Cost & Latency',
  description: 'Choose models, cache and measure',
  icon: 'speed',
  lessons: [
    {
      id: 'ai-token-cost',
      title: 'Token cost',
      blocks: [
        { type: 'text', value: 'You pay for input tokens and output tokens, usually at different rates. A long document and a long answer both cost money. Estimate cost per request before launch.' },
        { type: 'code', lang: 'text', tryIt: false, value: `cost per request =
  (input_tokens / 1M * input_price)
+ (output_tokens / 1M * output_price)

monthly = cost per request * requests per month` },
        { type: 'list', items: [
          'Input includes the system prompt and retrieved context',
          'Output is usually more expensive per token',
          'Long chat histories grow the input every turn',
          'Trim history or summarise it periodically',
        ] },
        { type: 'note', value: 'A 2,000-token system prompt sent on every request is a recurring cost. Keep instructions short and move stable knowledge to retrieval.' },
      ],
    },
    {
      id: 'ai-model-choice',
      title: 'Choosing a model',
      blocks: [
        { type: 'list', items: [
          'Small model - cheap, fast, good for classification and extraction',
          'Large model - better reasoning and writing, slower and costlier',
          'Embedding model - cheap, for search',
          'Image/audio model - priced per image or minute',
          'Route easy requests to a small model, hard ones to a large model',
        ] },
        { type: 'text', value: 'Do not use the largest model for every task. Most production traffic is simple classification, extraction or short answers.' },
        { type: 'note', value: 'Benchmark on your own data. A cheaper model that is 2% less accurate may be the right choice for a draft, and the wrong one for a medical summary.' },
      ],
    },
    {
      id: 'ai-caching-batching',
      title: 'Caching and batching',
      blocks: [
        { type: 'list', items: [
          'Cache identical questions and answers with a TTL',
          'Cache embeddings and generated media',
          'Batch offline work instead of doing it per request',
          'Stream to improve perceived latency',
          'Use a queue for long jobs',
          'Set timeouts and fallbacks',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `const key = hash(question + contextVersion);
const cached = await cache.get(key);
if (cached) return cached;

const answer = await askModel(question);
await cache.set(key, answer, 60 * 60); // 1 hour
return answer;` },
        { type: 'note', value: 'Cache the answer only when the input and the model version are part of the key. Otherwise stale answers leak across changes.' },
      ],
    },
    {
      id: 'ai-evaluation',
      title: 'Evaluation and monitoring',
      blocks: [
        { type: 'text', value: 'You cannot improve what you do not measure. Track accuracy, latency, cost, refusals and user feedback. Use a fixed test set for every prompt or model change.' },
        { type: 'list', items: [
          'p50 and p95 latency',
          'Cost per request and per user',
          'Error and refusal rate',
          'Retrieval hit rate for RAG',
          'User thumbs up/down and corrections',
        ] },
        { type: 'note', value: 'An LLM feature can silently degrade when the provider updates a model. Pin a version where possible and re-run the evaluation.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'cost-latency',
      q: 'What are you billed for?',
      options: ['Only output', 'Input and output tokens', 'Only requests', 'Only storage'],
      answer: 1,
      explain: 'Both input and output tokens count.',
    },
    {
      chapterId: 'cost-latency',
      q: 'Which task suits a small model?',
      options: ['Complex reasoning', 'Classification and extraction', 'Long-form writing', 'Math proofs'],
      answer: 1,
      explain: 'Simple, well-defined tasks are cheaper on small models.',
    },
    {
      chapterId: 'cost-latency',
      q: 'What must a cache key include?',
      options: ['Only the question', 'Input and model/context version', 'The user password', 'The date only'],
      answer: 1,
      explain: 'Otherwise stale or wrong answers are reused.',
    },
    {
      chapterId: 'cost-latency',
      q: 'Why pin a model version?',
      options: ['To look modern', 'To prevent silent behaviour changes', 'To reduce tokens', 'To enable streaming'],
      answer: 1,
      explain: 'Provider updates can change output quality.',
    },
  ],
};
