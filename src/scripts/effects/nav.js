// Nav: se solidifica al hacer scroll + menú móvil.
import { $, $$ } from "../utils.js";

export function initNav() {
  const nav = $("[data-nav]");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-solid", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("[data-menu-toggle]");
  const menu = $("[data-mobile-menu]");
  if (!burger || !menu || burger.dataset.navBound) return;
  burger.dataset.navBound = "1";

  const closeMenu = () => {
    menu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    menu.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Cerrar menú");
    document.body.style.overflow = "hidden";
  };

  burger.addEventListener("click", () => {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  $$("[data-mobile-menu] a").forEach((a) => a.addEventListener("click", closeMenu));

  // Acordeón del dropdown "Soluciones" dentro del menú hamburguesa.
  $$("[data-mobile-dropdown]").forEach((wrap) => {
    const toggle = $("[data-dropdown-toggle]", wrap);
    const panel = $("[data-dropdown-panel]", wrap);
    if (!toggle || !panel) return;
    toggle.addEventListener("click", () => {
      const isOpen = wrap.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });
}
