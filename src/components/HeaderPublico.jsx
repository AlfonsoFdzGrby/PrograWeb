import { useState, useEffect, useRef } from "react";

export default function HeaderPublico({ page, navigate, onLoginClick }) {
  const [dropOpen, setDropOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (p) => {
    navigate(p);
    setDropOpen(false);
  };

  return (
    <header className="bg-dark bg-gradient text-white shadow px-4 py-3 d-flex justify-content-between align-items-center flex-wrap">
      <span
        onClick={() => go("inicio")}
        style={{ cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: "bold" }}
      >
        Grand Motors
      </span>

      <div className="d-flex gap-3 flex-wrap mt-3 mt-md-0 align-items-center">
        <button className="btn btn-outline-light" onClick={() => go("inicio")}>Inicio</button>
        <button className="btn btn-outline-light" onClick={() => go("mision")}>Misión</button>
        <button className="btn btn-outline-light" onClick={() => go("vision")}>Visión</button>
        <button className="btn btn-outline-light" onClick={() => go("contacto")}>Contacto</button>
        <button className="btn btn-outline-light" onClick={() => go("compra")}>Compra</button>

        {/* Dropdown Servicios */}
        <div className="dropdown" ref={ref}>
          <button
            className="btn btn-outline-light"
            style={{ appearance: "none" }}
            onClick={() => setDropOpen((o) => !o)}
          >
            Servicios
          </button>
          <ul className={`dropdown-menu dropdown-menu-end${dropOpen ? " show" : ""}`}>
            <li>
              <button className="dropdown-item" onClick={() => go("accesorios")}>
                Accesorios
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => go("seguros")}>
                Seguros y garantía
              </button>
            </li>
          </ul>
        </div>

        {/* Botón Administración */}
        <button className="btn btn-warning text-dark fw-semibold" onClick={onLoginClick}>
          <i className="bi bi-shield-lock me-1" />
          Administración
        </button>
      </div>
    </header>
  );
}
