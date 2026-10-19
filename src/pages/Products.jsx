import { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/products";
import { CATEGORIES, ROUTE_PARAMS, ROUTE_PATHS } from "../utils/constants";

function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Todas");
  const [added, setAdded] = useState("");

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const search = (searchParams.get(ROUTE_PARAMS.SEARCH) || "").toLowerCase();

  // Filtros combinados: categoría elegida + texto buscado en el navbar
  const visible = products
    .filter((p) => category === "Todas" || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search));

  const handleAdd = (product) => {
    addToCart(product);
    setAdded(product.name);
  };

  return (
    <>
      <h1>Productos</h1>
      <ButtonGroup className="flex-wrap mb-3" aria-label="Filtrar por categoría">
        {["Todas", ...CATEGORIES].map((c) => (
          <Button key={c} variant={c === category ? "primary" : "outline-primary"} onClick={() => setCategory(c)}>
            {c}
          </Button>
        ))}
      </ButtonGroup>
      {added && <Alert variant="success" onClose={() => setAdded("")} dismissible>{added} se agregó al carrito</Alert>}
      {loading ? <Loading /> : (
        <Row className="g-4">
          {visible.length === 0 && <p>No hay productos para este filtro.</p>}
          {visible.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={4}>
              <ProductCard
                name={p.name}
                price={p.price}
                description={p.description}
                image={p.image}
                stock={p.stock}
                action={p.stock > 0 ? () => handleAdd(p) : undefined}
                actionName="Añadir al carrito"
              />
              <Button variant="link" className="px-0" onClick={() => navigate(ROUTE_PATHS.PRODUCT_DETAIL_WITH_ID(p.id))}>
                Ver detalle
              </Button>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default Products;
