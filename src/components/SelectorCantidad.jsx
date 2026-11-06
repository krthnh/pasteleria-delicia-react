// components/SelectorCantidad.jsx · − [ n ] +  con validación
import { useState } from "react";
import "./SelectorCantidad.css";

export default function SelectorCantidad({ cantidad, maximo, onCambiar }) {
  const [aviso, setAviso] = useState("");

  // Un solo lugar decide qué valores son válidos
  const cambiar = (valor) => {
    const n = Number(valor); // "3" -> 3   "abc" -> NaN
    if (Number.isNaN(n) || n < 1) {
      onCambiar(1);
      setAviso("Mínimo 1");
      return; // return corta la función aquí
    }
    if (n > maximo) {
      onCambiar(maximo);
      setAviso(`Solo hay ${maximo}`);
      return;
    }
    onCambiar(n);
    setAviso("");
  };

  return (
    <div className="selector-caja">
      <div className="selector">
        <button onClick={() => cambiar(cantidad - 1)} aria-label="Quitar uno">−</button>
        <input type="number" value={cantidad} onChange={(e) => cambiar(e.target.value)} aria-label="Cantidad" />
        <button onClick={() => cambiar(cantidad + 1)} aria-label="Agregar uno">+</button>
      </div>
      {/* key={aviso}: cada aviso nuevo es un elemento nuevo y la sacudida se repite */}
      {aviso && <small key={aviso} className="selector-aviso">{aviso}</small>}
    </div>
  );
}
