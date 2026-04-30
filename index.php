<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grand Motors - Inicio</title>
    <link rel="icon" type="image/x-icon" href="resources/images/tab-icon.png">
    <link rel="stylesheet" href="resources/css/bootstrap.min.css">
</head>
<body class="bg-light bg-gradient">
    <header class="bg-dark bg-gradient text-white shadow px-4 py-3 d-flex justify-content-between align-items-center flex-wrap">
        <a href="index.php">
            <img src="resources/images/logo.png" width="250" alt="Logo">
        </a>
        <div class="d-flex gap-3 flex-wrap mt-3 mt-md-0 align-items-center">
            <a class="btn btn-outline-light" href="index.php">Inicio</a>
            <a class="btn btn-outline-light" href="mision.php">Misión</a>
            <a class="btn btn-outline-light" href="vision.php">Visión</a>
            <a class="btn btn-outline-light" href="contacto.php">Contacto</a>
            <a class="btn btn-outline-light" href="compra.php">Compra</a>
            <select id="opciones" name="opciones" class="btn btn-outline-light" style="appearance: none; width: auto;" onchange="if(this.value) window.location.href=this.value;">
                <option value="" disabled selected hidden>Servicios</option>
                <option value="accesorios.php">Accesorios</option>
                <option value="seguros.php">Seguros y garantía</option>
            </select>
            <button class="btn btn-warning text-dark fw-semibold" id="btn-admin-login">🔒 Administración</button>
        </div>
    </header>

    <main>
        <div class="text-center" style="font-family: 'Merriwheather';">
            <h2 class="text-center pt-3">Catálogo de Autos</h2>
            <hr>
            <select id="categoria" name="categoria" class="btn btn-outline-secondary">
                <option value="">Seleccione una categoría</option>
                <option value="Deportivos">Deportivos</option>
                <option value="Todoterreno">Todoterreno</option>
                <option value="Sedanes">Sedanes</option>
                <option value="De carga">De carga</option>
                <option value="De viaje">De viaje</option>
            </select>
        </div>
        <br>
        <div class="container">
            <div class="row" id="catalogo-row"></div>
        </div>
    </main>

    <div class="modal fade" id="modal-auto" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-auto-titulo"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modal-auto-img" src="" alt="" class="img-fluid rounded mb-3" style="max-height: 220px; object-fit: cover; width: 100%;">
                    <p><strong>Precio:</strong> <span id="modal-auto-precio"></span></p>
                </div>
                <div class="modal-footer">
                    <a href="compra.php" class="btn btn-dark">Ver concesionarias</a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-login" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header text-white" style="background-color: rgb(45, 0, 158);">
                    <h5 class="modal-title">🔒 Acceso Administrativo</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <div id="login-alert" class="alert alert-danger d-none"></div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Usuario</label>
                        <input type="text" id="login-usuario" class="form-control" placeholder="Usuario">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Contraseña</label>
                        <input type="password" id="login-password" class="form-control" placeholder="Contraseña">
                    </div>
                    <small class="text-muted">Demo: usuario <code>admin</code> / contraseña <code>1234</code></small>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn text-white" id="btn-login-submit" style="background-color: rgb(45, 0, 158);">Ingresar</button>
                </div>
            </div>
        </div>
    </div>

    <footer class="text-center bg-secondary bg-gradient text-white py-3 mt-auto" style="font-family: 'Merriwheather';">
        <p>Alfonso Marón Fernández Garibay - Desarrollo Web</p>
        <p>
            <a href="https://jigsaw.w3.org/css-validator/check/referer">
                <img style="border:0;width:88px;height:31px" src="https://jigsaw.w3.org/css-validator/images/vcss-blue" alt="¡CSS Válido!">
            </a>
            <a href="https://jigsaw.w3.org/css-validator/check/referer">
                <img style="border:0;width:88px;height:31px" src="resources/images/valid-html401.png" alt="¡HTML Válido!">
            </a>
        </p>
    </footer>

    <script src="resources/js/bootstrap.bundle.min.js"></script>
    <script src="resources/js/gm.js"></script>
    <script>
        const modalAuto = new bootstrap.Modal(document.getElementById('modal-auto'));

        function renderCatalogo(subcategoria) {
            fetch(`api/get_productos.php?subcategoria=${encodeURIComponent(subcategoria)}`)
                .then(res => res.json())
                .then(vehiculos => {
                    const row = document.getElementById('catalogo-row');
                    row.innerHTML = '';
                    if (vehiculos.length === 0) {
                        row.innerHTML = '<p class="text-muted text-center col-12">No hay vehículos en esta categoría.</p>';
                        return;
                    }
                    vehiculos.forEach(auto => {
                        const col = document.createElement('div');
                        col.className = 'col-md-4 mb-4 d-flex';
                        col.innerHTML = `
                            <div class="card product-card flex-fill" style="cursor:pointer; border:2px solid transparent; transition:border-color .2s;" data-id="${auto.id}">
                                <img src="${auto.img}" class="card-img-top" alt="${auto.nombre}" style="height:200px; object-fit:cover;">
                                <div class="card-body d-flex flex-column">
                                    ${auto.subcategoria ? `<span class="badge bg-secondary mb-1" style="width:fit-content;">${auto.subcategoria}</span>` : ''}
                                    <h3 class="card-title fs-5">${auto.nombre}</h3>
                                    <p class="card-text mt-auto">Precio: ${auto.precio}</p>
                                </div>
                            </div>`;
                        const card = col.querySelector('.card');
                        card.addEventListener('mouseenter', () => card.style.borderColor = '#6c757d');
                        card.addEventListener('mouseleave', () => card.style.borderColor = 'transparent');
                        card.addEventListener('click', () => abrirModalAuto(auto));
                        row.appendChild(col);
                    });
                });
        }

        function abrirModalAuto(auto) {
            document.getElementById('modal-auto-titulo').textContent = auto.nombre;
            document.getElementById('modal-auto-img').src = auto.img;
            document.getElementById('modal-auto-img').alt = auto.nombre;
            document.getElementById('modal-auto-precio').textContent = auto.precio;
            modalAuto.show();
        }

        document.getElementById('categoria').addEventListener('change', function () {
            renderCatalogo(this.value);
        });
        renderCatalogo('');

        const modalLogin = new bootstrap.Modal(document.getElementById('modal-login'));
        document.getElementById('btn-admin-login').addEventListener('click', () => {
            document.getElementById('login-usuario').value = '';
            document.getElementById('login-password').value = '';
            document.getElementById('login-alert').classList.add('d-none');
            modalLogin.show();
        });

        function intentarLogin() {
            const usuario = document.getElementById('login-usuario').value;
            const password = document.getElementById('login-password').value;
            fetch('api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'admin-interface.php';
                } else {
                    const alert = document.getElementById('login-alert');
                    alert.textContent = data.message || 'Usuario o contraseña incorrectos';
                    alert.classList.remove('d-none');
                }
            });
        }
        document.getElementById('btn-login-submit').addEventListener('click', intentarLogin);
        document.getElementById('login-password').addEventListener('keypress', e => { if (e.key === 'Enter') intentarLogin(); });
    </script>
</body>
</html>