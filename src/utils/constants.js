
export const LOCAL_STORAGE_SESSION_KEY = 'user-session';

export const ROUTE_PATHS = {
  SIGN_IN: '/iniciar-sesion',
  REGISTER: '/registrarse',
  HOME: '/',
  PROFILE: '/mi-perfil',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/productos/:id',
  ORDERS: '/mis-pedidos',
  PRODUCT_DETAIL_WITH_ID: (id) => `${ROUTE_PATHS.PRODUCTS}/${id}`,
}

export const ROUTE_PARAMS = {
  SEARCH: 'search',
}