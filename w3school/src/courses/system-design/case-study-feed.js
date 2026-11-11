// System Design chapter: Case Study - Feed.

export default {
  id: 'case-study-feed',
  title: 'Case Study: Social Feed',
  description: 'Fan-out, storage and real-time delivery',
  icon: 'dynamic-feed',
  lessons: [
    {
      id: 'sd-feed-requirements',
      title: 'Requirements',
      blocks: [
        { type: 'text', value: 'A feed shows posts from people a user follows, newest first. The hard part is fan-out: one post may need to appear in millions of feeds.' },
        { type: 'list', items: [
          'Publish a post',
          'Follow and unfollow',
          'Read a paginated feed',
          'Like and comment counts',
          'Notifications for new posts',
          'Eventual consistency is acceptable',
        ] },
        { type: 'note', value: 'A feed can tolerate a few seconds of delay. That opens the door to asynchronous fan-out and caching.' },
      ],
    },
    {
      id: 'sd-feed-fanout',
      title: 'Fan-out on write versus read',
      blocks: [
        { type: 'text', value: 'Fan-out on write pushes a new post into every follower\'s feed list. Reads are cheap. Fan-out on read pulls posts from followees when the feed is requested. Writes are cheap.' },
        { type: 'code', lang: 'text', tryIt: false, value: `write fan-out:
  post -> for each follower -> push post id to their feed list
  read: fetch the precomputed list

read fan-out:
  post -> store once
  read: fetch followees -> merge their recent posts -> sort` },
        { type: 'list', items: [
          'Write fan-out: fast reads, expensive writes for celebrities',
          'Read fan-out: cheap writes, slower reads',
          'Hybrid: write fan-out for normal users, read fan-out for celebrities',
          'Cache the first page of every active feed',
        ] },
        { type: 'note', value: 'The celebrity problem decides the design. One account with 50 million followers cannot fan out every post synchronously.' },
      ],
    },
    {
      id: 'sd-feed-storage',
      title: 'Storage and pagination',
      blocks: [
        { type: 'text', value: 'Store posts once. Store a feed list of post ids per user, capped to a reasonable size. Fetch post bodies in a batch and hydrate them.' },
        { type: 'code', lang: 'text', tryIt: false, value: `posts:   postId PK, authorId, text, media, createdAt
follows: followerId, followeeId
feed:    userId, postId, createdAt  (sorted by time)

read: feed by userId, limit 20, cursor = last postId/time
      -> batch fetch posts by id -> return` },
        { type: 'note', value: 'Use a cursor, not an offset. New posts arrive constantly, and an offset page shifts under the reader.' },
      ],
    },
    {
      id: 'sd-feed-realtime',
      title: 'Real-time and failure',
      blocks: [
        { type: 'text', value: 'For live updates, keep a WebSocket connection and push a lightweight event. The client then fetches the new page. Do not push the full feed through the socket.' },
        { type: 'list', items: [
          'WebSocket or SSE for notifications',
          'Queue for fan-out workers',
          'Retry and DLQ for failed fan-out',
          'Cache the first page per active user',
          'Degrade to read fan-out if the feed store is unavailable',
        ] },
        { type: 'note', value: 'A feed that is a few seconds stale is fine. A feed that is down is not. Design for availability over perfect freshness.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'case-study-feed',
      q: 'What is fan-out on write?',
      options: ['Pushing a post into followers\' feed lists', 'Reading posts on demand', 'Deleting a post', 'Caching images'],
      answer: 0,
      explain: 'It precomputes feeds for fast reads.',
    },
    {
      chapterId: 'case-study-feed',
      q: 'What problem does a celebrity account create?',
      options: ['Too many writes in write fan-out', 'Too many indexes', 'No followers', 'Slow DNS'],
      answer: 0,
      explain: 'Fan-out to millions of followers is expensive.',
    },
    {
      chapterId: 'case-study-feed',
      q: 'Why use a cursor for pagination?',
      options: ['Offsets shift as new posts arrive', 'It is shorter', 'It enables caching', 'It sorts the feed'],
      answer: 0,
      explain: 'A cursor is stable while the feed changes.',
    },
    {
      chapterId: 'case-study-feed',
      q: 'What should a WebSocket push?',
      options: ['The full feed', 'A lightweight event to fetch the new page', 'The database', 'A password'],
      answer: 1,
      explain: 'Pushing the full feed wastes bandwidth and duplicates logic.',
    },
  ],
};
