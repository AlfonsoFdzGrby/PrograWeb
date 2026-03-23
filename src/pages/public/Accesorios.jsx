import { useState } from "react";

export default function Accesorios({ productos }) {
  const [selected, setSelected] = useState(null);
  const accesorios = productos.filter((p) => p.categoria === "Accesorio");

  const toggleSelect = (acc) =>
    setSelected((prev) => (prev?.id === acc.id ? null : acc));

  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Accesorios</h2>
        <hr />
      </div>

      <div className="container">
        <div className="row">
          {accesorios.map((acc) => (
            <div key={acc.id} className="col-md-4 mb-4">
              <div
                className="card"
                onClick={() => toggleSelect(acc)}
                style={{
                  cursor: "pointer",
                  border: selected?.id === acc.id ? "2px solid #0d6efd" : "2px solid transparent",
                  transition: "border-color .2s",
                }}
                onMouseEnter={(e) => {
                  if (selected?.id !== acc.id) e.currentTarget.style.borderColor = "#6c757d";
                }}
                onMouseLeave={(e) => {
                  if (selected?.id !== acc.id) e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <img
                  src={acc.img}
                  className="card-img-top"
                  alt={acc.nombre}
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h2 className="card-title fs-5">{acc.nombre}</h2>
                  <p className="card-text">{acc.desc || acc.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="alert alert-primary d-flex justify-content-between align-items-center">
            <span>
              Seleccionaste: <strong>{selected.nombre}</strong>
            </span>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setSelected(null)}
            >
              Quitar selección
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
