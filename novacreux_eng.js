// ========================================================
// NOVACREUX_ENG.JS — Same behavior as novacreux.js, only the
// user-facing strings (calculator labels/units) are in English.
// Kept as a separate file so novacreux.js (Spanish page) is
// never touched.
// ========================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== SCROLL-REVEAL ANIMATION =====
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

    // ===== ENERGY COST CALCULATOR =====
    // Figures taken from the TFG report ("Consumos de energía y
    // tokens" section): average power draw (W) and approximate
    // throughput for each platform.
    const devices = {
        homelab: { label: 'Homelab Server (Dell OptiPlex, 24/7)', watts: 6, note: 'Ubuntu Server + Docker · always on' },
        pcia: { label: 'PC Local AI — RTX 4060 Ti 16GB', watts: 150, note: '12–18 tokens/s with 24B models' },
        raspberry: { label: 'Raspberry Pi 5 + AI HAT+2', watts: 12, note: '3–5 tokens/s with 3B models' },
        jetson: { label: 'NVIDIA Jetson Orin Nano', watts: 15, note: '10–15 tokens/s · Edge AI' },
        spark: { label: 'NVIDIA Spark', watts: 10, note: '15–22 tokens/s (remote access via VM)' }
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

        hoursValue.textContent = `${hours} h/day`;
        priceValue.textContent = `€${price.toFixed(2)}/kWh`;

        resultDaily.textContent = `${dailyWh.toFixed(0)} Wh`;
        resultAnnual.textContent = `${annualKwh.toFixed(1)} kWh`;
        resultCost.textContent = `€${annualCost.toFixed(2)}`;
        resultNote.textContent = device.note;
    }

    if (deviceSelect) {
        deviceSelect.addEventListener('change', updateCalculator);
        hoursSlider.addEventListener('input', updateCalculator);
        priceSlider.addEventListener('input', updateCalculator);
        updateCalculator();
    }

});
