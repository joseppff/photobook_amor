# 🚀 Guía de Despliegue: Photobook Amor

## 📦 Arquitectura
- **Frontend**: GitHub Pages (estático)
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
   - **Name**: `photobook-backend` (o el que prefieras)
   - **Region**: Oregon (US West) o el más cercano
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 1.3. Variables de entorno (opcional)
En la sección "Environment", agrega:
- `NODE_ENV` = `production`

### 1.4. Desplegar
1. Haz clic en **"Create Web Service"**
2. Espera 5-10 minutos mientras Render construye y despliega
3. Copia la URL que te dé Render (ejemplo: `https://photobook-backend-xxxx.onrender.com`)

---

## 🌐 Paso 2: Configurar Frontend para usar Backend de Render

### 2.1. Actualizar .env.production
1. Abre el archivo `.env.production` en la raíz del proyecto
2. Reemplaza la URL con la de tu backend de Render:
   ```
   VITE_API_URL=https://photobook-backend-xxxx.onrender.com
   ```

### 2.2. Redesplegar Frontend
```powershell
npm run deploy
```

---

## ✅ Paso 3: Verificar que funcione

1. Ve a: `https://joseppff.github.io/photobook_amor/`
2. Deberías ver las imágenes de bienvenida cargando
3. El photobook debería funcionar correctamente

---

## 🔄 Actualizaciones futuras

### Actualizar contenido (imágenes/datos):
```powershell
# Solo actualizar backend
git add backend/
git commit -m "Actualizar contenido del photobook"
git push origin main
```
Render detectará el cambio y redesplegará automáticamente.

### Actualizar diseño/frontend:
```powershell
git add .
git commit -m "Actualizar diseño"
git push origin main
npm run deploy
```

---

## ⚠️ Notas importantes

### Plan gratuito de Render:
- ✅ Gratis para siempre
- ⚠️ El backend se "duerme" después de 15 minutos de inactividad
- ⚠️ Primera carga puede tardar 30-60 segundos en despertar
- ✅ Después funciona normalmente

### Solución al delay inicial:
Puedes configurar un servicio como [UptimeRobot](https://uptimerobot.com) (gratis) para hacer ping cada 5 minutos y mantener el backend activo.

---

## 🆘 Solución de problemas

### El backend no responde:
- Revisa los logs en Render Dashboard
- Verifica que el Build Command haya funcionado
- Asegúrate de que el puerto sea dinámico: `process.env.PORT`

### Las imágenes no cargan:
- Verifica que la carpeta `backend/images` se haya subido a GitHub
- Revisa la consola del navegador para ver errores de CORS
- El backend ya tiene CORS configurado, debería funcionar

### Error 404 en rutas:
- Asegúrate de que GitHub Pages esté configurado con la rama `gh-pages`
- Verifica que `basename="/photobook_amor"` esté en App.tsx

---

## 📝 URLs finales

- **Frontend**: https://joseppff.github.io/photobook_amor/
- **Backend**: https://tu-backend.onrender.com
- **API Health Check**: https://tu-backend.onrender.com/health
