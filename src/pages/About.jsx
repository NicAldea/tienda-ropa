import { Col, Row } from "react-bootstrap";

function About() {
  return (
    <>
      <h1>Nosotros</h1>
      <hr />
      <Row className="g-4 align-items-center">
        <Col xs={12} md={6}>
          <p>
            DresShop nació como un proyecto de estudiantes de Ingeniería en Informática de Duoc UC
            con una idea simple: ropa y accesorios elegidos uno a uno, con buena calidad y precios justos.
          </p>
          <p>
            Preferimos un catálogo corto y bien pensado antes que miles de opciones. Cada prenda la
            seleccionamos porque combina con el resto y dura en el tiempo.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <img src="/img/banner-tienda.svg" alt="Banner de DresShop" className="img-fluid rounded" />
        </Col>
      </Row>
      <Row className="g-4 mt-2">
        <Col xs={12} md={4}><h2 className="h5">Misión</h2><p>Vestir con identidad a precios accesibles.</p></Col>
        <Col xs={12} md={4}><h2 className="h5">Visión</h2><p>Ser la tienda online de referencia en moda básica de calidad en Chile.</p></Col>
        <Col xs={12} md={4}><h2 className="h5">Equipo</h2><p>Nicolás Aldea y Fabian Caro — Desarrollo Full Stack II.</p></Col>
      </Row>
    </>
  );
}

export default About;
