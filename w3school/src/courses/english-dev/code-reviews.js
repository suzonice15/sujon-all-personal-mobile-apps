// English for Developers chapter: Code Reviews.

export default {
  id: 'code-reviews',
  title: 'Code Reviews',
  description: 'Ask, suggest and disagree well',
  icon: 'rate-review',
  lessons: [
    {
      id: 'eng-review-ask',
      title: 'Asking for a review',
      blocks: [
        { type: 'text', value: 'A review request should say what changed, why and what you want checked. A clear description gets better feedback than “please review”.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Title: Add pagination to /courses

What: adds page and per_page with a cap of 100
Why: the list endpoint returns the whole table
Tested: unit tests for page 1, empty page, cap
Please check: the SQL in course_repo.py` },
        { type: 'note', value: 'Point reviewers at the risky part. They will find it faster and give more useful comments.' },
      ],
    },
    {
      id: 'eng-review-comment',
      title: 'Writing review comments',
      blocks: [
        { type: 'text', value: 'Comment on the code, not the person. Use questions for suggestions and state clearly when something is blocking. Separate “must fix” from “nice to have”.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Blocking:  "This query is not scoped by user_id, so user A
            can read user B's orders. Could we add the filter?"

Suggestion: "Nit: courseList would read a bit better than
            cl. Not blocking."

Praise:    "Nice catch on the empty state. That was missing before."` },
        { type: 'note', value: 'Label comments as blocking, suggestion or nit. The author then knows what must change before merge.' },
      ],
    },
    {
      id: 'eng-review-disagree',
      title: 'Disagreeing',
      blocks: [
        { type: 'text', value: 'Disagreement is normal. Acknowledge the point, explain your reasoning and propose a test or a decision. Avoid repeating the same sentence louder.' },
        { type: 'list', items: [
          '“I see your point about X.”',
          '“My concern is Y because Z.”',
          '“Could we test both and compare?”',
          '“Let us take this to a call.”',
          '“I will go with your call; you own this area.”',
        ] },
        { type: 'note', value: 'Once a decision is made, commit to it. Reopening it in every review wastes the team’s time.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'code-reviews',
      q: 'What should a review request include?',
      options: ['Only the code', 'What changed, why and what to check', 'A price', 'A password'],
      answer: 1,
      explain: 'Context gets better feedback.',
    },
    {
      chapterId: 'code-reviews',
      q: 'How should you comment on a bug?',
      options: ['“This is wrong.”', 'Explain the impact and ask for a fix', 'Ignore it', 'Fix it silently'],
      answer: 1,
      explain: 'State the impact, then the fix.',
    },
    {
      chapterId: 'code-reviews',
      q: 'What does “nit” mean?',
      options: ['A blocking bug', 'A minor suggestion', 'A test', 'A deploy'],
      answer: 1,
      explain: 'A nit is non-blocking.',
    },
    {
      chapterId: 'code-reviews',
      q: 'What should you do after a decision?',
      options: ['Reopen it', 'Commit to it', 'Ignore it', 'Ask again'],
      answer: 1,
      explain: 'Decisions should stick.',
    },
  ],
};
