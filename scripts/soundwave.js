const canvas = document.getElementById('soundWaveCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth + 100;
canvas.style.marginLeft = '-10vw';
canvas.style.transform = 'scale(1, -1)';
canvas.height = 325; // Increase height to fit all waves

let width = canvas.width;
let height = canvas.height;

// Set valley depth control (higher values will make valleys go deeper)
const valleyDepth = 0.65; // Adjust this multiplier to control valley depth in code

// Define identical sub-waves but vary their maxAmplitude for each main wave
const subWaves1 = [
    { maxAmplitude: 30, frequency: 0.01, phaseOffset: 0 },
    { maxAmplitude: 50, frequency: 0.015, phaseOffset: Math.PI / 4 },
    { maxAmplitude: 15, frequency: 0.02, phaseOffset: Math.PI / 2 }
];

const subWaves2 = [
    { maxAmplitude: 20, frequency: 0.01, phaseOffset: 0 },
    { maxAmplitude: 35, frequency: 0.015, phaseOffset: Math.PI / 4 },
    { maxAmplitude: 15, frequency: 0.02, phaseOffset: Math.PI / 2 }
];

const subWaves3 = [
    { maxAmplitude: 20, frequency: 0.01, phaseOffset: 0 },
    { maxAmplitude: 25, frequency: 0.015, phaseOffset: Math.PI / 4 },
    { maxAmplitude: 15, frequency: 0.02, phaseOffset: Math.PI / 2 }
];

const waves = [
    {
        baseAmplitude: 20,
        frequency: 0.008,
        phase: 0,
        speed: 0.05,
        thickness: 10,
        color: '#FFF',
        yOffset: height / 2 + 15,
        subWaves: subWaves1
    },
    {
        baseAmplitude: 10,
        frequency: 0.008,
        phase: 0,
        speed: 0.05,
        thickness: 4,
        color: '#FFF',
        yOffset: height / 2 +10,
        subWaves: subWaves2
    },
    {
        baseAmplitude: 5,
        frequency: 0.008,
        phase: 0,
        speed: 0.05,
        thickness: 2,
        color: '#FFF',
        yOffset: height / 2 + 2.5,
        subWaves: subWaves3
    }
];

function drawWave(wave) {
    ctx.beginPath();
    ctx.moveTo(0, wave.yOffset);

    for (let x = 0; x < width; x++) {
        let y = wave.yOffset;

        // Calculate the amplitude of the current wave point
        let currentAmplitude = wave.baseAmplitude + Math.sin(wave.phase) * wave.baseAmplitude;
        let waveValue = currentAmplitude * Math.sin(x * wave.frequency + wave.phase);

        // Apply valley depth multiplier only when y value dips below the baseline
        if (waveValue < 0) {
            waveValue *= valleyDepth;
        }

        y += waveValue;

        // Add contributions from the sub-waves
        wave.subWaves.forEach(subWave => {
            y += subWave.maxAmplitude * Math.sin(x * subWave.frequency + subWave.phaseOffset + wave.phase);
        });

        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = wave.color;
    ctx.lineWidth = wave.thickness;
    ctx.stroke();
}

function drawBaseline() {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    //drawBaseline();

    waves.forEach(wave => {
        wave.phase += wave.speed;
        drawWave(wave);
    });

    requestAnimationFrame(animate);
}

animate();

// Adjust canvas size when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth + 100;
    width = canvas.width;
    height = canvas.height;
    canvas.style.marginLeft = '-10vw';
});