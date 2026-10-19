import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, it, expect, beforeEach } from "vitest";
import Cart from "../pages/Cart";
import { CartProvider } from "../context/CartContext";
import { LOCAL_STORAGE_CART_KEY, LOCAL_STORAGE_SESSION_KEY } from "../utils/constants";
import { getProductById } from "../services/products";
import { formatPrice } from "../utils/formatters";

const renderCart = () => render(
  <MemoryRouter><CartProvider><Cart /></CartProvider></MemoryRouter>
);

describe("Cart Page + CartContext", () => {
  beforeEach(() => {
    cleanup();
    // Carrito inicial con un producto, guardado como lo hace la app
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify([
      { id: 1, name: "Polera Básica", price: 12990, image: "a.jpg", quantity: 1 },
    ]));
  });

  it("muestra los productos del carrito y el total", () => {
    const { getByText } = renderCart();
    expect(getByText("Polera Básica")).toBeTruthy();
    expect(getByText(`Total: ${formatPrice(12990)}`)).toBeTruthy();
  });

  it("al hacer clic en + aumenta la cantidad y se recalcula el total", async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId, getByText } = renderCart();
    await user.click(getByRole("button", { name: "Sumar Polera Básica" }));
    expect(getByTestId("cantidad-1").textContent).toBe("2");
    expect(getByText(`Total: ${formatPrice(25980)}`)).toBeTruthy();
  });

  it("al eliminar el último producto muestra el mensaje de carrito vacío", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByText } = renderCart();
    expect(queryByText("Tu carrito está vacío.")).toBeNull();
    await user.click(getByRole("button", { name: "Eliminar" }));
    expect(queryByText("Tu carrito está vacío.")).not.toBeNull();
  });
});

describe("Compra desde el carrito", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify([
      { id: 1, name: "Polera Básica", price: 12990, image: "a.jpg", stock: 25, quantity: 2 },
    ]));
  });

  it("sin sesión iniciada no permite comprar y muestra un aviso", async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = renderCart();
    await user.click(getByRole("button", { name: "Comprar ahora" }));
    expect(getByText("Debes iniciar sesión para comprar.")).toBeTruthy();
  });

  it("con sesión iniciada la compra se confirma y se descuenta el stock", async () => {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({ username: "Comprador", role: "cliente" }));
    const user = userEvent.setup();
    const { getByRole, findByText } = renderCart();
    await user.click(getByRole("button", { name: "Comprar ahora" }));
    expect(await findByText(/Compra realizada/)).toBeTruthy();
    const producto = await getProductById(1);
    expect(producto.stock).toBe(23);
  });
});
