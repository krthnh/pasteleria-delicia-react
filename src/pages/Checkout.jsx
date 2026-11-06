// pages/Checkout.jsx · al confirmar se guarda el pedido y se va al seguimiento
import { useState } from "react";
import TarjetaPago from "../components/TarjetaPago.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useAvisos } from "../context/AvisosContext.jsx";
import { calcularTotales } from "../utils/carrito.js";
import { guardarPedido, nuevoCodigo } from "../services/pedidos.js";
import { soles } from "../utils/formato.js";
import "./Checkout.css";

export default function Checkout({ onNavegar }) {
  const { items, vaciar } = useCarrito();
  const { avisar } = useAvisos();
  const [entrega, setEntrega] = useState("delivery");
  const [pago, setPago] = useState("contraentrega");
  const [tarjetaOk, setTarjetaOk] = useState(false);
  const t = calcularTotales(items, entrega); // toda la lógica en una línea

  if (items.length === 0) {
    return (
      <section className="contenedor checkout">
        <h2>No hay productos para pagar</h2>
        <button className="boton" onClick={() => onNavegar("catalogo")}>Ir al catálogo</button>
      </section>
    );
  }

  // Se puede confirmar si paga al recibir, o si la tarjeta es válida
  const puedeConfirmar = pago === "contraentrega" || tarjetaOk;

  const confirmar = () => {
    const pedido = { codigo: nuevoCodigo(), items, total: t.total, entrega, pago, estado: 0 };
    guardarPedido(pedido); // 1. guardamos
    avisar(`Pedido ${pedido.codigo} registrado`); // 2. avisamos
    vaciar(); // 3. vaciamos el carrito
    onNavegar("pedido"); // 4. vamos al seguimiento
  };

  return (
    <section className="contenedor checkout">
      <h2>Finalizar compra</h2>

      {/* La clase del contenedor mueve el indicador con una transición */}
      <div className={`selector-entrega ${entrega}`}>
        <span className="indicador" />
        <button onClick={() => setEntrega("delivery")}>Delivery</button>
        <button onClick={() => setEntrega("tienda")}>Recoger en tienda</button>
      </div>

      {/* key={entrega}: el panel se vuelve a crear y anima su entrada */}
      <div key={entrega} className="panel-entrega">
        {entrega === "delivery" ? (
          <input placeholder="Dirección exacta" defaultValue="Jr. Ica 345, Huancayo" />
        ) : (
          <select>
            <option>Delicia El Tambo</option>
            <option>Delicia Centro</option>
          </select>
        )}
      </div>

      <dl className="totales">
        <div><dt>Subtotal</dt><dd>{soles(t.subtotal)}</dd></div>
        <div><dt>IGV incluido</dt><dd>{soles(t.igv)}</dd></div>
        <div>
          <dt>Envío</dt>
          <dd key={t.envio} className="cambia">{t.envio ? soles(t.envio) : "Gratis"}</dd>
        </div>
        <div className="total"><dt>Total</dt><dd>{soles(t.total)}</dd></div>
      </dl>
      {entrega === "delivery" && t.faltaParaGratis > 0 && (
        <p className="suave">Agrega {soles(t.faltaParaGratis)} más y el delivery es gratis.</p>
      )}

      <div className="metodos-pago">
        <label>
          <input type="radio" checked={pago === "contraentrega"} onChange={() => setPago("contraentrega")} />
          Pago contra entrega
        </label>
        <label>
          <input type="radio" checked={pago === "tarjeta"} onChange={() => setPago("tarjeta")} />
          Tarjeta
        </label>
      </div>
      {pago === "tarjeta" && <TarjetaPago onValidar={setTarjetaOk} />}

      <button className="boton boton-ancho" onClick={confirmar} disabled={!puedeConfirmar}>
        Confirmar pedido · {soles(t.total)}
      </button>
    </section>
  );
}
