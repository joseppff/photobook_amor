import { useState } from "react";
import { Search, X, Grid3x3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { YearData } from "@/data/photobook";

interface NavbarProps {
  years: YearData[];
  activeYear: number;
  onYearChange: (year: number) => void;
  onSearchDate: (date: string) => void;
}

const Navbar = ({ years, activeYear, onYearChange, onSearchDate }: NavbarProps) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearchDate(searchValue.trim());
      setSearchValue("");
      setSearchOpen(false);
    }
  };

  const openSpotifyPlaylist = () => {
    window.open("https://open.spotify.com/playlist/3xZmS1MsnZ9l1u8FUPi4my?si=b041893edbf044b9", "_blank");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-card border-b border-border backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {searchOpen ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="dd.mm.yy"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-32 px-3 py-1.5 text-sm bg-background border border-border rounded-md font-body focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
            <button onClick={handleSearch} className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Buscar" aria-label="Buscar">
              <Search size={16} className="text-foreground" />
            </button>
            <button onClick={() => setSearchOpen(false)} className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Cerrar búsqueda" aria-label="Cerrar búsqueda">
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md hover:bg-secondary transition-colors"
              title="Buscar por fecha"
              aria-label="Buscar por fecha"
            >
              <Search size={18} className="text-foreground" />
            </button>
            <button
              onClick={() => navigate("/menu")}
              className="p-2 rounded-md hover:bg-secondary transition-colors"
              title="Volver al menú"
              aria-label="Volver al menú"
            >
              <Grid3x3 size={18} className="text-foreground" />
            </button>
          </>
        )}
      </div>

      <button
        onClick={openSpotifyPlaylist}
        className="p-2 rounded-md hover:bg-secondary transition-colors group"
        title="Abrir playlist de Spotify"
        aria-label="Abrir playlist de Spotify"
      >
        <svg
          className="w-[22px] h-[22px] text-foreground group-hover:text-[#1DB954] transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
