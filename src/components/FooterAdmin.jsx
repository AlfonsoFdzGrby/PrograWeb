import { ADMIN_FOOTER_STYLE } from "../data/productos";

export default function FooterAdmin() {
  return (
    <footer
      className="text-center bg-gradient text-white py-3 mt-auto"
      style={ADMIN_FOOTER_STYLE}
    >
      <p>Alfonso Marón Fernández Garibay - Desarrollo Web</p>
      <p>
        <a href="https://jigsaw.w3.org/css-validator/check/referer">
          <img
            style={{ border: 0, width: 88, height: 31 }}
            src="https://jigsaw.w3.org/css-validator/images/vcss-blue"
            alt="¡CSS Válido!"
          />
        </a>
      </p>
    </footer>
  );
}
