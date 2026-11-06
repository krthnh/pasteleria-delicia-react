// pages/Inicio.jsx · portada + oferta del día + carrusel
import Hero from "../components/Hero.jsx";
import Carrusel from "../components/Carrusel.jsx";
import OfertaDelDia from "../components/OfertaDelDia.jsx";

export default function Inicio({ onNavegar }) {
  return (
    <>
      <Hero onVerCatalogo={() => onNavegar("catalogo")} />
      <OfertaDelDia />
      <Carrusel />
    </>
  );
}
