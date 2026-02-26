# Backend del Photobook

## Configuración para Render

Este backend está listo para desplegarse en Render.

### Variables de entorno:
- `PORT`: Puerto del servidor (Render lo asigna automáticamente)
- `NODE_ENV`: production

### Rutas principales:
- `GET /api/photobook` - Obtiene todos los datos del photobook
- `GET /api/photobook/:year` - Obtiene datos de un año específico
- `GET /api/photobook/search/:date` - Busca por fecha
- `GET /api/welcome-images` - Obtiene imágenes de bienvenida
- `GET /health` - Health check
- `/images/*` - Archivos estáticos de imágenes
