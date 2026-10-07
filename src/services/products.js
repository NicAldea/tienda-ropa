const products = [
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

export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
}

export function getProductById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setTimeout(() => resolve(product), 500);
    } else {
      reject(new Error('Producto no encontrado'));
    }
  });
}