# Backend del Photobook Amor

Este directorio contiene el backend que sirve los datos y las imágenes del photobook.

## Estructura

```
backend/
├── data/
│   └── photobook.json          # Datos del photobook (años, fechas, rutas de imágenes)
├── images/
│   ├── 2024/                   # Imágenes del año 2024
│   ├── 2025/                   # Imágenes del año 2025
│   └── 2026/                   # Imágenes del año 2026
├── server.ts                   # Servidor Express
├── types.ts                    # Tipos TypeScript compartidos
├── package.json
└── tsconfig.json
```

## Instalación

```bash
cd backend
npm install
```

## Uso

### Modo desarrollo

```bash
npm run dev
```

El servidor iniciará en `http://localhost:3000`

### Compilar para producción

```bash
npm run build
npm start
```

## Endpoints de la API

### `GET /api/photobook`
Obtiene todos los datos del photobook

**Respuesta:**
```json
{
  "photobook": [
    {
      "year": 2024,
      "label": "2024",
      "available": true,
      "pages": [...]
    }
  ]
}
```

### `GET /api/photobook/:year`
Obtiene los datos de un año específico

**Ejemplo:** `GET /api/photobook/2024`

### `GET /api/photobook/search/:date`
Busca una página por fecha

**Ejemplo:** `GET /api/photobook/search/14/02/2024`

**Respuesta:**
```json
{
  "year": 2024,
  "pageIndex": 1,
  "page": {
    "date": "14/02/2024",
    "images": ["/images/2024/14-02-2024.jpg"]
  }
}
```

### `GET /images/:year/:filename`
Sirve las imágenes estáticas

**Ejemplo:** `http://localhost:3000/images/2024/14-02-2024.jpg`

### `GET /health`
Verifica que el servidor esté funcionando

## Agregar contenido

### 1. Agregar imágenes

Coloca tus fotos en la carpeta correspondiente al año:
- `backend/images/2024/` para fotos de 2024
- `backend/images/2025/` para fotos de 2025
- etc.

Nombra los archivos según la fecha: `dd-mm-yyyy.jpg`

### 2. Actualizar photobook.json

Edita `backend/data/photobook.json` y agrega las entradas:

```json
{
  "date": "14/02/2024",
  "images": ["/images/2024/14-02-2024.jpg"]
}
```

## Variables de entorno

Crea un archivo `.env` en el directorio backend:

```env
PORT=3000
NODE_ENV=development
```
