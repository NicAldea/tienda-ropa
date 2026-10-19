import { Container, Navbar, Nav, NavDropdown, Button, Form } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useSession } from "../hooks/useSession";
import { ROUTE_PARAMS, ROUTE_PATHS } from "../utils/constants";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function Layout() {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { isLogged, userSession, signOut } = useSession();
  const { count, clearCart } = useCart();

  // Al cerrar sesión se vacía el carrito, para que el próximo usuario no vea lo que dejó el anterior
  const handleSignOut = () => {
    clearCart();
    signOut();
  };

  const searchQuery = (e) => {
    e.preventDefault();
    navigate(`${ROUTE_PATHS.PRODUCTS}?${ROUTE_PARAMS.SEARCH}=${query}`);
  };

  return (
    <>
      <header>
        <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
          <Container>
            <Navbar.Brand as={NavLink} to={ROUTE_PATHS.HOME}>DresShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu-principal" />
            <Navbar.Collapse id="menu-principal">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to={ROUTE_PATHS.HOME} end>Home</Nav.Link>
                <Nav.Link as={NavLink} to={ROUTE_PATHS.PRODUCTS}>Productos</Nav.Link>
                <Nav.Link as={NavLink} to={ROUTE_PATHS.ABOUT}>Nosotros</Nav.Link>
                <Nav.Link as={NavLink} to={ROUTE_PATHS.BLOGS}>Blogs</Nav.Link>
                <Nav.Link as={NavLink} to={ROUTE_PATHS.CONTACT}>Contacto</Nav.Link>
                {userSession?.role === "admin" && (
                  <Nav.Link as={NavLink} to={ROUTE_PATHS.ADMIN}>Admin</Nav.Link>
                )}
              </Nav>
              <Form className="d-flex my-2 my-lg-0 me-lg-3" role="search" onSubmit={searchQuery}>
                <Form.Control
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Buscar productos"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="me-2"
                />
                <Button variant="secondary" type="submit">Buscar</Button>
              </Form>
              <Nav className="align-items-lg-center gap-2">
                <Button as={NavLink} to={ROUTE_PATHS.CART} variant="success">
                  🛒 Carrito ({count} {count === 1 ? "prenda" : "prendas"})
                </Button>
                {isLogged ? (
                  <NavDropdown title={userSession.username} id="menu-usuario" align="end">
                    <NavDropdown.Item as={NavLink} to={ROUTE_PATHS.PROFILE}>Mi perfil</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={ROUTE_PATHS.ORDERS}>Mis pedidos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleSignOut}>Cerrar sesión</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Button as={NavLink} to={ROUTE_PATHS.SIGN_IN} variant="outline-light">Iniciar sesión</Button>
                    <Button as={NavLink} to={ROUTE_PATHS.REGISTER} variant="secondary">Crear cuenta</Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Container className="my-4 flex-fill">
        <Outlet />
      </Container>
      <footer className="bg-primary text-white py-4 mt-auto">
        <Container className="text-center">
          <h2 className="h6 text-secondary">Quiénes somos</h2>
          <p className="small mb-2">
            DresShop es una tienda online de ropa y accesorios creada por Nicolás Aldea y Fabian Caro,
            estudiantes de Duoc UC. Un catálogo corto, prendas que combinan entre sí y precios justos.
          </p>
          <NavLink to={ROUTE_PATHS.ABOUT} className="small text-secondary">Conoce más sobre nosotros</NavLink>
          <hr className="border-secondary" />
          <small>© 2026 DresShop - Ropa y Accesorios</small>
        </Container>
      </footer>
    </>
  )
}

export default Layout;
