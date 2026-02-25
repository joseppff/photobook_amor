import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { YearData } from "@/data/photobook";
import PhotobookPage from "./PhotobookPage";

interface PhotobookProps {
  yearData: YearData;
  initialPage?: number;
}

const Photobook = ({ yearData, initialPage = 0 }: PhotobookProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [pageInputValue, setPageInputValue] = useState("");
  const totalPages = yearData.pages.length;

  // Update currentPage when initialPage changes (from search)
  useEffect(() => {
    if (initialPage !== undefined) {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  const goNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };
  const goPrev = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  const handlePageClick = () => {
    setIsEditingPage(true);
    setPageInputValue(String(currentPage + 1));
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setPageInputValue(value);
    }
  };

  const handlePageNavigate = () => {
    const pageNum = parseInt(pageInputValue);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum - 1);
    }
    setIsEditingPage(false);
    setPageInputValue("");
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePageNavigate();
    } else if (e.key === "Escape") {
      setIsEditingPage(false);
      setPageInputValue("");
    }
  };

  if (!yearData.available) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="book-shadow bg-page rounded-lg w-full max-w-2xl aspect-[17/22] flex items-center justify-center page-texture">
          <p className="font-display text-2xl text-muted-foreground italic">Muy pronto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center gap-4 px-4">
      {/* Left arrow */}
      <button
        onClick={goPrev}
        disabled={currentPage === 0}
        className="page-turn-left p-2 rounded-full hover:bg-secondary disabled:opacity-20 disabled:cursor-default transition-colors"
        title="Página anterior"
        aria-label="Página anterior"
      >
        <ChevronLeft size={28} className="text-foreground" />
      </button>

      {/* Book */}
      <div className="book-shadow bg-page rounded-lg w-full max-w-2xl aspect-[17/22] overflow-hidden page-texture relative">
        <PhotobookPage page={yearData.pages[currentPage]} />

        {/* Page indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          {isEditingPage ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={pageInputValue}
                onChange={handlePageInputChange}
                onKeyDown={handlePageInputKeyDown}
                onBlur={handlePageNavigate}
                placeholder="Nº"
                aria-label="Número de página"
                className="w-12 px-2 py-0.5 text-xs text-center bg-background border border-border rounded font-body focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
              <span className="text-xs text-muted-foreground font-body">/ {totalPages}</span>
            </div>
          ) : (
            <button
              onClick={handlePageClick}
              className="text-xs text-muted-foreground font-body hover:text-foreground transition-colors cursor-pointer"
              title="Haz clic para ir a una página"
            >
              {currentPage + 1} / {totalPages}
            </button>
          )}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages - 1}
        className="page-turn-right p-2 rounded-full hover:bg-secondary disabled:opacity-20 disabled:cursor-default transition-colors"
        title="Página siguiente"
        aria-label="Página siguiente"
      >
        <ChevronRight size={28} className="text-foreground" />
      </button>
    </div>
  );
};

export default Photobook;
