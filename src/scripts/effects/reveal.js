// Scroll reveal — IntersectionObserver con threshold bajo + red de seguridad.
import { $$ } from "../utils.js";

export function initReveal() {
  const targets = $$(".reveal:not([data-reveal-bound]), .stagger:not([data-reveal-bound])");
  if (!targets.length) return;

  targets.forEach((el) => (el.dataset.revealBound = "1"));

  if (typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -6% 0px" }
  );

  targets.forEach((el) => io.observe(el));

  // Red de seguridad: si algo se queda oculto (fallo del observer, etc.) se revela igualmente.
  setTimeout(() => {
    targets.forEach((el) => el.classList.add("is-visible"));
  }, 6000);
}
