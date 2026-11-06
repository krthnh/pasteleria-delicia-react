// components/Encabezado.jsx · el botón del carrito abre el panel lateral
import { useCarrito } from "../context/CarritoContext.jsx";
import "./Encabezado.css";

export default function Encabezado({ paginas, actual, onNavegar, onAbrirCarrito }) {
  const { unidades } = useCarrito();
  // filter: quitamos las páginas marcadas como ocultas
  const menu = Object.entries(paginas).filter(([, pagina]) => !pagina.oculta);

  return (
    <header className="encabezado">
      <div className="contenedor encabezado-fila">
        <button className="marca" onClick={() => onNavegar("inicio")}>
          <span className="marca-sello">D</span>
          Delicia
        </button>

        <nav className="menu">
          {menu.map(([clave, pagina]) => (
            <button
              key={clave}
              className={clave === actual ? "menu-enlace activo" : "menu-enlace"}
              onClick={() => onNavegar(clave)}
            >
              {pagina.titulo}
            </button>
          ))}
        </nav>

        <button className="icono-carrito" onClick={onAbrirCarrito}>
          Carrito{" "}
          {/* key={unidades}: al cambiar el número, React crea un span NUEVO y la animación se repite */}
          <span key={unidades} className="contador-carrito salta">
            {unidades}
          </span>
        </button>
      </div>
    </header>
  );
}
