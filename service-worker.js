self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("time-cache").then(cache => {
      return cache.addAll([
        "./",
        "index.html",
        "style.css",
        "app.js",
        "dados.json"
      ]);
    })
  );
});