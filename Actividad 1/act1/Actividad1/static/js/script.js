document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    createReusableElements();
    showEngineerSection();
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

function showEngineerSection() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const navButton = document.createElement('button');
    navButton.className = 'nav-button';
    navButton.textContent = '📋 Ver Catálogo de Servicios';
    navButton.addEventListener('click', showServicesSection);
    app.appendChild(navButton);
    
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
        'Especialista en desarrollo web y aplicaciones móviles'
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

function showServicesSection() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const navButton = document.createElement('button');
    navButton.className = 'nav-button';
    navButton.textContent = '👤 Ver Perfil del Ingeniero';
    navButton.addEventListener('click', showEngineerSection);
    app.appendChild(navButton);
    
    const servicesSection = document.createElement('section');
    servicesSection.className = 'services-section';
    
    const servicesTitle = document.createElement('h2');
    servicesTitle.textContent = '🛠️ Catálogo de Servicios';
    servicesSection.appendChild(servicesTitle);
    
    const servicesGrid = document.createElement('div');
    servicesGrid.className = 'services-grid';
    
    const servicios = [
        {
            nombre: 'Desarrollo Web Full Stack',
            descripcion: 'Creación de aplicaciones web completas con frontend y backend.',
            precio: 1500,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Web+Full+Stack'
        },
        {
            nombre: 'Consultoría en Ciberseguridad',
            descripcion: 'Auditoría y análisis de vulnerabilidades para tu empresa.',
            precio: 1200,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Ciberseguridad'
        },
        {
            nombre: 'Optimización de Bases de Datos',
            descripcion: 'Mejora del rendimiento y estructura de tus bases de datos.',
            precio: 800,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Base+de+Datos'
        },
        {
            nombre: 'Desarrollo de Aplicaciones Móviles',
            descripcion: 'Apps nativas o híbridas para iOS y Android.',
            precio: 2000,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Apps+Móviles'
        },
        {
            nombre: 'Implementación de ERP',
            descripcion: 'Instalación y configuración de sistemas ERP.',
            precio: 2500,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=ERP'
        },
        {
            nombre: 'Soporte Técnico Especializado',
            descripcion: 'Mantenimiento preventivo y correctivo de equipos.',
            precio: 400,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Soporte+Técnico'
        },
        {
            nombre: 'Cloud Computing',
            descripcion: 'Migración y gestión de infraestructura en la nube.',
            precio: 1800,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Cloud+Computing'
        },
        {
            nombre: 'Desarrollo de APIs',
            descripcion: 'Creación de APIs RESTful seguras y escalables.',
            precio: 950,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=APIs'
        },
        {
            nombre: 'Automatización de Procesos',
            descripcion: 'Automatización de tareas repetitivas con scripts.',
            precio: 600,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Automatización'
        },
        {
            nombre: 'Capacitación en Tecnologías',
            descripcion: 'Cursos personalizados para equipos de trabajo.',
            precio: 700,
            imagen: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Capacitación'
        }
    ];
    
    servicios.forEach(servicio => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        if (servicio.precio > 1000) {
            serviceCard.classList.add('service-premium');
        }
        
        const img = document.createElement('img');
        img.src = servicio.imagen;
        img.alt = servicio.nombre;
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'service-info';
        
        const nombre = document.createElement('h3');
        nombre.textContent = servicio.nombre;
        
        const descripcion = document.createElement('p');
        descripcion.textContent = servicio.descripcion;
        
        const precio = document.createElement('p');
        precio.className = 'service-price';
        precio.textContent = `$${servicio.precio.toLocaleString()}`;
        
        infoDiv.appendChild(nombre);
        infoDiv.appendChild(descripcion);
        infoDiv.appendChild(precio);
        
        serviceCard.appendChild(img);
        serviceCard.appendChild(infoDiv);
        
        servicesGrid.appendChild(serviceCard);
    });
    
    servicesSection.appendChild(servicesGrid);
    app.appendChild(servicesSection);
}