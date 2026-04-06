/* ============================================
   PRIME VOLT — EV Savings Calculator
   Logic for Rwanda Market
   ============================================ */

const CALC_CONFIG = {
  petrolPrice: 1829,   // RWF per Liter
  electricPrice: 320,  // RWF per kWh
  iceEfficiency: 10,   // km per Liter (Avg. SUV)
  evEfficiency: 0.18   // kWh per km (Avg. EV)
};

function initCalculator() {
  const slider = document.getElementById('range-mileage');
  const displayMileage = document.getElementById('display-mileage');
  
  const petrolYearEl = document.getElementById('petrol-year');
  const evYearEl = document.getElementById('ev-year');
  const totalSavingsEl = document.getElementById('total-savings');
  const monthlySavingsEl = document.getElementById('monthly-savings');

  if (!slider) return;

  // Listen for changes
  slider.addEventListener('input', (e) => {
    const mileage = parseInt(e.target.value);
    displayMileage.textContent = formatNumber(mileage);
    calculate(mileage);
  });

  // Initial calculation
  calculate(parseInt(slider.value));

  function calculate(monthlyMileage) {
    // Petrol Monthly Cost
    const petrolMonthly = (monthlyMileage / CALC_CONFIG.iceEfficiency) * CALC_CONFIG.petrolPrice;
    const petrolYearly = petrolMonthly * 12;

    // EV Monthly Cost
    const evMonthly = (monthlyMileage * CALC_CONFIG.evEfficiency) * CALC_CONFIG.electricPrice;
    const evYearly = evMonthly * 12;

    // Savings
    const savingsYearly = petrolYearly - evYearly;
    const savingsMonthly = petrolMonthly - evMonthly;

    // Update UI with animations
    animateValue(petrolYearEl, petrolYearly, 'RWF ');
    animateValue(evYearEl, evYearly, 'RWF ');
    animateValue(totalSavingsEl, savingsYearly, 'RWF ');
    animateValue(monthlySavingsEl, savingsMonthly, 'RWF ');
  }
}

/* --- Formatting --- */
function formatNumber(num) {
  return Math.round(num).toLocaleString('en-US');
}

function animateValue(element, target, prefix = '') {
  const currentText = element.textContent.replace(/[^0-9]/g, '');
  const start = parseInt(currentText) || 0;
  const duration = 800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const value = start + (target - start) * eased;
    
    element.textContent = prefix + formatNumber(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', initCalculator);
