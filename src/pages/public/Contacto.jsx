import { useState } from "react";
import { validarContacto } from "../../utils/validaciones";

export default function Contacto() {
  const [f, setF]     = useState({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
  const [errs, setErrs] = useState({});
  const [ok, setOk]   = useState(false);
  const [loading, setLoading] = useState(false);

  const upd = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errs[k]) setErrs((p) => ({ ...p, [k]: undefined }));
  };

  const enviar = () => {
    const e = validarContacto(f);
    if (Object.keys(e).length) { setErrs(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setOk(true); }, 1000);
  };

  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Contacto</h2>
        <hr />
        <p>¡Síguenos en todas nuestras redes sociales!</p>
        <div>
          <a href="https://www.facebook.com/" className="bi bi-facebook px-4"
            style={{ fontSize: "250%", color: "#4267B2" }} target="_blank" rel="noreferrer" />
          <a href="https://www.instagram.com/" className="bi bi-instagram px-4"
            style={{ fontSize: "250%", color: "rgb(225,48,108)" }} target="_blank" rel="noreferrer" />
          <a href="https://www.youtube.com/" className="bi bi-youtube px-4"
            style={{ fontSize: "250%", color: "red" }} target="_blank" rel="noreferrer" />
        </div>
        <hr />
        <p style={{ fontSize: "110%" }}>
          <b>Número telefónico: </b>+52 443 000 2233
        </p>
        <hr />

        {/* Formulario */}
        <div className="container mb-4" style={{ maxWidth: 480 }}>
          <h5 className="mb-3">Envíanos un mensaje</h5>
          {ok ? (
            <div className="alert alert-success">✓ ¡Mensaje enviado! Te contactaremos pronto.</div>
          ) : (
            <div className="text-start">
              <div className="mb-3">
                <label className="form-label">Nombre completo *</label>
                <input
                  className={`form-control${errs.nombre ? " is-invalid" : ""}`}
                  value={f.nombre}
                  onChange={(e) => upd("nombre", e.target.value)}
                  placeholder="Tu nombre"
                />
                {errs.nombre && <div className="invalid-feedback">{errs.nombre}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico *</label>
                <input
                  type="email"
                  className={`form-control${errs.email ? " is-invalid" : ""}`}
                  value={f.email}
                  onChange={(e) => upd("email", e.target.value)}
                  placeholder="tu@email.com"
                />
                {errs.email && <div className="invalid-feedback">{errs.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono *</label>
                <input
                  className={`form-control${errs.telefono ? " is-invalid" : ""}`}
                  value={f.telefono}
                  onChange={(e) => upd("telefono", e.target.value)}
                  placeholder="+52 443 000 0000"
                />
                {errs.telefono && <div className="invalid-feedback">{errs.telefono}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Asunto *</label>
                <select
                  className={`form-select${errs.asunto ? " is-invalid" : ""}`}
                  value={f.asunto}
                  onChange={(e) => upd("asunto", e.target.value)}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="catalogo">Consulta sobre catálogo</option>
                  <option value="compra">Proceso de compra</option>
                  <option value="seguros">Seguros y garantía</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="otro">Otro</option>
                </select>
                {errs.asunto && <div className="invalid-feedback">{errs.asunto}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Mensaje *</label>
                <textarea
                  className={`form-control${errs.mensaje ? " is-invalid" : ""}`}
                  rows={4}
                  value={f.mensaje}
                  onChange={(e) => upd("mensaje", e.target.value)}
                  placeholder="¿En qué podemos ayudarte?"
                />
                {errs.mensaje && <div className="invalid-feedback">{errs.mensaje}</div>}
              </div>
              <button className="btn btn-dark w-100" onClick={enviar} disabled={loading}>
                {loading ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
