# Photobook Amor 💕

Un libro de fotos digital interactivo creado con React, TypeScript, Tailwind CSS y shadcn-ui.

## 🏗️ Arquitectura

El proyecto está dividido en dos partes:

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI:** shadcn-ui + Tailwind CSS
- **Estado:** React Query para data fetching
- **Routing:** React Router
- **Notificaciones:** Sonner

### Backend
- **Framework:** Express + TypeScript
- **Datos:** JSON file-based storage
- **Imágenes:** Servidas estáticamente organizadas por año

## 📦 Instalación

```bash
# Instalar dependencias del frontend y backend
npm install

# O manualmente:
npm install --legacy-peer-deps
cd backend && npm install
```

## 🚀 Uso

### Ejecutar todo el proyecto (Frontend + Backend)

```bash
npm run dev:all
```

Esto iniciará:
- **Frontend:** http://localhost:8081
- **Backend:** http://localhost:3000

### Ejecutar solo el frontend

```bash
npm run dev
```

### Ejecutar solo el backend

```bash
npm run dev:backend
```

## 📁 Estructura del Proyecto

```
photobook_amor/
├── backend/                    # Servidor backend
│   ├── data/
│   │   └── photobook.json     # Datos del photobook
│   ├── images/                # Imágenes organizadas por año
│   │   ├── 2024/
│   │   ├── 2025/
│   │   └── 2026/
│   ├── server.ts              # Servidor Express
│   ├── types.ts               # Tipos TypeScript
│   └── package.json
│
├── src/                       # Código fuente del frontend
│   ├── components/            # Componentes React
│   │   ├── Navbar.tsx
│   │   ├── Photobook.tsx
│   │   ├── PhotobookPage.tsx
│   │   └── ui/               # Componentes UI de shadcn
│   ├── pages/                # Páginas
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── api.ts            # Cliente API
│   │   └── utils.ts
│   ├── data/
│   │   └── photobook.ts      # Re-exporta tipos del backend
│   ├── hooks/                # React hooks personalizados
│   ├── App.tsx
│   └── main.tsx
│
├── public/                    # Assets estáticos
├── .env.example              # Variables de entorno de ejemplo
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Agregar Contenido

### 1. Agregar Fotos

1. Coloca tus fotos en la carpeta del año correspondiente:
   ```
   backend/images/2024/14-02-2024.jpg
   ```

2. Nombra los archivos según la fecha: `dd-mm-yyyy.jpg`

### 2. Actualizar Datos

Edita `backend/data/photobook.json`:

```json
{
  "photobook": [
    {
      "year": 2024,
      "label": "2024",
      "available": true,
      "pages": [
        {
          "date": "14/02/2024",
          "images": ["/images/2024/14-02-2024.jpg"]
        }
      ]
    }
  ]
}
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

## 📚 API Endpoints

### `GET /api/photobook`
Obtiene todos los datos del photobook

### `GET /api/photobook/:year`
Obtiene datos de un año específico

### `GET /api/photobook/search/:date`
Busca una página por fecha (formato: dd/mm/yyyy)

### `GET /images/:year/:filename`
Sirve imágenes estáticas

### `GET /health`
Health check del backend

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el frontend
- `npm run dev:backend` - Inicia el backend
- `npm run dev:all` - Inicia frontend y backend simultáneamente
- `npm run build` - Compila el frontend para producción
- `npm run lint` - Ejecuta el linter
- `npm test` - Ejecuta los tests
- `npm run backend:install` - Instala dependencias del backend

## 🎯 Características

- ✅ Navegación por años
- ✅ Búsqueda por fecha
- ✅ Paginación con animaciones
- ✅ Diseño responsivo
- ✅ Tema personalizado con Tailwind
- ✅ Efectos visuales de libro físico
- ✅ Backend API REST
- ✅ Carga dinámica de imágenes
- ✅ Notificaciones con Sonner

## 🌐 Tecnologías

### Frontend
- React 18.3
- TypeScript 5.8
- Vite 5.4
- Tailwind CSS 3.4
- shadcn-ui
- React Router 6
- TanStack Query 5
- Sonner

### Backend
- Node.js
- Express 4
- TypeScript
- CORS

## 📝 Licencia

Proyecto privado - Todos los derechos reservados
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
