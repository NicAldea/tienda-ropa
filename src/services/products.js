import { LOCAL_STORAGE_PRODUCTS_KEY } from "../utils/constants";
import { getJsonFromLocalStorage } from "../utils/localStorage";

// Datos iniciales: se usan la primera vez, cuando localStorage está vacío
const INITIAL_PRODUCTS = [
  {
    id: 1,
    code: 'POL-001',
    name: 'Polera Básica',
    price: 12990,
    stock: 25,
    criticalStock: 5,
    category: 'Ropa Hombre',
    image: '/img/polerasimple.jpg',
    description: 'Polera de algodón peinado, corte regular. Una prenda que funciona sola, bajo una chaqueta o bajo un chaleco.',
  },
  {
    id: 2,
    code: 'JEA-001',
    name: 'Jeans Corte Recto',
    price: 29990,
    stock: 18,
    criticalStock: 4,
    category: 'Ropa Mujer',
    image: '/img/jeans.jpg',
    description: 'Mezclilla de peso medio en azul oscuro, corte recto. Más versátil que el skinny y más formal que el cargo.',
  },
  {
    id: 3,
    code: 'CHA-001',
    name: 'Chaqueta de Mezclilla',
    price: 39990,
    stock: 12,
    criticalStock: 3,
    category: 'Ropa Hombre',
    image: '/img/chaquetamezclilla.jpg',
    description: 'Chaqueta clásica de mezclilla con botones metálicos. Abriga lo justo para media estación y combina con casi cualquier color.',
  },
  {
    id: 4,
    code: 'ZAP-001',
    name: 'Zapatillas Urbanas',
    price: 34990,
    stock: 9,
    criticalStock: 3,
    category: 'Calzado',
    image: '/img/zapatillas.jpg',
    description: 'Zapatillas de lona con suela de goma y detalles en contraste. Pensadas para el día a día en la ciudad.',
  },
  {
    id: 5,
    code: 'BOL-001',
    name: 'Bolso de Cuero',
    price: 24990,
    stock: 7,
    criticalStock: 2,
    category: 'Accesorios',
    image: '/img/bolsocuero.jpg',
    description: 'Bolso de cuero sintético con correa ajustable y cierre magnético. Capacidad para notebook de 13 pulgadas.',
  },
  {
    id: 6,
    code: 'GOR-001',
    name: 'Gorro de Lana',
    price: 8990,
    stock: 30,
    criticalStock: 6,
    category: 'Accesorios',
    image: '/img/gorrolana.jpg',
    description: 'Gorro tejido en lana mezclada, talla única. El accesorio que diferencia un atuendo básico de uno con personalidad.',
  },
];

// ---- Persistencia ----
// Lee los productos guardados; si no hay, usa los iniciales
function loadProducts() {
  return getJsonFromLocalStorage(LOCAL_STORAGE_PRODUCTS_KEY) ?? [...INITIAL_PRODUCTS];
}

function saveProducts(products) {
  localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
}

// ---- CRUD ----
// READ: todos los productos
export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(loadProducts()), 300);
  });
}

// READ: un producto por id
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    const product = loadProducts().find((p) => p.id === parseInt(id));
    if (product) {
      setTimeout(() => resolve(product), 300);
    } else {
      reject(new Error('Producto no encontrado'));
    }
  });
}

// CREATE: agrega un producto con un id nuevo (el mayor + 1)
export function createProduct(data) {
  const products = loadProducts();
  const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const product = { ...data, id: newId };
  saveProducts([...products, product]);
  return Promise.resolve(product);
}

// UPDATE: reemplaza los campos del producto con ese id
export function updateProduct(id, data) {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return Promise.reject(new Error('Producto no encontrado'));
  const updated = { ...products[index], ...data, id };
  products[index] = updated;
  saveProducts(products);
  return Promise.resolve(updated);
}

// DELETE: quita el producto con ese id
export function deleteProduct(id) {
  const products = loadProducts();
  if (!products.some((p) => p.id === id)) return Promise.reject(new Error('Producto no encontrado'));
  saveProducts(products.filter((p) => p.id !== id));
  return Promise.resolve(true);
}

// COMPRA: descuenta del stock la cantidad comprada de cada producto.
// Primero revisa TODO el carrito; si falta stock de algo, no descuenta nada.
export function purchaseItems(items) {
  const products = loadProducts();
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) return Promise.reject(new Error(`${item.name} ya no está disponible`));
    if (product.stock < item.quantity) {
      return Promise.reject(new Error(`Stock insuficiente de ${product.name}: quedan ${product.stock}`));
    }
  }
  const updated = products.map((p) => {
    const item = items.find((i) => i.id === p.id);
    return item ? { ...p, stock: p.stock - item.quantity } : p;
  });
  saveProducts(updated);
  return Promise.resolve(updated);
}

// Útil para pruebas y para "restablecer" el catálogo
export function resetProducts() {
  localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_KEY);
}
