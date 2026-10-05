// Cotizador de ahorro — compara el coste de cubrir X llamadas/mes con un
// equipo de teleoperadores humanos frente al sistema híbrido IA + humanos
// de Llamada Atendida. Cifras orientativas (ver disclaimer en el propio
// componente). Mismo script para el simulador de la home y el de
// Atención 24/7 (ver CotizadorPanel.astro).
//
// Las tarifas se cargan en caliente desde /config/tarifas.json (ver
// public/config/tarifas.json y docs/simulador-tarifas.md) para poder
// cambiarlas sin tocar código ni recompilar. Si el archivo no carga o
// algún campo no es válido, se usan en silencio los valores por defecto
// embebidos en el HTML (data-config, generado desde COTIZADOR en
// src/data/brand.js) — el simulador nunca muestra un error al visitante.
import { $ } from "../utils.js";

const TARIFAS_URL = "/config/tarifas.json";

const NUMERIC_FIELDS = [
  "llamadasPorEmpleado",
  "costeEmpleadoMes",
  "costeLlamadaIA",
  "factorCobertura247Humano",
  "factorCobertura247IA",
  "minLlamadas",
  "maxLlamadas",
  "stepLlamadas",
  "defaultLlamadas",
];

const money = (n) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

function isValidNumber(n) {
  return typeof n === "number" && Number.isFinite(n) && n > 0;
}

/** Valida cada campo de tarifas.json de forma independiente: el que no sea
 * un número finito mayor que 0 se sustituye por el valor por defecto
 * embebido, sin invalidar el resto del archivo. Devuelve siempre una
 * configuración completa y utilizable. */
export function mergeValidConfig(data, fallback) {
  if (!data || typeof data !== "object") return { changed: false, config: fallback };

  const config = { ...fallback };
  let changed = false;

  for (const key of NUMERIC_FIELDS) {
    if (isValidNumber(data[key])) {
      config[key] = data[key];
      changed = true;
    }
  }

  if (!(config.minLlamadas < config.maxLlamadas)) {
    config.minLlamadas = fallback.minLlamadas;
    config.maxLlamadas = fallback.maxLlamadas;
  }

  if (!(config.defaultLlamadas >= config.minLlamadas && config.defaultLlamadas <= config.maxLlamadas)) {
    config.defaultLlamadas = fallback.defaultLlamadas;
  }

  return { changed, config };
}

export function initCotizador() {
  const root = $("[data-cotizador]");
  if (!root || root.dataset.cotizadorBound) return;
  root.dataset.cotizadorBound = "1";

  let defaultConfig;
  try {
    defaultConfig = JSON.parse(root.dataset.config);
  } catch {
    console.error("[initCotizador] data-config inválido");
    return;
  }

  let config = defaultConfig;

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

  let userInteracted = false;

  function updateSliderFill() {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--range-progress", `${pct}%`);
  }

  function clampCalls(value) {
    const n = Number.isFinite(value) ? value : config.defaultLlamadas;
    return Math.min(config.maxLlamadas, Math.max(config.minLlamadas, n));
  }

  function applyRangeToInputs() {
    slider.min = config.minLlamadas;
    slider.max = config.maxLlamadas;
    slider.step = config.stepLlamadas;
    if (numberInput) {
      numberInput.min = config.minLlamadas;
      numberInput.max = config.maxLlamadas;
      numberInput.step = config.stepLlamadas;
    }
  }

  function render() {
    const calls = parseFloat(slider.value);
    const is247 = toggle ? toggle.checked : false;

    const employees = Math.ceil(calls / config.llamadasPorEmpleado);
    const humanCost = employees * config.costeEmpleadoMes * (is247 ? config.factorCobertura247Humano : 1);
    const tarifaEfectiva = config.costeLlamadaIA * (is247 ? config.factorCobertura247IA : 1);
    const iaCost = calls * tarifaEfectiva;
    const rawSavings = humanCost - iaCost;
    const hasSavings = rawSavings > 0;
    const savings = Math.max(0, rawSavings);
    const pct = hasSavings && humanCost > 0 ? (savings / humanCost) * 100 : 0;

    if (callsValueLabel) callsValueLabel.textContent = `${calls.toLocaleString("es-ES")} llamadas/mes`;
    if (numberInput && document.activeElement !== numberInput) numberInput.value = calls;
    if (employeesLabel) employeesLabel.textContent = `${employees} ${employees === 1 ? "persona" : "personas"}`;
    if (costHuman) costHuman.textContent = money(humanCost);
    if (costIa) costIa.textContent = money(iaCost);
    // Con parámetros inusuales (p. ej. tarifas editadas a mano) el coste IA podría
    // superar al humano: en vez de un "0 €" confuso o un importe negativo, se indica
    // explícitamente que no hay ahorro con ese escenario.
    if (savingsValue) savingsValue.textContent = hasSavings ? money(savings) : "Sin ahorro estimado";
    if (savingsAnnual) savingsAnnual.textContent = hasSavings ? `${money(savings * 12)} al año` : "—";
    if (savingsPercent) savingsPercent.textContent = `${pct.toFixed(0)}%`;

    updateSliderFill();
  }

  slider.addEventListener("input", () => {
    userInteracted = true;
    render();
  });
  if (toggle) toggle.addEventListener("change", render);

  if (numberInput) {
    numberInput.addEventListener("input", () => {
      userInteracted = true;
      const value = clampCalls(parseFloat(numberInput.value));
      slider.value = value;
      render();
    });
    numberInput.addEventListener("blur", () => {
      numberInput.value = slider.value;
    });
  }

  render();

  fetch(TARIFAS_URL, { cache: "no-cache" })
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null)
    .then((data) => {
      if (data === null) {
        // Fetch fallido o respuesta no-OK: se queda con los valores por defecto ya
        // renderizados. Aviso solo en consola (para depurar), nunca visible para el visitante.
        console.warn(`[initCotizador] no se pudo cargar ${TARIFAS_URL}, usando valores por defecto`);
        return;
      }
      const { changed, config: merged } = mergeValidConfig(data, defaultConfig);
      if (!changed) return;
      config = merged;
      applyRangeToInputs();
      slider.value = userInteracted ? clampCalls(parseFloat(slider.value)) : clampCalls(config.defaultLlamadas);
      render();
    });
}
