export function validarContacto(f) {
  const e = {};
  if (!f.nombre.trim())
    e.nombre = "El nombre es requerido.";
  if (!f.email.trim())
    e.email = "El correo es requerido.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Correo inválido.";
  if (!f.telefono.trim())
    e.telefono = "El teléfono es requerido.";
  else if (!/^\+?[\d\s\-]{7,15}$/.test(f.telefono))
    e.telefono = "Teléfono inválido (7–15 dígitos).";
  if (!f.asunto)
    e.asunto = "Selecciona un asunto.";
  if (!f.mensaje.trim())
    e.mensaje = "El mensaje es requerido.";
  else if (f.mensaje.trim().length < 10)
    e.mensaje = "Mínimo 10 caracteres.";
  return e;
}

export function validarProducto(f) {
  const e = {};
  if (!f.nombre.trim())
    e.nombre = "El nombre es requerido.";
  if (!f.precio.trim())
    e.precio = "El precio es requerido.";
  if (!f.categoria)
    e.categoria = "Selecciona una categoría.";
  if (!f.img.trim())
    e.img = "La URL de imagen es requerida.";
  else if (!/^https?:\/\/.+/.test(f.img))
    e.img = "Debe ser una URL válida (http/https).";
  return e;
}

export function validarLogin(f) {
  const e = {};
  if (!f.usuario.trim())  e.usuario  = "El usuario es requerido.";
  if (!f.password.trim()) e.password = "La contraseña es requerida.";
  return e;
}
