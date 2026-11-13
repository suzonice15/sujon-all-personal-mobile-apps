// Auth chapter: OIDC & Social Login.

export default {
  id: 'oidc-social',
  title: 'OIDC & Social Login',
  description: 'Identity tokens and provider logins',
  icon: 'login',
  lessons: [
    {
      id: 'auth-oidc',
      title: 'OpenID Connect',
      blocks: [
        { type: 'text', value: 'OpenID Connect adds an identity layer on OAuth. It returns an ID token, a JWT with claims about the user such as sub, email and name. Verify the ID token like any JWT before trusting it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `ID token claims:
  iss  https://accounts.example.com
  aud  your-client-id
  sub  unique user id
  email, name, picture, exp` },
        { type: 'note', value: 'Use sub as the stable user id. An email can change or be reused; sub does not.' },
      ],
    },
    {
      id: 'auth-social-login',
      title: 'Social login',
      blocks: [
        { type: 'text', value: 'Google, GitHub and Facebook login use OIDC. Redirect to the provider, exchange the code, verify the ID token and map sub to a local user. Offer a password option too, so users are not locked out if a provider changes.' },
        { type: 'list', items: [
          'Verify the ID token signature and claims',
          'Use sub as the external key',
          'Store provider and sub in a linked account table',
          'Do not auto-link accounts by email blindly',
          'Show which provider is linked in settings',
        ] },
        { type: 'note', value: 'Auto-linking by email lets an attacker who controls an unverified email take over an account. Require a verified email or an explicit link step.' },
      ],
    },
    {
      id: 'auth-sso-enterprise',
      title: 'Enterprise SSO',
      blocks: [
        { type: 'text', value: 'Enterprise customers often require SAML or OIDC SSO with their identity provider. That means per-tenant configuration, domain verification and SCIM for user provisioning.' },
        { type: 'list', items: [
          'One connection per tenant',
          'Domain verification before enabling',
          'Map groups to roles',
          'SCIM for provisioning and deprovisioning',
          'An admin page to configure the connection',
        ] },
        { type: 'note', value: 'SSO is a product feature, not only a protocol. Plan onboarding, support and testing per provider.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'oidc-social',
      q: 'What does OIDC add to OAuth?',
      options: ['Encryption', 'An identity layer with an ID token', 'A database', 'A UI'],
      answer: 1,
      explain: 'OIDC proves who the user is.',
    },
    {
      chapterId: 'oidc-social',
      q: 'Which claim is the stable user id?',
      options: ['email', 'name', 'sub', 'picture'],
      answer: 2,
      explain: 'sub is the unique subject id.',
    },
    {
      chapterId: 'oidc-social',
      q: 'Why not auto-link by email?',
      options: ['It is slow', 'An attacker with an unverified email could take over', 'It breaks OAuth', 'It is not standard'],
      answer: 1,
      explain: 'Email linking needs verification.',
    },
    {
      chapterId: 'oidc-social',
      q: 'What is SCIM for?',
      options: ['Styling', 'Provisioning and deprovisioning users', 'Encryption', 'Pagination'],
      answer: 1,
      explain: 'SCIM automates user lifecycle.',
    },
  ],
};
