// Auth chapter: Authorization & Attacks.

export default {
  id: 'authorization-attacks',
  title: 'Authorization & Attacks',
  description: 'RBAC, ownership and the common exploits',
  icon: 'shield',
  lessons: [
    {
      id: 'auth-rbac',
      title: 'Roles and permissions',
      blocks: [
        { type: 'text', value: 'RBAC assigns permissions to roles and roles to users. ABAC adds attributes such as ownership or tenant. For most apps, a small set of roles plus an ownership check covers the real needs.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Check role and ownership together
if (user.role !== 'admin' && course.ownerId !== user.id) {
  return res.status(403).json({ error: 'Forbidden' });
}` },
        { type: 'note', value: 'Roles are coarse. The most common real bug is a user reading another user’s object because the query was not filtered by user id.' },
      ],
    },
    {
      id: 'auth-idor',
      title: 'IDOR and broken access control',
      blocks: [
        { type: 'text', value: 'Insecure Direct Object Reference means changing an id in a request to reach someone else’s data. The fix is to check that the current user owns or may access the object on every request.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Bad: any logged-in user can read any order
const order = await db.order.findUnique({ where: { id } });

// Good: scope the query to the current user
const order = await db.order.findFirst({
  where: { id, userId: session.user.id },
});` },
        { type: 'list', items: [
          'Scope every query by user or tenant',
          'Check permission, not only login',
          'Test with two different accounts',
          'Do not rely on unguessable ids',
        ] },
      ],
    },
    {
      id: 'auth-attacks',
      title: 'Common attacks',
      blocks: [
        { type: 'list', items: [
          'Credential stuffing: rate limit and check breached passwords',
          'XSS: escape output, use httpOnly cookies',
          'CSRF: sameSite plus a token',
          'Open redirect: allow-list redirect targets',
          'Token leakage: short expiry and rotation',
          'Enumeration: identical responses for unknown accounts',
        ] },
        { type: 'text', value: 'Security is layered. No single control stops everything, but each one removes a class of attack.' },
        { type: 'note', value: 'Log authentication events and alert on bursts of failures. Detection is part of defense.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'authorization-attacks',
      q: 'What is IDOR?',
      options: ['A database', 'Changing an id to access another user data', 'A token type', 'A redirect'],
      answer: 1,
      explain: 'It is broken object-level authorization.',
    },
    {
      chapterId: 'authorization-attacks',
      q: 'What fixes IDOR?',
      options: ['A longer password', 'Scope every query by the current user or tenant', 'Hide the button', 'A bigger token'],
      answer: 1,
      explain: 'Ownership must be in the query.',
    },
    {
      chapterId: 'authorization-attacks',
      q: 'What stops credential stuffing?',
      options: ['Longer ids', 'Rate limiting and breached-password checks', 'A new logo', 'Caching'],
      answer: 1,
      explain: 'Limit attempts and block weak passwords.',
    },
    {
      chapterId: 'authorization-attacks',
      q: 'How do you prevent open redirect?',
      options: ['Allow any URL', 'Allow-list the redirect targets', 'Use GET', 'Disable HTTPS'],
      answer: 1,
      explain: 'Only known destinations should be allowed.',
    },
  ],
};
