// Cloud interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is IaaS, PaaS and SaaS?',
      a: 'IaaS rents infrastructure such as VMs and networks. PaaS provides a managed runtime. SaaS is a finished product. The more managed the service, the less you operate.',
      level: 'basic',
    },
    {
      q: 'What is an availability zone?',
      a: 'An isolated data center within a region with independent power and network. Deploying across zones survives one facility failure.',
      level: 'basic',
    },
    {
      q: 'What is the shared responsibility model?',
      a: 'The provider secures physical infrastructure and managed service internals; you secure identities, configuration, data and application code.',
      level: 'intermediate',
    },
    {
      q: 'Why choose a region close to users?',
      a: 'Lower latency and often lower data-transfer cost. Also check data-residency rules for personal data.',
      level: 'intermediate',
    },
  ],
  compute: [
    {
      q: 'VM versus container versus serverless?',
      a: 'A VM is a full OS you manage. A container packages the app and runtime and shares the host kernel. Serverless runs code on demand with no server to manage.',
      level: 'basic',
    },
    {
      q: 'What is a cold start?',
      a: 'The delay before an idle serverless function or scaled-to-zero container starts. Keep the image small and initialise clients outside the handler.',
      level: 'intermediate',
    },
    {
      q: 'When is serverless a poor fit?',
      a: 'For long CPU-heavy jobs, stateful servers or workloads with strict latency and no cold starts. Use containers or VMs instead.',
      level: 'advanced',
    },
  ],
  storage: [
    {
      q: 'Object versus block storage?',
      a: 'Object storage stores files in buckets over HTTP. Block storage is a disk attached to a VM with low latency, used by databases.',
      level: 'basic',
    },
    {
      q: 'Why is a public bucket dangerous?',
      a: 'Anyone with the URL can read the data. Public access should be a deliberate exception, not a default.',
      level: 'basic',
    },
    {
      q: 'What do lifecycle rules do?',
      a: 'They move data to cheaper storage classes or delete it after a period, controlling cost automatically.',
      level: 'intermediate',
    },
  ],
  networking: [
    {
      q: 'What is a VPC?',
      a: 'An isolated virtual network. Subnets divide it by region and availability zone, and route tables control traffic.',
      level: 'basic',
    },
    {
      q: 'Public versus private subnet?',
      a: 'A public subnet can reach the internet through a gateway. A private subnet cannot, so databases and internal services live there.',
      level: 'basic',
    },
    {
      q: 'Why reference a security group as a source?',
      a: 'It follows the resource when its IP changes and is safer than a hardcoded CIDR block.',
      level: 'intermediate',
    },
    {
      q: 'What does a load balancer health check do?',
      a: 'It removes unhealthy targets from rotation so traffic only reaches instances that can serve requests.',
      level: 'intermediate',
    },
  ],
  databases: [
    {
      q: 'What does a managed database handle?',
      a: 'Backups, patching, failover and monitoring. You still own schema, indexes, queries and access control.',
      level: 'basic',
    },
    {
      q: 'Backup versus replica?',
      a: 'A backup is a restorable copy. A replica is a live copy for reads or failover. They solve different problems.',
      level: 'intermediate',
    },
    {
      q: 'How do you prove a backup works?',
      a: 'Restore it to a test environment and verify the data. An untested backup is unverified.',
      level: 'intermediate',
    },
  ],
  iam: [
    {
      q: 'What is a role?',
      a: 'An identity assumed temporarily by a workload, issuing short-lived credentials. Prefer roles over long-lived access keys.',
      level: 'basic',
    },
    {
      q: 'What is least privilege?',
      a: 'Giving each identity only the actions and resources it needs. Start with nothing and add explicitly.',
      level: 'basic',
    },
    {
      q: 'Why use OIDC in CI instead of a cloud key?',
      a: 'The CI provider issues a short-lived identity token that the cloud trusts. There is no long-lived key to leak.',
      level: 'advanced',
    },
  ],
  deployment: [
    {
      q: 'What is infrastructure as code?',
      a: 'Describing infrastructure in versioned files so it can be reviewed, recreated and rolled back. Terraform is a common multi-cloud tool.',
      level: 'basic',
    },
    {
      q: 'Why separate environments?',
      a: 'To isolate data and reduce production risk. Staging should resemble production but never share its credentials or database.',
      level: 'intermediate',
    },
    {
      q: 'What should a CI deploy?',
      a: 'The exact artifact that passed tests, ideally addressed by digest or commit SHA. Rebuilding during deploy can produce a different binary.',
      level: 'advanced',
    },
  ],
  'monitoring-cost': [
    {
      q: 'What should alerts focus on?',
      a: 'Symptoms users feel: errors, latency and availability. Not every CPU spike is an incident.',
      level: 'basic',
    },
    {
      q: 'What causes cloud waste?',
      a: 'Idle resources, oversized instances, forgotten disks and snapshots, and egress. Budget alerts and lifecycle rules help.',
      level: 'intermediate',
    },
    {
      q: 'How do you survive a regional outage?',
      a: 'A multi-region design with replicated data and tested failover. It is expensive, so match it to the availability target.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you deploy a small API?',
      a: 'DNS and HTTPS on a load balancer, the app in a private subnet or managed container service, a private managed database, object storage and secrets in a secret manager.',
      level: 'intermediate',
    },
    {
      q: 'How do you verify a deployment?',
      a: 'A health endpoint after deploy, logs and metrics, and a smoke test of the critical user path.',
      level: 'basic',
    },
    {
      q: 'How do you compare AWS, GCP and Azure?',
      a: 'Map the same workload to each provider category: compute, containers, serverless, storage, databases, IAM and monitoring. The names differ; the trade-offs are similar.',
      level: 'intermediate',
    },
    {
      q: 'What makes a cloud portfolio project strong?',
      a: 'A deployed app, a diagram, infrastructure as code, a CI pipeline, a budget alert and a written runbook.',
      level: 'advanced',
    },
  ],
};
