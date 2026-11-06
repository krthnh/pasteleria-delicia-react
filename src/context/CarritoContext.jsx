// context/CarritoContext.jsx · el carrito se guarda en el navegador (localStorage)
import { createContext, useContext, useEffect, useReducer } from "react";

const CLAVE = "delicia-carrito"; // nombre con el que se guarda

// Lee el carrito guardado. localStorage solo guarda TEXTO: JSON.parse lo vuelve arreglo
function leerGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []; // ?? : si no hay nada, []
  } catch {
    return []; // datos dañados o almacenamiento bloqueado
  }
}

// 1) Reducer: recibe el estado y una acción, y DEVUELVE el estado nuevo
function carritoReducer(items, accion) {
  switch (accion.tipo) {
    case "agregar": {
      const existe = items.find((i) => i.id === accion.producto.id);
      if (existe) {
        return items.map((i) => (i.id === existe.id ? { ...i, cantidad: i.cantidad + 1 } : i));
      }
      return [...items, { ...accion.producto, cantidad: 1 }];
    }
    case "cambiar": // fija una cantidad exacta
      return items.map((i) => (i.id === accion.id ? { ...i, cantidad: accion.cantidad } : i));
    case "quitar":
      return items.filter((i) => i.id !== accion.id);
    case "vaciar":
      return [];
    default:
      return items; // acción desconocida: no cambia nada
  }
}

// 2) El contexto: una "caja" que cualquier componente puede abrir
const CarritoContext = createContext(null);

// 3) El proveedor envuelve la app y reparte el carrito
export function CarritoProvider({ children }) {
  // Tercer argumento: función que da el estado inicial (se ejecuta una sola vez)
  const [items, despachar] = useReducer(carritoReducer, [], leerGuardado);

  // Cada vez que cambian los items, se guardan como texto con JSON.stringify
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      /* sin almacenamiento: el carrito funciona igual, solo no se guarda */
    }
  }, [items]);
  const unidades = items.reduce((suma, i) => suma + i.cantidad, 0);

  const valor = {
    items,
    unidades,
    agregar: (producto) => despachar({ tipo: "agregar", producto }),
    cambiar: (id, cantidad) => despachar({ tipo: "cambiar", id, cantidad }),
    quitar: (id) => despachar({ tipo: "quitar", id }),
    vaciar: () => despachar({ tipo: "vaciar" }),
  };
  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

// 4) Hook propio: useCarrito() desde cualquier componente
export const useCarrito = () => useContext(CarritoContext);
