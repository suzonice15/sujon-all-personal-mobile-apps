// Docker chapter: Dockerfile.

export default {
  id: 'dockerfile',
  title: 'Dockerfile',
  description: 'Build a reproducible image layer by layer',
  icon: 'description',
  lessons: [
    {
      id: 'dockerfile-basics',
      title: 'Your first Dockerfile',
      blocks: [
        { type: 'text', value: 'A Dockerfile is a list of instructions. Each instruction creates a layer. Put the parts that change least near the top so Docker can reuse cached layers.' },
        { type: 'code', lang: 'dockerfile', tryIt: false, value: `FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]` },
        { type: 'list', items: [
          'FROM picks the base image',
          'WORKDIR sets the working directory',
          'COPY adds files from the build context',
          'RUN executes a command during the build',
          'CMD is the default command when the container starts',
        ] },
        { type: 'note', value: 'Copy package files and install dependencies before copying the source. A code change then does not reinstall node_modules.' },
      ],
    },
    {
      id: 'dockerfile-entrypoint',
      title: 'CMD versus ENTRYPOINT',
      blocks: [
        { type: 'text', value: 'ENTRYPOINT sets the executable. CMD provides default arguments that the user can override. Use the exec form with a JSON array so signals reach the process.' },
        { type: 'code', lang: 'dockerfile', tryIt: false, fragment: true, value: `# exec form: signals reach node directly
ENTRYPOINT ["node"]
CMD ["server.js"]

# The user can override CMD:
# docker run myapp other.js` },
        { type: 'note', value: 'Shell form such as CMD node server.js runs through sh, which may swallow SIGTERM. The exec form is the safer default.' },
      ],
    },
    {
      id: 'dockerfile-multistage',
      title: 'Multi-stage builds',
      blocks: [
        { type: 'text', value: 'A multi-stage build compiles in one stage and copies only the result into a small runtime image. The final image has no compiler, no source and no dev dependencies.' },
        { type: 'code', lang: 'dockerfile', tryIt: false, value: `FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
ENV NODE_ENV=production
CMD ["node", "dist/server.js"]` },
        { type: 'note', value: 'Smaller images pull faster, start faster and have a smaller attack surface. Multi-stage builds are the standard way to get there.' },
      ],
    },
    {
      id: 'dockerfile-ignore',
      title: '.dockerignore',
      blocks: [
        { type: 'text', value: 'The build context is everything sent to the daemon. A .dockerignore file keeps node_modules, .git and secrets out, which makes builds faster and safer.' },
        { type: 'code', lang: 'text', tryIt: false, value: `node_modules
.git
.env
.env.*
dist
coverage
*.log
Dockerfile
docker-compose.yml` },
        { type: 'note', value: 'Never COPY .env into an image. Build-time secrets end up in layers and can be extracted even if a later layer deletes the file.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dockerfile',
      q: 'Which instruction sets the base image?',
      options: ['BASE', 'FROM', 'IMAGE', 'RUN'],
      answer: 1,
      explain: 'Every Dockerfile starts with FROM.',
    },
    {
      chapterId: 'dockerfile',
      q: 'Why copy package.json before the source?',
      options: ['To sort files', 'To reuse the dependency layer from cache', 'To reduce image size', 'To enable networking'],
      answer: 1,
      explain: 'Docker rebuilds only the layers whose inputs changed.',
    },
    {
      chapterId: 'dockerfile',
      q: 'What is a multi-stage build for?',
      options: ['Running two apps', 'Keeping build tools out of the final image', 'Adding more ports', 'Encrypting the image'],
      answer: 1,
      explain: 'Only the compiled output is copied into the runtime stage.',
    },
    {
      chapterId: 'dockerfile',
      q: 'Why use the exec form of CMD?',
      options: ['It is shorter', 'Signals reach the process directly', 'It runs faster', 'It allows shell features'],
      answer: 1,
      explain: 'The JSON form avoids an extra shell process that can swallow signals.',
    },
  ],
};
