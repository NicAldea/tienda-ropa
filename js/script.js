document.addEventListener('DOMContentLoaded', () => {
    console.log("Sitio cargado. Listo para la defensa técnica.");

    // Evento para el botón principal
    const btnExplorar = document.getElementById('btn-explorar');
    
    if(btnExplorar) {
        btnExplorar.addEventListener('click', (evento) => {
            evento.preventDefault(); 
            alert('¡Próximamente: Catálogo completo de prendas y fragancias para nuestro emprendimiento!');
        });
    }

    // Manipulación de múltiples elementos (Categorías)
    const categorias = document.querySelectorAll('.item-categoria');
    
    categorias.forEach(categoria => {
        categoria.addEventListener('click', (evento) => {
            evento.target.style.backgroundColor = '#d4a373';
            evento.target.style.color = 'white';
            evento.target.style.cursor = 'pointer';
        });
    });
});