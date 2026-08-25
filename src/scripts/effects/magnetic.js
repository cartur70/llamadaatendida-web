// Magnetic buttons — atracción sutil hacia el cursor. Solo con hover fino
// (gotcha: nunca gatear por prefers-reduced-motion, solo por capacidad de hover).
import { $$, fineHover } from "../utils.js";

const STRENGTH = 0.22;

export function initMagnetic() {
  if (!fineHover()) return;
  const targets = $$(
    ".btn-primary:not([data-magnetic-bound]):not([data-no-magnetic]), .btn-dark:not([data-magnetic-bound]):not([data-no-magnetic])"
  );
  targets.forEach((el) => {
    el.dataset.magneticBound = "1";

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
    });

    el.addEventListener("mouseout", (e) => {
      if (el.contains(e.relatedTarget)) return;
      el.style.transform = "";
    });
  });
}
