export interface PhotoPage {
  date: string; // Format: dd.mm.yy for dates, or free text
  images: string[];
}

export interface YearData {
  year: number;
  name: string;
  label: string;
  available: boolean;
  status?: string;
  pages: PhotoPage[];
}

export interface PhotobookData {
  photobook: YearData[];
}
