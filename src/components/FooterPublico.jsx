export default function FooterPublico() {
  return (
    <footer
      className="text-center bg-secondary bg-gradient text-white py-3 mt-auto"
      style={{ fontFamily: "'Merriweather', serif" }}
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
