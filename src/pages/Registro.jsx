// pages/Registro.jsx · formulario que se valida mientras el cliente escribe
import { useState } from "react";
import { REGLAS, cumple } from "../utils/validaciones.js";
import { useAvisos } from "../context/AvisosContext.jsx";
import "./Registro.css";

const VACIO = { nombre: "", correo: "", celular: "", clave: "" };

export default function Registro({ onNavegar }) {
  const [datos, setDatos] = useState(VACIO);
  const { avisar } = useAvisos();

  // [e.target.name]: nombre de propiedad calculado (sirve para TODOS los campos)
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  // every: true solo si TODOS los campos cumplen su regla
  const todoOk = Object.keys(REGLAS).every((campo) => cumple(campo, datos[campo]));

  const enviar = (e) => {
    e.preventDefault(); // evita que el formulario recargue la página
    avisar(`Bienvenida(o), ${datos.nombre.split(" ")[0]}`);
    setDatos(VACIO);
    onNavegar("catalogo");
  };

  return (
    <section className="contenedor registro">
      <h2>Crea tu cuenta</h2>
      <form onSubmit={enviar} noValidate>
        {Object.entries(REGLAS).map(([campo, [, ayuda]]) => {
          const valor = datos[campo];
          const estado = valor === "" ? "" : cumple(campo, valor) ? "ok" : "mal";
          return (
            <label key={campo} className={`campo ${estado}`}>
              <span>{campo}</span>
              <input
                name={campo}
                type={campo === "clave" ? "password" : campo === "correo" ? "email" : "text"}
                value={valor}
                onChange={cambiar}
              />
              <small>{ayuda}</small>
            </label>
          );
        })}
        <button className={todoOk ? "boton listo" : "boton"} disabled={!todoOk}>Crear cuenta</button>
      </form>
    </section>
  );
}
