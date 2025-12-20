let cartasActuales = [];
let cartasFiltradas = [];

document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    cartasActuales = obtenerTodasLasCartas();
    cartasFiltradas = [...cartasActuales];
    
    renderizarCartas();
    
    configurarEventListeners();
    
    actualizarContador();
    
    console.log('Aplicación de cartas iniciada ✨');
}

function configurarEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', manejarBusqueda);
    
    const filterSelect = document.getElementById('filterSelect');
    filterSelect.addEventListener('change', manejarFiltro);
    
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', cerrarModal);
    
    const modal = document.getElementById('cartaModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
}

function renderizarCartas() {
    const grid = document.getElementById('cartasGrid');
    
    if (cartasFiltradas.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-envelope-open"></i>
                <p>No se encontraron cartas con esos criterios</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = '';
    
    cartasFiltradas.forEach((carta, index) => {
        const cartaElement = crearCartaElement(carta, index);
        grid.appendChild(cartaElement);
    });
}

function crearCartaElement(carta, index) {
    const div = document.createElement('div');
    div.className = `carta-card ${carta.diseño}`;
    div.style.animationDelay = `${index * 0.08}s`;
    
    const fechaFormateada = new Date(carta.fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Color del corazón según el diseño
    const coloresCorazon = {
        'sobre': '#dc5858',
        'vintage': '#b8860b',
        'moderno': '#4a7eb8',
        'elegante': '#8b5fb0',
        'celebracion': '#e05780',
        'minimalista': '#707070',
        'romantico': '#c9405a',
        'antiguo': '#8b5a3c'
    };
    
    const colorCorazon = coloresCorazon[carta.diseño] || '#dc5858';
    
    div.innerHTML = `
        <div class="sobre-container">
            <div class="sobre">
                <div class="sobre-flap-back"></div>
                <div class="sobre-body">
                    <div class="sobre-lines">
                        <div class="sobre-line"></div>
                        <div class="sobre-line"></div>
                        <div class="sobre-line"></div>
                    </div>
                </div>
                <div class="sobre-inner-shadow"></div>
                <div class="sobre-flap"></div>
                <div class="sobre-heart" data-id="${carta.id}" title="Abrir carta">
                    <svg viewBox="0 0 24 24" fill="${colorCorazon}">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="sobre-info">
            <h3>${carta.nombre}</h3>
            <p>${fechaFormateada}</p>
        </div>
    `;
    
    // Event listener para abrir carta al hacer click en cualquier parte
    div.addEventListener('click', function() {
        abrirCarta(carta.id);
    });
    
    return div;
}

function abrirCarta(id) {
    const carta = obtenerCartaPorId(id);
    if (!carta) return;
    
    const modal = document.getElementById('cartaModal');
    const contenido = document.getElementById('cartaContenido');
    
    const fechaFormateada = new Date(carta.fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    contenido.innerHTML = `
        <div class="carta-abierta carta-${carta.diseño}">
            <div class="carta-fecha">${fechaFormateada}</div>
            <div class="carta-texto">${carta.contenido}</div>
            <div class="carta-firma">
                <i class="fas fa-heart"></i>
                <span>Con cariño, para ti</span>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    const modal = document.getElementById('cartaModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function manejarBusqueda(e) {
    const termino = e.target.value.toLowerCase().trim();
    
    if (termino === '') {
        cartasFiltradas = [...cartasActuales];
    } else {
        cartasFiltradas = cartasActuales.filter(carta => {
            return carta.nombre.toLowerCase().includes(termino) ||
                   carta.destinatario.toLowerCase().includes(termino) ||
                   carta.contenido.toLowerCase().includes(termino);
        });
    }
    
    // Aplicar el filtro de orden actual
    const filtroActual = document.getElementById('filterSelect').value;
    aplicarOrden(filtroActual);
    
    renderizarCartas();
    actualizarContador();
}

function manejarFiltro(e) {
    const filtro = e.target.value;
    aplicarOrden(filtro);
    renderizarCartas();
}

function aplicarOrden(filtro) {
    switch (filtro) {
        case 'recientes':
            cartasFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            break;
        case 'antiguos':
            cartasFiltradas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            break;
        case 'nombre':
            cartasFiltradas.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'destinatario':
            cartasFiltradas.sort((a, b) => a.destinatario.localeCompare(b.destinatario));
            break;
        default:
            break;
    }
}

function actualizarContador() {
    const counter = document.getElementById('cartasCounter');
    const total = cartasFiltradas.length;
    const texto = total === 1 ? 'carta' : 'cartas';
    counter.textContent = `Mostrando ${total} ${texto}`;
}

window.addEventListener('online', actualizarEstadoConexion);
window.addEventListener('offline', actualizarEstadoConexion);

function actualizarEstadoConexion() {
    const statusElement = document.getElementById('onlineStatus');
    const indicator = statusElement.closest('.offline-indicator');
    
    if (navigator.onLine) {
        statusElement.textContent = 'En línea';
        indicator.classList.remove('offline');
        indicator.classList.add('online');
    } else {
        statusElement.textContent = 'Sin conexión (modo offline)';
        indicator.classList.remove('online');
        indicator.classList.add('offline');
    }
}

actualizarEstadoConexion();