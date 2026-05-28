const CACHE_NAME = 'scsa-v4-cache';
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

// Instalación: Almacenar recursos estáticos en caché de inmediato
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto correctamente. Descargando recursos offline...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: Elimina versiones antiguas de caché para evitar conflictos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// Intercepción de Peticiones: Estrategia Estrícta Offline para PWAs
self.addEventListener('fetch', event => {
  // Ignorar peticiones que no sean del protocolo http o https (como extensiones de Chrome o esquemas raros)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Si el archivo está en caché, lo devuelve instantáneamente y actualiza el caché de fondo si hay red
        fetch(event.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {/* Ignorar errores de red cuando está offline */});
        
        return cachedResponse;
      }

      // Si no está en caché, va a buscarlo a la red
      return fetch(event.request).catch(() => {
        // Si falla la red y se solicita una navegación, redirige al index local
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});