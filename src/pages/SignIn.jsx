import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import LoadingButton from "../components/LoadingButton";
import { signIn as apiSignIn } from "../services/auth";
import { useSession } from "../hooks/useSession";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { ROUTE_PATHS } from "../utils/constants";

function SignIn() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isLogged, signIn } = useSession();

  useEffect(() => {
    if (isLogged) {
      navigate(ROUTE_PATHS.HOME);
    }
  }, [isLogged, navigate]);

  const handleSubmit = async () => {

    if (!username || !password) {
      setError("Por favor ingresa tu correo y contraseña");
      return;
    }

    setError("");
    return apiSignIn(username, password)
      .then((user) => {
        signIn(user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {searchParams.get("registrado") && !error && <Alert variant="success">Cuenta creada. Ya puedes iniciar sesión.</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <LoadingButton
              onClickPromise={handleSubmit}
              buttonText="Iniciar Sesión"
              buttonLoadingText="Iniciando sesión..."
              className="w-100"
            />
          </Form>
          <p className="text-center mt-4">¿No tienes cuenta? <NavLink to={ROUTE_PATHS.REGISTER}>Crear cuenta</NavLink></p>
          <h5 className="text-center"><NavLink to={ROUTE_PATHS.HOME}>Volver a la página principal</NavLink></h5>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
