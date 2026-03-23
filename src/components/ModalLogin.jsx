import { useState } from "react";
import { USUARIO_ADMIN, ADMIN_HEADER_STYLE } from "../data/productos";
import { validarLogin } from "../utils/validaciones";

export default function ModalLogin({ onClose, onSuccess }) {
  const [f, setF]         = useState({ usuario: "", password: "" });
  const [errs, setErrs]   = useState({});
  const [loginErr, setLoginErr] = useState("");

  const upd = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errs[k]) setErrs((p) => ({ ...p, [k]: undefined }));
    setLoginErr("");
  };

  const ingresar = () => {
    const e = validarLogin(f);
    if (Object.keys(e).length) { setErrs(e); return; }
    if (f.usuario === USUARIO_ADMIN.usuario && f.password === USUARIO_ADMIN.password) {
      onSuccess(f.usuario);
    } else {
      setLoginErr("Usuario o contraseña incorrectos.");
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") ingresar(); };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,.6)" }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header text-white" style={ADMIN_HEADER_STYLE}>
            <h5 className="modal-title">
              <i className="bi bi-shield-lock me-2" />
              Acceso Administrativo
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body p-4">
            {loginErr && <div className="alert alert-danger py-2">{loginErr}</div>}

            <div className="mb-3">
              <label className="form-label fw-semibold">Usuario</label>
              <input
                className={`form-control${errs.usuario ? " is-invalid" : ""}`}
                value={f.usuario}
                onChange={(e) => upd("usuario", e.target.value)}
                onKeyDown={handleKey}
                placeholder="Usuario"
                autoFocus
              />
              {errs.usuario && <div className="invalid-feedback">{errs.usuario}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                className={`form-control${errs.password ? " is-invalid" : ""}`}
                value={f.password}
                onChange={(e) => upd("password", e.target.value)}
                onKeyDown={handleKey}
                placeholder="Contraseña"
              />
              {errs.password && <div className="invalid-feedback">{errs.password}</div>}
            </div>

            <small className="text-muted">
              Demo: usuario <code>admin</code> / contraseña <code>1234</code>
            </small>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button
              className="btn text-white"
              style={ADMIN_HEADER_STYLE}
              onClick={ingresar}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
