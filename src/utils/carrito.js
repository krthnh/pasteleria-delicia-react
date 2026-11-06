// utils/carrito.js · reglas del negocio en una función PURA
// Pura: mismos datos de entrada -> mismo resultado, y no cambia nada afuera.
export const COSTO_DELIVERY = 7;
export const GRATIS_DESDE = 80;

export function calcularTotales(items, entrega) {
  const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const igv = subtotal - subtotal / 1.18; // el IGV ya está dentro del precio
  const envio = entrega === "delivery" && subtotal < GRATIS_DESDE ? COSTO_DELIVERY : 0;
  const faltaParaGratis = Math.max(0, GRATIS_DESDE - subtotal);
  return { subtotal, igv, envio, total: subtotal + envio, faltaParaGratis };
}
