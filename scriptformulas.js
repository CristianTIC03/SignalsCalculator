//============================= CALCULADORA DE PARÁMETROS ============================= 

//background
document.addEventListener("DOMContentLoaded", function () {
    const videoSources = ["ondascolores.mp4", "panalantenas.mp4", "frecuencia.mp4", "frec2.mp4"];
    let currentVideoIndex = 0;
    const backgroundVideo = document.getElementById("backgroundVideo");
    const videoSource = document.getElementById("videoSource");

    function changeVideoSource() {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        videoSource.src = videoSources[currentVideoIndex];
        backgroundVideo.load();
        backgroundVideo.play();
    }

    backgroundVideo.addEventListener("ended", changeVideoSource);
});

// Barra de navegación
document.addEventListener("DOMContentLoaded", () => {
    const sliderButtons = document.querySelectorAll(".slider-button");
    const pages = {
        "Calculadora Básica": "calcbase.html",
        Inicio: "index.html",
        "Calculadora de Fórmulas": "calculo-formulas.html",
    };

    let activeIndex = localStorage.getItem("activeIndex");
    if (activeIndex === null) {
        activeIndex = 0;
    } else {
        activeIndex = parseInt(activeIndex);
    }

    sliderButtons.forEach((btn, i) => {
        if (i === activeIndex) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    sliderButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            setActiveIndex(index);
            changePage(index);
        });
    });

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

    function changePage(index) {
        const pageNames = Object.keys(pages);
        const pageURL = pages[pageNames[index]];
        if (pageURL) {
            window.location.href = pageURL;
        }
    }
});

//FUNCIÓN PARA LLEVAR AL USUARIO AL CAMPO DE INGRESO DE DATOS
function scrollToTarget() {
    const target = document.getElementById("scrollTarget");
    target.scrollIntoView({ behavior: 'smooth' });
}

// Función para mostrar fórmulas
function showFormula(formula) {
    const formulaBox = document.getElementById('formulaBox');
    const inputsContainer = document.getElementById('inputsContainer');

    inputsContainer.innerHTML = '';

    const graphContainer = document.querySelector(".graph-container");
    const waveCanvas = document.getElementById("waveCanvas");

    if (graphContainer) {
        graphContainer.style.display = "none";
        const ctx = waveCanvas.getContext("2d");
        ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    }

    switch (formula) {
        case 'wavelength':
            formulaBox.innerHTML = `
                <p class="description">La longitud de onda es la distancia física entre dos puntos a partir de los cuales la onda se repite, calculada como el resultado de dividir la velocidad entre la frecuencia.</p>
                <h2>λ(m) = V / f</h2>
                <p><strong>Nota:</strong> Se generará una gráfica de la onda correspondiente</p>
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
                <p><strong>Nota:</strong> Se generará una gráfica de la onda correspondiente</p>
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
                <h2>C(bits/s) = B log₂(1 + S/N)</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('bandwidthInput', 'Ancho de banda (B)', 'frequency')}
                ${createInputField('signalInput', 'Potencia de Señal (S)', 'power')}
                ${createInputField('noiseInput', 'Potencia de Ruido (N)', 'power')}
            `;
            break;
        case 'snr':
            formulaBox.innerHTML = `
                <p class="description">La relación señal-ruido se expresa en decibelios como el logaritmo de la potencia de señal sobre la potencia de ruido.</p>
                <h2>S/N(dB) = 10 log₁₀(Ps / Pn)</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('signalPowerInput', 'Potencia de Señal (Ps)', 'power')}
                ${createInputField('noisePowerInput', 'Potencia de Ruido (Pn)', 'power')}
            `;
            break;
        case 'snrVoltage':
            formulaBox.innerHTML = `
                <p class="description">La relación señal-ruido en voltaje se calcula utilizando los voltajes de salida y entrada.</p>
                <h2>S/N(dB) = 20 log₁₀(Vs / Vn)</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('signalVoltageInput', 'Voltaje de Señal (Vs)', 'voltage')}
                ${createInputField('noiseVoltageInput', 'Voltaje de Ruido (Vn)', 'voltage')}
            `;
            break;
        case 'thermalNoise':
            formulaBox.innerHTML = `
                <p class="description">El ruido térmico se calcula utilizando la constante de Boltzmann, la temperatura y el ancho de banda.</p>
                <h2>N(W) = kTB</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('temperatureInput', 'Temperatura (T)', 'temperature')}
                ${createInputField('bandwidthInput', 'Ancho de Banda (B)', 'frequency')}
            `;
            break;
        case 'noiseVoltage':
            formulaBox.innerHTML = `
                <p class="description">El voltaje de ruido se calcula en función de la resistencia, el ancho de banda y la temperatura.</p>
                <h2>V(V) = √(4kTB·R)</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('resistanceInput', 'Resistencia (R)', 'resistance')}
                ${createInputField('bandwidthInput', 'Ancho de Banda (B)', 'frequency')}
                ${createInputField('temperatureInput', 'Temperatura (T)', 'temperature')}
            `;
            break;
        case 'noiseFactor':
            formulaBox.innerHTML = `
                <p class="description">El factor de ruido se define como la división entre la S/N de entrada y la de salida.</p>
                <h2>F = (S/N)ₑₙₜᵣₐdₐ / (S/N)ₛₐₗᵢdₐ</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('snrInput', 'SNR Entrada (lineal)', 'dimensionless')}
                ${createInputField('snrOutput', 'SNR Salida (lineal)', 'dimensionless')}
            `;
            break;
        case 'noiseIndex':
            formulaBox.innerHTML = `
                <p class="description">El índice de ruido se calcula en función del factor de ruido.</p>
                <h2>NI(dB) = 10 · log₁₀(F)</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('noiseFactorInput', 'Factor de Ruido (F)', 'dimensionless')}
            `;
            break;
        case 'linkBudget':
            formulaBox.innerHTML = `
                <p class="description">El presupuesto de enlace considera la potencia transmitida, las ganancias de las antenas y las pérdidas en el sistema.</p>
                <h2>Pr(dBm) = Pt + Gt + Gr - L</h2>
                <p><strong>Nota:</strong> Todas las unidades deben estar en dB o dBm</p>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('transmittedPower', 'Potencia Transmitida (Pt)', 'power')}
                ${createInputField('antennaGainTx', 'Ganancia Antena TX (Gt)', 'db')}
                ${createInputField('antennaGainRx', 'Ganancia Antena RX (Gr)', 'db')}
                ${createInputField('connectorLosses', 'Pérdida de conectores', 'db')}
                <div id="cablesContainer">
                    ${createInputField('cableLoss1', 'Pérdida de cable', 'db', true)}
                </div>
                <button type="button" class="add-cable-button" onclick="addCableField()">+ Añadir cable</button>
                ${createInputField('otherLosses', 'Otras pérdidas (L)', 'db')}
            `;
            break;
        case 'ber':
            formulaBox.innerHTML = `
                <p class="description">La tasa de error de bit (BER) se calcula comparando bits erróneos con el total de bits.</p>
                <h2>BER = Nᵉʳʳᵒʳᵉˢ / Nᵗᵒᵗᵃˡ</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('errorBits', 'Bits con error', 'dimensionless')}
                ${createInputField('totalBits', 'Total de bits', 'dimensionless')}
            `;
            break;
        case 'bandwidth':
            formulaBox.innerHTML = `
                <p class="description">El ancho de banda se calcula como la diferencia entre la frecuencia máxima y mínima.</p>
                <h2>B(Hz) = Fₘₐₓ - Fₘᵢₙ</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('maxFrequencyInput', 'Frecuencia Máxima (Fₘₐₓ)', 'frequency')}
                ${createInputField('minFrequencyInput', 'Frecuencia Mínima (Fₘᵢₙ)', 'frequency')}
            `;
            break;
        case 'wattToDb':
            formulaBox.innerHTML = `
                <p class="description">Convierte un valor de potencia en decibelios.</p>
                <h2>P(dB) = 10 log₁₀(P)</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('powerInput', 'Potencia (P)', 'power')}
            `;
            break;
        case 'dbToWatt':
            formulaBox.innerHTML = `
                <p class="description">Convierte un valor de decibelios a potencia en vatios.</p>
                <h2>P(W) = 10^(dB/10)</h2>
            `;
            inputsContainer.innerHTML = `
                ${createInputField('dbInput', 'Potencia (dB)', 'db')}
            `;
            break;
        default:
            formulaBox.innerHTML = 'Fórmula no definida';
            inputsContainer.innerHTML = '';
    }

    highlightActiveButton(formula);
}

// SISTEMA DE UNIDADES MEJORADO
function createUnitDropdown(type) {
    switch (type) {
        case 'velocity':
            return createVelocityDropdown();
        case 'distance':
            return createDistanceDropdown();
        case 'frequency':
            return createFrequencyDropdown();
        case 'power':
            return createPowerDropdown();
        case 'voltage':
            return createVoltageDropdown();
        case 'temperature':
            return createTemperatureDropdown();
        case 'resistance':
            return createResistanceDropdown();
        case 'db':
            return createDbDropdown();
        case 'dimensionless':
            return createDimensionlessDropdown();
        default:
            return '';
    }
}

function createVelocityDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="m/s">m/s</option>
            <option value="km/h">km/h</option>
            <option value="cm/s">cm/s</option>
        </select>
    `;
}

function createDistanceDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="m">m</option>
            <option value="km">km</option>
            <option value="cm">cm</option>
            <option value="mm">mm</option>
        </select>
    `;
}

function createFrequencyDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="Hz">Hz</option>
            <option value="kHz">kHz</option>
            <option value="MHz">MHz</option>
            <option value="GHz">GHz</option>
            <option value="THz">THz</option>
        </select>
    `;
}

function createPowerDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="dBm">dBm</option>
            <option value="W">W</option>
            <option value="mW">mW</option>
            <option value="dBW">dBW</option>
        </select>
    `;
}

function createVoltageDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="V">V</option>
            <option value="mV">mV</option>
            <option value="kV">kV</option>
        </select>
    `;
}

function createTemperatureDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="K">K</option>
            <option value="C">°C</option>
        </select>
    `;
}

function createResistanceDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="Ω">Ω</option>
            <option value="kΩ">kΩ</option>
            <option value="MΩ">MΩ</option>
        </select>
    `;
}

function createDbDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="dB">dB</option>
            <option value="dBm">dBm</option>
        </select>
    `;
}

function createDimensionlessDropdown() {
    return `
        <select class="unit-dropdown" onchange="updateConvertedValue(this)">
            <option value="dimensionless">-</option>
        </select>
    `;
}

// Función corregida para actualizar valores convertidos
function updateConvertedValue(selectElement) {
    const inputGroup = selectElement.closest('.input-group');
    
    if (!inputGroup) {
        console.error("No se encontró el contenedor input-group");
        return;
    }

    const inputElement = inputGroup.querySelector('input');
    
    if (!inputElement) {
        console.error("No se encontró el input correspondiente.");
        return;
    }

    const rawValue = parseFloat(inputElement.value);
    const selectedUnit = selectElement.value;

    if (isNaN(rawValue) || inputElement.value === '') {
        return;
    }

    const convertedValue = convertToBaseUnit(rawValue, selectedUnit);
    inputElement.value = convertedValue.toFixed(6);
}

// Función mejorada para crear campos de entrada
function createInputField(id, placeholder, type, isCable = false) {
    return `
        <div class="input-group">
            <input id="${id}" type="number" placeholder="${placeholder}" step="any">
            ${createUnitDropdown(type)}
            ${isCable ? '<button type="button" class="remove-cable" onclick="removeCableField(this)">×</button>' : ''}
        </div>
    `;
}

// Gestión de campos de cable
let cableCount = 1;

function addCableField() {
    cableCount++;
    const cablesContainer = document.getElementById('cablesContainer');
    if (cablesContainer) {
        const newField = createInputField(`cableLoss${cableCount}`, 'Pérdida de cable', 'db', true);
        cablesContainer.insertAdjacentHTML('beforeend', newField);
    }
}

function removeCableField(button) {
    const inputGroup = button.closest('.input-group');
    if (inputGroup) {
        inputGroup.remove();
    }
}

// SISTEMA DE CONVERSIÓN DE UNIDADES CORREGIDO
function convertToBaseUnit(value, unit) {
    const conversions = {
        // Velocidad
        'm/s': value * 1,
        'km/h': value * (1000/3600),
        'cm/s': value / 100,
        
        // Distancia
        'm': value * 1,
        'km': value * 1000,
        'cm': value / 100,
        'mm': value / 1000,
        
        // Frecuencia
        'Hz': value * 1,
        'kHz': value * 1e3,
        'MHz': value * 1e6,
        'GHz': value * 1e9,
        'THz': value * 1e12,
        
        // Potencia
        'W': value * 1,
        'mW': value / 1000,
        'dBm': Math.pow(10, (value - 30) / 10),
        'dBW': Math.pow(10, value / 10),
        
        // Voltaje
        'V': value * 1,
        'mV': value / 1000,
        'kV': value * 1000,
        
        // Temperatura
        'K': value * 1,
        'C': value + 273.15,
        
        // Resistencia
        'Ω': value * 1,
        'kΩ': value * 1000,
        'MΩ': value * 1e6,
        
        // dB
        'dB': value * 1,
        'dBm': value * 1
    };
    
    return conversions[unit] !== undefined ? conversions[unit] : value;
}

function convertFromBaseUnit(value, unit) {
    const reverseConversions = {
        // Velocidad
        'm/s': value * 1,
        'km/h': value / (1000/3600),
        'cm/s': value * 100,
        
        // Distancia
        'm': value * 1,
        'km': value / 1000,
        'cm': value * 100,
        'mm': value * 1000,
        
        // Frecuencia
        'Hz': value * 1,
        'kHz': value / 1e3,
        'MHz': value / 1e6,
        'GHz': value / 1e9,
        'THz': value / 1e12,
        
        // Potencia
        'W': value * 1,
        'mW': value * 1000,
        'dBm': 10 * Math.log10(value) + 30,
        'dBW': 10 * Math.log10(value),
        
        // Voltaje
        'V': value * 1,
        'mV': value * 1000,
        'kV': value / 1000,
        
        // Temperatura
        'K': value * 1,
        'C': value - 273.15,
        
        // Resistencia
        'Ω': value * 1,
        'kΩ': value / 1000,
        'MΩ': value / 1e6
    };
    
    return reverseConversions[unit] !== undefined ? reverseConversions[unit] : value;
}

// FUNCIÓN PRINCIPAL DE CÁLCULO CORREGIDA - CON GRÁFICAS FUNCIONANDO
function calculateCustomResult() {
    const formulaBox = document.getElementById("formulaBox");
    let result = 0;
    let resultUnit = "";

    try {
        // Ocultar gráfica por defecto (se mostrará solo para fórmulas que la necesiten)
        const graphContainer = document.querySelector(".graph-container");
        if (graphContainer) {
            graphContainer.style.display = "none";
        }

        if (formulaBox.textContent.includes("λ(m) = V / f")) {
            // Longitud de Onda
            const velocity = getInputValue('velocityInput');
            const frequency = getInputValue('frequencyInput');
            
            if (frequency === 0) throw new Error("La frecuencia no puede ser cero");
            
            result = velocity / frequency;
            resultUnit = "m";
            
            // Generar gráfica para longitud de onda
            plotSineWave(frequency, "Longitud de Onda", result);
            
        } else if (formulaBox.textContent.includes("f(Hz) = V / λ")) {
            // Frecuencia
            const velocity = getInputValue('velocityInput');
            const wavelength = getInputValue('wavelengthInput');
            
            if (wavelength === 0) throw new Error("La longitud de onda no puede ser cero");
            
            result = velocity / wavelength;
            resultUnit = "Hz";
            
            // Generar gráfica para frecuencia
            plotSineWave(result, "Frecuencia", wavelength);
            
        } else if (formulaBox.textContent.includes("V(m/s) = f * λ")) {
            // Velocidad
            const frequency = getInputValue('frequencyInput');
            const wavelength = getInputValue('wavelengthInput');
            
            result = frequency * wavelength;
            resultUnit = "m/s";
            
            // Ocultar gráfica para velocidad
            if (graphContainer) {
                graphContainer.style.display = "none";
            }
            
        } else if (formulaBox.textContent.includes("C(bits/s) = B log₂(1 + S/N)")) {
            // Capacidad de Shannon
            const bandwidth = getInputValue('bandwidthInput');
            const signalPower = getInputValue('signalInput');
            const noisePower = getInputValue('noiseInput');
            
            if (bandwidth <= 0) throw new Error("El ancho de banda debe ser mayor a 0");
            if (noisePower <= 0) throw new Error("La potencia de ruido debe ser mayor a 0");
            
            const snr = signalPower / noisePower;
            result = bandwidth * Math.log2(1 + snr);
            resultUnit = "bits/s";
            
            // Gráfica de capacidad vs SNR
            plotCapacityVsSNR(bandwidth, snr, result);
            
        } else if (formulaBox.textContent.includes("S/N(dB) = 10 log₁₀(Ps / Pn)")) {
            // SNR Potencia
            const signalPower = getInputValue('signalPowerInput');
            const noisePower = getInputValue('noisePowerInput');
            
            if (noisePower <= 0) throw new Error("La potencia de ruido debe ser mayor a 0");
            
            const snrLinear = signalPower / noisePower;
            result = 10 * Math.log10(snrLinear);
            resultUnit = "dB";
            
            // Gráfica de comparación señal/ruido
            plotSignalComparison(
                { amplitude: Math.sqrt(signalPower), snr: result, power: signalPower },
                { amplitude: Math.sqrt(noisePower), power: noisePower },
                "Relación Señal/Ruido (Potencia)"
            );
            
        } else if (formulaBox.textContent.includes("S/N(dB) = 20 log₁₀(Vs / Vn)")) {
            // SNR Voltaje
            const signalVoltage = getInputValue('signalVoltageInput');
            const noiseVoltage = getInputValue('noiseVoltageInput');
            
            if (noiseVoltage === 0) throw new Error("El voltaje de ruido no puede ser cero");
            
            const snrLinear = signalVoltage / noiseVoltage;
            result = 20 * Math.log10(snrLinear);
            resultUnit = "dB";
            
            // Gráfica de comparación señal/ruido
            plotSignalComparison(
                { amplitude: signalVoltage, snr: result, voltage: signalVoltage },
                { amplitude: noiseVoltage, voltage: noiseVoltage },
                "Relación Señal/Ruido (Voltaje)"
            );
            
        } else if (formulaBox.textContent.includes("N(W) = kTB")) {
            // Ruido Térmico
            const temperature = getInputValue('temperatureInput');
            const bandwidth = getInputValue('bandwidthInput');
            
            if (temperature <= 0) throw new Error("La temperatura debe ser mayor a 0");
            if (bandwidth <= 0) throw new Error("El ancho de banda debe ser mayor a 0");
            
            const k = 1.38e-23; // Constante de Boltzmann
            result = k * temperature * bandwidth;
            resultUnit = "W";
            
            // Gráfica de ruido térmico vs temperatura
            plotThermalNoise(temperature, bandwidth, result);
            
        } else if (formulaBox.textContent.includes("V(V) = √(4kTB·R)")) {
            // Voltaje de Ruido
            const resistance = getInputValue('resistanceInput');
            const bandwidth = getInputValue('bandwidthInput');
            const temperature = getInputValue('temperatureInput');
            
            if (resistance <= 0) throw new Error("La resistencia debe ser mayor a 0");
            if (bandwidth <= 0) throw new Error("El ancho de banda debe ser mayor a 0");
            if (temperature <= 0) throw new Error("La temperatura debe ser mayor a 0");
            
            const k = 1.38e-23;
            result = Math.sqrt(4 * k * temperature * bandwidth * resistance);
            resultUnit = "V";
            
            // Gráfica de voltaje de ruido vs resistencia
            plotNoiseVoltage(resistance, bandwidth, temperature, result);
            
        } else if (formulaBox.textContent.includes("F = (S/N)ₑₙₜᵣₐdₐ / (S/N)ₛₐₗᵢdₐ")) {
            // Factor de Ruido
            const snrInput = getInputValue('snrInput');
            const snrOutput = getInputValue('snrOutput');
            
            if (snrOutput === 0) throw new Error("El SNR de salida no puede ser cero");
            
            result = snrInput / snrOutput;
            resultUnit = "";
            
            // Ocultar gráfica para factor de ruido
            if (graphContainer) {
                graphContainer.style.display = "none";
            }
            
        } else if (formulaBox.textContent.includes("NI(dB) = 10 · log₁₀(F)")) {
            // Índice de Ruido
            const noiseFactor = getInputValue('noiseFactorInput');
            
            if (noiseFactor <= 0) throw new Error("El factor de ruido debe ser mayor a 0");
            
            result = 10 * Math.log10(noiseFactor);
            resultUnit = "dB";
            
            // Ocultar gráfica para índice de ruido
            if (graphContainer) {
                graphContainer.style.display = "none";
            }
            
        } else if (formulaBox.textContent.includes("Pr(dBm) = Pt + Gt + Gr - L")) {
            // PRESUPUESTO DE ENLACE
            result = calculateLinkBudget();
            resultUnit = "dBm";
            
            // Gráfica de presupuesto de enlace
            plotLinkBudget(result);
            
        } else if (formulaBox.textContent.includes("BER = Nᵉʳʳᵒʳᵉˢ / Nᵗᵒᵗᵃˡ")) {
            // BER
            const errorBits = getInputValue('errorBits');
            const totalBits = getInputValue('totalBits');
            
            if (totalBits === 0) throw new Error("El total de bits no puede ser cero");
            if (errorBits > totalBits) throw new Error("Los bits erróneos no pueden ser más que el total");
            
            result = errorBits / totalBits;
            resultUnit = "";
            
            // Gráfica de BER vs SNR (aproximada)
            plotBER(result, totalBits, errorBits);
            
        } else if (formulaBox.textContent.includes("B(Hz) = Fₘₐₓ - Fₘᵢₙ")) {
            // Ancho de Banda
            const maxFrequency = getInputValue('maxFrequencyInput');
            const minFrequency = getInputValue('minFrequencyInput');
            
            if (maxFrequency <= minFrequency) throw new Error("La frecuencia máxima debe ser mayor que la mínima");
            
            result = maxFrequency - minFrequency;
            resultUnit = "Hz";
            
            // Gráfica de espectro de frecuencia
            plotFrequencySpectrum(minFrequency, maxFrequency, result);
            
        } else if (formulaBox.textContent.includes("P(dB) = 10 log₁₀(P)")) {
            // Watt a dB
            const power = getInputValue('powerInput');
            
            if (power <= 0) throw new Error("La potencia debe ser mayor a 0");
            
            result = 10 * Math.log10(power);
            resultUnit = "dB";
            
            // Gráfica de comparación lineal vs logarítmica
            plotPowerComparison(power, result, "Watt a dB");
            
        } else if (formulaBox.textContent.includes("P(W) = 10^(dB/10)")) {
            // dB a Watt
            const dbValue = getInputValue('dbInput');
            
            result = Math.pow(10, dbValue / 10);
            resultUnit = "W";
            
            // Gráfica de comparación logarítmica vs lineal
            plotPowerComparison(result, dbValue, "dB a Watt");
            
        } else {
            throw new Error("Fórmula no reconocida");
        }

        displayResult(result, resultUnit);
        
    } catch (e) {
        displayResult(e.message, "Error");
        
        // Ocultar gráfica en caso de error
        const graphContainer = document.querySelector(".graph-container");
        if (graphContainer) {
            graphContainer.style.display = "none";
        }
    }
}

// FUNCIONES DE GRÁFICAS ADICIONALES

function plotCapacityVsSNR(bandwidth, snr, capacity) {
    const canvasContainer = document.querySelector(".graph-container");
    const canvas = document.getElementById("waveCanvas");
    
    if (!canvas) return;
    
    // Configurar canvas
    if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || 600;
        canvas.height = canvas.offsetHeight || 300;
    }
    
    const ctx = canvas.getContext("2d");
    canvasContainer.style.display = "flex";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Dibujar fondo
    ctx.fillStyle = "rgba(30, 30, 50, 0.8)";
    ctx.fillRect(0, 0, width, height);
    
    // Título
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Capacidad del Canal vs SNR", width / 2, 30);
    
    // Ejes
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    
    // Eje X (SNR)
    ctx.beginPath();
    ctx.moveTo(80, height - 60);
    ctx.lineTo(width - 40, height - 60);
    ctx.stroke();
    
    // Eje Y (Capacidad)
    ctx.beginPath();
    ctx.moveTo(80, 60);
    ctx.lineTo(80, height - 60);
    ctx.stroke();
    
    // Dibujar curva de capacidad
    ctx.strokeStyle = "#007BFF";
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const maxSNR = Math.max(snr * 2, 100); // Escala dinámica
    const maxCapacity = bandwidth * Math.log2(1 + maxSNR);
    
    for (let i = 0; i <= 100; i++) {
        const currentSNR = (i / 100) * maxSNR;
        const currentCapacity = bandwidth * Math.log2(1 + currentSNR);
        
        const x = 80 + (i / 100) * (width - 120);
        const y = height - 60 - (currentCapacity / maxCapacity) * (height - 120);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Marcar punto calculado
    const xPoint = 80 + (snr / maxSNR) * (width - 120);
    const yPoint = height - 60 - (capacity / maxCapacity) * (height - 120);
    
    ctx.fillStyle = "#ff4444";
    ctx.beginPath();
    ctx.arc(xPoint, yPoint, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Etiquetas
    ctx.fillStyle = "#cccccc";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("SNR (lineal)", width / 2, height - 20);
    
    ctx.save();
    ctx.translate(30, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Capacidad (bits/s)", 0, 0);
    ctx.restore();
    
    // Información del punto
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.fillText(`SNR: ${snr.toFixed(2)}`, width - 150, 80);
    ctx.fillText(`Capacidad: ${formatCapacity(capacity)}`, width - 150, 100);
    ctx.fillText(`Ancho de banda: ${formatFrequency(bandwidth)}`, width - 150, 120);
}

function plotThermalNoise(temperature, bandwidth, noisePower) {
    const canvasContainer = document.querySelector(".graph-container");
    const canvas = document.getElementById("waveCanvas");
    
    if (!canvas) return;
    
    // Configurar canvas
    if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || 600;
        canvas.height = canvas.offsetHeight || 300;
    }
    
    const ctx = canvas.getContext("2d");
    canvasContainer.style.display = "flex";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Dibujar fondo
    ctx.fillStyle = "rgba(30, 30, 50, 0.8)";
    ctx.fillRect(0, 0, width, height);
    
    // Título
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Ruido Térmico vs Temperatura", width / 2, 30);
    
    // Información
    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Temperatura: ${temperature} K`, 60, 50);
    ctx.fillText(`Ancho de banda: ${formatFrequency(bandwidth)}`, 60, 70);
    ctx.fillText(`Ruido térmico: ${noisePower.toExponential(4)} W`, 60, 90);
    
    // Dibujar representación del ruido
    ctx.strokeStyle = "#ff4444";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const centerY = height / 2;
    for (let x = 100; x <= width - 100; x++) {
        const noise = Math.random() * 40 - 20; // Ruido aleatorio
        const y = centerY + noise;
        
        if (x === 100) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Línea central
    ctx.strokeStyle = "#007BFF";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, centerY);
    ctx.lineTo(width - 100, centerY);
    ctx.stroke();
    
    // Etiquetas
    ctx.fillStyle = "#cccccc";
    ctx.textAlign = "center";
    ctx.fillText("Señal con ruido térmico", width / 2, height - 20);
}

function plotFrequencySpectrum(minFreq, maxFreq, bandwidth) {
    const canvasContainer = document.querySelector(".graph-container");
    const canvas = document.getElementById("waveCanvas");
    
    if (!canvas) return;
    
    // Configurar canvas
    if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || 600;
        canvas.height = canvas.offsetHeight || 300;
    }
    
    const ctx = canvas.getContext("2d");
    canvasContainer.style.display = "flex";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Dibujar fondo
    ctx.fillStyle = "rgba(30, 30, 50, 0.8)";
    ctx.fillRect(0, 0, width, height);
    
    // Título
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Espectro de Frecuencias", width / 2, 30);
    
    // Dibujar espectro
    const startX = 100;
    const endX = width - 100;
    const spectrumHeight = height - 150;
    
    // Fondo del espectro
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(startX, 100, endX - startX, spectrumHeight);
    
    // Banda de frecuencia
    ctx.fillStyle = "#007BFF";
    const bandStart = startX;
    const bandWidth = (bandwidth / (maxFreq - minFreq)) * (endX - startX);
    ctx.fillRect(bandStart, 100, bandWidth, spectrumHeight);
    
    // Etiquetas de frecuencia
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(formatFrequency(minFreq), startX, height - 30);
    ctx.fillText(formatFrequency(maxFreq), endX, height - 30);
    ctx.fillText(formatFrequency(minFreq + bandwidth), bandStart + bandWidth, height - 30);
    
    // Líneas de referencia
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, 90);
    ctx.lineTo(startX, 100 + spectrumHeight);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(endX, 90);
    ctx.lineTo(endX, 100 + spectrumHeight);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(bandStart + bandWidth, 90);
    ctx.lineTo(bandStart + bandWidth, 100 + spectrumHeight);
    ctx.stroke();
    
    // Información
    ctx.textAlign = "left";
    ctx.fillText(`Frecuencia mínima: ${formatFrequency(minFreq)}`, 60, 80);
    ctx.fillText(`Frecuencia máxima: ${formatFrequency(maxFreq)}`, 60, 100);
    ctx.fillText(`Ancho de banda: ${formatFrequency(bandwidth)}`, 60, 120);
}

function plotPowerComparison(linearValue, dbValue, title) {
    const canvasContainer = document.querySelector(".graph-container");
    const canvas = document.getElementById("waveCanvas");
    
    if (!canvas) return;
    
    // Configurar canvas
    if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || 600;
        canvas.height = canvas.offsetHeight || 300;
    }
    
    const ctx = canvas.getContext("2d");
    canvasContainer.style.display = "flex";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Dibujar fondo
    ctx.fillStyle = "rgba(30, 30, 50, 0.8)";
    ctx.fillRect(0, 0, width, height);
    
    // Título
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(title, width / 2, 30);
    
    // Barras comparativas
    const barWidth = 80;
    const maxBarHeight = height - 120;
    
    // Barra lineal (W)
    const linearHeight = Math.min((linearValue / (linearValue * 2)) * maxBarHeight, maxBarHeight);
    ctx.fillStyle = "#007BFF";
    ctx.fillRect(width / 2 - barWidth - 20, height - 60 - linearHeight, barWidth, linearHeight);
    
    // Barra logarítmica (dB)
    const dbNormalized = Math.min(((dbValue + 100) / 200) * maxBarHeight, maxBarHeight);
    ctx.fillStyle = "#28a745";
    ctx.fillRect(width / 2 + 20, height - 60 - dbNormalized, barWidth, dbNormalized);
    
    // Etiquetas
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Lineal", width / 2 - barWidth / 2 - 20, height - 30);
    ctx.fillText("Logarítmico", width / 2 + barWidth / 2 + 20, height - 30);
    
    // Valores
    ctx.fillText(`${linearValue.toExponential(4)} W`, width / 2 - barWidth / 2 - 20, height - 70 - linearHeight);
    ctx.fillText(`${dbValue.toFixed(2)} dB`, width / 2 + barWidth / 2 + 20, height - 70 - dbNormalized);
    
    // Información adicional
    ctx.textAlign = "left";
    ctx.fillText("Escala lineal: Representación directa de potencia", 60, 60);
    ctx.fillText("Escala logarítmica: Compresión de rangos amplios", 60, 80);
}

// Función auxiliar para formatear capacidad
function formatCapacity(capacity) {
    if (capacity >= 1e9) {
        return (capacity / 1e9).toFixed(2) + " Gbps";
    } else if (capacity >= 1e6) {
        return (capacity / 1e6).toFixed(2) + " Mbps";
    } else if (capacity >= 1e3) {
        return (capacity / 1e3).toFixed(2) + " kbps";
    } else {
        return capacity.toFixed(2) + " bps";
    }
}
// FUNCIÓN ESPECÍFICA PARA PRESUPUESTO DE ENLACE - CORREGIDA
function calculateLinkBudget() {
    // Obtener valores directamente sin conversión (ya están en dB/dBm)
    const transmittedPower = parseFloat(document.getElementById('transmittedPower').value);
    const antennaGainTx = parseFloat(document.getElementById('antennaGainTx').value);
    const antennaGainRx = parseFloat(document.getElementById('antennaGainRx').value);
    const connectorLosses = parseFloat(document.getElementById('connectorLosses').value);
    const otherLosses = parseFloat(document.getElementById('otherLosses').value);
    
    // Validar que todos los valores sean números
    if (isNaN(transmittedPower) || isNaN(antennaGainTx) || isNaN(antennaGainRx) || 
        isNaN(connectorLosses) || isNaN(otherLosses)) {
        throw new Error("Todos los campos deben contener valores numéricos válidos");
    }
    
    // Sumar pérdidas de cables
    let cableLossesTotal = 0;
    const cableInputs = document.querySelectorAll('#cablesContainer input');
    cableInputs.forEach(input => {
        const cableLoss = parseFloat(input.value);
        if (!isNaN(cableLoss)) {
            cableLossesTotal += cableLoss;
        }
    });
    
    // Calcular presupuesto de enlace
    // Pr(dBm) = Pt(dBm) + Gt(dB) + Gr(dB) - Lcables(dB) - Lconectores(dB) - Lotras(dB)
    const result = transmittedPower + antennaGainTx + antennaGainRx - connectorLosses - cableLossesTotal - otherLosses;
    
    return result;
}

// Función auxiliar para obtener valores de entrada
function getInputValue(inputId, targetUnit = null) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        throw new Error(`Campo ${inputId} no encontrado`);
    }
    
    const value = parseFloat(inputElement.value);
    if (isNaN(value)) {
        throw new Error(`Valor inválido en ${inputId}`);
    }
    
    const unitElement = inputElement.nextElementSibling;
    if (unitElement && unitElement.classList.contains('unit-dropdown')) {
        const unit = unitElement.value;
        const baseValue = convertToBaseUnit(value, unit);
        
        if (targetUnit) {
            return convertFromBaseUnit(baseValue, targetUnit);
        }
        return baseValue;
    }
    
    return value;
}

// Función para mostrar resultados
function displayResult(result, unit = "") {
    const display = document.getElementById('display');
    
    if (typeof result === 'number' && !isNaN(result)) {
        let formattedResult;
        if (Math.abs(result) < 0.001 || Math.abs(result) > 1000000) {
            formattedResult = result.toExponential(4);
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        if (unit) {
            display.textContent = `Resultado: ${formattedResult} ${unit}`;
        } else {
            display.textContent = `Resultado: ${formattedResult}`;
        }
        
        display.style.color = "#28a745";
    } else {
        display.textContent = `Error: ${result}`;
        display.style.color = "#dc3545";
    }
}

// FUNCIÓN MEJORADA PARA GRAFICAR ONDAS - CORREGIDA
function plotSineWave(frequency, title, wavelength = null) {
    const canvasContainer = document.querySelector(".graph-container");
    const canvas = document.getElementById("waveCanvas");
    
    if (!canvas) {
        console.error("Canvas no encontrado");
        return;
    }
    
    // Asegurar que el canvas tenga dimensiones
    if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || 600;
        canvas.height = canvas.offsetHeight || 300;
    }
    
    const ctx = canvas.getContext("2d");
    
    // Mostrar el contenedor
    canvasContainer.style.display = "flex";
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    
    // Calcular amplitud basada en la frecuencia (para visualización)
    let amplitude = height / 4;
    if (frequency > 1000000) { // Frecuencias altas - menor amplitud visual
        amplitude = height / 6;
    } else if (frequency < 100) { // Frecuencias bajas - mayor amplitud visual
        amplitude = height / 3;
    }
    
    // Calcular número de ciclos basado en la frecuencia
    let cycles = 3;
    if (frequency > 1000000) { // GHz, MHz
        cycles = 6;
    } else if (frequency > 1000) { // kHz
        cycles = 4;
    } else if (frequency < 10) { // Hz bajos
        cycles = 2;
    }
    
    // Dibujar fondo
    ctx.fillStyle = "rgba(30, 30, 50, 0.8)";
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar cuadrícula
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 0.5;
    
    // Líneas verticales
    for (let x = 0; x <= width; x += width / 10) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Líneas horizontales
    for (let y = 0; y <= height; y += height / 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Dibujar ejes principales
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    
    // Eje X (Tiempo)
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Eje Y (Amplitud)
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, height);
    ctx.stroke();
    
    // Dibujar onda senoidal DINÁMICA basada en la frecuencia real
    ctx.beginPath();
    ctx.strokeStyle = "#007BFF";
    ctx.lineWidth = 3;
    
    // Calcular parámetros de la onda basados en la frecuencia real
    const timeRange = cycles / frequency; // Rango de tiempo a mostrar
    const samples = 500; // Número de puntos para suavizar la curva
    const amplitudeNormalized = amplitude * 0.8; // Amplitud normalizada
    
    for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * timeRange; // Tiempo normalizado
        const x = (i / samples) * width; // Posición X en el canvas
        
        // Ecuación de onda senoidal: A * sin(2πft)
        const y = centerY + amplitudeNormalized * Math.sin(2 * Math.PI * frequency * t);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Dibujar puntos de referencia en la onda
    ctx.fillStyle = "#ff4444";
    const referencePoints = 8; // Número de puntos de referencia
    
    for (let i = 0; i <= referencePoints; i++) {
        const t = (i / referencePoints) * timeRange;
        const x = (i / referencePoints) * width;
        const y = centerY + amplitudeNormalized * Math.sin(2 * Math.PI * frequency * t);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Dibujar línea de amplitud máxima
    ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(0, centerY - amplitudeNormalized);
    ctx.lineTo(width, centerY - amplitudeNormalized);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, centerY + amplitudeNormalized);
    ctx.lineTo(width, centerY + amplitudeNormalized);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Información de la gráfica
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "left";
    
    // Título principal
    ctx.fillText(`${title}`, 60, 25);
    
    // Información de frecuencia
    ctx.font = "12px Arial";
    ctx.fillText(`Frecuencia: ${formatFrequency(frequency)}`, 60, 45);
    
    // Información de longitud de onda si está disponible
    if (wavelength) {
        ctx.fillText(`Longitud de onda: ${formatWavelength(wavelength)}`, 60, 65);
    }
    
    // Información de período
    const period = 1 / frequency;
    ctx.fillText(`Período: ${formatTime(period)}`, 60, 85);
    
    // Etiquetas de ejes
    ctx.fillStyle = "#cccccc";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    
    // Eje X - Tiempo
    ctx.fillText("Tiempo (s)", width / 2, height - 10);
    
    // Marcas de tiempo
    for (let i = 0; i <= 5; i++) {
        const x = (i / 5) * width;
        const timeValue = (i / 5) * timeRange;
        ctx.fillText(formatTimeShort(timeValue), x, centerY + 20);
        
        // Línea de marca de tiempo
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, centerY - 5);
        ctx.lineTo(x, centerY + 5);
        ctx.stroke();
    }
    
    // Eje Y - Amplitud
    ctx.save();
    ctx.translate(25, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Amplitud", 0, 0);
    ctx.restore();
    
    // Marcas de amplitud
    ctx.textAlign = "right";
    ctx.fillText("+A", 45, centerY - amplitudeNormalized + 5);
    ctx.fillText("-A", 45, centerY + amplitudeNormalized + 5);
    ctx.fillText("0", 45, centerY + 5);
    
    // Leyenda de colores
    ctx.textAlign = "left";
    ctx.fillStyle = "#007BFF";
    ctx.fillText("--- Señal", width - 120, 25);
    ctx.fillStyle = "#00ff00";
    ctx.fillText("--- Amplitud máxima", width - 120, 45);
    ctx.fillStyle = "#ff4444";
    ctx.fillText("• Puntos de referencia", width - 120, 65);
}

// Función auxiliar para formatear frecuencia
function formatFrequency(freq) {
    if (freq >= 1e9) {
        return (freq / 1e9).toFixed(4) + " GHz";
    } else if (freq >= 1e6) {
        return (freq / 1e6).toFixed(4) + " MHz";
    } else if (freq >= 1e3) {
        return (freq / 1e3).toFixed(4) + " kHz";
    } else if (freq < 1) {
        return (freq * 1e3).toFixed(4) + " mHz";
    } else {
        return freq.toFixed(4) + " Hz";
    }
}

// Función auxiliar para formatear longitud de onda
function formatWavelength(wavelength) {
    if (wavelength >= 1000) {
        return (wavelength / 1000).toFixed(4) + " km";
    } else if (wavelength < 0.01) {
        return (wavelength * 1000).toFixed(4) + " mm";
    } else if (wavelength < 1) {
        return (wavelength * 100).toFixed(4) + " cm";
    } else {
        return wavelength.toFixed(4) + " m";
    }
}

// Función auxiliar para formatear tiempo
function formatTime(time) {
    if (time >= 1) {
        return time.toFixed(4) + " s";
    } else if (time >= 1e-3) {
        return (time * 1e3).toFixed(4) + " ms";
    } else if (time >= 1e-6) {
        return (time * 1e6).toFixed(4) + " μs";
    } else {
        return (time * 1e9).toFixed(4) + " ns";
    }
}

// Función auxiliar para formatear tiempo corto (para ejes)
function formatTimeShort(time) {
    if (time >= 1) {
        return time.toFixed(2) + "s";
    } else if (time >= 1e-3) {
        return (time * 1e3).toFixed(1) + "ms";
    } else if (time >= 1e-6) {
        return (time * 1e6).toFixed(0) + "μs";
    } else {
        return (time * 1e9).toFixed(0) + "ns";
    }
}

// FUNCIÓN PARA GRAFICAR COMPARACIÓN DE SEÑALES (Para fórmulas como SNR)
function plotSignalComparison(signalData, noiseData, title) {
    const canvasContainer = document.querySelector(".graph-container");
    const canvas = document.getElementById("waveCanvas");
    
    if (!canvas) return;
    
    // Configurar canvas
    if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvas.offsetWidth || 600;
        canvas.height = canvas.offsetHeight || 300;
    }
    
    const ctx = canvas.getContext("2d");
    canvasContainer.style.display = "flex";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    
    // Dibujar fondo
    ctx.fillStyle = "rgba(30, 30, 50, 0.8)";
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar ejes
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    
    // Eje X
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Eje Y
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, height);
    ctx.stroke();
    
    // Dibujar señal (línea azul)
    ctx.strokeStyle = "#007BFF";
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const samples = 200;
    for (let i = 0; i <= samples; i++) {
        const x = (i / samples) * width;
        const t = (i / samples) * 4 * Math.PI;
        const signalAmplitude = signalData.amplitude || 1;
        const y = centerY - (height / 4) * signalAmplitude * Math.sin(t);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Dibujar ruido (línea roja)
    ctx.strokeStyle = "#ff4444";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i <= samples; i++) {
        const x = (i / samples) * width;
        const t = (i / samples) * 4 * Math.PI;
        const noiseAmplitude = noiseData.amplitude || 0.3;
        // Ruido con múltiples frecuencias para parecer más real
        const y = centerY + (height / 6) * noiseAmplitude * (
            Math.sin(t * 3) * 0.3 + 
            Math.sin(t * 7) * 0.2 + 
            Math.sin(t * 13) * 0.1
        );
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Información
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "left";
    ctx.fillText(title, 60, 25);
    
    ctx.font = "12px Arial";
    ctx.fillStyle = "#007BFF";
    ctx.fillText("Señal original", 60, 45);
    ctx.fillStyle = "#ff4444";
    ctx.fillText("Ruido", 60, 65);
    
    if (signalData.snr) {
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`SNR: ${signalData.snr.toFixed(2)} dB`, 60, 85);
    }
}

// Función para resaltar botón activo
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

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial del canvas
    const canvas = document.getElementById("waveCanvas");
    if (canvas) {
        // Establecer dimensiones fijas para el canvas
        canvas.width = 600;
        canvas.height = 300;
        
        // Dibujar canvas inicial
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Selecciona una fórmula y haz un cálculo para ver la gráfica", canvas.width/2, canvas.height/2);
    }
    
    // Redimensionar canvas cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        const canvas = document.getElementById("waveCanvas");
        if (canvas) {
            canvas.width = 600;
            canvas.height = 300;
        }
    });
});