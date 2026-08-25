# Arquitectura de Producto y Software — Rediseño Llamada Atendida

**Fecha:** Agosto 2026
**Alcance:** llamadaatendida.com (corporativa B2B) + tienda.llamadaatendida.com (e-commerce)
**Entorno de desarrollo:** Claude Code Desktop
**Entorno de producción:** Hosting compartido cPanel

---

## 1. Decisión de stack (confirmada)

| Sitio | Situación actual | Stack propuesto | Por qué |
|---|---|---|---|
| `llamadaatendida.com` | WordPress (tema genérico) | **Astro (SSG, HTML/CSS/JS estático)** | Prioridad = imagen premium + SEO. Astro genera HTML puro sin runtime de servidor: Core Web Vitals casi perfectos (LCP/CLS/INP), control pixel-a-pixel del diseño (nada de "se ve a WordPress"), cero superficie de ataque (no hay PHP/MySQL que hackear), despliegue trivial en cPanel (subes archivos, sin Node corriendo). Se edita como código en Claude Code: componentes reutilizables por "pilar" de color, muy mantenible. |
| `tienda.llamadaatendida.com` | No existe | **WordPress + WooCommerce** | Es la pieza correcta aquí: el ecosistema de plugins de sync de catálogo/stock con proveedores tipo Megasur, pasarelas de pago, gestión de pedidos y facturación ya está resuelto y probado. No tiene sentido reinventar un carrito transaccional a medida. |

**Por qué NO WordPress para todo:** perderías exactamente lo que pediste como prioridad 1 (diseño diferencial + SEO). Un tema de WordPress, por bueno que sea, siempre carga con overhead (jQuery, CSS de terceros, plugins) que penaliza velocidad, y el "techo" de personalización visual es más bajo que construir a medida. Con Claude Code como entorno de desarrollo, construir en Astro no es más lento que configurar WordPress — es más rápido y el resultado es tuyo al 100%.

**Por qué NO Astro para la tienda:** reconstruir un carrito, checkout, gestión de stock e integración con Megasur desde cero en Astro sería reinventar WooCommerce con más riesgo y sin beneficio real, ya que una tienda no necesita el mismo nivel de "arte" en cada página — necesita fiabilidad transaccional.

---

## 2. Estrategia de preservación de SEO (crítico, dado que priorizas no perder posicionamiento)

El sitio actual en WordPress tiene, al menos, estas URLs indexadas que hay que mapear:

```
/index                    → /
/servicios                 → /atencion-24-7  (redirect 301, contenido redistribuido en pilares)
/como_funciona              → /como-funciona
/tecnologia                  → contenido absorbido en /atencion-24-7 y /tienda
/emarketing                  → evaluar si se retira o se reconvierte en landing de campaña
/contacto                    → /contacto
/nueva_ley                   → mantener como artículo/recurso (tiene enlaces entrantes y trata Ley de Atención al Cliente — buen imán de SEO, no la pierdas)
/prepara_tu_verano            → archivar o fusionar (contenido estacional, bajo valor SEO a largo plazo)
/politica_de_privacidad, /politica_de_cookies, /aviso_legal → mantener igual, rehacer visualmente
```

**Pasos obligatorios antes de publicar:**
1. Exportar la lista completa de URLs indexadas desde Google Search Console (no solo las del menú — habrá posts/páginas huérfanas).
2. Crear un mapeo 1:1 antigua URL → nueva URL.
3. Implementar **redirects 301** (en `.htaccess`, ya que cPanel usa Apache) para cada URL que cambie de ruta — nunca 302, y nunca dejar 404.
4. Conservar el mismo `title`/`meta description` de las páginas con buen rendimiento, optimizándolos, no sustituyéndolos por otros radicalmente distintos.
5. Mantener el **NAP** (nombre, dirección, teléfono) idéntico en el nuevo footer — cambia el diseño, no el dato: Calle Concepción Arenal 1 1ºA, 28924 Alcorcón (Madrid), +34 910 971 537.
6. Volver a enviar el sitemap.xml nuevo en Search Console el mismo día del cambio.
7. Marcado **Schema.org** (`LocalBusiness` + `Organization` + `FAQPage` en landings) — el WordPress actual probablemente no lo tiene bien implementado; en Astro lo controlamos a mano y es una ventaja competitiva real frente a la competencia del sector.

---

## 3. Arquitectura de información (sitemap completo)

```
llamadaatendida.com/
│
├── /                                → Home (estructura del punto 4 del brief)
│
├── /captacion-presencia/            🟢 Pilar 1 — Verde Esmeralda
│   ├── diseño web de conversión
│   ├── Google Business Profile
│   └── gestión de reputación/reseñas
│
├── /atencion-24-7/                  🔵 Pilar 2 — Turquesa
│   ├── recepción híbrida de llamadas
│   ├── Agentes IA (voz + WhatsApp)
│   └── agendamiento de citas
│
├── /proteccion-cumplimiento/        🟣 Pilar 3 — Índigo
│   ├── RGPD / LOPD
│   ├── avisos legales
│   └── Seguro de Responsabilidad Civil
│
├── /conectividad-equipamiento/      🟪 Pilar 4 — Morado
│   ├── fibra alta velocidad
│   ├── línea móvil B2B
│   ├── alarmas
│   └── enlace destacado → tienda.llamadaatendida.com
│
├── /packs/                          → comparativa de los 3 packs (tabla)
│   ├── /packs/inicio-digital
│   ├── /packs/atencion-24-7        (destacado "más vendido")
│   └── /packs/negocio-conectado-360
│
├── /nueva-ley-atencion-cliente/     → conservar (SEO existente)
│
├── /contacto/
├── /aviso-legal/  /politica-privacidad/  /politica-cookies/
│
└── LANDINGS DE CAMPAÑA (sin enlazar desde el menú, solo desde Ads)
    ├── /web-autonomos/            → Google/Meta Ads: diseño web
    ├── /atencion-ia/              → Google/Meta Ads: llamadas + WhatsApp IA
    └── /telefonia-empresas/       → Google/Meta Ads: fibra/conectividad B2B

tienda.llamadaatendida.com/          → WordPress + WooCommerce (catálogo Megasur)
```

**Nota de menú:** con 4 pilares + packs + tienda ya son 6 entradas de menú — está al límite de lo que un usuario procesa bien. Sugiero fusionar visualmente "Packs" dentro del Hero/Home (como en tu propio brief, punto 5) y dejar el menú superior solo con los 4 pilares + Tienda + Contacto, tal como ya lo planteaste.

---

## 4. Sistema de diseño (colores ajustados)

**Base neutra (90% del sitio):** blanco `#FFFFFF` y grises `slate` (`#F8FAFC`, `#64748B`, `#0F172A` para texto).

**Colores de pilar → uso restringido a:** icono del bloque, borde superior de tarjeta (4px), badge de categoría, hover de enlaces relacionados. **Nunca** como fondo de sección completo salvo en el Hero (un único degradado sutil, no plano) y en la Tienda Tech.

| Pilar | Color | Uso permitido | Contraste con blanco (AA) |
|---|---|---|---|
| Captación | `#10B981` | acento, icono, botón secundario | Cumple solo en texto grande/bold |
| Atención 24/7 | `#0EA5E9` | acento, icono | Cumple solo en texto grande/bold |
| Protección | `#1E1B4B` | fondo oscuro de sección (footer, CTA final) | Cumple con texto blanco |
| Conectividad | `#7C3AED` | acento, icono | Cumple en texto grande/bold |
| CTA único | `#F97316` | **solo** botones de conversión (todo el sitio) | Cumple para botón grande |

Tienda Tech: `#0F172A` + blanco + `#F97316` — se mantiene igual, funciona.

**Tipografía sugerida:** una sans-serif geométrica para titulares (Inter, Sora o Manrope — gratuitas, con excelente legibilidad y look "tech-corporativo") + la misma familia en peso regular para cuerpo. Evitar mezclar más de 2 familias.

---

## 5. Estructura de carpetas del proyecto (Astro, para Claude Code)

```
llamadaatendida-web/
├── src/
│   ├── components/
│   │   ├── layout/        (Header, Footer, Nav)
│   │   ├── sections/       (Hero, PilaresGrid, PacksTable, ProblemaSolucion, ProcesoPasos, Testimonios)
│   │   ├── pilares/         (PilarCard.astro — recibe color como prop)
│   │   └── ui/                (Button, Badge, ContactWidget)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── LandingLayout.astro   (layout minimalista, sin menú completo, para /web-autonomos, etc.)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── captacion-presencia.astro
│   │   ├── atencion-24-7.astro
│   │   ├── proteccion-cumplimiento.astro
│   │   ├── conectividad-equipamiento.astro
│   │   ├── packs/
│   │   ├── web-autonomos.astro
│   │   ├── atencion-ia.astro
│   │   └── telefonia-empresas.astro
│   ├── styles/
│   │   └── tokens.css      (variables CSS: colores, tipografía — un solo lugar de verdad)
│   └── data/
│       └── packs.json, testimonios.json  (contenido separado del componente, fácil de editar)
├── public/
│   └── assets/ (logo actual, sin tocar)
├── astro.config.mjs
└── .htaccess                (redirects 301, generado tras el mapeo de URLs)
```

---

## 6. Despliegue en cPanel compartido

1. `npm run build` genera una carpeta `dist/` con HTML/CSS/JS estático — no requiere Node en el servidor.
2. Subir el contenido de `dist/` a `public_html/` vía FTP/SFTP o el Administrador de Archivos de cPanel (o Git Version Control de cPanel si el hosting lo soporta, para desplegar con `git push`).
3. Subdominio `tienda.` se crea desde cPanel → Subdominios, apuntando a `public_html/tienda/`, con su propia instalación de WordPress + WooCommerce (Softaculous o instalación manual + base de datos MySQL propia).
4. Certificado SSL (AutoSSL de cPanel, gratuito) para ambos hosts.
5. El `.htaccess` en la raíz de `public_html/` lleva las reglas de redirección 301 del punto 2.

---

## 7. Integraciones

- **CRM de llamadas (ya existe):** no se toca su lógica. Desde la web solo se necesitan los puntos de entrada: enlaces `tel:`, `https://wa.me/`, y formularios que apunten al endpoint/API que el CRM ya expone (o a un webhook intermedio). Aquí necesito saber si el CRM tiene API/webhook de entrada de leads para conectarlo al formulario de "Auditoría Gratis".
- **Megasur (catálogo tienda):** al no estar integrado aún, el orden correcto es: (1) confirmar con Megasur si ofrecen feed CSV/XML o API REST, (2) instalar plugin de sincronización en WooCommerce compatible (ej. WP All Import + su feed, o un conector dedicado si Megasur lo tiene), (3) mapear categorías/atributos antes de importar el catálogo completo.
- **Canales conversacionales (WhatsApp IA, agente IA de consultas):** se integran como widgets embebidos (script de terceros) tanto en la web Astro como en la tienda WooCommerce — no forman parte del build, se cargan async para no penalizar el rendimiento.

---

## 8. Checklist de estándar de calidad antes de publicar

- Lighthouse ≥ 95 en Performance, Accessibility, SEO (Astro lo hace alcanzable de forma realista)
- Contraste AA en todo texto sobre color
- Schema.org: `LocalBusiness`, `Organization`, `BreadcrumbList`, `FAQPage` en landings
- Open Graph + Twitter Cards por página (para que los anuncios/compartidos en redes se vean bien)
- Sitemap.xml y robots.txt correctos, con la tienda como host separado también declarado
- Formularios con validación y protección anti-spam (honeypot o similar)
- Diseño responsive verificado en 375px, 768px y 1440px como mínimo
