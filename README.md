# toolset

Herramientas hechas en html y javascript puro para ayudar a realizar tareas sencillas

## Estructura

- `index.html`: home principal.
- `config/processes.json`: configuración de módulos y rutas.
- `shared/`: utilidades y estilos compartidos entre procesos.
- `modules/pdf-photo/index.html`: generador de impresión de fotos 4" x 3" en A4.

## Configuración de módulos

Se cambia en `config/processes.json` para agregar más procesos:

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

## heic-to-jpg-png
Tenia un iphone y las fotos se guardaban en ese formato

## pdf photo
Acomodar 16 fotografias en formato de impresion de 3" x 7"
