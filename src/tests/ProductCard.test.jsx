import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";

import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/formatters";

// Extendemos expect para que pueda usar la evaluación de accesibilidad de jest-axe
expect.extend(toHaveNoViolations);

const product = {
  name: "Juego divertido",
  price: 6500,
  description: "Juego muy divertido",
  image: "https://via.placeholder.com/150",
}

// Describimos el foco general de las pruebas (el componente ProductCard)
describe("ProductCard Component", () => {
  // Se ejecuta entre cada prueba
  beforeEach(() => {
    /* En archivos que render, se recomienda usar esta línea para limpiar
    el DOM generado entre pruebas.*/
    cleanup();
  });
  it("should show props in view", () => {
    const actionName = "Ver detalle";
    // Creamos un mock de una función que no hace nada
    const mockAction = vi.fn();
    // Renderizamos el componente
    const { getByText, getByAltText } = render(
      <ProductCard
        name={product.name}
        price={product.price}
        description={product.description}
        image={product.image}
        action={mockAction}
        actionName={actionName}
      />
    );

    // Comprobamos que los elementos estén en el DOM
    expect(getByText(product.name)).toBeTruthy();
    expect(getByText(formatPrice(product.price))).toBeTruthy();
    expect(getByText(product.description)).toBeTruthy();
    expect(getByAltText(`Imagen producto ${product.name}`)).toBeTruthy();
    expect(getByText(actionName)).toBeTruthy();
  });
  it("should show button and call action provided when clicked", async () => {
    // Seteamos un usuario que puede hacer interacciones de prueba
    const user = userEvent.setup();
    // Hacemos mock de una función que no hace nada
    const mockAction = vi.fn();
    // Renderizamos el componente
    const { getByRole } = render(
      <ProductCard
        name="Producto 1"
        price={1000}
        description="Descripción del producto 1"
        image="https://via.placeholder.com/150"
        action={mockAction}
        actionName="Comprar"
      />
    );
    // Obtenemos el botón generado y que queremos clickear en la prueba
    const button = getByRole("button", { name: "Comprar" });
    // Hacemos que el "usuario" haga click en el botón
    await user.click(button);
    // Revisamos que la acción mandada como prop se haya ejecutado
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
  it("should not have accessibility issues", async() => {
    // Hacemos render del componente
    const { container } = render(<ProductCard
      name="Producto 1"
      price={1000}
      description="Descripción del producto 1"
      image="https://via.placeholder.com/150"
    />);
    // Revisamos con jest-axe que el componente no tenga problemas de accesibilidad
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});