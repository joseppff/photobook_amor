import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Photobook from "@/components/Photobook";
import Loading from "@/components/Loading";
import type { YearData } from "@/data/photobook";
import { fetchPhotobookData, searchByDate } from "@/lib/api";
import { toast } from "sonner";

const PhotobookView = () => {
  const [searchParams] = useSearchParams();
  const yearParam = searchParams.get("year");
  
  const [photobookData, setPhotobookData] = useState<YearData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState<number>(yearParam ? parseInt(yearParam) : 2025);
  const [searchPage, setSearchPage] = useState<number | undefined>(undefined);

  // Cargar datos del backend al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotobookData();
        setPhotobookData(data);
        
        // If year param exists, use it; otherwise use first available year
        if (yearParam) {
          const year = parseInt(yearParam);
          if (data.some(y => y.year === year)) {
            setActiveYear(year);
          } else if (data.length > 0) {
            setActiveYear(data[0].year);
          }
        } else if (data.length > 0) {
          setActiveYear(data[0].year);
        }
      } catch (error) {
        console.error("Error loading photobook data:", error);
        toast.error("Error al cargar los datos del photobook");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const currentYearData = photobookData.find((y) => y.year === activeYear) || photobookData[0];

  const handleSearchDate = async (dateStr: string) => {
    try {
      const result = await searchByDate(dateStr);
      if (result) {
        setActiveYear(result.year);
        setSearchPage(result.pageIndex);
        toast.success(`Encontrado: ${dateStr}`);
      } else {
        toast.error("Fecha no encontrada");
      }
    } catch (error) {
      console.error("Error searching date:", error);
      toast.error("Error al buscar la fecha");
    }
  };

  // Reset search page when year changes
  useEffect(() => {
    setSearchPage(undefined);
  }, [activeYear]);

  if (loading) {
    return <Loading message="Cargando photobook" />;
  }

  if (photobookData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-display text-xl text-muted-foreground">
            No hay datos disponibles
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Asegúrate de que el backend esté ejecutándose
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar
        years={photobookData}
        activeYear={activeYear}
        onYearChange={setActiveYear}
        onSearchDate={handleSearchDate}
      />
      <main className="flex-1 flex py-8">
        {currentYearData ? (
          <Photobook
            key={`${activeYear}-${searchPage}`}
            yearData={currentYearData}
            initialPage={searchPage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-display text-xl text-muted-foreground">
              Año no encontrado
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotobookView;
