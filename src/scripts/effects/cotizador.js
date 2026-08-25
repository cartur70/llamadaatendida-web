// Cotizador de ahorro — compara el coste de cubrir X horas de atención al mes
// con teleoperadores humanos frente al sistema híbrido IA + humanos de Llamada
// Atendida. Cifras orientativas (ver disclaimer en el propio componente).
import { $ } from "../utils.js";

const money = (n) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function initCotizador() {
  const root = $("[data-cotizador]");
  if (!root || root.dataset.cotizadorBound) return;
  root.dataset.cotizadorBound = "1";

  let config;
  try {
    config = JSON.parse(root.dataset.config);
  } catch {
    console.error("[initCotizador] data-config inválido");
    return;
  }

  const slider = $("[data-hours-input]", root);
  const hoursValue = $("[data-hours-value]", root);
  const toggle = $("[data-247-toggle]", root);
  const costHuman = $("[data-cost-human]", root);
  const costIa = $("[data-cost-ia]", root);
  const savingsValue = $("[data-savings-value]", root);
  const savingsAnnual = $("[data-savings-annual]", root);
  const savingsPercent = $("[data-savings-percent]", root);

  if (!slider) return;

  function updateSliderFill() {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--range-progress", `${pct}%`);
  }

  function render() {
    const hours = parseFloat(slider.value);
    const is247 = toggle ? toggle.checked : false;

    const humanCost = hours * config.costeHoraHumano * (is247 ? config.factorCobertura247 : 1);
    const iaCost = hours * config.costeHoraIA;
    const savings = Math.max(0, humanCost - iaCost);
    const pct = humanCost > 0 ? (savings / humanCost) * 100 : 0;

    if (hoursValue) hoursValue.textContent = `${hours} h/mes`;
    if (costHuman) costHuman.textContent = money(humanCost);
    if (costIa) costIa.textContent = money(iaCost);
    if (savingsValue) savingsValue.textContent = money(savings);
    if (savingsAnnual) savingsAnnual.textContent = `${money(savings * 12)} al año`;
    if (savingsPercent) savingsPercent.textContent = `${pct.toFixed(0)}%`;

    updateSliderFill();
  }

  slider.addEventListener("input", render);
  if (toggle) toggle.addEventListener("change", render);

  render();
}
