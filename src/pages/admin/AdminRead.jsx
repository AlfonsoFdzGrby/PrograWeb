import { useState } from "react";
import { ADMIN_CARD_STYLE } from "../../data/productos";

export default function AdminRead({ navigate, productos }) {
  const [categoria, setCategoria] = useState("");
  const [busqueda, setBusqueda]   = useState("");

  const filtrados = productos.filter((p) => {
    const catOk = !categoria || p.categoria === categoria;
    const busOk = !busqueda  || p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return catOk && busOk;
  });

  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Consultar producto</h2>
        <hr />

        <div className="d-flex justify-content-center">
          <div className="shadow p-4 rounded-4" style={{ ...ADMIN_CARD_STYLE, width: "85%" }}>
            {/* Filtros */}
            <div className="row g-2 mb-3">
              <div className="col-md-5">
                <input
                  className="form-control"
                  placeholder="Buscar por nombre..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  <option value="Vehículo">Vehículo</option>
                  <option value="Accesorio">Accesorio</option>
                </select>
              </div>
            </div>

            {/* Tabla */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover bg-white rounded">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <img
                          src={p.img}
                          alt={p.nombre}
                          style={{ width: 60, height: 44, objectFit: "cover", borderRadius: 4 }}
                        />
                      </td>
                      <td>{p.nombre}</td>
                      <td>
                        <span className={`badge ${p.categoria === "Vehículo" ? "bg-primary" : "bg-success"}`}>
                          {p.categoria}
                        </span>
                      </td>
                      <td>{p.precio}</td>
                    </tr>
                  ))}
                  {filtrados.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">Sin resultados.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button className="btn btn-outline-secondary mt-2" onClick={() => navigate("admin-home")}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
