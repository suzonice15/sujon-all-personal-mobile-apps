// Kubernetes chapter: Ingress.

export default {
  id: 'ingress',
  title: 'Ingress',
  description: 'HTTP routing and TLS for many services',
  icon: 'route',
  lessons: [
    {
      id: 'k8s-ingress',
      title: 'What is Ingress?',
      blocks: [
        { type: 'text', value: 'Ingress routes HTTP traffic by host and path to Services. It needs an ingress controller (nginx, Traefik, cloud controller) running in the cluster.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api
spec:
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 80` },
        { type: 'note', value: 'Ingress does nothing by itself. Without a controller, the resource is stored but no traffic is routed.' },
      ],
    },
    {
      id: 'k8s-ingress-tls',
      title: 'TLS',
      blocks: [
        { type: 'text', value: 'TLS terminates at the ingress controller using a certificate in a Secret. cert-manager can request and renew Let\'s Encrypt certificates automatically.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `spec:
  tls:
    - hosts:
        - api.example.com
      secretName: api-tls
  rules:
    - host: api.example.com` },
        { type: 'note', value: 'Keep the certificate Secret in the same namespace as the Ingress. A wrong secret name means the controller serves a default certificate.' },
      ],
    },
    {
      id: 'k8s-ingress-paths',
      title: 'Hosts and paths',
      blocks: [
        { type: 'list', items: [
          'Host-based: api.example.com and app.example.com',
          'Path-based: /api and /admin',
          'Prefix match for sections, Exact for one path',
          'Annotations configure timeouts, body size and redirects',
          'One controller can serve many Ingress resources',
        ] },
        { type: 'text', value: 'Keep routing rules simple. Complex rewrites belong in the app or a dedicated gateway, not a pile of annotations.' },
        { type: 'note', value: 'Test the route with curl -H "Host: api.example.com" against the ingress IP before changing DNS.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'ingress',
      q: 'What does Ingress route?',
      options: ['UDP only', 'HTTP by host and path', 'Database queries', 'Disk writes'],
      answer: 1,
      explain: 'It routes HTTP traffic to Services.',
    },
    {
      chapterId: 'ingress',
      q: 'What is required for Ingress to work?',
      options: ['A controller', 'A database', 'A node port', 'A build'],
      answer: 0,
      explain: 'The controller implements the routing.',
    },
    {
      chapterId: 'ingress',
      q: 'Where does a TLS certificate live?',
      options: ['In a ConfigMap', 'In a Secret', 'In the image', 'In DNS'],
      answer: 1,
      explain: 'The controller reads the certificate from a Secret.',
    },
  ],
};
