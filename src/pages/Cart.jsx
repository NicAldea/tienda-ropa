import { useState } from "react";
import { Alert, Button, Image, Table } from "react-bootstrap";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import { ROUTE_PATHS } from "../utils/constants";
import { formatPrice } from "../utils/formatters";

function Cart() {
  const { items, total, changeQuantity, removeFromCart, clearCart } = useCart();
  const [order, setOrder] = useState(null);

  const handleBuy = () => {
    // Compra simulada: se genera un número de orden y se vacía el carrito
    setOrder({ number: Date.now().toString().slice(-6), total });
    clearCart();
  };

  if (order) {
    return (
      <Alert variant="success">
        <Alert.Heading>¡Compra realizada! Orden #{order.number}</Alert.Heading>
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
      <Table responsive hover className="align-middle">
        <thead>
          <tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr>
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
