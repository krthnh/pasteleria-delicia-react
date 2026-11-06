// context/AvisosContext.jsx · cola de notificaciones para toda la app
import { createContext, useContext, useRef, useState } from "react";
import Avisos from "../components/Avisos.jsx";

const AvisosContext = createContext(null);

export function AvisosProvider({ children }) {
  const [lista, setLista] = useState([]); // la cola: [{ id, texto, tipo, saliendo }]
  const siguiente = useRef(1);

  // tipo = "ok": parámetro con valor por defecto
  const avisar = (texto, tipo = "ok") => {
    const id = siguiente.current++;
    setLista((l) => [...l, { id, texto, tipo }]); // entra al final de la cola
    // 1) a los 2.5 s empieza la animación de salida
    setTimeout(() => setLista((l) => l.map((a) => (a.id === id ? { ...a, saliendo: true } : a))), 2500);
    // 2) a los 2.9 s se elimina de la cola
    setTimeout(() => setLista((l) => l.filter((a) => a.id !== id)), 2900);
  };

  return (
    <AvisosContext.Provider value={{ avisar }}>
      {children}
      <Avisos lista={lista} />
    </AvisosContext.Provider>
  );
}

export const useAvisos = () => useContext(AvisosContext);
