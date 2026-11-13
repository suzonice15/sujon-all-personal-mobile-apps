// PWA chapter: Push Notifications.

export default {
  id: 'push-notifications',
  title: 'Push Notifications',
  description: 'Permission, subscriptions and sending a push',
  icon: 'notifications',
  lessons: [
    {
      id: 'pwa-push-permission',
      title: 'Permission and subscription',
      blocks: [
        { type: 'text', value: 'Push needs permission, a service worker and a push subscription. Ask for permission only after a clear user action, never on first load.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const permission = await Notification.requestPermission();
if (permission !== 'granted') return;

const registration = await navigator.serviceWorker.ready;
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
});

await fetch('/api/push/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(subscription),
});` },
        { type: 'note', value: 'The application server key is the public VAPID key. Keep the private key on the server.' },
      ],
    },
    {
      id: 'pwa-push-send',
      title: 'Sending a push',
      blocks: [
        { type: 'text', value: 'The server sends a push to the subscription endpoint with a VAPID signature. The service worker receives a push event and shows a notification. The payload is encrypted between server and browser.' },
        { type: 'code', lang: 'js', tryIt: false, value: `self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'CodeNest', {
      body: data.body || 'New update',
      icon: '/icon-192.png',
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});` },
        { type: 'note', value: 'Push is for timely, relevant messages. A daily marketing blast trains users to block notifications.' },
      ],
    },
    {
      id: 'pwa-push-notes',
      title: 'Reliability notes',
      blocks: [
        { type: 'list', items: [
          'iOS requires the PWA to be installed first',
          'Subscriptions expire; remove dead endpoints',
          'Handle notificationclick to open the right page',
          'Do not send secrets in the payload',
          'Respect the user’s permission choice',
          'Provide an in-app notification setting',
        ] },
        { type: 'text', value: 'Store subscriptions per user and device. A user may have several devices, and each has its own endpoint.' },
        { type: 'note', value: 'A push that arrives at 3am is uninstalled. Schedule by the user’s time zone.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'push-notifications',
      q: 'When should you ask for notification permission?',
      options: ['On first load', 'After a clear user action', 'Never', 'Every visit'],
      answer: 1,
      explain: 'Ask when the user expects it.',
    },
    {
      chapterId: 'push-notifications',
      q: 'Which key stays on the server?',
      options: ['Public VAPID key', 'Private VAPID key', 'The subscription endpoint', 'The icon'],
      answer: 1,
      explain: 'The private key signs pushes.',
    },
    {
      chapterId: 'push-notifications',
      q: 'Which event shows the notification?',
      options: ['fetch', 'push', 'install', 'activate'],
      answer: 1,
      explain: 'The service worker handles push.',
    },
    {
      chapterId: 'push-notifications',
      q: 'What does iOS require before push?',
      options: ['A paid account', 'The PWA must be installed', 'A native app', 'No service worker'],
      answer: 1,
      explain: 'iOS requires home-screen install.',
    },
  ],
};
