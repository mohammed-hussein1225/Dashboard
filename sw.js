const CACHE_NAME = "dashboard-cache-v1";
const FILES_TO_CACHE = [
  "Dashboard/manifest.json",
  "Dashboard/index.html",
  "Dashboard/login.html",
  "Dashboard/show.html",
  "Dashboard/Add.html",
  "Dashboard/css/style.css",
  "Dashboard/css/all.min.css",
  "Dashboard/js/main.js",
  "Dashboard/js/all.min.js",
  "Dashboard/image/avatar.png",
  "Dashboard/image/icon.png",
  "Dashboard/image/tiger.jpg",
  "Dashboard/image/user.webp",
  "Dashboard/webfonts/fa-brands-400.ttf",
  "Dashboard/webfonts/fa-regular-400.woff2",
  "Dashboard/webfonts/fa-solid-900.ttf",
  "Dashboard/webfonts/fa-regular-400.ttf",
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// جلب الملفات من الكاش عند عدم وجود إنترنت
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((network) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, network.clone());
            return network;
          });
        })
      );
    })
  );
});

// تحديث الكاش عند وجود إصدار جديد
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
