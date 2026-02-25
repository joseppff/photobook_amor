import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPhotobookData } from "@/lib/api";
import type { YearData } from "@/data/photobook";
import Loading from "@/components/Loading";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Menu = () => {
  const navigate = useNavigate();
  const [photobookData, setPhotobookData] = useState<YearData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotobookData();
        setPhotobookData(data);
      } catch (error) {
        console.error("Error loading photobook data:", error);
        toast.error("Error al cargar los datos del photobook");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleYearClick = (year: number) => {
    navigate(`/photobook?year=${year}`);
  };

  if (loading) {
    return <Loading message="Cargando menú" />;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl text-primary text-center mb-12">
          Nuestros Aniversarios
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photobookData.map((yearData) => {
            const coverImage = yearData.pages[0]?.images[0] 
              ? `${API_URL}${yearData.pages[0].images[0]}`
              : null;
            
            return (
              <button
                key={yearData.year}
                onClick={() => handleYearClick(yearData.year)}
                disabled={!yearData.available}
                className={`bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left ${
                  !yearData.available ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-secondary">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={yearData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-6xl text-muted-foreground">
                        {yearData.year}
                      </span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  {!yearData.available && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-body">
                      Próximamente
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wide">
                      {yearData.label}
                    </p>
                    <h2 className="font-display text-2xl text-primary">
                      {yearData.name}
                    </h2>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="space-y-1">
                      <p className="text-xs font-body text-muted-foreground">
                        Fotografías
                      </p>
                      <p className="font-body text-lg font-semibold text-foreground">
                        {yearData.pages.length} {yearData.pages.length === 1 ? 'foto' : 'fotos'}
                      </p>
                    </div>
                    
                    {yearData.available && (
                      <div className="flex items-center gap-2 text-primary">
                        <span className="font-body text-sm">Ver álbum</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Back button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-body transition-colors duration-200"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
