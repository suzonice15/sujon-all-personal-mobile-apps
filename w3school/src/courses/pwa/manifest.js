// PWA chapter: Manifest & Install.

export default {
  id: 'manifest',
  title: 'Manifest & Install',
  description: 'Name, icons, display mode and the install prompt',
  icon: 'install-mobile',
  lessons: [
    {
      id: 'pwa-manifest',
      title: 'The web app manifest',
      blocks: [
        { type: 'text', value: 'The manifest is a JSON file that tells the browser the app name, icons, colours and how it should open. It is linked from the HTML and enables the install prompt.' },
        { type: 'code', lang: 'json', tryIt: false, value: `{
  "name": "CodeNest",
  "short_name": "CodeNest",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f766e",
  "theme_color": "#0f766e",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}` },
        { type: 'note', value: 'Provide at least 192 and 512 pixel icons. A maskable icon looks better on Android adaptive shapes.' },
      ],
    },
    {
      id: 'pwa-install',
      title: 'The install experience',
      blocks: [
        { type: 'text', value: 'Browsers show an install prompt when the manifest and service worker meet the criteria. You can capture beforeinstallprompt and show your own button at the right moment.' },
        { type: 'code', lang: 'js', tryIt: false, value: `let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
});

async function install() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  console.log('install outcome:', outcome);
}` },
        { type: 'note', value: 'Do not prompt on first load. Ask after the user has done something useful, such as finishing a lesson.' },
      ],
    },
    {
      id: 'pwa-ios',
      title: 'iOS and platform notes',
      blocks: [
        { type: 'text', value: 'iOS has no beforeinstallprompt. Users add to the home screen from the Share menu. Provide a short, visible instruction on iOS instead of a custom button that does nothing.' },
        { type: 'list', items: [
          'iOS: Share -> Add to Home Screen',
          'iOS: push requires a home-screen install',
          'Android: install prompt or browser menu',
          'Desktop: install icon in the address bar',
          'Test the standalone display mode',
        ] },
        { type: 'note', value: 'Detect iOS and show the manual instruction. A button that silently fails is worse than no button.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'manifest',
      q: 'What does the manifest define?',
      options: ['Server routes', 'Name, icons, colours and display mode', 'Database schema', 'Tests'],
      answer: 1,
      explain: 'It describes the installed app.',
    },
    {
      chapterId: 'manifest',
      q: 'Which icon sizes are the minimum?',
      options: ['16 and 32', '192 and 512', '1024 only', 'Any size'],
      answer: 1,
      explain: '192 and 512 are the common requirement.',
    },
    {
      chapterId: 'manifest',
      q: 'When should you show the install prompt?',
      options: ['On first load', 'After the user gets value', 'Never', 'On every page'],
      answer: 1,
      explain: 'Prompt at a useful moment.',
    },
    {
      chapterId: 'manifest',
      q: 'How do iOS users install a PWA?',
      options: ['beforeinstallprompt', 'Share -> Add to Home Screen', 'The App Store', 'A custom button only'],
      answer: 1,
      explain: 'iOS uses the Share menu.',
    },
  ],
};
