// 1. Seleccionamos los elementos
const btnGenerar = document.getElementById('btn-generar');
const selectCantidad = document.getElementById('cantidad-colores');
const paletaMadera = document.getElementById('paleta-madera');

// 2. Función para generar color HSL (Requisito de rúbrica)
function generarColorHSL() {
    const hue = Math.floor(Math.random() * 361);
    // Saturación 70% y Brillo 50% para que parezca pintura real
    return `hsl(${hue}, 70%, 50%)`;
}

// 3. Función principal de renderizado
function renderizarPaleta() {
    // Limpiamos la paleta antes de generar nuevos colores
    paletaMadera.innerHTML = '';

    const cantidad = Number(selectCantidad.value);

    for (let i = 0; i < cantidad; i++) {
        const nuevoColor = generarColorHSL();

        // Creamos la "mancha" de pintura
        const mancha = document.createElement('div');
        mancha.style.zIndex = '1'; 
        
        // Estilos para que parezca una mancha de verdad
        mancha.style.width = '70px';
        mancha.style.height = '70px';
        mancha.style.backgroundColor = nuevoColor;
        mancha.style.boxShadow = 'inset 2px 2px 5px rgba(0,0,0,0.3), 2px 2px 5px rgba(0,0,0,0.2)';
        mancha.style.cursor = 'pointer';
        
        // El truco de la forma irregular (como pintura fresca)
        mancha.style.borderRadius = '40% 60% 70% 30% / 40% 40% 60% 50%';
        
        // Animación simple para que no aparezcan de golpe
        mancha.style.transition = 'transform 0.2s';
        mancha.addEventListener('mouseover', () => mancha.style.transform = 'scale(1.1)');
        mancha.addEventListener('mouseout', () => mancha.style.transform = 'scale(1)');

        // Agregamos a la paleta
        paletaMadera.appendChild(mancha);
    }
}

// 4. Evento del botón
btnGenerar.addEventListener('click', renderizarPaleta);