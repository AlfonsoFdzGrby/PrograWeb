export default function Seguros() {
  return (
    <main>
      <div className="text-center" style={{ fontFamily: "'Merriweather', serif" }}>
        <h2 className="pt-3">Seguros y Garantía</h2>
        <hr />
        <div className="mx-5">
          <p className="mb-1" style={{ fontSize: "80%" }}>
            Todos nuestros vehículos son asegurados por
          </p>
          <div style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>
            <h1 style={{ fontWeight: "bold" }}>NovaShield</h1>
            <p style={{ fontSize: "120%" }}>Protección desde el primer kilómetro</p>
          </div>
          <hr />

          <div className="text-start" style={{ textAlign: "justify" }}>
            <p>
              En nuestra agencia, todos nuestros vehículos incluyen seguro por defecto al momento
              de la compra, brindándote protección inmediata sin trámites adicionales.
            </p>
            <p>
              NovaShield ofrece cobertura especializada en autos nuevos, con procesos ágiles,
              atención personalizada y respaldo total desde el día de entrega.
            </p>
            <hr />

            <h3 style={{ fontWeight: "bold" }}>Cobertura Amplia Integral</h3>
            <ul>
              {[
                "Responsabilidad civil por daños a terceros",
                "Daños materiales por accidente",
                "Robo total",
                "Cristales",
                "Gastos médicos para ocupantes",
                "Asistencia vial 24/7 (grúa, paso de corriente, envío de gasolina, cambio de llanta)",
                "Defensa legal y asesoría jurídica",
                "Atención prioritaria en talleres certificados",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <hr />

            <h3 style={{ fontWeight: "bold" }}>¿Cómo funciona?</h3>
            <ul>
              {[
                "El seguro se activa automáticamente al facturar tu vehículo.",
                "Se integra en tu plan de financiamiento o pago de contado.",
                "Vigencia inicial de 1 año con opción a renovación preferencial.",
                "Gestión directa desde la agencia para cualquier siniestro.",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <hr />

            <h3 style={{ fontWeight: "bold" }}>Beneficios Exclusivos para Nuestros Clientes</h3>
            <ul>
              {[
                "Proceso simplificado sin papeleo adicional",
                "Atención directa sin intermediarios",
                "Evaluación rápida de siniestros",
                "Red de talleres especializados en autos nuevos",
                "Renovación con tarifa preferencial",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <hr />

            <p style={{ fontWeight: "bold", fontSize: "110%" }}>
              Contacta a NovaShield: 01-800-999-4000
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
