const CACHE_NAME = 'cartas-kelly-v1.0.3';
const CACHE_ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './css/cartas.css',
    './css/animaciones.css',
    './js/app.js',
    './js/cartas-data.js',
    './js/pwa.js',
    './manifest.json',
    './icons/icon.svg',
    './icons/kaisei-y-yo.ico'
];

self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Instalación completa');
                return self.skipWaiting();
            })
            .catch(err => {
                console.log('Service Worker: Error en instalación', err);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activando...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== CACHE_NAME) {
                            console.log('Service Worker: Limpiando cache antiguo', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activado');
                return self.clients.claim();
            })
    );
});

// ============================================
// INTERCEPTAR PETICIONES (FETCH)
// Estrategia: Network First para TODOS los recursos
// Siempre intenta obtener la última versión de la red
// ============================================
self.addEventListener('fetch', event => {
    // Solo cachear peticiones GET
    if (event.request.method !== 'GET') return;
    
    // Ignorar extensiones del navegador y requests externos
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }
    
    // Network First para TODOS los archivos (HTML, CSS, JS)
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Si la respuesta es exitosa, actualizar el cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                    console.log('Service Worker: Actualizado desde red', event.request.url);
                }
                return response;
            })
            .catch(err => {
                // Si falla la red, usar el cache como respaldo
                console.log('Service Worker: Red no disponible, usando cache', event.request.url);
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // Si tampoco está en cache y es HTML, devolver el index
                        if (event.request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('/index.html');
                        }
                        throw err;
                    });
            })
    );
});

// Esta función ya no es necesaria con la estrategia Network First
// El cache se actualiza automáticamente en cada fetch exitoso

// ============================================
// SINCRONIZACIÓN EN SEGUNDO PLANO
// ============================================
self.addEventListener('sync', event => {
    console.log('Service Worker: Sincronización en segundo plano', event.tag);
    
    if (event.tag === 'sync-cartas') {
        event.waitUntil(
            // Aquí puedes agregar lógica para sincronizar datos
            // Por ejemplo, enviar cartas guardadas offline al servidor
            sincronizarDatos()
        );
    }
});

function sincronizarDatos() {
    return new Promise((resolve, reject) => {
        // Implementar lógica de sincronización aquí
        console.log('Sincronizando datos...');
        resolve();
    });
}

// ============================================
// NOTIFICACIONES PUSH (Opcional)
// ============================================
self.addEventListener('push', event => {
    console.log('Service Worker: Push recibido');
    
    const options = {
        body: event.data ? event.data.text() : 'Nueva carta disponible',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Cartas para María', options)
    );
});

self.addEventListener('notificationclick', event => {
    console.log('Notificación clickeada');
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

self.addEventListener('message', event => {
    console.log('Service Worker: Mensaje recibido', event.data);
    
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
    
    if (event.data.action === 'clearCache') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => caches.delete(cache))
                );
            })
        );
    }
});