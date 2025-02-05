
document.addEventListener('DOMContentLoaded', () => {
  const titlesContainer = document.querySelector('.titles-container');
  const viewportHeight = window.innerHeight;
  const divDesplegable = document.getElementById('div-desplegable');
  let desplegableAbierto = false;
  let scrollPosition = 0;
  let maxScroll = 0;
  let perspectiveBoxes = [];

  const jsonFile = 'json/images.json'; // Ruta al archivo JSON

  function generatePerspectiveBoxes(images) {
    const container = document.querySelector('.floating-container');

    images.forEach(image => {
      const perspectiveBox = document.createElement('div');
      perspectiveBox.classList.add('perspective-box');

      const img = document.createElement('img');
      img.src = image.src;
      perspectiveBox.appendChild(img);

      container.appendChild(perspectiveBox);
    });

    perspectiveBoxes = document.querySelectorAll('.perspective-box');
    maxScroll = perspectiveBoxes.length * 500;
  }

  function loadImages() {
    fetch(jsonFile)
      .then(response => response.json())
      .then(images => {
        console.log('Imágenes cargadas:', images);
        generatePerspectiveBoxes(images);
      })
      .catch(error => console.error('Error al cargar el archivo JSON:', error));
  }

  function updatePerspectiveBoxes(scroll) {
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

  function updateTitles(scroll) {
    if (!desplegableAbierto) {
      if (scroll > viewportHeight * 0.1) {
        titlesContainer.classList.add('hidden');
      } else {
        titlesContainer.classList.remove('hidden');
      }
    } else {
      titlesContainer.classList.add('hidden');
    }
  }

  document.addEventListener('wheel', (event) => {
    if (!desplegableAbierto) {
      event.preventDefault();
      const delta = event.deltaY;
      scrollPosition += delta * 1;
      if (scrollPosition < 0) scrollPosition = 0;
      if (scrollPosition > maxScroll) scrollPosition = maxScroll;
      updatePerspectiveBoxes(scrollPosition);
      updateTitles(scrollPosition);
    }
  }, { passive: false });

  loadImages();

  const btnDesplegar = document.getElementById('btn-desplegar');
  const contentToHide = document.querySelectorAll('.titles-container, .floating-container, .text-container');
  const btnCerrar = document.getElementById('btn-cerrar');

  
  function hideContent() {
    contentToHide.forEach(element => {
      element.classList.remove('visible');
      element.classList.add('hidden');
    });
    document.body.style.backgroundImage = 'none';
  }

  function showContent() {
    contentToHide.forEach(element => {
      if (!element.classList.contains('titles-container')) {
        element.classList.remove('hidden');
        element.classList.add('visible');
      }
    });
    document.body.style.backgroundImage = 'url(../imagenes/generalBackground.png)';
  }

  btnDesplegar.addEventListener('click', () => {
    divDesplegable.classList.add('activo');
    divDesplegable.style.bottom = '0';  // Asegurar que se mantenga visible
    divDesplegable.style.display = 'block'; // Prevenir que desaparezca
    document.body.style.overflow = 'hidden';  
    divDesplegable.style.overflowY = 'auto'; 
    desplegableAbierto = true;
    btnDesplegar.style.bottom = '100%'; 
    hideContent();
    document.getElementById('btn-nosotros').click();
  });

  btnCerrar.addEventListener('click', () => {
    closeTabContent();
    divDesplegable.classList.remove('activo');
    divDesplegable.style.bottom = '-100%'; // Ocultarlo correctamente
    document.body.style.overflow = '';  
    divDesplegable.style.overflowY = ''; 
    desplegableAbierto = false;
    btnDesplegar.style.bottom = '0px'; 
    showContent();
  });

  window.addEventListener('scroll', function () {
    if (desplegableAbierto) {
      titlesContainer.classList.add('hidden');
    } else {
      let scrollPos = window.scrollY;
      let start = viewportHeight * 0.1;
      let end = viewportHeight * 0.4;
      let progress = (scrollPos - start) / (end - start);
      if (progress >= 0 && progress <= 1) {
        titlesContainer.style.opacity = (1 - progress).toString();
      } else if (progress < 0) {
        titlesContainer.style.opacity = '1';
      } else {
        titlesContainer.style.opacity = '0';
      }
    }
  });
});

const btnNosotros = document.getElementById('btn-nosotros');
const btnServicios = document.getElementById('btn-servicios');
const btnContacto = document.getElementById('btn-contacto');
const tabContent = document.getElementById('tab-content');
// Mostrar contenido según el botón presionado
function showTabContent(content) {
  tabContent.innerHTML = content;
  tabContent.classList.add('visible');
}

// Eliminar clase de visibilidad antes de cargar nuevo contenido
function resetTabContent() {
  tabContent.classList.remove('visible');
  setTimeout(() => {
    tabContent.innerHTML = ''; 
  }, 500); 
}
function closeTabContent() {
  tabContent.classList.remove('visible');

    tabContent.innerHTML = ''; 

}
// Eventos de clic en los botones
btnNosotros.addEventListener('click', () => {
  resetTabContent();
  setTimeout(() => {
    const newLocal = `
      <div class="scroll-container">
    <div class="background-nosotros"></div>
    <div class="cards-container-nosotros">
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 1</h3>
                <p>Contenido de la tarjeta 1.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example1.jpg" alt="Imagen 1">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 2</h3>
                <p>Contenido de la tarjeta 2.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example2.jpg" alt="Imagen 2">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 3</h3>
                <p>Contenido de la tarjeta 3.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example3.jpg" alt="Imagen 3">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 4</h3>
                <p>Contenido de la tarjeta 4.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example4.jpg" alt="Imagen 4">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 5</h3>
                <p>Contenido de la tarjeta 5.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example5.jpg" alt="Imagen 5">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 6</h3>
                <p>Contenido de la tarjeta 6.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example6.jpg" alt="Imagen 6">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 7</h3>
                <p>Contenido de la tarjeta 7.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example7.jpg" alt="Imagen 7">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 8</h3>
                <p>Contenido de la tarjeta 8.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example8.jpg" alt="Imagen 8">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 9</h3>
                <p>Contenido de la tarjeta 9.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example9.jpg" alt="Imagen 9">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 10</h3>
                <p>Contenido de la tarjeta 10.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example10.jpg" alt="Imagen 10">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 11</h3>
                <p>Contenido de la tarjeta 11.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example11.jpg" alt="Imagen 11">
            </div>
        </div>
        <div class="content-card-nosotros">
            <div class="text-container-nosotros">
                <h3>Título 12</h3>
                <p>Contenido de la tarjeta 12.</p>
            </div>
            <div class="image-container-nosotros">
                <img src="imagenes/example12.jpg" alt="Imagen 12">
            </div>
        </div>
    </div>
</div>
    `;
    const content = newLocal;
    showTabContent(content);

    // Esperar un momento después de agregar el contenido y luego agregar el evento
    setTimeout(() => {
      let scrollContainer = document.querySelector('.scroll-container');
      
      if (scrollContainer) {
        // Solo agregar el evento si el contenedor está presente en el DOM
        scrollContainer.addEventListener('mouseenter', function() {
          isMouseOver = true;
        });

        scrollContainer.addEventListener('mouseleave', function() {
          isMouseOver = false;
        });
      } else {
        console.error("El contenedor no se encuentra en el DOM.");
      }
    }, 50); // Ajusta el tiempo según sea necesario

  }, 500);
});

document.addEventListener("DOMContentLoaded", function () {
  const btnServicios = document.getElementById("btn-servicios");
  btnServicios.addEventListener("click", () => {
      resetTabContent();
      setTimeout(() => {
          const content = `
              <h2 id='titulo-servicio'>Nuestros Servicios</h2>
              <div id='menu-servicios'>
                  <button id='btn-ocultar-menu'>❮</button>
              </div>
              <div id='contenedor-tarjetas'>
                  <div class='carrusel-wrapper'>
                      <div class='carrusel-container'></div>
                  </div>
              </div>
              <button id='btn-agregar-servicio'>Agregar al paquete</button>
          `;
          showTabContent(content);
          inicializarMenuServicios();
      }, 500);
  });

  function inicializarMenuServicios() {
      fetch("json/servicios.json")
          .then(response => response.json())
          .then(data => {
              const menuLateral = document.getElementById("menu-servicios");
              const contenedorTarjetas = document.querySelector(".carrusel-container");
              const carruselWrapper = document.querySelector(".carrusel-wrapper");
              const btnOcultarMenu = document.getElementById("btn-ocultar-menu");
              let servicioActual = null;
              let indice = 0;
              let grupos = [];

              data.servicios.forEach(servicio => {
                  const botonServicio = document.createElement("button");
                  botonServicio.textContent = servicio.titulo;
                  botonServicio.classList.add("boton-servicio");
                  botonServicio.addEventListener("click", () => mostrarServicio(servicio));
                  menuLateral.appendChild(botonServicio);
              });

              btnOcultarMenu.addEventListener("click", () => {
                  menuLateral.classList.toggle("oculto");
              });

              function mostrarServicio(servicio) {
                  document.getElementById('titulo-servicio').textContent = servicio.titulo;
                  servicioActual = servicio;
                  indice = 0;
                  actualizarCarrusel();
              }

              function actualizarCarrusel() {
                  if (!servicioActual) return;
                  contenedorTarjetas.innerHTML = "";
                  contenedorTarjetas.style.transform = "translateX(0)";
                  contenedorTarjetas.style.opacity = "1";
                  
                  let tarjetasVisibles = window.innerWidth > 800 ? 2 : 1;
                  let totalTarjetas = servicioActual.tarjetas.length;
                  grupos = [];
                  
                  for (let i = 0; i < totalTarjetas; i += tarjetasVisibles) {
                      let grupo = servicioActual.tarjetas.slice(i, i + tarjetasVisibles);
                      let divGrupo = document.createElement("div");
                      divGrupo.classList.add("grupo-tarjetas");
                      divGrupo.style.display = "flex";
                      divGrupo.style.flex = "0 0 100%";
                      divGrupo.style.justifyContent = "center";
                      
                      grupo.forEach(tarjeta => {
                          const divTarjeta = document.createElement("div");
                          divTarjeta.classList.add("tarjeta");
                          divTarjeta.innerHTML = `<p>${tarjeta.contenido}</p>`;
                          if (tarjeta.imagen) {
                              divTarjeta.innerHTML += `<img src="${tarjeta.imagen}" alt="Imagen tarjeta">`;
                          }
                          divGrupo.appendChild(divTarjeta);
                      });
                      grupos.push(divGrupo);
                  }
                  
                  grupos.forEach(grupo => contenedorTarjetas.appendChild(grupo));
              }
              
              window.addEventListener("resize", actualizarCarrusel);
              
              const btnPrev = document.createElement("img");
              btnPrev.src = "imagenes/flecha_izquierda.png";
              btnPrev.classList.add("btn-carrusel");
              btnPrev.addEventListener("click", () => {
                  if (grupos.length > 0) {
                      indice = (indice - 1 + grupos.length) % grupos.length;
                      contenedorTarjetas.style.transition = "transform 0.5s ease-in-out";
                      contenedorTarjetas.style.transform = `translateX(-${indice * 100}%)`;
                  }
              });
              
              const btnNext = document.createElement("img");
              btnNext.src = "imagenes/flecha_derecha.png";
              btnNext.classList.add("btn-carrusel");
              btnNext.addEventListener("click", () => {
                  if (grupos.length > 0) {
                      indice = (indice + 1) % grupos.length;
                      contenedorTarjetas.style.transition = "transform 0.5s ease-in-out";
                      contenedorTarjetas.style.transform = `translateX(-${indice * 100}%)`;
                  }9
              });
              
              carruselWrapper.appendChild(btnPrev);
              carruselWrapper.appendChild(btnNext);
          });
  }
});

btnContacto.addEventListener('click', () => {
  resetTabContent();
  setTimeout(() => {
    const content = `
      <div class="curso_container">
          <div class="curso_content_details">
              <div class="contact_container">
                  <div class="contact_info_container">
                      <ul>
                          <li><h4 class="curso_content_title">¿Quieres impulsar tu negocio?</h4>
                              <p>En SIGUE trabajamos junto a ti para potenciar tus oportunidades</p>
                          </li>
                          <li><h4 class="curso_content_title">Crea tu paquete de Servicios personalizado</h4>
                              <p>Selecciona de nuestro catálogo, los servicios que mejor se adecuen a tu situación</p>
                          </li>
                          <li><h4 class="curso_content_title">Comienza tu camino con SIGUE</h4>
                              <p>Nuestro objetivo es impulsarte, estás a un click de lograr el Éxito</p>
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
                          <div class="g-recaptcha" data-sitekey="6Ldg6PEpAAAAAEUIsSi59w0Zb1HNtz619siwvFHy"></div>
                          <br>
                          <button type="submit" class="CIEP_GenericBTN" id="send_email_BTN">Enviar</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      <div id="termsOverlay"></div>
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
        </p>
        <button class="CIEP_GenericBTN" id="closeModal">Cerrar</button>
    </div>
    `;
    showTabContent(content);
    
    console.log("Formulario de contacto insertado en el DOM");
    
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(script);
    
    emailjs.init("YwXhxnIo10hShizFM");

    setTimeout(() => {
        const contactForm = document.getElementById("contact-form-contacto");
        const SUBMITBTN = document.getElementById("send_email_BTN");

        if (!contactForm || !SUBMITBTN) {
            console.error("Error: No se encontró el formulario de contacto o el botón de enviar");
            return;
        }

        console.log("Evento submit agregado al formulario de contacto");
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            SUBMITBTN.disabled = true;
            console.log("Formulario enviado, verificando reCAPTCHA...");

            if (typeof grecaptcha !== "undefined") {
                const recaptchaResponse = grecaptcha.getResponse();
                if (recaptchaResponse.length === 0) {
                    alert("Por favor, completa el reCAPTCHA.");
                    SUBMITBTN.disabled = false;
                    return;
                }
            }

            const templateParams = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value,
                "g-recaptcha-response": typeof grecaptcha !== "undefined" ? grecaptcha.getResponse() : ""
            };

            const serviceID = "service_zpo793f";
            const templateID = "template_yvmend4";

            emailjs.send(serviceID, templateID, templateParams)
                .then((response) => {
                    console.log("Correo enviado con éxito!", response.status, response.text);
                    alert("Correo enviado con éxito!\n\nGracias por ponerse en contacto con nosotros.\nMuy pronto un agente de SIGUE se pondrá en contacto con usted.");
                    contactForm.reset();
                    if (typeof grecaptcha !== "undefined") {
                        grecaptcha.reset();
                    }
                    SUBMITBTN.disabled = false;
                })
                .catch((error) => {
                    console.error("Error al enviar el correo:", error);
                    alert("Error al enviar el correo. Inténtelo de nuevo más tarde.");
                    SUBMITBTN.disabled = false;
                });
        });
    }, 1000);
  }, 500);
});
