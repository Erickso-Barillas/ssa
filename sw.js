const CACHE_NAME = 'scsa-v2'; // Incrementado a v2 para actualizar la caché

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Icono/favicon-32x32.png',
  './Icono/android-icon-192x192.png',
  './Icono/ms-icon-310x310.png',
  './Icono/apple-icon-180x180.png',
  // Rutas ajustadas según la lógica de tu index.html
  // Asegúrate de que tus archivos en GitHub tengan exactamente estas extensiones
  './Fotos/Camiones de suministros/s1.png',
  './Fotos/Camiones de suministros/s2.png',
  './Fotos/Camiones de suministros/s3.png',
  './Fotos/Camiones de suministros/s4.png',
  './Fotos/Camiones de suministros/s5.png',
  './Fotos/Camiones de suministros/s6.png',
  './Fotos/Tipo panel/pa1.png',
  './Fotos/Tipo panel/pa2.png',
  './Fotos/Tipo panel/pa3.png',
  './Fotos/Tipo panel/pa4.png',
  './Fotos/Tipo panel/pa5.png',
  './Fotos/Pick up/p1.png',
  './Fotos/Pick up/p2.png',
  './Fotos/Pick up/p3.png',
  './Fotos/Pick up/p4.png',
  './Fotos/Pick up/p5.png',
  './Fotos/Pick up/p6.png',
  './Fotos/Pick up/p7.png',
  './Fotos/Tracto remolque/t1.png',
  './Fotos/Tracto remolque/t2.png',
  './Fotos/Tracto remolque/t3.png',
  './Fotos/Tracto remolque/t4.png',
  './Fotos/Tracto remolque/t5.png',
  './Fotos/Tracto remolque/t6.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});