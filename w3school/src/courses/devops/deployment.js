// Docker chapter: Deployment.

export default {
  id: 'deployment',
  title: 'Deployment',
  description: 'Run containers behind a proxy with HTTPS',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'deploy-vps',
      title: 'Deploy to a VPS',
      blocks: [
        { type: 'text', value: 'A small VPS can run a Docker stack. The pattern is: a reverse proxy on ports 80 and 443, the app container on an internal network, and a volume for data.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# On the server
git clone https://github.com/you/app.git
cd app
docker compose up -d

# Check
docker compose ps
curl http://localhost:3000/health` },
        { type: 'note', value: 'Do not expose the database port to the internet. Only the proxy should be reachable from outside.' },
      ],
    },
    {
      id: 'deploy-nginx',
      title: 'Nginx reverse proxy',
      blocks: [
        { type: 'text', value: 'Nginx terminates TLS and forwards requests to the app. It also serves static files and can rate limit or compress responses.' },
        { type: 'code', lang: 'text', tryIt: false, value: `server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://api:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}` },
        { type: 'note', value: 'Forward X-Forwarded-Proto so the app knows the original request was HTTPS. Cookies and redirects depend on it.' },
      ],
    },
    {
      id: 'deploy-https',
      title: 'HTTPS with certbot',
      blocks: [
        { type: 'text', value: 'Let\'s Encrypt certificates are free and renew automatically. Certbot edits the Nginx config and sets up a renewal timer.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.example.com

# Test renewal
sudo certbot renew --dry-run` },
        { type: 'note', value: 'Renewal fails silently if port 80 is blocked or the DNS record changed. Monitor the expiry date.' },
      ],
    },
    {
      id: 'deploy-zero-downtime',
      title: 'Zero-downtime deploys',
      blocks: [
        { type: 'text', value: 'Pull the new image, start a second container, wait for its health check, then switch the proxy and stop the old one. If the check fails, keep the old container running.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker pull registry.example.com/app:2.0
docker run -d --name app-new --network app-net app:2.0

# Wait for the health check
until curl -fsS http://app-new:3000/health; do sleep 1; done

# Switch and clean up
docker stop app-old
docker rm app-old
docker rename app-new app-old` },
        { type: 'note', value: 'A health endpoint is what makes this safe. Without it, the proxy can send traffic to a container that is not ready.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment',
      q: 'Which port should the database expose publicly?',
      options: ['5432', '3306', 'None', '80'],
      answer: 2,
      explain: 'Only the proxy should be reachable; the database stays internal.',
    },
    {
      chapterId: 'deployment',
      q: 'What does a reverse proxy do?',
      options: ['Stores the database', 'Forwards requests to the app and terminates TLS', 'Builds images', 'Runs tests'],
      answer: 1,
      explain: 'Nginx or Caddy handles TLS and routes traffic.',
    },
    {
      chapterId: 'deployment',
      q: 'Why forward X-Forwarded-Proto?',
      options: ['To compress responses', 'So the app knows the original scheme was HTTPS', 'To enable caching', 'To open a port'],
      answer: 1,
      explain: 'The app sees HTTP from the proxy and needs the original scheme for cookies and redirects.',
    },
    {
      chapterId: 'deployment',
      q: 'What is required before switching traffic to a new container?',
      options: ['A new domain', 'A passing health check', 'A larger disk', 'A restart of the host'],
      answer: 1,
      explain: 'The health check proves the new container can serve requests.',
    },
  ],
};
