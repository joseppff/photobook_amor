import type { PhotoPage, YearData } from "@/backend/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchPhotobookData(): Promise<YearData[]> {
  try {
    const response = await fetch(`${API_URL}/api/photobook`);
    if (!response.ok) {
      throw new Error("Error al cargar los datos del photobook");
    }
    const data = await response.json();
    return data.photobook;
  } catch (error) {
    console.error("Error fetching photobook data:", error);
    // Fallback a datos de ejemplo si el backend no está disponible
    return getDefaultData();
  }
}

export async function fetchYearData(year: number): Promise<YearData | null> {
  try {
    const response = await fetch(`${API_URL}/api/photobook/${year}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching year ${year} data:`, error);
    return null;
  }
}

export async function searchByDate(date: string): Promise<{
  year: number;
  pageIndex: number;
  page: PhotoPage;
} | null> {
  try {
    const response = await fetch(`${API_URL}/api/photobook/search/${date}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error searching date ${date}:`, error);
    return null;
  }
}

export function getImageUrl(imagePath: string): string {
  // Si la imagen ya tiene una URL completa, devolverla tal cual
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  // Si es una ruta relativa, construir la URL completa
  return `${API_URL}${imagePath}`;
}

// Datos de fallback si el backend no está disponible
function getDefaultData(): YearData[] {
  return [
    {
      year: 2024,
      name: "Aniversario 0",
      label: "2024",
      available: true,
      pages: [
        {
          date: "01/01/2024",
          images: ["/placeholder-photo.jpg"],
        },
        {
          date: "15/02/2024",
          images: ["/placeholder-photo.jpg"],
        },
        {
          date: "20/03/2024",
          images: ["/placeholder-photo.jpg"],
        },
      ],
    },
    {
      year: 2025,
      name: "Aniversario 1",
      label: "2025",
      available: true,
      pages: [
        {
          date: "10/01/2025",
          images: ["/placeholder-photo.jpg"],
        },
        {
          date: "14/02/2025",
          images: ["/placeholder-photo.jpg"],
        },
      ],
    },
    {
      year: 2026,
      name: "Aniversario 2",
      label: "2026",
      available: false,
      pages: [],
    },
  ];
}
