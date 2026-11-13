// CodeIgniter interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is CodeIgniter?',
      a: 'A lightweight PHP MVC framework with routing, models, validation and security helpers, known for a small footprint and fast setup.',
      level: 'basic',
    },
    {
      q: 'Which version is current?',
      a: 'CodeIgniter 4. New projects should not use version 3.',
      level: 'basic',
    },
    {
      q: 'Why point the server at public/?',
      a: 'Only public/ should be served, so app config, .env and vendor code are not reachable.',
      level: 'basic',
    },
    {
      q: 'What does a controller do?',
      a: 'It handles a request, calls a model or service, and returns a view or response.',
      level: 'basic',
    },
  ],
  'routing-controllers': [
    {
      q: 'How do route groups help?',
      a: 'They apply a prefix and filters to a set of routes, keeping auth and path rules in one place.',
      level: 'basic',
    },
    {
      q: 'What are filters?',
      a: 'Code that runs before or after a controller, used for authentication, CORS and rate limiting.',
      level: 'intermediate',
    },
    {
      q: 'Why keep controllers thin?',
      a: 'Business logic is easier to test and reuse in a model or service.',
      level: 'intermediate',
    },
    {
      q: 'How do you read a JSON body?',
      a: '$this->request->getJSON() returns the decoded body.',
      level: 'basic',
    },
  ],
  'models-database': [
    {
      q: 'What does allowedFields do?',
      a: 'It limits which columns can be mass-assigned, protecting sensitive fields.',
      level: 'basic',
    },
    {
      q: 'Why use the query builder?',
      a: 'It binds values safely, which prevents SQL injection, and composes complex queries readably.',
      level: 'basic',
    },
    {
      q: 'What is a migration?',
      a: 'A versioned schema change with an up and down method.',
      level: 'basic',
    },
    {
      q: 'When use raw SQL?',
      a: 'For complex reports where the builder becomes unreadable, with bound parameters.',
      level: 'advanced',
    },
  ],
  'views-templates': [
    {
      q: 'Why escape output?',
      a: 'To prevent XSS. Use esc() on any user-provided value.',
      level: 'basic',
    },
    {
      q: 'How do you share a layout?',
      a: 'Extend a layout view and fill its sections, instead of copying the header and footer.',
      level: 'basic',
    },
    {
      q: 'Why use base_url()?',
      a: 'It builds URLs that work in a subfolder or on another host.',
      level: 'basic',
    },
    {
      q: 'Where do assets live?',
      a: 'In public/, served directly by the web server.',
      level: 'basic',
    },
  ],
  'forms-validation': [
    {
      q: 'How do validation rules look?',
      a: 'Pipe-separated strings such as required|min_length[3]|integer.',
      level: 'basic',
    },
    {
      q: 'Where must validation run?',
      a: 'On the server. Client validation is only for user experience.',
      level: 'basic',
    },
    {
      q: 'How do you protect a form from CSRF?',
      a: 'Enable the CSRF filter and add csrf_field() to the form.',
      level: 'intermediate',
    },
    {
      q: 'Why preserve old input?',
      a: 'So the user does not retype valid fields after one error.',
      level: 'basic',
    },
  ],
  'auth-security': [
    {
      q: 'How are passwords stored?',
      a: 'With password_hash and verified with password_verify. Never plain text.',
      level: 'basic',
    },
    {
      q: 'Why regenerate the session after login?',
      a: 'To prevent session fixation.',
      level: 'intermediate',
    },
    {
      q: 'How do you protect routes?',
      a: 'With an auth filter that checks the session, plus ownership checks in the controller.',
      level: 'intermediate',
    },
    {
      q: 'What should CI_ENVIRONMENT be in production?',
      a: 'production, so detailed errors and debug output are disabled.',
      level: 'basic',
    },
  ],
  'testing-deployment': [
    {
      q: 'What test tools ship with CodeIgniter?',
      a: 'PHPUnit plus FeatureTestTrait for HTTP-level tests.',
      level: 'basic',
    },
    {
      q: 'Where do secrets belong?',
      a: 'In .env, which is never committed. Keep a .env.example without secrets.',
      level: 'basic',
    },
    {
      q: 'What runs during deploy?',
      a: 'Composer install, migrations and cache warm-up, then a health check.',
      level: 'intermediate',
    },
    {
      q: 'Why a health endpoint?',
      a: 'So a load balancer can check whether the app can serve traffic.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you structure a CodeIgniter app?',
      a: 'Controllers, models, views, filters, config and migrations, with validation and auth in place.',
      level: 'intermediate',
    },
    {
      q: 'CodeIgniter versus Laravel?',
      a: 'CodeIgniter is smaller and faster to boot with fewer conventions. Laravel has more built-in features and a larger ecosystem.',
      level: 'intermediate',
    },
    {
      q: 'How do you secure the app?',
      a: 'Escape output, use bound queries, enable CSRF, hash passwords, protect routes and set production mode.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first step?',
      a: 'Install, set up a route, a controller and a view, then add a model and migrations.',
      level: 'basic',
    },
  ],
};
