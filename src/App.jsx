// App.jsx · versión final: cinco páginas en el menú y dos ocultas
import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import Pie from "./components/Pie.jsx";
import Vuelos from "./components/Vuelos.jsx";
import MiniCarrito from "./components/MiniCarrito.jsx";
import Inicio from "./pages/Inicio.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Carta from "./pages/Carta.jsx";
import Carrito from "./pages/Carrito.jsx";
import Registro from "./pages/Registro.jsx";
import Checkout from "./pages/Checkout.jsx";
import MiPedido from "./pages/MiPedido.jsx";
import "./App.css";

const PAGINAS = {
  inicio: { titulo: "Inicio", Componente: Inicio },
  catalogo: { titulo: "Catálogo", Componente: Catalogo },
  carta: { titulo: "Carta", Componente: Carta },
  pedido: { titulo: "Mi pedido", Componente: MiPedido },
  cuenta: { titulo: "Cuenta", Componente: Registro },
  carrito: { titulo: "Carrito", Componente: Carrito, oculta: true },
  checkout: { titulo: "Pagar", Componente: Checkout, oculta: true },
};

export default function App({ inicio = "inicio" }) {
  const [pagina, setPagina] = useState(inicio);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const { Componente } = PAGINAS[pagina];

  const cerrarPanel = () => setPanelAbierto(false);
  const irAlCarrito = () => {
    setPanelAbierto(false);
    setPagina("carrito");
  };

  return (
    <div className="app">
      <Encabezado
        paginas={PAGINAS}
        actual={pagina}
        onNavegar={setPagina}
        onAbrirCarrito={() => setPanelAbierto(true)}
      />
      <main className="principal" key={pagina}>
        <Componente onNavegar={setPagina} />
      </main>
      <Pie />
      <MiniCarrito abierto={panelAbierto} onCerrar={cerrarPanel} onVerCarrito={irAlCarrito} />
      <Vuelos />
    </div>
  );
}
