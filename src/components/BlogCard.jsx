import { Button, Card } from "react-bootstrap";

// Tarjeta reutilizable: todo lo que muestra llega por props
function BlogCard({ title, date, summary, image, onReadMore, buttonLabel = "Leer más" }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} alt={`Imagen del blog ${title}`} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text className="flex-grow-1">{summary}</Card.Text>
        <Button variant="primary" className="align-self-start" onClick={onReadMore}>
          {buttonLabel}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
