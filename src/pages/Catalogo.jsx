// pages/Catalogo.jsx · la búsqueda espera a que el cliente deje de escribir
import { useCallback, useEffect, useState } from "react";
import ProductoCard from "../components/ProductoCard.jsx";
import Buscador from "../components/Buscador.jsx";
import FiltroCategorias from "../components/FiltroCategorias.jsx";
import DetalleModal from "../components/DetalleModal.jsx";
import Esqueleto from "../components/Esqueleto.jsx";
import { obtenerProductos } from "../services/api.js";
import { useFlip } from "../hooks/useFlip.js";
import { useDebounce } from "../hooks/useDebounce.js";
import "./Catalogo.css";

// Funciones comparadoras: negativo = a va primero; positivo = b va primero
const ORDENES = {
  relevancia: (a, b) => a.id - b.id,
  "menor precio": (a, b) => a.precio - b.precio,
  "mayor precio": (a, b) => b.precio - a.precio,
  "más vendidos": (a, b) => b.vendidos - a.vendidos,
};

export default function Catalogo() {
  const [productos, setProductos] = useState(null); // null = todavía cargando
  const [error, setError] = useState("");
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [orden, setOrden] = useState("relevancia");
  const [elegido, setElegido] = useState(null); // producto del modal (null = cerrado)
  const cerrarDetalle = useCallback(() => setElegido(null), []);

  // async/await: el código se lee de arriba hacia abajo
  async function cargar() {
    setError("");
    setProductos(null);
    try {
      const lista = await obtenerProductos(); // si falla, salta directo al catch
      setProductos(lista);
    } catch (e) {
      setError(e.message); // e es el Error que lanzó throw
    }
  }

  // useEffect con [] : se ejecuta UNA vez, al mostrar la página
  useEffect(() => {
    cargar();
  }, []);

  const lista = productos ?? []; // ?? : si es null, usa un arreglo vacío
  const categorias = ["Todas", ...new Set(lista.map((p) => p.categoria))];
  const termino = useDebounce(texto); // cambia 350 ms después de la última tecla
  const escribiendo = texto !== termino;
  const q = termino.trim().toLowerCase(); // filtramos con el término "calmado"
  const visibles = lista
    .filter((p) => categoria === "Todas" || p.categoria === categoria)
    .filter((p) => p.nombre.toLowerCase().includes(q))
    .sort(ORDENES[orden]);

  const grilla = useFlip(visibles.map((p) => p.id).join());

  return (
    <section className="catalogo contenedor">
      <header className="catalogo-cabecera">
        <h2>Nuestro catálogo</h2>
        <p className="suave">
          {!productos ? "Cargando..." : escribiendo ? "Buscando..." : `${visibles.length} de ${lista.length} productos`}
        </p>
      </header>

      <div className="herramientas">
        <Buscador valor={texto} onCambiar={setTexto} />
        <select value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar">
          {Object.keys(ORDENES).map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <FiltroCategorias categorias={categorias} activa={categoria} onElegir={setCategoria} />
      </div>

      {error && (
        <div className="error-carga" role="alert">
          <span>{error}</span>
          <button className="boton" onClick={cargar}>Reintentar</button>
        </div>
      )}

      <div className={escribiendo ? "grilla esperando" : "grilla"} ref={grilla}>
        {error ? null : productos === null ? (
          <Esqueleto cantidad={4} />
        ) : (
          visibles.map((producto, i) => (
            <div key={producto.id} data-id={producto.id} className="celda" style={{ "--i": i }}>
              <ProductoCard producto={producto} onVerDetalle={setElegido} />
            </div>
          ))
        )}
      </div>

      {productos && visibles.length === 0 && <p className="vacio">Sin resultados para "{termino}"</p>}

      <DetalleModal producto={elegido} onCerrar={cerrarDetalle} />
    </section>
  );
}
