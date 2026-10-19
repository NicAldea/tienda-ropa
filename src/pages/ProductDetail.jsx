import { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { getProductById } from "../services/products";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  let { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id).then((prod) => {
      setProduct(prod);
    }).catch((error) => {
      console.error("Error obteniendo producto", error);
      setProduct(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={6}>
        {added && <Alert variant="success">Producto agregado al carrito</Alert>}
        <ProductCard
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
          action={() => { addToCart(product); setAdded(true); }}
          actionName="Añadir al carrito"
        />
      </Col>
    </Row>
  )
}

export default ProductDetail;
