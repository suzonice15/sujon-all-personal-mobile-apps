// Kubernetes chapter: Storage.

export default {
  id: 'storage',
  title: 'Storage',
  description: 'Volumes, PVCs and StatefulSets',
  icon: 'storage',
  lessons: [
    {
      id: 'k8s-volumes',
      title: 'Volumes',
      blocks: [
        { type: 'text', value: 'A pod filesystem is ephemeral. A volume gives containers storage that can outlive a restart. emptyDir is temporary; a PersistentVolume is durable.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `volumes:
  - name: data
    emptyDir: {}

containers:
  - name: app
    volumeMounts:
      - name: data
        mountPath: /app/data` },
        { type: 'note', value: 'emptyDir dies with the pod. Do not use it for a database or user uploads.' },
      ],
    },
    {
      id: 'k8s-pvc',
      title: 'PersistentVolumeClaims',
      blocks: [
        { type: 'text', value: 'A PVC requests storage. A StorageClass provisions a PersistentVolume dynamically. The pod mounts the PVC by name.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pgdata
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard` },
        { type: 'note', value: 'ReadWriteOnce means one node can mount it read-write. That is normal for a database and a reason not to scale it like a stateless app.' },
      ],
    },
    {
      id: 'k8s-statefulset',
      title: 'StatefulSets',
      blocks: [
        { type: 'text', value: 'A StatefulSet gives each pod a stable name and its own PVC. It is used for databases, queues and other stateful workloads.' },
        { type: 'list', items: [
          'Stable network identity per pod',
          'Ordered creation and deletion',
          'Per-pod PersistentVolumeClaim',
          'Headless Service for DNS',
          'Still needs backups and a restore plan',
        ] },
        { type: 'note', value: 'Running a database in Kubernetes is possible but operationally heavy. A managed database is usually the better default.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'storage',
      q: 'What is an emptyDir?',
      options: ['Durable storage', 'Temporary storage tied to the pod', 'A database', 'A secret'],
      answer: 1,
      explain: 'It disappears with the pod.',
    },
    {
      chapterId: 'storage',
      q: 'What does a PVC request?',
      options: ['CPU', 'Storage', 'A service', 'A secret'],
      answer: 1,
      explain: 'It requests persistent storage.',
    },
    {
      chapterId: 'storage',
      q: 'What is a StatefulSet for?',
      options: ['Stateless web apps', 'Workloads that need stable identity and storage', 'DNS', 'Ingress'],
      answer: 1,
      explain: 'It is designed for stateful workloads.',
    },
  ],
};
