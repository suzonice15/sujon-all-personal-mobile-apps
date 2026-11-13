// Django interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Django?',
      a: 'A high-level Python web framework with an ORM, migrations, admin, auth, forms and security defaults built in.',
      level: 'basic',
    },
    {
      q: 'Project versus app?',
      a: 'A project holds settings and URLs. An app is a reusable module with models, views and tests.',
      level: 'basic',
    },
    {
      q: 'What is a view?',
      a: 'A function or class that receives a request and returns a response.',
      level: 'basic',
    },
    {
      q: 'Why use a virtual environment?',
      a: 'To isolate dependencies and pin versions per project.',
      level: 'basic',
    },
  ],
  'models-migrations': [
    {
      q: 'What is a model?',
      a: 'A Python class that maps to a database table, with fields as columns.',
      level: 'basic',
    },
    {
      q: 'How do migrations work?',
      a: 'makemigrations generates a versioned schema change from the models; migrate applies it to the database.',
      level: 'basic',
    },
    {
      q: 'ForeignKey versus ManyToMany?',
      a: 'ForeignKey is many-to-one. ManyToMany connects both directions through a join table.',
      level: 'intermediate',
    },
    {
      q: 'Why avoid FloatField for money?',
      a: 'Floating point loses precision. Use DecimalField or an integer of the smallest currency unit.',
      level: 'intermediate',
    },
  ],
  'views-urls': [
    {
      q: 'What does include() do?',
      a: 'It mounts another URL configuration under a prefix, keeping app routes modular.',
      level: 'basic',
    },
    {
      q: 'When use a class-based view?',
      a: 'For standard list, detail, create and update screens. Use a function view when the logic is custom.',
      level: 'intermediate',
    },
    {
      q: 'What does get_object_or_404 do?',
      a: 'It fetches an object or returns a 404 response instead of raising an unhandled exception.',
      level: 'basic',
    },
    {
      q: 'Why name routes?',
      a: 'So reverse() and the {% url %} tag build paths that stay correct when URLs change.',
      level: 'basic',
    },
  ],
  templates: [
    {
      q: 'Why does Django escape template variables?',
      a: 'To prevent XSS. Only use |safe on trusted HTML you generated.',
      level: 'basic',
    },
    {
      q: 'How does template inheritance work?',
      a: 'A base template defines blocks; child templates extend it and fill those blocks.',
      level: 'basic',
    },
    {
      q: 'What is the empty case in a for loop?',
      a: 'The {% empty %} block renders when the list is empty, instead of showing nothing.',
      level: 'basic',
    },
    {
      q: 'Why use the static tag?',
      a: 'It builds the correct static URL in development and production, including hashed filenames.',
      level: 'intermediate',
    },
  ],
  forms: [
    {
      q: 'What does a Django form handle?',
      a: 'Rendering fields, validating input, showing errors and CSRF protection.',
      level: 'basic',
    },
    {
      q: 'Where does custom field validation go?',
      a: 'In a clean_<field> method, which raises ValidationError for bad input.',
      level: 'intermediate',
    },
    {
      q: 'What is a ModelForm?',
      a: 'A form generated from a model, with explicit fields so sensitive fields cannot be mass-assigned.',
      level: 'basic',
    },
    {
      q: 'What does {% csrf_token %} do?',
      a: 'It adds a token that protects POST forms from cross-site request forgery.',
      level: 'basic',
    },
  ],
  'admin-auth': [
    {
      q: 'What is the Django admin?',
      a: 'A generated internal CRUD interface for models. It is for staff, not the public UI.',
      level: 'basic',
    },
    {
      q: 'How are passwords stored?',
      a: 'As salted hashes using a configurable password hasher. Plain text is never stored.',
      level: 'basic',
    },
    {
      q: 'What is @login_required?',
      a: 'A decorator that redirects anonymous users to the login page.',
      level: 'basic',
    },
    {
      q: 'Why filter queries by the current user?',
      a: 'Hiding a button is not authorization. The server must enforce ownership on every query.',
      level: 'intermediate',
    },
  ],
  'orm-performance': [
    {
      q: 'When does a queryset execute?',
      a: 'When it is iterated, sliced or evaluated, not when it is created.',
      level: 'basic',
    },
    {
      q: 'How do you fix an N+1 on a foreign key?',
      a: 'Use select_related to join the related row in the same query.',
      level: 'intermediate',
    },
    {
      q: 'When use prefetch_related?',
      a: 'For many-to-many and reverse relations, where Django runs a second batched query.',
      level: 'intermediate',
    },
    {
      q: 'How do you choose an index?',
      a: 'Index columns used in filters and ordering, check the query plan, and accept the write cost.',
      level: 'advanced',
    },
  ],
  'rest-drf': [
    {
      q: 'What does a serializer do?',
      a: 'It converts models to JSON and validates incoming data in both directions.',
      level: 'basic',
    },
    {
      q: 'What is a ViewSet?',
      a: 'A class that groups list, create, retrieve, update and destroy actions for one resource.',
      level: 'basic',
    },
    {
      q: 'Why paginate API lists?',
      a: 'An unbounded list is slow, memory-heavy and risky to expose.',
      level: 'basic',
    },
    {
      q: 'Why separate read and write serializers?',
      a: 'The shapes differ, and separate serializers prevent leaking or mass-assigning fields.',
      level: 'advanced',
    },
  ],
  'testing-deployment': [
    {
      q: 'What does Django TestCase isolate?',
      a: 'It creates a test database and rolls back changes after each test.',
      level: 'basic',
    },
    {
      q: 'Why set DEBUG=False in production?',
      a: 'Debug pages expose stack traces, settings and SQL that help an attacker.',
      level: 'basic',
    },
    {
      q: 'What does collectstatic do?',
      a: 'It gathers static files into STATIC_ROOT for the web server or CDN.',
      level: 'basic',
    },
    {
      q: 'Why run migrations before starting the new code?',
      a: 'So the schema is ready when the new version begins serving traffic.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you structure a Django API?',
      a: 'A project with settings and URLs, and an app with models, serializers, viewsets, admin, tests and environment-based settings.',
      level: 'intermediate',
    },
    {
      q: 'How do you secure a Django API?',
      a: 'HTTPS, DEBUG off, a secret from the environment, explicit permissions, filtered querysets and validated input.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug a slow endpoint?',
      a: 'Check the query count and SQL, fix N+1 with select_related or prefetch_related, and add indexes where needed.',
      level: 'advanced',
    },
    {
      q: 'What is the best first Django step?',
      a: 'Build one app with a model, a view and a template, then add forms, auth and an API.',
      level: 'basic',
    },
  ],
};
