// components/Esqueleto.jsx · tarjetas grises mientras llegan los datos
import "./Esqueleto.css";

export default function Esqueleto({ cantidad = 4 }) {
  // Array.from crea un arreglo de "cantidad" elementos para recorrerlo con map
  return Array.from({ length: cantidad }, (_, i) => (
    <div key={i} className="esqueleto" aria-hidden="true">
      <div className="esqueleto-foto" />
      <div className="esqueleto-linea" />
      <div className="esqueleto-linea corta" />
    </div>
  ));
}
