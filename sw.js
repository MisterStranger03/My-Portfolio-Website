// const CACHE_NAME = 'my-portfolio-cache-v1';


// const URLS_TO_CACHE = [
//   '/', 
//   'index.html',
//   'styles.css',
//   'script.js',
//   'assets/myavatar (1).png', 
//   'assets/ChatApp.png',
//   'assets/githublogodark.png',
//     'assets/githublogolight.png',
//     'assets/iiitk.png',
//     'assets/iiitklogo.png',
//     'assets/Ishq Hai.png',
//     'assets/Ishq Hai.mp3',
//     'assets/Learnify AI.png',
//     'assets/portfoliowebsite.png',
//     'assets/Raanjhan.png',
//     'assets/Raanjhan.mp3',
//     'assets/Sahiba.png',
//     'assets/Sahiba.mp3',
//     'assets/sajs.png',
//     'assets/sajslogo.png',
//   'assets/Finding Her.png',
//   'assets/Finding Her.mp3',
//   'icons/icon-portfolio-192x192.png', 
//   'icons/icon-portfolio-512x512.png',
// ];

// self.addEventListener('install', (event) => {
//   console.log('Service Worker: Installing...');
  
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Service Worker: Caching app shell');
//         return cache.addAll(URLS_TO_CACHE);
//       })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
   
//     caches.match(event.request)
//       .then((response) => {
        
//         if (response) {
//           console.log('Service Worker: Serving from cache:', event.request.url);
//           return response;
//         }

       
//         console.log('Service Worker: Fetching from network:', event.request.url);
//         return fetch(event.request);
//       })
//   );
// });


// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             console.log('Service Worker: Deleting old cache', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

const CACHE_NAME = 'my-portfolio-cache-v2'; // ⬅️ bump on every deploy

const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',

  // assets
  '/assets/myavatar (1).png',
  '/assets/ChatApp.png',
  '/assets/githublogodark.png',
  '/assets/githublogolight.png',
  '/assets/iiitk.png',
  '/assets/iiitklogo.png',
  '/assets/Ishq Hai.png',
  '/assets/Ishq Hai.mp3',
  '/assets/Learnify AI.png',
  '/assets/portfoliowebsite.png',
  '/assets/Raanjhan.png',
  '/assets/Raanjhan.mp3',
  '/assets/Sahiba.png',
  '/assets/Sahiba.mp3',
  '/assets/sajs.png',
  '/assets/sajslogo.png',
  '/assets/Finding Her.png',
  '/assets/Finding Her.mp3',

  // icons
  '/icons/icon-portfolio-192x192.png',
  '/icons/icon-portfolio-512x512.png'
];

/* =========================
   INSTALL
========================= */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing new version');

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

/* =========================
   ACTIVATE
========================= */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new version');

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );

      await self.clients.claim();

      // Notify open tabs
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        client.postMessage({ type: 'NEW_VERSION_AVAILABLE' });
      });
    })()
  );
});

/* =========================
   FETCH (Cache First)
========================= */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request);
    })
  );
});