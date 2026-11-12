// Cloud chapter: Storage.

export default {
  id: 'storage',
  title: 'Storage',
  description: 'Object, block and file storage',
  icon: 'storage',
  lessons: [
    {
      id: 'cloud-object',
      title: 'Object storage',
      blocks: [
        { type: 'text', value: 'Object storage keeps files in buckets with a key. It is cheap, durable and accessible over HTTP. Use it for images, backups and static assets.' },
        { type: 'list', items: [
          'AWS S3',
          'GCP Cloud Storage',
          'Azure Blob Storage',
          'Private by default in a good design',
          'Versioning and lifecycle rules',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `aws s3 cp logo.png s3://codenest-assets/logo.png
aws s3api get-public-access-block --bucket codenest-assets
gcloud storage cp logo.png gs://codenest-assets/logo.png` },
        { type: 'note', value: 'A public bucket is a data leak waiting to happen. Block public access unless the bucket is intentionally public.' },
      ],
    },
    {
      id: 'cloud-block-file',
      title: 'Block and file storage',
      blocks: [
        { type: 'list', items: [
          'Block storage - a disk attached to a VM, such as EBS or a managed disk',
          'File storage - a shared network filesystem, such as EFS or Azure Files',
          'Object storage - files over HTTP, not a mounted disk',
        ] },
        { type: 'text', value: 'A database needs block storage with low latency. Shared files between servers need file storage. Static assets belong in object storage behind a CDN.' },
        { type: 'note', value: 'Do not run a database on object storage. It is not a filesystem and does not provide the latency or locking a database needs.' },
      ],
    },
    {
      id: 'cloud-lifecycle',
      title: 'Lifecycle and cost',
      blocks: [
        { type: 'text', value: 'Storage classes trade retrieval speed for price. A lifecycle rule moves old data to cheaper storage or deletes it after a period.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `# Lifecycle idea
rules:
  - name: archive-old-logs
    filter: { prefix: "logs/" }
    transition:
      - days: 30
        storageClass: STANDARD_IA
      - days: 180
        storageClass: GLACIER
    expiration:
      days: 365` },
        { type: 'note', value: 'Retrieval from cold storage costs time and money. Know the restore time before you rely on it for backups.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'storage',
      q: 'What is object storage for?',
      options: ['A mounted database disk', 'Files and assets over HTTP', 'CPU', 'DNS'],
      answer: 1,
      explain: 'It stores objects in buckets.',
    },
    {
      chapterId: 'storage',
      q: 'What should a bucket be by default?',
      options: ['Public', 'Private', 'Deleted', 'Encrypted only'],
      answer: 1,
      explain: 'Public access should be a deliberate exception.',
    },
    {
      chapterId: 'storage',
      q: 'Why use lifecycle rules?',
      options: ['To change colors', 'To move or delete old data and control cost', 'To add CPU', 'To open ports'],
      answer: 1,
      explain: 'They automate storage class changes and expiry.',
    },
  ],
};
