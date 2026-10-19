import { useState } from "react";
import { Alert, Button, Image, Table } from "react-bootstrap";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import { useSession } from "../hooks/useSession";
import { purchaseItems } from "../services/products";
import { ROUTE_PATHS } from "../utils/constants";
import { formatPrice } from "../utils/formatters";

function Cart() {
  const { items, total, count, changeQuantity, removeFromCart, clearCart } = useCart();
  const { isLogged } = useSession();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleBuy = () => {
    // Solo un usuario con sesión iniciada puede comprar
    if (!isLogged) {
      setError("Debes iniciar sesión para comprar.");
      return;
    }
    // La compra descuenta el stock de cada prenda en el archivo de datos
    purchaseItems(items)
      .then(() => {
        setOrder({ number: Date.now().toString().slice(-6), total, items });
        clearCart();
      })
      .catch((err) => setError(err.message));
  };

  if (order) {
    return (
      <Alert variant="success">
        <Alert.Heading>¡Compra realizada! Orden #{order.number}</Alert.Heading>
        <ul className="mb-2">
          {order.items.map((i) => <li key={i.id}>{i.quantity} × {i.name}</li>)}
        </ul>
        Total pagado: {formatPrice(order.total)}
      </Alert>
    );
  }

  // Renderizado condicional: si no hay productos se muestra otro contenido
  if (items.length === 0) {
    return (
      <>
        <h1>Carrito de compras</h1>
        <p>Tu carrito está vacío.</p>
        <NavLink to={ROUTE_PATHS.PRODUCTS}>Ver productos</NavLink>
      </>
    );
  }

  return (
    <>
      <h1>Carrito de compras</h1>
      <p className="text-muted">{count} {count === 1 ? "prenda" : "prendas"} en tu carrito</p>
      {error && (
        <Alert variant="warning">
          {error} {!isLogged && <NavLink to={ROUTE_PATHS.SIGN_IN}>Iniciar sesión</NavLink>}
        </Alert>
      )}
      <Table responsive hover className="align-middle">
        <thead>
          <tr><th>Imagen</th><th>Prenda</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td><Image src={i.image} alt={i.name} width={60} height={60} className="object-fit-cover" rounded /></td>
              <td>{i.name}</td>
              <td>{formatPrice(i.price)}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button size="sm" variant="outline-primary" aria-label={`Restar ${i.name}`} onClick={() => changeQuantity(i.id, i.quantity - 1)}>−</Button>
                  <span data-testid={`cantidad-${i.id}`}>{i.quantity}</span>
                  <Button size="sm" variant="outline-primary" aria-label={`Sumar ${i.name}`} onClick={() => changeQuantity(i.id, i.quantity + 1)}>+</Button>
                </div>
              </td>
              <td>{formatPrice(i.price * i.quantity)}</td>
              <td><Button size="sm" variant="danger" onClick={() => removeFromCart(i.id)}>Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={4} className="text-end">Total</th>
            <th colSpan={2}>{formatPrice(total)}</th>
          </tr>
        </tfoot>
      </Table>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
        <strong className="fs-5">Total: {formatPrice(total)}</strong>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={clearCart}>Limpiar</Button>
          <Button variant="success" onClick={handleBuy}>Comprar ahora</Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
