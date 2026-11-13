// DevOps interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is DevOps?',
      a: 'A practice that joins development and operations with automation, shared ownership and fast feedback so changes ship safely and often.',
      level: 'basic',
    },
    {
      q: 'What does a delivery pipeline contain?',
      a: 'Build, test, scan, package, deploy, verify and monitor, with a rollback path.',
      level: 'basic',
    },
    {
      q: 'Which four metrics describe delivery?',
      a: 'Lead time, deployment frequency, change failure rate and time to restore.',
      level: 'intermediate',
    },
    {
      q: 'Why deploy the exact artifact that passed tests?',
      a: 'Rebuilding can produce a different binary, so the tested artifact is the only one you can trust.',
      level: 'intermediate',
    },
  ],
  'ci-cd': [
    {
      q: 'What is CI?',
      a: 'Continuous integration: every change is built and tested automatically, so integration problems surface early.',
      level: 'basic',
    },
    {
      q: 'What is CD?',
      a: 'Continuous delivery keeps every change releasable. Continuous deployment releases automatically after the pipeline passes.',
      level: 'basic',
    },
    {
      q: 'Why cache dependencies in CI?',
      a: 'It cuts build time by reusing downloaded packages between runs.',
      level: 'intermediate',
    },
    {
      q: 'How do you use short-lived credentials in CI?',
      a: 'Use OIDC federation so the CI provider gets a temporary token instead of a stored cloud key.',
      level: 'advanced',
    },
  ],
  deployment: [
    {
      q: 'What is a zero-downtime deploy?',
      a: 'Starting a new version, waiting until it is healthy, then removing the old one, so traffic never hits a dead instance.',
      level: 'intermediate',
    },
    {
      q: 'Blue-green versus canary?',
      a: 'Blue-green switches all traffic to a parallel environment. Canary sends a small share first and watches metrics.',
      level: 'intermediate',
    },
    {
      q: 'Why use a reverse proxy?',
      a: 'It handles HTTPS, routing and load balancing, and can serve static files.',
      level: 'basic',
    },
    {
      q: 'How do you roll back safely?',
      a: 'Keep the previous artifact and a documented command or pipeline step, and verify the health check after rollback.',
      level: 'basic',
    },
  ],
  'monitoring-logs': [
    {
      q: 'What should you monitor?',
      a: 'Errors, latency, traffic and saturation, plus business measures that matter.',
      level: 'basic',
    },
    {
      q: 'Why centralise logs?',
      a: 'A container or server can disappear, and logs across many hosts are only useful when searchable in one place.',
      level: 'basic',
    },
    {
      q: 'What is a post-mortem?',
      a: 'A blameless review after an incident that records the timeline, causes and follow-up actions.',
      level: 'intermediate',
    },
    {
      q: 'What makes an alert useful?',
      a: 'It is tied to a user-facing symptom, has an owner and includes a runbook.',
      level: 'intermediate',
    },
  ],
  security: [
    {
      q: 'Why run containers as non-root?',
      a: 'It limits what a compromised process can do inside the container and against the host.',
      level: 'basic',
    },
    {
      q: 'How do you handle secrets?',
      a: 'Inject them at runtime from a secret store, never bake them into an image or commit them.',
      level: 'basic',
    },
    {
      q: 'What does an image scan find?',
      a: 'Known vulnerabilities in the base image and installed packages.',
      level: 'intermediate',
    },
    {
      q: 'Why drop Linux capabilities?',
      a: 'Most apps need only a small set. Dropping the rest reduces the attack surface.',
      level: 'advanced',
    },
  ],
  'kubernetes-intro': [
    {
      q: 'What does Kubernetes do?',
      a: 'It schedules containers across nodes, restarts failures, scales replicas and provides service discovery.',
      level: 'basic',
    },
    {
      q: 'What is a Pod?',
      a: 'The smallest deployable unit: one or more containers sharing a network and storage.',
      level: 'basic',
    },
    {
      q: 'What does a Deployment manage?',
      a: 'Replicas and rolling updates of a pod template.',
      level: 'intermediate',
    },
    {
      q: 'When is Kubernetes overkill?',
      a: 'For a small app on one server. Compose or a managed platform is simpler until orchestration is needed.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'What does a complete pipeline include?',
      a: 'Test, build, scan, deploy to staging, verify, promote with approval, verify production and a rollback path.',
      level: 'intermediate',
    },
    {
      q: 'Why add a manual approval before production?',
      a: 'It is a cheap safety net and creates a record of who released what.',
      level: 'basic',
    },
    {
      q: 'How do you debug a failed deploy?',
      a: 'Read the pipeline logs, check the health endpoint and recent changes, then roll back if the cause is not clear.',
      level: 'advanced',
    },
    {
      q: 'What is the best first DevOps step?',
      a: 'Automate tests and a build for one small app, then add deploy and monitoring.',
      level: 'basic',
    },
  ],
};
