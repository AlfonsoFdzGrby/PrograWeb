import { useState } from "react";

// Hooks
import { useBootstrap } from "./hooks/useBootstrap";

// Datos
import { AUTOS_INIT } from "./data/productos";

// Componentes compartidos
import HeaderPublico from "./components/HeaderPublico";
import FooterPublico from "./components/FooterPublico";
import HeaderAdmin   from "./components/HeaderAdmin";
import FooterAdmin   from "./components/FooterAdmin";
import ModalLogin    from "./components/ModalLogin";

// Páginas públicas
import Inicio          from "./pages/public/Inicio";
import { Mision, Vision } from "./pages/public/MisionVision";
import Contacto        from "./pages/public/Contacto";
import Compra          from "./pages/public/Compra";
import Accesorios      from "./pages/public/Accesorios";
import Seguros         from "./pages/public/Seguros";

// Páginas admin
import AdminHome   from "./pages/admin/AdminHome";
import AdminCreate from "./pages/admin/AdminCreate";
import AdminRead   from "./pages/admin/AdminRead";
import AdminUpdate from "./pages/admin/AdminUpdate";
import AdminDelete from "./pages/admin/AdminDelete";

export default function App() {
  useBootstrap();

  const [page, setPage]           = useState("inicio");
  const [adminUser, setAdminUser] = useState(null); // null = no autenticado
  const [showLogin, setShowLogin] = useState(false);
  const [productos, setProductos] = useState(AUTOS_INIT);

  const isAdmin     = adminUser !== null;
  const isAdminPage = page.startsWith("admin");

  // ── Navegación ──────────────────────────────────────────────────────────────
  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Autenticación ────────────────────────────────────────────────────────────
  const handleLoginSuccess = (usuario) => {
    setAdminUser(usuario);
    setShowLogin(false);
    navigate("admin-home");
  };

  const handleLogout = () => {
    setAdminUser(null);
    navigate("inicio");
  };

  // ── Operaciones CRUD (estado compartido) ─────────────────────────────────────
  const addProducto    = (p)        => setProductos((prev) => [...prev, p]);
  const updateProducto = (id, data) => setProductos((prev) => prev.map((p) => p.id === id ? { ...p, ...data } : p));
  const deleteProducto = (id)       => setProductos((prev) => prev.filter((p) => p.id !== id));

  // ── Render: sección administrativa ──────────────────────────────────────────
  if (isAdminPage && isAdmin) {
    const adminPages = {
      "admin-home":   <AdminHome   navigate={navigate} />,
      "admin-create": <AdminCreate navigate={navigate} onAdd={addProducto} />,
      "admin-read":   <AdminRead   navigate={navigate} productos={productos} />,
      "admin-update": <AdminUpdate navigate={navigate} productos={productos} onUpdate={updateProducto} />,
      "admin-delete": <AdminDelete navigate={navigate} productos={productos} onDelete={deleteProducto} />,
    };

    return (
      <div style={{ backgroundColor: "aliceblue", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <HeaderAdmin usuario={adminUser} navigate={navigate} onLogout={handleLogout} />
        <div style={{ flex: 1 }}>
          {adminPages[page] ?? <AdminHome navigate={navigate} />}
        </div>
        <FooterAdmin />
      </div>
    );
  }

  // ── Render: sección pública ──────────────────────────────────────────────────
  const publicPages = {
    inicio:     <Inicio     navigate={navigate} productos={productos} />,
    mision:     <Mision />,
    vision:     <Vision />,
    contacto:   <Contacto />,
    compra:     <Compra />,
    accesorios: <Accesorios productos={productos} />,
    seguros:    <Seguros />,
  };

  return (
    <div
      className="bg-light bg-gradient"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <HeaderPublico
        page={page}
        navigate={navigate}
        onLoginClick={() => setShowLogin(true)}
      />
      <div style={{ flex: 1 }}>
        {publicPages[page] ?? publicPages.inicio}
      </div>
      <FooterPublico />

      {showLogin && (
        <ModalLogin
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
