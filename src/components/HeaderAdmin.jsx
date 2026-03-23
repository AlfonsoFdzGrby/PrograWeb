import { ADMIN_HEADER_STYLE } from "../data/productos";

export default function HeaderAdmin({ usuario, navigate, onLogout }) {
  return (
    <header
      className="bg-gradient text-white shadow px-4 py-3 d-flex justify-content-between align-items-center flex-wrap"
      style={ADMIN_HEADER_STYLE}
    >
      <span
        onClick={() => navigate("admin-home")}
        style={{ cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: "bold" }}
      >
        Grand Motors
      </span>

      <h2 className="mb-0 fs-4">Administración</h2>

      <div className="d-flex gap-3 flex-wrap mt-3 mt-md-0 align-items-center">
        <span className="text-white-50 small">
          Usuario: <strong className="text-white">{usuario}</strong>
        </span>
        <button className="btn btn-outline-light btn-sm" onClick={() => navigate("admin-home")}>
          Inicio
        </button>
        <button
          className="btn btn-sm text-white"
          style={{ backgroundColor: "rgb(162, 56, 56)" }}
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
