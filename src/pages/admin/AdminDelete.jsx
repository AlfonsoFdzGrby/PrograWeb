import { useState } from "react";
import { ADMIN_CARD_STYLE } from "../../data/productos";

export default function AdminDelete({ navigate, productos, onDelete }) {
  const [categoria, setCategoria] = useState("");
  const [confirmar, setConfirmar] = useState(null);

  const filtrados = !categoria
    ? productos
    : productos.filter((p) => p.categoria === categoria);

  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Eliminar producto</h2>
        <hr />

        <div className="d-flex justify-content-center">
          <div className="shadow p-4 rounded-4" style={{ ...ADMIN_CARD_STYLE, width: "85%" }}>
            <p><b>Seleccionar categoría</b></p>
            <select
              className="form-select my-2 w-auto mx-auto"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="Vehículo">Vehículo</option>
              <option value="Accesorio">Accesorio</option>
            </select>

            <div className="table-responsive mt-3">
              <table className="table table-bordered table-hover bg-white rounded">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nombre}</td>
                      <td>
                        <span className={`badge ${p.categoria === "Vehículo" ? "bg-primary" : "bg-success"}`}>
                          {p.categoria}
                        </span>
                      </td>
                      <td>{p.precio}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setConfirmar(p)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtrados.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">Sin productos.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              className="btn btn-outline-secondary mt-2"
              onClick={() => navigate("admin-home")}
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {confirmar && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,.55)" }}
          onClick={() => setConfirmar(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setConfirmar(null)}
                />
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que deseas eliminar{" "}
                  <strong>{confirmar.nombre}</strong>? Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setConfirmar(null)}>
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => { onDelete(confirmar.id); setConfirmar(null); }}
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
