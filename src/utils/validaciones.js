// utils/validaciones.js · reglas con expresiones regulares + algoritmo de Luhn
// Cada regla: [patrón, texto de ayuda]
export const REGLAS = {
  nombre: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/, "Solo letras, mínimo 3"],
  correo: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Ejemplo: ana@correo.com"],
  celular: [/^9\d{8}$/, "9 dígitos y empieza con 9"],
  clave: [/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "8 o más, con letras y números"],
};

// test() devuelve true si el texto cumple el patrón
export const cumple = (campo, valor) => REGLAS[campo][0].test(valor);

// Algoritmo de Luhn: detecta errores de tipeo en números de tarjeta
// Recorre de derecha a izquierda y duplica uno de cada dos dígitos
export function validarLuhn(digitos) {
  let suma = 0;
  let duplicar = false;
  for (let i = digitos.length - 1; i >= 0; i--) {
    let d = Number(digitos[i]);
    if (duplicar) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    suma += d;
    duplicar = !duplicar;
  }
  return suma % 10 === 0; // válido si la suma termina en 0
}

// La marca se reconoce por los primeros dígitos
export const marcaTarjeta = (n) => (/^4/.test(n) ? "VISA" : /^5[1-5]/.test(n) ? "MASTERCARD" : "TARJETA");
