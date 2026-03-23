import { useState } from "react";
import { ADMIN_CARD_STYLE, CATEGORIAS_VEHICULOS } from "../../data/productos";
import { validarProducto } from "../../utils/validaciones";

export default function AdminUpdate({ navigate, productos, onUpdate }) {
  const [categoria, setCategoria] = useState("");
  const [selId, setSelId]         = useState(null);
  const [f, setF]                 = useState(null);
  const [errs, setErrs]           = useState({});
  const [ok, setOk]               = useState(false);

  const filtrados = !categoria
    ? productos
    : productos.filter((p) => p.categoria === categoria);

  const seleccionar = (p) => {
    setSelId(p.id);
    setF({ nombre: p.nombre, precio: p.precio, categoria: p.categoria, subcategoria: p.subcategoria ?? "", img: p.img });
    setErrs({});
    setOk(false);
  };

  const upd = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errs[k]) setErrs((p) => ({ ...p, [k]: undefined }));
  };

  const guardar = () => {
    const e = validarProducto(f);
    if (Object.keys(e).length) { setErrs(e); return; }
    onUpdate(selId, f);
    setOk(true);
    setTimeout(() => { setOk(false); setSelId(null); setF(null); }, 2000);
  };

  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Actualizar producto</h2>
        <hr />

        <div className="d-flex justify-content-center">
          <div className="shadow p-4 rounded-4" style={{ ...ADMIN_CARD_STYLE, width: "85%" }}>

            {/* Vista: selección de producto */}
            {!f ? (
              <>
                <p><b>Seleccionar producto a actualizar</b></p>
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
                      <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Acción</th></tr>
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
                            <button className="btn btn-warning btn-sm" onClick={() => seleccionar(p)}>
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-outline-secondary mt-2" onClick={() => navigate("admin-home")}>
                  Volver
                </button>
              </>
            ) : (

              /* Vista: formulario de edición */
              <>
                {ok && <div className="alert alert-success">✓ Producto actualizado correctamente.</div>}
                <p><b>Editando producto ID #{selId}</b></p>

                <div className="row row-cols-2 g-3 text-start">
                  <div className="col">
                    <label className="form-label">Nombre *</label>
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
                          value={f.subcategoria ?? ""}
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
                    />
                    {errs.img && <div className="invalid-feedback">{errs.img}</div>}
                  </div>
                </div>

                {f.img && /^https?:\/\/.+/.test(f.img) && (
                  <div className="mt-2">
                    <img src={f.img} alt="Preview" style={{ maxHeight: 100, objectFit: "cover", borderRadius: 8 }} />
                  </div>
                )}

                <hr />
                <button className="btn btn-success me-2" onClick={guardar}>Guardar cambios</button>
                <button className="btn btn-outline-secondary" onClick={() => { setF(null); setSelId(null); }}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
