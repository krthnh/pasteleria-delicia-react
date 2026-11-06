// services/pedidos.js · guarda y lee el último pedido (en clase: tabla pedidos de Neon)
const CLAVE = "delicia-pedido";

export const ESTADOS = ["Registrado", "En preparación", "Empaquetado", "En camino", "Entregado"];

export function guardarPedido(pedido) {
  localStorage.setItem(CLAVE, JSON.stringify(pedido));
}

export function leerPedido() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)); // null si no hay pedido
  } catch {
    return null;
  }
}

// Código legible: PD- + últimos 6 dígitos de la hora actual en milisegundos
export const nuevoCodigo = () => `PD-${String(Date.now()).slice(-6)}`;
