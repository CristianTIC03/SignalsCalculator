document.addEventListener("DOMContentLoaded", () => {
    const sliderButtons = document.querySelectorAll(".slider-button");
    const pages = {
        "Calculadora Básica": "calcbase.html",
        Inicio: "index.html",
        "Calculadora de Fórmulas": "calculo-formulas.html",
    };

    // Obtener el índice activo o establecerlo en 0 (Inicio)
    let activeIndex = localStorage.getItem("activeIndex");
    if (activeIndex === null) {
        activeIndex = 0;  // Si no hay un índice guardado, inicia en Inicio
    } else {
        activeIndex = parseInt(activeIndex);
    }

    // Marcar el botón activo
    sliderButtons.forEach((btn, i) => {
        if (i === activeIndex) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Evento de clic en los botones de navegación
    sliderButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto
            setActiveIndex(index);
            changePage(index);  // Llamar a la función que cambia de página
        });
    });

    // Establecer el índice activo en localStorage y resaltar botón
    function setActiveIndex(index) {
        localStorage.setItem("activeIndex", index);
        sliderButtons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    // Función para cambiar de página
    function changePage(index) {
        const pageNames = Object.keys(pages);
        const pageURL = pages[pageNames[index]];
        if (pageURL) {
            window.location.href = pageURL;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const videoSources = ["ondascolores.mp4", "panalantenas.mp4", "frecuencia.mp4", "frec2.mp4"];
    let currentVideoIndex = 0;
    const backgroundVideo = document.getElementById("backgroundVideo");
    const videoSource = document.getElementById("videoSource");

    function changeVideoSource() {
        // Cambiar al siguiente video
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        videoSource.src = videoSources[currentVideoIndex];
        // Recargar y reproducir el video
        backgroundVideo.load();
        backgroundVideo.play();
    }

    // Detectar cuando el video actual termina
    backgroundVideo.addEventListener("ended", changeVideoSource);
});


// Función para calcular el resultado
function calculateResult() {
    try {
        let result = eval(currentInput); // Evalúa la expresión matemática
        display.textContent = result;
        currentInput = result.toString(); // Guarda el resultado para continuar operando
    } catch (error) {
        display.textContent = "Error"; // Muestra "Error" si la expresión no es válida
        currentInput = "";
    }
}


// Variables globales (PARA CALCULADORA BASE) 
let display = document.getElementById("display");
let currentInput = "";  // Aquí almacenamos la operación actual

// Función para añadir valores al display
function appendToDisplay(value) {
    currentInput += value;
    display.textContent = currentInput;
}

// Función para limpiar la pantalla
function clearDisplay() {
    currentInput = "";
    display.textContent = "0";
}

// Función para borrar un carácter
function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
        display.textContent = "0";
    } else {
        display.textContent = currentInput;
    }
}









