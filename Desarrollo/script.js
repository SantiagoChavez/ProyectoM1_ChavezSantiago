const btnGenerar = document.getElementById('btn-generar');
const btnLimpiar = document.getElementById('btn-limpiar');
const selectCantidad = document.getElementById('cantidad-colores');
const paletaMadera = document.getElementById('paleta-madera');

function generarColorHSL() {
    const hue = Math.floor(Math.random() * 361);
    return `hsl(${hue}, 70%, 50%)`;
}

function rgbToHex(rgb) {
    if (!rgb) return "#000000";
    const vals = rgb.match(/\d+/g);
    const r = parseInt(vals[0]);
    const g = parseInt(vals[1]);
    const b = parseInt(vals[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function renderizarPaleta() {
    paletaMadera.innerHTML = '';
    const cantidad = Number(selectCantidad.value);

    for (let i = 0; i < cantidad; i++) {
        const nuevoColor = generarColorHSL();
        const mancha = document.createElement('div');

        mancha.style.width = '70px';
        mancha.style.height = '70px';

        // --- BRILLO SUAVE (Cambiamos white por un brillo translúcido) ---
        mancha.style.background = nuevoColor;
        mancha.style.boxShadow = 'inset 4px 4px 10px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.1)';

        mancha.style.cursor = 'pointer';
        mancha.style.borderRadius = '40% 60% 70% 30% / 40% 40% 60% 50%';
        mancha.style.transition = 'all 0.2s';
        mancha.style.boxShadow = 'inset 2px 2px 5px rgba(0,0,0,0.3)';
        mancha.style.zIndex = '10';

        // --- CORRECCIÓN DEL HEXA (Tooltip) ---
        // Guardamos el color en un atributo propio para no perderlo con el degradado
        mancha.dataset.colorOriginal = nuevoColor;

        // El navegador necesita un respiro para procesar el HSL a RGB
        setTimeout(() => {
            // Obtenemos el color real que el navegador le puso al fondo
            const hex = rgbToHex(window.getComputedStyle(mancha).backgroundColor);
            mancha.title = `Copiar color: ${hex}`;
        }, 10);

        mancha.addEventListener('click', () => {
            const hex = rgbToHex(window.getComputedStyle(mancha).backgroundColor);
            navigator.clipboard.writeText(hex).then(() => {
                mostrarToast(`¡Color ${hex} copiado!`);
                mancha.style.transform = 'scale(0.8)';
                setTimeout(() => mancha.style.transform = 'scale(1.1)', 100);
            });
        });

        mancha.addEventListener('mouseover', () => mancha.style.transform = 'scale(1.1)');
        mancha.addEventListener('mouseout', () => mancha.style.transform = 'scale(1)');

        paletaMadera.appendChild(mancha);
    }
}

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.className = "show";
    setTimeout(() => { toast.className = ""; }, 2000);
}

btnGenerar.addEventListener('click', renderizarPaleta);
btnLimpiar.addEventListener('click', () => {
    paletaMadera.innerHTML = '';
    mostrarToast("Lienzo limpio");
});