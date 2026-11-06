// components/Avisos.jsx · pila de notificaciones abajo a la derecha
import "./Avisos.css";

export default function Avisos({ lista }) {
  return (
    // aria-live: los lectores de pantalla anuncian cada aviso nuevo
    <div className="avisos" aria-live="polite">
      {lista.map((a) => (
        <div key={a.id} className={`aviso ${a.tipo} ${a.saliendo ? "sale" : ""}`}>
          {a.texto}
        </div>
      ))}
    </div>
  );
}
