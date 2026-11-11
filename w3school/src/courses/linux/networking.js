// Linux chapter: Networking.

export default {
  id: 'networking',
  title: 'Networking',
  description: 'IP addresses, curl, SSH and open ports',
  icon: 'wifi',
  lessons: [
    {
      id: 'linux-ip-ping',
      title: 'Addresses and ping',
      blocks: [
        { type: 'text', value: 'ip shows network interfaces and addresses. ping checks whether a host is reachable. A blocked ping does not always mean the service is down.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ip addr
ip route
ping -c 4 example.com
dig example.com
nslookup example.com` },
        { type: 'note', value: 'ICMP may be blocked by a firewall. Test the actual service with curl before concluding the host is down.' },
      ],
    },
    {
      id: 'linux-curl',
      title: 'curl',
      blocks: [
        { type: 'text', value: 'curl makes HTTP requests from the terminal. It is the fastest way to test an API, check headers and debug a deployment.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `curl https://api.example.com/health
curl -i https://example.com
curl -X POST https://api.example.com/courses \\
  -H "Content-Type: application/json" \\
  -d '{"title":"SQL","price":5000}'
curl -o page.html https://example.com` },
        { type: 'list', items: [
          '-i shows response headers',
          '-X sets the method',
          '-H adds a header',
          '-d sends a body',
          '-o writes the response to a file',
        ] },
      ],
    },
    {
      id: 'linux-ssh-scp',
      title: 'SSH and SCP',
      blocks: [
        { type: 'text', value: 'SSH opens a secure shell on a remote machine. SCP copies files over SSH. Keys are safer than passwords.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ssh user@server.example.com
ssh -p 2222 user@server.example.com

scp app.tar.gz user@server:/var/www/
scp user@server:/var/log/app.log ./app.log

ssh-keygen -t ed25519 -C "you@example.com"
ssh-copy-id user@server` },
        { type: 'note', value: 'Disable password login after keys work, and keep the private key private. The public key goes on the server.' },
      ],
    },
    {
      id: 'linux-ports',
      title: 'Open ports',
      blocks: [
        { type: 'text', value: 'A service listens on a port. ss shows open sockets. netstat is older but still common. Only expose the ports you actually need.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ss -tulpn
ss -tulpn | grep 3000
netstat -tulpn

# Test a local service
curl http://localhost:3000/health` },
        { type: 'note', value: 'A port open on 0.0.0.0 is reachable from outside. Bind to 127.0.0.1 when only the local reverse proxy should reach it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'networking',
      q: 'Which command shows IP addresses?',
      options: ['ip addr', 'ls', 'ps', 'cd'],
      answer: 0,
      explain: 'ip addr lists interfaces and addresses.',
    },
    {
      chapterId: 'networking',
      q: 'Which curl flag shows response headers?',
      options: ['-i', '-d', '-o', '-X'],
      answer: 0,
      explain: '-i includes the status line and headers in the output.',
    },
    {
      chapterId: 'networking',
      q: 'What is SCP used for?',
      options: ['Copying files over SSH', 'Scanning ports', 'Starting services', 'Editing files'],
      answer: 0,
      explain: 'SCP transfers files through an SSH connection.',
    },
    {
      chapterId: 'networking',
      q: 'What does 127.0.0.1 mean?',
      options: ['A public IP', 'The local loopback address', 'A DNS server', 'A subnet mask'],
      answer: 1,
      explain: 'Loopback is reachable only from the same machine.',
    },
  ],
};
