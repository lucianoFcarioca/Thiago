const CACHE_NAME = "cec-cache-v1";

const urlsToCache = [
  "/Thiago/",
  "/Thiago/index.html",
  "/Thiago/style.css",
  "/Thiago/app.js",
  "/Thiago/dados.json",
  "/Thiago/icon-192.png",
  "/Thiago/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});