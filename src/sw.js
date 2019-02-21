/* global serviceWorkerOption */
/* eslint-disable no-restricted-globals */

const cacheName = 'sw0221190040';

// add files to cache on install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(serviceWorkerOption.assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    // serve request if cached
    caches.match(e.request).then(
      res =>
        res ||
        // save requet to cache
        fetch(e.request).then(response =>
          caches.open(cacheName).then(cache => {
            cache.put(e.request, response.clone());
            return response;
          })
        )
    )
  );
});

// clean up cache on update
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }

          return null;
        })
      )
    )
  );
});
