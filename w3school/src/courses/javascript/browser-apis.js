// JavaScript chapter: Browser APIs. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'browser-apis',
  title: 'Browser APIs',
  description: 'Storage, dates, observers, location and animation',
  icon: 'public',
  lessons: [
    {
      id: 'js-local-storage',
      title: 'localStorage',
      blocks: [
        { type: 'text', value: 'localStorage saves small amounts of data in the browser. It survives page reloads and restarts, which makes it perfect for settings, drafts and simple progress.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<p>You have visited this page <strong id="visits">0</strong> times.</p>
<label><input type="checkbox" id="dark"> Dark mode</label>
<button id="reset">Reset</button>

<script>
  const visits = Number(localStorage.getItem('visits') || 0) + 1;
  localStorage.setItem('visits', visits);
  document.getElementById('visits').textContent = visits;

  // Objects must be stored as JSON text
  const box = document.getElementById('dark');
  function applyPrefs() {
    const prefs = JSON.parse(localStorage.getItem('prefs') || '{"dark": false}');
    box.checked = prefs.dark;
    document.body.style.background = prefs.dark ? '#0f172a' : 'white';
    document.body.style.color = prefs.dark ? 'white' : 'black';
  }
  applyPrefs();

  box.addEventListener('change', () => {
    localStorage.setItem('prefs', JSON.stringify({ dark: box.checked }));
    applyPrefs();
  });

  document.getElementById('reset').addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('visits').textContent = 0;
    applyPrefs();
    console.log('Storage cleared');
  });
</script>` },
        { type: 'text', value: 'Run it several times: the counter keeps going up.' },
        { type: 'list', items: [
          'setItem(key, value), getItem(key), removeItem(key), clear()',
          'Values are always strings: use JSON.stringify / JSON.parse for objects',
          'sessionStorage works the same but is cleared when the tab closes',
          'Never store passwords or tokens there; any script on the page can read it',
        ] },
      ],
    },
    {
      id: 'js-dates',
      title: 'Dates and Times',
      blocks: [
        { type: 'code', lang: 'js', tryIt: true, value: `const now = new Date();
console.log(now.toString());

console.log(now.getFullYear());
console.log(now.getMonth());   // 0 = January! (months start at 0)
console.log(now.getDate());    // day of the month
console.log(now.getDay());     // 0 = Sunday
console.log(now.getHours(), now.getMinutes());

const exam = new Date(2026, 11, 15);  // 15 December 2026
const msLeft = exam - now;
const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
console.log('Days until exam:', daysLeft);

const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
console.log('Tomorrow:', tomorrow.toDateString());

console.log(now.toISOString()); // standard format for APIs` },
        { type: 'note', value: 'Months are 0-11 but days are 1-31. This trips up almost everyone at least once.' },
      ],
    },
    {
      id: 'js-intl',
      title: 'Formatting Numbers and Dates (Intl)',
      blocks: [
        { type: 'text', value: 'The Intl API formats numbers, currency and dates the way each language and country expects, including Bangla digits.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const amount = 1234567.891;

console.log(new Intl.NumberFormat('en-US').format(amount));  // 1,234,567.891
console.log(new Intl.NumberFormat('en-IN').format(amount));  // 12,34,567.891 (lakh style)
console.log(new Intl.NumberFormat('bn-BD').format(amount));  // Bangla digits

const taka = new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' });
console.log(taka.format(2500));

const date = new Date(2026, 9, 20);
console.log(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
console.log(date.toLocaleDateString('bn-BD', { weekday: 'long', day: 'numeric', month: 'long' }));

const ago = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(ago.format(-1, 'day'));   // "yesterday"
console.log(ago.format(3, 'week'));   // "in 3 weeks"` },
        { type: 'note', value: 'Never build number formats by hand with string tricks. Intl handles commas, decimals and local digits correctly.' },
      ],
    },
    {
      id: 'js-intersection-observer',
      title: 'IntersectionObserver: Lazy Loading and Infinite Scroll',
      blocks: [
        { type: 'text', value: 'IntersectionObserver tells you when an element enters or leaves the screen, without slow scroll listeners. It powers infinite feeds, lazy images and "animate when visible" effects.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .card { height: 90px; margin: 10px 0; border-radius: 10px; background: #e2e8f0;
          display: grid; place-items: center; opacity: 0; transform: translateY(20px); transition: 0.4s; }
  .card.visible { opacity: 1; transform: none; background: #a16207; color: white; }
  #sentinel { text-align: center; color: #64748b; padding: 10px; }
</style>

<div id="feed"></div>
<div id="sentinel">Loading more...</div>

<script>
  const feed = document.getElementById('feed');
  let count = 0;

  const revealer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealer.unobserve(entry.target);   // animate only once
      }
    });
  }, { threshold: 0.3 });

  function addCards(n) {
    for (let i = 0; i < n; i++) {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = 'Post #' + (++count);
      feed.append(card);
      revealer.observe(card);
    }
  }

  // Infinite scroll: load more when the sentinel comes into view
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && count < 60) addCards(6);
  }).observe(document.getElementById('sentinel'));

  addCards(6);
</script>` },
        { type: 'text', value: 'Scroll down inside the result: new posts keep loading and each one fades in as it appears.' },
      ],
    },
    {
      id: 'js-geolocation',
      title: 'Geolocation',
      blocks: [
        { type: 'text', value: 'The Geolocation API asks the user for permission, then provides their latitude and longitude. It needs a secure (https) page.' },
        { type: 'code', lang: 'js', value: `if (!('geolocation' in navigator)) {
  console.log('Geolocation is not supported');
} else {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude, accuracy } = position.coords;
      console.log(\`You are at \${latitude}, \${longitude} (±\${accuracy} m)\`);
    },
    error => {
      // 1 = permission denied, 2 = unavailable, 3 = timeout
      console.log('Could not get location:', error.message);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// Continuous updates, e.g. for a delivery tracking map
const watchId = navigator.geolocation.watchPosition(pos => console.log(pos.coords));
navigator.geolocation.clearWatch(watchId);` },
        { type: 'list', items: [
          'Always handle the error case: many users tap "Deny".',
          'Ask for location only when the user does something that needs it, not on page load.',
          'Combine it with the weather project to show local weather.',
        ] },
      ],
    },
    {
      id: 'js-clipboard-share',
      title: 'Clipboard and Web Share',
      blocks: [
        { type: 'code', lang: 'html', tryIt: true, value: `<input id="code" value="CODENEST-2026" readonly>
<button id="copy">Copy coupon</button>
<button id="share">Share this course</button>
<p id="status"></p>

<script>
  const status = document.getElementById('status');

  document.getElementById('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById('code').value);
      status.textContent = 'Copied!';
    } catch (e) {
      status.textContent = 'Copy failed: ' + e.message;
    }
  });

  document.getElementById('share').addEventListener('click', async () => {
    if (!navigator.share) {
      status.textContent = 'Sharing is not supported here.';
      return;
    }
    try {
      await navigator.share({ title: 'CodeNest', text: 'Learn JavaScript for free', url: 'https://example.com' });
      status.textContent = 'Thanks for sharing!';
    } catch (e) {
      status.textContent = 'Share cancelled';
    }
  });
</script>` },
        { type: 'list', items: [
          'navigator.clipboard.writeText / readText: copy and paste text (needs a user tap and https)',
          'navigator.share: opens the phone\'s native share sheet (WhatsApp, Messenger...)',
          'Always check support first and give a fallback.',
        ] },
      ],
    },
    {
      id: 'js-animation-frame',
      title: 'requestAnimationFrame and Canvas Animation',
      blocks: [
        { type: 'text', value: 'requestAnimationFrame runs your drawing code right before the screen refreshes (usually 60 times per second), pausing automatically when the tab is hidden. It is the right tool for smooth JavaScript animation and games.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<canvas id="game" width="300" height="200" style="background:#0f172a;border-radius:10px;max-width:100%"></canvas>

<script>
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const ball = { x: 50, y: 50, dx: 2.5, dy: 2, r: 12 };

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.dx *= -1;
    if (ball.y < ball.r || ball.y > canvas.height - ball.r) ball.dy *= -1;

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = '#facc15';
    ctx.fill();

    requestAnimationFrame(frame);   // schedule the next frame
  }
  requestAnimationFrame(frame);
</script>` },
        { type: 'note', value: 'For simple UI motion, CSS transitions are easier and faster. Use requestAnimationFrame when JavaScript must calculate every frame.' },
      ],
    },
    {
      id: 'js-pwa',
      title: 'Progressive Web Apps and Service Workers',
      blocks: [
        { type: 'text', value: 'A Progressive Web App (PWA) is a website that behaves like an installed app: it can be added to the home screen, opens full screen and works offline. Two pieces make it possible: a web app manifest and a service worker.' },
        { type: 'code', lang: 'html', value: `<!-- index.html -->
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0f766e">

<!-- manifest.webmanifest -->
{
  "name": "CodeNest",
  "short_name": "CodeNest",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f766e",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}` },
        { type: 'text', value: 'A service worker is a script that sits between your page and the network. It can cache files and answer requests even when there is no connection.' },
        { type: 'code', lang: 'js', value: `// main.js: register it
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js: cache the app shell, serve from cache first, then network
const CACHE = 'codenest-v1';
const FILES = ['/', '/index.html', '/app.js', '/style.css'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});` },
        { type: 'list', items: [
          'Service workers only run on https (and localhost).',
          'Change the cache name (v2) to ship updates; delete old caches in the activate event.',
          'Tools like vite-plugin-pwa (Workbox) generate service workers for you.',
          'For larger offline data, use IndexedDB (a browser database) via a wrapper like idb.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'browser-apis', q: 'What type of value does localStorage.getItem() return?', options: ['Whatever was saved', 'Always a string (or null)', 'Always a number', 'An object'], answer: 1, explain: 'localStorage stores strings only.' },
    { chapterId: 'browser-apis', q: 'How do you store an object in localStorage?', options: ['setItem(key, obj)', 'setItem(key, JSON.stringify(obj))', 'setObject(key, obj)', 'It is not possible'], answer: 1, explain: 'Convert to JSON text first, parse it when reading.' },
    { chapterId: 'browser-apis', q: 'What does new Date().getMonth() return in January?', options: ['1', '0', '"January"', '12'], answer: 1, explain: 'Months are numbered 0 to 11.' },
    { chapterId: 'browser-apis', q: 'Which API formats a number as currency for a locale?', options: ['Number.toCurrency()', 'Intl.NumberFormat', 'Math.format()', 'String.money()'], answer: 1, explain: 'Intl.NumberFormat with style: "currency".' },
    { chapterId: 'browser-apis', q: 'Which API detects when an element scrolls into view?', options: ['ResizeObserver', 'IntersectionObserver', 'MutationObserver', 'scrollTo()'], answer: 1, explain: 'It is the efficient way to build lazy loading and infinite scroll.' },
    { chapterId: 'browser-apis', q: 'What must you always handle with the Geolocation API?', options: ['The user denying permission', 'Dark mode', 'Fonts', 'Cookies'], answer: 0, explain: 'Pass an error callback for denied, unavailable or timed-out requests.' },
    { chapterId: 'browser-apis', q: 'Why use requestAnimationFrame instead of setInterval for animation?', options: ['It is shorter', 'It syncs with the screen refresh and pauses in hidden tabs', 'It runs on another thread', 'It works without JavaScript'], answer: 1, explain: 'Smoother frames and less wasted battery.' },
    { chapterId: 'browser-apis', q: 'What lets a PWA work offline?', options: ['The manifest file', 'A service worker that caches files', 'localStorage only', 'A CDN'], answer: 1, explain: 'The manifest enables installing; the service worker enables offline use.' },
  ],
};
