import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { validarCorreo, validarTexto } from "../utils/validators";

const EMPTY = { nombre: "", correo: "", comentario: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // Un solo handler para todos los inputs: usa el atributo name como clave
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      nombre: validarTexto(form.nombre, "El nombre", 100),
      correo: validarCorreo(form.correo),
      comentario: validarTexto(form.comentario, "El comentario", 500),
    };
    setErrors(newErrors);
    // Si todos los mensajes están vacíos, el formulario es válido
    if (Object.values(newErrors).every((msg) => msg === "")) {
      setSent(true);
      setForm(EMPTY);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h1>Contacto</h1>
        <hr />
        {sent && <Alert variant="success">¡Gracias! Recibimos tu mensaje.</Alert>}
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="contactoNombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control name="nombre" value={form.nombre} onChange={handleChange} isInvalid={!!errors.nombre} maxLength={100} />
            <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactoCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="correo" value={form.correo} onChange={handleChange} isInvalid={!!errors.correo} maxLength={100} />
            <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactoComentario">
            <Form.Label>Comentario</Form.Label>
            <Form.Control as="textarea" rows={4} name="comentario" value={form.comentario} onChange={handleChange} isInvalid={!!errors.comentario} maxLength={500} />
            <Form.Control.Feedback type="invalid">{errors.comentario}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Enviar mensaje</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Contact;
