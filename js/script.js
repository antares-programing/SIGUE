
const titles = document.querySelectorAll('.title');
const emptyTitles = document.querySelectorAll('.empty-title');
const textContents = document.querySelectorAll('.textcontent');
let scrollPosition = 0;


// Ruta del archivo JSON con las imágenes
let perspectiveBoxes = []; // Declaramos la variable aquí para actualizarla después
let maxScroll = 0; // Inicializamos maxScroll con 0

// Ruta del archivo JSON con las imágenes
const jsonFile = 'json/images.json'; // Asegúrate de que el archivo sea 'images.json' si es un archivo JSON

// Función para generar las tarjetas
function generatePerspectiveBoxes(images) {
  const container = document.querySelector('.floating-container'); // Contenedor de las tarjetas

  images.forEach(image => {
    // Crear el div para la tarjeta de perspectiva
    const perspectiveBox = document.createElement('div');
    perspectiveBox.classList.add('perspective-box');

    // Crear la etiqueta <img> para la imagen
    const img = document.createElement('img');
    img.src = image.src; // Asignar la ruta de la imagen
    img.alt = ''; // Puedes agregar una descripción si lo deseas

    // Agregar la imagen a la tarjeta
    perspectiveBox.appendChild(img);

    // Agregar la tarjeta al contenedor
    container.appendChild(perspectiveBox);
  });

  // Actualizar la lista de perspectiveBoxes después de agregar las tarjetas
  perspectiveBoxes = document.querySelectorAll('.perspective-box');

  // Actualizar maxScroll después de generar las tarjetas
  maxScroll = perspectiveBoxes.length * 500; // Ahora se calcula correctamente
}

// Función para cargar el archivo JSON y generar las tarjetas
function loadImages() {
  fetch(jsonFile)
    .then(response => response.json()) // Parsear el JSON
    .then(images => {
      console.log('Imágenes cargadas:', images); // Verifica si las imágenes se cargan correctamente
      generatePerspectiveBoxes(images); // Llamar a la función para generar las tarjetas
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error);
    });
}

// Llamar a la función para cargar las imágenes cuando la página esté lista
window.addEventListener('DOMContentLoaded', loadImages);
// ===========================================================================================================================
// Configura el evento de scroll
window.addEventListener('wheel', (event) => {
  event.preventDefault();
  const delta = event.deltaY;
  scrollPosition += delta * 1;

  // Limita el rango
  if (scrollPosition < 0) scrollPosition = 0;
  if (scrollPosition > maxScroll) scrollPosition = maxScroll;

  // Actualiza el efecto de los cuadros en perspectiva
  updatePerspectiveBoxes(scrollPosition);
  // Actualiza los títulos y los textcontent
  updateTitles(scrollPosition);
}, { passive: false });
// ===========================================================================================================================
// Función para rellenar en el div desplegable

// ===========================================================================================================================
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

// ===========================================================================================================================
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

// ===========================================================================================================================
// Código para desplegar el div y ocultar el contenido
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

// ===========================================================================================================================
// Evento para desplegar el div
btnDesplegar.addEventListener('click', () => {
    divDesplegable.style.bottom = '0%';
    btnDesplegar.style.bottom = '100%'; // Mueve el botón junto con el div
    hideContent(); // Ocultar los elementos
});

// Evento para cerrar el div desplegable
btnCerrar.addEventListener('click', () => {
  divDesplegable.style.bottom = '-100%'; // Cierra el div
  btnDesplegar.style.bottom = '0px'; // Devuelve el botón de despliegue a la vista
  showContent(); // Mostrar de nuevo los elementos
});


// ===========================================================================================================================
// Referencias a los botones
const btnNosotros = document.getElementById('btn-nosotros');
const btnServicios = document.getElementById('btn-servicios');
const btnContacto = document.getElementById('btn-contacto');
const tabContent = document.getElementById('tab-content');

// Función para mostrar contenido según el botón presionado
function showTabContent(content) {
  tabContent.innerHTML = content;
  tabContent.classList.add('visible');
}

// Eliminar clase de visibilidad antes de cargar nuevo contenido
function resetTabContent() {
  tabContent.classList.remove('visible');
  setTimeout(() => {
    tabContent.innerHTML = ''; // Limpiar contenido antes de cargar el nuevo
  }, 500); // Tiempo suficiente para la transición de opacidad
}

// Eventos de clic en los botones
btnNosotros.addEventListener('click', () => {
  resetTabContent();
  setTimeout(() => {
    const content = '<h2>Nosotros</h2><p>Este es el contenido sobre nuestra empresa.</p>';
    showTabContent(content);
  }, 500);
});

btnServicios.addEventListener('click', () => {
  resetTabContent();
  setTimeout(() => {
    const content = '<h2>Nuestros Servicios</h2><p>Información sobre los servicios que ofrecemos.</p>';
    showTabContent(content);
  }, 500);
});

btnContacto.addEventListener('click', () => {
  resetTabContent();
  setTimeout(() => {
    const content = '<h2>Contacto</h2><p>Formulario de contacto e información de contacto.</p>';
    showTabContent(content);
  }, 500);
});