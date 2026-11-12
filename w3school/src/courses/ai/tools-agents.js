// AI chapter: Tools and Agents.

export default {
  id: 'tools-agents',
  title: 'Tools & Agents',
  description: 'Let the model request actions safely',
  icon: 'build',
  lessons: [
    {
      id: 'ai-tool-calling',
      title: 'Tool calling',
      blocks: [
        { type: 'text', value: 'A tool is a function your code exposes to the model. The model can ask to call it with arguments. Your code validates the request, runs the function and sends the result back.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// 1. Define the tool (see the previous chapter)
// 2. Send the question with tools
// 3. The model returns a tool call
const call = response.choices[0].message.tool_calls?.[0];

if (call?.function.name === 'get_course') {
  const args = JSON.parse(call.function.arguments);
  const course = await db.courses.find(args.id);

  // 4. Send the result back and ask for the final answer
  messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(course) });
}` },
        { type: 'note', value: 'The model never touches your database directly. It only requests; your code decides what is allowed.' },
      ],
    },
    {
      id: 'ai-agent-loop',
      title: 'The agent loop',
      blocks: [
        { type: 'text', value: 'An agent repeats a loop: plan, call a tool, observe the result, then decide the next step. It stops when it can answer or when a limit is reached.' },
        { type: 'code', lang: 'text', tryIt: false, value: `for step in 1..maxSteps:
  response = model(messages, tools)
  if response is a final answer: return it
  call the requested tool
  append the result to messages
return "I could not finish within the limit"` },
        { type: 'list', items: [
          'Set a maximum number of steps',
          'Set a time and token budget',
          'Log every tool call and result',
          'Stop on repeated identical calls',
          'Require confirmation for destructive actions',
        ] },
        { type: 'note', value: 'An agent without limits can loop forever and spend money. The limit is part of the design, not an afterthought.' },
      ],
    },
    {
      id: 'ai-agent-safety',
      title: 'Safety',
      blocks: [
        { type: 'list', items: [
          'Read-only tools first; writes need approval',
          'Validate and authorise every tool argument',
          'Never pass raw model output to a shell',
          'Scope database credentials to the minimum',
          'Log who asked, what ran and what changed',
          'Provide a kill switch',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `Bad:  run_sql(modelOutput)
Good: parse + validate -> allow-list table + read-only user
      -> parameterized query -> audit log` },
        { type: 'note', value: 'Treat an agent like an untrusted user with API access. It is useful, but it must not be able to do anything the caller could not do.' },
      ],
    },
    {
      id: 'ai-when-agent',
      title: 'When to use an agent',
      blocks: [
        { type: 'text', value: 'An agent is useful when the path is unknown and a tool can supply the missing information. If the steps are fixed, a normal function or workflow is simpler and safer.' },
        { type: 'list', items: [
          'Use a workflow for a known sequence',
          'Use an agent for open-ended research with tools',
          'Use a single tool call for one lookup',
          'Prefer deterministic code for money and permissions',
        ] },
        { type: 'note', value: 'Most production "agents" are a small number of tool calls inside a clear workflow. Marketing makes them sound more autonomous than they are.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'tools-agents',
      q: 'Who runs the function the model requests?',
      options: ['The model', 'The application code', 'The user', 'The provider'],
      answer: 1,
      explain: 'The application validates and executes the request.',
    },
    {
      chapterId: 'tools-agents',
      q: 'Why limit agent steps?',
      options: ['To look tidy', 'To prevent loops and runaway cost', 'To improve accuracy', 'To enable streaming'],
      answer: 1,
      explain: 'Limits bound time, tokens and money.',
    },
    {
      chapterId: 'tools-agents',
      q: 'Which action needs confirmation?',
      options: ['Reading a public page', 'Deleting a record', 'Formatting text', 'Searching documentation'],
      answer: 1,
      explain: 'Destructive actions must be approved.',
    },
    {
      chapterId: 'tools-agents',
      q: 'When is a workflow better than an agent?',
      options: ['When steps are fixed', 'When tools are unknown', 'When research is open-ended', 'Never'],
      answer: 0,
      explain: 'Deterministic steps are simpler and safer.',
    },
  ],
};
