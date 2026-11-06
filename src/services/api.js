// services/api.js · ahora la consulta también puede FALLAR
import { productos } from "../data/productos.js";
import { esperar } from "../utils/formato.js";

let consultas = 0; // cuántas veces se pidió el catálogo

export async function obtenerProductos() {
  const numero = ++consultas; // guardamos el número de ESTA consulta antes de esperar
  await esperar(900);
  // Simulación: la PRIMERA consulta falla, como cuando Neon está "despertando"
  if (numero === 1) {
    throw new Error("El servidor no respondió a tiempo. Intenta de nuevo."); // throw: lanza un error
  }
  return productos;
}
