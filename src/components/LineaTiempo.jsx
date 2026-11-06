// components/LineaTiempo.jsx · puntos y barra según el estado actual
import "./LineaTiempo.css";

export default function LineaTiempo({ pasos, actual }) {
  // Regla de tres: índice -> porcentaje de avance (0 a 100)
  const porcentaje = (actual / (pasos.length - 1)) * 100;

  return (
    <div className="linea-tiempo">
      {/* Los puntos van del 10 % al 90 % del ancho: la barra recorre como máximo el 80 % */}
      <div className="linea-relleno" style={{ width: `${porcentaje * 0.8}%` }} />
      {pasos.map((paso, i) => (
        <div key={paso} className={`paso ${i < actual ? "hecho" : i === actual ? "actual" : ""}`}>
          <span className="punto" />
          <small>{paso}</small>
        </div>
      ))}
    </div>
  );
}
