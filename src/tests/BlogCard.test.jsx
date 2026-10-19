import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BlogCard from "../components/BlogCard";

// Pruebas de propiedades (props)
describe("BlogCard Component", () => {
  beforeEach(() => cleanup());

  it("muestra el título, fecha, resumen y etiqueta del botón recibidos por props", () => {
    const { getByText, getByRole } = render(
      <BlogCard title="Mi blog" date="01/01/2026" summary="Resumen" image="a.jpg" onReadMore={() => {}} buttonLabel="Leer artículo" />
    );
    expect(getByText("Mi blog")).toBeTruthy();
    expect(getByText("01/01/2026")).toBeTruthy();
    expect(getByText("Resumen")).toBeTruthy();
    expect(getByRole("button", { name: "Leer artículo" })).toBeTruthy();
  });

  it("ejecuta la función onReadMore recibida al hacer clic", async () => {
    const user = userEvent.setup();
    const onReadMore = vi.fn();
    const { getByRole } = render(
      <BlogCard title="Mi blog" date="01/01/2026" summary="Resumen" image="a.jpg" onReadMore={onReadMore} />
    );
    await user.click(getByRole("button", { name: "Leer más" }));
    expect(onReadMore).toHaveBeenCalledTimes(1);
  });
});
