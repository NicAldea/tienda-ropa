import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { REGIONES } from "../data/regiones";
import { registerUser } from "../services/auth";
import { ROUTE_PATHS } from "../utils/constants";
import { validarRegistro } from "../utils/validators";

const EMPTY = {
  run: "", nombre: "", apellidos: "", correo: "", password: "", password2: "",
  region: "", comuna: "", direccion: "",
};

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia la región, la comuna elegida ya no sirve: se reinicia
    if (name === "region") {
      setForm({ ...form, region: value, comuna: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Comunas de la región seleccionada (select encadenado)
  const comunas = REGIONES.find((r) => r.nombre === form.region)?.comunas ?? [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validarRegistro(form);
    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    const { password2: _omit, ...user } = form;
    registerUser({ ...user, run: user.run.toUpperCase() })
      .then(() => navigate(`${ROUTE_PATHS.SIGN_IN}?registrado=1`))
      .catch((err) => setApiError(err.message));
  };

  // Helper para no repetir el mismo bloque en cada campo
  const field = (name, label, props = {}) => (
    <Form.Group className="mb-3" controlId={`registro-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} value={form[name]} onChange={handleChange} isInvalid={!!errors[name]} {...props} />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <h1>Crear cuenta</h1>
        <hr />
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6}>{field("run", "RUN (sin puntos ni guión)", { placeholder: "19011022K", maxLength: 9 })}</Col>
            <Col xs={12} md={6}>{field("correo", "Correo", { type: "email", maxLength: 100 })}</Col>
            <Col xs={12} md={6}>{field("nombre", "Nombre", { maxLength: 50 })}</Col>
            <Col xs={12} md={6}>{field("apellidos", "Apellidos", { maxLength: 100 })}</Col>
            <Col xs={12} md={6}>{field("password", "Contraseña", { type: "password", maxLength: 10 })}</Col>
            <Col xs={12} md={6}>{field("password2", "Repetir contraseña", { type: "password", maxLength: 10 })}</Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="registro-region">
                <Form.Label>Región</Form.Label>
                <Form.Select name="region" value={form.region} onChange={handleChange} isInvalid={!!errors.region}>
                  <option value="">Selecciona una región</option>
                  {REGIONES.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="registro-comuna">
                <Form.Label>Comuna</Form.Label>
                <Form.Select name="comuna" value={form.comuna} onChange={handleChange} isInvalid={!!errors.comuna} disabled={!form.region}>
                  <option value="">Selecciona una comuna</option>
                  {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.comuna}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>{field("direccion", "Dirección", { maxLength: 300 })}</Col>
          </Row>
          <Button type="submit" className="w-100">Registrarme</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
