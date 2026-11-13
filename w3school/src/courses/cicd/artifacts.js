// CI/CD chapter: Artifacts & Registries.

export default {
  id: 'artifacts',
  title: 'Artifacts & Registries',
  description: 'Store, tag and promote build outputs',
  icon: 'inventory-2',
  lessons: [
    {
      id: 'cicd-artifacts',
      title: 'What an artifact is',
      blocks: [
        { type: 'text', value: 'An artifact is the output of a build: a jar, a bundle, an APK or a container image. It must be immutable. Rebuilding the same commit should produce the same artifact, and you should never overwrite a released tag.' },
        { type: 'list', items: [
          'Immutable once published',
          'Tagged with version and commit',
          'Stored in a registry, not a chat message',
          'Retained for as long as you may need to roll back',
          'Signed or checksummed for integrity',
        ] },
        { type: 'note', value: 'A tag like latest is a pointer, not a version. Deploy a specific tag so a rollback is possible.' },
      ],
    },
    {
      id: 'cicd-registry',
      title: 'Registries and tagging',
      blocks: [
        { type: 'text', value: 'A registry stores artifacts: Docker Hub, GitHub Container Registry, ECR, Artifactory or the npm registry. Push with a unique tag, then promote by digest or tag.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker build -t ghcr.io/acme/app:1.4.0 .\ndocker push ghcr.io/acme/app:1.4.0\n\ndocker pull ghcr.io/acme/app@sha256:abc123...` },
        { type: 'note', value: 'A digest is immutable; a tag is not. For production, record the digest in the deploy log.' },
      ],
    },
    {
      id: 'cicd-promotion',
      title: 'Promotion and rollback',
      blocks: [
        { type: 'text', value: 'Promotion means moving the same artifact through environments: dev, staging, production. Rollback means pointing production back at the previous known-good tag.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `deploy:\n  environment: production\n  variables:\n    IMAGE: ghcr.io/acme/app@sha256:abc123\n  script:\n    - kubectl set image deploy/app app=$IMAGE\n    - kubectl rollout status deploy/app --timeout=120s` },
        { type: 'list', items: [
          'Keep the last few releases',
          'Test the rollback path before you need it',
          'Database changes must be backward compatible',
          'Record the deployed digest',
        ] },
        { type: 'note', value: 'A forward-only schema change can make rollback impossible. Expand and contract migrations instead.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'artifacts',
      q: 'What makes a good artifact?',
      options: ['Mutable and rebuilt per env', 'Immutable and traceable to a commit', 'Stored only locally', 'Named latest'],
      answer: 1,
      explain: 'Artifacts are immutable and traceable.',
    },
    {
      chapterId: 'artifacts',
      q: 'Why is latest a poor production tag?',
      options: ['It is too long', 'It moves and cannot identify a version', 'It is encrypted', 'It is required'],
      answer: 1,
      explain: 'It is a moving pointer.',
    },
    {
      chapterId: 'artifacts',
      q: 'What is promotion?',
      options: ['Rebuilding per env', 'Moving the same artifact through environments', 'Deleting old images', 'A marketing plan'],
      answer: 1,
      explain: 'The artifact is promoted.',
    },
    {
      chapterId: 'artifacts',
      q: 'What does a digest guarantee?',
      options: ['Speed', 'An immutable image reference', 'A smaller image', 'A newer base'],
      answer: 1,
      explain: 'A digest cannot change.',
    },
  ],
};
