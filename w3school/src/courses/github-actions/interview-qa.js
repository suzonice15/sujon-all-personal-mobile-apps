// GitHub Actions interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is GitHub Actions?',
      a: 'A CI/CD service built into GitHub that runs YAML workflows on events such as push and pull_request.',
      level: 'basic',
    },
    {
      q: 'Where do workflow files live?',
      a: 'In .github/workflows at the repository root.',
      level: 'basic',
    },
    {
      q: 'What is a runner?',
      a: 'The machine, hosted or self-hosted, that executes a job.',
      level: 'basic',
    },
    {
      q: 'How do you debug a failing workflow?',
      a: 'Read the failing step log, reproduce the commands locally, then re-run only the failed jobs.',
      level: 'intermediate',
    },
  ],
  'workflow-syntax': [
    {
      q: 'What are the main workflow keys?',
      a: 'name, on, jobs, runs-on and steps, plus env, permissions and concurrency.',
      level: 'basic',
    },
    {
      q: 'How do expressions work?',
      a: 'They use ${{ }} and read contexts such as github, env, secrets and matrix.',
      level: 'basic',
    },
    {
      q: 'Why avoid printing secrets?',
      a: 'Masking only replaces exact matches; transformations can leak the value into logs.',
      level: 'intermediate',
    },
    {
      q: 'What is github.sha?',
      a: 'The commit hash that triggered the workflow.',
      level: 'basic',
    },
  ],
  triggers: [
    {
      q: 'What does a paths filter do?',
      a: 'It runs the workflow only when matching files change, skipping unrelated work.',
      level: 'basic',
    },
    {
      q: 'Do fork pull requests get secrets?',
      a: 'No, by default, to protect secrets from untrusted code.',
      level: 'intermediate',
    },
    {
      q: 'What timezone does schedule use?',
      a: 'UTC. Scheduled runs can also be delayed under load.',
      level: 'basic',
    },
    {
      q: 'What does concurrency cancel-in-progress do?',
      a: 'It cancels an older run in the same group when a new one starts.',
      level: 'intermediate',
    },
  ],
  'jobs-steps': [
    {
      q: 'Jobs versus steps?',
      a: 'Jobs run on separate runners and can run in parallel. Steps run in order inside one job.',
      level: 'basic',
    },
    {
      q: 'How do jobs share data?',
      a: 'Through artifacts for files and outputs for small values. They do not share a filesystem.',
      level: 'intermediate',
    },
    {
      q: 'Why pin an action version?',
      a: 'A moving tag such as @main can change behavior or be compromised. Pin a version or SHA.',
      level: 'intermediate',
    },
    {
      q: 'What does needs do?',
      a: 'It makes a job wait for the listed jobs to succeed.',
      level: 'basic',
    },
  ],
  'secrets-env': [
    {
      q: 'How do env scopes resolve?',
      a: 'Workflow, job and step scopes; the narrowest one wins.',
      level: 'basic',
    },
    {
      q: 'What are the limits of secret masking?',
      a: 'It masks exact string matches. Derived values, base64 or partial output are not masked.',
      level: 'advanced',
    },
    {
      q: 'What does an environment add?',
      a: 'Protection rules such as required reviewers, wait timers and environment-scoped secrets.',
      level: 'intermediate',
    },
    {
      q: 'Why use OIDC?',
      a: 'It issues short-lived cloud credentials, removing long-lived stored keys.',
      level: 'advanced',
    },
  ],
  'caching-matrix': [
    {
      q: 'How should a cache key be built?',
      a: 'From a lockfile hash, with restore-keys for partial matches.',
      level: 'basic',
    },
    {
      q: 'What does fail-fast false do?',
      a: 'It lets the other matrix jobs finish instead of cancelling them on the first failure.',
      level: 'basic',
    },
    {
      q: 'How do you make a workflow reusable?',
      a: 'Add on.workflow_call with inputs and secrets, then call it with uses.',
      level: 'intermediate',
    },
    {
      q: 'What is the cost of a large matrix?',
      a: 'Every cell is a separate runner, multiplying minutes and cost.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design a CI pipeline?',
      a: 'Checkout, cached install, lint, test, build, upload artifact, then a gated deploy job with an environment.',
      level: 'intermediate',
    },
    {
      q: 'How do you keep a pipeline fast?',
      a: 'Cache dependencies, cancel superseded runs, run cheap checks first, keep the matrix small and parallelize independent jobs.',
      level: 'intermediate',
    },
    {
      q: 'How do you keep third-party actions safe?',
      a: 'Pin versions or SHAs, review the source, limit GITHUB_TOKEN permissions and avoid running untrusted code with secrets.',
      level: 'advanced',
    },
    {
      q: 'What is the best first step?',
      a: 'A single workflow that installs dependencies and runs tests on pull requests.',
      level: 'basic',
    },
  ],
};
