// components/OfertaDelDia.jsx · 20 % de descuento hasta la medianoche
import { productos } from "../data/productos.js";
import { soles } from "../utils/formato.js";
import { useCuentaRegresiva } from "../hooks/useCuentaRegresiva.js";
import { useCarrito } from "../context/CarritoContext.jsx";
import "./OfertaDelDia.css";

const DESCUENTO = 0.2;
const producto = productos[1]; // torta tres leches

export default function OfertaDelDia() {
  const { restante, hh, mm, ss } = useCuentaRegresiva();
  const { agregar } = useCarrito();
  const precioOferta = producto.precio * (1 - DESCUENTO);
  const ultimaHora = restante < 3600;

  // Spread para crear una versión "oferta" del producto (otro id, otro precio)
  const aprovechar = () =>
    agregar({ ...producto, id: `oferta-${producto.id}`, nombre: `${producto.nombre} (oferta)`, precio: precioOferta });

  return (
    <section className="contenedor">
      <article className={ultimaHora ? "oferta urgente" : "oferta"}>
        <img src={producto.imagen} alt={producto.nombre} />
        <div>
          <p className="oferta-ceja">Oferta del día · {DESCUENTO * 100} % menos</p>
          <h2>{producto.nombre}</h2>
          <p>
            <del>{soles(producto.precio)}</del> <b className="precio">{soles(precioOferta)}</b>
          </p>
          <p className="reloj">
            Termina en {hh}:{mm}:
            {/* key={ss}: cada segundo es un span nuevo y el dígito "cae" */}
            <span key={ss} className="digito">{ss}</span>
          </p>
          <button className="boton" onClick={aprovechar}>Aprovechar</button>
        </div>
      </article>
    </section>
  );
}
