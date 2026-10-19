import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, beforeEach } from "vitest";
import Blogs from "../pages/Blogs";

// Prueba de renderizado correcto de una lista
describe("Blogs Page", () => {
  beforeEach(() => cleanup());

  it("renderiza una tarjeta por cada blog del conjunto de datos", () => {
    const blogs = [
      { id: 1, title: "Blog uno", date: "1", summary: "s1", image: "a.jpg" },
      { id: 2, title: "Blog dos", date: "2", summary: "s2", image: "b.jpg" },
      { id: 3, title: "Blog tres", date: "3", summary: "s3", image: "c.jpg" },
    ];
    const { getAllByRole, getByText } = render(<MemoryRouter><Blogs blogs={blogs} /></MemoryRouter>);
    expect(getAllByRole("button", { name: "Leer más" })).toHaveLength(3);
    expect(getByText("Blog uno")).toBeTruthy();
    expect(getByText("Blog tres")).toBeTruthy();
  });
});
