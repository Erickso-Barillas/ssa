const CACHE_NAME = 'scsa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Icono/favicon-32x32.png',
  './Icono/android-icon-192x192.png',
  './Icono/ms-icon-310x310.png',
  './Icono/apple-icon-180x180.png',
  './fotos/p_traseras.jpg',
  './fotos/motor.jpg',
  './fotos/cabina.jpg',
  './fotos/llantas.jpg',
  './fotos/baja.jpg',
  './fotos/interior.jpg',
  './fotos/palangana.jpg',
  './fotos/mulita_baja.png',
  './fotos/mulita_asientos.png',
  './fotos/mulita_carretones.png',
  './fotos/chasis.jpg',
  './fotos/tanque.jpg',
  './fotos/dif.jpg',
  './fotos/bolsas.jpg',
  './fotos/baterias.jpg',
  './fotos/asientos.jpg'
];

// Instalación: Guarda archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SCSA: Archivos cacheados correctamente');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Estrategia de carga: Cache primero, luego red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activación: Limpia versiones antiguas de caché
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});