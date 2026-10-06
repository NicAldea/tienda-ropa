import { Container, Navbar, Nav, NavDropdown, Row, Col, Button, Form } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useSession } from "../hooks/useSession";
import { ROUTE_PARAMS, ROUTE_PATHS } from "../utils/constants";
import { useState } from "react";

function Layout() {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { isLogged, userSession, signOut } = useSession();

  const searchQuery = () => {
    navigate(`${ROUTE_PATHS.HOME}?${ROUTE_PARAMS.SEARCH}=${query}`);
  };

  return (
    <>
      <header>
        <Navbar expand="lg" bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href={ROUTE_PATHS.HOME}>
              Estim
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
              <Nav className="me-auto justify-content-end">
                  <Row className="mr-8">
                    <Col xs="auto">
                      <Form.Control
                        type="text"
                        placeholder="Buscar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button variant="secondary" onClick={searchQuery}>Buscar</Button>
                    </Col>
                  </Row>
                {isLogged ? (
                  <NavDropdown title={userSession.username} id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <NavLink className="nav-dropdown-item" to={ROUTE_PATHS.PROFILE}>
                        Mi perfil
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/mi-biblioteca">
                      <NavLink className="nav-dropdown-item" to={ROUTE_PATHS.LIBRARY}>
                        Mi biblioteca
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={signOut}>Cerrar sesión</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavLink className="nav-link" to={ROUTE_PATHS.SIGN_IN}>Iniciar sesión</NavLink>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Container className="my-4 flex-fill">
        <Outlet />
      </Container>
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        © 2025 Estim
      </footer>
    </>
  )
}

export default Layout;