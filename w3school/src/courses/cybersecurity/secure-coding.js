// Security chapter: Secure Coding.

export default {
  id: 'secure-coding',
  title: 'Secure Coding',
  description: 'Validation, encoding, least privilege and safe errors',
  icon: 'code',
  lessons: [
    {
      id: 'sec-input-validation',
      title: 'Input validation',
      blocks: [
        { type: 'text', value: 'Validate on the server at the boundary. Check type, length, range and allowed values. Reject unknown fields rather than silently ignoring them.' },
        { type: 'code', lang: 'js', tryIt: false, value: `function validateCourse(body) {
  if (typeof body.title !== 'string' || body.title.length > 100) {
    return { ok: false, error: 'Invalid title' };
  }
  if (!Number.isInteger(body.price) || body.price < 0) {
    return { ok: false, error: 'Invalid price' };
  }
  return { ok: true, value: { title: body.title, price: body.price } };
}` },
        { type: 'note', value: 'Validation prevents bad data; it does not make dangerous operations safe. Parameterize queries and encode output separately.' },
      ],
    },
    {
      id: 'sec-output-encoding',
      title: 'Output encoding',
      blocks: [
        { type: 'text', value: 'Encode data for the context where it appears: HTML body, attribute, JavaScript, CSS or URL. A string that is safe in one context can execute in another.' },
        { type: 'code', lang: 'text', tryIt: false, value: `HTML:      &lt; &gt; &amp; &quot; &#39;
Attribute: quote and escape the value
JS:        JSON.stringify, never raw interpolation
URL:       encodeURIComponent
SQL:       parameterized queries, not escaping` },
        { type: 'note', value: 'Use a well-tested templating engine that escapes by default. Manual string concatenation in HTML is how XSS happens.' },
      ],
    },
    {
      id: 'sec-least-privilege',
      title: 'Least privilege',
      blocks: [
        { type: 'list', items: [
          'Database user: only the tables and actions needed',
          'Cloud role: only the required services',
          'API token: minimal scopes',
          'Container: non-root user',
          'File permissions: owner-only where possible',
          'Admin access: separate account and MFA',
        ] },
        { type: 'text', value: 'If one component is compromised, least privilege decides how far the attacker can move. It is the highest-value security principle after patching.' },
      ],
    },
    {
      id: 'sec-errors-logs',
      title: 'Errors and logs',
      blocks: [
        { type: 'text', value: 'Return a safe error to the client and log the details on the server. A stack trace or SQL message leaks structure and sometimes data.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Client: 500 { "error": "Internal server error" }
Server log: request id, user id, route, error, stack

Never log: passwords, tokens, full card numbers, raw personal data` },
        { type: 'list', items: [
          'Use a request id in every log line',
          'Redact secrets before logging',
          'Alert on repeated auth failures',
          'Do not log the full request body by default',
          'Protect and rotate logs',
        ] },
        { type: 'note', value: 'Logs are a data store. Treat them with the same care as the database.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'secure-coding',
      q: 'Where must validation happen?',
      options: ['Only in the app', 'On the server', 'Only in the database', 'Nowhere'],
      answer: 1,
      explain: 'The client is untrusted.',
    },
    {
      chapterId: 'secure-coding',
      q: 'Why encode output?',
      options: ['To compress it', 'To prevent the value from becoming code', 'To speed it up', 'To encrypt it'],
      answer: 1,
      explain: 'Encoding depends on the output context.',
    },
    {
      chapterId: 'secure-coding',
      q: 'What is least privilege?',
      options: ['Giving admin to everyone', 'Giving only the permissions needed', 'Using one password', 'Disabling logs'],
      answer: 1,
      explain: 'It limits the blast radius of a compromise.',
    },
    {
      chapterId: 'secure-coding',
      q: 'What should a 500 response contain?',
      options: ['A stack trace', 'A safe generic message', 'The SQL query', 'A password'],
      answer: 1,
      explain: 'Details belong in server logs, not the client.',
    },
  ],
};
