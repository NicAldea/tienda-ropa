import { MemoryRouter } from "react-router";
import { describe, it, expect, beforeEach } from "vitest";
import SignIn from "../pages/SignIn";
import { cleanup, fireEvent, render } from "@testing-library/react";

// Describimos el foco general de las pruebas (el componente SignIn)
describe("SignIn Component", () => {
  // Se ejecuta entre cada prueba
  beforeEach(() => {
    /* En archivos que render, se recomienda usar esta línea para limpiar
    el DOM generado entre pruebas.*/
    cleanup();
  });
  it("renders form and button correctly", () => {
    /* Cada vez que ocupamos componentes que usan hooks de ReactRoutes
    (useNavigate, useParams, useSearchParams), debemos envolver el componente
    en un Router de prueba (se recomienda usar MemoryRouter).*/
    const {
      getByPlaceholderText,
      getByText,
      queryByRole
    } = render(<MemoryRouter><SignIn /></MemoryRouter>);
    
    expect(getByPlaceholderText(/Ingresa tu username/i)).toBeTruthy();
    expect(getByPlaceholderText(/Ingresa tu contraseña/i)).toBeTruthy();
    /* A la mayoría de selectores de render podemos pasarla una configuración adicional.
    En este caso, estamos indicando que el elemento debe ser un button además de tener
    "Iniciar Sesión" como contenido. */
    expect(getByText(/Iniciar Sesión/i, { selector: "button" })).toBeTruthy();
    expect(queryByRole("alert")).toBeNull();
  });
  it("updates input values con change", () => {
    const { getByPlaceholderText } = render(<MemoryRouter><SignIn /></MemoryRouter>);
    // Obtenemos los inputs generados
    const usernameInput = getByPlaceholderText(/Ingresa tu username/i);
    const passwordInput = getByPlaceholderText(/Ingresa tu contraseña/i);

    // Comprobaos que estos elementos HTML obtenidos sean inputs
    if (usernameInput instanceof HTMLInputElement && passwordInput instanceof HTMLInputElement) {
      /* Con fireEvent literal podemos activar eventos de algún elemento HTML. En este
      caso, estamos activando el evento onChange de los inputs */
      fireEvent.change(usernameInput, { target: { value: "usuarioPrueba" } });
      fireEvent.change(passwordInput, { target: { value: "prueba1234" } });

      expect(usernameInput.value).toBe("usuarioPrueba");
      expect(passwordInput.value).toBe("prueba1234");
    }
  });
  it("shows error if username or password is empty", async () => {
    const { getByText, findByRole } = render(<MemoryRouter><SignIn /></MemoryRouter>);
    const button = getByText(/Iniciar Sesión/i, { selector: "button" });

    // Ahora con fireEvent estamos haciendo click en el botón de iniciar sesión
    fireEvent.click(button);

    // Como estaban los inputs vacíos, esperamos a que se muestre la alerta.
    const errorAlert = await findByRole("alert");
    expect(errorAlert.textContent).toBe("Por favor ingresa tu username y contraseña")
  });
})