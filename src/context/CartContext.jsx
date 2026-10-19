import { createContext, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_CART_KEY } from "../utils/constants";
import { getJsonFromLocalStorage } from "../utils/localStorage";

// El Context permite que cualquier componente (navbar, catálogo, carrito)
// lea y modifique el MISMO carrito sin pasar props de componente en componente.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // El estado inicial se lee desde localStorage para no perder el carrito al recargar
  const [items, setItems] = useState(() => getJsonFromLocalStorage(LOCAL_STORAGE_CART_KEY) ?? []);

  // Cada vez que cambia el carrito, se guarda en localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        // No se puede agregar más unidades que el stock disponible
        if (existing.quantity >= product.stock) return prev;
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      if (product.stock < 1) return prev;
      const { id, name, price, image, stock } = product;
      return [...prev, { id, name, price, image, stock, quantity: 1 }];
    });
  };

  const changeQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => {
      if (i.id !== id) return i;
      // Si el producto trae stock, la cantidad no puede superarlo
      const max = i.stock ?? Infinity;
      return { ...i, quantity: Math.min(quantity, max) };
    }));
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setItems([]);

  // Valores derivados: se calculan a partir de items, no se guardan aparte
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, count, addToCart, changeQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar el carrito desde cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
}
