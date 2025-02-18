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









