const CACHE_NAME = "dashboard-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/login.html",
  "/show.html",
  "/Add.html",
  "/css/style.css",
  "/css/all.min.css",
  "/js/main.js",
  "/js/all.min.js",
  "/image/avatar.png",
  "/image/tiger.jpg",
  "/image/user.webp",
  "/webfonts/fa-brands-400.ttf",
  "/webfonts/fa-regular-400.woff2",
  "/webfonts/fa-solid-900.ttf",
  "/webfonts/fa-regular-400.ttf",
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
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
