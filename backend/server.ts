import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import type { PhotobookData, YearData } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// API Routes
app.get('/api/photobook', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'photobook.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const photobookData: PhotobookData = JSON.parse(data);
    res.json(photobookData);
  } catch (error) {
    console.error('Error reading photobook data:', error);
    res.status(500).json({ error: 'Error al cargar los datos del photobook' });
  }
});

// Get specific year data
app.get('/api/photobook/:year', async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const dataPath = path.join(__dirname, 'data', 'photobook.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const photobookData: PhotobookData = JSON.parse(data);
    
    const yearData = photobookData.photobook.find((y: YearData) => y.year === year);
    
    if (yearData) {
      res.json(yearData);
    } else {
      res.status(404).json({ error: 'Año no encontrado' });
    }
  } catch (error) {
    console.error('Error reading year data:', error);
    res.status(500).json({ error: 'Error al cargar los datos del año' });
  }
});

// Normalize date format for comparison
function normalizeDateFormat(dateStr: string): string {
  // Remove all non-numeric and non-separator characters
  dateStr = dateStr.trim();
  
  // If it's in dd/mm/yyyy or dd/mm/yy format, convert to dd.mm.yy
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2].length === 4 ? parts[2].slice(-2) : parts[2].padStart(2, '0');
      return `${day}.${month}.${year}`;
    }
  }
  
  // If it's already in dd.mm.yy format, ensure it's padded
  if (dateStr.includes('.')) {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2].length === 4 ? parts[2].slice(-2) : parts[2].padStart(2, '0');
      return `${day}.${month}.${year}`;
    }
  }
  
  return dateStr;
}

// Search by date
app.get('/api/photobook/search/:date', async (req, res) => {
  try {
    const searchDate = normalizeDateFormat(req.params.date);
    const dataPath = path.join(__dirname, 'data', 'photobook.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const photobookData: PhotobookData = JSON.parse(data);
    
    // Search through all years, starting from most recent
    for (const yearData of photobookData.photobook) {
      // Find the first page with matching date
      const pageIndex = yearData.pages.findIndex((p) => {
        const normalizedPageDate = normalizeDateFormat(p.date);
        return normalizedPageDate === searchDate;
      });
      
      if (pageIndex !== -1) {
        res.json({
          year: yearData.year,
          pageIndex,
          page: yearData.pages[pageIndex]
        });
        return;
      }
    }
    
    res.status(404).json({ error: 'Fecha no encontrada' });
  } catch (error) {
    console.error('Error searching date:', error);
    res.status(500).json({ error: 'Error al buscar la fecha' });
  }
});

// Get welcome images for background
app.get('/api/welcome-images', async (req, res) => {
  try {
    const inicioPath = path.join(__dirname, 'images', 'inicio');
    const files = await fs.readdir(inicioPath);
    
    // Filter only .webp images
    const imageExtensions = ['.webp'];
    const imageFiles = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );
    
    // Return full URLs
    const imageUrls = imageFiles.map(file => `/images/inicio/${file}`);
    res.json({ images: imageUrls });
  } catch (error) {
    console.error('Error reading welcome images:', error);
    res.status(500).json({ error: 'Error al cargar las imágenes de bienvenida' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend del Photobook funcionando' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend iniciado en http://localhost:${PORT}`);
  console.log(`📚 API disponible en http://localhost:${PORT}/api/photobook`);
  console.log(`🖼️  Imágenes disponibles en http://localhost:${PORT}/images`);
});
