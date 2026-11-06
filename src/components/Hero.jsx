// components/Hero.jsx · portada de la tienda (la animación es solo CSS)
import "./Hero.css";

// onVerCatalogo: función que recibe del padre (una prop puede ser una función)
export default function Hero({ onVerCatalogo }) {
  return (
    <section className="hero">
      <div className="contenedor hero-grilla">
        <div className="hero-texto">
          <p className="hero-ceja">Desde 2010 en Huancayo</p>
          <h1>
            Hecho cada mañana, <em>con cariño</em>
          </h1>
          <p>Tortas, panes y postres artesanales. Pide en línea y recoge en tienda o recíbelo en casa.</p>
          <button className="boton boton-grande" onClick={onVerCatalogo}>
            Ver catálogo
          </button>
        </div>
        {/* Las imágenes de public/ se escriben desde la raíz: /img/... */}
        <img className="hero-imagen" src="/img/productos/torta-chocolate.svg" alt="Torta de chocolate" />
      </div>
    </section>
  );
}
