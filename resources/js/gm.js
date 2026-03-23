// ─── Base de datos en memoria (shared via localStorage) ──────────────────────
const DB_KEY = 'gm_productos';

const PRODUCTOS_INIT = [
    { id: 1, nombre: 'McLaren W1',           precio: '$ 2,100,000 USD', categoria: 'Vehículo',  subcategoria: 'Deportivos',  img: 'https://website-images.mclaren.com/50/mclaren-w1-front-three-quarter.jpg' },
    { id: 2, nombre: 'Porsche 911 Carrera S', precio: '$ 122,000 USD',  categoria: 'Vehículo',  subcategoria: 'Deportivos',  img: 'https://cms-assets.autoscout24.com/uaddx06iwzdz/1VkIfekyigl2PGmBZCyeh8/cafbf0103a56e50a7622bc90cb257452/porsche-911-carrera-s-front.jpeg?w=1100' },
    { id: 3, nombre: 'Chevy del marketplace', precio: '3 pesos y una vaca', categoria: 'Vehículo', subcategoria: 'Sedanes',    img: 'https://www.excelenciasdelmotor.com/sites/default/files/inline-images/Chevy_Swing_5P_1996_Blanco.JPG' },
    { id: 4, nombre: 'Ford Raptor R',         precio: '$ 68,000 USD',   categoria: 'Vehículo',  subcategoria: 'Todoterreno', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2023_Ford_F-150_Raptor_R%2C_front_8.27.22.jpg/1280px-2023_Ford_F-150_Raptor_R%2C_front_8.27.22.jpg' },
    { id: 5, nombre: 'Tesla Model S',         precio: '$ 89,990 USD',   categoria: 'Vehículo',  subcategoria: 'De viaje',    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2020_Tesla_Model_S_%28facelift%2C_red%29%2C_front_8.15.19.jpg/1280px-2020_Tesla_Model_S_%28facelift%2C_red%29%2C_front_8.15.19.jpg' },
    { id: 6, nombre: 'Kenworth T680',         precio: '$ 195,000 USD',  categoria: 'Vehículo',  subcategoria: 'De carga',    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Kenworth_T680_2013.jpg/1280px-Kenworth_T680_2013.jpg' },
    { id: 7, nombre: 'Cobertor de volante de cuero vinil',  precio: '$ 350 MXN',   categoria: 'Accesorio', subcategoria: '', img: 'https://m.media-amazon.com/images/I/719AghGyrWL.jpg' },
    { id: 8, nombre: 'Funda para asiento de cuero rojo y negro', precio: '$ 1,200 MXN', categoria: 'Accesorio', subcategoria: '', img: 'https://http2.mlstatic.com/D_NQ_NP_845786-MLM94722672343_102025-O.webp' },
    { id: 9, nombre: 'Cabeza para palanca de cambios metálica', precio: '$ 280 MXN', categoria: 'Accesorio', subcategoria: '', img: 'https://m.media-amazon.com/images/I/61mfm6SchWL._AC_UF894,1000_QL80_.jpg' },
];

// ── Leer / escribir DB ────────────────────────────────────────────────────────
function dbRead() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
        localStorage.setItem(DB_KEY, JSON.stringify(PRODUCTOS_INIT));
        return PRODUCTOS_INIT;
    }
    return JSON.parse(raw);
}

function dbWrite(productos) {
    localStorage.setItem(DB_KEY, JSON.stringify(productos));
}

function dbAdd(producto) {
    const productos = dbRead();
    const id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    productos.push({ ...producto, id });
    dbWrite(productos);
    return id;
}

function dbUpdate(id, datos) {
    const productos = dbRead();
    const idx = productos.findIndex(p => p.id === id);
    if (idx !== -1) productos[idx] = { ...productos[idx], ...datos };
    dbWrite(productos);
}

function dbDelete(id) {
    const productos = dbRead().filter(p => p.id !== id);
    dbWrite(productos);
}

// ── Auth ──────────────────────────────────────────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';
const AUTH_KEY   = 'gm_admin_user';

function authLogin(usuario, password) {
    if (usuario === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem(AUTH_KEY, usuario);
        return true;
    }
    return false;
}

function authLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}

function authCheck() {
    const u = sessionStorage.getItem(AUTH_KEY);
    if (!u) { window.location.href = 'index.html'; }
    return u;
}

function authGet() {
    return sessionStorage.getItem(AUTH_KEY);
}

// ── Validaciones ──────────────────────────────────────────────────────────────
function validarContacto(f) {
    const e = {};
    if (!f.nombre.trim())   e.nombre   = 'El nombre es requerido.';
    if (!f.email.trim())    e.email    = 'El correo es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Correo inválido.';
    if (!f.telefono.trim()) e.telefono = 'El teléfono es requerido.';
    else if (!/^\+?[\d\s\-]{7,15}$/.test(f.telefono))     e.telefono = 'Teléfono inválido (7–15 dígitos).';
    if (!f.asunto)          e.asunto   = 'Selecciona un asunto.';
    if (!f.mensaje.trim())  e.mensaje  = 'El mensaje es requerido.';
    else if (f.mensaje.trim().length < 10) e.mensaje = 'Mínimo 10 caracteres.';
    return e;
}

function validarProducto(f) {
    const e = {};
    if (!f.nombre.trim())   e.nombre    = 'El nombre es requerido.';
    if (!f.precio.trim())   e.precio    = 'El precio es requerido.';
    if (!f.categoria)       e.categoria = 'Selecciona una categoría.';
    if (!f.img.trim())      e.img       = 'La URL de imagen es requerida.';
    else if (!/^https?:\/\/.+/.test(f.img)) e.img = 'Debe ser una URL válida (http/https).';
    return e;
}

function validarLogin(f) {
    const e = {};
    if (!f.usuario.trim())  e.usuario  = 'El usuario es requerido.';
    if (!f.password.trim()) e.password = 'La contraseña es requerida.';
    return e;
}

// ── Helpers de UI ─────────────────────────────────────────────────────────────

/** Muestra error en un campo Bootstrap */
function mostrarError(inputEl, msg) {
    inputEl.classList.add('is-invalid');
    let fb = inputEl.nextElementSibling;
    if (!fb || !fb.classList.contains('invalid-feedback')) {
        fb = document.createElement('div');
        fb.className = 'invalid-feedback';
        inputEl.parentNode.insertBefore(fb, inputEl.nextSibling);
    }
    fb.textContent = msg;
}

/** Limpia error de un campo */
function limpiarError(inputEl) {
    inputEl.classList.remove('is-invalid');
    const fb = inputEl.nextElementSibling;
    if (fb && fb.classList.contains('invalid-feedback')) fb.textContent = '';
}

/** Limpia todos los errores de un formulario */
function limpiarErrores(formEl) {
    formEl.querySelectorAll('.is-invalid').forEach(el => limpiarError(el));
}

/** Crea y muestra un modal de Bootstrap desde JS */
function mostrarModal({ titulo, cuerpoHtml, btnConfirmarTexto = 'Confirmar', btnConfirmarClase = 'btn-primary', onConfirmar }) {
    const id = 'gm-modal-dinamico';
    document.getElementById(id)?.remove();

    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal fade';
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${titulo}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">${cuerpoHtml}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn ${btnConfirmarClase}" id="gm-modal-confirm">${btnConfirmarTexto}</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    document.getElementById('gm-modal-confirm').addEventListener('click', () => {
        bsModal.hide();
        if (onConfirmar) onConfirmar();
    });

    modal.addEventListener('hidden.bs.modal', () => modal.remove());
}
