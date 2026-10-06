
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "../pages/Home";
import { cleanup, render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { ROUTE_PARAMS } from "../utils/constants";

// Hacemos un mock del módulo completo
vi.mock("../services/products", () => ({
  /* Hacemos mock de la función getProducts del módulo para que retorne una promesa
  con unos productos fijos*/
  getProducts: vi.fn(() => Promise.resolve([
    { id: 1, name: "Juego A", price: 1000, description: "Desc A", image: "a.jpg" },
    { id: 2, name: "Juego B", price: 2000, description: "Desc B", image: "b.jpg" }
  ]))
}));

// Importamos la función real del módulo que queremos hacer mock
import { getProducts } from "../services/products";

// Hacemos mock de la función
const mockedGetProducts = vi.mocked(getProducts);

// Describimos el foco general de las pruebas (el componente ProductCard)
describe("ProductCard Component", () => {
  // Se ejecuta entre cada prueba
  beforeEach(() => {
    /* En archivos que usen mocks, se recomienda usar esta línea para limpiar
    los mocks entre cada aplicación y que no hayan conflictos.*/
    vi.clearAllMocks();
    /* En archivos que render, se recomienda usar esta línea para limpiar
    el DOM generado entre pruebas.*/
    cleanup();
  });
  it("should show loading while waiting for api", () => {
    // Sobreescriimos la función del módulo para que nunca responda
    mockedGetProducts.mockImplementationOnce(() => new Promise(() => {}));

    /* Cada vez que ocupamos componentes que usan hooks de ReactRoutes
    (useNavigate, useParams, useSearchParams), debemos envolver el componente
    en un Router de prueba (se recomienda usar MemoryRouter).*/
    const { getByText } = render(<MemoryRouter><Home /></MemoryRouter>);
    expect(getByText("Cargando...")).toBeTruthy();
  });
  it("should show products", async () => {
    const { getByText, findByText } = render(<MemoryRouter><Home /></MemoryRouter>);
    expect(await findByText("Juego A")).toBeTruthy();
    expect(getByText("Juego B")).toBeTruthy();
  });
  it("should filter products products", async () => {
    /* Cuando además queremos probar los params de url de un componente, tenemos que agregar
    Routes y Route */
    const { getByText, queryByText } = render(<MemoryRouter initialEntries={[`?${ROUTE_PARAMS.SEARCH}=B`]}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>);

    /* waitFor ayuda a esperar a que el componente se renderize completamente, incluso
    después del primer useEffect para llamar a servicio (mount) */
    await waitFor(() => {
      expect(getByText("Juego B")).toBeTruthy();
      expect(queryByText("Juego A")).toBeNull();
    });
  });
});