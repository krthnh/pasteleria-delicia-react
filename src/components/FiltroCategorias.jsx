// components/FiltroCategorias.jsx · un botón (chip) por categoría
import "./FiltroCategorias.css";

export default function FiltroCategorias({ categorias, activa, onElegir }) {
  return (
    <div className="filtros" role="group" aria-label="Categorías">
      {categorias.map((c) => (
        <button
          key={c}
          className={c === activa ? "chip activo" : "chip"}
          onClick={() => onElegir(c)} // función flecha: se ejecuta al hacer clic
        >
          {c}
        </button>
      ))}
    </div>
  );
}
