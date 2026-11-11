// Docker chapter: Networking.

export default {
  id: 'networking',
  title: 'Networking',
  description: 'Ports, bridge networks and service discovery',
  icon: 'wifi',
  lessons: [
    {
      id: 'docker-ports',
      title: 'Ports',
      blocks: [
        { type: 'text', value: 'A container has its own network namespace. Publishing a port maps a host port to a container port. Without publishing, the service is only reachable from inside the container network.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker run -d --name web -p 8080:80 nginx
curl http://localhost:8080

docker port web` },
        { type: 'note', value: 'Bind only to localhost when a reverse proxy should be the only way in: -p 127.0.0.1:8080:80.' },
      ],
    },
    {
      id: 'docker-networks',
      title: 'Custom networks',
      blocks: [
        { type: 'text', value: 'A user-defined bridge network gives containers DNS names. A container can reach another by name instead of an IP address.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker network create app-net

docker run -d --name db --network app-net postgres:16
docker run -d --name api --network app-net -p 3000:3000 codenest-api

# api can connect to db:5432 by name
docker network inspect app-net` },
        { type: 'list', items: [
          'bridge - default, containers can reach each other by IP',
          'user-defined bridge - automatic DNS by container name',
          'host - shares the host network, Linux only',
          'none - no networking',
        ] },
      ],
    },
    {
      id: 'docker-compose-network',
      title: 'Compose networking',
      blocks: [
        { type: 'text', value: 'Compose creates one network per project and attaches every service. The service name becomes the hostname.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app` },
        { type: 'note', value: 'Inside Compose, use the service name and the container port, not localhost. localhost inside a container means that container.' },
      ],
    },
    {
      id: 'docker-dns',
      title: 'DNS and troubleshooting',
      blocks: [
        { type: 'text', value: 'Docker runs an embedded DNS server on a user-defined network. If a name does not resolve, check that both containers are on the same network.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker exec -it api sh
# inside the container:
ping db
getent hosts db

docker network inspect app-net` },
        { type: 'note', value: 'A container cannot reach a service on the host with localhost. Use host.docker.internal on Docker Desktop or the host bridge IP on Linux.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'networking',
      q: 'What does -p 8080:80 mean?',
      options: ['Container 8080 to host 80', 'Host 8080 to container 80', 'Two host ports', 'A DNS record'],
      answer: 1,
      explain: 'The host port is on the left, the container port on the right.',
    },
    {
      chapterId: 'networking',
      q: 'What does a user-defined bridge network add?',
      options: ['Encryption', 'DNS by container name', 'More CPU', 'A public IP'],
      answer: 1,
      explain: 'Containers on the same network resolve each other by name.',
    },
    {
      chapterId: 'networking',
      q: 'Inside Compose, how do you reach the db service?',
      options: ['localhost:5432', 'db:5432', '127.0.0.1:5432', 'host:5432'],
      answer: 1,
      explain: 'The service name is the hostname on the project network.',
    },
    {
      chapterId: 'networking',
      q: 'Why does localhost inside a container not reach the host?',
      options: ['It is blocked', 'It refers to the container itself', 'It requires TLS', 'It is read-only'],
      answer: 1,
      explain: 'Each container has its own loopback interface.',
    },
  ],
};
