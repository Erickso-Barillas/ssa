const CACHE_NAME = 'scsa-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Icono/favicon-32x32.png',
  './Icono/android-icon-192x192.png',
  './Icono/ms-icon-310x310.png',
  './Icono/apple-icon-180x180.png',
  './Fotos/Camiones de suministros/s1.jpg',
  './Fotos/Camiones de suministros/s2.jpg',
  './Fotos/Camiones de suministros/s3.jpg',
  './Fotos/Camiones de suministros/s4.jpg',
  './Fotos/Camiones de suministros/s5.jpg',
  './Fotos/Camiones de suministros/s6.jpg',
  './Fotos/Tipo panel/pa1.jpg',
  './Fotos/Tipo panel/pa2.jpg',
  './Fotos/Tipo panel/pa3.jpg',
  './Fotos/Tipo panel/pa4.jpg',
  './Fotos/Tipo panel/pa5.jpg',
  './Fotos/Pick up/p1.jpg',
  './Fotos/Pick up/p2.jpg',
  './Fotos/Pick up/p3.jpg',
  './Fotos/Pick up/p4.jpg',
  './Fotos/Pick up/p5.jpg',
  './Fotos/Pick up/p6.jpg',
  './Fotos/Pick up/p7.jpg',
  './Fotos/Tracto remolque/t1.jpg',
  './Fotos/Tracto remolque/t2.jpg',
  './Fotos/Tracto remolque/t3.jpg',
  './Fotos/Tracto remolque/t4.jpg',
  './Fotos/Tracto remolque/t5.jpg',
  './Fotos/Tracto remolque/t6.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
});