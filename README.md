# toolset

Toolset para automatización de procesos con una home configurable por JSON.

## Estructura

- `index.html`: home principal.
- `config/processes.json`: configuración de módulos y rutas.
- `shared/`: utilidades y estilos compartidos entre procesos.
- `modules/pdf-photo/index.html`: generador de impresión de fotos 4" x 3" en A4.

## Configuración de módulos

Edita `config/processes.json` para agregar más procesos:

```json
{
  "appName": "Toolset",
  "homeTitle": "Módulos de automatización",
  "homeDescription": "Selecciona un proceso para comenzar.",
  "processes": [
    {
      "id": "photo-pdf",
      "name": "Generador PDF de fotos",
      "description": "Crea páginas A4 listas para imprimir con fotos en formato 4\" x 3\".",
      "path": "modules/pdf-photo/index.html"
    }
  ]
}
```

## Generador de fotos

1. Abre `modules/pdf-photo/index.html` desde la home.
2. Sube una o varias imágenes.
3. Haz clic en **Generar archivo para imprimir**.
4. Se abrirá una ventana preparada para impresión/PDF con recortes 4" x 3" acomodados automáticamente.
