const CACHE_NAME = 'mamachef-v1';
const urlsToCache = [
  '/index.html',
  'https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css',
  'https://unpkg.com/vue@3/dist/vue.global.prod.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || 'MamaChef Cooking Timer';
  const options = {
    body: data.body || 'Your cooking timer is complete!',
    icon: '/images/icon-192x192.png',
    badge: '/images/icon-96x96.png',
    tag: data.tag || 'cooking-timer',
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  // Open the app when notification is clicked
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});