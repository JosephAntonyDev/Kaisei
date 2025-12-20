if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado exitosamente:', registration.scope);
                
                // Verificar actualizaciones cada 5 minutos
                setInterval(() => {
                    registration.update();
                }, 5 * 60 * 1000);
                
                // Escuchar actualizaciones del Service Worker
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Hay una nueva versión - activar y recargar automáticamente
                            console.log('Nueva versión detectada, actualizando...');
                            newWorker.postMessage({ action: 'skipWaiting' });
                        }
                    });
                });
                
                // Recargar cuando el nuevo SW tome control
                let refreshing = false;
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    if (!refreshing) {
                        refreshing = true;
                        console.log('Aplicando actualización...');
                        window.location.reload();
                    }
                });
            })
            .catch(error => {
                console.log('Error al registrar Service Worker:', error);
            });
    });
    
    // Escuchar mensajes del Service Worker
    navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
            console.log('Cache actualizado:', event.data.url);
            
            // Si es un archivo importante y debe recargar, hacerlo automáticamente
            if (event.data.shouldReload) {
                console.log('Recargando para aplicar cambios...');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        }
    });
}

function mostrarNotificacionActualizacion() {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <i class="fas fa-sync-alt"></i>
            <span>¡Hay una nueva versión disponible!</span>
            <button id="reloadButton" class="update-button">Actualizar</button>
            <button id="dismissButton" class="dismiss-button">×</button>
        </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('update-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'update-notification-styles';
        style.textContent = `
            .update-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                animation: slideInRight 0.5s ease-out;
            }
            
            .update-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .update-content i {
                color: #ef4444;
                font-size: 1.5em;
                animation: spin 2s linear infinite;
            }
            
            .update-button {
                background: #ef4444;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .update-button:hover {
                background: #dc2626;
                transform: scale(1.05);
            }
            
            .dismiss-button {
                background: transparent;
                border: none;
                font-size: 1.5em;
                cursor: pointer;
                color: #9ca3af;
                padding: 0 5px;
            }
            
            .dismiss-button:hover {
                color: #ef4444;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Event listeners
    document.getElementById('reloadButton').addEventListener('click', () => {
        window.location.reload();
    });
    
    document.getElementById('dismissButton').addEventListener('click', () => {
        notification.remove();
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que Chrome muestre el prompt automáticamente
    e.preventDefault();
    // Guardar el evento para usarlo después
    deferredPrompt = e;
    
    // Mostrar botón de instalación personalizado (opcional)
    mostrarBotonInstalacion();
});

function mostrarBotonInstalacion() {
    // Puedes crear un botón personalizado para instalar la PWA
    console.log('💾 PWA puede ser instalada');
    
    // Ejemplo de cómo implementar el botón:
    /*
    const installButton = document.createElement('button');
    installButton.textContent = '📱 Instalar App';
    installButton.className = 'install-button';
    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Usuario ${outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`);
            deferredPrompt = null;
            installButton.remove();
        }
    });
    document.body.appendChild(installButton);
    */
}

window.addEventListener('appinstalled', () => {
    console.log('PWA instalada exitosamente');
    deferredPrompt = null;
});

if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('📱 Ejecutando como PWA instalada');
    // Aquí puedes agregar funcionalidad específica para cuando
    // la app se ejecuta como PWA instalada
}

window.addEventListener('load', () => {
    // Precargar recursos importantes
    precargarRecursos();
});

function precargarRecursos() {
    // Lista de recursos para precargar
    const recursos = [
        './css/styles.css',
        './css/cartas.css',
        './css/animaciones.css',
        './js/cartas-data.js',
        './js/app.js'
    ];
    
    recursos.forEach(url => {
        fetch(url).catch(err => console.log('Error precargando:', url));
    });
}

if ('sync' in navigator.serviceWorker) {
    // Registrar sincronización en segundo plano
    navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('sync-cartas');
    }).then(() => {
        console.log('🔄 Sincronización en segundo plano registrada');
    }).catch(err => {
        console.log('Error al registrar sincronización:', err);
    });
}