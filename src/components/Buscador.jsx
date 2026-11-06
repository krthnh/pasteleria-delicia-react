// components/Buscador.jsx · atajos de teclado: "/" para buscar, Esc para limpiar
import { useEffect, useRef } from "react";
import "./Buscador.css";

export default function Buscador({ valor, onCambiar }) {
  const campo = useRef(null); // acceso directo al <input>

  useEffect(() => {
    const alPresionar = (e) => {
      const escribiendoAqui = campo.current.matches(":focus");
      if (e.key === "/" && !escribiendoAqui) {
        e.preventDefault(); // evita que "/" se escriba en el campo
        campo.current.focus();
      }
      if (e.key === "Escape" && escribiendoAqui) {
        onCambiar("");
        campo.current.blur(); // quita el foco
      }
    };
    window.addEventListener("keydown", alPresionar); // escucha en toda la ventana
    return () => window.removeEventListener("keydown", alPresionar); // limpieza al desmontar
  }, [onCambiar]);

  return (
    <label className="buscador">
      <span className="lupa" aria-hidden="true" />
      <input
        ref={campo}
        type="search"
        placeholder="Busca: torta, pan, pye..."
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
      />
      <kbd className="atajo">/</kbd>
    </label>
  );
}
