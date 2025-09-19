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