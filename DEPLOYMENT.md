# 🚀 Guía de Despliegue: Photobook Amor

## 📦 Arquitectura
- **Frontend**: Cloudflare Pages (estático)
- **Backend**: Render (Node.js + API + imágenes)

---

## 🔧 Paso 1: Desplegar Backend en Render

### 1.1. Crear cuenta en Render
1. Ve a [https://render.com](https://render.com)
2. Regístrate con tu cuenta de GitHub

### 1.2. Crear nuevo Web Service
1. Haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio: `joseppff/photobook_amor`
3. Configura el servicio:
   - **Name**: `photobook-backend`
   - **Region**: Oregon (US West) o el más cercano
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 1.3. Variables de entorno
En la sección "Environment", agrega:
- `NODE_ENV` = `production`

### 1.4. Desplegar
1. Haz clic en **"Create Web Service"**
2. Espera 5-10 minutos mientras Render construye y despliega
3. Copia la URL que te dé Render (ejemplo: `https://photobook-backend-xxxx.onrender.com`)

---

## 🌐 Paso 2: Configurar Frontend para Cloudflare Pages

### 2.1. Actualizar .env.production
Abre `.env.production` y actualiza la URL del backend:
```
VITE_API_URL=https://photobook-backend-xxxx.onrender.com
```

### 2.2. Conectar repositorio a Cloudflare Pages
1. Ve a [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Entra a **Pages** → **"Create a project"** → **"Connect to Git"**
3. Selecciona el repositorio `photobook_amor`
4. Configura el build:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Haz clic en **"Save and Deploy"**

### 2.3. Actualizaciones futuras
Cloudflare detecta automáticamente los cambios al hacer `git push`:
```powershell
git add .
git commit -m "Actualizar proyecto"
git push origin main
```

---

## ✅ Paso 3: Verificar que funcione

1. Ve a: `https://photobook-amor.pages.dev`
2. Deberías ver las imágenes de bienvenida cargando
3. El photobook debería funcionar correctamente

---

## ⚠️ Notas importantes

### Plan gratuito de Render:
- ✅ Gratis para siempre
- ⚠️ El backend se "duerme" después de 15 minutos de inactividad
- ⚠️ Primera carga puede tardar 30-60 segundos en despertar

### Solución al delay inicial:
Configura [UptimeRobot](https://uptimerobot.com) (gratis) para hacer ping cada 5 minutos y mantener el backend activo.

---

## 🆘 Solución de problemas

### El backend no responde:
- Revisa los logs en Render Dashboard
- Verifica que el Build Command haya funcionado
- Asegúrate de que el puerto sea dinámico: `process.env.PORT`

### Las imágenes no cargan:
- Verifica que la carpeta `backend/images` esté subida a GitHub
- Revisa la consola del navegador para errores de CORS

---

## 📝 URLs finales

- **Frontend**: https://photobook-amor.pages.dev
- **Backend**: https://tu-backend.onrender.com
- **API Health Check**: https://tu-backend.onrender.com/health
