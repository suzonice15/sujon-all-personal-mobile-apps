// Docker chapter: Security & Registries.

export default {
  id: 'security-registries',
  title: 'Security & Registries',
  description: 'Least privilege, image scanning and registries',
  icon: 'shield',
  lessons: [
    {
      id: 'docker-least-privilege',
      title: 'Least privilege images',
      blocks: [
        { type: 'text', value: 'A container that runs as root inside the image can do more damage if it escapes. Use a slim base, a multi-stage build and a non-root user. Copy only what the app needs.' },
        { type: 'code', lang: 'dockerfile', tryIt: false, value: `FROM node:22-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-alpine\nWORKDIR /app\nENV NODE_ENV=production\nCOPY package*.json ./\nRUN npm ci --omit=dev && npm cache clean --force\nCOPY --from=build /app/dist ./dist\nRUN addgroup -S app && adduser -S app -G app\nUSER app\nEXPOSE 3000\nCMD ["node", "dist/server.js"]` },
        { type: 'list', items: [
          'Non-root USER last',
          'Multi-stage keeps build tools out',
          'Pin the base image version',
          'No secrets in ENV or COPY',
          'One process per container',
        ] },
        { type: 'note', value: 'USER app after COPY means a build step cannot write to root-owned files. Add --chown when needed.' },
      ],
    },
    {
      id: 'docker-registries',
      title: 'Registries and tags',
      blocks: [
        { type: 'text', value: 'A registry stores images. Tag with a version and a commit, push, and deploy the digest. Never deploy latest to production.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker login ghcr.io\ndocker build -t ghcr.io/acme/api:1.4.0 -t ghcr.io/acme/api:sha-abc123 .\ndocker push ghcr.io/acme/api:1.4.0\ndocker push ghcr.io/acme/api:sha-abc123\n\ndocker pull ghcr.io/acme/api@sha256:9f2c...` },
        { type: 'note', value: 'A digest cannot be overwritten. It is the only safe production reference.' },
      ],
    },
    {
      id: 'docker-scanning',
      title: 'Scanning and supply chain',
      blocks: [
        { type: 'text', value: 'Scan the image in CI and fail on critical vulnerabilities. Sign images and verify signatures before deploy. Keep the base image updated, because most CVEs come from it.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Scan the built image\ntrivy image --exit-code 1 --severity CRITICAL ghcr.io/acme/api:1.4.0\n\n# Generate an SBOM\nsyft ghcr.io/acme/api:1.4.0 -o spdx-json > sbom.json\n\n# Sign and verify\ncosign sign ghcr.io/acme/api@sha256:9f2c...` },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:\n  api:\n    image: ghcr.io/acme/api@sha256:9f2c...\n    read_only: true\n    security_opt:\n      - no-new-privileges:true\n    cap_drop:\n      - ALL\n    tmpfs:\n      - /tmp` },
        { type: 'note', value: 'read_only with a tmpfs for /tmp removes most write-based attacks from a compromised process.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security-registries',
      q: 'Why use a non-root user?',
      options: ['Smaller image', 'Less damage if the process is compromised', 'Faster start', 'Better caching'],
      answer: 1,
      explain: 'It limits the blast radius.',
    },
    {
      chapterId: 'security-registries',
      q: 'What does a multi-stage build do?',
      options: ['Runs two containers', 'Keeps build tools out of the final image', 'Adds a database', 'Encrypts the image'],
      answer: 1,
      explain: 'Only the needed files are copied.',
    },
    {
      chapterId: 'security-registries',
      q: 'Why deploy by digest?',
      options: ['It is shorter', 'It cannot be overwritten', 'It is faster', 'It hides the tag'],
      answer: 1,
      explain: 'Digests are immutable.',
    },
    {
      chapterId: 'security-registries',
      q: 'What should fail the build?',
      options: ['A new tag', 'A critical vulnerability', 'A smaller image', 'A cache miss'],
      answer: 1,
      explain: 'Fail on critical findings.',
    },
  ],
};
