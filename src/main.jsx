// main.jsx · dos proveedores: avisos (afuera) y carrito (adentro)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { AvisosProvider } from "./context/AvisosContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AvisosProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AvisosProvider>
  </StrictMode>
);
