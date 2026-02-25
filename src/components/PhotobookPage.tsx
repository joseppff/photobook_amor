import type { PhotoPage } from "@/data/photobook";
import { getImageUrl } from "@/lib/api";

interface PhotobookPageProps {
  page: PhotoPage;
}

const PhotobookPage = ({ page }: PhotobookPageProps) => {
  // Format date: if it's in dd.mm.yy format, add "| " prefix; otherwise show text as-is
  const formatDate = () => {
    if (!page.date || page.date.trim() === "") {
      return null; // Don't show anything for empty dates
    }
    
    // Check if it's in dd.mm.yy format (date format)
    const datePattern = /^\d{2}\.\d{2}\.\d{2}$/;
    if (datePattern.test(page.date)) {
      return `| ${page.date}`;
    }
    
    // Otherwise, show text as-is
    return page.date;
  };

  const displayText = formatDate();

  return (
    <div className="relative w-full h-full">
      <img
        src={getImageUrl(page.images[0])}
        alt={page.date || "Foto"}
        className="w-full h-full object-contain"
      />
      {/* Date/text overlay at top-left matching original position */}
      {displayText && (
        <span className="absolute top-[3%] left-[5%] font-body text-sm font-semibold text-foreground tracking-wide">
          {displayText}
        </span>
      )}
    </div>
  );
};

export default PhotobookPage;
