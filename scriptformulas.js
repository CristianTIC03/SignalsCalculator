//============================= CALCULADORA DE PARÁMETROS ============================= 



//background
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


// Barra de navegación
document.addEventListener("DOMContentLoaded", () => {
    const sliderButtons = document.querySelectorAll(".slider-button");
    const pages = {
        Inicio: "index.html",
        "Calculadora Básica": "calcbase.html",
        "Calculadora de Fórmulas": "calculo-formulas.html",
    };

    let activeIndex = parseInt(localStorage.getItem("activeIndex")) || 0;

        // Marcar el botón activo
        sliderButtons.forEach((btn, i) => {
            if (i === activeIndex) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Resaltar la sección correspondiente (en caso de que tengas elementos para mostrar en la página)
        const sections = document.querySelectorAll(".section");
        sections.forEach((section, i) => {
            if (i === activeIndex) {
                section.classList.add("highlight");
            } else {
                section.classList.remove("highlight");
            }
        });
    

    // Añadir el evento de clic a los botones
    sliderButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto (evitar el refresco inmediato)
            setActiveIndex(index);
            changePage(); // Llamar a la función para cambiar de página con retraso
        });
    });

    // Inicializar la posición del índice activo
    setActiveIndex(activeIndex);
});




// Método general que recibe la fórmula seleccionada (PARA CALCULADORA DE PARÁMETROS)
function calculateFormula(formula) {
    // Primero, se recuperan los valores de entrada según la fórmula seleccionada
    let inputs = getInputs(formula);

    // Luego, se realiza el cálculo usando la fórmula correspondiente
    let result = 0;
    switch (formula) {
        case 'wavelength':
            result = calculateWavelength(inputs);
            break;
        case 'frequency':
            result = calculateFrequency(inputs);
            break;
        case 'velocity':
            result = calculateVelocity(inputs);
            break;
        case 'shannon':
            result = calculateShannon(inputs);
            break;
        case 'snr':
            result = calculateSnr(inputs);
            break;
        case 'snrVoltage':
            result = calculateSnrVoltage(inputs);
            break;
        case 'thermalNoise':
            result = calculateThermalNoise(inputs);
            break;
        case 'noiseVoltage':
            result = calculateNoiseVoltage(inputs);
            break;
        case 'noiseFactor':
            result = calculateNoiseFactor(inputs);
            break;
        case 'noiseIndex':
            result = calculateNoiseIndex(inputs);
            break;
        case 'linkBudget':
            result = calculateLinkBudget(inputs);
            break;
        case 'ber':
            result = calculateBer(inputs);
            break;
        case 'bandwidth':
            result = calculateBandwidth(inputs);
            break;
        case 'wattToDb':
            result = calculateWattToDb(inputs);
            break;
        case 'dbToWatt':
            result = calculateDbToWatt(inputs);
            break;
        default:
            alert('Fórmula no reconocida');
            return;
    }

    // Muestra el resultado
    displayResult(result);
}

// Función para obtener los valores de entrada según la fórmula
function getInputs(formula) {
    let inputs = {};
    switch (formula) {
        case 'wavelength':
            inputs.frequency = parseFloat(document.getElementById('frequency').value);
            inputs.velocity = parseFloat(document.getElementById('velocity').value);
            break;
        case 'frequency':
            inputs.wavelength = parseFloat(document.getElementById('wavelength').value);
            inputs.velocity = parseFloat(document.getElementById('velocity').value);
            break;
        case 'velocity':
            inputs.wavelength = parseFloat(document.getElementById('wavelength').value);
            inputs.frequency = parseFloat(document.getElementById('frequency').value);
            break;
        case 'shannon':
            inputs.bandwidth = parseFloat(document.getElementById('bandwidth').value);
            inputs.snr = parseFloat(document.getElementById('snr').value);
            break;
        case 'snr':
            inputs.power = parseFloat(document.getElementById('power').value);
            inputs.noisePower = parseFloat(document.getElementById('noisePower').value);
            break;
        case 'snrVoltage':
            inputs.voltage = parseFloat(document.getElementById('voltage').value);
            inputs.noiseVoltage = parseFloat(document.getElementById('noiseVoltage').value);
            break;
        case 'thermalNoise':
            inputs.temperature = parseFloat(document.getElementById('temperature').value);
            inputs.bandwidth = parseFloat(document.getElementById('bandwidth').value);
            break;
        case 'noiseVoltage':
            inputs.current = parseFloat(document.getElementById('current').value);
            inputs.resistance = parseFloat(document.getElementById('resistance').value);
            break;
        case 'noiseFactor':
            inputs.snrInput = parseFloat(document.getElementById('snrInput').value);
            inputs.snrOutput = parseFloat(document.getElementById('snrOutput').value);
            break;
        case 'noiseIndex':
            inputs.noiseFactor = parseFloat(document.getElementById('noiseFactor').value);
            break;
        case 'linkBudget':
            inputs.transmitPower = parseFloat(document.getElementById('transmitPower').value);
            inputs.receivePower = parseFloat(document.getElementById('receivePower').value);
            break;
        case 'ber':
            inputs.snr = parseFloat(document.getElementById('snr').value);
            break;
        case 'bandwidth':
            inputs.signalBandwidth = parseFloat(document.getElementById('signalBandwidth').value);
            break;
        case 'wattToDb':
            inputs.watt = parseFloat(document.getElementById('watt').value);
            break;
        case 'dbToWatt':
            inputs.db = parseFloat(document.getElementById('db').value);
            break;
        default:
            alert('Fórmula no reconocida');
            return {};
    }
    return inputs;
}



function showFormula(formula) {
    const formulaBox = document.getElementById('formulaBox');
    const inputsContainer = document.getElementById('inputsContainer');

    // Limpiar los inputs previos
    inputsContainer.innerHTML = '';

    // Ocultar la gráfica al cambiar de fórmula
    const graphContainer = document.querySelector(".graph-container");
    const waveCanvas = document.getElementById("waveCanvas");

    if (graphContainer) {
        graphContainer.style.display = "none"; // Ocultar el contenedor
        const ctx = waveCanvas.getContext("2d");
        ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height); // Limpiar la gráfica
    }

    switch (formula) {
            case 'wavelength':
                formulaBox.innerHTML = `
                    <p class="description">La longitud de onda es la distancia física entre dos puntos a partir de los cuales la onda se repite, calculada como el resultado de dividir la velocidad ente la frecuencia.</p>
                    <h2>λ(m) = V / f</h2>
                `;
                inputsContainer.innerHTML = `
                    ${createInputField('velocityInput', 'Velocidad (V)', 'velocity')}
                    ${createInputField('frequencyInput', 'Frecuencia (f)', 'frequency')}
                `;
                break;
            case 'frequency':
                formulaBox.innerHTML = `
                    <p class="description">La frecuencia es el número de oscilaciones por segundo de una señal.</p>
                    <h2>f(Hz) = V / λ</h2>
                `;
                inputsContainer.innerHTML = `
                    ${createInputField('velocityInput', 'Velocidad (V)', 'velocity')}
                    ${createInputField('wavelengthInput', 'Longitud de onda (λ)', 'distance')}
                `;
                break;
                case 'velocity':
                    formulaBox.innerHTML = `
                        <p class="description">La velocidad es el producto de la frecuencia y la longitud de onda.</p>
                        <h2>V(m/s) = f * λ</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('frequencyInput', 'Frecuencia (f)', 'frequency')}
                        ${createInputField('wavelengthInput', 'Longitud de onda (λ)', 'distance')}
                    `;
                    break;
                
                case 'shannon':
                    formulaBox.innerHTML = `
                        <p class="description">La capacidad de información se calcula como el ancho de banda multiplicado por el logaritmo de la relación señal/ruido.</p>
                        <h2>C(bits/s) = B log2(1 + S/N)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('bandwidthInput', 'Ancho de banda (B)', 'frequency')}
                        ${createInputField('signalInput', 'S', 'power')}
                        ${createInputField('noiseInput', 'N', 'power')}
                    `;
                    break;
                
                case 'snr':
                    formulaBox.innerHTML = `
                        <p class="description">La relación señal-ruido se expresa en decibelios como el logaritmo de la potencia de señal sobre la potencia de ruido.</p>
                        <h2>S/N(dB) = 10 log10(Ps / Pn)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('signalPowerInput', 'Potencia de Señal (Ps)', 'power')}
                        ${createInputField('noisePowerInput', 'Potencia de Ruido (Pn)', 'power')}
                    `;
                    break;
                
                case 'snrVoltage':
                    formulaBox.innerHTML = `
                        <p class="description">La relación señal-ruido en voltaje se calcula utilizando los voltajes de salida y entrada.</p>
                        <h2>S/N(dB) = 20 log10(Vout / Vin)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('outputPowerVInput', 'Potencia de Salida (Vout)', 'powerV')}
                        ${createInputField('inputPowerVInput', 'Potencia de Entrada (Vin)', 'powerV')}
                    `;
                    break;
                
                case 'thermalNoise':
                    formulaBox.innerHTML = `
                        <p class="description">El ruido térmico se calcula utilizando la constante de Boltzmann, la temperatura y el ancho de banda.</p>
                        <h2>N(W) = kTB</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('bandwidthInput', 'Ancho de Banda (B)', 'frequency')}
                        ${createInputField('temperatureInput', 'Temperatura (T)', 'temperature')}
                    `;
                    break;
                
                case 'noiseVoltage':
                    formulaBox.innerHTML = `
                        <p class="description">El voltaje de ruido se calcula en función de la resistencia, el ancho de banda y la temperatura.</p>
                        <h2>V(V) = √(4kTB*R)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('resistanceInput', 'Resistencia (R)', 'ohm')}
                        ${createInputField('bandwidthInput', 'Ancho de Banda (B)', 'frequency')}
                        ${createInputField('temperatureInput', 'Temperatura (T)', 'temperature')}
                    `;
                    break;
                
                case 'noiseFactor':
                    formulaBox.innerHTML = `
                        <p class="description">El factor de ruido se define como la división entre la S/N de entrada y la de salida.</p>
                        <h2>F = (S/N)_in / (S/N)_out</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('inputSNR', 'S/N Entrada', 'db')}
                        ${createInputField('outputSNR', 'S/N Salida', 'db')}
                    `;
                    break;
                
                case 'noiseIndex':
                    formulaBox.innerHTML = `
                        <p class="description">El índice de ruido se calcula en función del factor de ruido.</p>
                        <h2>NI(dB) = 10 * log10(F)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('factorDeRuido', 'Factor de Ruido', '')}
                    `;
                    break;
                
                case 'linkBudget':
                    formulaBox.innerHTML = `
                        <p class="description">El presupuesto de enlace considera la potencia transmitida, las ganancias de las antenas y las pérdidas en el sistema.</p>
                        <h2>Pr(dBm) = Pt + Gt + Gr - L</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('transmittedPower', 'Potencia Transmitida (Pt)', 'power')}
                        ${createInputField('antennaGainTx', 'Ganancia Antena TX (Gt)', 'db')}
                        ${createInputField('antennaGainRx', 'Ganancia Antena RX (Gr)', 'db')}
                        ${createInputField('connectorLosses', 'Pérdida total de conectores', 'db')}
                        <div id="cablesContainer">
                            ${createInputField('cableLoss1', 'Pérdida de cable', 'db', true)}
                        </div>
                        <button class="add-cable-button" onclick="addCableField()">Añadir cable</button>
                        ${createInputField('losses', 'Otras pérdidas  (L)', 'db')}
                    `;
                    break;
                
                case 'ber':
                    formulaBox.innerHTML = `
                        <p class="description">La tasa de error de bit (BER) se calcula como el número de errores sobre el total de bits transmitidos.</p>
                        <h2>BER = (Ne / Nt)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('numErrors', 'Errores (Ne)', '')}
                        ${createInputField('numTotal', 'Total de Bits (Nt)', '')}
                    `;
                    break;
                case 'bandwidth':
                    formulaBox.innerHTML = `
                        <p class="description">El ancho de banda se calcula como la diferencia entre la frecuencia máxima y mínima.</p>
                        <h2>B(Hz) = Fmax - Fmin</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('maxFrequencyInput', 'Frecuencia Máxima (Fmax)', 'frequency')}
                        ${createInputField('minFrequencyInput', 'Frecuencia Mínima (Fmin)', 'frequency')}
                    `;
                    break;
                case 'wattToDb':
                    formulaBox.innerHTML = `
                        <p class="description">Convierte un valor de potencia en decibelios.</p>
                        <h2>P(dB) = 10 log10(P)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('wattInput', 'Potencia (P)', 'power')}
                    `;
                    break;
                
                case 'dbToWatt':
                    formulaBox.innerHTML = `
                        <p class="description">Convierte un valor de decibelios a potencia en vatios.</p>
                        <h2>P(W) = 10^(dB / 10)</h2>
                    `;
                    inputsContainer.innerHTML = `
                        ${createInputField('dbInput', 'Potencia (dBm)', 'db')}
                    `;
                    break;
                    
                    
                            
                default:
                formulaBox.innerHTML = 'Fórmula no definida';
                inputsContainer.innerHTML = '';
    }

    // Resaltar el botón de fórmula activa
    highlightActiveButton(formula);
}




function createUnitDropdown(type) {
    switch (type) {
        case 'velocity':
            return createVelocityDropdown();
        case 'db':
            return createdBDropdown();
        case 'distance':
            return createDistanceDropdown();
        case 'frequency':
            return createFrequencyDropdown();
        case 'power':
            return createPowerDropdown();
        case 'temperature':
            return createTemperatureDropdown();
        case 'ohm':
            return createOhmDropdown();
        default:
        
            return '';
    }
}

function updateConvertedValue(selectElement) {
    const inputElement = selectElement.previousElementSibling; // Encuentra el input anterior al select

    if (!inputElement) {
        console.error("No se encontró el input correspondiente.");
        return;
    }

    const rawValue = parseFloat(inputElement.value);
    const selectedUnit = selectElement.value;

    if (isNaN(rawValue)) {
        return; // No hacer nada si el input está vacío o tiene un valor inválido
    }

    // Convertir a la unidad base
    const convertedValue = convertUnit(rawValue, selectedUnit);

    // Actualizar el input con el valor convertido
    inputElement.value = convertedValue.toFixed(5);
}



// Función para crear un campo de entrada
function createInputField(id, placeholder, type) {
    return `
        <div class="input-group">
            <input id="${id}" type="text" placeholder="${placeholder}" oninput="updateConvertedValue('${id}', '${type}')">
            ${createUnitDropdown(type)}
        </div>
    `;
}

let cableCount = 1;

function addCableField() {
    cableCount++;
    const newField = createInputField(`cableLoss${cableCount}`, 'Pérdida de cable', 'db', true);
    document.getElementById('cablesContainer').insertAdjacentHTML('beforeend', newField);
}

function removeCableField(button) {
    button.parentElement.remove();
}

//DROPDOWN
function createVelocityDropdown() {
    return `
        <select class="unit-dropdown velocity">
            <option value="Km/h">Km / h</option>
            <option value="m/s">m / s</option>
            <option value="cm/s">cm / s</option>
        </select>
    `;
}
function createdBDropdown() {
    return `
        <select class="unit-dropdown db">
            <option value="dB">dB</option>
        </select>
    `;
}
function createOhmDropdown() {
    return `
        <select class="unit-dropdown ohm">
            <option value="Ω">Ω</option>
            <option value="KΩ">KΩ</option>
        </select>
    `;
}

function createTemperatureDropdown() {
    return `
        <select class="unit-dropdown velocity">
            <option value="°C">°C</option>
            <option value="°K">°K</option>
        </select>
    `;
}


function createDistanceDropdown() {
    return `
        <select class="unit-dropdown distance">
            <option value="Km">Km</option>
            <option value="m">m</option>
            <option value="cm">cm</option>
        </select>
    `;
}

function createFrequencyDropdown() {
    return `
        <select class="unit-dropdown frequency">
            <option value="PHz">PHz</option>
            <option value="THz">THz</option>
            <option value="GHz">GHz</option>
            <option value="MHz">MHz</option>
            <option value="kHz">kHz</option>
            <option value="Hz">Hz</option>
            <option value="mHz">mHz</option>
            <option value="µHz">µHz</option>
            <option value="nHz">nHz</option>
            <option value="pHz">pHz</option>
            <option value="fHz">fHz</option>
            <option value="aHz">aHz</option>
        </select>
    `;
}

function createPowerDropdown() {
    return `
        <select class="unit-dropdown power">
            <option value="W">W</option>
            <option value="mW">mW</option>
            <option value="dBm">dBm</option>
        </select>
    `;
}

function createPowerVDropdown() {
    return `
        <select class="unit-dropdown power">
            <option value="kV">kV</option>
            <option value="V">V</option>
            <option value="mV">mV</option>
        </select>
    `;
}

// Variable para rastrear el input activo
let activeInput = null;

document.addEventListener('click', function(event) {
    if (event.target.tagName === 'INPUT') {
        activeInput = event.target;
    }
});

// Función para resaltar el botón de fórmula activa
function highlightActiveButton(activeFormula) {
    const buttons = document.querySelectorAll("button[id$='Button']");
    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    const activeButton = document.getElementById(`${activeFormula}Button`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

function plotSineWave(result) {
    const canvasContainer = document.querySelector(".graph-container");
    const ctx = document.getElementById("waveCanvas").getContext("2d");

    // Mostrar el contenedor cuando se genera la gráfica
    canvasContainer.style.display = "flex";

    // Destruir la gráfica anterior si existe
    if (window.sineChart) {
        window.sineChart.destroy();
    }

    // Datos de la onda senoidal
    const dataPoints = 100;
    const xValues = [];
    const yValues = [];
    const amplitude = 1;

    for (let i = 0; i < dataPoints; i++) {
        let x = (i / dataPoints) * (4 * Math.PI);
        let y = amplitude * Math.sin((2 * Math.PI / result) * x);
        xValues.push(x);
        yValues.push(y);
    }

    // Crear gráfica con Chart.js
    window.sineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Señal Senoidal",
                data: yValues,
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            scales: {
                x: { display: false },
                y: { suggestedMin: -1.5, suggestedMax: 1.5 }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            }
        }
    });
}



// Función para calcular resultados personalizados
function calculateCustomResult() {
    const formula = document.getElementById("formulaBox").textContent;
    let result = 0;

    // Longitud de onda
    if (formula.includes("λ(m) = V / f")) {
        const velocity =convertUnit(parseFloat(document.getElementById("velocityInput").value), document.getElementById("velocityInput").nextElementSibling.value);
        const frequency = convertUnit(parseFloat(document.getElementById("frequencyInput").value), document.getElementById("frequencyInput").nextElementSibling.value);

        if (frequency === 0) {
            displayResult("Error: Frecuencia no puede ser cero");
            return;
        }

        result = (velocity / frequency);
        // Llamar a la función para generar la gráfica
        plotSineWave(result);
        document.getElementById('display').textContent = `λ = ${result.toFixed(2)} m`;
    }

    // Frecuencia
    else if (formula.includes("f(Hz) = V / λ")) {
        const velocity = parseFloat(document.getElementById("velocityInput").value);
        const wavelength = parseFloat(document.getElementById("wavelengthInput").value);

        if (wavelength === 0) {
            displayResult("Error: Longitud de onda no puede ser cero");
            return;
        }

        result = velocity / wavelength;
        plotSineWave(result);
        document.getElementById('display').textContent = `f = ${result.toFixed(2)} Hz`;
    }

    // Velocidad
    else if (formula.includes("V(m/s) = f * λ")) {
        const frequency = parseFloat(document.getElementById("frequencyInput").value);
        const wavelength = parseFloat(document.getElementById("wavelengthInput").value);

        result = frequency * wavelength;
    }

    // Shannon
    else if (formula.includes('C(bits/s) = B log2(1 + S/N)')) {
        const bandwidthUnit = document.querySelector('#bandwidthInput + .unit-dropdown').value;
        const bandwidth = convertUnit(parseInput(document.getElementById('bandwidthInput').value), bandwidthUnit);
        const signal = parseInput(document.getElementById('signalInput').value);
        const noise = parseInput(document.getElementById('noiseInput').value);
        result = bandwidth * Math.log2(1 + (signal / noise)); // No se requiere dividir por 100
        result=result.toFixed(2);
        displayResult(result);
    }

    // Relación señal a ruido
    else if (formula.includes('S/N(dB) = 10 log10(Ps / Pn)')) {
        const signalPowerUnit = document.querySelector('#signalPowerInput + .unit-dropdown').value;
        const signalPower = convertUnit(parseInput(document.getElementById('signalPowerInput').value), signalPowerUnit);
        
        const noisePowerUnit = document.querySelector('#noisePowerInput + .unit-dropdown').value;
        const noisePower = convertUnit(parseInput(document.getElementById('noisePowerInput').value), noisePowerUnit);
        
        result = 10 * Math.log10(signalPower / noisePower); // No se requiere dividir por 100
        displayResult(result);
    }

    // Relación señal a ruido en voltaje
    else if (formula.includes('S/N(dB) = 20 log10(Vout / Vin)')) {
        const inputPowerVUnit = document.querySelector('#inputPowerVInput + .unit-dropdown').value;
        const inputPowerV = convertUnit(parseInput(document.getElementById('inputPowerVInput').value), inputPowerVUnit);
        
        const outputPowerVUnit = document.querySelector('#outputPowerVInput + .unit-dropdown').value;
        const outputPowerV = convertUnit(parseInput(document.getElementById('outputPowerVInput').value), outputPowerVUnit);
        
        result = 20 * Math.log10(outputPowerV/inputPowerV); // No se requiere dividir por 100
        displayResult(result);
    }

    // Ruido térmico
    else if (formula.includes('N(W) = kTB')) {
        const bandwidthUnit = document.querySelector('#bandwidthInput + .unit-dropdown').value;
        const bandwidth = convertUnit(parseInput(document.getElementById('bandwidthInput').value), bandwidthUnit);
        
        const temperatureUnit = document.querySelector('#temperatureInput + .unit-dropdown').value; // Corrige aquí para obtener la unidad de temperatura
        const temperature = convertUnit(parseInput(document.getElementById('temperatureInput').value), temperatureUnit);
        
        const k = 1.38 * Math.pow(10, -23); // Constante de Boltzmann

        // Calcular el resultado usando la fórmula N(W) = kTB
        result = k * bandwidth * temperature; // Asegúrate de que esta sea la fórmula correcta

        // Convertir el resultado a notación científica
        result = result.toExponential(2); // Cambia 2 por el número de decimales que desees
        displayResult(result);

    }

    // Voltaje de ruido
    else if (formula.includes('V(V) = √(4kTB*R)')) {
        const bandwidthUnit = document.querySelector('#bandwidthInput + .unit-dropdown').value;
        const bandwidth = convertUnit(parseInput(document.getElementById('bandwidthInput').value), bandwidthUnit);
        const temperature = parseInput(document.getElementById('temperatureInput').value);
        const resistanceUnit = document.querySelector('#resistanceInput + .unit-dropdown').value;
        const resistance = convertUnit(parseInput(document.getElementById('resistanceInput').value), resistanceUnit);
        
        const k = 1.38 * Math.pow(10, -23); // Constante de Boltzmann
        result = Math.sqrt(4 * k * temperature * bandwidth * resistance); // No se requiere dividir por 100
        result = result.toExponential(2); // Cambia 2 por el número de decimales que desees
        displayResult(result);

    }

    //Factor de ruiido
    else if (formula.includes('F = (S/N)_in / (S/N)_out')) {
        const inputSNR = document.querySelector('#inputSNR').value;
        const outputSNR = document.querySelector('#outputSNR').value;

        if (outputSNR === 0) {
            alert('S/N de salida no puede ser cero.');
            result = 'Error';
        } else {
            result = inputSNR / outputSNR;
        }
        displayResult(result);
    }

    // Índice de Ruido
    else if (formula.includes('NI(dB) = 10 * log10(F)')) {
        const factor = document.querySelector('#factorDeRuido').value;
        result = 10 * Math.log10(factor).toExponential(2); // No se requiere dividir por 100
        displayResult(result);
    }

    // Presupuesto de enlace
    else if (formula.includes('Pr(dBm) = Pt + Gt + Gr - L')) {
        // Obtener y convertir la potencia transmitida (Pt) con su unidad
        const transmittedPowerUnit = document.querySelector('#transmittedPower + select.unit-dropdown').value;
        const transmittedPower = convertUnit(
            parseFloat(document.getElementById('transmittedPower').value),
            transmittedPowerUnit
        );

        // Obtener las ganancias y pérdidas sin conversión de unidades
        const antennaGainTx = parseFloat(document.getElementById('antennaGainTx').value);
        const antennaGainRx = parseFloat(document.getElementById('antennaGainRx').value);
        const connectorLosses = parseFloat(document.getElementById('connectorLosses').value);
        const otherLosses = parseFloat(document.getElementById('losses').value);

        // Cálculo inicial del presupuesto de enlace
        result = transmittedPower + antennaGainTx + antennaGainRx - connectorLosses - otherLosses;

        // Sumar las pérdidas de los cables
        const cableLosses = document.querySelectorAll('#cablesContainer input');
        cableLosses.forEach(input => {
            const cableLossUnit = input.nextElementSibling.value; // Select asociado al input
            const lossValue = parseFloat(input.value); // Sin conversión de unidades
            result -= lossValue; // Restar cada pérdida de cable
            displayResult(result);
        });

    }

    // BER
    else if (formula.includes('BER = (Ne / Nt)')) {
        const numErrors = parseFloat(document.getElementById('numErrors').value);
        const numTotal = parseFloat(document.getElementById('numTotal').value);

        // Validación de entradas
        if (isNaN(numErrors) || isNaN(numTotal)) {
            alert("Por favor ingrese valores válidos para los errores y el total de bits.");
            return; // Salir si hay un valor no válido
        }

        if (numTotal === 0) {
            alert("El total de bits (Nt) no puede ser cero.");
            return; // Salir si el total es cero
        }

        // Cálculo del BER
        result = numErrors / numTotal;
        result = result.toExponential(2);

        displayResult(result);
    }

    // Cálculo del Ancho de Banda
    else if (formula.includes('B(Hz) = Fmax - Fmin')) {
        const maxFrequencyUnit = document.querySelector('#maxFrequencyInput + select.unit-dropdown').value;
        const maxFrequency = convertUnit(parseFloat(document.getElementById('maxFrequencyInput').value), maxFrequencyUnit);
        
        const minFrequencyUnit = document.querySelector('#minFrequencyInput + select.unit-dropdown').value;
        const minFrequency = convertUnit(parseFloat(document.getElementById('minFrequencyInput').value), minFrequencyUnit);
        
        // Cálculo del ancho de banda
        result = maxFrequency - minFrequency;

        // Mostrar el resultado
        document.getElementById('display').textContent = `Ancho de Banda: ${result.toFixed(2)} Hz`; // Cambia la unidad si es necesario
    }

    // Watt a dB
    else if (formula.includes('P(dB) = 10 log10(P)')) {
        const power = parseFloat(document.getElementById('wattInput').value);
        result = 10 * Math.log10(power); // No se requiere dividir por 100
        result=result.toFixed(2);
        displayResult(result);
    }

    // Conversión de dBm a W
    else if (formula.includes('P(W) = 10^(dB / 10)')) {
        const dbm = parseFloat(document.getElementById('dbInput').value); // Obtiene el valor en dBm

        if (isNaN(dbm)) {
            alert('Por favor, introduce un valor válido para la potencia en dBm.');
            return; // Detiene la ejecución si hay errores
        }

        // Cálculo de potencia en vatios (sin considerar potencia de referencia)
        result = Math.pow(10, (dbm / 10)); // Conversión directa

        // Mostrar el resultado
        document.getElementById('display').textContent = `P(W): ${result.toFixed(2)} W`;
    }


    }

// Función para parsear valores de entrada
function parseInput(value) {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue; // Retorna 0 si no es un número válido
}



// Función para convertir unidades
function convertUnit(value, unit) {
    
    const conversions = {
        // Frecuencia
        'Hz': value * 1,
        'kHz': value * 1e3,
        'MHz': value * 1e6,
        'GHz': value * 1e9,
        'THz': value * 1e12,
        'PHz': value * 1e15,
        'mHz': value * 1e-3,
        'µHz': value * 1e-6,
        'nHz': value * 1e-9,
        'pHz': value * 1e-12,
        'fHz': value * 1e-15,
        'aHz': value * 1e-18,
        // Velocidad
        'Km/h': value * 0.2778, // Conversión a m/s
        'm/s': value * 1,
        'cm/s': value / 100,
        // Distancia
        'Km': value * 1000,
        'm': value * 1,
        'cm': value / 100,
        // Tiempo
        'h': value * 3600,
        'min': value * 60,
        'ms': value / 1000,
        // Voltaje
        'kV': value * 1000,
        'V': value * 1,
        'mV': value / 1000,
        // Resistencia
        'kΩ': value * 1000,
        'Ω': value * 1,
        // Temperatura
        '°C': value + 273.15, // Conversión a Kelvin
        '°K': value * 1,
        // Potencia
        'W': value * 1,
        'mW': value / 1000,
        'dBm': 10 * Math.log10(value) + 30,
        'dB': value * 1,
    };
    return conversions[unit] || value; // Retorna el valor original si no hay conversión
}

// Función para mostrar el resultado en el display
function displayResult(result) {
    const display = document.getElementById('display');
    if (typeof result === 'number' && !isNaN(result)) {
        document.getElementById('display').textContent = `Resultado: ${result.toFixed(2)}`;
    } else {
        document.getElementById('display').textContent = 'Error: Cálculo no válido';
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



//FUNCIONES QUE TOMAN LOS VALORES Y LOS ENVIAN - 15 FÓRMULAS DE CALCULADORA DE PARÁMETROS

function calculateWavelength(inputs) {
    if (inputs.frequency && inputs.velocity) {
        return inputs.velocity / inputs.frequency;
    }
    alert('Por favor, ingrese valores válidos para frecuencia y velocidad.');
    return 0;
}

function calculateFrequency(inputs) {
    if (inputs.wavelength && inputs.velocity) {
        return inputs.velocity / inputs.wavelength;
    }
    alert('Por favor, ingrese valores válidos para longitud de onda y velocidad.');
    return 0;
}

function calculateVelocity(inputs) {
    if (inputs.wavelength && inputs.frequency) {
        return inputs.wavelength * inputs.frequency;
    } else {
        alert('Por favor, ingrese valores válidos para longitud de onda y frecuencia.');
        return 0;
    }
}

function calculateShannon(inputs) {
    if (inputs.bandwidth && inputs.snr) {
        return inputs.bandwidth * Math.log2(1 + Math.pow(10, inputs.snr / 10));
    } else {
        alert('Por favor, ingrese valores válidos para ancho de banda y relación S/N.');
        return 0;
    }
}

function calculateSnr(inputs) {
    if (inputs.power && inputs.noisePower) {
        return 10 * Math.log10(inputs.power / inputs.noisePower);
    }
    alert('Por favor, ingrese valores válidos para potencia y potencia de ruido.');
    return 0;
}

function calculateSnrVoltage(inputs) {
    if (inputs.voltage && inputs.noiseVoltage) {
        return 20 * Math.log10(inputs.voltage / inputs.noiseVoltage);
    }
    alert('Por favor, ingrese valores válidos para voltaje y voltaje de ruido.');
    return 0;
}

function calculateThermalNoise(inputs) {
    if (inputs.temperature && inputs.bandwidth) {
        return 1.38e-23 * inputs.temperature * inputs.bandwidth;
    }
    alert('Por favor, ingrese valores válidos para temperatura y ancho de banda.');
    return 0;
}

function calculateNoiseVoltage(inputs) {
    if (inputs.current && inputs.resistance) {
        return Math.sqrt(4 * 1.38e-23 * 300 * inputs.bandwidth * inputs.resistance);
    }
    alert('Por favor, ingrese valores válidos para corriente y resistencia.');
    return 0;
}

function calculateNoiseFactor(inputs) {
    if (inputs.snrInput && inputs.snrOutput) {
        return 1 + (inputs.snrOutput / inputs.snrInput);
    }
    alert('Por favor, ingrese valores válidos para SNR de entrada y salida.');
    return 0;
}

function calculateNoiseIndex(inputs) {
    if (inputs.noiseFactor) {
        return 10 * Math.log10(inputs.noiseFactor);
    }
    alert('Por favor, ingrese un valor válido para el factor de ruido.');
    return 0;
}

function calculateLinkBudget(inputs) {
    if (inputs.transmitPower && inputs.receivePower) {
        return inputs.transmitPower - inputs.receivePower;
    }
    alert('Por favor, ingrese valores válidos para potencia de transmisión y recepción.');
    return 0;
}

function calculateBer(inputs) {
    if (inputs.snr) {
        return Math.pow(10, -inputs.snr / 10);
    }
    alert('Por favor, ingrese un valor válido para SNR.');
    return 0;
}

function calculateBandwidth(inputs) {
    if (inputs.signalBandwidth) {
        return inputs.signalBandwidth;
    }
    alert('Por favor, ingrese un valor válido para el ancho de banda de la señal.');
    return 0;
}

function calculateWattToDb(inputs) {
    if (inputs.watt) {
        return 10 * Math.log10(inputs.watt);
    }
    alert('Por favor, ingrese un valor válido para la potencia en watt.');
    return 0;
}

function calculateDbToWatt(inputs) {
    if (inputs.db) {
        return Math.pow(10, inputs.db / 10);
    }
    alert('Por favor, ingrese un valor válido para el valor en dB.');
    return 0;
}
   





// Función para agregar valor al input activo
function appendToActiveInput(value) {
    if (activeInput) {
        const currentValue = activeInput.value;
        const startPos = activeInput.selectionStart;
        const endPos = activeInput.selectionEnd;
        activeInput.value = currentValue.substring(0, startPos) + value + currentValue.substring(endPos);
        activeInput.selectionStart = activeInput.selectionEnd = startPos + value.length;
    } else {
        appendToDisplay(value);
    }
}










// Función para eliminar el último carácter del display
function backspace() {
    const display = document.getElementById('display');
    display.textContent = display.textContent.slice(0, -1) || '0';
}

// Función para agregar texto al display
function appendToDisplay(value) {
    let display = document.getElementById('display');
    display.textContent = display.textContent === '0' ? value : display.textContent + value;
}








// Función para agregar un botón de fórmula
function addFormulaButton(formula) {
    const button = document.createElement('button');
    button.id = `${formula}Button`;
    button.textContent = formula;
    button.addEventListener('click', () => showFormula(formula));
    document.getElementById('buttonsContainer').appendChild(button);
}

// Añadir botones de fórmula al iniciar
['wavelength', 'frequency', 'velocity', 'shannon', 'snr', 'snrVoltage', 'thermalNoise', 'noiseVoltage', 'noiseFactor', 'noiseIndex', 'linkBudget', 'ber', 'bandwidth'].forEach(addFormulaButton);
function appendToDisplay(value) {
    let display = document.getElementById('display');
    if (display.textContent === 'Error') {
        clearDisplay();
    }
    display.textContent += value;
}


/*
function backspace() {
    let display = document.getElementById('display');
    if (display.textContent === 'Error') {
        clearDisplay();
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}
*/

