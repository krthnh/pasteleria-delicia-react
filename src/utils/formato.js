// utils/formato.js · funciones pequeñas para mostrar datos

// const: el valor no se vuelve a asignar
export const IGV = 0.18;

// Función flecha: recibe un número y devuelve texto en soles
// 65 -> "S/ 65.00"   (Intl da formato según el país)
export const soles = (monto) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(monto);

// El precio ya incluye IGV: así se calcula cuánto es de impuesto
export const igvIncluido = (precio) => precio - precio / (1 + IGV);

// Pausa: una Promesa que se cumple después de ms milisegundos
export const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));
