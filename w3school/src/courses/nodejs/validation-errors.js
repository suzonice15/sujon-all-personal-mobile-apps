// Node.js chapter: Validation and Errors.

export default {
  id: 'validation-errors',
  title: 'Validation & Errors',
  description: 'Reject bad input early and report failures consistently',
  icon: 'rule',
  lessons: [
    {
      id: 'node-validation',
      title: 'Validate at the boundary',
      blocks: [
        { type: 'text', value: 'Every request is untrusted. Validate the shape, types and ranges before the data reaches a service or database. A validator returns a clear list of problems, not a crash.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function validateCourse(body) {
  const errors = [];

  if (!body.title || typeof body.title !== 'string') {
    errors.push('title is required and must be text');
  }
  if (typeof body.price !== 'number' || body.price < 0) {
    errors.push('price must be a positive number');
  }
  if (body.tags !== undefined && !Array.isArray(body.tags)) {
    errors.push('tags must be an array');
  }

  return { ok: errors.length === 0, errors };
}

console.log(validateCourse({ title: 'SQL', price: 5000 }));
console.log(validateCourse({ title: 'SQL', price: -1 }));
console.log(validateCourse({}));` },
        { type: 'text', value: 'Return all errors at once so the client can show them together. Validate again on the server even if the app already did; the client cannot be trusted.' },
        { type: 'note', value: 'A schema library such as Zod or Joi removes boilerplate and keeps the rules in one place. The principle is the same: parse, do not assume.' },
      ],
    },
    {
      id: 'node-error-shape',
      title: 'A consistent error shape',
      blocks: [
        { type: 'text', value: 'Pick one error format for the whole API. Clients then handle failures once instead of guessing for every endpoint.' },
        { type: 'code', lang: 'text', tryIt: false, value: `{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request body is invalid",
    "details": ["price must be a positive number"]
  }
}` },
        { type: 'list', items: [
          'Use HTTP status codes for the category',
          'Use a stable machine code for the client logic',
          'Keep the human message short and safe',
          'Put field errors in details',
        ] },
        { type: 'note', value: 'Never return a raw database error. It can leak table names, SQL and sometimes data. Log it, return a generic 500 message.' },
      ],
    },
    {
      id: 'node-async-errors',
      title: 'Async errors',
      blocks: [
        { type: 'text', value: 'An async handler that throws becomes an unhandled rejection unless you catch it. Wrap async handlers so every failure reaches the error middleware.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/:id', asyncHandler(async (req, res) => {
  const course = await courseService.find(req.params.id);
  if (!course) throw Object.assign(new Error('Not found'), { status: 404 });
  res.json(course);
}));` },
        { type: 'text', value: 'Throw an error with a status, then let one error middleware format every response. Handlers stay short and the format stays consistent.' },
        { type: 'note', value: 'Do not swallow errors with an empty catch. If you cannot handle it, pass it on so it is logged and reported.' },
      ],
    },
    {
      id: 'node-error-status',
      title: 'Choosing the right status',
      blocks: [
        { type: 'list', items: [
          '400 - the request is malformed or invalid',
          '401 - authentication is missing or wrong',
          '403 - authenticated but not allowed',
          '404 - the resource does not exist',
          '409 - conflict, such as a duplicate email',
          '422 - valid JSON but business rules failed',
          '429 - too many requests',
          '500 - an unexpected bug',
        ] },
        { type: 'note', value: 'Do not use 500 for validation. A 500 tells the client to retry or report a bug; a 400 tells it to fix the input. The distinction affects client behaviour and monitoring alerts.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'validation-errors',
      q: 'Where should input validation happen?',
      options: ['Only in the app', 'At the API boundary and again on the server', 'Only in the database', 'Nowhere'],
      answer: 1,
      explain: 'The client is untrusted; the server must validate everything it receives.',
    },
    {
      chapterId: 'validation-errors',
      q: 'Why return all validation errors at once?',
      options: ['It is faster', 'The client can show them together', 'It hides the errors', 'It changes the status code'],
      answer: 1,
      explain: 'Users fix the form in one pass instead of one error at a time.',
    },
    {
      chapterId: 'validation-errors',
      q: 'What should a 500 response contain?',
      options: ['The database stack trace', 'A safe generic message', 'The SQL query', 'The user password'],
      answer: 1,
      explain: 'Log details on the server and return a safe message to the client.',
    },
    {
      chapterId: 'validation-errors',
      q: 'What does an asyncHandler wrapper do?',
      options: ['Speeds up the route', 'Passes rejected promises to next(error)', 'Parses JSON', 'Creates a token'],
      answer: 1,
      explain: 'It catches async failures so the error middleware can format them.',
    },
  ],
};
