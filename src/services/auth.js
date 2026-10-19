import { LOCAL_STORAGE_USERS_KEY } from "../utils/constants";
import { getJsonFromLocalStorage } from "../utils/localStorage";

// Usuario administrador que siempre existe (para entrar a la vista Admin)
const ADMIN_USER = {
  run: '11111111',
  nombre: 'Admin',
  apellidos: 'DresShop',
  correo: 'admin@duoc.cl',
  password: 'admin123',
  role: 'admin',
};

// Cuenta de comprador de demostración (rol cliente) para probar compras y stock
const BUYER_USER = {
  run: '123456785',
  nombre: 'Comprador',
  apellidos: 'Demo',
  correo: 'comprador@gmail.com',
  password: 'compra123',
  role: 'cliente',
};

const DEMO_USERS = [ADMIN_USER, BUYER_USER];

export function getUsers() {
  return getJsonFromLocalStorage(LOCAL_STORAGE_USERS_KEY) ?? [];
}

// Registro: guarda un usuario nuevo en localStorage
export function registerUser(user) {
  return new Promise((resolve, reject) => {
    const users = getUsers();
    const correo = user.correo.trim().toLowerCase();
    if (DEMO_USERS.some((u) => u.correo === correo) || users.some((u) => u.correo === correo)) {
      reject(new Error('Ya existe una cuenta con ese correo'));
      return;
    }
    const newUser = { ...user, correo, role: 'cliente' };
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify([...users, newUser]));
    resolve(newUser);
  });
}

// Login: busca un usuario con ese correo y contraseña
export function signIn(correo, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const email = (correo || '').trim().toLowerCase();
      const user = [...DEMO_USERS, ...getUsers()].find(
        (u) => u.correo === email && u.password === password
      );
      if (user) {
        // Nunca guardamos la contraseña en la sesión
        const { password: _omit, ...session } = user;
        resolve({ ...session, username: user.nombre });
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 500);
  });
}
