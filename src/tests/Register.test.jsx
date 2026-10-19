import { cleanup, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, it, expect, beforeEach } from "vitest";
import Register from "../pages/Register";

const renderRegister = () => render(<MemoryRouter><Register /></MemoryRouter>);

describe("Register Page", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("actualiza el estado del input RUN cuando el usuario escribe", async () => {
    const user = userEvent.setup();
    const { getByLabelText } = renderRegister();
    const run = getByLabelText(/RUN/i);
    await user.type(run, "123456785");
    expect(run.value).toBe("123456785");
  });

  it("muestra el error de RUN solo después de enviar un RUN inválido", async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByRole, queryByText } = renderRegister();
    // Antes de enviar: no hay mensaje de error
    expect(queryByText("El RUN no es válido")).toBeNull();
    await user.type(getByLabelText(/RUN/i), "123456789");
    await user.click(getByRole("button", { name: "Registrarme" }));
    // Después de enviar con un RUN incorrecto: aparece el error
    expect(queryByText("El RUN no es válido")).not.toBeNull();
  });

  it("habilita y llena las comunas al elegir una región (selects encadenados)", () => {
    const { getByLabelText, getByRole } = renderRegister();
    const comuna = getByLabelText("Comuna");
    expect(comuna.disabled).toBe(true);
    fireEvent.change(getByLabelText("Región"), { target: { value: "Región Metropolitana de Santiago" } });
    expect(comuna.disabled).toBe(false);
    expect(getByRole("option", { name: "Quilicura" })).toBeTruthy();
  });
});
