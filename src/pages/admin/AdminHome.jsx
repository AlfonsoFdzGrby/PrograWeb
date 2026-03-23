import { ADMIN_CARD_STYLE } from "../../data/productos";

export default function AdminHome({ navigate }) {
  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Portal administrativo</h2>
        <hr />
        <p>Seleccione una opción</p>

        <div className="d-flex justify-content-center mt-4">
          <div
            className="shadow p-4 rounded-4 text-center"
            style={{ ...ADMIN_CARD_STYLE, width: "40%" }}
          >
            <div className="row row-cols-2 g-2">
              <div className="col">
                <button className="btn btn-primary w-100 my-1" onClick={() => navigate("admin-create")}>
                  Registrar producto
                </button>
                <button className="btn btn-primary w-100 my-1" onClick={() => navigate("admin-read")}>
                  Consultar producto
                </button>
              </div>
              <div className="col">
                <button className="btn btn-primary w-100 my-1" onClick={() => navigate("admin-update")}>
                  Actualizar producto
                </button>
                <button className="btn btn-primary w-100 my-1" onClick={() => navigate("admin-delete")}>
                  Eliminar producto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
