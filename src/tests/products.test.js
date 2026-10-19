import { describe, it, expect, beforeEach } from "vitest";
import {
  createProduct, deleteProduct, getProductById, getProducts, resetProducts, updateProduct,
} from "../services/products";

// Pruebas del CRUD sobre el archivo de datos (persistido en localStorage)
describe("CRUD de productos", () => {
  beforeEach(() => {
    resetProducts();
  });

  it("lee los 6 productos iniciales", async () => {
    const products = await getProducts();
    expect(products).toHaveLength(6);
  });

  it("crea un producto nuevo con id autoincremental", async () => {
    const nuevo = await createProduct({ code: "CAM-001", name: "Camisa Oxford", price: 19990, stock: 10, criticalStock: 2, category: "Ropa Hombre" });
    expect(nuevo.id).toBe(7);
    const products = await getProducts();
    expect(products).toHaveLength(7);
  });

  it("actualiza el precio de un producto existente", async () => {
    await updateProduct(1, { price: 9990 });
    const producto = await getProductById(1);
    expect(producto.price).toBe(9990);
    expect(producto.name).toBe("Polera Básica");
  });

  it("elimina un producto y deja de encontrarse", async () => {
    await deleteProduct(2);
    await expect(getProductById(2)).rejects.toThrow("Producto no encontrado");
  });
});
