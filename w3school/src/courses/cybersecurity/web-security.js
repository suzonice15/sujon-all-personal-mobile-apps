// Security chapter: Web Security.

export default {
  id: 'web-security',
  title: 'Web Security',
  description: 'Injection, XSS, CSRF and access control bugs',
  icon: 'language',
  lessons: [
    {
      id: 'sec-injection',
      title: 'Injection',
      blocks: [
        { type: 'text', value: 'Injection happens when untrusted input becomes code or a query. SQL injection is the classic: a value changes the structure of the query.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Vulnerable
const sql = "SELECT * FROM users WHERE email = '" + email + "'";

// Safe: parameterized query
const [rows] = await db.executeSql(
  'SELECT id, name FROM users WHERE email = ?',
  [email]
);` },
        { type: 'list', items: [
          'SQL injection - use placeholders',
          'Command injection - never pass input to a shell',
          'NoSQL injection - reject operator objects',
          'Template injection - do not render user input as a template',
          'LDAP and header injection - validate and encode',
        ] },
        { type: 'note', value: 'Input validation helps, but parameterization is the real fix. Validation alone cannot make concatenated SQL safe.' },
      ],
    },
    {
      id: 'sec-xss',
      title: 'XSS',
      blocks: [
        { type: 'text', value: 'Cross-site scripting runs attacker JavaScript in another user\'s browser. Stored XSS comes from saved data; reflected XSS comes from the request; DOM XSS comes from unsafe client code.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Bad:  element.innerHTML = userComment;
Good: element.textContent = userComment;

Server: encode output for HTML context
Headers: Content-Security-Policy: default-src 'self'` },
        { type: 'list', items: [
          'Encode output for the context: HTML, attribute, JS, URL',
          'Prefer textContent over innerHTML',
          'Sanitize rich HTML with a vetted library',
          'Use a strict Content-Security-Policy',
          'Never put tokens in localStorage if an HttpOnly cookie works',
        ] },
        { type: 'note', value: 'XSS is an output problem, not an input problem. The same string is safe in one context and dangerous in another.' },
      ],
    },
    {
      id: 'sec-csrf-ssrf',
      title: 'CSRF and SSRF',
      blocks: [
        { type: 'text', value: 'CSRF makes a logged-in user send a request they did not intend. SSRF makes the server request an internal URL on the attacker\'s behalf.' },
        { type: 'code', lang: 'text', tryIt: false, value: `CSRF defense:
- SameSite=Lax or Strict cookies
- CSRF token for state-changing requests
- Check Origin / Referer

SSRF defense:
- allow-list outbound hosts
- block private IP ranges
- do not follow redirects blindly` },
        { type: 'note', value: 'A server that can fetch any URL is a gateway into your private network. Validate the destination, not just the input format.' },
      ],
    },
    {
      id: 'sec-access-control',
      title: 'Broken access control',
      blocks: [
        { type: 'text', value: 'The most common serious bug is not injection; it is a missing ownership check. A user changes an id in the URL and reads another user\'s order.' },
        { type: 'code', lang: 'text', tryIt: false, value: `GET /api/orders/123

Bad:  find order by id
Good: find order by id AND user_id = currentUser.id` },
        { type: 'list', items: [
          'Check ownership on the server for every object',
          'Do not trust a hidden UI button',
          'Use role checks for admin routes',
          'Return 403, not 404, when the rule is clear',
          'Log access to sensitive records',
        ] },
        { type: 'note', value: 'This bug is called IDOR, insecure direct object reference. It is easy to miss in review and easy to exploit.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'web-security',
      q: 'What is the real fix for SQL injection?',
      options: ['Hiding errors', 'Parameterized queries', 'A longer password', 'HTTPS only'],
      answer: 1,
      explain: 'Values must be sent separately from SQL.',
    },
    {
      chapterId: 'web-security',
      q: 'Where does XSS run?',
      options: ['On the server', 'In another user\'s browser', 'In the database', 'In DNS'],
      answer: 1,
      explain: 'It executes attacker JavaScript in a victim browser.',
    },
    {
      chapterId: 'web-security',
      q: 'What does SameSite help prevent?',
      options: ['SQL injection', 'CSRF', 'DDoS', 'Phishing'],
      answer: 1,
      explain: 'It limits cross-site cookie sending.',
    },
    {
      chapterId: 'web-security',
      q: 'What is IDOR?',
      options: ['A firewall', 'Accessing another user\'s object by changing an id', 'A hash', 'A port scan'],
      answer: 1,
      explain: 'It is a missing ownership check.',
    },
  ],
};
