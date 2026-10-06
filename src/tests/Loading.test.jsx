import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "../components/Loading";

// Describimos el foco general de las pruebas (el componente Loading)
describe("Loading Component", () => {
  it("should render text", () => {
    // Renderizamos el componente
    const { getByText } = render(<Loading />);
    // Comprobamos que dentro del componente haya un elemento con el texto "Cargando..."
    expect(getByText("Cargando...")).toBeTruthy();
  });
});

