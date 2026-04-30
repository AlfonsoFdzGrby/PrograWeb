<?php 
require_once 'includes/auth.php'; 
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Administrativo - Grand Motors</title>
    <link rel="stylesheet" href="resources/css/bootstrap.min.css">
</head>
<body class="bg-light">
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Panel de Administración</h1>
            <a href="api/logout.php" class="btn btn-danger">Cerrar sesión</a>
        </div>
        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalProducto" onclick="abrirModalAgregar()">+ Nuevo producto</button>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Imagen</th><th>Categoría</th><th>Subcategoría</th><th>Acciones</th></tr>
                </thead>
                <tbody id="tabla-productos"></tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="modalProducto" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitulo">Agregar producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="producto-id">
                    <div class="mb-2"><label>Nombre</label><input type="text" id="nombre" class="form-control"></div>
                    <div class="mb-2"><label>Descripción</label><textarea id="descripcion" class="form-control"></textarea></div>
                    <div class="mb-2"><label>Precio</label><input type="text" id="precio" class="form-control"></div>
                    <div class="mb-2"><label>URL Imagen</label><input type="text" id="img" class="form-control" placeholder="resources/images/..."></div>
                    <div class="mb-2"><label>Categoría</label>
                        <select id="categoria" class="form-select">
                            <option value="Vehículo">Vehículo</option>
                            <option value="Accesorio">Accesorio</option>
                        </select>
                    </div>
                    <div class="mb-2"><label>Subcategoría (solo vehículos)</label><input type="text" id="subcategoria" class="form-control" placeholder="Deportivos, Sedanes, etc."></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnGuardar">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="resources/js/bootstrap.bundle.min.js"></script>
    <script>
        function cargarProductos() {
            fetch('api/admin/listar.php')
                .then(res => res.json())
                .then(data => {
                    const tbody = document.getElementById('tabla-productos');
                    tbody.innerHTML = '';
                    data.forEach(p => {
                        const row = `<tr>
                            <td>${p.id}</td>
                            <td>${p.nombre}</td>
                            <td>${p.descripcion || ''}</td>
                            <td>${p.precio}</td>
                            <td><img src="${p.img}" width="50"></td>
                            <td>${p.categoria}</td>
                            <td>${p.subcategoria || '-'}</td>
                            <td>
                                <button class="btn btn-sm btn-warning" onclick="editarProducto(${p.id})">Editar</button>
                                <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
                             </td>
                        </tr>`;
                        tbody.insertAdjacentHTML('beforeend', row);
                    });
                })
                .catch(err => console.error('Error cargando productos:', err));
        }

        function abrirModalAgregar() {
            document.getElementById('modalTitulo').innerText = 'Agregar producto';
            document.getElementById('producto-id').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('descripcion').value = '';
            document.getElementById('precio').value = '';
            document.getElementById('img').value = '';
            document.getElementById('categoria').value = 'Vehículo';
            document.getElementById('subcategoria').value = '';
        }

        function editarProducto(id) {
            fetch('api/admin/listar.php')
                .then(res => res.json())
                .then(data => {
                    const p = data.find(x => x.id == id);
                    if (p) {
                        document.getElementById('modalTitulo').innerText = 'Editar producto';
                        document.getElementById('producto-id').value = p.id;
                        document.getElementById('nombre').value = p.nombre;
                        document.getElementById('descripcion').value = p.descripcion || '';
                        document.getElementById('precio').value = p.precio;
                        document.getElementById('img').value = p.img;
                        document.getElementById('categoria').value = p.categoria;
                        document.getElementById('subcategoria').value = p.subcategoria || '';
                        new bootstrap.Modal(document.getElementById('modalProducto')).show();
                    }
                });
        }

        function eliminarProducto(id) {
            if (confirm('¿Eliminar este producto?')) {
                fetch('api/admin/eliminar.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                }).then(() => cargarProductos());
            }
        }

        document.getElementById('btnGuardar').addEventListener('click', () => {
            const id = document.getElementById('producto-id').value;
            const data = {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                precio: document.getElementById('precio').value,
                img: document.getElementById('img').value,
                categoria: document.getElementById('categoria').value,
                subcategoria: document.getElementById('subcategoria').value
            };
            let url = 'api/admin/agregar.php';
            if (id) {
                url = 'api/admin/editar.php';
                data.id = id;
            }
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(() => {
                bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
                cargarProductos();
            });
        });

        cargarProductos();
    </script>
</body>
</html>