import { Button, Card } from "react-bootstrap";
import { formatPrice } from "../utils/formatters";

function ProductCard({ name, price, description, image, stock=undefined, action=undefined, actionName="Ver" }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} alt={`Imagen producto ${name}`} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-1 text-muted">{formatPrice(price)}</Card.Subtitle>
        {stock !== undefined && (
          <small className={`mb-2 ${stock > 0 ? "text-success" : "text-danger fw-bold"}`}>
            {stock > 0 ? `Stock disponible: ${stock}` : "Agotado"}
          </small>
        )}        <Card.Text className="flex-grow-1">
          {description}
        </Card.Text>
        {action && (<Button variant="primary" onClick={action} className="align-self-start">
          {actionName}
        </Button>)}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;