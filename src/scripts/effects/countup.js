// Count-up para estadísticas — arranca al entrar en viewport, siempre corre
// (no es intrusivo: es feedback funcional, no se gatea con reduced-motion).
import { $$ } from "../utils.js";

function animateCount(el) {
  const target = parseFloat(el.dataset.countTo);
  const decimals = el.dataset.countTo.includes(".") ? el.dataset.countTo.split(".")[1].length : 0;
  const prefix = el.dataset.countPrefix || "";
  const suffix = el.dataset.countSuffix || "";
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = target * eased;
    el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export function initCountUp() {
  const targets = $$("[data-count-to]:not([data-count-bound])");
  if (!targets.length) return;
  targets.forEach((el) => (el.dataset.countBound = "1"));

  if (typeof IntersectionObserver === "undefined") {
    targets.forEach(animateCount);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );
  targets.forEach((el) => io.observe(el));

  setTimeout(() => {
    targets.forEach((el) => {
      if (!el.dataset.countStarted) animateCount(el);
    });
  }, 6000);
}
