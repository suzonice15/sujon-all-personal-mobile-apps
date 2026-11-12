// Cloud chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Deploy a small app and compare providers',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'cloud-project-deploy',
      title: 'Project: deploy a small app',
      blocks: [
        { type: 'text', value: 'Deploy a small API with a managed database, object storage and HTTPS. Use infrastructure as code and a CI pipeline. This is a complete, portfolio-ready cloud slice.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Architecture:
  DNS -> load balancer (HTTPS)
    -> container / serverless API (private)
      -> managed database (private)
      -> object storage (private, signed URLs)

Pipeline:
  test -> build image -> scan -> deploy -> health check` },
        { type: 'list', items: [
          'One region, two availability zones',
          'No public database',
          'Secrets in the secret manager',
          'Budget alert and logs enabled',
          'A documented rollback',
        ] },
        { type: 'note', value: 'A small deployed app with a diagram and a runbook is stronger evidence than a certificate alone.' },
      ],
    },
    {
      id: 'cloud-project-compare',
      title: 'Project: compare providers',
      blocks: [
        { type: 'text', value: 'Pick one workload and map it across AWS, GCP and Azure. The names differ; the concepts are the same. Knowing the mapping makes you portable.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Compute:   EC2        Compute Engine   Virtual Machines
Containers: ECS/Fargate Cloud Run       Container Apps
Serverless: Lambda     Cloud Functions  Functions
Objects:    S3         Cloud Storage    Blob Storage
SQL:        RDS        Cloud SQL        Azure SQL
NoSQL:      DynamoDB   Firestore        Cosmos DB
IAM:        IAM        IAM              Entra ID
Monitoring: CloudWatch Cloud Monitoring Azure Monitor` },
        { type: 'note', value: 'Do not memorise every product name. Learn the category and the trade-off, then look up the provider-specific name.' },
      ],
    },
    {
      id: 'cloud-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'IaaS, PaaS and SaaS?',
          'What is an availability zone?',
          'How do you design for high availability?',
          'VPC, subnet and security group?',
          'Object versus block storage?',
          'How do you manage secrets?',
          'What is least privilege in IAM?',
          'How do you reduce cloud cost?',
          'How do you deploy without downtime?',
          'What is the shared responsibility model?',
        ] },
        { type: 'text', value: 'Strong answers use the category and the trade-off, then name one provider example. "A managed container service such as Cloud Run scales to zero but adds cold starts" is a complete answer.' },
        { type: 'note', value: 'Be ready to draw a small architecture with a VPC, a load balancer, an app and a private database.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Where should the database be in the diagram?',
      options: ['Public subnet', 'Private subnet', 'On the internet', 'In DNS'],
      answer: 1,
      explain: 'Only the app should reach it.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What proves a deployment is healthy?',
      options: ['A green pipeline', 'A passing health check after deploy', 'A larger instance', 'A new logo'],
      answer: 1,
      explain: 'The health check confirms it can serve traffic.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the same across providers?',
      options: ['Product names', 'The concepts and trade-offs', 'The console', 'The billing'],
      answer: 1,
      explain: 'Names differ; architecture concepts transfer.',
    },
  ],
};
