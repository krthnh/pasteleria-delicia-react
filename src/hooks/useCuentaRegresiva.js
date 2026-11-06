// hooks/useCuentaRegresiva.js · segundos que faltan hasta la medianoche
import { useEffect, useState } from "react";

function segundosHastaMedianoche() {
  const ahora = new Date();
  const fin = new Date(ahora);
  fin.setHours(24, 0, 0, 0); // 24:00 de hoy = 00:00 de mañana
  return Math.floor((fin - ahora) / 1000); // restar fechas da milisegundos
}

export function useCuentaRegresiva() {
  // Pasamos la función (sin ejecutarla): React la llama solo la primera vez
  const [restante, setRestante] = useState(segundosHastaMedianoche);

  useEffect(() => {
    const id = setInterval(() => setRestante(segundosHastaMedianoche()), 1000);
    return () => clearInterval(id); // sin esto, el intervalo seguiría vivo al salir
  }, []);

  // De segundos a horas, minutos y segundos con dos dígitos: 7 -> "07"
  const dosDigitos = (n) => String(n).padStart(2, "0");
  return {
    restante,
    hh: dosDigitos(Math.floor(restante / 3600)),
    mm: dosDigitos(Math.floor((restante % 3600) / 60)),
    ss: dosDigitos(restante % 60),
  };
}
