import { useState } from "react";
import { CATEGORIAS_VEHICULOS } from "../../data/productos";

export default function Inicio({ navigate, productos }) {
  const [categoria, setCategoria] = useState("");
  const [modalAuto, setModalAuto] = useState(null);

  const vehiculos = productos.filter((p) => p.categoria === "Vehículo");
  const filtrados = !categoria
    ? vehiculos
    : vehiculos.filter((a) => a.subcategoria === categoria);


  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Catálogo de Autos</h2>
        <hr />
        <select
          className="btn btn-outline-secondary mb-3"
          style={{ appearance: "none" }}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          {CATEGORIAS_VEHICULOS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <br />

      <div className="container">
        <div className="row">
          {filtrados.map((auto) => (
            <div key={auto.id} className="col-md-4 mb-4 d-flex">
              <div
                className="card flex-fill"
                onClick={() => setModalAuto(auto)}
                style={{ cursor: "pointer", border: "2px solid transparent", transition: "border-color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6c757d")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
              >
                <img
                  src={auto.img}
                  className="card-img-top"
                  alt={auto.nombre}
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  {auto.subcategoria && (
                    <span className="badge bg-secondary mb-1" style={{ width: "fit-content" }}>
                      {auto.subcategoria}
                    </span>
                  )}
                  <h3 className="card-title fs-5">{auto.nombre}</h3>
                  <p className="card-text mt-auto">Precio: {auto.precio}</p>
                </div>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && (
            <p className="text-muted text-center">No hay vehículos en esta categoría.</p>
          )}
        </div>
      </div>

      {/* Modal detalle */}
      {modalAuto && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,.55)" }}
          onClick={() => setModalAuto(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalAuto.nombre}</h5>
                <button type="button" className="btn-close" onClick={() => setModalAuto(null)} />
              </div>
              <div className="modal-body text-center">
                <img
                  src={modalAuto.img}
                  alt={modalAuto.nombre}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: 220, objectFit: "cover", width: "100%" }}
                />
                <p><strong>Precio:</strong> {modalAuto.precio}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-dark"
                  onClick={() => { setModalAuto(null); navigate("compra"); }}
                >
                  Ver concesionarias
                </button>
                <button className="btn btn-secondary" onClick={() => setModalAuto(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
