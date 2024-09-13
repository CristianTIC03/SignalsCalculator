function appendToDisplay(value) {
    let display = document.getElementById('display');
    if (display.textContent === 'Error') {
        clearDisplay();
    }
    display.textContent += value;
}

function clearDisplay() {
    document.getElementById('display').textContent = '';
}

function backspace() {
    let display = document.getElementById('display');
    if (display.textContent === 'Error') {
        clearDisplay();
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function calculateResult() {
    try {
        let display = document.getElementById('display');
        let expression = display.textContent;

        // Replace custom function names with Math functions
        expression = expression
            .replace(/log10/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/\^/g, '**'); // Use ** for exponentiation

        display.textContent = eval(expression);
    } catch (error) {
        display.textContent = 'Error';
    }
}

function showFormula(type) {
    let formulaBox = document.getElementById('formulaBox');
    let inputsContainer = document.getElementById('inputsContainer');
    
    // Botones
    let wavelengthButton = document.getElementById('wavelengthButton');
    let frequencyButton = document.getElementById('frequencyButton');
    let velocityButton = document.getElementById('velocityButton');
    
    // Quitar la clase activa de todos los botones
    wavelengthButton.classList.remove('button-active');
    frequencyButton.classList.remove('button-active');
    velocityButton.classList.remove('button-active');
    
    if (type === 'wavelength') {
        formulaBox.innerHTML = `
            <div style="display: flex; align-items: center;">
                <div>λ =</div>
                <div class="fraction" style="margin-left: 10px;">
                    <span class="numerator">V</span>
                    <span class="denominator">f</span>
                </div>
            </div>
        `;
        inputsContainer.innerHTML = `
            <div>
                <label for="v">Velocidad (V):</label>
                <input type="number" id="v" step="any">
            </div>
            <div>
                <label for="f">Frecuencia (f):</label>
                <input type="number" id="f" step="any">
            </div>
        `;
        wavelengthButton.classList.add('button-active');
    } else if (type === 'frequency') {
        formulaBox.innerHTML = `
            <div style="display: flex; align-items: center;">
                <div>f =</div>
                <div class="fraction" style="margin-left: 10px;">
                    <span class="numerator">V</span>
                    <span class="denominator">λ</span>
                </div>
            </div>
        `;
        inputsContainer.innerHTML = `
            <div>
                <label for="v">Velocidad (V):</label>
                <input type="number" id="v" step="any">
            </div>
            <div>
                <label for="lambda">Longitud de Onda (λ):</label>
                <input type="number" id="lambda" step="any">
            </div>
        `;
        frequencyButton.classList.add('button-active');
    } else if (type === 'velocity') {
        formulaBox.innerHTML = `
            <div style="display: flex; align-items: center;">
                <div>V =</div>
                <div class="fraction" style="margin-left: 10px;">
                    <span class="numerator">f</span>
                    <span class="denominator">λ</span>
                </div>
            </div>
        `;
        inputsContainer.innerHTML = `
            <div>
                <label for="f">Frecuencia (f):</label>
                <input type="number" id="f" step="any">
            </div>
            <div>
                <label for="lambda">Longitud de Onda (λ):</label>
                <input type="number" id="lambda" step="any">
            </div>
        `;
        velocityButton.classList.add('button-active');
    }
}


function calculateCustomResult() {
    let formulaBox = document.getElementById('formulaBox');
    let display = document.getElementById('display');
    let result;

    if (formulaBox.innerHTML.includes('λ =')) {
        let v = parseFloat(document.getElementById('v').value);
        let f = parseFloat(document.getElementById('f').value);
        if (isNaN(v) || isNaN(f) || f === 0) {
            display.textContent = 'Error: Ingrese valores válidos';
        } else {
            result = v / f;
            display.textContent = `λ = ${result}`;
        }
    } else if (formulaBox.innerHTML.includes('f =')) {
        let v = parseFloat(document.getElementById('v').value);
        let lambda = parseFloat(document.getElementById('lambda').value);
        if (isNaN(v) || isNaN(lambda) || lambda === 0) {
            display.textContent = 'Error: Ingrese valores válidos';
        } else {
            result = v / lambda;
            display.textContent = `f = ${result}`;
        }
    } else if (formulaBox.innerHTML.includes('V =')) {
        let f = parseFloat(document.getElementById('f').value);
        let lambda = parseFloat(document.getElementById('lambda').value);
        if (isNaN(f) || isNaN(lambda)) {
            display.textContent = 'Error: Ingrese valores válidos';
        } else {
            result = f * lambda;
            display.textContent = `V = ${result}`;
        }
    }
}
