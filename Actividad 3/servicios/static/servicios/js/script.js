document.addEventListener('DOMContentLoaded', () => {
    createReusableElements();

    if (window.DJANGO_PAGE === 'alta') {
        showFormSection();
    } else {
        showEngineerSection();
    }
});

function createReusableElements() {
    const header = document.getElementById('main-header');
    const headerContent = document.createElement('div');
    headerContent.innerHTML = `
        <h1>👨‍💻 Ingeniería en Sistemas</h1>
        <p>Soluciones tecnológicas a tu medida</p>
    `;
    header.appendChild(headerContent);

    const footer = document.getElementById('main-footer');
    const footerContent = document.createElement('div');
    footerContent.innerHTML = `
        <p>Alfonso Marón Fernández Garibay - Programación Web</p>
    `;
    footer.appendChild(footerContent);
}

/* ──────────────────────────────────────────
   SECCIÓN PERFIL DEL INGENIERO
────────────────────────────────────────── */
function showEngineerSection() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    app.appendChild(buildNavButtons([
        { label: '📋 Ver Catálogo de Servicios', onClick: showServicesSection },
        { label: '➕ Agregar Nuevo Servicio',    onClick: () => { window.location.href = window.ALTA_URL; } },
    ]));

    const engineerSection = document.createElement('section');
    engineerSection.className = 'engineer-section';

    const engineerTitle = document.createElement('h2');
    engineerTitle.textContent = '👤 Ingeniero en Sistemas';
    engineerSection.appendChild(engineerTitle);

    const engineerProfile = document.createElement('div');
    engineerProfile.className = 'engineer-profile';

    const avatar = document.createElement('div');
    avatar.className = 'engineer-avatar';
    avatar.textContent = 'CL';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'engineer-info';

    const name = document.createElement('h3');
    name.textContent = 'Alfonso Fernández';

    const role = document.createElement('div');
    role.className = 'role';
    role.textContent = 'Ingeniero en Sistemas Computacionales';

    const bio = document.createElement('p');
    bio.className = 'bio';
    bio.textContent = 'Egresado del Instituto Tecnológico con más de 8 años de experiencia en desarrollo de software, arquitectura de sistemas y consultoría tecnológica.';

    const experienceTitle = document.createElement('p');
    experienceTitle.style.fontWeight = 'bold';
    experienceTitle.style.marginTop = '1rem';
    experienceTitle.textContent = 'Experiencia profesional:';

    const experienceList = document.createElement('ul');
    experienceList.className = 'experience-list';

    const experiences = [
        'Tech Lead en Empresa ABC (2020-2024)',
        'Desarrollador Full Stack en SolucionesTech (2017-2020)',
        'Consultor independiente para startups tecnológicas',
        'Certificaciones: AWS Solutions Architect, Scrum Master',
        'Especialista en desarrollo web y aplicaciones móviles',
    ];

    experiences.forEach(exp => {
        const li = document.createElement('li');
        li.textContent = exp;
        experienceList.appendChild(li);
    });

    infoDiv.appendChild(name);
    infoDiv.appendChild(role);
    infoDiv.appendChild(bio);
    infoDiv.appendChild(experienceTitle);
    infoDiv.appendChild(experienceList);

    engineerProfile.appendChild(avatar);
    engineerProfile.appendChild(infoDiv);
    engineerSection.appendChild(engineerProfile);
    app.appendChild(engineerSection);
}

/* ──────────────────────────────────────────
   CATÁLOGO DE SERVICIOS  (datos desde Django)
────────────────────────────────────────── */
function showServicesSection() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    app.appendChild(buildNavButtons([
        { label: '👤 Ver Perfil del Ingeniero', onClick: showEngineerSection },
        { label: '➕ Agregar Nuevo Servicio',   onClick: () => { window.location.href = window.ALTA_URL; } },
    ]));

    const servicesSection = document.createElement('section');
    servicesSection.className = 'services-section';

    const servicesTitle = document.createElement('h2');
    servicesTitle.textContent = '🛠️ Catálogo de Servicios';
    servicesSection.appendChild(servicesTitle);

    const servicesGrid = document.createElement('div');
    servicesGrid.className = 'services-grid';

    // Los servicios ya vienen pre-cargados desde Django
    const servicios = window.DJANGO_SERVICIOS || [];

    servicios.forEach(servicio => {
        const card = document.createElement('div');
        card.className = 'service-card';
        if (servicio.precio >= 2000) card.classList.add('service-premium');

        const img = document.createElement('img');
        img.src = servicio.imagen;
        img.alt = servicio.nombre;

        const serviceInfo = document.createElement('div');
        serviceInfo.className = 'service-info';

        const serviceName = document.createElement('h3');
        serviceName.textContent = servicio.nombre;

        const serviceDesc = document.createElement('p');
        serviceDesc.textContent = servicio.descripcion;

        const servicePrice = document.createElement('p');
        servicePrice.className = 'service-price';
        servicePrice.textContent = `$${Number(servicio.precio).toLocaleString('es-MX')} MXN`;

        serviceInfo.appendChild(serviceName);
        serviceInfo.appendChild(serviceDesc);
        serviceInfo.appendChild(servicePrice);

        card.appendChild(img);
        card.appendChild(serviceInfo);
        servicesGrid.appendChild(card);
    });

    servicesSection.appendChild(servicesGrid);
    app.appendChild(servicesSection);
}

/* ──────────────────────────────────────────
   FORMULARIO DE ALTA
────────────────────────────────────────── */
function showFormSection() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const backButton = document.createElement('button');
    backButton.className = 'nav-button';
    backButton.textContent = '← Volver a Servicios';
    backButton.addEventListener('click', () => { window.location.href = window.INDEX_URL || '/'; });
    app.appendChild(backButton);

    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';

    const formTitle = document.createElement('h2');
    formTitle.textContent = '➕ Agregar Nuevo Servicio';
    formContainer.appendChild(formTitle);

    const errorContainer = document.createElement('div');
    errorContainer.id = 'errorContainer';
    formContainer.appendChild(errorContainer);

    const form = document.createElement('form');
    form.id = 'serviceForm';
    form.addEventListener('submit', handleSubmit);

    form.appendChild(buildField('nombre',     'text',   'Nombre del servicio *'));
    form.appendChild(buildTextarea('descripcion', 'Descripción *'));
    form.appendChild(buildField('precio',     'number', 'Precio $ *', { min: '0', step: '0.01' }));
    form.appendChild(buildField('imagen',     'url',    'URL de la imagen *', { placeholder: 'https://ejemplo.com/imagen.jpg' }));

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-button';
    submitButton.textContent = 'Guardar Servicio';
    form.appendChild(submitButton);

    formContainer.appendChild(form);
    app.appendChild(formContainer);
}

/* ──────────────────────────────────────────
   ENVÍO DEL FORMULARIO → API Django
────────────────────────────────────────── */
function handleSubmit(event) {
    event.preventDefault();

    const nombre      = document.getElementById('nombre');
    const descripcion = document.getElementById('descripcion');
    const precio      = document.getElementById('precio');
    const imagen      = document.getElementById('imagen');

    // Limpiar errores previos
    ['nombre', 'descripcion', 'precio', 'imagen'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('error-input');
        document.getElementById(id + 'Error').textContent = '';
    });
    document.getElementById('errorContainer').innerHTML = '';

    const errors = [];

    if (!nombre.value.trim()) {
        errors.push('El nombre del servicio es obligatorio');
        nombre.classList.add('error-input');
        document.getElementById('nombreError').textContent = 'Campo obligatorio';
    }
    if (!descripcion.value.trim()) {
        errors.push('La descripción es obligatoria');
        descripcion.classList.add('error-input');
        document.getElementById('descripcionError').textContent = 'Campo obligatorio';
    }
    if (!precio.value) {
        errors.push('El precio es obligatorio');
        precio.classList.add('error-input');
        document.getElementById('precioError').textContent = 'Campo obligatorio';
    } else if (parseFloat(precio.value) <= 0) {
        errors.push('El precio debe ser mayor a 0');
        precio.classList.add('error-input');
        document.getElementById('precioError').textContent = 'Debe ser mayor a 0';
    }
    if (!imagen.value.trim()) {
        errors.push('La URL de la imagen es obligatoria');
        imagen.classList.add('error-input');
        document.getElementById('imagenError').textContent = 'Campo obligatorio';
    } else {
        try { new URL(imagen.value); }
        catch {
            errors.push('La URL de la imagen no es válida');
            imagen.classList.add('error-input');
            document.getElementById('imagenError').textContent = 'URL no válida';
        }
    }

    if (errors.length > 0) {
        const errorBox = document.createElement('div');
        errorBox.className = 'error-box';
        errorBox.innerHTML = `
            <h4>❌ Errores en el formulario:</h4>
            <ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>
            <p style="margin-top:.5rem;color:#c0392b;">Por favor, corrige los errores e intenta nuevamente.</p>
        `;
        document.getElementById('errorContainer').appendChild(errorBox);
        return;
    }

    // POST a la API de Django
    fetch(window.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': window.CSRF_TOKEN,
        },
        body: JSON.stringify({
            nombre:      nombre.value.trim(),
            descripcion: descripcion.value.trim(),
            precio:      parseFloat(precio.value),
            imagen:      imagen.value.trim(),
        }),
    })
    .then(r => r.json())
    .then(data => {
        if (data.ok) {
            window.location.href = window.INDEX_URL || '/';
        } else {
            const errorBox = document.createElement('div');
            errorBox.className = 'error-box';
            errorBox.innerHTML = `<h4>❌ Error del servidor:</h4><ul>${(data.errors||[]).map(e=>`<li>${e}</li>`).join('')}</ul>`;
            document.getElementById('errorContainer').appendChild(errorBox);
        }
    })
    .catch(() => {
        alert('Error de conexión con el servidor.');
    });
}

/* ──────────────────────────────────────────
   HELPERS
────────────────────────────────────────── */
function buildNavButtons(buttons) {
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:1rem;margin-bottom:1rem;';
    buttons.forEach(({ label, onClick }) => {
        const btn = document.createElement('button');
        btn.className = 'nav-button';
        btn.textContent = label;
        btn.addEventListener('click', onClick);
        container.appendChild(btn);
    });
    return container;
}

function buildField(id, type, labelText, attrs = {}) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    input.required = true;
    Object.entries(attrs).forEach(([k, v]) => input.setAttribute(k, v));

    const errSpan = document.createElement('span');
    errSpan.id = id + 'Error';
    errSpan.className = 'error-message';

    group.appendChild(label);
    group.appendChild(input);
    group.appendChild(errSpan);
    return group;
}

function buildTextarea(id, labelText) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelText;

    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.name = id;
    textarea.required = true;

    const errSpan = document.createElement('span');
    errSpan.id = id + 'Error';
    errSpan.className = 'error-message';

    group.appendChild(label);
    group.appendChild(textarea);
    group.appendChild(errSpan);
    return group;
}
