<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grand Motors - Contacto</title>
    <link rel="stylesheet" href="resources/css/bootstrap.min.css">
    <link rel="icon" type="image/x-icon" href="resources/images/tab-icon.png">
    <link href="resources/icons/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body class="bg-light bg-gradient">
    <header class="bg-dark bg-gradient text-white shadow px-4 py-3 d-flex justify-content-between align-items-center flex-wrap">
        <a href="index.php">
            <img src="resources/images/logo.png" width="250" alt="Logo">
        </a>
        <div class="d-flex gap-3 flex-wrap mt-3 mt-md-0">
            <a class="btn btn-outline-light" href="index.php">Volver</a>
        </div>
    </header>
    <main>
        <div class="text-center" style="font-family: 'Merriwheather';">
            <h2 class="text-center pt-3">Contacto</h2>
            <hr>
            <p>¡Síguenos en todas nuestras redes sociales!</p>
            <div>
                <a href="https://www.facebook.com/" class="bi bi-facebook px-4 animated-button" style="font-size: 250%;" target="_blank" rel="noreferrer"></a>
                <a href="https://www.instagram.com/" class="bi bi-instagram px-4 animated-button" style="font-size: 250%; color: rgb(225, 48, 108)" target="_blank" rel="noreferrer"></a>
                <a href="https://www.youtube.com/" class="bi bi-youtube px-4 animated-button" style="font-size: 250%; color: red" target="_blank" rel="noreferrer"></a>
            </div>
            <hr>
            <p style="font-size: 110%;"><b>Número telefónico: </b>+52 443 000 2233</p>
            <hr>
            <div class="container mb-4" style="max-width: 480px;">
                <h5 class="mb-3">Envíanos un mensaje</h5>
                <div id="contacto-success" class="alert alert-success d-none">✓ ¡Mensaje enviado! Te contactaremos pronto.</div>
                <form id="form-contacto" class="text-start" novalidate>
                    <div class="mb-3">
                        <label class="form-label" for="c-nombre">Nombre completo *</label>
                        <input type="text" id="c-nombre" class="form-control" placeholder="Tu nombre">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="c-email">Correo electrónico *</label>
                        <input type="email" id="c-email" class="form-control" placeholder="tu@email.com">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="c-telefono">Teléfono *</label>
                        <input type="text" id="c-telefono" class="form-control" placeholder="+52 443 000 0000">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="c-asunto">Asunto *</label>
                        <select id="c-asunto" class="form-select">
                            <option value="">Selecciona un asunto</option>
                            <option value="catalogo">Consulta sobre catálogo</option>
                            <option value="compra">Proceso de compra</option>
                            <option value="seguros">Seguros y garantía</option>
                            <option value="accesorios">Accesorios</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="c-mensaje">Mensaje *</label>
                        <textarea id="c-mensaje" class="form-control" rows="4" placeholder="¿En qué podemos ayudarte?"></textarea>
                    </div>
                    <button type="button" id="btn-enviar" class="btn btn-dark w-100">Enviar mensaje</button>
                </form>
            </div>
        </div>
    </main>
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
    <script>
        const campos = {
            nombre: document.getElementById('c-nombre'),
            email: document.getElementById('c-email'),
            telefono: document.getElementById('c-telefono'),
            asunto: document.getElementById('c-asunto'),
            mensaje: document.getElementById('c-mensaje')
        };
        const btnEnviar = document.getElementById('btn-enviar');
        const successEl = document.getElementById('contacto-success');
        const formEl = document.getElementById('form-contacto');

        function mostrarError(input, msg) {
            input.classList.add('is-invalid');
            let feedback = input.nextElementSibling;
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                input.parentNode.appendChild(feedback);
            }
            feedback.textContent = msg;
        }
        function limpiarError(input) {
            input.classList.remove('is-invalid');
            const fb = input.nextElementSibling;
            if (fb && fb.classList.contains('invalid-feedback')) fb.remove();
        }
        Object.values(campos).forEach(el => el.addEventListener('input', () => limpiarError(el)));

        btnEnviar.addEventListener('click', () => {
            const data = {
                nombre: campos.nombre.value,
                email: campos.email.value,
                telefono: campos.telefono.value,
                asunto: campos.asunto.value,
                mensaje: campos.mensaje.value
            };
            Object.values(campos).forEach(limpiarError);
            fetch('api/submit_contacto.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    formEl.classList.add('d-none');
                    successEl.classList.remove('d-none');
                } else {
                    if (res.errors.nombre) mostrarError(campos.nombre, res.errors.nombre);
                    if (res.errors.email) mostrarError(campos.email, res.errors.email);
                    if (res.errors.telefono) mostrarError(campos.telefono, res.errors.telefono);
                    if (res.errors.asunto) mostrarError(campos.asunto, res.errors.asunto);
                    if (res.errors.mensaje) mostrarError(campos.mensaje, res.errors.mensaje);
                }
            });
        });
    </script>
</body>
</html>