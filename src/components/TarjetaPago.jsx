// components/TarjetaPago.jsx · tarjeta que se formatea, se valida y gira en 3D
import { useEffect, useState } from "react";
import { validarLuhn, marcaTarjeta } from "../utils/validaciones.js";
import "./TarjetaPago.css";

export default function TarjetaPago({ onValidar }) {
  const [numero, setNumero] = useState("");
  const [cvv, setCvv] = useState("");
  const [girada, setGirada] = useState(false);

  // replace con RegExp: \D = todo lo que NO es dígito; g = todas las veces
  const digitos = numero.replace(/\D/g, "").slice(0, 16);
  // Un espacio cada 4 dígitos: 4111111111111111 -> 4111 1111 1111 1111
  const formateado = digitos.replace(/(\d{4})(?=\d)/g, "$1 ");
  const numeroOk = digitos.length === 16 && validarLuhn(digitos);
  const todoOk = numeroOk && cvv.length === 3;

  // Avisamos al padre cada vez que cambia la validez
  useEffect(() => {
    onValidar(todoOk);
  }, [todoOk, onValidar]);

  return (
    <div className="pago">
      <div className={girada ? "tarjeta girada" : "tarjeta"}>
        <div className="cara frente">
          <span className="marca-tarjeta">{marcaTarjeta(digitos)}</span>
          <span className="numero">{formateado || "•••• •••• •••• ••••"}</span>
        </div>
        <div className="cara reverso">
          <span className="banda" />
          <span className="cvv">{cvv || "•••"}</span>
        </div>
      </div>
      <input
        placeholder="Prueba 4111 1111 1111 1111"
        inputMode="numeric"
        value={formateado}
        onChange={(e) => setNumero(e.target.value)}
      />
      <input
        placeholder="CVV"
        inputMode="numeric"
        maxLength={3}
        value={cvv}
        onFocus={() => setGirada(true)} // al escribir el CVV la tarjeta gira
        onBlur={() => setGirada(false)}
        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
      />
      <p className={numeroOk ? "estado-tarjeta ok" : "estado-tarjeta"}>
        {digitos.length < 16 ? `${digitos.length}/16 dígitos` : numeroOk ? "Número válido (Luhn)" : "Número inválido"}
      </p>
    </div>
  );
}
