// Next.js chapter: Environment Variables and Deployment.

export default {
  id: 'deployment',
  title: 'Deployment & Performance',
  description: 'Environment variables, Docker output and measuring speed',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'nx-env-vars',
      title: 'Environment variables',
      blocks: [
        { type: 'text', value: 'Put secrets in .env.local, which is never committed. Only variables that start with NEXT_PUBLIC_ are sent to the browser. Everything else stays on the server.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# .env.local (not committed)
DATABASE_URL="postgres://app:secret@db:5432/codenest"
AUTH_SECRET="a-long-random-value"

# Safe to expose to the browser
NEXT_PUBLIC_SITE_URL="https://codenest.app"` },
        { type: 'note', value: 'Never name a secret with NEXT_PUBLIC_. Anything with that prefix is written into the JavaScript that every visitor downloads.' },
      ],
    },
    {
      id: 'nx-deploy-options',
      title: 'Deploying the app',
      blocks: [
        { type: 'text', value: 'Vercel runs Next.js with the least setup: connect a Git repository and every push deploys, with a preview URL for each pull request. For your own server or a container, build with output set to standalone.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;` },
        { type: 'code', lang: 'text', tryIt: false, value: `FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]` },
        { type: 'note', value: 'The standalone output copies only the files the server needs, so the final image is much smaller than the full project.' },
      ],
    },
    {
      id: 'nx-performance',
      title: 'Measuring performance',
      blocks: [
        { type: 'text', value: 'Measure before you optimize. The build output shows which routes are static or dynamic and how big each bundle is. Lighthouse and Web Vitals show what real users feel.' },
        { type: 'list', items: [
          'Read the route table printed by npm run build',
          'Keep "use client" components small',
          'Use next/image and next/font for media',
          'Stream slow sections with Suspense',
          'Check Core Web Vitals: LCP, INP and CLS',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `npm run build
npx lighthouse https://codenest.app --view` },
        { type: 'note', value: 'A large bundle is usually one heavy library in a Client Component. Find it in the build output before you rewrite code.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment',
      q: 'Which environment variables reach the browser?',
      options: ['All of them', 'Only those starting with NEXT_PUBLIC_', 'Only DATABASE_URL', 'None ever'],
      answer: 1,
      explain: 'The NEXT_PUBLIC_ prefix is the signal for browser exposure.',
    },
    {
      chapterId: 'deployment',
      q: 'What does output: standalone do?',
      options: ['Removes the server', 'Copies only what the server needs for a smaller deploy', 'Disables caching', 'Creates a database'],
      answer: 1,
      explain: 'It prepares a minimal server bundle for containers.',
    },
    {
      chapterId: 'deployment',
      q: 'What is the best first step to find a slow page?',
      options: ['Guess and rewrite', 'Measure with the build output and Web Vitals', 'Delete the images', 'Turn off caching'],
      answer: 1,
      explain: 'Measure first, then change the slowest part.',
    },
    {
      chapterId: 'deployment',
      q: 'Where should a database password be stored?',
      options: ['In a NEXT_PUBLIC_ variable', 'In .env.local or the host secret store', 'In a Client Component', 'In the README'],
      answer: 1,
      explain: 'Server secrets stay out of source control and the browser.',
    },
  ],
};
