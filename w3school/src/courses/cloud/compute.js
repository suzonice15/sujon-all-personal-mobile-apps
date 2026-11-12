// Cloud chapter: Compute.

export default {
  id: 'compute',
  title: 'Compute',
  description: 'Virtual machines, containers and serverless',
  icon: 'memory',
  lessons: [
    {
      id: 'cloud-vms',
      title: 'Virtual machines',
      blocks: [
        { type: 'text', value: 'A virtual machine gives you a full OS. You manage patching, scaling and the runtime. It is flexible but more work than managed options.' },
        { type: 'list', items: [
          'AWS EC2',
          'GCP Compute Engine',
          'Azure Virtual Machines',
          'Choose an image, size and disk; attach a network and a firewall',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `# AWS CLI example
aws ec2 run-instances \\
  --image-id ami-12345678 \\
  --instance-type t3.micro \\
  --key-name my-key \\
  --security-group-ids sg-12345678` },
        { type: 'note', value: 'A VM is a server you rent. If you would not run it on your own hardware without a patch plan, do not run it in the cloud without one either.' },
      ],
    },
    {
      id: 'cloud-containers',
      title: 'Containers',
      blocks: [
        { type: 'text', value: 'A managed container service runs your Docker image, handles scaling and gives you a URL. You still own the image, configuration and health checks.' },
        { type: 'list', items: [
          'AWS ECS / Fargate, App Runner',
          'GCP Cloud Run',
          'Azure Container Apps',
          'Kubernetes for more control and more complexity',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Cloud Run example
gcloud run deploy codenest-api \\
  --image gcr.io/project/codenest-api:1.0 \\
  --region asia-southeast1 \\
  --allow-unauthenticated` },
        { type: 'note', value: 'Cloud Run scales to zero, which is cheap for low traffic but can add cold-start latency. Keep the image small and start fast.' },
      ],
    },
    {
      id: 'cloud-serverless',
      title: 'Serverless functions',
      blocks: [
        { type: 'text', value: 'A function runs on demand, scales automatically and is billed per request and duration. It is great for small event handlers, not for long CPU-heavy jobs.' },
        { type: 'list', items: [
          'AWS Lambda',
          'GCP Cloud Functions',
          'Azure Functions',
          'Good: webhooks, image thumbnails, scheduled jobs',
          'Bad: a long video transcode or a stateful server',
        ] },
        { type: 'note', value: 'A cold start is the delay before an idle function starts. Keep dependencies small and initialise clients outside the handler when the platform allows it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'compute',
      q: 'Which option gives you a full OS to manage?',
      options: ['Serverless function', 'Virtual machine', 'Object storage', 'DNS'],
      answer: 1,
      explain: 'A VM is a full server.',
    },
    {
      chapterId: 'compute',
      q: 'Which is a managed container service on GCP?',
      options: ['Cloud Run', 'S3', 'IAM', 'Cloud DNS'],
      answer: 0,
      explain: 'Cloud Run runs container images.',
    },
    {
      chapterId: 'compute',
      q: 'What is a cold start?',
      options: ['A reboot', 'The delay before an idle function starts', 'A database failover', 'A billing error'],
      answer: 1,
      explain: 'It affects serverless latency after idle periods.',
    },
  ],
};
