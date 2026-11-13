// CodeIgniter chapter: Auth & Security.

export default {
  id: 'auth-security',
  title: 'Auth & Security',
  description: 'Sessions, password hashing and permissions',
  icon: 'lock',
  lessons: [
    {
      id: 'ci-sessions-auth',
      title: 'Sessions and login',
      blocks: [
        { type: 'text', value: 'CodeIgniter sessions store login state on the server. Hash passwords with password_hash and verify with password_verify. Set the session cookie to secure and httpOnly in production.' },
        { type: 'code', lang: 'php', tryIt: false, value: `$hash = password_hash($password, PASSWORD_DEFAULT);

if (password_verify($password, $user['password_hash'])) {
    session()->set([
        'userId' => $user['id'],
        'role' => $user['role'],
    ]);
    session()->regenerate();
}` },
        { type: 'note', value: 'Regenerate the session id after login to prevent session fixation.' },
      ],
    },
    {
      id: 'ci-logout',
      title: 'Logout and protection',
      blocks: [
        { type: 'text', value: 'Logout destroys the session. Protect routes with an auth filter and check ownership for every object. Hiding a link is not authorization.' },
        { type: 'code', lang: 'php', tryIt: false, value: `public function logout()
{
    session()->destroy();
    return redirect()->to('/login');
}

// Ownership check in a controller
if ($order['user_id'] !== session('userId') && session('role') !== 'admin') {
    return $this->response->setStatusCode(403);
}` },
        { type: 'list', items: [
          'Destroy the session on logout',
          'Auth filter on protected routes',
          'Ownership check on every object',
          'HTTPS and secure cookies',
          'Rate limit login attempts',
        ] },
      ],
    },
    {
      id: 'ci-security',
      title: 'Security checklist',
      blocks: [
        { type: 'list', items: [
          'Escape output with esc()',
          'Use the query builder for SQL',
          'Enable CSRF for browser forms',
          'Set a strong encryption key',
          'Disable detailed errors in production',
          'Keep dependencies updated',
        ] },
        { type: 'text', value: 'Set CI_ENVIRONMENT to production in .env. Development errors expose file paths and stack traces to users.' },
        { type: 'note', value: 'Most PHP breaches are old dependencies, missing escaping and exposed debug pages. Fix those first.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'auth-security',
      q: 'How should passwords be stored?',
      options: ['Plain text', 'password_hash with a salt', 'MD5', 'Base64'],
      answer: 1,
      explain: 'Use password_hash and password_verify.',
    },
    {
      chapterId: 'auth-security',
      q: 'Why regenerate the session after login?',
      options: ['To save memory', 'To prevent session fixation', 'To enable CSRF', 'To cache'],
      answer: 1,
      explain: 'A new id invalidates a pre-set session.',
    },
    {
      chapterId: 'auth-security',
      q: 'What does session()->destroy() do?',
      options: ['Deletes the database', 'Ends the session on logout', 'Creates a user', 'Caches data'],
      answer: 1,
      explain: 'It clears the session.',
    },
    {
      chapterId: 'auth-security',
      q: 'Why set CI_ENVIRONMENT to production?',
      options: ['For speed', 'To hide detailed errors and enable production behavior', 'To enable CSRF', 'To compile PHP'],
      answer: 1,
      explain: 'Debug pages must not be public.',
    },
  ],
};
