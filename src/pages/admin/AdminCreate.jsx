import { useState } from "react";
import { ADMIN_CARD_STYLE, CATEGORIAS_VEHICULOS } from "../../data/productos";
import { validarProducto } from "../../utils/validaciones";

export default function AdminCreate({ navigate, onAdd }) {
  const [f, setF]     = useState({ nombre: "", precio: "", categoria: "", subcategoria: "", img: "" });
  const [errs, setErrs] = useState({});
  const [ok, setOk]   = useState(false);

  const upd = (k, v) => {
    setF((p) => ({
      ...p,
      [k]: v,
      ...(k === "categoria" && v === "Accesorio" ? { subcategoria: "" } : {}),
    }));
    if (errs[k]) setErrs((p) => ({ ...p, [k]: undefined }));
  };

  const guardar = () => {
    const e = validarProducto(f);
    if (Object.keys(e).length) { setErrs(e); return; }
    onAdd({ ...f, id: Date.now(), desc: "" });
    setOk(true);
    setTimeout(() => {
      setOk(false);
      setF({ nombre: "", precio: "", categoria: "", subcategoria: "", img: "" });
    }, 2000);
  };

  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Registrar producto</h2>
        <hr />

        <div className="d-flex justify-content-center mt-2">
          <div className="shadow p-4 rounded-4 text-center" style={{ ...ADMIN_CARD_STYLE, width: "55%" }}>
            {ok && <div className="alert alert-success mb-3">✓ Producto registrado exitosamente.</div>}
            <p><b>Ingrese los datos del nuevo producto</b></p>

            <div className="row row-cols-2 g-3 text-start">
              <div className="col">
                <label className="form-label">Nombre de producto *</label>
                <input
                  className={`form-control${errs.nombre ? " is-invalid" : ""}`}
                  value={f.nombre}
                  onChange={(e) => upd("nombre", e.target.value)}
                />
                {errs.nombre && <div className="invalid-feedback">{errs.nombre}</div>}

                <label className="form-label mt-3">Precio *</label>
                <input
                  className={`form-control${errs.precio ? " is-invalid" : ""}`}
                  value={f.precio}
                  onChange={(e) => upd("precio", e.target.value)}
                  placeholder="$ 0.00"
                />
                {errs.precio && <div className="invalid-feedback">{errs.precio}</div>}
              </div>

              <div className="col">
                <label className="form-label">Categoría *</label>
                <select
                  className={`form-select${errs.categoria ? " is-invalid" : ""}`}
                  value={f.categoria}
                  onChange={(e) => upd("categoria", e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="Vehículo">Vehículo</option>
                  <option value="Accesorio">Accesorio</option>
                </select>
                {errs.categoria && <div className="invalid-feedback">{errs.categoria}</div>}

                {f.categoria === "Vehículo" && (
                  <>
                    <label className="form-label mt-3">Subcategoría</label>
                    <select
                      className="form-select"
                      value={f.subcategoria}
                      onChange={(e) => upd("subcategoria", e.target.value)}
                    >
                      <option value="">Sin subcategoría</option>
                      {CATEGORIAS_VEHICULOS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </>
                )}

                <label className="form-label mt-3">URL de imagen *</label>
                <input
                  className={`form-control${errs.img ? " is-invalid" : ""}`}
                  value={f.img}
                  onChange={(e) => upd("img", e.target.value)}
                  placeholder="https://..."
                />
                {errs.img && <div className="invalid-feedback">{errs.img}</div>}
              </div>
            </div>

            {/* Preview de imagen */}
            {f.img && /^https?:\/\/.+/.test(f.img) && (
              <div className="mt-3">
                <img
                  src={f.img}
                  alt="Preview"
                  style={{ maxHeight: 120, objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}

            <hr />
            <button className="btn btn-success me-2" onClick={guardar}>Guardar</button>
            <button className="btn btn-outline-secondary" onClick={() => navigate("admin-home")}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
