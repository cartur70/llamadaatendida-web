// Formulario de contacto — validación + estado de envío.
// Nota para el equipo de Llamada Atendida: este formulario valida en cliente
// y muestra una confirmación visual. Para que los mensajes lleguen de verdad
// a un buzón o al CRM, conecta el atributo `action` del <form> a tu endpoint
// (por ejemplo, un webhook del CRM o un servicio como Formspree/FormSubmit).
import { $ } from "../utils.js";

export function initContactForm() {
  const form = $("[data-contact-form]");
  if (!form || form.dataset.contactBound) return;
  form.dataset.contactBound = "1";

  const status = $("[data-form-status]", form);
  const submitBtn = $("[data-form-submit]", form);

  function showStatus(kind, message) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("ok", "err");
    status.classList.add(kind, "is-visible");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    if (submitBtn) {
      submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
      submitBtn.textContent = "Enviando…";
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.style.pointerEvents = "none";
    }

    // Sin backend propio en este proyecto estático: simulamos el envío para
    // dar feedback inmediato. Sustituye este bloque por un fetch() real en
    // cuanto el endpoint de destino esté disponible.
    setTimeout(() => {
      showStatus("ok", "Gracias. Hemos recibido tu mensaje y te contactaremos en menos de 24 h.");
      form.reset();
      if (submitBtn) {
        submitBtn.textContent = submitBtn.dataset.originalText;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.style.pointerEvents = "";
      }
    }, 900);
  });
}
