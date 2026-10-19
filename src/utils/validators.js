// Funciones puras de validación: reciben un valor y devuelven
// un mensaje de error (string) o "" si el valor es válido.

const DOMINIOS_PERMITIDOS = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

// RUN chileno sin puntos ni guión, ej: 19011022K
export function validarRun(run) {
  const limpio = (run || '').trim().toUpperCase();
  if (!limpio) return 'El RUN es obligatorio';
  if (limpio.length < 7 || limpio.length > 9) return 'El RUN debe tener entre 7 y 9 caracteres';
  if (!/^[0-9]+[0-9K]$/.test(limpio)) return 'El RUN solo admite números y K al final, sin puntos ni guión';

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  // Algoritmo módulo 11: se multiplica cada dígito (de derecha a izquierda)
  // por la serie 2,3,4,5,6,7,2,3... y se suma.
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);

  return dv === dvEsperado ? '' : 'El RUN no es válido';
}

export function validarTexto(valor, campo, max, obligatorio = true) {
  const texto = (valor || '').trim();
  if (obligatorio && !texto) return `${campo} es obligatorio`;
  if (texto.length > max) return `${campo} admite máximo ${max} caracteres`;
  return '';
}

export function validarCorreo(correo) {
  const texto = (correo || '').trim().toLowerCase();
  if (!texto) return 'El correo es obligatorio';
  if (texto.length > 100) return 'El correo admite máximo 100 caracteres';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) return 'El formato del correo no es válido';
  if (!DOMINIOS_PERMITIDOS.some((d) => texto.endsWith(d))) {
    return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
  }
  return '';
}

export function validarPassword(password) {
  const texto = password || '';
  if (!texto) return 'La contraseña es obligatoria';
  if (texto.length < 4 || texto.length > 10) return 'La contraseña debe tener entre 4 y 10 caracteres';
  return '';
}

export function validarSelect(valor, campo) {
  return valor ? '' : `Debes seleccionar ${campo}`;
}

// Valida todo el formulario y devuelve un objeto { campo: mensaje }
export function validarRegistro(form) {
  return {
    run: validarRun(form.run),
    nombre: validarTexto(form.nombre, "El nombre", 50),
    apellidos: validarTexto(form.apellidos, "Los apellidos", 100),
    correo: validarCorreo(form.correo),
    password: validarPassword(form.password),
    password2: form.password2 === form.password ? "" : "Las contraseñas no coinciden",
    region: validarSelect(form.region, "una región"),
    comuna: validarSelect(form.comuna, "una comuna"),
    direccion: validarTexto(form.direccion, "La dirección", 300),
  };
}
