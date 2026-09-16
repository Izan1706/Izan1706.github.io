// ========================================================
// NOVACREUX.JS — Comportamiento específico de la página de
// caso de estudio "Novacreux". No modifica script.js: añade
// únicamente lo que esta página necesita (animaciones de los
// componentes nuevos y la calculadora de coste energético).
// ========================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== ANIMACIÓN AL SCROLL PARA LOS COMPONENTES NUEVOS =====
    // script.js ya observa .section-title, .project-card, etc.
    // Aquí añadimos el mismo tratamiento para los bloques propios
    // de esta página (tarjetas de stats, servicios, hardware...).
    const nvObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const nvObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                nvObserver.unobserve(entry.target);
            }
        });
    }, nvObserverOptions);

    document.querySelectorAll('.nv-animate').forEach(el => nvObserver.observe(el));

    // ===== CALCULADORA DE COSTE ENERGÉTICO =====
    // Datos extraídos de la memoria del TFG (apartado "Consumos
    // de energía y tokens"): consumo medio en vatios y rendimiento
    // aproximado de cada plataforma.
    const devices = {
        homelab: { label: 'Homelab Server (Dell OptiPlex, 24/7)', watts: 6, note: 'Ubuntu Server + Docker · siempre encendido' },
        pcia: { label: 'PC IA Local — RTX 4060 Ti 16GB', watts: 150, note: '12–18 tokens/s con modelos de 24B' },
        raspberry: { label: 'Raspberry Pi 5 + AI HAT+2', watts: 12, note: '3–5 tokens/s con modelos de 3B' },
        jetson: { label: 'NVIDIA Jetson Orin Nano', watts: 15, note: '10–15 tokens/s · Edge AI' },
        spark: { label: 'NVIDIA Spark', watts: 10, note: '15–22 tokens/s (acceso remoto vía VM)' }
    };

    const deviceSelect = document.getElementById('calc-device');
    const hoursSlider = document.getElementById('calc-hours');
    const hoursValue = document.getElementById('calc-hours-value');
    const priceSlider = document.getElementById('calc-price');
    const priceValue = document.getElementById('calc-price-value');
    const resultDaily = document.getElementById('calc-result-daily');
    const resultAnnual = document.getElementById('calc-result-annual');
    const resultCost = document.getElementById('calc-result-cost');
    const resultNote = document.getElementById('calc-result-note');

    function updateCalculator() {
        if (!deviceSelect) return;

        const device = devices[deviceSelect.value];
        const hours = parseFloat(hoursSlider.value);
        const price = parseFloat(priceSlider.value);

        const dailyWh = device.watts * hours;
        const annualKwh = (dailyWh * 365) / 1000;
        const annualCost = annualKwh * price;

        hoursValue.textContent = `${hours} h/día`;
        priceValue.textContent = `${price.toFixed(2)} €/kWh`;

        resultDaily.textContent = `${dailyWh.toFixed(0)} Wh`;
        resultAnnual.textContent = `${annualKwh.toFixed(1)} kWh`;
        resultCost.textContent = `${annualCost.toFixed(2)} €`;
        resultNote.textContent = device.note;
    }

    if (deviceSelect) {
        deviceSelect.addEventListener('change', updateCalculator);
        hoursSlider.addEventListener('input', updateCalculator);
        priceSlider.addEventListener('input', updateCalculator);
        updateCalculator();
    }

});
