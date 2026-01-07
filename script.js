let lastScroll = 0;
const header = document.getElementById("top-header");
const navLinks = document.querySelectorAll(".nav-link");

// Función para el Sticky Header
window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 80) {
        header.style.top = "-80px"; // Ocultar
    } else {
        header.style.top = "0"; // Mostrar
    }

    lastScroll = currentScroll;
});

// Lógica para el enlace de navegación activo
navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        navLinks.forEach(item => {
            item.classList.remove("active");
        });
        this.classList.add("active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const inicioLink = document.querySelector('a[href="index.html"]'); // Busca el enlace a index.html
    if (inicioLink) {
        // Asegúrate de que el enlace de inicio se marque como activo si estás en index.html
        // (Esto es una simplificación, la lógica real de "página activa" puede ser más compleja)
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
             inicioLink.classList.add('active');
        }
    }

// ======================================
    // FUNCIONALIDAD DEL CARRUSEL 1 (Bucle Infinito)
    // ======================================
    const slide1 = document.querySelector('.carousel-slide');
    if (slide1) {
        // Obtenemos todos los elementos imagen originales
        const originalImages = document.querySelectorAll('.carousel-slide img');
        
        // 1. Clonar imágenes para el efecto infinito (Clonamos las 3 últimas y 3 primeras)
        // Usamos 3 porque es el número de ítems visibles.
        const itemsToShow = 3; 
        
        // Clonar las últimas 'itemsToShow' imágenes y ponerlas al inicio
        for (let i = originalImages.length - itemsToShow; i < originalImages.length; i++) {
            const clone = originalImages[i].cloneNode(true);
            slide1.prepend(clone); // Agregar al inicio del slide
        }

        // Clonar las primeras 'itemsToShow' imágenes y ponerlas al final
        for (let i = 0; i < itemsToShow; i++) {
            const clone = originalImages[i].cloneNode(true);
            slide1.appendChild(clone); // Agregar al final del slide
        }
        
        // Re-seleccionar todas las imágenes (incluyendo los clones) y los botones
        const allImages = document.querySelectorAll('.carousel-slide img');
        const prevBtn1 = document.getElementById('prevBtn');
        const nextBtn1 = document.getElementById('nextBtn');
        
        // El ancho se debe recalcular dinámicamente, ya que usamos 'calc' en CSS
        const getSlideWidth = () => slide1.children[0] ? slide1.children[0].offsetWidth : 0;
        
        // 2. Inicializar el contador en la posición de los primeros ítems *originales*
        let counter1 = itemsToShow; 
        
        // 3. Ajustar la posición inicial para que muestre el primer ítem real
        // Necesitamos calcular el desplazamiento de forma más precisa con el gap.
        const updateSlidePosition = () => {
            // El desplazamiento total es: (Ancho de la imagen + gap) * contador
            const slideWidth = getSlideWidth();
            
            // Usamos un valor fijo para el gap que definimos en CSS (20px)
            const gap = 20; 
            
            // Calculamos el desplazamiento basado en la posición del primer ítem
            const totalShift = counter1 * (slideWidth + gap);
            
            slide1.style.transform = `translateX(${-totalShift}px)`;
        }

        // Ejecutar inmediatamente para posicionar el slide
        updateSlidePosition();
        
        // ========================================
        // EVENTOS DE NAVEGACIÓN
        // ========================================
        if (prevBtn1 && nextBtn1) {
            
            // --- Siguiente botón ---
            nextBtn1.addEventListener('click', () => {
                // Si el contador es mayor o igual al último ítem original + ítems a mostrar...
                if (counter1 >= allImages.length - itemsToShow) return; 

                slide1.style.transition = "transform 0.5s ease-in-out";
                counter1++;
                updateSlidePosition(); 
            });

            // --- Anterior botón ---
            prevBtn1.addEventListener('click', () => {
                // Si el contador es menor o igual al primer ítem clonado...
                if (counter1 <= 0) return; 

                slide1.style.transition = "transform 0.5s ease-in-out";
                counter1--;
                updateSlidePosition(); 
            });

            // --- Detección de Transición (Bucle) ---
            slide1.addEventListener('transitionend', () => {
                // Si estamos en la posición del clon del final (después del último original)
                if (counter1 === allImages.length - itemsToShow) {
                    slide1.style.transition = "none";
                    counter1 = itemsToShow; // Volver al inicio de los originales
                    updateSlidePosition(); 
                }
                
                // Si estamos en la posición del clon del inicio (antes del primer original)
                if (counter1 === 0) {
                    slide1.style.transition = "none";
                    counter1 = allImages.length - (itemsToShow * 2); // Volver al final de los originales
                    updateSlidePosition(); 
                }
            });
        }
    }

        // --- Lógica del Carrusel 2 ---
    
    // 1. DEFINICIÓN DE VARIABLES (Acceso al DOM)
    const slide2 = document.querySelector('.carrusel2-slide');
    const images2 = document.querySelectorAll('.carrusel2-slide img'); 
    const nextBtn2 = document.getElementById('next-carrusel2-btn');
    const prevBtn2 = document.getElementById('prev-carrusel2-btn');

    // Comprobación de que todos los elementos existen
    if (!slide2 || images2.length === 0 || !nextBtn2 || !prevBtn2) {
        console.error("Fallo al encontrar elementos del Carrusel 2. Revisa el HTML o los IDs.");
        // No retorna aquí para no detener el Carrusel 1 u otras funciones
    } else { // Ejecutar solo si los elementos existen
        // 2. VARIABLES DE ESTADO Y GEOMETRÍA
        let currentRotation2 = 0;
        const numImages2 = images2.length;
        const degreePerImage2 = 360 / numImages2;

        images2[0].classList.add('active2'); 

        // 3. FUNCIÓN: APLICA LA ROTACIÓN 3D
        function applyRotation2() {
            slide2.style.transform = `rotateY(${currentRotation2}deg)`;
        }

        // 4. FUNCIÓN PARA ACTUALIZAR LA IMAGEN ACTIVA
        function updateActiveImage2() {
            images2.forEach(img => {
                img.classList.remove('active2');
            });

            let index2 = Math.round((-currentRotation2 / degreePerImage2) % numImages2);
            
            if (index2 < 0) {
                index2 += numImages2;
            }

            images2[index2].classList.add('active2');
        }

        // 5. LISTENERS DE NAVEGACIÓN

        // Listener para el botón "Siguiente"
        nextBtn2.addEventListener('click', () => {
            currentRotation2 -= degreePerImage2;
            applyRotation2();
            setTimeout(updateActiveImage2, 800); 
        });

        // Listener para el botón "Anterior"
        prevBtn2.addEventListener('click', () => {
            currentRotation2 += degreePerImage2;
            applyRotation2();
            setTimeout(updateActiveImage2, 800); 
        });
        
        // Listener para click en las imágenes
        images2.forEach((img, index) => {
            img.addEventListener('click', () => {
                let targetRotation = - (index * degreePerImage2);
                
                currentRotation2 = targetRotation;
                applyRotation2();
                
                setTimeout(updateActiveImage2, 800);
            });
        });

        // 6. INICIALIZACIÓN
        applyRotation2();
        updateActiveImage2(); // Corregido: Llamada a la función con paréntesis
    }
}); // Cierre del único document.addEventListener('DOMContentLoaded', ...)


//CHAT BOT 
// 1. TIPO BASE DE DATOS INTEGRAL
const conocimientoBot = {
    platillos: [
        { nombre: "La Vaquera Atascada", ingredientes: "Doble carne de res, doble queso cheddar, aros de cebolla, tocino crujiente, salsa BBQ ahumada, lechuga, tomate y aderezo de chipotle, con pan artesanal.", categoria: "comida", especialidad: true },
        { nombre: "La Triple Quesuda", ingredientes: "Carne de res seleccionada, triple queso (manchego, americano y oaxaca), extra tocino y pan artesanal.", categoria: "comida", especialidad: true },
        { nombre: "Clásica del atascón", ingredientes: "Carne a la parrilla, queso oaxaca, jamón, pan artesanal, lechuga y jitomate fresco.", categoria: "comida" },
        { nombre: "Verde Rebelde", ingredientes: "Hongo portobello, queso amarillo/manchego, pan artesanal, lechuga y jitomate. Opción vegetariana.", categoria: "comida" },
        { nombre: "Aloha Atascón", ingredientes: "Carne a la parrilla, tocino, queso derretido, pan artesanal y piña reposada.", categoria: "comida" },
        { nombre: "Sushi Burger Crunch", ingredientes: "Base de arroz frito, camarones tempura, aderezo spicy y aguacate.", categoria: "comida" },
        { nombre: "Monstruosa Doble", ingredientes: "Dos carnes, queso doble, lechuga, jitomate y cebolla crujiente.", categoria: "comida" },
        { nombre: "BBQ Atascada", ingredientes: "Alitas cubiertas con clásica salsa BBQ de sabor intenso, dulce y ahumado.", categoria: "alitas", especialidad: true },
        { nombre: "Tamarindo Endiablado", ingredientes: "Mezcla de tamarindo dulce con el picor del habanero.", categoria: "alitas", especialidad: true },
        { nombre: "Infierno habanero", ingredientes: "Alitas bañadas en salsa habanero original.", categoria: "alitas" },
        { nombre: "Mango Explosión Atascada", ingredientes: "Alitas bañadas en salsa habanero con mango, para que de un toque dulzor y picoso.", categoria: "alitas" },
        { nombre: "Búfalo Brutal", ingredientes: "Alitas bañadas en salsa búfalo.", categoria: "alitas" },

        { nombre: "Banana Dorada del Camino", ingredientes: "Plátano macho con opción de añadir queso manchego.", categoria: "brochetas", especialidad: true },
        { nombre: "CamarónQ atascado", ingredientes: "Camarones con queso philadelphia, envueltos en panko.", categoria: "brochetas" },
        { nombre: "Flan de cajeta", ingredientes: "Flan napolitano cremoso con el toque tradicional de la cajeta.", categoria: "postre", especialidad: true },
        { nombre: "Volcán", ingredientes: "Bizcocho de chocolate con centro líquido caliente y helado.", categoria: "postre", especialidad: true }
    ],
    bebidas: [
        { nombre: "Mojitazo Puro y Santo", detalles: "Menta, limón y agua mineral, si gusta algún sabor en específico se agrega coulis del sabor..", sabores: "Piña, Frutos Rojos, Fresa y Tamarindo.", categoria: "bebida", especialidad: true },
        { nombre: "Tinto del Camino", detalles: "Vino tinto con sirope de arandano, limón, refresco sabor limón vino tinto .", categoria: "bebida", especialidad: true },
        { nombre: "Parada Burbujeante", detalles: "Sodas con agua mineral, saborizante preferido y bubas que explotan al morderlas.", sabores: "Frutos Rojos, Manzana Verde y Fresa.", categoria: "bebida" },
        { nombre: "La Ruta del Desvelo Elegante (capuchino)", detalles: "Café espresso con leche vaporizada (Capuchino).", sabores: "Amaretto, Vainilla, Cocoa o Natural.", categoria: "bebida" },
        { nombre: "Sacudidas del Atascón", detalles: "Malteadas cremosas elaboradas con helado del sabor preferente y leche.", sabores: "Chocolate, Vainilla y Fresa.", categoria: "bebida" },
        { nombre: "Carajillo", detalles: "Mezcla equilibrada de café espresso y licor.", categoria: "bebida" },
        { nombre: "Parada Cítrica", detalles: "Limonadas o naranjadas naturales (agua) o minerales (agua mineral).", categoria: "bebida" },
        { nombre: "Refrescón Obligado", detalles: "Refrescos clásicos.", sabores: "Coca-Cola, Manzanita, Boing (mango y guayaba) Fanta.", categoria: "bebida" },
        { nombre: "Colada del Paraíso Atascado", detalles: "Bebida de piña, coco, hielos y leche evaporada.", categoria: "bebida" }
    ]
};

// 2. FUNCIÓN DE COMPARACIÓN FLEXIBLE (Tolerancia a ortografía)
function esParecido(textoUsuario, textoMenu) {
    const usuario = textoUsuario.toLowerCase();
    const menu = textoMenu.toLowerCase();
    if (menu.includes(usuario) || usuario.includes(menu)) return true;
    let coincidencias = 0;
    const palabrasUsuario = usuario.split(" ");
    const palabrasMenu = menu.split(" ");
    palabrasUsuario.forEach(pU => {
        if (pU.length < 3) return;
        palabrasMenu.forEach(pM => {
            if (pM.includes(pU) || pU.includes(pM)) coincidencias++;
        });
    });
    return coincidencias > 0;
}

// 3. FUNCIÓN DE ENVÍO
function sendMessage() {
    const input = document.getElementById('bot-input');
    const container = document.getElementById('chat-messages');
    const userText = input.value.trim();
    const text = userText.toLowerCase();

    if (userText === "") return;

    const userDiv = document.createElement('div');
    userDiv.className = 'user-msg';
    userDiv.textContent = userText;
    container.appendChild(userDiv);
    input.value = "";

    setTimeout(() => {
        let response = "Le pido una disculpa, no he comprendido su solicitud. ¿Desea conocer nuestras especialidades o los sabores de alguna bebida?";

        // SALUDO
        if (text === "hola" || text.includes("buenos días") || text.includes("buenas tardes")) {
            response = "Buenas tardes. Sea bienvenido a 'La Ruta del Atascón'. ¿En qué puedo asistirle el día de hoy?";
        }

        // LÓGICA DE ESPECIALIDADES (Se activa con "especialidad" o "comida")
        else if (text.includes("especialidad") || text.includes("recomendación") || text.includes("recomienda") || text === "comida" || text === "comer") {
            response = "Es un placer presentarle nuestras **Especialidades de la Casa**: <br><br>" +
                       "• 'Hamburguesas': La Vaquera Atascada y La Triple Quesuda.<br>" +
                       "• 'Bebidas': Nuestro Mojitazo y el Tinto del Camino.<br>" +
                       "• 'Alitas': BBQ Atascada y Tamarindo Endiablado.<br>" +
                       "• 'Brochetas': Banana Dorada del Camino.<br>" +
                       "• 'Postres': Flan de cajeta y nuestro Volcán de chocolate.<br><br>" +
                       "¿Desea conocer los ingredientes de alguna de estas opciones?";
        }

        // SABORES Y VARIEDAD
        else if (text.includes("sabores") || text.includes("variedad") || text.includes("qué clases")) {
            let bebida = conocimientoBot.bebidas.find(b => esParecido(text, b.nombre) || 
                         (text.includes("malteada") && b.nombre.includes("Sacudidas")) ||
                         (text.includes("soda") && b.nombre.includes("Burbujeante")) ||
                         (text.includes("capuchino") && b.nombre.includes("Desvelo")));

            if (bebida && bebida.sabores) {
                response = "Con gusto. Para '" + bebida.nombre + "' contamos con los siguientes sabores: '" + bebida.sabores + "'.";
            } else {
                response = "Contamos con gran variedad de sabores en nuestras bebidas. ¿De cuál desea recibir información?";
            }
        }

        // CATEGORÍAS (Búsqueda tolerante)
        else if (text.includes("hamburguesa") || text.includes("burguer") || text.includes("alitas") || text.includes("bebida") || text.includes("postre") || text.includes("brocheta")) {
            let cat = (text.includes("hamburguesa") || text.includes("burguer")) ? "comida" : text.includes("alitas") ? "alitas" : text.includes("postre") ? "postre" : text.includes("brocheta") ? "brochetas" : "bebida";
            const opciones = (cat === "bebida") 
                ? conocimientoBot.bebidas.map(b => b.nombre).join(", ")
                : conocimientoBot.platillos.filter(p => p.categoria === cat).map(p => p.nombre).join(", ");
            response = "En esa categoría le ofrecemos: **" + opciones + "**. <br> ¿Desea conocer los ingredientes de alguna?";
        }

        // INGREDIENTES (Comparación flexible para errores de dedo)
        else if (text.includes("lleva") || text.includes("ingredientes") || text.includes("contiene") || text.length > 5) {
            let item = conocimientoBot.platillos.find(p => esParecido(text, p.nombre)) || 
                       conocimientoBot.bebidas.find(b => esParecido(text, b.nombre));
            
            if (item) {
                response = "Entiendo que consulta sobre '" + item.nombre + "'. Se prepara con: " + (item.ingredientes || item.detalles);
            }
        }

        const botDiv = document.createElement('div');
        botDiv.className = 'bot-msg';
        botDiv.innerHTML = response;
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
    }, 600);
}

// 4. INTERFAZ
function toggleChat() {
    const chat = document.getElementById('chatbot-window');
    const isVisible = (chat.style.display === 'flex');
    chat.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) document.getElementById('bot-input').focus();
}

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('bot-input');
    if(inputField) {
        inputField.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    }

});


function openChat() {
    document.getElementById("chatbot-window").style.display = "block";
    document.getElementById("chatbot-launcher").style.display = "none";
}

function closeChat() {
    document.getElementById("chatbot-window").style.display = "none";
    document.getElementById("chatbot-launcher").style.display = "flex";
}
/*====================*/
/*3d*/
/*====================*/
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-3d');

    // 1. Creamos el elemento model-viewer
    const model3d = document.createElement('model-viewer');

    // 2. Configuramos sus atributos (Como los hacíamos en HTML)
    model3d.src = '3D/hambur.glb'; // ASEGÚRATE DE QUE ESTA RUTA SEA CORRECTA
    model3d.alt = 'Hamburguesa 3D Tripo';
    model3d.autoRotate = true;
    model3d.cameraControls = true;
    model3d.shadowIntensity = "1";
    model3d.style.width = '100%';
    model3d.style.height = '350px';
    model3d.style.backgroundColor = 'transparent';

    // 3. (Opcional) Detectar si hubo un error al cargar
    model3d.addEventListener('error', (error) => {
        console.error("Error cargando el modelo 3D:", error);
        contenedor.innerHTML = "<p style='color:red;'>No se pudo cargar la hamburguesa 3D. Revisa la ruta.</p>";
    });

    // 4. Metemos el modelo al contenedor de tu página
    contenedor.appendChild(model3d);
});