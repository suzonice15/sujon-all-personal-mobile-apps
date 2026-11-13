// Authentication & OAuth interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'Authentication versus authorization?',
      a: 'Authentication proves who the caller is. Authorization decides what they may do.',
      level: 'basic',
    },
    {
      q: '401 versus 403?',
      a: '401 means not authenticated. 403 means authenticated but not allowed.',
      level: 'basic',
    },
    {
      q: 'Session versus JWT?',
      a: 'A session stores state on the server and is easy to revoke. A JWT is stateless and easy to scale, but revocation is harder.',
      level: 'intermediate',
    },
    {
      q: 'Why is a hidden button not authorization?',
      a: 'The client can call the API directly. The server must enforce every rule.',
      level: 'basic',
    },
  ],
  passwords: [
    {
      q: 'How should passwords be stored?',
      a: 'As salted hashes using a slow algorithm such as Argon2, bcrypt or scrypt.',
      level: 'basic',
    },
    {
      q: 'Why not SHA-256 alone?',
      a: 'It is fast, so an attacker can try billions of guesses per second.',
      level: 'intermediate',
    },
    {
      q: 'How should a reset token work?',
      a: 'Random, single-use, stored hashed and expiring in 15 to 60 minutes.',
      level: 'intermediate',
    },
    {
      q: 'Why return the same message for reset?',
      a: 'Different messages reveal which accounts exist, enabling enumeration.',
      level: 'intermediate',
    },
  ],
  'sessions-cookies': [
    {
      q: 'What does httpOnly do?',
      a: 'It prevents JavaScript from reading the cookie, which blunts XSS token theft.',
      level: 'basic',
    },
    {
      q: 'What does sameSite do?',
      a: 'It limits when the browser sends the cookie on cross-site requests, reducing CSRF.',
      level: 'intermediate',
    },
    {
      q: 'Why regenerate the session id after login?',
      a: 'To prevent session fixation, where an attacker pre-sets a known id.',
      level: 'intermediate',
    },
    {
      q: 'How do you stop CSRF?',
      a: 'sameSite cookies plus a per-session token checked on state-changing requests.',
      level: 'intermediate',
    },
  ],
  jwt: [
    {
      q: 'Is a JWT encrypted?',
      a: 'No. It is signed and base64url encoded, so anyone can read the payload.',
      level: 'basic',
    },
    {
      q: 'What must you verify on a JWT?',
      a: 'Signature, allowed algorithm, expiry, issuer and audience.',
      level: 'intermediate',
    },
    {
      q: 'Why short-lived access tokens?',
      a: 'A stolen token is valid only until expiry. Refresh tokens allow a longer session.',
      level: 'intermediate',
    },
    {
      q: 'How do you log out with stateless tokens?',
      a: 'Delete the refresh token and keep access tokens short. A denylist can revoke specific tokens if needed.',
      level: 'advanced',
    },
  ],
  oauth2: [
    {
      q: 'What is OAuth 2.0 for?',
      a: 'Delegated authorization: letting an app access limited data without the user password.',
      level: 'basic',
    },
    {
      q: 'How does the authorization code flow work?',
      a: 'Redirect to the provider, user consents, callback with a code, server exchanges code plus secret for tokens.',
      level: 'intermediate',
    },
    {
      q: 'What is the state parameter for?',
      a: 'Preventing CSRF on the callback by tying it to the original request.',
      level: 'intermediate',
    },
    {
      q: 'Why use PKCE?',
      a: 'Public clients cannot keep a secret. PKCE binds the code exchange to a verifier so a stolen code is useless.',
      level: 'advanced',
    },
  ],
  'oidc-social': [
    {
      q: 'What does OIDC add?',
      a: 'An identity layer with an ID token containing verified claims about the user.',
      level: 'basic',
    },
    {
      q: 'Which claim identifies the user?',
      a: 'sub, the stable subject id. Email can change or be reused.',
      level: 'basic',
    },
    {
      q: 'Why not link accounts by email automatically?',
      a: 'An attacker with an unverified email could take over an account. Require verification or an explicit link.',
      level: 'advanced',
    },
    {
      q: 'What is SCIM?',
      a: 'A standard for provisioning and deprovisioning users between an identity provider and an app.',
      level: 'intermediate',
    },
  ],
  'mfa-passkeys': [
    {
      q: 'What is MFA?',
      a: 'Requiring more than one factor: something you know, have or are.',
      level: 'basic',
    },
    {
      q: 'Why are passkeys phishing resistant?',
      a: 'The credential is bound to the site origin, so a fake domain cannot use it.',
      level: 'intermediate',
    },
    {
      q: 'What does the server store for WebAuthn?',
      a: 'The public key and credential id. The private key never leaves the device.',
      level: 'intermediate',
    },
    {
      q: 'Why protect account recovery?',
      a: 'A weak recovery flow bypasses MFA entirely.',
      level: 'advanced',
    },
  ],
  'authorization-attacks': [
    {
      q: 'What is IDOR?',
      a: 'Changing an object id to access data you do not own. It is broken object-level authorization.',
      level: 'basic',
    },
    {
      q: 'How do you prevent IDOR?',
      a: 'Scope every query by the current user or tenant and check permission on the object.',
      level: 'intermediate',
    },
    {
      q: 'What is credential stuffing?',
      a: 'Trying leaked username and password pairs across sites. Rate limiting and breached-password checks reduce it.',
      level: 'intermediate',
    },
    {
      q: 'How do you prevent open redirect?',
      a: 'Allow-list the redirect targets instead of accepting any URL.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you build an auth system?',
      a: 'Hashed passwords, httpOnly sessions or short-lived tokens, CSRF protection, rate limiting, MFA with recovery, verified email and ownership checks.',
      level: 'intermediate',
    },
    {
      q: 'How do you test auth?',
      a: 'Test success and failure paths with two accounts, including IDOR, expired tokens and reset abuse.',
      level: 'intermediate',
    },
    {
      q: 'What is the most common auth bug?',
      a: 'Missing object-level authorization: a logged-in user reads another user data.',
      level: 'advanced',
    },
    {
      q: 'What is the best first auth step?',
      a: 'Build login and a protected route with hashed passwords and a secure session cookie.',
      level: 'basic',
    },
  ],
};
