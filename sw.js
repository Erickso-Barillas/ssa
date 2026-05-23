const CACHE_NAME = 'scsa-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Icono/favicon-32x32.png',
  './Icono/android-icon-192x192.png',
  './Icono/ms-icon-310x310.png',
  './Icono/apple-icon-180x180.png',
  './Fotos/Camiones%20de%20suministros/s1.png',
  './Fotos/Camiones%20de%20suministros/s2.png',
  './Fotos/Camiones%20de%20suministros/s3.png',
  './Fotos/Camiones%20de%20suministros/s4.png',
  './Fotos/Camiones%20de%20suministros/s5.png',
  './Fotos/Camiones%20de%20suministros/s6.png',
  './Fotos/Tipo%20panel/pa1.png',
  './Fotos/Tipo%20panel/pa2.png',
  './Fotos/Tipo%20panel/pa3.png',
  './Fotos/Tipo%20panel/pa4.png',
  './Fotos/Tipo%20panel/pa5.png',
  './Fotos/Pick%20up/p1.png',
  './Fotos/Pick%20up/p2.png',
  './Fotos/Pick%20up/p3.png',
  './Fotos/Pick%20up/p4.png',
  './Fotos/Pick%20up/p5.png',
  './Fotos/Pick%20up/p6.png',
  './Fotos/Pick%20up/p7.png',
  './Fotos/Tracto%20remolque/t1.png',
  './Fotos/Tracto%20remolque/t2.png',
  './Fotos/Tracto%20remolque/t3.png',
  './Fotos/Tracto%20remolque/t4.png',
  './Fotos/Tracto%20remolque/t5.png',
  './Fotos/Tracto%20remolque/t6.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});