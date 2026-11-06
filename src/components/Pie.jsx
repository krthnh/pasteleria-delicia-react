// components/Pie.jsx · pie de página con datos de contacto
import "./Pie.css";

export default function Pie() {
  const anio = new Date().getFullYear(); // el año se calcula solo

  return (
    <footer className="pie">
      <div className="contenedor pie-grilla">
        <div>
          <b className="pie-marca">Pastelería Delicia</b>
          <p>Jr. Ica 345, Huancayo</p>
        </div>
        <div>
          <b>Horario</b>
          <p>Lunes a sábado · 7:00 a 21:00</p>
        </div>
        <div>
          <b>Pedidos</b>
          <p>Delivery en El Tambo, Huancayo y Chilca</p>
        </div>
      </div>
      <p className="pie-copia">© {anio} Pastelería Delicia · Proyecto de clase</p>
    </footer>
  );
}
