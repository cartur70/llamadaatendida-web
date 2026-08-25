// Utilidades compartidas por los módulos de efectos.

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const fineHover = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Envuelve un init* para que un fallo no rompa el resto de la página. */
export function safe(fn, name) {
  try {
    fn();
  } catch (err) {
    console.error(`[${name || fn.name || "init"}] failed:`, err);
  }
}

/** Ejecuta boot() ya (si el DOM está listo) o en DOMContentLoaded, y siempre
 * también en astro:page-load (ClientRouter no dispara DOMContentLoaded otra vez). */
export function onReady(boot) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  document.addEventListener("astro:page-load", boot);
}
