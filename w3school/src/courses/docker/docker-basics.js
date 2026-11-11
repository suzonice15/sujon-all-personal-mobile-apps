// Docker chapter: Docker Basics.

export default {
  id: 'docker-basics',
  title: 'Docker Basics',
  description: 'Run, inspect and clean up containers',
  icon: 'play-circle',
  lessons: [
    {
      id: 'docker-run',
      title: 'Run a container',
      blocks: [
        { type: 'text', value: 'docker run creates a container from an image and starts it. If the image is not local, Docker pulls it first. Flags control ports, names, environment and cleanup.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker run --rm hello-world

docker run -d --name web -p 8080:80 nginx
docker run -it --rm ubuntu:24.04 bash
docker run --rm -e NODE_ENV=production node:20 node -e "console.log(process.env.NODE_ENV)"` },
        { type: 'list', items: [
          '-d runs detached in the background',
          '--rm removes the container when it exits',
          '-p host:container publishes a port',
          '-e sets an environment variable',
          '-it gives an interactive terminal',
        ] },
      ],
    },
    {
      id: 'docker-ps-logs',
      title: 'Inspect and debug',
      blocks: [
        { type: 'text', value: 'docker ps lists running containers. logs shows output. exec runs a command inside a running container, which is the standard way to debug.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker ps
docker ps -a
docker logs web
docker logs -f web
docker exec -it web sh

docker inspect web
docker stats` },
        { type: 'note', value: 'A container that exits immediately is usually a wrong command or a missing environment variable. docker logs is the first place to look.' },
      ],
    },
    {
      id: 'docker-stop-rm',
      title: 'Stop and remove',
      blocks: [
        { type: 'text', value: 'Stopping a container keeps it for inspection. Removing it deletes the container filesystem. Images and volumes are separate and must be removed explicitly.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker stop web
docker start web
docker rm web
docker rm -f web

docker images
docker rmi nginx:latest
docker system df` },
        { type: 'note', value: 'docker system prune removes stopped containers, unused networks and dangling images. Read the prompt before confirming; it can delete a lot.' },
      ],
    },
    {
      id: 'docker-exec',
      title: 'Exec and copy',
      blocks: [
        { type: 'text', value: 'docker exec runs a command in a running container. docker cp copies files in or out without rebuilding an image.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker exec -it web sh
docker exec web ls /usr/share/nginx/html

docker cp web:/etc/nginx/nginx.conf ./nginx.conf
docker cp ./index.html web:/usr/share/nginx/html/index.html` },
        { type: 'note', value: 'Changes made with exec or cp disappear when the container is removed. Put permanent changes in the image or a volume.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'docker-basics',
      q: 'What does -p 8080:80 do?',
      options: ['Publishes host port 8080 to container port 80', 'Sets a password', 'Copies a file', 'Creates a volume'],
      answer: 0,
      explain: 'The host port comes first, then the container port.',
    },
    {
      chapterId: 'docker-basics',
      q: 'Which command shows container output?',
      options: ['docker ps', 'docker logs', 'docker exec', 'docker cp'],
      answer: 1,
      explain: 'docker logs prints stdout and stderr from the container.',
    },
    {
      chapterId: 'docker-basics',
      q: 'What does --rm do?',
      options: ['Removes the image', 'Removes the container when it exits', 'Removes a volume', 'Restarts the container'],
      answer: 1,
      explain: 'It keeps short-lived containers from piling up.',
    },
    {
      chapterId: 'docker-basics',
      q: 'Why do exec changes disappear?',
      options: ['Containers are read-only', 'They live in the container layer, not the image', 'Docker blocks writes', 'They are encrypted'],
      answer: 1,
      explain: 'A removed container takes its writable layer with it.',
    },
  ],
};
