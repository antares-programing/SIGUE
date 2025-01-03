
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
    // Contenido para el formulario de contacto
    const content = `
      <div class="curso_container">
          <div class="curso_content_details">
              <div class="contact_container">
                  <div class="contact_info_container">
                      <ul>
                          <li><h4 class="curso_content_title">Contacto Empresa</h4>
                              <p>Si quieres capacitar a tu personal, contactanos via email a somosigue@gmail.com</p>
                          </li>
                          <li><h4 class="curso_content_title">Contacto Estudiante</h4>
                              <p>Si tienes algun problema para postularte a las becas o estas teniendo problemas durante tu curso, contactanos via email a somosigue@gmail.com</p>
                          </li>
                          <li><h4 class="curso_content_title">Contacto Profesorado</h4>
                              <p>Si quieres formar parte de nuestro equipo de profesores e impartir tus cursos en nuestra academia, contactanos via email a somosigue@gmail.com</p>
                          </li>
                          <div id="media_IMG_Container">
                              <img id="cellphone_BTN" class="media_BTN" src="imagenes/Cellphone_icon.png" alt="">
                              <div id="cellphone_number_Container">
                                  <p>096565289</p>
                              </div>
                              <img id="instagram_BTN" class="media_BTN" src="imagenes/Instagram_icon.png" alt="">
                              <img id="facebook_BTN" class="media_BTN" src="imagenes/Facebook_icon.png" alt="">
                              <img id="linkedin_BTN" class="media_BTN" src="imagenes/Linkedin_icon.png" alt="">
                          </div>
                      </ul>
                  </div>
                  <div class="contact_form_container_contacto">
                      <form id="contact-form-contacto">
                          <label for="name">Nombre Completo:</label>
                          <input type="text" id="name" name="name" required>
                          <br>
                          <label for="email">Correo Electrónico:</label>
                          <input type="email" id="email" name="email" required>
                          <br>
                          <label for="message">Mensaje:</label>
                          <textarea id="message" name="message" required></textarea>
                          <br>
                          <div>
                              <input type="checkbox" id="terms" name="terms" required>
                              <label for="terms">He leído y acepto los <a href="#" id="termsLink">términos y condiciones</a></label>
                          </div>
                          <br>
                          <button type="submit" id="send_email_BTN">Enviar</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      <div id="termsOverlay"></div>
  
      <!-- Modal for the terms and conditions -->
    <div id="termsModal">
        <h2>Términos y Condiciones</h2>
        <p>
            Estos términos y condiciones explican cómo el equipo de SIGUE recopila, usa y protege la información personal que nos proporcionas a través de nuestros formularios de contacto.
            <br><br>
            <strong>1. Información que Recopilamos</strong>
            <br>
            Recopilamos los siguientes datos personales:
            <ul>
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
            </ul>
            <br>
            <strong>2. Finalidad de la Recopilación de Datos</strong>
            <br>
            Usamos la información recopilada para los siguientes fines:
            <ul>
                <li>Ponernos en contacto contigo para proporcionarte información sobre becas estudiantiles.</li>
                <li>Enviarte información relevante sobre nuestros cursos y programas educativos.</li>
                <li>Mejorar nuestros servicios y personalizar tu experiencia con nosotros.</li>
            </ul>
            <br>
            <strong>3. Retención de Datos</strong>
            <br>
            Conservaremos tus datos personales durante el tiempo que sea necesario para cumplir con los fines descritos en estos términos y condiciones, a menos que la ley exija o permita un período de retención más largo.
            <br><br>
            <strong>4. Compartición de Datos</strong>
            <br>
            No compartimos tus datos personales con terceros, excepto cuando sea necesario para cumplir con las obligaciones legales o con tu consentimiento explícito.
            <br><br>
            <strong>5. Seguridad de los Datos</strong>
            <br>
            Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger tus datos personales contra el acceso no autorizado, la divulgación, alteración o destrucción.
            <br><br>
            <strong>6. Derechos de los Usuarios</strong>
            <br>
            Tienes derecho a acceder, rectificar, eliminar u oponerte al uso de tus datos personales. Para ejercer estos derechos, puedes ponerte en contacto con nosotros a través del correo electrónico <a href="mailto:somosigue@gmail.com">somosigue@gmail.com</a>.
            <br><br>
            <strong>7. Contacto</strong>
            <br>
            Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad o el manejo de tus datos personales, por favor contáctanos a:
            <br>
            Soluciones Integrales de Gestion y Unificacion Empresarial (SIGUE)
            <br>
            Correo electrónico: <a href="mailto:somosigue@gmail.com">somosigue@gmail.com</a>
            <br>
            Teléfono: 096565289
        </p>
        <button class="CIEP_GenericBTN" id="closeModal">Cerrar</button>
    </div>
    `;
    showTabContent(content);  // Muestra el contenido dinámico

    // Asignación de eventos a los botones después de que el contenido se haya cargado
    const CELPHONEBTN = document.getElementById("cellphone_BTN");
    const INSTAGRAMBTN = document.getElementById("instagram_BTN");
    const FACEBOOKBTN = document.getElementById("facebook_BTN");
    const LINKEDINBTN = document.getElementById("linkedin_BTN");
    const TERMSLINK = document.getElementById("termsLink");
    const TERMSMODAL = document.getElementById("termsModal");
    const TERMSSOVERLAY = document.getElementById("termsOverlay");
    const CLOSEMODAL = document.getElementById("closeModal");

    // Agregar eventos
    if (CELPHONEBTN) {
        CELPHONEBTN.addEventListener("click", () => {
            const cellphoneNumberContainer = document.getElementById("cellphone_number_Container");
            cellphoneNumberContainer.classList.toggle("expanded");
        });
    }

    if (INSTAGRAMBTN) {
        INSTAGRAMBTN.addEventListener("click", () => {
            window.open("https://www.instagram.com/institutociep/", "_blank");
        });
    }

    if (FACEBOOKBTN) {
        FACEBOOKBTN.addEventListener("click", () => {
            window.open("https://www.facebook.com/profile.php?id=61560180855472", "_blank");
        });
    }

    if (LINKEDINBTN) {
        LINKEDINBTN.addEventListener("click", () => {
            window.open("https://www.linkedin.com/company/instituto-ciep/", "_blank");
        });
    }

    if (TERMSLINK) {
        TERMSLINK.addEventListener('click', function(event) {
            event.preventDefault();
            TERMSMODAL.style.display = 'block';
            TERMSSOVERLAY.style.display = 'block';
        });
    }

    if (CLOSEMODAL) {
        CLOSEMODAL.addEventListener('click', function() {
            TERMSMODAL.style.display = 'none';
            TERMSSOVERLAY.style.display = 'none';
        });
    }

    if (TERMSSOVERLAY) {
        TERMSSOVERLAY.addEventListener('click', function() {
            TERMSMODAL.style.display = 'none';
            TERMSSOVERLAY.style.display = 'none';
        });
    }
  }, 500);
});