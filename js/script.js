const perspectiveBoxes = document.querySelectorAll('.perspective-box');
const titles = document.querySelectorAll('.title');
const emptyTitles = document.querySelectorAll('.empty-title');
const textContents = document.querySelectorAll('.textcontent'); // Selección de textcontent
let scrollPosition = 0;
const maxScroll = perspectiveBoxes.length * 500;

// Configura el evento de scroll
window.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = event.deltaY;
    scrollPosition += delta * 2;

    // Limita el rango
    if (scrollPosition < 0) scrollPosition = 0;
    if (scrollPosition > maxScroll) scrollPosition = maxScroll;

    // Actualiza el efecto de los cuadros en perspectiva
    updatePerspectiveBoxes(scrollPosition);
    // Actualiza los títulos y los textcontent
    updateTitles(scrollPosition);
});

// Actualización de los cuadros en perspectiva
function updatePerspectiveBoxes(scroll) {
    const viewportHeight = window.innerHeight;
    const centerOffset = viewportHeight * -0.3;

    perspectiveBoxes.forEach((box, index) => {
        const phaseStart = index * viewportHeight * 0.4;
        const phaseEnd = phaseStart + viewportHeight * 1.2;
        const progress = (scroll - phaseStart) / (phaseEnd - phaseStart);

        if (progress >= 0 && progress <= 1) {
            const scale = 1 + progress * 2;
            const translateX = progress * 300 * (index % 2 === 0 ? 1 : -1);
            const translateY = centerOffset + progress * 250;
            const opacity = progress <= 0.5 ? progress * 2 : 2 - progress * 2;

            box.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            box.style.opacity = opacity;
        } else if (progress < 0) {
            box.style.transform = `scale(1) translate(0, ${centerOffset}px)`;
            box.style.opacity = 0;
        } else if (progress > 1) {
            box.style.transform = `scale(2) translate(${300 * (index % 2 === 0 ? 1 : -1)}px, ${250 + centerOffset}px)`;
            box.style.opacity = 0;
        }
    });
}

// Actualiza los títulos y los textcontent con espacio entre ellos según el scroll
function updateTitles(scroll) {
    const viewportHeight = window.innerHeight;

    // Actualizar títulos
    titles.forEach((title, index) => {
        const phaseStart = (index * 3) * viewportHeight * 1.2;
        const phaseEnd = phaseStart + viewportHeight * 2;
        const progress = (scroll - phaseStart) / (phaseEnd - phaseStart);

        if (progress >= 0 && progress <= 1) {
            title.style.opacity = 1 - Math.abs(progress - 0.5) * 2; // Efecto de fade in/fade out
        } else {
            title.style.opacity = 0;
        }
    });

    // Actualizar textcontent
    textContents.forEach((text, index) => {
        const phaseStart = (index * 3) * viewportHeight * 1.2;
        const phaseEnd = phaseStart + viewportHeight * 2;
        const progress = (scroll - phaseStart) / (phaseEnd - phaseStart);

        if (progress >= 0 && progress <= 1) {
            text.style.opacity = 1 - Math.abs(progress - 0.5) * 2; // Efecto de fade in/fade out
        } else {
            text.style.opacity = 0;
        }
    });
}

    // desplegar div
    const btnDesplegar = document.getElementById('btn-desplegar');
const divDesplegable = document.getElementById('div-desplegable');
const contentToHide = document.querySelectorAll('.titles-container, .floating-container, .text-container');
const btnCerrar = document.getElementById('btn-cerrar');

// Función para ocultar elementos con transición
function hideContent() {
    contentToHide.forEach(element => {
        element.classList.remove('visible');
        element.classList.add('hidden');
    });
}

// Función para mostrar elementos con transición
function showContent() {
    contentToHide.forEach(element => {
        element.classList.remove('hidden');
        element.classList.add('visible');
    });
}

// Evento para desplegar el div
btnDesplegar.addEventListener('click', () => {
    const isHidden = divDesplegable.style.bottom === '0%';
    if (isHidden) {
        // Volver a la posición inicial
        divDesplegable.style.bottom = '-100%';
        showContent(); // Mostrar los elementos
    } else {
        // Desplegar el div
        divDesplegable.style.bottom = '0%';
        btnDesplegar.style.bottom = '100%'; // Mueve el botón junto con el div
        hideContent(); // Ocultar los elementos
    }
});

// Evento para cerrar el div desplegable
btnCerrar.addEventListener('click', () => {
    divDesplegable.style.bottom = '-100%'; // Cierra el div
    btnDesplegar.style.bottom = '0px'; // Devuelve el botón de despliegue a la vista
    showContent(); // Mostrar de nuevo los elementos
});
