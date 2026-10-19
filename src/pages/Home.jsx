import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getProducts } from "../services/products";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { useNavigate, useSearchParams } from "react-router";
import { ROUTE_PARAMS, ROUTE_PATHS } from "../utils/constants";

function Home() {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Las promesas puedes ser manejadas con .then() y .catch()
    // then es para cuando la promesa se resuelve correctamente
    // catch es para cuando la promesa falla
    getProducts().then((apiProducts) => {
      setProducts(apiProducts);
      setLoading(false);
    });
  }, []);

  const goToProductDetail = (id) => {
    navigate(ROUTE_PATHS.PRODUCT_DETAIL_WITH_ID(id));
  };

  return (
    <>
      <h1>Vístete con identidad</h1>
      <h2>Ropa y accesorios seleccionados uno a uno</h2>
      <section className="bg-light rounded p-3 my-3" aria-labelledby="quienes-somos">
        <h3 id="quienes-somos" className="h5">Quiénes somos</h3>
        <p className="mb-2">
          DresShop es una tienda online de ropa y accesorios creada por Nicolás Aldea y Fabian Caro,
          estudiantes de Duoc UC. Un catálogo corto, prendas que combinan entre sí y precios justos.
        </p>
        <Button variant="outline-primary" size="sm" onClick={() => navigate(ROUTE_PATHS.ABOUT)}>Conoce más</Button>
      </section>
      <hr />
      <Container>
        <Row className="align-items-stretch">
          {loading ? (<Loading />) : (
            products.filter(p => !searchParams.get(ROUTE_PARAMS.SEARCH) || p.name.toLowerCase().includes(searchParams.get(ROUTE_PARAMS.SEARCH).toLowerCase()))
            .map((product) => <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
            <ProductCard
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              action={() => goToProductDetail(product.id)}
              actionName="Ver detalle"
            />
          </Col>)
          )}
        </Row>
      </Container>
    </>
  )
}

export default Home;