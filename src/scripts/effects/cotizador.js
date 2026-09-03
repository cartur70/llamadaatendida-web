// Cotizador de ahorro — compara el coste de cubrir X llamadas/mes con un
// equipo de teleoperadores humanos frente al sistema híbrido IA + humanos
// de Llamada Atendida. Cifras orientativas (ver disclaimer en el propio
// componente).
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

  const slider = $("[data-calls-input]", root);
  const numberInput = $("[data-calls-number]", root);
  const callsValueLabel = $("[data-calls-value]", root);
  const toggle = $("[data-247-toggle]", root);
  const costHuman = $("[data-cost-human]", root);
  const employeesLabel = $("[data-employees]", root);
  const costIa = $("[data-cost-ia]", root);
  const savingsValue = $("[data-savings-value]", root);
  const savingsAnnual = $("[data-savings-annual]", root);
  const savingsPercent = $("[data-savings-percent]", root);

  if (!slider) return;

  function updateSliderFill() {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--range-progress", `${pct}%`);
  }

  function clampCalls(value) {
    const n = Number.isFinite(value) ? value : config.defaultLlamadas;
    return Math.min(config.maxLlamadas, Math.max(config.minLlamadas, n));
  }

  function render() {
    const calls = parseFloat(slider.value);
    const is247 = toggle ? toggle.checked : false;

    const employees = Math.ceil(calls / config.llamadasPorEmpleado);
    const humanCost = employees * config.costeEmpleadoMes * (is247 ? config.factorCobertura247Humano : 1);
    const iaCostPerCall = config.costeLlamadaIA * (is247 ? config.factorCobertura247IA : 1);
    const iaCost = calls * iaCostPerCall;
    const savings = Math.max(0, humanCost - iaCost);
    const pct = humanCost > 0 ? (savings / humanCost) * 100 : 0;

    if (callsValueLabel) callsValueLabel.textContent = `${calls.toLocaleString("es-ES")} llamadas/mes`;
    if (numberInput && document.activeElement !== numberInput) numberInput.value = calls;
    if (employeesLabel) employeesLabel.textContent = `${employees} ${employees === 1 ? "persona" : "personas"}`;
    if (costHuman) costHuman.textContent = money(humanCost);
    if (costIa) costIa.textContent = money(iaCost);
    if (savingsValue) savingsValue.textContent = money(savings);
    if (savingsAnnual) savingsAnnual.textContent = `${money(savings * 12)} al año`;
    if (savingsPercent) savingsPercent.textContent = `${pct.toFixed(0)}%`;

    updateSliderFill();
  }

  slider.addEventListener("input", render);
  if (toggle) toggle.addEventListener("change", render);

  if (numberInput) {
    numberInput.addEventListener("input", () => {
      const value = clampCalls(parseFloat(numberInput.value));
      slider.value = value;
      render();
    });
    numberInput.addEventListener("blur", () => {
      numberInput.value = slider.value;
    });
  }

  render();
}
