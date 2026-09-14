document.addEventListener('DOMContentLoaded', () => {

    const categorias = document.querySelectorAll('.item-categoria');

    categorias.forEach(categoria => {
        categoria.addEventListener('click', (evento) => {
            evento.target.style.backgroundColor = '#d4a373';
            evento.target.style.color = 'white';
            evento.target.style.cursor = 'pointer';
        });
    });
});