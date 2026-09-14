document.addEventListener('DOMContentLoaded', () => {

    const botonesAgregar = document.querySelectorAll('.btn-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (evento) => {

            const tarjeta = evento.target.closest('.producto');
            const nombre = tarjeta.querySelector('h2').textContent;
            const precio = tarjeta.querySelector('.precio').textContent;

            alert('Agregaste al carrito:\n\n' + nombre + ' - ' + precio);
        });
    });

});