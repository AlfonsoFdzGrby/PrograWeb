export default function Compra() {
  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="text-center pt-3">Compra</h2>
        <hr />
        <p>La compra de nuestros vehículos se efectúa únicamente en nuestras concesionarias.</p>
        <p>¡Ubica tu concesionaria más cercana!</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1878.3405701098707!2d-101.1815593923486!3d19.68360442272247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1772501632816!5m2!1ses-419!2smx"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa concesionarias"
        />
        <br /><br />
      </div>
    </main>
  );
}
