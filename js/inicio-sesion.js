const formLogin = document.getElementById('form-login')
const inputCorreo = document.getElementById('correo')
const inputPassword = document.getElementById('password')

const errorCorreo = document.getElementById('error-correo')
const errorPassword = document.getElementById('error-password')

const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']

const usuariosDemo = {
    'admin@duoc.cl': 'administrador',
    'vendedor@duoc.cl': 'vendedor'
}

function validarCorreo() {
    const valor = inputCorreo.value.trim()

    if (valor === '') {
        errorCorreo.textContent = 'El correo es obligatorio.'
        return false
    }
    if (valor.length > 100) {
        errorCorreo.textContent = 'Máximo 100 caracteres.'
        return false
    }
    const dominioValido = dominiosPermitidos.some(dominio => valor.endsWith(dominio))
    if (!dominioValido) {
        errorCorreo.textContent = 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com'
        return false
    }
    errorCorreo.textContent = ''
    return true
}

function validarPassword() {
    const valor = inputPassword.value

    if (valor === '') {
        errorPassword.textContent = 'La contraseña es obligatoria.'
        return false
    }
    if (valor.length < 4 || valor.length > 10) {
        errorPassword.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.'
        return false
    }
    errorPassword.textContent = ''
    return true
}

inputCorreo.addEventListener('blur', validarCorreo)
inputPassword.addEventListener('blur', validarPassword)

formLogin.addEventListener('submit', function (e) {
    e.preventDefault()

    const correoOk = validarCorreo()
    const passwordOk = validarPassword()

    if (!correoOk || !passwordOk) {
        return
    }

    const correo = inputCorreo.value.trim()
    const rol = usuariosDemo[correo] || 'cliente'

    localStorage.setItem('usuario_correo', correo)
    localStorage.setItem('usuario_rol', rol)

    alert('Bienvenido. Iniciaste sesión como: ' + rol)
    window.location = '../index.html'
})