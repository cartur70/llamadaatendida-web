## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Reglas del proyecto (obligatorias en todas las tareas)

- Estilos aprobados: no cambiar colores, tipografías, tokens/variables CSS, logo, imágenes ni la estructura visual existente. Solo se AÑADE contenido; no se elimina nada de lo existente salvo que se pida explícitamente.
- Si un cambio exige tocar un estilo existente, aplícalo solo de forma acotada al caso concreto y descríbelo en el resumen final.
- Una rama git por fase ("fase-N-nombre") y commits pequeños.
- `npm run build` debe terminar sin errores ni warnings nuevos.
- Verificar siempre en anchos 375, 768, 1024, 1280 y 1440 px, y en alturas de ventana de 650, 800 y 1000 px cuando haya layouts de dos columnas o hero.
- Al terminar: resumen con archivos modificados, qué cambió en cada uno y qué comprobaste. Si hay dudas de estilo o alineación, listarlas y NO cambiarlas sin aprobación.
- No inventar cifras, plazos, precios ni datos de la empresa. Español de España.
- Servidor de desarrollo: astro dev --background (gestionar con astro dev stop|status|logs).
