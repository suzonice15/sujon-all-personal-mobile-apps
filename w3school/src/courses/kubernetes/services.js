// Kubernetes chapter: Services.

export default {
  id: 'services',
  title: 'Services',
  description: 'Stable networking for changing pods',
  icon: 'lan',
  lessons: [
    {
      id: 'k8s-service',
      title: 'A Service',
      blocks: [
        { type: 'text', value: 'Pods come and go with changing IPs. A Service gives them a stable DNS name and virtual IP, and load-balances traffic across ready pods.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP` },
        { type: 'note', value: 'The selector must match the pod labels. If endpoints are empty, the selector is wrong or the pods are not ready.' },
      ],
    },
    {
      id: 'k8s-service-types',
      title: 'Service types',
      blocks: [
        { type: 'list', items: [
          'ClusterIP - internal only, the default',
          'NodePort - opens a port on every node',
          'LoadBalancer - asks the cloud for an external load balancer',
          'ExternalName - a DNS alias to an external service',
        ] },
        { type: 'note', value: 'Prefer ClusterIP plus an Ingress for HTTP. A LoadBalancer per service gets expensive quickly.' },
      ],
    },
    {
      id: 'k8s-dns-endpoints',
      title: 'DNS and endpoints',
      blocks: [
        { type: 'text', value: 'A Service gets a DNS name such as api.default.svc.cluster.local. In the same namespace, api is enough. Endpoints list the ready pod IPs behind the service.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kubectl get svc
kubectl get endpoints api
kubectl describe svc api
kubectl run tmp --rm -it --image=busybox -- sh
# inside: wget -qO- http://api` },
        { type: 'note', value: 'A pod without a readiness probe may receive traffic before the app is ready. That looks like a service bug but is a probe problem.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'services',
      q: 'What does a Service provide?',
      options: ['A stable name and load balancing', 'A database', 'A disk', 'A build'],
      answer: 0,
      explain: 'It gives pods a stable network identity.',
    },
    {
      chapterId: 'services',
      q: 'Which type is internal only?',
      options: ['NodePort', 'LoadBalancer', 'ClusterIP', 'ExternalName'],
      answer: 2,
      explain: 'ClusterIP is reachable only inside the cluster.',
    },
    {
      chapterId: 'services',
      q: 'Why are endpoints empty?',
      options: ['The cluster is off', 'The selector or readiness is wrong', 'DNS is disabled', 'The image is private'],
      answer: 1,
      explain: 'No ready pods match the selector.',
    },
  ],
};
