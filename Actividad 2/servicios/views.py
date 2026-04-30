import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Servicio

SERVICIOS_INICIALES = [
    {'nombre': 'Desarrollo Web Full Stack', 'descripcion': 'Creación de aplicaciones web completas con frontend y backend.', 'precio': 1500, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Web+Full+Stack'},
    {'nombre': 'Consultoría en Ciberseguridad', 'descripcion': 'Auditoría y análisis de vulnerabilidades para tu empresa.', 'precio': 1200, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Ciberseguridad'},
    {'nombre': 'Optimización de Bases de Datos', 'descripcion': 'Mejora del rendimiento y estructura de tus bases de datos.', 'precio': 800, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Base+de+Datos'},
    {'nombre': 'Desarrollo de Aplicaciones Móviles', 'descripcion': 'Apps nativas o híbridas para iOS y Android.', 'precio': 2000, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Apps+Móviles'},
    {'nombre': 'Implementación de ERP', 'descripcion': 'Instalación y configuración de sistemas ERP.', 'precio': 2500, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=ERP'},
    {'nombre': 'Soporte Técnico Especializado', 'descripcion': 'Mantenimiento preventivo y correctivo de equipos.', 'precio': 400, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Soporte+Técnico'},
    {'nombre': 'Cloud Computing', 'descripcion': 'Migración y gestión de infraestructura en la nube.', 'precio': 1800, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Cloud+Computing'},
    {'nombre': 'Desarrollo de APIs', 'descripcion': 'Creación de APIs RESTful seguras y escalables.', 'precio': 950, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=APIs'},
    {'nombre': 'Automatización de Procesos', 'descripcion': 'Automatización de tareas repetitivas con scripts.', 'precio': 600, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Automatización'},
    {'nombre': 'Capacitación en Tecnologías', 'descripcion': 'Cursos personalizados para equipos de trabajo.', 'precio': 700, 'imagen': 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=Capacitación'},
]


def _seed_db():
    """Inserta servicios iniciales si la tabla está vacía."""
    if Servicio.objects.count() == 0:
        for s in SERVICIOS_INICIALES:
            Servicio.objects.create(**s)


def index(request):
    _seed_db()
    servicios = list(Servicio.objects.values('id', 'nombre', 'descripcion', 'precio', 'imagen'))
    # Convertir Decimal a float para JSON
    for s in servicios:
        s['precio'] = float(s['precio'])
    context = {
        'servicios_json': json.dumps(servicios),
    }
    return render(request, 'servicios/index.html', context)


def alta(request):
    return render(request, 'servicios/alta.html')


@require_POST
def agregar_servicio(request):
    """Endpoint POST que recibe JSON y guarda el nuevo servicio."""
    try:
        data = json.loads(request.body)
        nombre = data.get('nombre', '').strip()
        descripcion = data.get('descripcion', '').strip()
        precio = data.get('precio')
        imagen = data.get('imagen', '').strip()

        errors = []
        if not nombre:
            errors.append('El nombre del servicio es obligatorio')
        if not descripcion:
            errors.append('La descripción es obligatoria')
        if precio is None or precio == '':
            errors.append('El precio es obligatorio')
        elif float(precio) <= 0:
            errors.append('El precio debe ser mayor a 0')
        if not imagen:
            errors.append('La URL de la imagen es obligatoria')

        if errors:
            return JsonResponse({'ok': False, 'errors': errors}, status=400)

        servicio = Servicio.objects.create(
            nombre=nombre,
            descripcion=descripcion,
            precio=float(precio),
            imagen=imagen,
        )
        return JsonResponse({'ok': True, 'id': servicio.id})
    except Exception as e:
        return JsonResponse({'ok': False, 'errors': [str(e)]}, status=500)
