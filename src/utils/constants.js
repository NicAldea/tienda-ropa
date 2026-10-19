
export const LOCAL_STORAGE_SESSION_KEY = 'user-session';
export const LOCAL_STORAGE_CART_KEY = 'dresshop-cart';
export const LOCAL_STORAGE_USERS_KEY = 'dresshop-users';
export const LOCAL_STORAGE_PRODUCTS_KEY = 'dresshop-products';

export const ROUTE_PATHS = {
  SIGN_IN: '/iniciar-sesion',
  REGISTER: '/registrarse',
  HOME: '/',
  PROFILE: '/mi-perfil',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/productos/:id',
  ORDERS: '/mis-pedidos',
  ABOUT: '/nosotros',
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blogs/:id',
  CONTACT: '/contacto',
  CART: '/carrito',
  ADMIN: '/admin',
  PRODUCT_DETAIL_WITH_ID: (id) => `${ROUTE_PATHS.PRODUCTS}/${id}`,
  BLOG_DETAIL_WITH_ID: (id) => `${ROUTE_PATHS.BLOGS}/${id}`,
}

export const ROUTE_PARAMS = {
  SEARCH: 'search',
  CATEGORY: 'categoria',
}

export const CATEGORIES = ['Ropa Hombre', 'Ropa Mujer', 'Calzado', 'Accesorios'];
