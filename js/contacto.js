const form = document.getElementById('form-contacto')
const inputNombre = document.getElementById('nombre')
const inputCorreo = document.getElementById('correo')
const inputMensaje = document.getElementById('mensaje')

const errorNombre = document.getElementById('error-nombre')
const errorCorreo = document.getElementById('error-correo')
const errorMensaje = document.getElementById('error-mensaje')

const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']

function validarNombre() {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/

    if (inputNombre.value.trim() === '') {
        errorNombre.textContent = 'El nombre es obligatorio.'
        return false
    }
    if (inputNombre.value.length > 100) {
        errorNombre.textContent = 'Máximo 100 caracteres.'
        return false
    }
    if (!soloLetras.test(inputNombre.value)) {
        errorNombre.textContent = 'El nombre solo puede contener letras.'
        return false
    }
    errorNombre.textContent = ''
    return true
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

function validarMensaje() {
    if (inputMensaje.value.trim() === '') {
        errorMensaje.textContent = 'El mensaje es obligatorio.'
        return false
    }
    if (inputMensaje.value.length > 500) {
        errorMensaje.textContent = 'Máximo 500 caracteres.'
        return false
    }
    errorMensaje.textContent = ''
    return true
}

inputNombre.addEventListener('blur', validarNombre)
inputCorreo.addEventListener('blur', validarCorreo)
inputMensaje.addEventListener('blur', validarMensaje)

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const nombreOk = validarNombre()
    const correoOk = validarCorreo()
    const mensajeOk = validarMensaje()

    if (nombreOk && correoOk && mensajeOk) {
        alert('¡Gracias ' + inputNombre.value + '! Tu mensaje fue enviado correctamente.')
        form.reset()
    }
})